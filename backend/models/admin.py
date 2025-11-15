from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class AdminBase(BaseModel):
    username: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(AdminBase):
    id: str = Field(alias="_id")
    createdAt: datetime

    class Config:
        populate_by_name = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: AdminResponse
