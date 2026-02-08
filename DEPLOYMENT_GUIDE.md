# 🚀 Rasa Bakery - Complete Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions to deploy the Rasa Bakery application with:
- Docker Compose orchestration
- React Frontend
- Express Backend
- PostgreSQL Database
- Nginx Reverse Proxy
- Cloudflare Tunnel (no port forwarding needed!)
- Domain: `rasabakery.shop`

---

## 🎯 Prerequisites

### System Requirements
- Ubuntu 18.04+ (or similar Linux distribution)
- 2GB RAM minimum (4GB recommended)
- 10GB disk space minimum
- Internet connection

### Software Requirements
```bash
# Check versions
docker --version          # >= 20.10
docker-compose --version  # >= 1.29
node --version           # >= 14 (for local development)
```

### Cloudflare Requirements
- Cloudflare account (free tier works)
- Domain registered or using Cloudflare nameservers
- API token for authentication

---

## 📝 Step 1: Prepare Ubuntu VM

### 1.1 Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 1.2 Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Allow current user to use Docker (without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker run hello-world
```

### 1.3 Install Docker Compose
```bash
# Download latest version
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

### 1.4 Install Git (Optional but Recommended)
```bash
sudo apt install -y git
git --version
```

---

## 🔧 Step 2: Clone/Copy Project

### Option A: Clone from (if you have a repo)
```bash
git clone <your-repo-url> rasacakes
cd rasacakes
```

### Option B: Copy files manually
```bash
# Create project directory
mkdir -p ~/rasacakes
cd ~/rasacakes

# Copy all files from this project structure
# (Ensure all files listed in the structure are present)
```

### Verify Project Structure
```bash
ls -la
# Should see: docker-compose.yml, .env, frontend/, backend/, nginx/, cloudflared/

tree -L 2
# Or: find . -type f -name "*.json" -o -name "*.js" -o -name "*.yml"
```

---

## 🐳 Step 3: Docker Setup

### 3.1 Configure Environment
```bash
cd ~/rasacakes

# Edit .env file with your settings
nano .env

# Update these values:
# CLOUDFLARE_TUNNEL_ID=your_tunnel_id
# CLOUDFLARE_ACCOUNT_ID=your_account_id
# CLOUDFLARE_API_TOKEN=your_api_token
```

### 3.2 Build Docker Images
```bash
# Build all images (first time may take 5-10 minutes)
docker-compose build --no-cache

# Check images
docker images | grep cake
```

### 3.3 Start Containers
```bash
# Start in background
docker-compose up -d

# Check running containers
docker-compose ps
# Should show 4 services: frontend, backend, nginx, db

# View logs
docker-compose logs -f

# Wait 30 seconds for services to start
sleep 30
```

### 3.4 Verify Services
```bash
# Test frontend
curl http://localhost:3000

# Test backend
curl http://localhost:5000/api/health

# Test nginx proxy
curl http://localhost:80

# Test database
docker exec rasacakes-db-1 psql -U cakeuser -d cakedb -c "SELECT 1;"
```

---

## ☁️ Step 4: Cloudflare Tunnel Setup

### 4.1 Install Cloudflared
```bash
# Download latest cloudflared
curl -L --output cloudflared.tgz https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.tgz

# Extract and install
tar -xzf cloudflared.tgz
sudo mv cloudflared /usr/local/bin/

# Verify
cloudflared --version
```

### 4.2 Authenticate with Cloudflare
```bash
# This opens a browser for authentication
cloudflared login

# Follow the prompts:
# 1. Browser opens to authorize
# 2. Select your domain (rasabakery.shop)
# 3. Certificate is saved to ~/.cloudflared/cert.pem
```

### 4.3 Create Tunnel
```bash
# Create tunnel named 'rasabakery'
cloudflared tunnel create rasabakery

# Output will show:
# Created tunnel rasabakery with id YOUR_TUNNEL_ID
# Credentials file: ~/.cloudflared/YOUR_TUNNEL_ID.json

# Copy the YOUR_TUNNEL_ID
echo "YOUR_TUNNEL_ID: <the-id-shown-above>"
```

### 4.4 Update Configuration
```bash
cd ~/rasacakes

# Edit cloudflared/config.yml
nano cloudflared/config.yml

# Replace YOUR_TUNNEL_ID with the actual ID from step 4.3
# Example: tunnel: 7e6d3c2b-1a4f-4e8c-9b2d-5f8a1c3d9e0b
```

### 4.5 Copy Credentials
```bash
# Create directory for root-owned credentials
sudo mkdir -p /root/.cloudflared

# Copy credentials file
sudo cp ~/.cloudflared/YOUR_TUNNEL_ID.json /root/.cloudflared/

# Verify
sudo ls -la /root/.cloudflared/
```

### 4.6 Configure Cloudflare DNS

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (rasabakery.shop)
3. Go to DNS Records
4. Create CNAME record:
   - Name: `rasabakery`
   - Target: `<tunnel-id>.cfargotunnel.com`
   - Proxy status: Proxied (orange cloud)
   - TTL: Auto

Example:
```
Type: CNAME
Name: rasabakery.shop
Target: 7e6d3c2b-1a4f-4e8c-9b2d-5f8a1c3d9e0b.cfargotunnel.com
Proxied: Yes
```

### 4.7 Create Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/cloudflared.service
```

Paste this content:
```ini
[Unit]
Description=Cloudflare Tunnel for Rasa Bakery
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/.cloudflared
ExecStart=/usr/local/bin/cloudflared tunnel --config=/root/.cloudflared/config.yml run rasabakery
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### 4.8 Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable at boot
sudo systemctl enable cloudflared

# Start service
sudo systemctl start cloudflared

# Check status
sudo systemctl status cloudflared

