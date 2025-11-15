from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter(prefix="/uploads")

UPLOAD_DIR = "/app/backend/uploads"

@router.get("/{filename}")
async def get_uploaded_file(filename: str):
    """Serve uploaded files"""
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(file_path)
