# AI-Powered Discovery Engine for Blinkit - System Architecture

## Table of Contents
1. [System Overview](#1-system-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Database Architecture](#5-database-architecture)
6. [Data Pipeline Architecture](#6-data-pipeline-architecture)
7. [Machine Learning Architecture](#7-machine-learning-architecture)
8. [Infrastructure & DevOps](#8-infrastructure--devops)
9. [Security & Compliance](#9-security--compliance)
10. [Technology Stack](#10-technology-stack)
11. [API Specifications](#11-api-specifications)
12. [Data Models](#12-data-models)

---

## 1. System Overview

The AI-Powered Discovery Engine is a multi-tier, cloud-native application designed to ingest, process, and analyze user-generated content from multiple platforms to generate actionable insights for Blinkit's quick-commerce operations.

### 1.1 System Goals
- Ingest data from 7+ external sources (App Store, Play Store, Reddit, forums, social media, product reviews, quick-commerce discussions)
- Process unstructured text using NLP/ML models
- Store and index data for real-time and batch analytics
- Provide interactive dashboards for business users
- Expose APIs for programmatic access
- Scale horizontally to handle millions of records

### 1.2 Architecture Principles
- **Microservices**: Modular, independently deployable services
- **Event-Driven**: Asynchronous processing using message queues
- **Scalable**: Horizontal scaling with container orchestration
- **Resilient**: Fault tolerance with retries and circuit breakers
- **Secure**: Authentication, authorization, and data encryption
- **Observable**: Comprehensive logging, metrics, and tracing

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              External Data Sources                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ App Store│ │Play Store│ │  Reddit  │ │  Forums  │ │Social    │ │Product │ │
│  │   API    │ │   API    │ │   API    │ │ Scraper  │ │Media API │ │Reviews │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘ │
│       │            │            │            │            │          │      │
│       └────────────┴────────────┴────────────┴────────────┴──────────┘      │
│                                     │                                        │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Data Ingestion Layer                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                   API Gateway & Load Balancer                          │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │  │
│  │ Ingestion│ │ Ingestion│ │ Ingestion│ │ Ingestion│ │ Ingestion│        │  │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │ Service  │  ...   │  │
│  │(App Store)│ │(Play     │ │(Reddit)  │ │(Social)  │ │(Product) │        │  │
│  │          │ │ Store)   │ │          │ │ Media)   │ │ Reviews) │        │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │  │
│       │            │            │            │            │               │  │
│       └────────────┴────────────┴────────────┴────────────┘               │  │
│                                     │                                     │  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    Message Queue (Kafka/RabbitMQ)                     │  │
│  │  Topics: raw-data, processed-data, ml-requests, alerts              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Data Processing Layer                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │  │
│  │ Data     │ │ NLP      │ │ ML       │ │ Analytics│ │ Insight  │        │  │
│  │ Normalizer│ │Processor │ │ Service  │ │ Engine   │ │ Generator│        │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │  │
│       │            │            │            │            │               │  │
│       └────────────┴────────────┴────────────┴────────────┘               │  │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Data Storage Layer                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  PostgreSQL      │  │  MongoDB         │  │  Redis Cache     │         │  │
│  │  (Operational)   │  │  (Document Store)│  │  (Caching Layer) │         │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  Snowflake/BigQuery│ │  Elasticsearch   │  │  S3/MinIO        │         │  │
│  │  (Data Warehouse) │  │  (Search Index)  │  │  (Object Storage)│         │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Application Layer                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │  │
│  │ Auth     │ │ User     │ │ Category │ │ Habit    │ │ Barrier  │        │  │
│  │ Service  │ │ Segmentation│Analysis│ │Detection │ │Analysis  │        │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │  │
│       │            │            │            │            │               │  │
│       └────────────┴────────────┴────────────┴────────────┘               │  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    REST API Gateway                                    │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    React/Next.js Web Application                       │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │  │
│  │  │ Dashboard│ │ Analytics│ │ Reports  │ │ Settings │              │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Technology Stack
- **Framework**: Next.js 14+ (React 18+)
- **UI Library**: shadcn/ui + TailwindCSS
- **State Management**: Zustand + React Query
- **Charts**: Recharts / Chart.js
- **Forms**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **Type Safety**: TypeScript

### 3.2 Frontend Directory Structure

```
/frontend
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Landing page
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Main dashboard
│   │   │   ├── overview/
│   │   │   │   └── page.tsx     # Overview metrics
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx     # Category exploration
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # Category details
│   │   │   ├── habits/
│   │   │   │   └── page.tsx     # Habit analysis
│   │   │   ├── barriers/
│   │   │   │   └── page.tsx     # Barrier identification
│   │   │   ├── segments/
│   │   │   │   └── page.tsx     # User segmentation
│   │   │   ├── needs/
│   │   │   │   └── page.tsx     # Unmet needs
│   │   │   └── reports/
│   │   │       └── page.tsx     # Reports
│   │   └── api/
│   │       └── [...nextauth]/
│   │           └── route.ts     # NextAuth configuration
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx   # KPI cards
│   │   │   ├── TrendChart.tsx   # Trend visualization
│   │   │   ├── CategoryHeatmap.tsx
│   │   │   ├── SegmentTable.tsx
│   │   │   └── BarrierChart.tsx
│   │   ├── analytics/
│   │   │   ├── SentimentChart.tsx
│   │   │   ├── TopicCloud.tsx
│   │   │   ├── FunnelChart.tsx
│   │   │   └── CohortAnalysis.tsx
│   │   ├── reports/
│   │   │   ├── ReportGenerator.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   └── ScheduleReport.tsx
│   │   └── shared/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   ├── store/
│   │   ├── useAuthStore.ts       # Authentication state
│   │   ├── useDashboardStore.ts  # Dashboard filters/state
│   │   ├── useCategoryStore.ts   # Category analysis state
│   │   ├── useSegmentStore.ts    # User segment state
│   │   └── useReportStore.ts    # Report generation state
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts         # Axios/Fetch client
│   │   │   ├── categories.ts     # Category API calls
│   │   │   ├── segments.ts       # Segment API calls
│   │   │   ├── habits.ts         # Habit API calls
│   │   │   ├── barriers.ts       # Barrier API calls
│   │   │   ├── needs.ts          # Unmet needs API calls
│   │   │   └── reports.ts        # Reports API calls
│   │   ├── hooks/
│   │   │   ├── useCategories.ts  # Category data hook
│   │   │   ├── useSegments.ts    # Segment data hook
│   │   │   ├── useHabits.ts      # Habit data hook
│   │   │   └── useAnalytics.ts   # Analytics data hook
│   │   └── utils/
│   │       ├── formatters.ts     # Data formatters
│   │       ├── validators.ts     # Form validators
│   │       └── constants.ts      # App constants
│   └── types/
│       ├── category.ts
│       ├── segment.ts
│       ├── habit.ts
│       ├── barrier.ts
│       └── need.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

### 3.3 Frontend Features

#### 3.3.1 Dashboard
- **Overview Metrics**: Total reviews, sentiment score, active segments, top categories
- **Real-time Updates**: WebSocket connection for live data
- **Date Range Picker**: Filter data by time period
- **KPI Cards**: Key performance indicators with trend indicators
- **Quick Actions**: Export, schedule report, create alert

#### 3.3.2 Category Exploration
- **Category Heatmap**: Visual representation of category exploration
- **Discovery Funnel**: Users → Categories → Purchases
- **Sticky Categories**: Categories with high repeat purchase rates
- **Time-to-Exploration**: Average time before trying new categories
- **Category Comparison**: Compare multiple categories side-by-side

#### 3.3.3 Habit Analysis
- **Habit Strength Score**: Measure of habitual behavior
- **Repeat Purchase Patterns**: Visualize repeat purchase cycles
- **Habit Disruption Events**: Identify when habits change
- **Habit vs Intentional**: Classify shopping behavior types

#### 3.3.4 Barrier Identification
- **Barrier Classification**: Price, trust, information, convenience
- **Barrier Impact Score**: Quantify barrier severity
- **Barrier Trends**: Track barrier changes over time
- **Platform-Specific Barriers**: Compare barriers across platforms

#### 3.3.5 User Segmentation
- **Segment Explorer**: Browse user segments
- **Segment Details**: Deep dive into each segment
- **Segment Comparison**: Compare segments across metrics
- **Segment Actions**: Target segments with campaigns

#### 3.3.6 Unmet Needs
- **Needs Cloud**: Visual representation of unmet needs
- **Needs Prioritization**: Rank by frequency and impact
- **Needs Tracking**: Monitor need fulfillment over time
- **Needs Categorization**: Group needs by type

#### 3.3.7 Reports
- **Report Builder**: Custom report creation
- **Scheduled Reports**: Automated report generation
- **Export Options**: PDF, Excel, CSV formats
- **Report Templates**: Pre-built report templates

### 3.4 Frontend Configuration

#### 3.4.1 Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

#### 3.4.2 Package.json Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "recharts": "^2.10.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "next-auth": "^4.24.0",
    "axios": "^1.6.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## 4. Backend Architecture

### 4.1 Technology Stack
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Async Runtime**: asyncio + uvicorn
- **Task Queue**: Celery + Redis
- **Message Queue**: Apache Kafka / RabbitMQ
- **API Documentation**: OpenAPI/Swagger
- **Type Safety**: Pydantic
- **Testing**: pytest + pytest-asyncio

### 4.2 Backend Directory Structure

```
/backend
├── app/
│   ├── main.py                   # FastAPI application entry
│   ├── config.py                 # Configuration management
│   ├── dependencies.py           # Dependency injection
│   ├── middleware.py             # Custom middleware
│   ├── api/
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py           # Authentication endpoints
│   │   │   ├── categories.py     # Category analysis endpoints
│   │   │   ├── segments.py       # User segmentation endpoints
│   │   │   ├── habits.py         # Habit analysis endpoints
│   │   │   ├── barriers.py       # Barrier identification endpoints
│   │   │   ├── needs.py          # Unmet needs endpoints
│   │   │   ├── reports.py        # Reports endpoints
│   │   │   └── data.py           # Data ingestion endpoints
│   │   └── deps.py               # API dependencies
│   ├── core/
│   │   ├── security.py           # Security utilities
│   │   ├── auth.py               # Authentication logic
│   │   └── permissions.py        # Authorization logic
│   ├── models/
│   │   ├── user.py               # User models
│   │   ├── category.py           # Category models
│   │   ├── segment.py            # Segment models
│   │   ├── habit.py              # Habit models
│   │   ├── barrier.py            # Barrier models
│   │   └── need.py               # Need models
│   ├── schemas/
│   │   ├── user.py               # User schemas
│   │   ├── category.py           # Category schemas
│   │   ├── segment.py            # Segment schemas
│   │   ├── habit.py              # Habit schemas
│   │   ├── barrier.py            # Barrier schemas
│   │   └── need.py               # Need schemas
│   ├── services/
│   │   ├── auth_service.py       # Authentication service
│   │   ├── category_service.py   # Category analysis service
│   │   ├── segment_service.py    # User segmentation service
│   │   ├── habit_service.py      # Habit analysis service
│   │   ├── barrier_service.py    # Barrier identification service
│   │   ├── need_service.py       # Unmet needs service
│   │   └── report_service.py     # Report generation service
│   ├── tasks/
│   │   ├── __init__.py
│   │   ├── ingestion.py          # Data ingestion tasks
│   │   ├── processing.py         # Data processing tasks
│   │   ├── ml_tasks.py           # ML model tasks
│   │   └── reports.py            # Report generation tasks
│   ├── ml/
│   │   ├── __init__.py
│   │   ├── sentiment.py          # Sentiment analysis
│   │   ├── topic_modeling.py     # Topic modeling
│   │   ├── ner.py                # Named entity recognition
│   │   ├── clustering.py         # User clustering
│   │   ├── classification.py     # Classification models
│   │   └── anomaly_detection.py  # Anomaly detection
│   ├── nlp/
│   │   ├── __init__.py
│   │   ├── preprocessor.py       # Text preprocessing
│   │   ├── tokenizer.py          # Tokenization
│   │   ├── sentiment_analyzer.py # Sentiment analysis
│   │   ├── topic_extractor.py    # Topic extraction
│   │   └── intent_classifier.py  # Intent classification
│   ├── ingestors/
│   │   ├── __init__.py
│   │   ├── base.py               # Base ingestor
│   │   ├── app_store.py          # App Store ingestor
│   │   ├── play_store.py         # Play Store ingestor
│   │   ├── reddit.py             # Reddit ingestor
│   │   ├── forums.py             # Forum ingestor
│   │   ├── social_media.py       # Social media ingestor
│   │   ├── product_reviews.py   # Product reviews ingestor
│   │   └── quick_commerce.py    # Quick-commerce ingestor
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py            # Database session
│   │   ├── base.py               # Base model
│   │   └── repositories/         # Repository pattern
│   │       ├── user.py
│   │       ├── category.py
│   │       ├── segment.py
│   │       ├── habit.py
│   │       ├── barrier.py
│   │       └── need.py
│   ├── integrations/
│   │   ├── __init__.py
│   │   ├── blinkit_crm.py        # Blinkit CRM integration
│   │   ├── blinkit_analytics.py  # Blinkit analytics integration
│   │   └── blinkit_catalog.py    # Product catalog integration
│   └── utils/
│       ├── __init__.py
│       ├── logger.py             # Logging utilities
│       ├── cache.py              # Cache utilities
│       ├── validators.py         # Validation utilities
│       └── helpers.py            # Helper functions
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── alembic/                      # Database migrations
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── requirements.txt
└── pyproject.toml
```

### 4.3 API Endpoints

#### Authentication
```
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
```

#### Categories
```
GET    /api/v1/categories
GET    /api/v1/categories/{id}
GET    /api/v1/categories/{id}/exploration
GET    /api/v1/categories/{id}/trends
GET    /api/v1/categories/heatmap
GET    /api/v1/categories/funnel
```

#### Segments
```
GET    /api/v1/segments
GET    /api/v1/segments/{id}
GET    /api/v1/segments/{id}/details
POST   /api/v1/segments/compare
GET    /api/v1/segments/summary
```

#### Habits
```
GET    /api/v1/habits
GET    /api/v1/habits/{id}
GET    /api/v1/habits/strength
GET    /api/v1/habits/patterns
GET    /api/v1/habits/disruptions
```

#### Barriers
```
GET    /api/v1/barriers
GET    /api/v1/barriers/{id}
GET    /api/v1/barriers/classification
GET    /api/v1/barriers/impact
GET    /api/v1/barriers/trends
```

#### Unmet Needs
```
GET    /api/v1/needs
GET    /api/v1/needs/{id}
GET    /api/v1/needs/prioritized
GET    /api/v1/needs/tracking
GET    /api/v1/needs/cloud
```

#### Reports
```
GET    /api/v1/reports
POST   /api/v1/reports
GET    /api/v1/reports/{id}
GET    /api/v1/reports/{id}/download
POST   /api/v1/reports/{id}/schedule
DELETE /api/v1/reports/{id}
```

#### Data Ingestion
```
POST   /api/v1/data/ingest
GET    /api/v1/data/status
GET    /api/v1/data/sources
POST   /api/v1/data/sources/{source}/sync
```

### 4.4 Backend Configuration

#### 4.4.1 Environment Variables
```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/discovery_engine
MONGODB_URL=mongodb://localhost:27017/discovery_engine
REDIS_URL=redis://localhost:6379/0
KAFKA_BROKERS=localhost:9092
ELASTICSEARCH_URL=http://localhost:9200
S3_BUCKET=discovery-engine-data
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
API_RATE_LIMIT=1000/minute
LOG_LEVEL=INFO
```

#### 4.4.2 Requirements.txt
```
fastapi==0.104.0
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
pymongo==4.6.0
redis==5.0.1
celery==5.3.4
kafka-python==2.0.2
elasticsearch==8.11.0
boto3==1.29.0
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
transformers==4.35.0
torch==2.1.0
scikit-learn==1.3.2
spacy==3.7.2
nltk==3.8.1
pandas==2.1.3
numpy==1.26.2
requests==2.31.0
aiohttp==3.9.1
httpx==0.25.2
beautifulsoup4==4.12.2
selenium==4.15.2
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
```

---

## 5. Database Architecture

### 5.1 Database Technologies

#### 5.1.1 PostgreSQL (Operational Database)
- **Purpose**: Transactional data, user management, metadata
- **Schema**: Relational with foreign keys
- **Features**: ACID compliance, complex queries, JSON support

#### 5.1.2 MongoDB (Document Store)
- **Purpose**: Raw data storage, flexible schemas, large documents
- **Collections**: Raw reviews, discussions, social media posts
- **Features**: Schema flexibility, horizontal scaling, rich queries

#### 5.1.3 Redis (Cache Layer)
- **Purpose**: Caching, session storage, rate limiting
- **Data Structures**: Strings, Hashes, Lists, Sets
- **Features**: In-memory, fast access, TTL support

#### 5.1.4 Snowflake/BigQuery (Data Warehouse)
- **Purpose**: Historical analysis, reporting, ML training data
- **Schema**: Star schema, denormalized for analytics
- **Features**: Columnar storage, massive parallel processing

#### 5.1.5 Elasticsearch (Search Index)
- **Purpose**: Full-text search, aggregations, real-time analytics
- **Indices**: Reviews, discussions, needs, barriers
- **Features**: Full-text search, faceted search, geospatial

#### 5.1.6 S3/MinIO (Object Storage)
- **Purpose**: File storage, ML models, exports
- **Buckets**: Raw data, processed data, models, reports
- **Features**: Scalable, durable, versioning

### 5.2 PostgreSQL Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'analyst',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES categories(id),
    level INTEGER DEFAULT 0,
    blinkit_category_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Segments
CREATE TABLE user_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    exploration_propensity VARCHAR(50),
    category_preferences JSONB,
    engagement_level VARCHAR(50),
    frustration_themes JSONB,
    user_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Habit Patterns
CREATE TABLE habit_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    category_id UUID REFERENCES categories(id),
    habit_strength FLOAT,
    repeat_frequency INTEGER,
    last_purchase_date TIMESTAMP,
    habit_disruption_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Barriers
CREATE TABLE barriers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    description TEXT,
    severity_score FLOAT,
    category_id UUID REFERENCES categories(id),
    platform VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Unmet Needs
CREATE TABLE unmet_needs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    category VARCHAR(100),
    frequency INTEGER DEFAULT 0,
    impact_score FLOAT,
    priority_score FLOAT,
    fulfillment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Sources
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    api_endpoint VARCHAR(500),
    last_synced_at TIMESTAMP,
    sync_status VARCHAR(50),
    config JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingestion Jobs
CREATE TABLE ingestion_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES data_sources(id),
    status VARCHAR(50),
    records_processed INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    config JSONB,
    created_by UUID REFERENCES users(id),
    status VARCHAR(50),
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled Reports
CREATE TABLE scheduled_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id),
    schedule VARCHAR(100),
    next_run_at TIMESTAMP,
    last_run_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    changes JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_habit_patterns_user ON habit_patterns(user_id);
CREATE INDEX idx_habit_patterns_category ON habit_patterns(category_id);
CREATE INDEX idx_barriers_type ON barriers(type);
CREATE INDEX idx_barriers_category ON barriers(category_id);
CREATE INDEX idx_unmet_needs_priority ON unmet_needs(priority_score);
CREATE INDEX idx_ingestion_jobs_status ON ingestion_jobs(status);
CREATE INDEX idx_ingestion_jobs_source ON ingestion_jobs(source_id);
```

### 5.3 MongoDB Collections

```javascript
// Raw Reviews Collection
db.createCollection("raw_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["source", "source_id", "content", "created_at"],
      properties: {
        source: { bsonType: "string" },
        source_id: { bsonType: "string" },
        content: { bsonType: "string" },
        rating: { bsonType: "number" },
        author: { bsonType: "string" },
        platform: { bsonType: "string" },
        metadata: { bsonType: "object" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Processed Reviews Collection
db.createCollection("processed_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["raw_review_id", "sentiment", "topics", "entities"],
      properties: {
        raw_review_id: { bsonType: "string" },
        sentiment: { 
          bsonType: "object",
          properties: {
            score: { bsonType: "number" },
            label: { bsonType: "string" }
          }
        },
        topics: { bsonType: "array" },
        entities: { bsonType: "array" },
        intent: { bsonType: "string" },
        categories: { bsonType: "array" },
        barriers: { bsonType: "array" },
        needs: { bsonType: "array" },
        processed_at: { bsonType: "date" }
      }
    }
  }
});

// User Behavior Collection
db.createCollection("user_behaviors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "actions"],
      properties: {
        user_id: { bsonType: "string" },
        actions: { 
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              type: { bsonType: "string" },
              category: { bsonType: "string" },
              timestamp: { bsonType: "date" },
              metadata: { bsonType: "object" }
            }
          }
        },
        segment_id: { bsonType: "string" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Social Media Posts Collection
db.createCollection("social_posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["platform", "post_id", "content", "created_at"],
      properties: {
        platform: { bsonType: "string" },
        post_id: { bsonType: "string" },
        content: { bsonType: "string" },
        author: { bsonType: "string" },
        likes: { bsonType: "number" },
        shares: { bsonType: "number" },
        comments: { bsonType: "number" },
        hashtags: { bsonType: "array" },
        mentions: { bsonType: "array" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Reddit Discussions Collection
db.createCollection("reddit_discussions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["subreddit", "post_id", "content", "created_at"],
      properties: {
        subreddit: { bsonType: "string" },
        post_id: { bsonType: "string" },
        content: { bsonType: "string" },
        author: { bsonType: "string" },
        upvotes: { bsonType: "number" },
        downvotes: { bsonType: "number" },
        comments: { bsonType: "array" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.raw_reviews.createIndex({ source: 1, created_at: -1 });
db.raw_reviews.createIndex({ source_id: 1 }, { unique: true });
db.processed_reviews.createIndex({ raw_review_id: 1 }, { unique: true });
db.processed_reviews.createIndex({ sentiment.label: 1 });
db.processed_reviews.createIndex({ topics: 1 });
db.user_behaviors.createIndex({ user_id: 1 });
db.user_behaviors.createIndex({ segment_id: 1 });
db.social_posts.createIndex({ platform: 1, created_at: -1 });
db.reddit_discussions.createIndex({ subreddit: 1, created_at: -1 });
```

### 5.4 Redis Data Structures

```python
# Cache Keys
CACHE_KEYS = {
    # User sessions
    "session:{user_id}": "hash",  # TTL: 24 hours
    
    # API rate limiting
    "rate_limit:{user_id}:{endpoint}": "string",  # TTL: 1 minute
    
    # Cached query results
    "cache:categories:heatmap:{date_range}": "json",  # TTL: 1 hour
    "cache:segments:summary": "json",  # TTL: 30 minutes
    "cache:habits:trends:{date_range}": "json",  # TTL: 1 hour
    
    # Real-time metrics
    "metrics:reviews:today": "counter",
    "metrics:sentiment:avg": "string",
    "metrics:active_users": "set",
    
    # Task queue status
    "task:ingestion:{job_id}": "hash",
    "task:processing:{job_id}": "hash",
    
    # Locks
    "lock:ingestion:{source_id}": "string",  # TTL: 5 minutes
    "lock:report:{report_id}": "string",  # TTL: 10 minutes
}
```

### 5.5 Snowflake Schema (Data Warehouse)

```sql
-- Fact Table: Reviews
CREATE TABLE fact_reviews (
    review_key INTEGER IDENTITY(1,1) PRIMARY KEY,
    review_id VARCHAR(255),
    source_key INTEGER,
    user_key INTEGER,
    category_key INTEGER,
    date_key INTEGER,
    sentiment_key INTEGER,
    rating INTEGER,
    content VARCHAR(MAX),
    created_at TIMESTAMP,
    ingested_at TIMESTAMP
);

-- Dimension Tables
CREATE TABLE dim_source (
    source_key INTEGER IDENTITY(1,1) PRIMARY KEY,
    source_id VARCHAR(255),
    source_name VARCHAR(255),
    source_type VARCHAR(100),
    platform VARCHAR(100)
);

CREATE TABLE dim_user (
    user_key INTEGER IDENTITY(1,1) PRIMARY KEY,
    user_id VARCHAR(255),
    segment_key INTEGER,
    acquisition_date DATE,
    location VARCHAR(255)
);

CREATE TABLE dim_category (
    category_key INTEGER IDENTITY(1,1) PRIMARY KEY,
    category_id VARCHAR(255),
    category_name VARCHAR(255),
    parent_category_key INTEGER,
    level INTEGER
);

CREATE TABLE dim_date (
    date_key INTEGER PRIMARY KEY,
    date DATE,
    day INTEGER,
    month INTEGER,
    quarter INTEGER,
    year INTEGER,
    day_of_week INTEGER,
    is_holiday BOOLEAN
);

CREATE TABLE dim_sentiment (
    sentiment_key INTEGER IDENTITY(1,1) PRIMARY KEY,
    sentiment_label VARCHAR(50),
    sentiment_score FLOAT
);

-- Aggregate Tables
CREATE TABLE agg_category_exploration (
    category_key INTEGER,
    date_key INTEGER,
    user_count INTEGER,
    exploration_count INTEGER,
    repeat_purchase_count INTEGER,
    avg_time_to_exploration FLOAT,
    PRIMARY KEY (category_key, date_key)
);

CREATE TABLE agg_segment_metrics (
    segment_key INTEGER,
    date_key INTEGER,
    user_count INTEGER,
    avg_order_value FLOAT,
    order_frequency FLOAT,
    retention_rate FLOAT,
    PRIMARY KEY (segment_key, date_key)
);
```

### 5.6 Elasticsearch Indices

```json
// Reviews Index
PUT /reviews
{
  "mappings": {
    "properties": {
      "content": { "type": "text", "analyzer": "english" },
      "sentiment": { 
        "type": "nested",
        "properties": {
          "score": { "type": "float" },
          "label": { "type": "keyword" }
        }
      },
      "topics": { "type": "keyword" },
      "categories": { "type": "keyword" },
      "source": { "type": "keyword" },
      "platform": { "type": "keyword" },
      "created_at": { "type": "date" },
      "rating": { "type": "integer" }
    }
  }
}

// Unmet Needs Index
PUT /unmet_needs
{
  "mappings": {
    "properties": {
      "description": { "type": "text", "analyzer": "english" },
      "category": { "type": "keyword" },
      "priority_score": { "type": "float" },
      "frequency": { "type": "integer" },
      "impact_score": { "type": "float" },
      "created_at": { "type": "date" }
    }
  }
}

// Barriers Index
PUT /barriers
{
  "mappings": {
    "properties": {
      "type": { "type": "keyword" },
      "description": { "type": "text" },
      "severity_score": { "type": "float" },
      "category": { "type": "keyword" },
      "platform": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}
```

---

## 6. Data Pipeline Architecture

### 6.1 Pipeline Overview

```
External Sources → Ingestion Services → Message Queue → Processing Services → Storage
```

### 6.2 Ingestion Layer

#### 6.2.1 Ingestion Services
- **App Store Ingestor**: Fetches iOS app reviews via iTunes RSS API
- **Play Store Ingestor**: Fetches Android app reviews via Google Play API
- **Reddit Ingestor**: Fetches discussions via Reddit API (PRAW)
- **Social Media Ingestor**: Fetches posts via Twitter/X, Facebook APIs
- **Product Reviews Ingestor**: Scrapes reviews from e-commerce sites
- **Quick-Commerce Ingestor**: Fetches Blinkit and competitor discussions

#### 6.2.2 Ingestion Flow
1. Fetch raw data from source API/scraper
2. Normalize to common format
3. Validate data quality
4. Send to Kafka topic "raw-data"
5. Update ingestion job status

### 6.3 Processing Layer

#### 6.3.1 Processing Services
- **Data Normalizer**: Standardizes data formats across sources
- **NLP Processor**: Runs sentiment, topic, intent analysis
- **ML Service**: Runs clustering, classification models
- **Analytics Engine**: Computes metrics and aggregations
- **Insight Generator**: Extracts actionable insights

#### 6.3.2 Processing Flow
1. Consume from Kafka topic "raw-data"
2. Normalize and clean text
3. Run NLP analysis (sentiment, topics, intent)
4. Run ML models (classification, clustering)
5. Store in PostgreSQL (metadata) and MongoDB (documents)
6. Index in Elasticsearch
7. Send to Kafka topic "processed-data"

### 6.4 Task Queue (Celery)

#### 6.4.1 Task Types
- **Ingestion Tasks**: Scheduled data fetching from sources
- **Processing Tasks**: Async processing of raw data
- **ML Tasks**: Model training and inference
- **Report Tasks**: Report generation and scheduling

#### 6.4.2 Task Configuration
```python
# Celery configuration
CELERY_CONFIG = {
    "broker_url": "redis://localhost:6379/0",
    "result_backend": "redis://localhost:6379/0",
    "task_serializer": "json",
    "accept_content": ["json"],
    "result_serializer": "json",
    "timezone": "UTC",
    "enable_utc": True,
    "task_routes": {
        "app.tasks.ingestion.*": {"queue": "ingestion"},
        "app.tasks.processing.*": {"queue": "processing"},
        "app.tasks.ml_tasks.*": {"queue": "ml"},
        "app.tasks.reports.*": {"queue": "reports"}
    }
}
```

---

## 7. Machine Learning Architecture

### 7.1 ML Components

#### 7.1.1 Models
- **User Clustering**: K-means/DBSCAN for user segmentation
- **Category Prediction**: Classification for category recommendation
- **Habit Detection**: Time-series analysis for pattern recognition
- **Barrier Classification**: Multi-class classification for barrier types
- **Need Detection**: NER and pattern matching for unmet needs
- **Anomaly Detection**: Isolation Forest for outlier detection

#### 7.1.2 ML Pipeline
1. **Feature Engineering**: Extract features from processed data
2. **Model Training**: Train models on historical data
3. **Model Evaluation**: Evaluate using cross-validation
4. **Model Registry**: Store models in MLflow
5. **Model Serving**: Serve models via FastAPI endpoints
6. **Model Monitoring**: Track model performance over time

### 7.2 ML Model Registry (MLflow)

```python
# MLflow configuration
MLFLOW_CONFIG = {
    "tracking_uri": "http://localhost:5000",
    "experiment_name": "discovery-engine",
    "models": {
        "user_clustering": "sklearn-kmeans",
        "category_prediction": "sklearn-randomforest",
        "habit_detection": "prophet",
        "barrier_classification": "transformers-bert",
        "need_detection": "spacy-ner"
    }
}
```

---

## 8. Infrastructure & DevOps

### 8.1 Container Orchestration

#### 8.1.1 Docker Compose (Development)
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000/api
  
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/discovery_engine
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
  
  celery_worker:
    build: ./backend
    command: celery -A app.tasks worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/discovery_engine
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=discovery_engine
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"
  
  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"
    environment:
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
    depends_on:
      - zookeeper
  
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
  
  elasticsearch:
    image: elasticsearch:8.11.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
  
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  postgres_data:
  mongo_data:
```

#### 8.1.2 Kubernetes (Production)
- **Deployment**: Frontend, Backend, Celery Workers
- **Services**: Load balancers for each service
- **ConfigMaps**: Environment configurations
- **Secrets**: Sensitive data (API keys, passwords)
- **Horizontal Pod Autoscaler**: Auto-scale based on CPU/memory
- **Ingress**: External access routing

### 8.2 CI/CD Pipeline

#### 8.2.1 GitHub Actions
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          pip install -r backend/requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest tests/
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker build -t discovery-engine-backend ./backend
          docker build -t discovery-engine-frontend ./frontend
      - name: Push to registry
        run: |
          docker push discovery-engine-backend
          docker push discovery-engine-frontend
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/
```

### 8.3 Monitoring & Observability

#### 8.3.1 Monitoring Stack
- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **Loki**: Log aggregation
- **Jaeger**: Distributed tracing
- **Alertmanager**: Alert management

#### 8.3.2 Key Metrics
- **System Metrics**: CPU, memory, disk, network
- **Application Metrics**: Request rate, error rate, latency
- **Business Metrics**: Data ingestion rate, processing time, insight generation
- **ML Metrics**: Model accuracy, prediction latency, drift detection

---

## 9. Security & Compliance

### 9.1 Authentication & Authorization

#### 9.1.1 Authentication
- **JWT Tokens**: Stateless authentication
- **OAuth 2.0**: Third-party integration
- **Session Management**: Redis-backed sessions
- **Multi-factor Authentication**: Optional MFA support

#### 9.1.2 Authorization
- **Role-Based Access Control (RBAC)**: Admin, Analyst, Viewer roles
- **Permission System**: Fine-grained permissions
- **API Key Management**: For programmatic access

### 9.2 Data Privacy

#### 9.2.1 Compliance
- **GDPR**: Right to be forgotten, data portability
- **CCPA**: Consumer privacy rights
- **Data Anonymization**: PII removal, hashing
- **Data Retention**: Automatic data deletion policies

#### 9.2.2 Data Encryption
- **At Rest**: AES-256 encryption for databases
- **In Transit**: TLS 1.3 for all communications
- **Key Management**: AWS KMS or HashiCorp Vault

### 9.3 API Security

#### 9.3.1 Rate Limiting
- **Per-User Limits**: 1000 requests/minute
- **Per-IP Limits**: 100 requests/minute
- **Burst Protection**: Token bucket algorithm

#### 9.3.2 Input Validation
- **Schema Validation**: Pydantic models
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Input sanitization

---

## 10. Technology Stack Summary

### 10.1 Frontend
- **Framework**: Next.js 14+, React 18+
- **UI**: shadcn/ui, TailwindCSS
- **State**: Zustand, React Query
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod
- **Auth**: NextAuth.js
- **Language**: TypeScript

### 10.2 Backend
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Async**: asyncio, uvicorn
- **Task Queue**: Celery, Redis
- **Message Queue**: Kafka/RabbitMQ
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Testing**: pytest

### 10.3 Databases
- **PostgreSQL**: Operational data
- **MongoDB**: Document storage
- **Redis**: Caching
- **Snowflake/BigQuery**: Data warehouse
- **Elasticsearch**: Search index
- **S3/MinIO**: Object storage

### 10.4 ML/AI
- **NLP**: Transformers, spaCy, NLTK
- **ML**: scikit-learn, PyTorch
- **Model Registry**: MLflow
- **Serving**: FastAPI endpoints

### 10.5 Infrastructure
- **Containers**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: Loki
- **Tracing**: Jaeger

---

## 11. API Specifications

### 11.1 Authentication API

#### POST /api/v1/auth/login
```json
Request:
{
  "email": "user@blinkit.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### 11.2 Categories API

#### GET /api/v1/categories/heatmap
```json
Request:
?start_date=2024-01-01&end_date=2024-01-31

Response:
{
  "data": [
    {
      "category": "Groceries",
      "exploration_rate": 0.75,
      "repeat_rate": 0.85,
      "user_count": 12500
    }
  ]
}
```

### 11.3 Segments API

#### GET /api/v1/segments
```json
Response:
{
  "data": [
    {
      "id": "seg-123",
      "name": "High Explorers",
      "exploration_propensity": "high",
      "user_count": 5432,
      "top_categories": ["Electronics", "Fashion"]
    }
  ]
}
```

---

## 12. Data Models

### 12.1 User Model
```python
class User(Base):
    __tablename__ = "users"
    
    id: UUID = Column(UUID, primary_key=True)
    email: str = Column(String(255), unique=True, nullable=False)
    password_hash: str = Column(String(255), nullable=False)
    full_name: str = Column(String(255))
    role: str = Column(String(50), default="analyst")
    is_active: bool = Column(Boolean, default=True)
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

### 12.2 Category Model
```python
class Category(Base):
    __tablename__ = "categories"
    
    id: UUID = Column(UUID, primary_key=True)
    name: str = Column(String(255), nullable=False)
    parent_id: UUID = Column(UUID, ForeignKey("categories.id"))
    level: int = Column(Integer, default=0)
    blinkit_category_id: str = Column(String(100))
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

### 12.3 Segment Model
```python
class UserSegment(Base):
    __tablename__ = "user_segments"
    
    id: UUID = Column(UUID, primary_key=True)
    name: str = Column(String(255), nullable=False)
    description: str = Column(Text)
    exploration_propensity: str = Column(String(50))
    category_preferences: dict = Column(JSONB)
    engagement_level: str = Column(String(50))
    frustration_themes: dict = Column(JSONB)
    user_count: int = Column(Integer, default=0)
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

### 12.4 Habit Model
```python
class HabitPattern(Base):
    __tablename__ = "habit_patterns"
    
    id: UUID = Column(UUID, primary_key=True)
    user_id: UUID = Column(UUID)
    category_id: UUID = Column(UUID, ForeignKey("categories.id"))
    habit_strength: float = Column(Float)
    repeat_frequency: int = Column(Integer)
    last_purchase_date: datetime = Column(DateTime)
    habit_disruption_date: datetime = Column(DateTime)
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

### 12.5 Barrier Model
```python
class Barrier(Base):
    __tablename__ = "barriers"
    
    id: UUID = Column(UUID, primary_key=True)
    type: str = Column(String(50), nullable=False)
    description: str = Column(Text)
    severity_score: float = Column(Float)
    category_id: UUID = Column(UUID, ForeignKey("categories.id"))
    platform: str = Column(String(100))
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

### 12.6 Unmet Need Model
```python
class UnmetNeed(Base):
    __tablename__ = "unmet_needs"
    
    id: UUID = Column(UUID, primary_key=True)
    description: str = Column(Text, nullable=False)
    category: str = Column(String(100))
    frequency: int = Column(Integer, default=0)
    impact_score: float = Column(Float)
    priority_score: float = Column(Float)
    fulfillment_status: str = Column(String(50))
    created_at: datetime = Column(DateTime, default=func.now())
    updated_at: datetime = Column(DateTime, default=func.now(), onupdate=func.now())
```

---

**Document Version**: 1.0  
**Last Updated**: July 21, 2026  
**Status**: Draft for Review
