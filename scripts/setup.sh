#!/bin/bash

# Lung Disease Diagnosis AI - Quick Setup Script
# This script helps set up the development environment

set -e

echo "🫁 Lung Disease Diagnosis AI - Setup Script"
echo "==========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available"
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment variables
if [ ! -f .env.local ]; then
    echo "📝 Setting up environment variables..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "ℹ️  Please update .env.local with your configuration"
else
    echo "ℹ️  .env.local already exists"
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Run health check
echo "🏥 Running health check..."
if npm run dev &> /dev/null & sleep 5; then
    PID=$!
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        echo "✅ Application is running correctly"
    else
        echo "❌ Health check failed"
    fi
    kill $PID
else
    echo "❌ Failed to start development server"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Start development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Upload a chest X-ray image to test the diagnosis"
echo ""
echo "📚 Documentation:"
echo "- README.md - Project overview and usage"
echo "- docs/development.md - Development guide"
echo "- docs/deployment.md - Deployment instructions"
echo ""
echo "🆘 Need help? Open an issue on GitHub or contact the development team"