# View logs
sudo journalctl -u cloudflared -f
# Press Ctrl+C to exit logs
```

---

## ✅ Step 5: Verify Everything Works

### 5.1 Check All Services
```bash
# Docker containers
docker-compose ps

# Systemd services
sudo systemctl status cloudflared

# Check tunnel connectivity
cloudflared tunnel info rasabakery
```

### 5.2 Test Backend
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK",...}
```

### 5.3 Test Frontend
```bash
curl http://localhost:3000
# Should return: HTML content
```

### 5.4 Test Nginx Proxy
```bash
curl http://localhost:80
# Should return: Frontend content
```

### 5.5 Test via Domain (After DNS propagation)
```bash
# Wait 2-5 minutes for DNS propagation
curl https://rasabakery.shop
# Should return: Frontend content

curl https://rasabakery.shop/api/health
# Should return: Backend health check
```

**Expected Result:**
- ✅ https://rasabakery.shop → Shows Rasa Bakery website
- ✅ https://rasabakery.shop/api/health → Shows API status
- ✅ Frontend connects to Backend via Nginx proxy
- ✅ Cloudflare Tunnel shows "Connected" status

---

## 🔨 Maintenance Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Cloudflare tunnel
sudo journalctl -u cloudflared -f -n 50
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific
docker-compose restart backend
docker-compose stop frontend
docker-compose start frontend
```

### Database Access
```bash
# Connect to PostgreSQL
docker exec -it rasacakes-db-1 psql -U cakeuser -d cakedb

# Common commands:
# \dt              - List tables
# \d <table>       - Describe table
# SELECT * FROM <table>;  - Query data
# \q               - Exit
```

### Update Services
```bash
# Update code
git pull origin main

# Rebuild images
docker-compose build --no-cache

# Restart services
docker-compose up -d
```

### Backup Database
```bash
# Create backup
docker exec rasacakes-db-1 pg_dump -U cakeuser cakedb > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
cat backup_20240208_100000.sql | docker exec -i rasacakes-db-1 psql -U cakeuser cakedb
```

---

## 🐛 Troubleshooting

### Issue: Containers won't start
```bash
# Check error logs
docker-compose logs

# Try rebuilding
docker-compose build --no-cache

# Clean up and restart
docker-compose down -v
docker-compose up -d
```

### Issue: Backend connection refused
```bash
# Check if backend is running
docker-compose ps backend

# View backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### Issue: Domain not resolving
```bash
# Check DNS record
nslookup rasabakery.shop
dig rasabakery.shop

# Cloudflare Tunnel status
cloudflared tunnel info rasabakery

# Restart tunnel
sudo systemctl restart cloudflared
sudo systemctl status cloudflared
```

### Issue: 502 Bad Gateway
```bash
# Check if services are accessible
curl http://localhost:3000
curl http://localhost:5000

# Verify Nginx config
docker exec rasacakes-nginx-1 nginx -t

# Restart Nginx
docker-compose restart nginx
```

### Issue: Port already in use
```bash
# Find process using port 80
sudo lsof -i :80

# Kill process (replace PID)
sudo kill -9 <PID>

# Or change port in docker-compose.yml
```

---

## 📊 Monitoring

### Setup Health Monitoring
```bash
# Create monitoring script
cat > ~/monitor.sh << 'EOF'
#!/bin/bash
while true; do
  echo "=== $(date) ===" 
  echo "Docker status:"
  docker-compose ps
  echo "Backend health:"
  curl -s http://localhost:5000/api/health | jq .
  echo "Tunnel status:"
  sudo systemctl status cloudflared --no-pager | grep Active
  echo ""
  sleep 30
done
EOF

chmod +x ~/monitor.sh
./monitor.sh
```

---

## 🔒 Security Hardening

### 1. Change Database Password
```bash
# Edit .env
nano .env
# Change POSTGRES_PASSWORD

# Rebuild and restart
docker-compose down
docker-compose up -d
```

### 2. Setup Firewall
```bash
# Allow SSH
sudo ufw allow 22

# Allow HTTP/HTTPS (through cloudflare)
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

### 3. Setup SSL Certificates
```bash
# Cloudflare automatically provides SSL
# No additional action needed!

# Verify SSL
curl -I https://rasabakery.shop
# Should show: HTTP/2 200
```

### 4. Restrict Docker Access
```bash
# Only admin user can use Docker
sudo groupmod -d docker $USER  # Remove user from docker group

# Use sudo for Docker commands
# Or configure sudo without password for Docker
```

---

## 📈 Performance Optimization

### 1. Enable Compression
Already configured in nginx/conf.d/default.conf

### 2. Enable Caching
```bash
# Add to nginx config
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
}
```

### 3. Database Optimization
```bash
# Monitor slow queries
docker exec rasacakes-db-1 psql -U cakeuser -d cakedb -c "
  SELECT * FROM pg_stat_statements 
  ORDER BY mean_exec_time DESC LIMIT 10;
"
```

---

## ✨ Next Steps

After successful deployment:

1. **Add Authentication**
   - Implement JWT or OAuth2
   - Protect API endpoints

2. **Add Database Migrations**
   - Create tables for cakes, orders, users
   - Setup initial data

3. **Implement Payments**
   - Integrate Stripe or PayPal
   - Add order processing

4. **Setup Monitoring**
   - Add Datadog or New Relic
   - Setup alerts

5. **Add CI/CD**
   - GitHub Actions
   - Auto-deploy on push

6. **Backup Strategy**
   - Daily database backups
   - Store in cloud storage

---

## 📞 Support & Resources

- [Docker Documentation](https://docs.docker.com)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-applications)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

**Deployment Date:** February 8, 2026  
**Domain:** rasabakery.shop  
**Status:** Ready for Production ✨
