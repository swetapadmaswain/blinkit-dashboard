# Blinkit Dashboard Deployment Plan

## Overview
This document provides a detailed step-by-step guide to deploy the Blinkit Discovery Engine Dashboard using free cloud services.

## Architecture
- **Frontend**: Next.js 14 (React + Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **Deployment**: Vercel (frontend), Render (backend + databases)

## Prerequisites
- GitHub account with repository access
- Domain name (optional, for custom URLs)
- Basic knowledge of terminal commands

---

## Phase 1: Account Setup (Free Tiers)

### 1.1 Vercel Account (Frontend)
1. Visit https://vercel.com/signup
2. Sign up with GitHub account
3. Verify email address
4. Free tier includes:
   - Unlimited deployments
   - 100GB bandwidth per month
   - 6GB serverless function execution
   - Automatic HTTPS
   - Global CDN

### 1.2 Render Account (Backend + Databases)
1. Visit https://render.com/register
2. Sign up with GitHub account
3. Verify email address
4. Free tier includes:
   - Web Service: 750 hours/month (free)
   - PostgreSQL: 90 days free, then $7/month
   - Redis: 90 days free, then $5/month
   - Automatic SSL certificates

### 1.3 MongoDB Atlas Account (MongoDB)
1. Visit https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Free tier includes:
   - 512MB storage
   - Shared RAM
   - 3 replica sets

### 1.4 Redis Cloud Account (Alternative Redis)
1. Visit https://redis.com/try-free/
2. Sign up for free account
3. Free tier includes:
   - 30MB database
   - 256 connections
   - 256MB per month operations

---

## Phase 2: Environment Configuration

### 2.1 Backend Environment Variables
Create a `.env.production` file in the backend directory:

```env
# Database URLs (to be filled after database setup)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
MONGODB_URL=mongodb+srv://USER:PASSWORD@HOST/DATABASE
REDIS_URL=redis://HOST:PORT
ELASTICSEARCH_URL=http://HOST:PORT

# Security
SECRET_KEY=your-secret-key-here-generate-secure-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app

# API Keys (if needed)
GOOGLE_PLAY_API_KEY=your-key
APP_STORE_API_KEY=your-key
```

### 2.2 Frontend Environment Variables
Create a `.env.production` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com/api
NEXT_PUBLIC_APP_NAME=Blinkit Dashboard
```

---

## Phase 3: Database Setup

### 3.1 PostgreSQL on Render
1. Log in to Render dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: blinkit-postgres
   - **Database**: discovery_engine
   - **User**: postgres (or custom)
   - **Region**: Oregon (closest to your users)
4. Click "Create Database"
5. Wait for database to be ready (~2-3 minutes)
6. Copy the **Internal Database URL** from Render dashboard
7. Update `DATABASE_URL` in backend `.env.production`

### 3.2 MongoDB Atlas Setup
1. Log in to MongoDB Atlas
2. Click "Build a Database"
3. Select **M0 Sandbox** (free tier)
4. Configure:
   - **Cloud Provider**: AWS
   - **Region**: us-east-1 (or closest)
   - **Cluster Name**: blinkit-cluster
5. Click "Create"
6. Create Database User:
   - Username: blinkit_admin
   - Password: (generate strong password)
   - Database Access: Read and write to any database
7. Network Access:
   - Add IP: 0.0.0.0/0 (allow all for Render) OR
   - Add Render's VPC IP ranges
8. Click "Connect" → "Connect your application"
9. Copy connection string
10. Update `MONGODB_URL` in backend `.env.production`

### 3.3 Redis on Render
1. Log in to Render dashboard
2. Click "New +" → "Redis"
3. Configure:
   - **Name**: blinkit-redis
   - **Region**: Oregon (same as PostgreSQL)
4. Click "Create Redis Instance"
5. Copy the **Internal Redis URL** from Render dashboard
6. Update `REDIS_URL` in backend `.env.production`

### 3.4 Elasticsearch (Alternative: Skip or Use Paid)
**Option A: Skip Elasticsearch** (Recommended for free deployment)
- Remove Elasticsearch dependencies from backend
- Use MongoDB for search functionality
- Update backend code to use MongoDB text search

**Option B: Use Bonsai Elasticsearch** (Free trial)
1. Visit https://bonsai.io/
2. Sign up for free trial (14 days)
3. Create cluster
4. Update `ELASTICSEARCH_URL` in backend `.env.production`

---

## Phase 4: Backend Deployment

### 4.1 Prepare Backend for Render
1. Update `backend/docker/Dockerfile` for production:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. Create `backend/requirements.txt` (ensure it exists with all dependencies)

3. Add health check endpoint to `backend/app/main.py`:

```python
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

4. Create `render.yaml` in backend directory:

```yaml
services:
  - type: web
    name: blinkit-backend
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: blinkit-postgres
          property: connectionString
      - key: MONGODB_URL
        sync: false
      - key: REDIS_URL
        fromService:
          type: redis
          name: blinkit-redis
          property: connectionString
      - key: SECRET_KEY
        generateValue: true
      - key: FRONTEND_URL
        value: https://your-frontend-domain.vercel.app
```

### 4.2 Deploy Backend to Render
1. Log in to Render dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: blinkit-backend
   - **Branch**: master
   - **Root Directory**: backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - `DATABASE_URL`: (from Render PostgreSQL)
   - `MONGODB_URL`: (from MongoDB Atlas)
   - `REDIS_URL`: (from Render Redis)
   - `SECRET_KEY`: (generate secure random string)
   - `FRONTEND_URL`: (your Vercel domain)
6. Click "Create Web Service"
7. Wait for deployment (~5-10 minutes)
8. Copy the backend URL (e.g., `https://blinkit-backend.onrender.com`)

---

## Phase 5: Frontend Deployment

### 5.1 Prepare Frontend for Vercel
1. Update `frontend/Dockerfile` (not needed for Vercel, but keep for reference)

2. Create `vercel.json` in frontend directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://blinkit-backend.onrender.com/api"
  }
}
```

3. Update `frontend/next.config.js` (create if not exists):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://blinkit-backend.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### 5.2 Deploy Frontend to Vercel
1. Log in to Vercel dashboard
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://blinkit-backend.onrender.com/api`
6. Click "Deploy"
7. Wait for deployment (~2-3 minutes)
8. Copy the frontend URL (e.g., `https://blinkit-dashboard.vercel.app`)

