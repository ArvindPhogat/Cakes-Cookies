# 🍰 Rasa Bakery - Cloudflare Tunnel Setup

Complete project structure with Docker Compose, Frontend (React), Backend (Express), Nginx Proxy, and Cloudflare Tunnel integration.

**Domain:** `rasabakery.shop`

---

## 📁 Project Structure

```
cake-shop/
├── docker-compose.yml          # Docker orchestration
├── .env                         # Environment variables
├── frontend/                    # React application
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── backend/                     # Express API
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── nginx/                       # Reverse proxy
│   └── conf.d/
│       └── default.conf
└── cloudflared/                 # Cloudflare tunnel
    └── config.yml
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Compose installed
- Cloudflare account with a domain
- SSH access to Ubuntu VM

### 2. Setup Environment Variables
Edit `.env` and add your Cloudflare credentials:
```bash
CLOUDFLARE_TUNNEL_ID=your_tunnel_id_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

### 3. Build & Run Everything
```bash
# Clean up any previous containers
docker-compose down

# Build all images (without using cache)
docker-compose build --no-cache

# Start all services in background
docker-compose up -d

# Check container status
docker ps

# View logs
docker-compose logs -f
```

### 4. Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React UI |
| Backend | http://localhost:5000 | Express API |
| Nginx | http://localhost:80 | Reverse Proxy |
| Database | localhost:5432 | PostgreSQL |
| Domain | rasabakery.shop | Cloudflare Tunnel |

---

## 🌐 Cloudflare Tunnel Setup

### Setup Cloudflare Tunnel (First Time)

```bash
# 1. Install cloudflared
curl -L --output cloudflared.tgz https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.tgz
tar -xzf cloudflared.tgz
sudo mv cloudflared /usr/local/bin/

# 2. Authenticate with Cloudflare
cloudflared login
# Opens browser for authentication, creates ~/.cloudflared/cert.pem

# 3. Create tunnel
cloudflared tunnel create rasabakery

# 4. Copy the tunnel UUID to cloudflared/config.yml
# Look for: Created tunnel rasabakery with id: YOUR_TUNNEL_ID
# Update cloudflared/config.yml with YOUR_TUNNEL_ID

# 5. Copy credentials file
sudo mkdir -p /root/.cloudflared
sudo cp ~/.cloudflared/YOUR_TUNNEL_ID.json /root/.cloudflared/

# 6. Create DNS CNAME record in Cloudflare Dashboard
# rasabakery.shop -> rasabakery.YOUR_TUNNEL_ID.cfargotunnel.com
```

### Run Cloudflared Service

```bash
# Create systemd service file
sudo nano /etc/systemd/system/cloudflared.service
```

Paste this content:
```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/cloudflared tunnel --config=/root/.cloudflared/config.yml run rasabakery
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl start cloudflared

# Check status
sudo systemctl status cloudflared

# View logs
sudo journalctl -u cloudflared -f
```

---

## 🐳 Docker Commands

```bash
# View all containers
docker-compose ps

# View logs
docker-compose logs -f                  # All services
docker-compose logs -f frontend         # Specific service
docker-compose logs -f backend

# Access container shell
docker exec -it cake-shop-frontend-1 sh
docker exec -it cake-shop-backend-1 sh
docker exec -it cake-shop-db-1 psql -U cakeuser -d cakedb

# Restart services
docker-compose restart
docker-compose restart backend

# Stop services
docker-compose stop

# Remove everything (including volumes)
docker-compose down -v
```

---

## 🔧 Services Details

### Frontend (React - Port 3000)
- Built with React 18
- Served via `serve` package
- Displays system status dashboard
- Calls backend API at `/api/health`

### Backend (Express - Port 5000)
- Node.js Express server
- Health check endpoint: `/api/health`
- Cakes endpoint: `/api/cakes`
- Orders endpoint: `/api/orders` (POST)
- CORS enabled

### Database (PostgreSQL - Port 5432)
- Image: postgres:15
- User: `cakeuser`
- Password: `cakepass`
- Database: `cakedb`
- Volume: `postgres_data` (persistent)

### Nginx Reverse Proxy (Port 80/443)
- Routes `/` → Frontend
- Routes `/api/` → Backend
- Gzip compression enabled
- CORS headers configured
- Health check: `/health`

### Cloudflare Tunnel
- Securely exposes localhost:80 to internet
- Domain: `rasabakery.shop`
- No port forwarding needed
- Automatic SSL/TLS

---

## 📊 API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```
Response:
```json
{
  "status": "OK",
  "timestamp": "2024-02-08T10:30:00.000Z",
  "service": "Rasa Bakery Backend",
  "domain": "rasabakery.shop"
}
```

### Get Cakes
```bash
curl http://localhost:5000/api/cakes
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"cakeId": 1, "quantity": 2}'
```

---

## 🐛 Troubleshooting

### Containers won't start
```bash
docker-compose build --no-cache
docker-compose up -d
docker-compose logs backend  # Check specific logs
```

### Port already in use
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :80

# Kill process
sudo kill -9 <PID>
```

### Backend connection refused
```bash
# Test connectivity
docker exec cake-shop-backend-1 curl http://localhost:5000/api/health
```

### Database connection failed
```bash
docker exec cake-shop-db-1 psql -U cakeuser -d cakedb -c "SELECT 1"
```

### Cloudflare Tunnel not connecting
```bash
sudo systemctl restart cloudflared
sudo journalctl -u cloudflared -n 50
```

---

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | postgres://cakeuser:cakepass@db:5432/cakedb | DB connection string |
| `NODE_ENV` | production | Node environment |
| `PORT` | 5000 | Backend port |
| `CLOUDFLARE_TUNNEL_ID` | YOUR_TUNNEL_ID | Tunnel ID from Cloudflare |

---

## 🔐 Security Notes

1. Change database password in `.env`
2. Update Cloudflare credentials in `.env`
3. Don't commit `.env` to version control (add to `.gitignore`)
4. Use HTTPS only in production (Cloudflare provides SSL)
5. Restrict API access with authentication when needed

---

## 📚 Useful Links

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Nginx Docs](https://nginx.org/)

---

## ✨ Next Steps

1. ✅ Deploy Docker containers
2. ✅ Setup Cloudflare Tunnel
3. 📝 Add database migrations
4. 🔐 Implement authentication
5. 📧 Add email notifications
6. 📱 Build mobile app
7. 💳 Add payment processing

---

**Created:** February 8, 2026  
**Domain:** rasabakery.shop  
**Status:** Ready for deployment 🚀
