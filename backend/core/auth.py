import hashlib
import json
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, Header
from pydantic import BaseModel, EmailStr

# In-memory "database" (we'll replace this with a real DB later)
_users = {}
_token_to_user = {}

class GoogleOnboardRequest(BaseModel):
    google_token: str
    survey_answers: Optional[Dict[str, Any]] = None
    phone_number: Optional[str] = None
    dinner_preferences: Optional[Dict[str, Any]] = None
    has_paid: Optional[bool] = False

class UserUpdateRequest(BaseModel):
    phone_number: Optional[str] = None
    dinner_preferences: Optional[Dict[str, Any]] = None
    survey_answers: Optional[Dict[str, Any]] = None
    has_paid: Optional[bool] = False

def get_user_by_email(email: str) -> dict:
    return _users.get(email, {})

def update_user(email: str, update_data: dict) -> dict:
    user = _users.get(email, {})
    user.update(update_data)
    _users[email] = user
    return user

def get_all_users() -> dict:
    return _users.copy()

def get_or_create_user(email: str, google_user: dict, data: GoogleOnboardRequest) -> dict:
    """Get or create user record"""
    user = _users.get(email, {})
    user["email"] = email
    user["name"] = google_user.get("name")
    user["picture"] = google_user.get("picture")
    user["google_token"] = data.google_token
    user["survey_answers"] = data.survey_answers or user.get("survey_answers")
    user["phone_number"] = data.phone_number or user.get("phone_number")
    user["dinner_preferences"] = data.dinner_preferences or user.get("dinner_preferences")
    user["has_paid"] = data.has_paid or user.get("has_paid", False)
    user["created_at"] = user.get("created_at") or datetime.now().isoformat()
    _users[email] = user
    return user

# NOTE: You need a proper get_user function that securely validates a real JWT
async def get_user_from_jwt(authorization: str = Header(...)) -> dict:
    # ... (Your logic to validate a real JWT and get the user's email/ID)
    # This placeholder uses your insecure token method. REPLACE IT.
    token = authorization.split(" ")[1]
    email = _token_to_user.get(token)
    if not email or email not in _users:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return _users[email]

def create_access_token_and_link_to_user(email: str) -> str:
    """Create a simple JWT token (we'll replace this with a proper JWT library later)."""
    jwt_payload = {
        "email": email,
        "exp": int(datetime.now().timestamp()) + (1 * 60 * 60)  # 6 minutes
    }
    jwt_token = hashlib.md5(json.dumps(jwt_payload).encode()).hexdigest()
    _token_to_user[jwt_token] = email;
    return jwt_token

def get_next_step(user: dict) -> str:
    """Determine the next step in the onboarding process."""
    REQUIRED_FIELDS = ["survey_answers", "phone_number", "dinner_preferences"]
    
    missing_fields = [
        field 
        for field in REQUIRED_FIELDS 
        if not user.get(field)
    ]
    
    if missing_fields:
        return missing_fields[0]
    elif not user.get("has_paid", False):
        return "payment"
    else:
        return "cabinet"
    