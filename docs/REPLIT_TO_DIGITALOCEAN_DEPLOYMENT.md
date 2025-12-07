# Replit to DigitalOcean Direct Deployment Guide

**Date:** October 29, 2025  
**Deployment Method:** Replit → DigitalOcean Droplet (Direct SSH)  
**Security:** Maintains SSH key passphrase protection ✅

---

## 🎯 Overview

This guide explains how to deploy the Aequitas Protocol directly from your Replit environment to your DigitalOcean Droplet, maintaining the security of your passphrase-protected SSH key.

### Why Direct Deployment from Replit?

✅ **Security**: Keeps your SSH key passphrase-protected  
✅ **Simplicity**: Deploys directly from your working environment  
✅ **Control**: Manual deployment control without GitHub Actions delays  
✅ **Reliability**: Everything works in Replit, so deployment is straightforward

---

## 📋 Prerequisites

### 1. DigitalOcean Droplet Information
You need:
- **Droplet IP Address**: `Your.Droplet.IP.Address`
- **SSH Username**: Usually `root`
- **SSH Key**: Your passphrase-protected private key

### 2. Replit Secrets Configuration
Ensure these are set in Replit Secrets Manager:
```
DO_HOST=your.droplet.ip.address
DO_USERNAME=root
DO_SSH_KEY_PATH=/home/runner/.ssh/id_rsa  # Or your key path
```

### 3. SSH Key Setup on Droplet
Your SSH public key must be in the Droplet's `~/.ssh/authorized_keys`

**To verify:**
```bash
ssh root@your.droplet.ip.address "cat ~/.ssh/authorized_keys"
```

**If not present, add it:**
```bash
# From Replit shell:
cat $DO_SSH_KEY_PATH.pub | ssh root@$DO_HOST 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

---

## 🚀 Deployment Methods

### Method 1: Automated Deployment Script (Recommended)

The `deploy-to-digitalocean.sh` script automates the entire deployment process.

**Usage:**
```bash
# Set environment variables (if not in Replit Secrets)
export DO_HOST="your.droplet.ip.address"
export DO_USERNAME="root"
export DO_SSH_KEY_PATH="$HOME/.ssh/id_rsa"

# Run deployment
./scripts/deploy-to-digitalocean.sh
```

**What it does:**
1. Tests SSH connection
2. Packages frontend, backend, and block explorer
3. Transfers to Droplet
4. Installs dependencies
5. Sets up systemd services
6. Starts all applications

**Expected Output:**
```
✅ SSH connection established
📦 Creating deployment archive...
🚀 Transferring to DigitalOcean Droplet...
⚙️  Deploying on Droplet...
✅ DEPLOYMENT SUCCESSFUL!

🌐 Your application is now running on:
   Frontend:       http://YOUR_IP:5000
   Backend API:    http://YOUR_IP:3002
   Block Explorer: http://YOUR_IP:3001
```

---

### Method 2: Manual Deployment via DigitalOcean Console

If you prefer to use the DigitalOcean web console at:
https://cloud.digitalocean.com/droplets/525676928/access

**Steps:**

1. **Access Droplet Console**
   - Go to: https://cloud.digitalocean.com/droplets/525676928/access
   - Click "Launch Droplet Console" or "Access"
   - You'll get a browser-based terminal

2. **Create Project Directory**
   ```bash
   mkdir -p /opt/aequitas
   cd /opt/aequitas
   ```

3. **Clone Repository** (from Droplet console)
   ```bash
   git clone https://github.com/CreoDAMO/REPAR.git .
   ```

4. **Install Dependencies**
   ```bash
   # Frontend
   cd /opt/aequitas/frontend
   npm install --production
   
   # Backend
   cd /opt/aequitas/backend
   npm install --production
   
   # Block Explorer
   cd /opt/aequitas/dexplorer
   npm install --production
   ```

5. **Set Environment Variables**
   ```bash
   # Create .env file for backend
   cat > /opt/aequitas/backend/.env << 'EOF'
   PORT=3002
   CIRCLE_API_KEY=your_circle_api_key
   CIRCLE_ENTITY_SECRET=your_circle_secret
   NVIDIA_API_KEY=your_nvidia_key
   EOF
   ```

6. **Start Services with PM2** (Process Manager)
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start Frontend
   cd /opt/aequitas/frontend
   pm2 start "npm run dev -- --host 0.0.0.0 --port 5000" --name aequitas-frontend
   
   # Start Backend
   cd /opt/aequitas/backend
   pm2 start "PORT=3002 npm run dev" --name aequitas-backend
   
   # Start Block Explorer
   cd /opt/aequitas/dexplorer
   pm2 start "npm run dev -- --host 0.0.0.0 --port 3001" --name aequitas-dexplorer
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

7. **Verify Services**
   ```bash
   pm2 status
   pm2 logs
   ```

---

### Method 3: Docker Deployment (If docker-compose.yml exists)

If you have a `docker-compose.yml` file:

```bash
# On Droplet (via console)
cd /opt/aequitas
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

---

## 🔧 Service Management

### Using Systemd (Method 1)

```bash
# View status
ssh root@$DO_HOST "systemctl status aequitas-*"

# View logs
ssh root@$DO_HOST "journalctl -u aequitas-frontend -f"

# Restart services
ssh root@$DO_HOST "systemctl restart aequitas-*"

# Stop services
ssh root@$DO_HOST "systemctl stop aequitas-*"
```

