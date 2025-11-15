from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.map import MapResponse
import os

router = APIRouter()

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/maps", response_model=List[MapResponse])
async def get_maps(
    search: Optional[str] = Query(None),
    tags: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """Get all maps with optional filters"""
    query = {}
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if tags:
        tag_list = tags.split(",")
        query["tags"] = {"$in": tag_list}
    
    if status:
        query["status"] = status
    
    maps = await db.maps.find(query).sort("createdAt", -1).to_list(100)
    
    # Convert ObjectId to string
    for map_item in maps:
        map_item["_id"] = str(map_item["_id"])
    
    return maps

@router.get("/maps/{slug}", response_model=MapResponse)
async def get_map_by_slug(slug: str):
    """Get a single map by slug"""
    map_item = await db.maps.find_one({"slug": slug})
    
    if not map_item:
        raise HTTPException(status_code=404, detail="Map not found")
    
    map_item["_id"] = str(map_item["_id"])
    return map_item

@router.get("/tags", response_model=List[str])
async def get_all_tags():
    """Get all unique tags from maps"""
    tags = await db.maps.distinct("tags")
    return sorted(tags)
