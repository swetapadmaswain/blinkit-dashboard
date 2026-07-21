# Database Setup

This directory contains all database schemas, migrations, and seed data.

## Structure

- `postgres/` - PostgreSQL schemas and indexes
- `mongodb/` - MongoDB collections and indexes
- `redis/` - Redis data structures documentation
- `elasticsearch/` - Elasticsearch indices and mappings
- `migrations/` - Database migration scripts
- `seeds/` - Seed data for development

## Setup Instructions

### PostgreSQL

1. Start PostgreSQL (use Docker or local installation)
2. Run schema files in order:
   ```bash
   psql -U postgres -d discovery_engine -f postgres/schemas/001_initial_schema.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/002_users.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/003_categories.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/004_segments.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/005_habits.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/006_barriers.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/007_needs.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/008_data_sources.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/009_ingestion_jobs.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/010_reports.sql
   psql -U postgres -d discovery_engine -f postgres/schemas/011_audit_log.sql
   ```

### MongoDB

1. Start MongoDB
2. Run collection scripts:
   ```bash
   mongo discovery_engine mongodb/collections/raw_reviews.js
   mongo discovery_engine mongodb/collections/processed_reviews.js
   mongo discovery_engine mongodb/collections/user_behaviors.js
   mongo discovery_engine mongodb/collections/social_posts.js
   mongo discovery_engine mongodb/collections/reddit_discussions.js
   ```

### Elasticsearch

1. Start Elasticsearch
2. Create indices:
   ```bash
   curl -X PUT "localhost:9200/reviews" -H 'Content-Type: application/json' -d @elasticsearch/indices/reviews.json
   curl -X PUT "localhost:9200/unmet_needs" -H 'Content-Type: application/json' -d @elasticsearch/indices/unmet_needs.json
   curl -X PUT "localhost:9200/barriers" -H 'Content-Type: application/json' -d @elasticsearch/indices/barriers.json
   ```

## Using Docker Compose

The easiest way to set up all databases is using the root `docker-compose.yml` file:

```bash
docker-compose up -d postgres mongodb redis elasticsearch
```

This will automatically:
- Create all PostgreSQL databases and schemas
- Create all MongoDB collections
- Start Redis and Elasticsearch

## Database Schemas

### PostgreSQL Tables

1. **users** - User accounts and authentication
2. **categories** - Product categories hierarchy
3. **user_segments** - User segmentation data
4. **habit_patterns** - User shopping habits
5. **barriers** - Barriers to category exploration
6. **unmet_needs** - Unmet user needs
7. **data_sources** - External data source configurations
8. **ingestion_jobs** - Data ingestion job tracking
9. **reports** - Generated reports
10. **audit_log** - Audit trail for all operations

### MongoDB Collections

1. **raw_reviews** - Raw review data from all sources
2. **processed_reviews** - NLP-processed review data
3. **user_behaviors** - User behavior tracking
4. **social_posts** - Social media posts
5. **reddit_discussions** - Reddit discussion threads

### Elasticsearch Indices

1. **reviews** - Searchable review index
2. **unmet_needs** - Searchable unmet needs index
3. **barriers** - Searchable barriers index