### Using PM2 (Method 2)

```bash
# From Droplet console or SSH
pm2 status                    # View status
pm2 logs                      # View logs
pm2 restart all               # Restart all
pm2 stop all                  # Stop all
pm2 delete all                # Remove all
```

---

## 🌐 Firewall Configuration

Ensure your DigitalOcean Droplet firewall allows traffic on required ports:

```bash
# On Droplet
ufw allow 22        # SSH
ufw allow 80        # HTTP
ufw allow 443       # HTTPS
ufw allow 5000      # Frontend
ufw allow 3001      # Block Explorer
ufw allow 3002      # Backend API
ufw allow 26657     # Blockchain RPC (if running validator)
ufw enable
```

---

## 🔐 Security Best Practices

### 1. Use Environment Variables for Secrets
Never hardcode API keys. Use environment files:

```bash
# On Droplet, create /opt/aequitas/backend/.env
cat > /opt/aequitas/backend/.env << 'EOF'
CIRCLE_API_KEY=${CIRCLE_API_KEY}
CIRCLE_ENTITY_SECRET=${CIRCLE_ENTITY_SECRET}
NVIDIA_API_KEY=${NVIDIA_API_KEY}
ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
OPENAI_API_KEY=${OPENAI_API_KEY}
EOF

chmod 600 /opt/aequitas/backend/.env
```

### 2. Set Up HTTPS with Let's Encrypt

```bash
# Install Certbot
apt update
apt install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d your-domain.com

# Auto-renewal
certbot renew --dry-run
```

### 3. Regular Security Updates

```bash
# On Droplet
apt update
apt upgrade -y
apt autoremove -y
```

---

## 📊 Monitoring

### Quick Health Check

```bash
# From Replit
curl http://$DO_HOST:5000          # Frontend
curl http://$DO_HOST:3002/health   # Backend health
curl http://$DO_HOST:3001          # Block Explorer
```

### Continuous Monitoring

```bash
# SSH to Droplet
ssh root@$DO_HOST

# Install monitoring tools
apt install htop iotop nethogs

# View real-time logs
pm2 logs
# or
journalctl -f
```

---

## 🚨 Troubleshooting

### SSH Connection Issues

**Problem:** `Permission denied (publickey)`

**Solution:**
```bash
# Verify SSH key is correct
ssh -v root@$DO_HOST

# Manually copy SSH key
ssh-copy-id -i $DO_SSH_KEY_PATH root@$DO_HOST
```

---

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill process
ssh root@$DO_HOST "lsof -ti:5000 | xargs kill -9"
```

---

### Service Not Starting

**Problem:** Service fails to start

**Solution:**
```bash
# Check logs
ssh root@$DO_HOST "journalctl -u aequitas-frontend -n 50"

# or for PM2
ssh root@$DO_HOST "pm2 logs aequitas-frontend --lines 50"

# Check disk space
ssh root@$DO_HOST "df -h"

# Check memory
ssh root@$DO_HOST "free -h"
```

---

## 📦 Deployment Checklist

Before deploying, ensure:

- [ ] SSH key is added to Droplet's authorized_keys
- [ ] All Replit workflows are running successfully
- [ ] Environment variables are configured
- [ ] Firewall rules are set
- [ ] Domain DNS (if using) points to Droplet IP

During deployment:

- [ ] Backup existing deployment (if updating)
- [ ] Test SSH connection
- [ ] Deploy using chosen method
- [ ] Verify all services start
- [ ] Test each endpoint (Frontend, Backend, Explorer)
- [ ] Check logs for errors

After deployment:

- [ ] Set up monitoring
- [ ] Configure HTTPS
- [ ] Test full user flow
- [ ] Document any custom configuration

---

## 🔄 Updating Existing Deployment

To update an already-deployed application:

```bash
# Method 1: Re-run deployment script
./scripts/deploy-to-digitalocean.sh

# Method 2: SSH and pull latest changes
ssh root@$DO_HOST << 'EOF'
cd /opt/aequitas
git pull
cd frontend && npm install && pm2 restart aequitas-frontend
cd ../backend && npm install && pm2 restart aequitas-backend
cd ../dexplorer && npm install && pm2 restart aequitas-dexplorer
EOF
```

---

## 🎯 Next Steps After Deployment

1. **Initialize Testnet** (See: TESTNET_INITIALIZATION_GUIDE.md)
2. **Allocate Founder Wallet**
3. **Configure DNS** for your domain
4. **Set up SSL/HTTPS**
5. **Enable monitoring** and alerts
6. **Create backup** procedures

---

## 📞 Support

If you encounter issues:

1. Check service logs: `journalctl -u aequitas-frontend -f`
2. Verify network connectivity: `curl localhost:5000`
3. Check Droplet resources: `htop`, `df -h`
4. Review this guide's Troubleshooting section

---

## ✅ Summary

You now have three deployment options:
1. **Automated** via `deploy-to-digitalocean.sh` (recommended)
2. **Manual** via DigitalOcean web console (no SSH needed)
3. **Docker** via docker-compose (if configured)

All methods maintain your SSH key's passphrase protection while enabling secure deployment to your DigitalOcean Droplet.

**Recommended approach:** Use Method 1 (automated script) for initial deployment, then Method 2 (console) for quick updates or troubleshooting.

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Production Ready ✅
