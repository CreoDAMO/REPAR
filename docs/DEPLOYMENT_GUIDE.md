# Aequitas Protocol - Deployment Guide

## Table of Contents
1. [DigitalOcean App Platform Deployment](#digitalocean-app-platform-deployment)
2. [Manual Droplet Deployment](#manual-droplet-deployment)
3. [Environment Variables](#environment-variables)
4. [Domain Configuration](#domain-configuration)
5. [SSL/HTTPS Setup](#sslhttps-setup)
6. [Monitoring & Scaling](#monitoring--scaling)

---

## DigitalOcean App Platform Deployment

### Prerequisites

1. **Install doctl CLI**
   ```bash
   # macOS
   brew install doctl
   
   # Linux
   cd ~
   wget https://github.com/digitalocean/doctl/releases/download/v1.94.0/doctl-1.94.0-linux-amd64.tar.gz
   tar xf ~/doctl-1.94.0-linux-amd64.tar.gz
   sudo mv ~/doctl /usr/local/bin
   ```

2. **Authenticate with DigitalOcean**
   ```bash
   doctl auth init
   # Enter your API token when prompted
   # IMPORTANT: DO NOT set your DO token as a VITE_ variable - it would be exposed to browsers!
   ```

3. **Optional: Set Cosmos RPC URL (if blockchain node is running)**
   ```bash
   export COSMOS_RPC_URL="https://rpc.yourdomain.com:26657"
   ```
   
   Note: Circle API keys should be set in the DigitalOcean dashboard AFTER deployment, not as shell variables.

### Automated Deployment

Run the deployment script:

```bash
# Production deployment
chmod +x deploy-to-digitalocean.sh
./deploy-to-digitalocean.sh production

# Staging deployment
./deploy-to-digitalocean.sh staging
```

### Manual Deployment via Dashboard

1. **Log in to DigitalOcean**
   - Go to https://cloud.digitalocean.com/apps

2. **Create New App**
   - Click "Create App"
   - Select "GitHub" as source
   - Connect repository: `CreoDAMO/REPAR`
   - Select branch: `main`

3. **Configure Frontend Service**
   - Source Directory: `frontend` (relative path, no leading slash)
   - Build Command: `npm install && npm run build`
   - Run Command: `npx vite preview --host 0.0.0.0 --port 8080`
   - HTTP Port: `8080`
   - Instance Size: `Basic (512MB RAM, $5/mo)`

4. **Configure Block Explorer Service**
   - Source Directory: `dexplorer` (relative path, no leading slash)
   - Build Command: `npm install && npm run build`
   - Run Command: `npx vite preview --host 0.0.0.0 --port 8081`
   - HTTP Port: `8081`
   - Instance Size: `Basic (512MB RAM, $5/mo)`

5. **Set Environment Variables**
   - Public variables only (see security note below)
   - `VITE_COINBASE_APP_ID`: `aequitas-protocol`
   - `NODE_ENV`: `production`

6. **Deploy**
   - Click "Create Resources"
   - Wait 5-10 minutes for deployment

---

## Manual Droplet Deployment

For more control, deploy to a DigitalOcean Droplet:

### 1. Create Droplet

```bash
# Create Ubuntu 22.04 droplet
doctl compute droplet create aequitas-protocol \
  --region nyc3 \
  --size s-2vcpu-4gb \
  --image ubuntu-22-04-x64 \
  --ssh-keys YOUR_SSH_KEY_ID
```

### 2. SSH into Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### 3. Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx
```

### 4. Clone Repository

```bash
cd /var/www
git clone https://github.com/CreoDAMO/REPAR.git
cd REPAR
```

### 5. Build Frontend

```bash
cd frontend
npm install
npm run build
```

### 6. Build Block Explorer

```bash
cd ../dexplorer
npm install
npm run build
```

### 7. Configure PM2

```bash
# Create ecosystem file
cat > /var/www/REPAR/ecosystem.config.js <<EOF
module.exports = {
  apps: [
    {
      name: 'aequitas-frontend',
      cwd: '/var/www/REPAR/frontend',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'production',
        VITE_COINBASE_APP_ID: 'aequitas-protocol'
      }
    },
    {
      name: 'aequitas-explorer',
      cwd: '/var/www/REPAR/dexplorer',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3001',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

# Start applications
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 8. Configure Nginx

```bash
cat > /etc/nginx/sites-available/aequitas <<EOF
server {
    listen 80;
    server_name repar.network www.repar.network;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /explorer {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/aequitas /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 9. Setup SSL with Certbot

```bash
certbot --nginx -d repar.network -d www.repar.network
```

---

## Environment Variables

### Public Environment Variables (Safe for Frontend)

These can be set in DigitalOcean dashboard or `.env` file:

```bash
# Coinbase Integration (Public App ID - Safe)
VITE_COINBASE_APP_ID=aequitas-protocol

# Blockchain RPC (Public endpoint - Safe)
VITE_COSMOS_RPC_URL=https://rpc.yourdomain.com:26657

# Environment
NODE_ENV=production
```

### ⚠️ CRITICAL SECURITY WARNING - Payment Integration

**Circle SDK Cannot Be Used in Frontend-Only Deployment**

The Circle payment integration (`VITE_CIRCLE_API_KEY`, `VITE_CIRCLE_ENTITY_SECRET`) is currently **DISABLED** for security reasons:

- ❌ **DO NOT** set Circle API keys as `VITE_` environment variables
- ❌ All `VITE_` variables are bundled into JavaScript and visible to anyone
- ❌ Exposing Circle API keys allows attackers to make unauthorized payments
- ❌ This would result in financial loss and API key compromise

**To Enable Circle Payments Safely:**
1. Implement a backend API server (Node.js, Python, Go, etc.)
2. Store Circle API keys server-side as environment variables (not `VITE_` prefixed)
3. Frontend calls your backend API, which then calls Circle API
4. Backend validates requests and handles sensitive operations

**Architecture Example:**
```
Frontend → Your Backend API → Circle API
  (public)   (private keys)    (secure)
```

**Other Security Rules:**
- ⚠️ **NEVER** set DigitalOcean API tokens as `VITE_` variables
- ⚠️ Use `doctl auth init` for DO authentication (local deployment only)
- ⚠️ Any secret API key should be backend-only
- ✅ Only public identifiers and endpoints can be `VITE_` variables

### Setting Secrets in DigitalOcean App Platform

1. Go to your app in the Dashboard
2. Navigate to "Settings" > "App-Level Environment Variables"
3. Add each secret:
   - Click "Edit" > "Add Variable"
   - Set Type to "Secret" for sensitive values
   - Click "Save"
4. Redeploy for changes to take effect

---

## Domain Configuration

### Option 1: DigitalOcean App Platform (Automatic)

1. Go to your app's "Settings" > "Domains"
2. Click "Add Domain"
3. Enter your domain: `repar.network`
4. Update your DNS provider with the provided records:
   ```
   Type: CNAME
   Name: www
   Value: [provided by DigitalOcean]
   ```

### Option 2: Manual Droplet Setup

1. **Add A Record in DNS Provider**
   ```
   Type: A
   Name: @
   Value: YOUR_DROPLET_IP
   TTL: 3600
   ```

2. **Add CNAME for www**
   ```
   Type: CNAME
   Name: www
   Value: repar.network
   TTL: 3600
   ```

---

## SSL/HTTPS Setup

### App Platform (Automatic)
SSL is automatically provisioned and renewed by DigitalOcean.

### Droplet (Certbot)
```bash
# Initial setup
certbot --nginx -d repar.network -d www.repar.network

# Auto-renewal is enabled by default
# Test renewal:
certbot renew --dry-run
```

---

## Monitoring & Scaling

### App Platform Monitoring

1. **Built-in Metrics**
   - Go to your app > "Insights" tab
   - View CPU, Memory, Request metrics
   - Set up alerts for high resource usage

2. **Auto-Scaling**
   ```bash
   # Update instance count in app spec
   doctl apps update YOUR_APP_ID --spec updated-app-spec.yaml
   ```

3. **Logs**
   ```bash
   # View logs
   doctl apps logs YOUR_APP_ID --type run
   
   # Follow logs in real-time
   doctl apps logs YOUR_APP_ID --type run --follow
   ```

### Droplet Monitoring

1. **Install Monitoring Agent**
   ```bash
   curl -sSL https://repos.insights.digitalocean.com/install.sh | bash
   ```

2. **PM2 Monitoring**
   ```bash
   # View status
   pm2 status
   
   # View logs
   pm2 logs aequitas-frontend
   pm2 logs aequitas-explorer
   
   # Monitor in real-time
   pm2 monit
   ```

3. **Setup Monitoring Dashboard**
   - Go to DigitalOcean > Monitoring
   - Create custom dashboards
   - Set up alert policies

---

## Scaling Strategies

### Vertical Scaling (Upgrade Resources)
```bash
# App Platform
doctl apps update YOUR_APP_ID --spec app-spec-with-larger-size.yaml

# Droplet
doctl compute droplet-action resize DROPLET_ID --size s-4vcpu-8gb
```

### Horizontal Scaling (Add Instances)
```bash
# Update app spec with higher instance_count
# In .do-app-spec.yaml:
instance_count: 3  # Scale to 3 instances
```

### Load Balancing
For high traffic, add a Load Balancer:
```bash
doctl compute load-balancer create \
  --name aequitas-lb \
  --region nyc3 \
  --forwarding-rules entry_protocol:https,entry_port:443,target_protocol:http,target_port:3000,tls_passthrough:false \
  --health-check protocol:http,port:3000,path:/,check_interval_seconds:10 \
  --droplet-ids DROPLET_ID_1,DROPLET_ID_2
```

---

## Estimated Costs

### DigitalOcean App Platform
- **Basic Setup**: $10-15/month
  - Frontend: Basic instance ($5/mo)
  - Block Explorer: Basic instance ($5/mo)
  - Bandwidth: Included (1TB/mo)

- **Production Setup**: $24-36/month
  - Frontend: Professional instance ($12/mo)
  - Block Explorer: Professional instance ($12/mo)
  - Custom domain: Free
  - SSL: Free

### Droplet Deployment
- **Basic Droplet**: $12/month (2GB RAM)
- **Production Droplet**: $24/month (4GB RAM)
- **Load Balancer**: $12/month (optional)

---

## Troubleshooting

### Build Failures
```bash
# Check build logs
doctl apps logs YOUR_APP_ID --type build

# Common fixes:
# 1. Ensure package.json has all dependencies
# 2. Check Node version compatibility
# 3. Verify build command is correct
```

### Runtime Errors
```bash
# Check runtime logs
doctl apps logs YOUR_APP_ID --type run --follow

# Common fixes:
# 1. Verify environment variables are set
# 2. Check API keys are valid
# 3. Ensure port configuration matches
```

### Connection Issues
```bash
# Test connectivity
curl -I https://YOUR_APP_URL

# Check DNS propagation
dig repar.network

# Verify SSL certificate
openssl s_client -connect repar.network:443
```

---

## Support

For deployment issues:
- **DigitalOcean Support**: https://cloud.digitalocean.com/support
- **Community Forum**: https://www.digitalocean.com/community
- **Project Issues**: https://github.com/CreoDAMO/REPAR/issues

---

**Built with ❤️ for justice | Powered by DigitalOcean**

"Justice delayed is justice denied, but mathematics is eternal."
