from fastapi import APIRouter
from app.ingestors.google_play_reviews_scraper import scrape_google_play_reviews
from app.ingestors.app_store_reviews_scraper import scrape_app_store_reviews
from app.database import get_mongo_db
import google_play_scraper as gps

router = APIRouter()

@router.post("/trigger")
@router.get("/trigger")
async def trigger_ingestion():
    """Trigger review ingestion from all sources - runs synchronously"""
    db = get_mongo_db()
    google_error = None
    app_error = None
    
    # Scrape Google Play reviews (fetch latest 500)
    try:
        google_play_reviews = scrape_google_play_reviews(count=500)
        google_count = 0
        for review in google_play_reviews:
            existing = db.raw_reviews.find_one({
                'source_id': review.get('source_id')
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
                'source_id': review.get('source_id')
            })
            if not existing:
                db.raw_reviews.insert_one(review)
                app_count += 1
    except Exception as e:
        app_count = 0
        app_error = str(e)
    
    # Also scrape Blinkit Instant (second Google Play app)
    blinkit_instant_error = None
    try:
        blinkit_instant_reviews = scrape_blinkit_instant(count=200)
        instant_count = 0
        for review in blinkit_instant_reviews:
            existing = db.raw_reviews.find_one({
                'source_id': review.get('source_id')
            })
            if not existing:
                db.raw_reviews.insert_one(review)
                instant_count += 1
    except Exception as e:
        instant_count = 0
        blinkit_instant_error = str(e)
    
    total_in_db = db.raw_reviews.count_documents({})
    
    return {
        "message": "Ingestion completed",
        "google_play_reviews_ingested": google_count,
        "google_play_error": google_error,
        "app_store_reviews_ingested": app_count,
        "app_store_error": app_error,
        "blinkit_instant_reviews_ingested": instant_count,
        "blinkit_instant_error": blinkit_instant_error,
        "total_reviews_in_db": total_in_db
    }


def scrape_blinkit_instant(count=200):
    """Scrape reviews from Blinkit's alternate Google Play listing"""
    from datetime import datetime
    
    fetched_reviews = []
    continuation_token = None
    
    while len(fetched_reviews) < count:
        batch_size = min(200, count - len(fetched_reviews))
        result = gps.reviews(
            "com.grofers.customerapp",  # Blinkit's original app ID
            lang='en',
            country='in',
            sort=gps.Sort.NEWEST,
            count=batch_size,
            continuation_token=continuation_token
        )
        batch_reviews, continuation_token = result
        
        for review in batch_reviews:
            fetched_reviews.append({
                "source": "blinkit_grofers_google_play",
                "source_id": f"gp_grofers_{review['reviewId']}",
                "content": review.get('content', ''),
                "rating": review.get('score', 0),
                "author": review.get('userName', 'anonymous'),
                "title": review.get('title', ''),
                "platform": "google_play",
                "metadata": {
                    "review_id": review.get('reviewId'),
                    "thumbs_up_count": review.get('thumbsUpCount', 0),
                    "at": review.get('at').isoformat() if review.get('at') else None,
                },
                "created_at": review.get('at') or datetime.utcnow(),
                "ingested_at": datetime.utcnow(),
            })
        
        if not continuation_token:
            break
    
    return fetched_reviews
