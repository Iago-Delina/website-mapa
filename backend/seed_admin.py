"""
Script to create initial admin user
Run: python seed_admin.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from utils.auth import get_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def create_admin():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if admin already exists
    existing_admin = await db.admins.find_one({"username": "admin"})
    
    if existing_admin:
        print("✅ Admin user already exists!")
        return
    
    # Create admin user
    admin_data = {
        "username": "admin",
        "email": "admin@xhyz.com",
        "password": get_password_hash("Xhyz@2025!"),
        "createdAt": datetime.utcnow()
    }
    
    result = await db.admins.insert_one(admin_data)
    print(f"✅ Admin user created successfully! ID: {result.inserted_id}")
    print(f"📧 Username: admin")
    print(f"🔑 Password: Xhyz@2025!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_admin())
