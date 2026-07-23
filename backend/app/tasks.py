from celery import Celery
from app.config import settings
from app.ingestors.google_play_reviews_scraper import scrape_google_play_reviews
from app.ingestors.app_store_reviews_scraper import scrape_app_store_reviews
from app.database import get_mongo_db

celery_app = Celery(
    "app.tasks",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"]
)

# Configure Celery Beat schedule
celery_app.conf.beat_schedule = {
    'scrape-google-play-reviews-every-6-hours': {
        'task': 'app.tasks.scrape_google_play_task',
        'schedule': 21600.0,  # 6 hours in seconds
    },
    'scrape-app-store-reviews-every-6-hours': {
        'task': 'app.tasks.scrape_app_store_task',
        'schedule': 21600.0,  # 6 hours in seconds
    },
}

celery_app.conf.timezone = 'UTC'


@celery_app.task
def scrape_google_play_task():
    """Scrape Google Play Store reviews and ingest into MongoDB"""
    try:
        db = get_mongo_db()
        app_id = "com.blinkit"  # Blinkit app ID
        
        reviews = scrape_google_play_reviews(app_id, max_reviews=100)
        
        if reviews:
            # Insert reviews into MongoDB
            for review in reviews:
                review['platform'] = 'google_play'
                # Check if review already exists to avoid duplicates
                existing = db.raw_reviews.find_one({
                    'content': review.get('content'),
                    'platform': 'google_play'
                })
                if not existing:
                    db.raw_reviews.insert_one(review)
            
            return f"Successfully ingested {len(reviews)} Google Play reviews"
        return "No reviews found"
    except Exception as e:
        return f"Error scraping Google Play: {str(e)}"


@celery_app.task
def scrape_app_store_task():
    """Scrape App Store reviews and ingest into MongoDB"""
    try:
        db = get_mongo_db()
        app_name = "Blinkit"  # Blinkit app name
        
        reviews = scrape_app_store_reviews(app_name, max_reviews=100)
        
        if reviews:
            # Insert reviews into MongoDB
            for review in reviews:
                review['platform'] = 'app_store'
                # Check if review already exists to avoid duplicates
                existing = db.raw_reviews.find_one({
                    'content': review.get('content'),
                    'platform': 'app_store'
                })
                if not existing:
                    db.raw_reviews.insert_one(review)
            
            return f"Successfully ingested {len(reviews)} App Store reviews"
        return "No reviews found"
    except Exception as e:
        return f"Error scraping App Store: {str(e)}"
