from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from fastapi.responses import FileResponse
from motor.motor_asyncio import AsyncIOMotorClient
from models.map import MapCreate, MapUpdate, MapResponse
from middleware.auth_middleware import get_current_admin
from utils.slug import generate_slug
from typing import List
from datetime import datetime
from bson import ObjectId
from dotenv import load_dotenv
from pathlib import Path
import os
import shutil
import uuid

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/admin")

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

UPLOAD_DIR = "/app/backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    admin = Depends(get_current_admin)
):
    """Upload an image file"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG, PNG, and WebP are allowed.")
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL
    file_url = f"/api/uploads/{unique_filename}"
    return {"url": file_url, "filename": unique_filename}

@router.post("/maps", response_model=MapResponse)
async def create_map(
    map_data: MapCreate,
    admin = Depends(get_current_admin)
):
    """Create a new map"""
    # Generate slug if not provided or ensure uniqueness
    if not map_data.slug:
        map_data.slug = generate_slug(map_data.title)
    
    # Check if slug already exists
    existing = await db.maps.find_one({"slug": map_data.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Map with this slug already exists")
    
    # Create map document
    map_dict = map_data.dict()
    map_dict["createdAt"] = datetime.utcnow()
    map_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.maps.insert_one(map_dict)
    
    # Return created map
    created_map = await db.maps.find_one({"_id": result.inserted_id})
    created_map["_id"] = str(created_map["_id"])
    
    return MapResponse(**created_map)

@router.put("/maps/{map_id}", response_model=MapResponse)
async def update_map(
    map_id: str,
    map_data: MapUpdate,
    admin = Depends(get_current_admin)
):
    """Update an existing map"""
    # Check if map exists
    existing_map = await db.maps.find_one({"_id": ObjectId(map_id)})
    if not existing_map:
        raise HTTPException(status_code=404, detail="Map not found")
    
    # Prepare update data
    update_dict = {k: v for k, v in map_data.dict(exclude_unset=True).items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    # If slug is being updated, check uniqueness
    if "slug" in update_dict:
        slug_exists = await db.maps.find_one({
            "slug": update_dict["slug"],
            "_id": {"$ne": ObjectId(map_id)}
        })
        if slug_exists:
            raise HTTPException(status_code=400, detail="Map with this slug already exists")
    
    update_dict["updatedAt"] = datetime.utcnow()
    
    # Update map
    await db.maps.update_one(
        {"_id": ObjectId(map_id)},
        {"$set": update_dict}
    )
    
    # Return updated map
    updated_map = await db.maps.find_one({"_id": ObjectId(map_id)})
    updated_map["_id"] = str(updated_map["_id"])
    
    return MapResponse(**updated_map)

@router.delete("/maps/{map_id}")
async def delete_map(
    map_id: str,
    admin = Depends(get_current_admin)
):
    """Delete a map"""
    result = await db.maps.delete_one({"_id": ObjectId(map_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Map not found")
    
    return {"message": "Map deleted successfully"}

@router.get("/maps", response_model=List[MapResponse])
async def get_all_maps_admin(
    admin = Depends(get_current_admin)
):
    """Get all maps for admin (including sold)"""
    maps = await db.maps.find().sort("createdAt", -1).to_list(1000)
    
    for map_item in maps:
        map_item["_id"] = str(map_item["_id"])
    
    return maps
