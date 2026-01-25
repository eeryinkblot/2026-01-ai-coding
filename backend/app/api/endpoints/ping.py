from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PingResponse(BaseModel):
    """Response model for ping endpoint."""

    message: str

@router.get("/ping")
def ping() -> PingResponse:
    return PingResponse(message="pong")
