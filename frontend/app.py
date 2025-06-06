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
from typing import Optional, Dict, Any
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

# In-memory storage for users
users: Dict[str, Any] = {}

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

class GoogleAuthRequest(BaseModel):
    access_token: str

# ... [Previous PaymentConfig class and other code remains the same] ...

@app.post("/auth/google")
async def google_auth(request: GoogleAuthRequest):
    """Handle Google OAuth authentication."""
    try:
        # Verify Google token
        google_response = requests.get(
            f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={request.access_token}"
        )
        
        if not google_response.ok:
            raise HTTPException(status_code=401, detail="Invalid Google token")

        google_user = google_response.json()
        
        # Check if user exists
        user_status = "needs_phone"
        if google_user["email"] not in users:
            # Store new user
            users[google_user["email"]] = {
                "email": google_user["email"],
                "name": google_user["name"],
                "picture": google_user["picture"],
                "created_at": datetime.now().isoformat()
            }
        else:
            user_status = "needs_payment"

        # Generate a simple JWT (in production, use a proper JWT library)
        jwt_payload = {
            "email": google_user["email"],
            "exp": int(datetime.now().timestamp()) + (24 * 60 * 60)  # 24 hours
        }
        jwt_token = hashlib.md5(json.dumps(jwt_payload).encode()).hexdigest()

        return JSONResponse({
            "JWToken": jwt_token,
            "userStatus": user_status
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ... [Rest of your existing code remains the same] ... 