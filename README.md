# AI-Powered Discovery Engine for Blinkit

An AI-powered system to analyze user-generated content from multiple platforms and generate actionable insights for Blinkit's quick-commerce operations.

## Project Structure

```
blinkit-dashboard/
├── frontend/          # Next.js frontend application
├── backend/           # FastAPI backend application
├── database/          # Database schemas and migrations
├── infrastructure/    # Docker, Kubernetes, CI/CD configs
├── ml-models/         # Machine learning models
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## Quick Start (Local Development)

1. Clone the repository
2. Copy environment templates:
   ```bash
   cp backend/.env.production.example backend/.env
   cp frontend/.env.production.example frontend/.env
   ```
3. Configure environment variables
4. Run `docker-compose up -d` to start infrastructure
5. Follow the [Implementation Setup Guide](Implementation Setup Guide.md) for detailed setup

## Production Deployment

### 🚀 Quick Deployment Guide

The project is deployment-ready with free cloud services. Follow the [DEPLOYMENT_PLAN.md](DEPLOYMENT_PLAN.md) for detailed step-by-step instructions.

### Deployment Stack

- **Frontend**: Vercel (Next.js) - Always free for personal projects
- **Backend**: Render (FastAPI) - 90 days free, then $7/month
- **Databases**:
  - PostgreSQL: Render - 90 days free, then $7/month
  - MongoDB: Atlas - 512MB free tier (always free)
  - Redis: Render - 90 days free, then $5/month

### Pre-Deployment Checklist

1. **Set up accounts**:
   - [Vercel](https://vercel.com/signup) (GitHub login)
   - [Render](https://render.com/register) (GitHub login)
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

2. **Configure environment variables**:
   ```bash
   # Backend
   cp backend/.env.production.example backend/.env.production
   # Edit backend/.env.production with your database URLs

   # Frontend
   cp frontend/.env.production.example frontend/.env.production
   # Edit frontend/.env.production with your backend URL
   ```

3. **Run pre-deployment checks**:
   ```bash
   bash scripts/deploy-check.sh
   ```

4. **Build locally** (optional):
   ```bash
   bash scripts/build-frontend.sh
   bash scripts/build-backend.sh
   ```

### Deployment Steps

#### 1. Deploy Databases
- Create PostgreSQL on Render
- Create MongoDB cluster on Atlas
- Create Redis on Render
- Copy connection strings

#### 2. Deploy Backend
- Push code to GitHub
- Connect Render to GitHub repository
- Configure environment variables
- Deploy backend service

#### 3. Deploy Frontend
- Connect Vercel to GitHub repository
- Configure environment variables
- Deploy frontend service

#### 4. Configure CORS
- Update backend CORS settings
- Add frontend domain to allowed origins
- Redeploy backend

### Cost Summary

| Service | Free Tier | Cost After Free |
|---------|-----------|----------------|
| Vercel | Unlimited | $0 (always free) |
| Render Web Service | 750 hours/month | $7/month |
| Render PostgreSQL | 90 days | $7/month |
| Render Redis | 90 days | $5/month |
| MongoDB Atlas | 512MB | $0 (always free) |
| **Total First 90 Days** | **$0** | **~$19/month** |

### Monitoring

- **Backend**: Render dashboard logs and metrics
- **Frontend**: Vercel analytics and logs
- **Databases**: Respective provider dashboards

### Troubleshooting

See [DEPLOYMENT_PLAN.md](DEPLOYMENT_PLAN.md) for comprehensive troubleshooting guide.

## Documentation

- [Problem Statement](Problem Statement.md)
- [Architecture](Architecture.md)
- [Implementation Setup Guide](Implementation Setup Guide.md)
- [Deployment Plan](DEPLOYMENT_PLAN.md)

## Scripts

- `scripts/build-frontend.sh` - Build frontend for production
- `scripts/build-backend.sh` - Prepare backend for production
- `scripts/deploy-check.sh` - Pre-deployment verification

## License

Internal use only for Blinkit.
