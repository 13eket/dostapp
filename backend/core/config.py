import os

from dotenv import load_dotenv

load_dotenv()

DOSTAPP_DOMAIN = os.environ['MERCHANT_DOMAIN']

BACKEND_CORS_ORIGINS = [
    "http://localhost:3000",  # Frontend Dev server
    DOSTAPP_DOMAIN,  # Production domain
]
# FreedomPay
FREEDOMPAY_MERCHANT_ID = os.environ['FREEDOMPAY_MERCHANT_ID']
FREEDOMPAY_SECRET_KEY = os.environ['FREEDOMPAY_SECRET_KEY']
FREEDOMPAY_API_URL = os.environ.get('FREEDOMPAY_API_URL', 'https://secure.freedompay.kz/payment.php')
