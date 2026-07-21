from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_data():
    return {"data": []}

@router.get("/{id}")
async def get_data_item(id: str):
    return {"id": id}
