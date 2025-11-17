from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class MapSize(str, Enum):
    MINUSCULO = "Minúsculo"
    PEQUENO = "Pequeno"
    MEDIO = "Médio"
    GRANDE = "Grande"
    ENORME = "Enorme"
    COLOSSAL = "Colossal"

class MapComplexity(str, Enum):
    BASICO = "Básico"
    INTERMEDIARIO = "Intermediário"
    AVANCADO = "Avançado"
    EPICO = "Épico"

class MapStatus(str, Enum):
    AVAILABLE = "available"
    SOLD = "sold"

class MapBase(BaseModel):
    title: str
    slug: str
    description: str
    tags: List[str] = []
    size: MapSize
    complexity: MapComplexity
    thumbnail: Optional[str] = None
    images: List[str] = []
    author: str = "Iago Delina"
    status: MapStatus = MapStatus.AVAILABLE
    cliente: Optional[str] = None

class MapCreate(MapBase):
    pass

class MapUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    size: Optional[MapSize] = None
    complexity: Optional[MapComplexity] = None
    thumbnail: Optional[str] = None
    images: Optional[List[str]] = None
    author: Optional[str] = None
    status: Optional[MapStatus] = None
    cliente: Optional[str] = None

class MapResponse(MapBase):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True
