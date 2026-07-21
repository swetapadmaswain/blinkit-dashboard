from fastapi import APIRouter
from app.database import get_mongo_db

router = APIRouter()

@router.get("/stats")
async def get_data_stats():
    """Get statistics about ingested data"""
    db = get_mongo_db()
    
    stats = {
        "raw_reviews_count": db.raw_reviews.count_documents({}),
        "social_posts_count": db.social_posts.count_documents({}),
    }
    
    return stats

@router.get("/")
async def get_data():
    return {"data": []}

@router.get("/{id}")
async def get_data_item(id: str):
    return {"id": id}
