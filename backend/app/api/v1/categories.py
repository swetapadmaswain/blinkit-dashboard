from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_categories():
    return {"data": []}

@router.get("/{id}")
async def get_category(id: str):
    return {"id": id}
