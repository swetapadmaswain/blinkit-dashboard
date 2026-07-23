from fastapi import APIRouter
from app.ingestors.google_play_reviews_scraper import scrape_google_play_reviews
from app.ingestors.app_store_reviews_scraper import scrape_app_store_reviews
from app.database import get_mongo_db
import google_play_scraper as gps
import threading

router = APIRouter()


def run_ingestion_background(batch_size=5000):
    """Run ingestion in background thread to avoid request timeout"""
    from datetime import datetime
    db = get_mongo_db()
    
    # Scrape Google Play reviews (Blinkit main app)
    try:
        google_play_reviews = scrape_google_play_reviews(count=batch_size)
        for review in google_play_reviews:
            existing = db.raw_reviews.find_one({'source_id': review.get('source_id')})
            if not existing:
                db.raw_reviews.insert_one(review)
    except Exception as e:
        print(f"Google Play error: {e}")
    
    # Scrape App Store reviews
    try:
        app_store_reviews = scrape_app_store_reviews(count=100)
        for review in app_store_reviews:
            existing = db.raw_reviews.find_one({'source_id': review.get('source_id')})
            if not existing:
                db.raw_reviews.insert_one(review)
    except Exception as e:
        print(f"App Store error: {e}")
    
    # Scrape Blinkit/Grofers app
    try:
        grofers_reviews = scrape_blinkit_grofers(count=batch_size)
        for review in grofers_reviews:
            existing = db.raw_reviews.find_one({'source_id': review.get('source_id')})
            if not existing:
                db.raw_reviews.insert_one(review)
    except Exception as e:
        print(f"Grofers error: {e}")
    
    total = db.raw_reviews.count_documents({})
    print(f"✅ Background ingestion complete. Total reviews in DB: {total}")


@router.post("/trigger")
@router.get("/trigger")
async def trigger_ingestion():
    """Trigger review ingestion in background thread to avoid timeout"""
    db = get_mongo_db()
    total_before = db.raw_reviews.count_documents({})
    
    # Start ingestion in background thread
    thread = threading.Thread(target=run_ingestion_background, args=(5000,))
    thread.daemon = True
    thread.start()
    
    return {
        "message": "Ingestion started in background (will take a few minutes)",
        "total_reviews_before": total_before,
        "note": "Check /api/v1/ingest/status for progress"
    }


@router.get("/status")
async def ingestion_status():
    """Check current review count in database"""
    db = get_mongo_db()
    total = db.raw_reviews.count_documents({})
    google_play = db.raw_reviews.count_documents({"platform": "google_play"})
    app_store = db.raw_reviews.count_documents({"platform": "app_store"})
    
    return {
        "total_reviews": total,
        "google_play_reviews": google_play,
        "app_store_reviews": app_store
    }


def scrape_blinkit_grofers(count=5000):
    """Scrape reviews from Blinkit's original Grofers Google Play listing"""
    from datetime import datetime
    
    fetched_reviews = []
    continuation_token = None
    
    while len(fetched_reviews) < count:
        batch_size = min(200, count - len(fetched_reviews))
        result = gps.reviews(
            "com.grofers.customerapp",
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
