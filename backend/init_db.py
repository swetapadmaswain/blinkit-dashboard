"""
Initialize PostgreSQL database schema for Blinkit dashboard
Run this script after database creation to set up required tables
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import settings


def init_database():
    """Create all required tables in PostgreSQL"""
    conn = psycopg2.connect(settings.database_url)
    cur = conn.cursor()
    
    try:
        # Create data_sources table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS data_sources (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                sync_status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create categories table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create barriers table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS barriers (
                id SERIAL PRIMARY KEY,
                type VARCHAR(100) NOT NULL,
                description TEXT,
                severity_score INTEGER DEFAULT 5,
                platform VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create unmet_needs table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS unmet_needs (
                id SERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                category VARCHAR(100),
                priority_score INTEGER DEFAULT 5,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Insert sample data
        cur.execute("""
            INSERT INTO data_sources (name, type, sync_status) VALUES
            ('Google Play Reviews', 'api', 'active'),
            ('App Store Reviews', 'api', 'active'),
            ('Social Media Posts', 'scraper', 'active')
            ON CONFLICT DO NOTHING
        """)
        
        cur.execute("""
            INSERT INTO categories (name, description) VALUES
            ('Groceries', 'Fresh produce, dairy, bakery items'),
            ('Personal Care', 'Beauty, hygiene, wellness products'),
            ('Household', 'Cleaning supplies, home essentials'),
            ('Electronics', 'Gadgets, accessories, tech items')
            ON CONFLICT DO NOTHING
        """)
        
        cur.execute("""
            INSERT INTO barriers (type, description, severity_score, platform) VALUES
            ('Delivery Delay', 'Orders arriving later than promised time', 8, 'both'),
            ('Stock Availability', 'Items frequently out of stock', 7, 'both'),
            ('App Performance', 'App crashes or slow response', 6, 'app'),
            ('Payment Issues', 'Payment gateway failures', 5, 'app'),
            ('Customer Support', 'Slow or unhelpful support', 4, 'both')
            ON CONFLICT DO NOTHING
        """)
        
        cur.execute("""
            INSERT INTO unmet_needs (description, category, priority_score) VALUES
            ('Faster delivery in tier-2 cities', 'Delivery', 9),
            ('Organic and gourmet food options', 'Groceries', 8),
            ('Transparent real-time tracking', 'Delivery', 7),
            ('Subscription and bundle options', 'Pricing', 6),
            ('Better product quality assurance', 'Quality', 5)
            ON CONFLICT DO NOTHING
        """)
        
        conn.commit()
        print("✅ Database schema initialized successfully")
        print("✅ Sample data inserted")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error initializing database: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    init_database()
