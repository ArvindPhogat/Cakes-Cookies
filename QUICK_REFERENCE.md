# 🍰 Rasa Bakery - Quick Reference

## ⚡ Most Used Commands

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Check services
docker-compose ps

# View backend logs
docker-compose logs -f backend

# Access database
docker exec -it rasacakes-db-1 psql -U cakeuser -d cakedb

# Restart backend
docker-compose restart backend

# Check tunnel status
sudo systemctl status cloudflared

# View tunnel logs
sudo journalctl -u cloudflared -f
```

---

## 🌐 Service URLs

| Service | Local URL | Internet URL |
|---------|-----------|--------------|
| Frontend | http://localhost:3000 | https://rasabakery.shop |
| Backend API | http://localhost:5000 | https://rasabakery.shop/api |
| Nginx | http://localhost | https://rasabakery.shop |
| Health Check | http://localhost:5000/api/health | https://rasabakery.shop/api/health |
| Database | localhost:5432 | N/A (internal) |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Containers won't start | `docker-compose build --no-cache && docker-compose up -d` |
| Backend offline | `docker-compose logs backend` |
| Domain not working | `cloudflared tunnel info rasabakery` |
| Port 80 in use | `sudo lsof -i :80` then `sudo kill -9 <PID>` |
| Database connection error | `docker-compose restart db` |

---

## 📁 Important Files

- **docker-compose.yml** - Main configuration
- **.env** - Environment variables (update before deploying)
- **cloudflared/config.yml** - Tunnel configuration
- **backend/server.js** - API code
- **frontend/src/App.js** - React app
- **nginx/conf.d/default.conf** - Reverse proxy config

---

## 🚀 Deployment Checklist

- [ ] Update .env with Cloudflare credentials
- [ ] Run `docker-compose build --no-cache`
- [ ] Run `docker-compose up -d`
- [ ] Verify services with `docker-compose ps`
- [ ] Setup Cloudflare Tunnel (`cloudflared tunnel create rasabakery`)
- [ ] Configure DNS CNAME record
- [ ] Create systemd service (`sudo systemctl enable cloudflared`)
- [ ] Test: `curl https://rasabakery.shop`
- [ ] Monitor: `sudo journalctl -u cloudflared -f`

---

## 💾 Backup Commands

```bash
# Backup database
docker exec rasacakes-db-1 pg_dump -U cakeuser cakedb > backup.sql

# Restore database
cat backup.sql | docker exec -i rasacakes-db-1 psql -U cakeuser cakedb

# Backup entire project
tar -czf rasacakes-backup.tar.gz ~/rasacakes --exclude=postgres_data --exclude=node_modules
```

---

## 🔐 Security Reminders

✅ Change database password in .env  
✅ Update Cloudflare API token  
✅ Don't commit .env to git  
✅ Use HTTPS only (Cloudflare provides SSL)  
✅ Regularly update Docker images  
✅ Monitor Cloudflare Tunnel logs  

---

**Version:** 1.0  
**Last Updated:** February 8, 2026  
**Domain:** rasabakery.shop
