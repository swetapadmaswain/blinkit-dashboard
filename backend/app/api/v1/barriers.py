from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_barriers():
    return {"data": []}

@router.get("/{id}")
async def get_barrier(id: str):
    return {"id": id}
