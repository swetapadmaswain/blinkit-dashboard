#!/bin/bash

# Frontend Production Build Script
# This script builds the Next.js frontend for production deployment

set -e

echo "🚀 Starting frontend production build..."

# Navigate to frontend directory
cd "$(dirname "$0")/../frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linter
echo "🔍 Running linter..."
npm run lint

# Build for production
echo "🔨 Building for production..."
npm run build

echo "✅ Frontend build completed successfully!"
echo "📁 Build output: .next/"
