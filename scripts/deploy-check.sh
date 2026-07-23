#!/bin/bash

# Pre-deployment Check Script
# This script verifies that all required files and configurations are in place

set -e

echo "🔍 Running pre-deployment checks..."

# Check for required files
echo "📁 Checking required files..."

required_files=(
    "frontend/package.json"
    "frontend/next.config.js"
    "frontend/vercel.json"
    "frontend/.env.production.example"
    "backend/requirements.txt"
    "backend/docker/Dockerfile"
    "backend/render.yaml"
    "backend/.env.production.example"
    "DEPLOYMENT_PLAN.md"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "❌ Missing required files:"
    printf '   - %s\n' "${missing_files[@]}"
    exit 1
fi

echo "✅ All required files present"

# Check for environment variable templates
echo "🔐 Checking environment variable templates..."
if [ ! -f "backend/.env.production" ]; then
    echo "⚠️  Warning: backend/.env.production not found"
    echo "   Create it from backend/.env.production.example"
fi

if [ ! -f "frontend/.env.production" ]; then
    echo "⚠️  Warning: frontend/.env.production not found"
    echo "   Create it from frontend/.env.production.example"
fi

# Check git status
echo "📊 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: Uncommitted changes detected"
    git status --short
fi

echo "✅ Pre-deployment checks completed!"
