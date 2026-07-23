from fastapi import APIRouter
from app.ingestors.google_play_reviews_scraper import scrape_google_play_reviews
from app.ingestors.app_store_reviews_scraper import scrape_app_store_reviews
from app.database import get_mongo_db

router = APIRouter()

@router.post("/trigger")
@router.get("/trigger")
async def trigger_ingestion():
    """Trigger review ingestion from all sources - runs synchronously"""
    db = get_mongo_db()
    google_error = None
    app_error = None
    
    # Scrape Google Play reviews
    try:
        google_play_reviews = scrape_google_play_reviews(count=100)
        google_count = 0
        for review in google_play_reviews:
            existing = db.raw_reviews.find_one({
                'content': review.get('content'),
                'platform': 'google_play'
            })
            if not existing:
                db.raw_reviews.insert_one(review)
                google_count += 1
    except Exception as e:
        google_count = 0
        google_error = str(e)
    
    # Scrape App Store reviews
    try:
        app_store_reviews = scrape_app_store_reviews(count=100)
        app_count = 0
        for review in app_store_reviews:
            existing = db.raw_reviews.find_one({
                'content': review.get('content'),
                'platform': 'app_store'
            })
            if not existing:
                db.raw_reviews.insert_one(review)
                app_count += 1
    except Exception as e:
        app_count = 0
        app_error = str(e)
    
    total_in_db = db.raw_reviews.count_documents({})
    
    return {
        "message": "Ingestion completed",
        "google_play_reviews_ingested": google_count,
        "google_play_error": google_error,
        "app_store_reviews_ingested": app_count,
        "app_store_error": app_error,
        "total_reviews_in_db": total_in_db
    }
