import json
import hashlib
import os
import requests
import uuid
from datetime import datetime
import xml.etree.ElementTree as ET
from fastapi import Depends, FastAPI, Header, HTTPException, Request, logger
from fastapi.responses import PlainTextResponse, JSONResponse
from mangum import Mangum
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

from core.auth import (
    GoogleOnboardRequest, UserUpdateRequest, create_access_token_and_link_to_user, get_next_step, get_or_create_user, get_user_by_email, get_user_from_jwt, update_user
)
from core.config import DOSTAPP_DOMAIN, FREEDOMPAY_MERCHANT_ID, FREEDOMPAY_SECRET_KEY, FREEDOMPAY_API_URL

app = FastAPI()
handler = Mangum(app)

# Pydantic Models
class PaymentRequest(BaseModel):
    payment_type: str = Field(
        'one-time',
        description="Type of payment/subscription",
        examples=["one-time", "basic", "economy20", "economy40"]
    )
    user_id: Optional[str] = Field(
        None,
        description="Optional user identifier",
        example="user123"
    )

class PaymentConfig:
    def __init__(self):
        self.config = {
            'one-time': {
                'amount': '5000',
                'recurring_start': None,
                'recurring_lifetime': None,
                'description': 'One-time payment'
            },
            'basic': {
                'amount': '7000',
                'recurring_start': '1',
                'recurring_lifetime': '1',  # 1 month
                'description': 'Basic subscription (1 month)'
            },
            'basic-3-months': {
                'amount': '5600',
                'recurring_start': '1',
                'recurring_lifetime': '3',  # 3 months
                'description': 'Economy 20% subscription (3 months)'
            },
            'basic-6-months': {
                'amount': '4200',
                'recurring_start': '1',
                'recurring_lifetime': '6',  # 6 months
                'description': 'Economy 40% subscription (6 months)'
            }
        }

    def get_config(self, payment_type: str) -> dict:
        if payment_type not in self.config:
            raise ValueError(f"Invalid payment_type: {payment_type}")
        return self.config[payment_type]

def generate_signature(params: dict, secret_key: str) -> str:
    """Generate FreedomPay signature for request authentication."""
    signature_parts = ['init_payment.php']
    
    for key in sorted(params.keys()):
        if key != 'pg_sig' and params[key] is not None:
            signature_parts.append(str(params[key]))
    
    signature_parts.append(secret_key)
    signature_string = ';'.join(signature_parts)
    return hashlib.md5(signature_string.encode('utf-8')).hexdigest()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        DOSTAPP_DOMAIN
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REQUIRED_FIELDS = ["survey_answers", "phone_number", "dinner_preferences"]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Dostapp API, checking auomatic deployment"};

@app.post("/auth/google")
async def google_onboard(data: GoogleOnboardRequest):
    """Handle Google OAuth onboarding and user data update."""
    try:
        # Verify Google token
        google_response = requests.get(
            f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={data.google_token}"
        )
        if not google_response.ok:
            raise HTTPException(status_code=401, detail="Invalid Google token")
        google_user = google_response.json()
        email = google_user["email"]

        # Get or create user record
        user = get_or_create_user(email, google_user, data)

        # Check for missing fields
        # Find any missing required fields in user profile
        next_step = get_next_step(user)

        # Generate a simple JWT TODO: (in production, use a proper JWT library)
        jwt_token = create_access_token_and_link_to_user(email)
        
        return JSONResponse({
            "jwt": jwt_token,
            "next_step": next_step
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.patch("/api/users/me")
async def update_user_profile(data: UserUpdateRequest, current_user: dict = Depends(get_user_from_jwt)):
    """Handles partial updates for the logged-in user."""
    email = current_user["email"]
    update_data = data.model_dump(exclude_unset=True)
    updated_user = update_user(email, update_data)
    return {"message": "Profile updated successfully", "updated_fields": list(update_data.keys())}

@app.post("/init-payment")
async def init_payment(request: Request):
    """Initialize payment with FreedomPay and return redirect URL."""
    try:
        # Parse the AWS API Gateway event
        body = await request.json()
        
        # Validate payment type
        payment_type = body.get('payment_type') 
        payment_config = PaymentConfig()
        config = payment_config.get_config(payment_type)

        # Generate order ID
        order_id = f"ORD-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8]}"

        # Prepare request parameters
        params = {
            'pg_merchant_id': FREEDOMPAY_MERCHANT_ID,
            'pg_order_id': order_id,
            'pg_amount': config['amount'],
            'pg_currency': 'KZT',
            'pg_description': config['description'],
            'pg_salt': hashlib.md5(os.urandom(32)).hexdigest(),
            'pg_result_url': f"https://{DOSTAPP_DOMAIN}/api/payment-callback",
            'pg_success_url': f"https://{DOSTAPP_DOMAIN}/payment-success",
            'pg_failure_url': f"https://{DOSTAPP_DOMAIN}/payment-failed",
            'pg_testing_mode': '1',
            'pg_auto_clearing': '1',
            'pg_user_id': hashlib.md5(os.urandom(32)).hexdigest()
        }
        
        # Add recurring parameters for subscriptions
        if config['recurring_start'] is not None:
            params['pg_recurring_start'] = config['recurring_start']
            params['pg_recurring_lifetime'] = config['recurring_lifetime']
        
        # Generate signature
        params['pg_sig'] = generate_signature(params, FREEDOMPAY_SECRET_KEY)
        
        # Make API request to FreedomPay
        response = requests.post(FREEDOMPAY_API_URL, data=params)
        response.raise_for_status()

        # Parse XML to get the redirect URL
        try:
            root = ET.fromstring(response.text)
            redirect_url = root.findtext('pg_redirect_url')
            
            if not redirect_url:
                raise HTTPException(status_code=400, detail='No redirect URL found in response')
            
            return PlainTextResponse(content=redirect_url)
            
        except ET.ParseError as e:
            raise HTTPException(status_code=400, detail=f'Failed to parse XML response: {str(e)}')

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Payment gateway error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/profile")
async def get_profile(authorization: str = Header(...)):
    """Return user profile if the token is valid."""
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")

        token = authorization.split(" ")[1]
        if not token:
            raise HTTPException(status_code=401, detail="Token is required")
        email = token_to_user.get(token)
        if not email:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        user = users.get(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "email": user.get("email"),
            "name": user.get("name"),
            "picture": user.get("picture"),
            "phone_number": user.get("phone_number"),
            "survey_answers": user.get("survey_answers"),
            "dinner_preferences": user.get("dinner_preferences"),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)