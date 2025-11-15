from fastapi import APIRouter, HTTPException, status, Depends
from models.admin import AdminLogin, TokenResponse, AdminResponse
from utils.auth import verify_password, create_access_token
from middleware.auth_middleware import get_current_admin
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/auth")

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/login", response_model=TokenResponse)
async def login(credentials: AdminLogin):
    """Admin login"""
    admin = await db.admins.find_one({"username": credentials.username})
    
    if not admin or not verify_password(credentials.password, admin["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    access_token = create_access_token(data={"sub": str(admin["_id"])})
    
    admin["_id"] = str(admin["_id"])
    admin_response = AdminResponse(**admin)
    
    return TokenResponse(
        access_token=access_token,
        admin=admin_response
    )

@router.get("/me", response_model=AdminResponse)
async def get_current_admin_info(admin = Depends(get_current_admin)):
    """Get current admin info"""
    admin["_id"] = str(admin["_id"])
    return AdminResponse(**admin)

@router.post("/logout")
async def logout():
    """Logout (client-side token removal)"""
    return {"message": "Logout successful"}
