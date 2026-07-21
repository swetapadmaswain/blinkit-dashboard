"""
Apple App Store Reviews Scraper
Fetches Blinkit app reviews from Apple App Store

Note: The app-store-scraper library may have limitations due to App Store API changes.
Consider using the official App Store Connect API for production use.
"""
from app_store_scraper import AppStore
from datetime import datetime, timedelta
from app.database import get_mongo_db, get_elasticsearch_client
import uuid

# Blinkit app ID on App Store
BLINKIT_APP_ID = "1466967163"  # Blinkit app ID on App Store


def scrape_app_store_reviews(count=2000):
    """
    Scrape reviews from Apple App Store for Blinkit app
    
    Args:
        count: Number of reviews to fetch (default: 2000)
    
    Returns:
        List of review dictionaries
    """
    print(f"Fetching {count} reviews from Apple App Store...")
    
    reviews = []
    
    try:
        app = AppStore(
            country='in',
            app_name='blinkit',
            app_id=BLINKIT_APP_ID
        )
        
        app.review(how_many=count)
        
        for review in app.reviews:
            reviews.append({
                "source": "blinkit_app_store",
                "source_id": f"as_{review.get('id', str(uuid.uuid4()))}",
                "content": review.get('title', '') + ' ' + review.get('review', ''),
                "rating": review.get('rating', 0),
                "author": review.get('userName', 'anonymous'),
                "title": review.get('title', ''),
                "platform": "app_store",
                "metadata": {
                    "review_id": review.get('id'),
                    "is_edited": review.get('isEdited', False),
                    "date": review.get('date').isoformat() if review.get('date') else None,
                },
                "created_at": review.get('date') or datetime.utcnow(),
                "ingested_at": datetime.utcnow(),
            })
        
        print(f"Successfully fetched {len(reviews)} reviews from Apple App Store")
        
    except Exception as e:
        print(f"Error fetching reviews from App Store: {e}")
        return []
    
    return reviews


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


def run_app_store_scraper(count=2000):
    """
    Main function to run Apple App Store scraper
    
    Args:
        count: Number of reviews to fetch (default: 2000)
    """
    print("=" * 60)
    print("Apple App Store Scraper for Blinkit")
    print("=" * 60)
    
    # Scrape reviews
    reviews = scrape_app_store_reviews(count)
    
    if not reviews:
        print("No reviews fetched. Exiting.")
        return
    
    # Ingest to MongoDB
    ingest_reviews_to_mongodb(reviews)
    
    # Index in Elasticsearch
    index_reviews_to_elasticsearch(reviews)
    
    print("=" * 60)
    print("Apple App Store scraping complete")
    print("=" * 60)


if __name__ == "__main__":
    run_app_store_scraper(count=2000)
