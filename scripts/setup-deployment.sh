#!/bin/bash

# Automated Deployment Setup Script
# This script automates all possible deployment preparation steps

set -e

echo "🚀 Starting automated deployment setup..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Check if .env.production exists
echo "📋 Step 1: Checking environment configuration..."
if [ -f "backend/.env.production" ]; then
    print_success "backend/.env.production exists"
else
    print_error "backend/.env.production not found"
    echo "Please create it from backend/.env.production.example"
    exit 1
fi

# Step 2: Check if frontend .env.production exists
echo "📋 Step 2: Checking frontend environment configuration..."
if [ -f "frontend/.env.production" ]; then
    print_success "frontend/.env.production exists"
else
    print_warning "frontend/.env.production not found (will be configured during Vercel deployment)"
fi

# Step 3: Verify all required files
echo "📋 Step 3: Verifying required files..."
required_files=(
    "backend/requirements.txt"
    "backend/docker/Dockerfile"
    "backend/render.yaml"
    "backend/app/main.py"
    "frontend/package.json"
    "frontend/next.config.js"
    "frontend/vercel.json"
    "docker-compose.yml"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    print_error "Missing required files:"
    printf '   - %s\n' "${missing_files[@]}"
    exit 1
fi

print_success "All required files present"

# Step 4: Check git status
echo "📋 Step 4: Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Uncommitted changes detected"
    git status --short
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Committing changes..."
        git add .
        git commit -m "Configure deployment environment"
        print_success "Changes committed"
    fi
else
    print_success "No uncommitted changes"
fi

# Step 5: Build frontend (optional)
echo "📋 Step 5: Frontend build check..."
read -p "Do you want to build the frontend locally? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔨 Building frontend..."
    cd frontend
    npm install
    npm run build
    cd ..
    print_success "Frontend build completed"
else
    print_warning "Skipping frontend build (will be done by Vercel)"
fi

# Step 6: Generate deployment summary
echo ""
echo "📊 Deployment Setup Summary"
echo "=========================="
echo ""
echo "✅ Environment files configured"
echo "✅ Required files verified"
echo "✅ Git status checked"
echo ""
echo "📋 Next Steps (Manual):"
echo "=========================="
echo ""
echo "1. Create PostgreSQL on Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'PostgreSQL'"
echo "   - Name: blinkit-postgres"
echo "   - Database: discovery_engine"
echo "   - Region: Oregon (US West)"
echo "   - Click 'Create Database'"
echo ""
echo "2. Create Redis on Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'Redis'"
echo "   - Name: blinkit-redis"
echo "   - Region: Oregon (US West)"
echo "   - Click 'Create Redis Instance'"
echo ""
echo "3. Deploy Backend to Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'Web Service'"
echo "   - Connect GitHub repository"
echo "   - Name: blinkit-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
echo "   - Environment variables will be auto-configured from render.yaml"
echo "   - Click 'Create Web Service'"
echo ""
echo "4. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Click 'Add New...' → 'Project'"
echo "   - Import GitHub repository"
echo "   - Root Directory: frontend"
echo "   - Environment Variable: NEXT_PUBLIC_API_URL (use backend URL from step 3)"
echo "   - Click 'Deploy'"
echo ""
echo "5. Update CORS:"
echo "   - Go to Render backend dashboard"
echo "   - Add environment variable: cors_origins"
echo "   - Value: https://your-frontend-domain.vercel.app,http://localhost:3000"
echo "   - Redeploy backend"
echo ""
echo "📚 For detailed guides, see:"
echo "   - RENDER_SETUP_GUIDE.md - Step-by-step Render setup"
echo "   - VERCEL_SETUP_GUIDE.md - Step-by-step Vercel setup"
echo "   - DEPLOYMENT_PLAN.md - Complete deployment documentation"
echo ""
print_success "Automated setup completed!"
