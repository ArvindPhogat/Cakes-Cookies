#!/bin/bash

# 🍰 Rasa Bakery - Docker Build & Run Script
# Run from WSL

cd "$(dirname "$0")" || exit 1

echo "🍰 Rasa Bakery - Docker Setup"
echo "=============================="
echo ""

echo "1️⃣  Building Docker images..."
echo "This may take 5-10 minutes on first run..."
echo ""

docker compose build --no-cache

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "2️⃣  Starting containers..."
    docker compose up -d
    
    echo ""
    echo "⏳ Waiting 30 seconds for services to start..."
    sleep 30
    
    echo ""
    echo "3️⃣  Checking service status..."
    docker compose ps
    
    echo ""
    echo "4️⃣  Testing services..."
    echo "Testing backend health check..."
    curl -s http://localhost:5000/api/health | jq . 2>/dev/null || curl http://localhost:5000/api/health
    
    echo ""
    echo "=============================="
    echo "✨ Setup Complete!"
    echo "=============================="
    echo ""
    echo "🌐 Access your services:"
    echo "  Frontend:  http://localhost:3000"
    echo "  Backend:   http://localhost:5000"
    echo "  API:       http://localhost:5000/api/health"
    echo "  Logs:      docker compose logs -f"
    echo ""
else
    echo ""
    echo "❌ Build failed! Check errors above."
    exit 1
fi
