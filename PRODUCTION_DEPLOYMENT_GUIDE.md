# Aequitas Protocol - Production Deployment Guide

## Overview
This guide covers the complete production deployment process for the Aequitas Protocol ($REPAR) blockchain and web application. Last updated: October 23, 2025.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Infrastructure Setup](#infrastructure-setup)
4. [Deployment Process](#deployment-process)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### 1. Code Readiness
- [ ] All dependencies updated to latest stable versions
  - React 19.2.0
  - Vite 7.1.12
  - Tailwind CSS 3.4.18
- [ ] Production build tested successfully
- [ ] Zero security vulnerabilities in `npm audit`
- [ ] All LSP errors resolved
- [ ] Code reviewed and architect-approved

### 2. Configuration Files
- [ ] `.env` file configured (use `.env.template` as reference)
- [ ] All API keys and secrets set
- [ ] Domain name configured
- [ ] SSL certificates ready

### 3. Infrastructure Requirements
- [ ] DigitalOcean droplet provisioned (recommended: 4GB RAM, 2 vCPUs minimum)
- [ ] Cloudflare account setup with DNS configured
- [ ] Domain name registered and pointing to Cloudflare

### 4. API Key Verification
Navigate to `/deployment` route in your application to verify all APIs:

#### Critical (MUST HAVE)
- Cloudflare API Token
- DigitalOcean API Token
- Anthropic API Key (Claude)
- OpenAI API Key (GPT-4)
- X.AI API Key (Grok)
- DeepSeek API Key
- Coinbase API credentials
- Circle USDC API Key

#### Recommended
- NVIDIA NIM API Key (for AI features)
- GitHub API Token
- SendGrid API Key
- Infura IPFS credentials

#### Optional
- Sentry DSN (error tracking)
- Pinata IPFS API Key
- Discord Webhook
- Twitter/X API credentials

---

## Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.template .env
```

### 2. Configure Critical Variables

#### Infrastructure
```env
CLOUDFLARE_API_TOKEN="your_token_here"
CLOUDFLARE_ZONE_ID="your_zone_id"
DOMAIN="aequitasprotocol.zone"
FRONTEND_URL="https://app.aequitasprotocol.zone"
BACKEND_URL="https://api.aequitasprotocol.zone"
RPC_URL="https://rpc.aequitasprotocol.zone"

DO_HOST="159.203.92.230"
DO_USERNAME="root"
DO_API_TOKEN="your_do_token"
```

#### AI Models (Cerberus Brain)
```env
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxx"
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxx"
XAI_API_KEY="xai-xxxxxxxxxxxx"
DEEPSEEK_API_KEY="sk-xxxxxxxxxxxx"
NVIDIA_API_KEY="nvapi-xxxxxxxxxxxx"
VITE_NVIDIA_API_KEY="nvapi-xxxxxxxxxxxx"
```

#### Payments
```env
COINBASE_API_KEY="organizations/xxx/apiKeys/xxx"
COINBASE_API_SECRET="-----BEGIN EC PRIVATE KEY-----\n...\n-----END EC PRIVATE KEY-----"
CIRCLE_API_KEY="your_circle_api_key"
CIRCLE_ENVIRONMENT="production"
```

#### Blockchain
```env
AEQUITAS_CHAIN_ID="aequitas-1"
AEQUITAS_RPC_PORT="26657"
AEQUITAS_API_PORT="1317"
AEQUITAS_GRPC_PORT="9090"
```

---

## Infrastructure Setup

### 1. DigitalOcean Droplet Setup

#### Create Droplet
```bash
# Recommended specs:
# - 4GB RAM / 2 vCPUs (minimum)
# - Ubuntu 24.04 LTS
# - SSD storage
# - Datacenter: Choose closest to your target audience
```

#### Initial Server Configuration
```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Go (for Cosmos SDK backend)
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installations
node --version  # Should be v20.x
npm --version
go version
```

### 2. Cloudflare DNS Configuration

```bash
# Run the DNS setup script
./scripts/setup-cloudflare-dns.sh

# This will create DNS records for:
# - app.aequitasprotocol.zone (frontend)
# - api.aequitasprotocol.zone (backend API)
# - rpc.aequitasprotocol.zone (blockchain RPC)
```

### 3. Nginx Configuration

```nginx
# /etc/nginx/sites-available/aequitas-frontend
server {
    listen 80;
    server_name app.aequitasprotocol.zone;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# /etc/nginx/sites-available/aequitas-backend
server {
    listen 80;
    server_name api.aequitasprotocol.zone;

    location / {
        proxy_pass http://localhost:1317;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# /etc/nginx/sites-available/aequitas-rpc
server {
    listen 80;
    server_name rpc.aequitasprotocol.zone;

    location / {
        proxy_pass http://localhost:26657;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable sites:
```bash
ln -s /etc/nginx/sites-available/aequitas-frontend /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/aequitas-backend /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/aequitas-rpc /etc/nginx/sites-enabled/

nginx -t  # Test configuration
systemctl reload nginx
```

### 4. SSL Certificates (Let's Encrypt)

```bash
# Get SSL certificates for all domains
certbot --nginx -d app.aequitasprotocol.zone
certbot --nginx -d api.aequitasprotocol.zone
certbot --nginx -d rpc.aequitasprotocol.zone

# Auto-renewal setup (already configured by certbot)
systemctl status certbot.timer
```

---

## Deployment Process

### 1. Clone Repository

```bash
cd /opt
git clone https://github.com/YOUR_ORG/aequitas-protocol.git
cd aequitas-protocol
```

### 2. Frontend Deployment

```bash
cd frontend

# Install dependencies
npm install --production

# Build for production
npm run build

# The build will create optimized chunks:
# - vendor-react.js (React core)
# - vendor-charts.js (Recharts)
# - vendor-blockchain.js (Cosmos SDK)
# - vendor-ui.js (Icons)
# - vendor-ipfs.js (IPFS client)
# - vendor-crypto.js (Coinbase/Circle)

# Serve with PM2 (process manager)
npm install -g pm2
pm2 start "npm run preview" --name "aequitas-frontend"
pm2 save
pm2 startup  # Follow instructions to enable on boot
```

### 3. Backend Deployment (Cosmos SDK Blockchain)

```bash
cd ../aequitas-zone

# Build the blockchain binary
make install

# Initialize the chain (first time only)
aequitasd init validator1 --chain-id aequitas-1

# Copy genesis file
cp ../genesis-template.json ~/.aequitas/config/genesis.json

# Configure app.toml and config.toml
# Edit ~/.aequitas/config/app.toml
# Edit ~/.aequitas/config/config.toml

# Start the blockchain node
pm2 start "aequitasd start" --name "aequitas-node"
pm2 save
```

### 4. IPFS Node (Optional but Recommended)

```bash
# Install IPFS
wget https://dist.ipfs.io/go-ipfs/v0.18.0/go-ipfs_v0.18.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.18.0_linux-amd64.tar.gz
cd go-ipfs
bash install.sh

# Initialize IPFS
ipfs init

# Start IPFS daemon
pm2 start "ipfs daemon" --name "ipfs-node"
pm2 save
```

---

## Post-Deployment Verification

### 1. Health Checks

```bash
# Check frontend
curl https://app.aequitasprotocol.zone

# Check backend API
curl https://api.aequitasprotocol.zone/cosmos/base/tendermint/v1beta1/node_info

# Check RPC
curl https://rpc.aequitasprotocol.zone/status
```

### 2. Deployment Verification Dashboard

Navigate to: `https://app.aequitasprotocol.zone/deployment`

Click "Run All Tests" and verify:
- ✅ All critical APIs show green status
- ✅ Production Readiness Score = 100%
- ✅ All latency measurements < 2000ms

### 3. Functionality Testing

Test core features:
- [ ] Dashboard loads with real data
- [ ] Investor Dashboard displays correctly
- [ ] DEX swap interface works
- [ ] NFT Marketplace functions
- [ ] NVIDIA AI features work (or show mock data gracefully)
- [ ] Wallet connections (Keplr, MetaMask, Coinbase)
- [ ] Payment processing (Circle USDC)

---

## Monitoring & Maintenance

### 1. Application Monitoring

```bash
# View PM2 processes
pm2 status

# View logs
pm2 logs aequitas-frontend
pm2 logs aequitas-node

# Monitor resources
pm2 monit
```

### 2. System Monitoring

```bash
# Install monitoring tools
apt install -y htop iotop nethogs

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
htop
```

### 3. Error Tracking (Sentry)

If Sentry is configured:
- Dashboard: https://sentry.io/YOUR_PROJECT
- Alerts configured for:
  - JavaScript errors
  - API failures
  - Performance degradation

### 4. Backup Strategy

```bash
# Database/State backup (daily)
crontab -e
# Add: 0 2 * * * tar -czf /backup/aequitas-$(date +\%Y\%m\%d).tar.gz ~/.aequitas/data

# Frontend backup (on deploy)
tar -czf /backup/frontend-$(date +\%Y\%m\%d).tar.gz /opt/aequitas-protocol/frontend/dist
```

---

## Troubleshooting

### Frontend Issues

**Problem: White screen / blank page**
```bash
# Check build output
cd /opt/aequitas-protocol/frontend
npm run build

# Check nginx logs
tail -f /var/log/nginx/error.log

# Check browser console for errors
```

**Problem: API calls failing**
```bash
# Verify CORS settings in backend
# Check API_URL in frontend .env
# Verify nginx proxy configuration
```

### Backend Issues

**Problem: Node not syncing**
```bash
# Check peers
aequitasd status | jq .SyncInfo

# Check logs
pm2 logs aequitas-node

# Restart node
pm2 restart aequitas-node
```

**Problem: Out of memory**
```bash
# Check memory
free -h

# Increase swap space
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### SSL Certificate Issues

**Problem: Certificate expired**
```bash
# Renew manually
certbot renew

# Check auto-renewal
certbot renew --dry-run
```

---

## Performance Optimization

### 1. Frontend Caching

Add to nginx config:
```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. Cloudflare Settings

- Enable "Auto Minify" (JS, CSS, HTML)
- Enable "Brotli" compression
- Set caching rules for static assets
- Enable "Always Use HTTPS"
- Configure "Rocket Loader" for JS optimization

### 3. Database Optimization

For high-traffic periods:
```bash
# Increase blockchain node resources
# Edit ~/.aequitas/config/app.toml
# Increase cache sizes and connection pools
```

---

## Cost Estimates

### Monthly Operating Costs

**Infrastructure**
- DigitalOcean Droplet (4GB): $24/month
- Cloudflare (Pro plan): $20/month
- Domain (.zone): $40/year ≈ $3.33/month

**APIs & Services**
- NVIDIA NIM: $100-230/month
- Cerberus AI: $50-200/month
- Coinbase Commerce: Transaction-based
- Circle USDC: Transaction-based
- SendGrid (Email): $15/month
- Sentry (Error tracking): $26/month

**Total Estimated: $430-545/month** (excluding transaction fees)

---

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use environment variables** for all sensitive data
3. **Enable firewall** (ufw) on server
4. **Regular security updates**: `apt update && apt upgrade`
5. **Monitor logs** for suspicious activity
6. **Rate limiting** enabled in nginx
7. **CORS** properly configured
8. **API keys rotated** regularly

---

## Support & Resources

- **Documentation**: https://docs.aequitasprotocol.zone
- **GitHub**: https://github.com/aequitas-protocol
- **Deployment Script**: `/deploy-to-digitalocean.sh`
- **DNS Setup Script**: `/scripts/setup-cloudflare-dns.sh`

---

## Rollback Procedure

If deployment fails:

```bash
# Stop new version
pm2 stop all

# Restore from backup
cd /opt
mv aequitas-protocol aequitas-protocol-failed
tar -xzf /backup/aequitas-YYYYMMDD.tar.gz

# Restart services
pm2 restart all

# Verify functionality
curl https://app.aequitasprotocol.zone
```

---

**Last Updated**: October 23, 2025
**Version**: 2.0
**Status**: Production Ready ✓
