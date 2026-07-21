from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_segments():
    return {"data": []}

@router.get("/{id}")
async def get_segment(id: str):
    return {"id": id}
