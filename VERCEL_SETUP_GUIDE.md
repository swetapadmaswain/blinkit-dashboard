# Vercel Setup Guide - Step-by-Step Instructions

This guide provides detailed, step-by-step instructions for deploying the Blinkit frontend to Vercel.

---

## Prerequisites

- ✅ Vercel account created (https://vercel.com/signup)
- ✅ GitHub account connected to Vercel
- ✅ Backend deployed to Render and URL available
- ✅ Code pushed to GitHub repository
- ✅ `frontend/vercel.json` file configured
- ✅ `frontend/next.config.js` file configured

---

## Part 1: Log in to Vercel Dashboard

### Step 1.1: Access Vercel

1. Open your web browser
2. Go to https://vercel.com/dashboard
3. Sign in with your GitHub account
4. You'll see the Vercel dashboard with your existing projects (if any)

### Step 1.2: Verify GitHub Connection

1. In the top-right corner, click your profile icon
2. Select **"Settings"**
3. Click **"Git Integrations"** in the left sidebar
4. Verify GitHub is connected
5. If not connected, click **"Connect to GitHub"** and authorize

---

## Part 2: Import GitHub Repository

### Step 2.1: Start New Project

1. On the Vercel dashboard, click **"Add New..."** (top-right)
2. A dropdown menu will appear
3. Click **"Project"**

### Step 2.2: Import Repository

**Option A: If repository is already imported:**
1. You'll see a list of your GitHub repositories
2. Find and select: `swetapadmaswain/blinkit-dashboard` (or your repo name)
3. Click **"Import"**

**Option B: If repository is not visible:**
1. Click **"Adjust GitHub App Permissions"**
2. Authorize Vercel to access your GitHub account
3. Select the repository you want to deploy
4. Click **"Import"**

---

## Part 3: Configure Project Settings

### Step 3.1: Project Configuration

You'll see the project configuration page with several sections:

**Project Name:**
- Enter: `blinkit-dashboard` (or your preferred name)
- This will be part of your Vercel URL
- Format: `https://blinkit-dashboard.vercel.app`

**Framework Preset:**
- Vercel should auto-detect: **Next.js**
- If not detected, select **Next.js** from dropdown
- This ensures correct build settings

**Root Directory:**
- Enter: `frontend`
- This tells Vercel where to find the frontend code
- Important: The frontend is in a subdirectory

**Build and Output Settings:**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3.2: Environment Variables

Scroll down to the "Environment Variables" section:

**Add Environment Variable:**

1. Click **"Add New"** button
2. Fill in the fields:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://blinkit-backend.onrender.com/api`
   - **Environment**: Select **Production**, **Preview**, and **Development** (all three)
3. Click **"Add"**

**Important Notes:**
- Replace `https://blinkit-backend.onrender.com/api` with your actual backend URL
- The `/api` suffix is important for API routing
- Select all environments to ensure consistency

### Step 3.3: Build & Development Settings

Scroll to "Build & Development Settings":

**Node.js Version:**
- Keep default (usually 18.x or 20.x)
- Ensure it matches your local development version

**Install Command:**
- Keep as `npm install` (default)
- No need to change

**Build Command:**
- Keep as `npm run build` (default)
- No need to change

**Output Directory:**
- Keep as `.next` (default)
- No need to change

### Step 3.4: Advanced Settings (Optional)

Click **"Advanced"** to expand:

**Override vercel.json:**
- Keep as **Yes** (default)
- This uses your `frontend/vercel.json` configuration

**Git Branch:**
- Select: `master` (or `main` depending on your default branch)
- This is the branch to deploy

**Ignored Build Step:**
- Leave empty (default)
- No need to change

---

## Part 4: Deploy Project

### Step 4.1: Review Configuration

Before deploying, review:

1. **Project Name**: Correct and memorable
2. **Framework**: Next.js detected
3. **Root Directory**: `frontend` specified
4. **Environment Variables**: `NEXT_PUBLIC_API_URL` set correctly
5. **Build Settings**: All auto-detected correctly

### Step 4.2: Deploy

1. Scroll to the bottom of the page
2. Click the **"Deploy"** button (blue button)
3. You'll be redirected to the deployment page
4. You'll see real-time build logs

### Step 4.3: Monitor Deployment

**What you'll see:**

**Build Logs:**
- Cloning repository
- Installing dependencies
- Building Next.js application
- Optimizing assets
- Uploading to Vercel

**Progress Indicators:**
- Building... (blue)
- Uploading... (blue)
- Deploying... (blue)
- Ready (green checkmark)

**Estimated Time:**
- First deployment: 2-5 minutes
- Subsequent deployments: 1-2 minutes

### Step 4.4: Deployment Complete

When deployment is complete:

1. **Status**: Shows "Ready" (green checkmark)
2. **URL**: Your Vercel URL is displayed
3. **Logs**: Build logs are available for review
4. **Preview**: Click to open your deployed site

---

## Part 5: Verify Deployment

### Step 5.1: Access Deployed Site

1. Click the URL displayed on the deployment page
2. Or copy the URL: `https://blinkit-dashboard.vercel.app`
3. Open in a new browser tab

### Step 5.2: Check Frontend Loading

**What to verify:**

1. **Page Loads:**
   - Dashboard should appear
   - No blank white screen
   - No error messages visible

2. **Styling Applied:**
   - Neon colors (pink, blue, yellow, orange) visible
   - Dark theme applied
   - Charts and components styled correctly

3. **Browser Console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Should see no red error messages

### Step 5.3: Test API Connection

**What to verify:**

1. **Dashboard Data:**
   - Stat cards should show data
   - Charts should render
   - No "Failed to fetch" errors

2. **Network Requests:**
   - Open DevTools → Network tab
   - Look for API requests to backend
   - Check for failed requests (red)
   - Verify response status is 200

### Step 5.4: Test Key Features

**Test the following:**

1. **Overview Tab:**
   - Stat cards display
   - Time series chart loads
   - Rating distribution chart loads
   - Platform distribution chart loads

2. **Other Tabs:**
   - Click through each tab
   - Verify charts load
   - Check for data display

3. **Filters:**
   - Test filter panel (if accessible)
   - Verify filters work correctly

---

## Part 6: Update CORS (If Needed)

### Step 6.1: Check for CORS Errors

**Symptoms of CORS issues:**
- Browser console shows CORS errors
- API requests fail with 403/401
- No data loads in dashboard

### Step 6.2: Update Backend CORS

If CORS errors occur:

1. Go to Render backend dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find `cors_origins` variable
4. Update value to include your Vercel domain:
   ```
   https://blinkit-dashboard.vercel.app,http://localhost:3000
   ```
5. Click **"Save"**
6. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
7. Wait for redeployment
8. Refresh frontend and test again

---

## Part 7: Configure Custom Domain (Optional)

### Step 7.1: Add Custom Domain

1. On Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Domains"** in left sidebar
4. Click **"Add"** button

### Step 7.2: Enter Domain

1. Enter your custom domain (e.g., `dashboard.blinkit.com`)
2. Click **"Add"**

### Step 7.3: Configure DNS

**Option A: Using Vercel DNS:**
1. Follow Vercel's DNS configuration instructions
2. Update your domain's nameservers

**Option B: Using Existing DNS:**
1. Vercel will provide DNS records
2. Add these records to your DNS provider
3. Wait for DNS propagation (up to 48 hours)

### Step 7.4: Verify Domain

1. Once DNS propagates, Vercel will issue SSL certificate
2. Your custom domain will be active
3. Update CORS in backend with new domain

---

## Part 8: Vercel Dashboard Overview

### Key Sections:

**Overview Tab:**
- Project status and health
- Deployment history
- Domain information
- Quick actions

**Deployments Tab:**
- All deployment history
- Build logs for each deployment
- Rollback options
- Redeploy options

**Settings Tab:**
- General settings
- Environment variables
- Domains
- Git integration
- Functions
- Build settings

**Analytics Tab:**
- Page views
- Web Vitals
- Real-time visitors
- Geographic distribution

**Logs Tab:**
- Real-time function logs
- Build logs
- Error logs
- Search functionality

---

## Part 9: Troubleshooting Vercel Deployment

### Issue 1: Build Fails

**Symptoms:**
- Build logs show errors
- Status shows "Build Failed"

**Solutions:**
1. Check build logs for specific error messages
2. Verify `package.json` exists in frontend directory
3. Verify all dependencies are correctly listed
4. Check Node.js version compatibility
5. Try clearing build cache and redeploy

### Issue 2: Blank White Screen

**Symptoms:**
- Page loads but shows blank white screen
- No content visible

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify `next.config.js` is correct
3. Check if `output: 'standalone'` is causing issues
4. Try removing `output: 'standalone'` and redeploy

### Issue 3: API Connection Fails

**Symptoms:**
- Dashboard loads but no data
- Console shows API errors
- Network requests fail

**Solutions:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check backend is running and accessible
3. Test backend URL directly in browser
4. Check CORS configuration in backend
5. Verify backend health endpoint works

### Issue 4: Styling Not Applied

**Symptoms:**
- Page loads but looks unstyled
- No neon colors visible
- Default browser styling

**Solutions:**
1. Verify Tailwind CSS is installed
2. Check `globals.css` is imported
3. Verify `next.config.js` includes Tailwind
4. Check for CSS build errors in logs

### Issue 5: Environment Variables Not Working

**Symptoms:**
- API URL not being used
- Hardcoded values instead of environment variables

**Solutions:**
1. Verify variable name starts with `NEXT_PUBLIC_`
2. Check variable is set for all environments
3. Redeploy after adding environment variables
4. Verify variable name matches code exactly

---

## Part 10: Production Best Practices

### Security

1. **Environment Variables:**
   - Never commit `.env` files
   - Use Vercel environment variables
   - Rotate secrets regularly

2. **API Security:**
   - Use HTTPS only
   - Implement rate limiting
   - Validate all inputs

3. **CORS:**
   - Restrict to specific domains
   - Don't use wildcard origins
   - Update when domains change

### Performance

1. **Optimization:**
   - Enable image optimization
   - Use code splitting
   - Implement caching

2. **Monitoring:**
   - Enable Vercel Analytics
   - Monitor Web Vitals
   - Track error rates

3. **Scaling:**
   - Monitor resource usage
   - Upgrade if needed
   - Implement CDN caching

### Maintenance

1. **Updates:**
   - Keep dependencies updated
   - Monitor security advisories
   - Test before deploying updates

2. **Backups:**
   - Regular database backups
   - Keep deployment history
   - Document changes

3. **Monitoring:**
   - Set up alerts
   - Monitor uptime
   - Track performance metrics

---

## Summary Checklist

- [ ] GitHub repository imported to Vercel
- [ ] Project configured with Next.js framework
- [ ] Root directory set to `frontend`
- [ ] Environment variable `NEXT_PUBLIC_API_URL` configured
- [ ] Project deployed successfully
- [ ] Frontend loads correctly in browser
- [ ] API connection working
- [ ] All charts and components render
- [ ] No console errors
- [ ] CORS configured in backend (if needed)
- [ ] Custom domain configured (optional)

---

## Next Steps

After completing Vercel setup:

1. **Test Full Application:**
   - Navigate through all tabs
   - Test all features
   - Verify data loads correctly

2. **Monitor Performance:**
   - Enable Vercel Analytics
   - Monitor Web Vitals
   - Track user engagement

3. **Set Up Monitoring:**
   - Configure error tracking
   - Set up uptime monitoring
   - Create alert rules

4. **Document Access:**
   - Share frontend URL with team
   - Document API endpoints
   - Create user guide

---

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Vercel Community**: https://vercel.com/community
- **Next.js Documentation**: https://nextjs.org/docs

---

**Last Updated**: July 2026
