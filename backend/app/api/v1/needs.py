from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_needs():
    return {"data": []}

@router.get("/{id}")
async def get_need(id: str):
    return {"id": id}
