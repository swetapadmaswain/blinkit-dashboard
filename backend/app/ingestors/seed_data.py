import sys
import os
import uuid
from datetime import datetime, timedelta
import random

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.database import get_postgres_conn, get_mongo_db, get_elasticsearch_client

PLATFORMS = ["google_play", "app_store", "reddit", "twitter", "quora"]
REVIEW_SOURCES = ["blinkit_google_play", "blinkit_app_store", "blinkit_reddit", "blinkit_twitter"]
SOCIAL_SOURCES = ["blinkit_reddit", "blinkit_twitter", "blinkit_quora"]

def seed_postgres_data():
    conn = get_postgres_conn()
    cur = conn.cursor()

    # data_sources
    sources = [
        ("Blinkit Google Play Reviews", "review", "https://play.google.com/store/apps/details?id=com.blinkit.android", "active", "{}"),
        ("Blinkit App Store Reviews", "review", "https://apps.apple.com/in/app/blinkit/id15859", "active", "{}"),
        ("Blinkit Reddit Discussions", "social", "https://www.reddit.com/r/IndiaInvestments/search/?q=blinkit", "active", "{}"),
        ("Blinkit Twitter Mentions", "social", "https://twitter.com/search?q=blinkit", "active", "{}"),
    ]
    cur.executemany(
        """INSERT INTO data_sources (name, type, api_endpoint, sync_status, config)
           VALUES (%s, %s, %s, %s::sync_status, %s)
           ON CONFLICT DO NOTHING""",
        sources,
    )

    # categories
    categories = [
        ("delivery_speed", None, 0, "delivery_speed", "Delivery speed related issues", True),
        ("product_quality", None, 0, "product_quality", "Product quality feedback", True),
        ("app_experience", None, 0, "app_experience", "App UX and technical issues", True),
        ("customer_support", None, 0, "customer_support", "Customer support related", True),
        ("pricing", None, 0, "pricing", "Pricing and offers feedback", True),
    ]
    cur.executemany(
        """INSERT INTO categories (name, parent_id, level, blinkit_category_id, description, is_active)
           VALUES (%s, %s, %s, %s, %s, %s)
           ON CONFLICT DO NOTHING""",
        categories,
    )

    # users
    user_records = [
        ("analyst1@blinkit.local", "hashed_password", "Analyst One", "analyst"),
        ("admin@blinkit.local", "hashed_password", "Admin User", "admin"),
    ]
    cur.executemany(
        """INSERT INTO users (email, password_hash, full_name, role)
           VALUES (%s, %s, %s, %s::user_role)
           ON CONFLICT DO NOTHING""",
        user_records,
    )

    # barriers
    barriers = [
        ("price", "High delivery fee during peak hours", 4.2, None, "google_play", "{}"),
        ("convenience", "Frequently out of stock on staples", 3.8, None, "app_store", "{}"),
        ("convenience", "Slow checkout on the app", 3.5, None, "app_store", "{}"),
        ("trust", "Unhelpful customer support", 4.0, None, "reddit", "{}"),
    ]
    cur.executemany(
        """INSERT INTO barriers (type, description, severity_score, category_id, platform, metadata)
           VALUES (%s, %s, %s, %s, %s, %s)
           ON CONFLICT DO NOTHING""",
        barriers,
    )

    # unmet_needs
    needs = [
        ("Need faster delivery in tier-2 cities", "delivery_speed", 120, 4.7, 4.5, "pending", "{}"),
        ("Better organic/gourmet selection", "product_quality", 85, 4.2, 4.0, "pending", "{}"),
        ("More transparent order tracking", "app_experience", 150, 4.1, 3.8, "pending", "{}"),
        ("Subscription plan for frequent users", "pricing", 95, 4.5, 4.3, "pending", "{}"),
    ]
    cur.executemany(
        """INSERT INTO unmet_needs (description, category, frequency, impact_score, priority_score, fulfillment_status, metadata)
           VALUES (%s, %s, %s, %s, %s, %s::fulfillment_status, %s)
           ON CONFLICT DO NOTHING""",
        needs,
    )

    # reports
    cur.execute(
        """INSERT INTO reports (name, type, config, status, metadata)
           VALUES (%s, %s, %s, %s::report_status, %s)
           ON CONFLICT DO NOTHING""",
        (
            "Weekly Discovery Report",
            "insights",
            "{}",
            "completed",
            "{}"
        ),
    )

    # ingestion_jobs
    cur.execute(
        """INSERT INTO ingestion_jobs (source_id, status, records_processed, records_failed, started_at, completed_at)
           SELECT id, 'completed'::job_status, 250, 5, NOW() - INTERVAL '1 hour', NOW()
           FROM data_sources LIMIT 1"""
    )

    conn.commit()
    cur.close()
    conn.close()
    print("PostgreSQL seeded.")


