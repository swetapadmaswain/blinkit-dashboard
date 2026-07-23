# Render Setup Guide - Step-by-Step Instructions

This guide provides detailed, step-by-step instructions for deploying the Blinkit backend to Render.

---

## Prerequisites

- ✅ Render account created (https://render.com/register)
- ✅ GitHub account connected to Render
- ✅ Code pushed to GitHub repository
- ✅ `backend/.env.production` file configured
- ✅ `backend/render.yaml` file configured

---

## Part 1: Create PostgreSQL Database

### Step 1.1: Log in to Render Dashboard

1. Open your web browser
2. Go to https://dashboard.render.com
3. Sign in with your GitHub account
4. You'll see the Render dashboard with your existing services (if any)

### Step 1.2: Navigate to Create Database

1. Look at the top-right corner of the dashboard
2. Click the **"New +"** button (blue button)
3. A dropdown menu will appear with options:
   - Web Service
   - PostgreSQL
   - Redis
   - Cron Job
   - etc.

### Step 1.3: Select PostgreSQL

1. From the dropdown menu, click **"PostgreSQL"**
2. You'll be redirected to the PostgreSQL database creation page

### Step 1.4: Configure PostgreSQL Database

Fill in the following fields:

**Name:**
- Enter: `blinkit-postgres`
- This name must match what's in `backend/render.yaml`

**Database:**
- Enter: `discovery_engine`
- This is the database name used in your application

**User:**
- Enter: `postgres` (or create a custom username)
- This is the database user

**Region:**
- Select: `Oregon (US West)` from the dropdown
- Choose the region closest to your users for best performance
- Important: Keep the same region for all Render services

**PostgreSQL Version:**
- Keep default (usually PostgreSQL 15)
- No need to change this

**Plan:**
- Keep as **Free** (default)
- This gives you 90 days free

**Other Settings:**
- Leave all other settings as default
- No need to change advanced settings

### Step 1.5: Create the Database

1. Scroll to the bottom of the page
2. Click the **"Create Database"** button (blue button)
3. You'll see a loading spinner
4. Wait 2-3 minutes for the database to be provisioned
5. You'll be redirected to the database dashboard once created

### Step 1.6: Verify Database Creation

On the PostgreSQL database dashboard, you should see:
- Database name: `blinkit-postgres`
- Status: "Available" (green indicator)
- Connection information in the right sidebar

### Step 1.7: Note the Database Name

- The database name `blinkit-postgres` is important
- This name is referenced in `backend/render.yaml`
- Make sure it matches exactly

---

## Part 2: Create Redis Instance

### Step 2.1: Navigate to Create Redis

1. If still on Render dashboard, click **"New +"** again
2. From the dropdown, click **"Redis"**
3. You'll be redirected to the Redis instance creation page

### Step 2.2: Configure Redis Instance

Fill in the following fields:

**Name:**
- Enter: `blinkit-redis`
- This name must match what's in `backend/render.yaml`

**Region:**
- Select: `Oregon (US West)` (same as PostgreSQL)
- Important: Use the same region as PostgreSQL for best performance

**Plan:**
- Keep as **Free** (default)
- This gives you 90 days free

**Other Settings:**
- Leave all other settings as default
- No need to change advanced settings

### Step 2.3: Create the Redis Instance

1. Scroll to the bottom of the page
2. Click the **"Create Redis Instance"** button (blue button)
3. You'll see a loading spinner
4. Wait 2-3 minutes for the instance to be provisioned
5. You'll be redirected to the Redis dashboard once created

### Step 2.4: Verify Redis Creation

On the Redis dashboard, you should see:
- Instance name: `blinkit-redis`
- Status: "Available" (green indicator)
- Connection information in the right sidebar

---

## Part 3: Deploy Backend Web Service

### Step 3.1: Navigate to Create Web Service

1. If still on Render dashboard, click **"New +"** again
2. From the dropdown, click **"Web Service"**
3. You'll be redirected to the web service creation page

### Step 3.2: Connect GitHub Repository

**Option A: If repository is already connected:**
1. You'll see a list of your GitHub repositories
2. Find and select: `swetapadmaswain/blinkit-dashboard` (or your repo name)
3. Click **"Connect"**

**Option B: If repository is not connected:**
1. Click **"Connect GitHub"** button
2. Authorize Render to access your GitHub account
3. Select the repository you want to deploy
4. Click **"Connect"**

### Step 3.3: Configure Web Service

Fill in the following fields:

**Name:**
- Enter: `blinkit-backend`
- This will be part of your backend URL

**Branch:**
- Select: `master` (or `main` depending on your default branch)
- This is the Git branch to deploy

**Root Directory:**
- Enter: `backend`
- This tells Render where to find the application code

**Runtime:**
- Select: `Python` from the dropdown
- Render will detect this automatically from your files

**Build Command:**
- Enter: `pip install -r requirements.txt`
- This installs Python dependencies

**Start Command:**
- Enter: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- This starts the FastAPI application

### Step 3.4: Configure Environment Variables

The `render.yaml` file will auto-configure most variables, but verify:

**Auto-configured by render.yaml:**
- `database_url` - Auto-linked from PostgreSQL
- `mongodb_url` - Hardcoded in render.yaml
- `redis_url` - Auto-linked from Redis
- `jwt_secret_key` - Auto-generated
- `cors_origins` - Configured in render.yaml

**Manual verification:**
1. Scroll down to "Environment Variables" section
2. Verify the following variables are present:
   - `database_url` (should show "fromDatabase")
   - `mongodb_url` (should show your MongoDB connection string)
   - `redis_url` (should show "fromService")
   - `jwt_secret_key` (should show "generateValue")
   - `cors_origins` (should show the CORS origins)

### Step 3.5: Advanced Settings (Optional)

If you want to customize:

**Instance Type:**
- Keep as **Free** (default)
- This gives you 750 hours/month

**Region:**
- Should auto-select based on your databases
- Keep as `Oregon (US West)` to match databases

**Health Check Path:**
- Enter: `/health`
- This is the health check endpoint we added

### Step 3.6: Create Web Service

1. Scroll to the bottom of the page
2. Click the **"Create Web Service"** button (blue button)
3. You'll see a loading spinner
4. Wait 5-10 minutes for the deployment to complete
5. You'll be redirected to the service dashboard

### Step 3.7: Monitor Deployment

On the service dashboard, you'll see:
- **Live Logs**: Real-time deployment logs
- **Events**: Deployment events and status
- **Metrics**: CPU, memory, and response time

**What to look for:**
- Build logs showing dependency installation
- "Starting production server" message
- "Application startup complete" message
- Status changes to "Live" (green indicator)

### Step 3.8: Verify Deployment

Once deployment is complete:

1. **Check Status:**
   - Status should show "Live" (green)
   - No error messages in logs

2. **Test Health Endpoint:**
   - Copy the service URL from the dashboard
   - It will look like: `https://blinkit-backend.onrender.com`
   - Open in browser: `https://blinkit-backend.onrender.com/health`
   - Expected response: `{"status": "healthy"}`

3. **Test API Root:**
   - Open: `https://blinkit-backend.onrender.com/`
   - Expected response: `{"message": "AI-Powered Discovery Engine API", "version": "1.0.0"}`

### Step 3.9: Copy Backend URL

1. On the service dashboard, find the service URL
2. It's displayed at the top of the page
3. Copy this URL (you'll need it for Vercel deployment)
4. Format: `https://blinkit-backend.onrender.com`

---

## Part 4: Update CORS Configuration

### Step 4.1: Navigate to Service Settings

1. On the backend service dashboard
2. Click the **"Settings"** tab (top navigation)
3. Scroll down to "Environment Variables" section

### Step 4.2: Update CORS Origins

1. Find the `cors_origins` variable
2. Click the **"Edit"** button (pencil icon)
3. Update the value to include your frontend domain:
   ```
   https://your-frontend-domain.vercel.app,http://localhost:3000
   ```
4. Replace `your-frontend-domain.vercel.app` with your actual Vercel domain
5. Click **"Save"**

### Step 4.3: Redeploy Service

1. After saving, you'll see a "Manual Deploy" button
2. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
3. Wait for redeployment to complete (~2-3 minutes)
4. Verify status returns to "Live"

---

## Part 5: Troubleshooting Render Deployment

### Issue 1: Build Fails

**Symptoms:**
- Build logs show errors
- Status shows "Build failed"

**Solutions:**
1. Check build logs for specific error messages
2. Verify `requirements.txt` exists in backend directory
3. Verify all dependencies are correctly listed
4. Check Python version compatibility

### Issue 2: Database Connection Error

**Symptoms:**
- Logs show "database connection failed"
- Service starts but can't connect to databases

**Solutions:**
1. Verify PostgreSQL database name matches `blinkit-postgres`
2. Verify Redis instance name matches `blinkit-redis`
3. Check database status is "Available"
4. Verify environment variables are correctly set

### Issue 3: Service Crashes on Startup

**Symptoms:**
- Service starts then immediately crashes
- Logs show startup errors

**Solutions:**
1. Check application logs for error messages
2. Verify `app.main:app` is correct start command
3. Check for missing dependencies
4. Verify health check path is correct

### Issue 4: Timeout Errors

**Symptoms:**
- Requests timeout
- Slow response times

**Solutions:**
1. Check service metrics (CPU, memory)
2. Consider upgrading to paid tier if needed
3. Optimize database queries
4. Add caching with Redis

---

## Part 6: Render Dashboard Overview

### Key Sections:

**Overview Tab:**
- Service status and health
- URL and connection info
- Recent events and deployments

**Logs Tab:**
- Real-time application logs
- Filter by time range
- Search functionality

**Events Tab:**
- Deployment history
- Build events
- Service restarts

**Metrics Tab:**
- CPU usage
- Memory usage
- Response time
- Request count

**Settings Tab:**
- Environment variables
- Build settings
- Auto-deploy configuration
- Delete service option

---

## Summary Checklist

- [ ] PostgreSQL database created (`blinkit-postgres`)
- [ ] Redis instance created (`blinkit-redis`)
- [ ] Backend web service deployed
- [ ] Health endpoint tested and working
- [ ] Backend URL copied for Vercel deployment
- [ ] CORS origins updated with frontend domain
- [ ] Service redeployed after CORS update

---

## Next Steps

After completing Render setup:

1. Copy the backend URL: `https://blinkit-backend.onrender.com`
2. Proceed to [VERCEL_SETUP_GUIDE.md](VERCEL_SETUP_GUIDE.md) for frontend deployment
3. Update frontend environment variable with backend URL
4. Deploy frontend to Vercel
5. Test full application

---

## Support

- **Render Documentation**: https://render.com/docs
- **Render Support**: https://render.com/support
- **Render Community**: https://community.render.com

---

**Last Updated**: July 2026
