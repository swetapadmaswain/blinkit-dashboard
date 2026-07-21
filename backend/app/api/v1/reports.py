from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_reports():
    return {"data": []}

@router.get("/{id}")
async def get_report(id: str):
    return {"id": id}
