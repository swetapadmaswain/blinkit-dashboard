"""
Google Play Store Reviews Scraper
Fetches Blinkit app reviews from Google Play Store
"""
import google_play_scraper as gps
from datetime import datetime, timedelta
from app.database import get_mongo_db, get_elasticsearch_client
from app.config import settings
import uuid

# Blinkit app ID on Google Play
BLINKIT_APP_ID = "com.blinkit.storeob"


def scrape_google_play_reviews(count=2000):
    """
    Scrape reviews from Google Play Store for Blinkit app
    
    Args:
        count: Number of reviews to fetch (default: 2000)
    
    Returns:
        List of review dictionaries
    """
    print(f"Fetching {count} reviews from Google Play Store...")
    
    fetched_reviews = []
    continuation_token = None
    
    # Fetch reviews in batches
    while len(fetched_reviews) < count:
        batch_size = min(200, count - len(fetched_reviews))
        
        result = gps.reviews(
            BLINKIT_APP_ID,
            lang='en',
            country='in',
            sort=gps.Sort.NEWEST,
            count=batch_size,
            continuation_token=continuation_token
        )
        
        batch_reviews, continuation_token = result
        
        for review in batch_reviews:
            fetched_reviews.append({
                "source": "blinkit_google_play",
                "source_id": f"gp_{review['reviewId']}",
                "content": review.get('content', ''),
                "rating": review.get('score', 0),
                "author": review.get('userName', 'anonymous'),
                "title": review.get('title', ''),
                "platform": "google_play",
                "metadata": {
                    "review_id": review.get('reviewId'),
                    "thumbs_up_count": review.get('thumbsUpCount', 0),
                    "review_created_version": review.get('reviewCreatedVersion'),
                    "at": review.get('at').isoformat() if review.get('at') else None,
                    "reply_content": review.get('replyContent'),
                    "replied_at": review.get('repliedAt').isoformat() if review.get('repliedAt') else None,
                },
                "created_at": review.get('at') or datetime.utcnow(),
                "ingested_at": datetime.utcnow(),
            })
        
        print(f"Fetched {len(fetched_reviews)}/{count} reviews...")
        
        if not continuation_token:
            break
    
    print(f"Successfully fetched {len(fetched_reviews)} reviews from Google Play Store")
    return fetched_reviews


def ingest_reviews_to_mongodb(reviews):
    """
    Store reviews in MongoDB
    
    Args:
        reviews: List of review dictionaries
    """
    db = get_mongo_db()
    
    if not reviews:
        print("No reviews to ingest into MongoDB")
        return
    
    # Insert reviews in batches
    batch_size = 100
    for i in range(0, len(reviews), batch_size):
        batch = reviews[i:i + batch_size]
        try:
            db.raw_reviews.insert_many(batch, ordered=False)
        except Exception as e:
            print(f"Error inserting batch {i//batch_size}: {e}")
    
    print(f"Ingested {len(reviews)} reviews into MongoDB")


def index_reviews_to_elasticsearch(reviews):
    """
    Index reviews in Elasticsearch for search
    
    Args:
        reviews: List of review dictionaries
    """
    es = get_elasticsearch_client()
    
    if not reviews:
        print("No reviews to index in Elasticsearch")
        return
    
    docs = []
    for review in reviews:
        docs.append({"index": {"_index": "reviews"}})
        docs.append({
            "content": review.get('content', ''),
            "rating": review.get('rating', 0),
            "source": review.get('source'),
            "platform": review.get('platform'),
            "author": review.get('author'),
            "created_at": review.get('created_at').isoformat() if isinstance(review.get('created_at'), datetime) else review.get('created_at'),
            "sentiment": {
                "score": 0,  # Will be computed by ML model
                "label": "neutral"
            },
            "topics": [],
            "categories": [],
        })
    
    try:
        es.bulk(body=docs)
        print(f"Indexed {len(reviews)} reviews in Elasticsearch")
    except Exception as e:
        print(f"Error indexing reviews in Elasticsearch: {e}")


def run_google_play_scraper(count=2000):
    """
    Main function to run Google Play Store scraper
    
    Args:
        count: Number of reviews to fetch (default: 2000)
    """
    print("=" * 60)
    print("Google Play Store Scraper for Blinkit")
    print("=" * 60)
    
    # Scrape reviews
    reviews = scrape_google_play_reviews(count)
    
    if not reviews:
        print("No reviews fetched. Exiting.")
        return
    
    # Ingest to MongoDB
    ingest_reviews_to_mongodb(reviews)
    
    # Index in Elasticsearch
    index_reviews_to_elasticsearch(reviews)
    
    print("=" * 60)
    print("Google Play Store scraping complete")
    print("=" * 60)


if __name__ == "__main__":
    run_google_play_scraper(count=2000)
