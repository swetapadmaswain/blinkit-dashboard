#!/bin/bash

# Backend Production Build Script
# This script prepares the Python backend for production deployment

set -e

echo "🚀 Starting backend production build..."

# Navigate to backend directory
cd "$(dirname "$0")/../backend"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Run tests if available
if [ -d "tests" ]; then
    echo "🧪 Running tests..."
    pytest
fi

echo "✅ Backend build completed successfully!"
echo "📁 Ready for deployment"