---

## Phase 6: CORS and Security Configuration

### 6.1 Update Backend CORS
Update `backend/app/main.py` to allow frontend domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://blinkit-dashboard.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 6.2 Update Frontend API URL
1. Go to Vercel project settings
2. Update `NEXT_PUBLIC_API_URL` environment variable
3. Redeploy frontend

---

## Phase 7: Database Migration

### 7.1 Run Database Migrations
1. SSH into Render backend (or use Render shell)
2. Run migrations:
   ```bash
   alembic upgrade head
   ```

### 7.2 Seed Initial Data
1. Run seed script if available:
   ```bash
   python -m app.scripts.seed_data
   ```

---

## Phase 8: Testing and Verification

### 8.1 Health Checks
1. Test backend health:
   ```bash
   curl https://blinkit-backend.onrender.com/health
   ```
   Expected: `{"status": "healthy"}`

2. Test frontend:
   - Open `https://blinkit-dashboard.vercel.app`
   - Verify dashboard loads
   - Check browser console for errors

### 8.2 API Endpoints
Test key endpoints:
- `GET /api/v1/data/dashboard` - Dashboard data
- `GET /api/v1/data/barriers` - Barriers data
- `GET /api/v1/data/needs` - Unmet needs data

### 8.3 Database Connections
Verify all databases are accessible:
- PostgreSQL: Check Render dashboard
- MongoDB: Check Atlas dashboard
- Redis: Check Render dashboard

---

## Phase 9: Monitoring and Maintenance

### 9.1 Render Monitoring
- Enable Render metrics
- Set up alerts for:
  - CPU usage > 80%
  - Memory usage > 80%
  - Response time > 5s
  - Error rate > 5%

### 9.2 Vercel Analytics
- Enable Vercel Analytics
- Monitor page views
- Track Web Vitals

### 9.3 Log Management
- Use Render logs for backend
- Use Vercel logs for frontend
- Set up log aggregation (optional with Logtail free tier)

---

## Phase 10: Custom Domain (Optional)

### 10.1 Purchase Domain
1. Buy domain from Namecheap, GoDaddy, or similar
2. Or use free subdomain from services like duckdns.org

### 10.2 Configure DNS
1. Add CNAME record for frontend:
   - `www` → `cname.vercel-dns.com`
2. Add A record for backend (if using custom domain):
   - `api` → Render backend IP

### 10.3 Update Domains in Services
1. Add custom domain in Vercel
2. Add custom domain in Render (if applicable)
3. Update CORS settings in backend
4. Update environment variables

---

## Cost Summary (Free Tier)

| Service | Free Tier | Cost After Free |
|---------|-----------|----------------|
| Vercel | Unlimited deployments | $0 (always free for personal) |
| Render Web Service | 750 hours/month | $7/month after free |
| Render PostgreSQL | 90 days | $7/month after free |
| Render Redis | 90 days | $5/month after free |
| MongoDB Atlas | 512MB storage | $0 (always free M0) |
| **Total First 90 Days** | **$0** | **~$19/month** |

---

## Troubleshooting

### Common Issues

**1. Backend deployment fails**
- Check build logs in Render
- Verify all dependencies in requirements.txt
- Ensure Python version matches (3.11)

**2. Database connection errors**
- Verify database URLs in environment variables
- Check database is running and accessible
- Verify network/firewall settings

**3. CORS errors**
- Update CORS middleware in backend
- Add frontend domain to allowed origins
- Clear browser cache

**4. Frontend build fails**
- Check Vercel build logs
- Verify Node.js version compatibility
- Ensure all dependencies are in package.json

**5. API timeout errors**
- Check backend health endpoint
- Verify Render service is running
- Check database connection timeouts

---

## Rollback Plan

### If Deployment Fails
1. Revert to previous commit: `git revert HEAD`
2. Redeploy to Vercel/Render
3. Monitor logs for errors

### If Production Issues Occur
1. Check Render and Vercel logs
2. Roll database migrations if needed
3. Disable problematic features
4. Contact support if needed

---

## Next Steps After Deployment

1. **Set up CI/CD**: GitHub Actions for automated testing
2. **Add monitoring**: Sentry for error tracking (free tier)
3. **Implement caching**: Redis for API response caching
4. **Add authentication**: NextAuth.js for user login
5. **Optimize performance**: Image optimization, code splitting
6. **Add analytics**: Google Analytics or Plausible (privacy-focused)

---

## Contact and Support

- **Vercel Support**: https://vercel.com/support
- **Render Support**: https://render.com/support
- **MongoDB Support**: https://www.mongodb.com/support
- **GitHub Issues**: Repository issues page

---

**Last Updated**: July 2026
**Version**: 1.0
