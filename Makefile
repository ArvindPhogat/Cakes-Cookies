# Rasa Bakery - Makefile
# Convenient commands for Docker and Cloudflare setup

.PHONY: help build up down logs clean restart dev prod health tunnel-setup tunnel-run

help:
	@echo "🍰 Rasa Bakery Makefile Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev              - Start in development mode"
	@echo "  make up               - Start all containers"
	@echo "  make down             - Stop all containers"
	@echo "  make logs             - View live logs"
	@echo "  make restart          - Restart all services"
	@echo ""
	@echo "Production:"
	@echo "  make prod             - Start in production mode"
	@echo "  make build            - Build all images"
	@echo ""
	@echo "Utilities:"
	@echo "  make health           - Check service health"
	@echo "  make clean            - Remove containers and volumes"
	@echo "  make tunnel-setup     - Setup Cloudflare tunnel"
	@echo "  make tunnel-run       - Run Cloudflare tunnel service"
	@echo ""

build:
	docker-compose build --no-cache

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "✅ Development environment started"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5000"

prod:
	docker-compose up -d
	@echo "✅ Production environment started"

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

ps:
	docker-compose ps

clean:
	docker-compose down -v
	rm -rf frontend/build frontend/dist
	@echo "✅ Clean complete"

health:
	@echo "🔍 Checking service health..."
	@docker exec cake-shop-backend-1 curl -s http://localhost:5000/api/health | jq .
	@echo "✅ Frontend: http://localhost:3000"
	@echo "✅ Backend: http://localhost:5000"
	@echo "✅ Nginx: http://localhost:80"

shell-backend:
	docker exec -it cake-shop-backend-1 /bin/sh

shell-frontend:
	docker exec -it cake-shop-frontend-1 /bin/sh

shell-db:
	docker exec -it cake-shop-db-1 psql -U cakeuser -d cakedb

tunnel-setup:
	@echo "Follow these steps to setup Cloudflare Tunnel:"
	@echo "1. curl -L --output cloudflared.tgz https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.tgz"
	@echo "2. tar -xzf cloudflared.tgz"
	@echo "3. sudo mv cloudflared /usr/local/bin/"
	@echo "4. cloudflared login"
	@echo "5. cloudflared tunnel create rasabakery"
	@echo "6. Update cloudflared/config.yml with YOUR_TUNNEL_ID"
	@echo "7. make tunnel-run"

tunnel-run:
	@echo "Starting Cloudflare Tunnel..."
	sudo systemctl enable cloudflared
	sudo systemctl start cloudflared
	sudo systemctl status cloudflared

tunnel-logs:
	sudo journalctl -u cloudflared -f

install-deps:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "✅ Dependencies installed"
