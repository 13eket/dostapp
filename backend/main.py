import json
import hashlib
import os
import requests
import uuid
from datetime import datetime
import xml.etree.ElementTree as ET
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import PlainTextResponse, JSONResponse
from mangum import Mangum
from pydantic import BaseModel, Field
from typing import Optional
from dotenv import load_dotenv

app = FastAPI()
handler = Mangum(app)

# Load environment variables
load_dotenv()

# Configuration
merchant_id = os.environ['FREEDOMPAY_MERCHANT_ID']
secret_key = os.environ['FREEDOMPAY_SECRET_KEY']
api_url = os.environ.get('FREEDOMPAY_API_URL', 'https://secure.freedompay.kz/payment.php')
merchant_domain = os.environ['MERCHANT_DOMAIN']

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
            'economy20': {
                'amount': '5600',
                'recurring_start': '1',
                'recurring_lifetime': '3',  # 3 months
                'description': 'Economy 20% subscription (3 months)'
            },
            'economy40': {
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
            'pg_merchant_id': merchant_id,
            'pg_order_id': order_id,
            'pg_amount': config['amount'],
            'pg_currency': 'KZT',
            'pg_description': config['description'],
            'pg_salt': hashlib.md5(os.urandom(32)).hexdigest(),
            'pg_result_url': f"https://{merchant_domain}/api/payment-callback",
            'pg_success_url': f"https://{merchant_domain}/payment-success",
            'pg_failure_url': f"https://{merchant_domain}/payment-failed",
            'pg_testing_mode': '1',
            'pg_auto_clearing': '1',
            'pg_user_id': hashlib.md5(os.urandom(32)).hexdigest()
        }
        
        # Add recurring parameters for subscriptions
        if config['recurring_start'] is not None:
            params['pg_recurring_start'] = config['recurring_start']
            params['pg_recurring_lifetime'] = config['recurring_lifetime']
        
        # Generate signature
        params['pg_sig'] = generate_signature(params, secret_key)
        
        # Make API request to FreedomPay
        response = requests.post(api_url, data=params)
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

# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)