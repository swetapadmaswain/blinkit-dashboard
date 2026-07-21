# AI-Powered Discovery Engine for Blinkit - Implementation Setup Guide

## Table of Contents
1. [Project Structure Overview](#1-project-structure-overview)
2. [Prerequisites](#2-prerequisites)
3. [Step 1: Create Project Root Structure](#3-step-1-create-project-root-structure)
4. [Step 2: Set Up Database Infrastructure](#4-step-2-set-up-database-infrastructure)
5. [Step 3: Set Up Backend Application](#5-step-3-set-up-backend-application)
6. [Step 4: Set Up Frontend Application](#6-step-4-set-up-frontend-application)
7. [Step 5: Set Up Infrastructure & DevOps](#7-step-5-set-up-infrastructure--devops)
8. [Step 6: Configure Environment Variables](#8-step-6-configure-environment-variables)
9. [Step 7: Initialize Git Repository](#9-step-7-initialize-git-repository)
10. [Step 8: Run Development Environment](#10-step-8-run-development-environment)
11. [Step 9: Deployment Setup](#11-step-9-deployment-setup)

---

## 1. Project Structure Overview

```
blinkit-dashboard/
├── frontend/              # Next.js frontend application
├── backend/               # FastAPI backend application
├── database/              # Database schemas and migrations
├── infrastructure/        # Docker, Kubernetes, CI/CD configs
├── ml-models/            # Machine learning models
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── docker-compose.yml   # Local development Docker compose
└── README.md           # Project README
```

---

## 2. Prerequisites

### 2.1 Required Software
- **Node.js**: v18.0.0 or higher
- **Python**: v3.11 or higher
- **Docker**: v20.10 or higher
- **Docker Compose**: v2.0 or higher
- **Git**: v2.30 or higher

### 2.2 Optional but Recommended
- **VS Code**: With Python, TypeScript, Docker extensions
- **Postman**: For API testing
- **DBeaver**: For database management

---

## 3. Step 1: Create Project Root Structure

### 3.1 Create Root Directory

```bash
cd "c:/Top fellow - blinkit"

# Create root structure
mkdir -p frontend backend database infrastructure ml-models docs scripts
```

### 3.2 Create Root Configuration Files

#### Create `.gitignore`

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.so
*.egg
*.egg-info/
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite
*.sqlite3

# Logs
logs/
*.log

# ML Models
ml-models/*.pkl
ml-models/*.h5
ml-models/*.pt
ml-models/*.bin

# Docker
docker-compose.override.yml

# Temporary files
tmp/
temp/
*.tmp

# Test coverage
.coverage
htmlcov/
.pytest_cache/

# Jupyter
.ipynb_checkpoints/
*.ipynb

# Data files
data/
*.csv
*.json
*.parquet
EOF
```

#### Create `.env.example`

```bash
cat > .env.example << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/discovery_engine
MONGODB_URL=mongodb://localhost:27017/discovery_engine
REDIS_URL=redis://localhost:6379/0
ELASTICSEARCH_URL=http://localhost:9200

# JWT Configuration
JWT_SECRET_KEY=your-jwt-secret-key-change-this
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60

# API Configuration
API_RATE_LIMIT=1000/minute
CORS_ORIGINS=http://localhost:3000,http://localhost:8000

# External API Keys
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
APP_STORE_APP_ID=your-app-store-app-id
PLAY_STORE_PACKAGE_NAME=your-play-store-package-name
PLAY_STORE_API_TOKEN=your-play-store-api-token

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Logging
LOG_LEVEL=INFO
LOG_FORMAT=json
EOF
```

#### Create `README.md`

```bash
cat > README.md << 'EOF'
# AI-Powered Discovery Engine for Blinkit

An AI-powered system to analyze user-generated content from multiple platforms.

## Quick Start

1. Copy `.env.example` to `.env` and configure
2. Run `docker-compose up -d` to start infrastructure
3. Follow the Implementation Setup Guide for detailed setup

## Documentation

- [Problem Statement](Problem Statement.md)
- [Architecture](Architecture.md)
- [Implementation Setup Guide](Implementation Setup Guide.md)
EOF
```

---

## 4. Step 2: Set Up Database Infrastructure

### 4.1 Create Database Folder Structure

```bash
cd database
mkdir -p postgres/schemas postgres/indexes mongodb/collections mongodb/indexes elasticsearch/indices elasticsearch/mappings migrations seeds
```

### 4.2 Create PostgreSQL Schema Files

#### Create Initial Schema

```bash
cd postgres/schemas
cat > 001_initial_schema.sql << 'EOF'
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE exploration_propensity AS ENUM ('high', 'medium', 'low');
CREATE TYPE barrier_type AS ENUM ('price', 'trust', 'information', 'convenience');
CREATE TYPE fulfillment_status AS ENUM ('pending', 'in_progress', 'fulfilled');
CREATE TYPE sync_status AS ENUM ('active', 'inactive', 'error');
CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed');
CREATE TYPE report_status AS ENUM ('pending', 'generating', 'completed', 'failed');
CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'viewer');
EOF
```

#### Create Users Schema

```bash
cat > 002_users.sql << 'EOF'
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role user_role DEFAULT 'analyst',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
EOF
```

#### Create Categories Schema

```bash
cat > 003_categories.sql << 'EOF'
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    level INTEGER DEFAULT 0,
    blinkit_category_id VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_level ON categories(level);
EOF
```

#### Create Segments Schema

```bash
cat > 004_segments.sql << 'EOF'
CREATE TABLE user_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    exploration_propensity exploration_propensity,
    category_preferences JSONB,
    engagement_level VARCHAR(50),
    frustration_themes JSONB,
    user_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_segments_propensity ON user_segments(exploration_propensity);
EOF
```

#### Create Habits Schema

```bash
cat > 005_habits.sql << 'EOF'
CREATE TABLE habit_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    habit_strength FLOAT,
    repeat_frequency INTEGER,
    last_purchase_date TIMESTAMP,
    habit_disruption_date TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_habit_patterns_user ON habit_patterns(user_id);
CREATE INDEX idx_habit_patterns_category ON habit_patterns(category_id);
EOF
```

#### Create Barriers Schema

```bash
cat > 006_barriers.sql << 'EOF'
CREATE TABLE barriers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type barrier_type NOT NULL,
    description TEXT,
    severity_score FLOAT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    platform VARCHAR(100),
    source_review_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_barriers_type ON barriers(type);
CREATE INDEX idx_barriers_category ON barriers(category_id);
EOF
```

#### Create Needs Schema

```bash
cat > 007_needs.sql << 'EOF'
CREATE TABLE unmet_needs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    category VARCHAR(100),
    frequency INTEGER DEFAULT 0,
    impact_score FLOAT,
    priority_score FLOAT,
    fulfillment_status fulfillment_status DEFAULT 'pending',
    source_review_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_needs_category ON unmet_needs(category);
CREATE INDEX idx_needs_priority ON unmet_needs(priority_score);
EOF
```

#### Create Data Sources Schema

```bash
cat > 008_data_sources.sql << 'EOF'
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    api_endpoint VARCHAR(500),
    last_synced_at TIMESTAMP,
    sync_status sync_status DEFAULT 'active',
    config JSONB,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_data_sources_type ON data_sources(type);
CREATE INDEX idx_data_sources_status ON data_sources(sync_status);
EOF
```

#### Create Ingestion Jobs Schema

```bash
cat > 009_ingestion_jobs.sql << 'EOF'
CREATE TABLE ingestion_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES data_sources(id) ON DELETE CASCADE,
    status job_status DEFAULT 'pending',
    records_processed INTEGER DEFAULT 0,
    records_failed INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ingestion_jobs_source ON ingestion_jobs(source_id);
CREATE INDEX idx_ingestion_jobs_status ON ingestion_jobs(status);
EOF
```

#### Create Reports Schema

```bash
cat > 010_reports.sql << 'EOF'
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    config JSONB,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    status report_status DEFAULT 'pending',
    file_path VARCHAR(500),
    file_size BIGINT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_by ON reports(created_by);
EOF
```

#### Create Audit Log Schema

```bash
cat > 011_audit_log.sql << 'EOF'
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
EOF
```

### 4.3 Create MongoDB Collection Files

```bash
cd ../../mongodb/collections

# Create raw_reviews.js
cat > raw_reviews.js << 'EOF'
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
db.raw_reviews.createIndex({ source: 1, created_at: -1 });
db.raw_reviews.createIndex({ source_id: 1 }, { unique: true });
EOF

# Create processed_reviews.js
cat > processed_reviews.js << 'EOF'
db.createCollection("processed_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["raw_review_id", "sentiment", "topics"],
      properties: {
        raw_review_id: { bsonType: "string" },
        sentiment: { bsonType: "object" },
        topics: { bsonType: "array" },
        entities: { bsonType: "array" },
        intent: { bsonType: "string" },
        categories: { bsonType: "array" },
        processed_at: { bsonType: "date" }
      }
    }
  }
});
db.processed_reviews.createIndex({ raw_review_id: 1 }, { unique: true });
db.processed_reviews.createIndex({ "sentiment.label": 1 });
EOF

# Create user_behaviors.js
cat > user_behaviors.js << 'EOF'
db.createCollection("user_behaviors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "actions"],
      properties: {
        user_id: { bsonType: "string" },
        actions: { bsonType: "array" },
        segment_id: { bsonType: "string" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.user_behaviors.createIndex({ user_id: 1 });
db.user_behaviors.createIndex({ segment_id: 1 });
EOF

# Create social_posts.js
cat > social_posts.js << 'EOF'
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
        created_at: { bsonType: "date" }
      }
    }
  }
});
db.social_posts.createIndex({ platform: 1, created_at: -1 });
EOF

# Create reddit_discussions.js
cat > reddit_discussions.js << 'EOF'
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
        created_at: { bsonType: "date" }
      }
    }
  }
});
db.reddit_discussions.createIndex({ subreddit: 1, created_at: -1 });
EOF
```

### 4.4 Create Elasticsearch Index Files

```bash
cd ../../elasticsearch/indices

# Create reviews.json
cat > reviews.json << 'EOF'
PUT /reviews
{
  "mappings": {
    "properties": {
      "content": { "type": "text", "analyzer": "english" },
      "sentiment": { "type": "nested" },
      "topics": { "type": "keyword" },
      "categories": { "type": "keyword" },
      "source": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}
EOF

# Create unmet_needs.json
cat > unmet_needs.json << 'EOF'
PUT /unmet_needs
{
  "mappings": {
    "properties": {
      "description": { "type": "text", "analyzer": "english" },
      "category": { "type": "keyword" },
      "priority_score": { "type": "float" },
      "created_at": { "type": "date" }
    }
  }
}
EOF

# Create barriers.json
cat > barriers.json << 'EOF'
PUT /barriers
{
  "mappings": {
    "properties": {
      "type": { "type": "keyword" },
      "description": { "type": "text" },
      "severity_score": { "type": "float" },
      "category": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}
EOF
```

### 4.5 Create Database README

```bash
cd ../../
cat > database/README.md << 'EOF'
# Database Setup

## PostgreSQL

Run schema files in order:
```bash
psql -U postgres -d discovery_engine -f postgres/schemas/001_initial_schema.sql
psql -U postgres -d discovery_engine -f postgres/schemas/002_users.sql
# ... continue for all schema files
```

## MongoDB

Run collection scripts:
```bash
mongo discovery_engine mongodb/collections/raw_reviews.js
mongo discovery_engine mongodb/collections/processed_reviews.js
# ... continue for all collection files
```

## Elasticsearch

Create indices:
```bash
curl -X PUT "localhost:9200/reviews" -H 'Content-Type: application/json' -d @elasticsearch/indices/reviews.json
```

## Using Docker Compose

The easiest way is using the root `docker-compose.yml`:
```bash
docker-compose up -d postgres mongodb redis elasticsearch
```
EOF
```

---

## 5. Step 3: Set Up Backend Application

### 5.1 Create Backend Folder Structure

```bash
cd ../backend
mkdir -p app/{api/v1,core,models,schemas,services,tasks,ml,nlp,ingestors,db/repositories,integrations,utils} tests/{unit,integration,e2e} alembic docker
```

### 5.2 Create Backend Configuration Files

#### Create `requirements.txt`

```bash
cat > requirements.txt << 'EOF'
fastapi==0.104.0
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
pymongo==4.6.0
redis==5.0.1
celery==5.3.4
elasticsearch==8.11.0
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
python-dotenv==1.0.0
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
asyncpraw==7.7.1
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
EOF
```

#### Create `pyproject.toml`

```bash
cat > pyproject.toml << 'EOF'
[tool.black]
line-length = 100
target-version = ['py311']

[tool.isort]
profile = "black"
line_length = 100

[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"
EOF
```

#### Create `.env.example`

```bash
cat > .env.example << 'EOF'
DATABASE_URL=postgresql://postgres:password@localhost:5432/discovery_engine
MONGODB_URL=mongodb://localhost:27017/discovery_engine
REDIS_URL=redis://localhost:6379/0
ELASTICSEARCH_URL=http://localhost:9200
JWT_SECRET_KEY=your-jwt-secret-key-change-this
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
API_RATE_LIMIT=1000/minute
CORS_ORIGINS=http://localhost:3000
LOG_LEVEL=INFO
EOF
```

### 5.3 Create Core Backend Files

#### Create `app/__init__.py`

```bash
cat > app/__init__.py << 'EOF'
__version__ = "1.0.0"
EOF
```

#### Create `app/config.py`

```bash
cat > app/config.py << 'EOF'
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:password@localhost:5432/discovery_engine"
    mongodb_url: str = "mongodb://localhost:27017/discovery_engine"
    redis_url: str = "redis://localhost:6379/0"
    elasticsearch_url: str = "http://localhost:9200"
    jwt_secret_key: str = "your-jwt-secret-key-change-this"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60
    api_rate_limit: str = "1000/minute"
    cors_origins: List[str] = ["http://localhost:3000"]
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
EOF
```

#### Create `app/main.py`

```bash
cat > app/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

app = FastAPI(
    title="AI-Powered Discovery Engine API",
    version="1.0.0",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI-Powered Discovery Engine API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
EOF
```

#### Create API Router Files

```bash
# Create API structure
touch app/api/__init__.py app/api/v1/__init__.py app/api/v1/deps.py

# Create auth router
cat > app/api/v1/auth.py << 'EOF'
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    return {"access_token": "dummy-token", "token_type": "bearer"}
EOF

# Create other router stubs
for endpoint in categories segments habits barriers needs reports data; do
    cat > app/api/v1/${endpoint}.py << EOF
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_${endpoint}s():
    return {"data": []}

@router.get("/{id}")
async def get_${endpoint}(id: str):
    return {"id": id}
EOF
done
```

### 5.4 Create Docker Configuration

```bash
cat > docker/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y gcc postgresql-client && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
```

### 5.5 Create Backend README

```bash
cat > README.md << 'EOF'
# Backend Application

FastAPI backend for the AI-Powered Discovery Engine.

## Setup

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the application:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Testing

```bash
pytest tests/
```
EOF
```

---

## 6. Step 4: Set Up Frontend Application

### 6.1 Create Frontend Folder Structure

```bash
cd ../frontend
mkdir -p src/{app/{dashboard/{overview,categories,habits,barriers,segments,needs,reports},login,api},components/{ui,dashboard,analytics,reports,shared},store,lib/{api,hooks,utils},types} public
```

### 6.2 Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 6.3 Install Additional Dependencies

```bash
npm install zustand @tanstack/react-query recharts react-hook-form zod next-auth axios date-fns lucide-react clsx tailwind-merge
npx shadcn-ui@latest init
```

### 6.4 Create Frontend Configuration Files

#### Create `.env.local.example`

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
EOF
```

#### Create `src/lib/utils.ts`

```bash
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
```

### 6.5 Create Frontend Dockerfile

```bash
cat > Dockerfile << 'EOF'
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
EOF
```

### 6.6 Create Frontend README

```bash
cat > README.md << 'EOF'
# Frontend Application

Next.js frontend for the AI-Powered Discovery Engine Dashboard.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000
EOF
```

---

## 7. Step 5: Set Up Infrastructure & DevOps

### 7.1 Create Infrastructure Folder Structure

```bash
cd ../infrastructure
mkdir -p docker kubernetes/{frontend,backend,database} github-actions terraform monitoring
```

### 7.2 Create Docker Compose File

```bash
cd ../
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: discovery-postgres
    environment:
      POSTGRES_DB: discovery_engine
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/postgres:/docker-entrypoint-initdb.d
    networks:
      - discovery-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  mongodb:
    image: mongo:7
    container_name: discovery-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - discovery-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: discovery-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - discovery-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: elasticsearch:8.11.0
    container_name: discovery-elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - discovery-network
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: docker/Dockerfile
    container_name: discovery-backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/discovery_engine
      - MONGODB_URL=mongodb://mongodb:27017/discovery_engine
      - REDIS_URL=redis://redis:6379/0
      - ELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      postgres:
        condition: service_healthy
      mongodb:
        condition: service_healthy
      redis:
        condition: service_healthy
      elasticsearch:
        condition: service_healthy
    networks:
      - discovery-network
    volumes:
      - ./backend:/app
      - /app/__pycache__

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: discovery-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000/api
    depends_on:
      - backend
    networks:
      - discovery-network
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

  celery_worker:
    build:
      context: ./backend
      dockerfile: docker/Dockerfile
    container_name: discovery-celery-worker
    command: celery -A app.tasks worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/discovery_engine
      - MONGODB_URL=mongodb://mongodb:27017/discovery_engine
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - mongodb
      - redis
    networks:
      - discovery-network
    volumes:
      - ./backend:/app
      - /app/__pycache__

volumes:
  postgres_data:
  mongo_data:
  redis_data:
  elasticsearch_data:

networks:
  discovery-network:
    driver: bridge
EOF
```

### 7.3 Create GitHub Actions CI/CD

```bash
cd infrastructure/github-actions
cat > ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest tests/

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Run lint
        run: |
          cd frontend
          npm run lint
EOF
```

### 7.4 Create Infrastructure README

```bash
cd ../..
cat > infrastructure/README.md << 'EOF'
# Infrastructure & DevOps

## Local Development

Start all services with Docker Compose:

```bash
docker-compose up -d
```

Services:
- PostgreSQL (port 5432)
- MongoDB (port 27017)
- Redis (port 6379)
- Elasticsearch (port 9200)
- Backend API (port 8000)
- Frontend Dashboard (port 3000)
- Celery Worker
EOF
```

---

## 8. Step 6: Configure Environment Variables

### 8.1 Create Environment Setup Script

```bash
cat > scripts/setup-env.sh << 'EOF'
#!/bin/bash

echo "Setting up environment variables..."

# Copy root .env.example
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
    echo "Please edit .env with your configuration"
else
    echo ".env file already exists"
fi

# Copy backend .env.example
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env file"
else
    echo "backend/.env file already exists"
fi

# Copy frontend .env.local.example
if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.local.example frontend/.env.local
    echo "Created frontend/.env.local file"
else
    echo "frontend/.env.local file already exists"
fi

echo "Environment setup complete!"
EOF

chmod +x scripts/setup-env.sh
```

---

## 9. Step 7: Initialize Git Repository

### 9.1 Initialize Git (if not already done)

```bash
cd "c:/Top fellow - blinkit"

if [ ! -d .git ]; then
    git init
    git remote add origin https://github.com/swetapadmaswain/blinkit-dashboard.git
    echo "Git repository initialized"
else
    echo "Git repository already exists"
fi
```

### 9.2 Create Initial Commit

```bash
git add .
git commit -m "Initial setup: Project structure with frontend, backend, database, and infrastructure"
git push -u origin master
```

---

## 10. Step 8: Run Development Environment

### 10.1 Start Infrastructure with Docker Compose

```bash
cd "c:/Top fellow - blinkit"

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### 10.2 Run Backend Locally (Optional)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Run the application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 10.3 Run Frontend Locally (Optional)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

### 10.4 Access Applications

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379
- **Elasticsearch**: http://localhost:9200

---

## 11. Step 9: Deployment Setup

### 11.1 Production Deployment Checklist

- [ ] Update all environment variables with production values
- [ ] Change JWT secret keys
- [ ] Configure SSL/TLS certificates
- [ ] Set up production databases
- [ ] Configure backup strategies
- [ ] Set up monitoring and alerting
- [ ] Configure CDN for static assets
- [ ] Set up log aggregation
- [ ] Configure rate limiting
- [ ] Enable security headers

### 11.2 Kubernetes Deployment

Create Kubernetes manifests in `infrastructure/kubernetes/`:

```bash
cd infrastructure/kubernetes

# Example backend deployment
cat > backend/deployment.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: discovery-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: discovery-backend
  template:
    metadata:
      labels:
        app: discovery-backend
    spec:
      containers:
      - name: backend
        image: discovery-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: database-url
EOF
```

### 11.3 CI/CD Pipeline

The GitHub Actions workflow in `infrastructure/github-actions/ci.yml` will:
- Run tests on push/PR
- Build Docker images
- Deploy to staging/production

---

## Troubleshooting

### Common Issues

#### Docker Compose Issues

**Problem**: Services fail to start
```bash
# Solution: Check logs
docker-compose logs <service-name>

# Solution: Rebuild containers
docker-compose down
docker-compose up -d --build
```

#### Backend Issues

**Problem**: Database connection errors
```bash
# Solution: Check if PostgreSQL is running
docker-compose ps postgres

# Solution: Check database logs
docker-compose logs postgres
```

#### Frontend Issues

**Problem**: API connection errors
```bash
# Solution: Check NEXT_PUBLIC_API_URL in .env.local
# Should match backend URL
```

#### Port Conflicts

**Problem**: Ports already in use
```bash
# Solution: Change ports in docker-compose.yml
# Or stop conflicting services
```

### Getting Help

- Check logs: `docker-compose logs -f`
- Check service status: `docker-compose ps`
- Restart services: `docker-compose restart`
- Rebuild services: `docker-compose up -d --build`

---

**Document Version**: 1.0  
**Last Updated**: July 21, 2026  
**Status**: Ready for Implementation
