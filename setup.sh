#!/bin/bash

# 🍰 Rasa Bakery - Complete Setup Script
# This script sets up the entire project with Docker + Cloudflare

set -e

echo "🍰 Rasa Bakery - Setup Script"
echo "=============================="
echo ""

# Check requirements
echo "📋 Checking requirements..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Step 1: Build images
echo "🔨 Building Docker images..."
docker-compose build --no-cache
echo "✅ Images built successfully"
echo ""

# Step 2: Start containers
echo "🚀 Starting containers..."
docker-compose up -d
echo "✅ Containers started"
echo ""

# Step 3: Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 10
echo ""

# Step 4: Check health
echo "🔍 Checking service health..."
if docker exec cake-shop-backend-1 curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "⚠️  Backend health check endpoint not responding yet"
fi

echo ""
echo "=============================="
echo "✨ Setup Complete!"
echo "=============================="
echo ""
echo "🌐 Access your services:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  API:      http://localhost:5000/api/health"
echo "  Nginx:    http://localhost:80"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env with your Cloudflare credentials"
echo "2. Run 'make tunnel-setup' to configure Cloudflare Tunnel"
echo "3. Configure DNS CNAME record in Cloudflare dashboard"
echo "4. Access your site at: rasabakery.shop"
echo ""
echo "📚 View logs with: docker-compose logs -f"
echo "🛑 Stop services with: docker-compose down"
echo ""