def seed_mongo_data():
    db = get_mongo_db()

    raw_reviews = []
    for _ in range(2000):
        raw_reviews.append({
            "source": random.choice(REVIEW_SOURCES),
            "source_id": f"review_{uuid.uuid4().hex[:8]}",
            "content": random.choice([
                "Delivery was super fast today!",
                "App crashed while applying coupon.",
                "Prices are better than competitors.",
                "Customer care did not resolve my issue.",
                "Out of stock again for my monthly groceries.",
                "Great experience, will order again.",
                "The delivery person was rude.",
                "Order was missing items.",
                "App is very user friendly.",
                "Delivery took longer than expected.",
                "Fresh vegetables always available.",
                "Payment gateway issues.",
                "Good packaging quality.",
                "Customer support was helpful.",
                "The 10-minute delivery is amazing.",
            ]),
            "rating": random.randint(1, 5),
            "author": f"user_{random.randint(100, 9999)}",
            "title": "Review",
            "platform": random.choice(PLATFORMS),
            "metadata": {"country": "IN", "language": "en"},
            "created_at": datetime.utcnow() - timedelta(days=random.randint(0, 30)),
            "ingested_at": datetime.utcnow(),
        })
    db.raw_reviews.insert_many(raw_reviews)

    social_posts = []
    for _ in range(30):
        social_posts.append({
            "post_id": f"post_{uuid.uuid4().hex[:8]}",
            "content": random.choice([
                "Blinkit needs to improve delivery slots.",
                "Love the 10-min delivery promise.",
                "Why is there no customer support chat?",
                "Blinkit discounts are the best.",
            ]),
            "author": f"user_{random.randint(100, 999)}",
            "platform": random.choice(["reddit", "twitter", "quora"]),
            "metadata": {"subreddit": "IndiaInvestments", "followers": random.randint(100, 5000)},
            "created_at": datetime.utcnow() - timedelta(days=random.randint(0, 20)),
            "ingested_at": datetime.utcnow(),
        })
    db.social_posts.insert_many(social_posts)

    print("MongoDB seeded.")


def seed_elasticsearch_data():
    es = get_elasticsearch_client()
    docs = []
    for _ in range(2000):
        docs.append({"index": {"_index": "reviews"}})
        docs.append({
            "content": random.choice([
                "Very fast delivery and fresh vegetables.",
                "The app is slow during checkout.",
                "Good prices but poor support.",
                "Out of stock issues are frustrating.",
                "Delivery was super fast today!",
                "App crashed while applying coupon.",
                "Prices are better than competitors.",
                "Customer care did not resolve my issue.",
                "Out of stock again for my monthly groceries.",
                "Great experience, will order again.",
                "The delivery person was rude.",
                "Order was missing items.",
                "App is very user friendly.",
                "Delivery took longer than expected.",
                "Fresh vegetables always available.",
                "Payment gateway issues.",
                "Good packaging quality.",
                "Customer support was helpful.",
                "The 10-minute delivery is amazing.",
            ]),
            "sentiment": {"score": round(random.uniform(-1, 1), 2), "label": random.choice(["positive", "neutral", "negative"])},
            "topics": [random.choice(["delivery", "pricing", "quality", "support"])],
            "categories": [random.choice(["delivery_speed", "pricing", "product_quality", "customer_support"])],
            "source": random.choice(REVIEW_SOURCES),
            "platform": random.choice(PLATFORMS),
            "created_at": (datetime.utcnow() - timedelta(days=random.randint(0, 30))).isoformat(),
            "rating": random.randint(1, 5),
        })
    es.bulk(body=docs)
    print("Elasticsearch seeded.")


def run():
    seed_postgres_data()
    seed_mongo_data()
    seed_elasticsearch_data()
    print("Sample data ingestion complete.")


if __name__ == "__main__":
    run()
