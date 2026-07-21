from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_habits():
    return {"data": []}

@router.get("/{id}")
async def get_habit(id: str):
    return {"id": id}
