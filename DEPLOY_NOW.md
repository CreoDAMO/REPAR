# 🚀 Aequitas Protocol - Deploy NOW Guide

**Date**: October 31, 2025  
**Your Droplet**: 159.203.92.230 (8GB RAM, 2 vCPUs, 160GB Disk) ✅  
**Status**: READY TO DEPLOY

---

## ⚡ Quick Deploy - Option C (Both App Platform + Droplet)

### **PART 1: Deploy to App Platform** (5 minutes - WEB CONSOLE)

1. **Go to**: https://cloud.digitalocean.com/apps/new

2. **Connect GitHub**:
   - Click "GitHub"
   - Authorize DigitalOcean to access `CreoDAMO/REPAR`
   - Select repository: `CreoDAMO/REPAR`
   - Branch: `main`
   - ✅ Enable "Autodeploy"

3. **Configure Services** (Add 3 services):

   **Service 1: Frontend**
   ```
   Name: frontend
   Source Directory: frontend
   Build Command: npm install && npm run build
   Run Command: npx vite preview --host 0.0.0.0 --port 8080
   HTTP Port: 8080
   Instance Size: Basic ($5/mo)
   Routes: / (root path)
   
   Environment Variables:
   - VITE_COINBASE_APP_ID = aequitas-protocol
   - NODE_ENV = production
   ```

   **Service 2: Block Explorer**
   ```
   Name: block-explorer
   Source Directory: dexplorer
   Build Command: npm install && npm run build
   Run Command: npx vite preview --host 0.0.0.0 --port 8081
   HTTP Port: 8081
   Instance Size: Basic ($5/mo)
   Routes: /explorer
   
   Environment Variables:
   - NODE_ENV = production
   ```

   **Service 3: Backend API**
   ```
   Name: backend-api
   Source Directory: backend
   Build Command: npm install
   Run Command: npm start
   HTTP Port: 3002
   Instance Size: Basic ($5/mo)
   Routes: /api
   
   Environment Variables:
   - NODE_ENV = production
   - PORT = 3002
   - CIRCLE_API_KEY = [Your Circle API Key]
   - CIRCLE_ENTITY_SECRET = [Your Circle Entity Secret]
   - NVIDIA_API_KEY = [Your NVIDIA API Key]
   ```

4. **Click "Create Resources"**

5. **Wait 5-10 minutes** - Your app will be live!

6. **Get your URL**: `https://aequitas-protocol-production-XXXXX.ondigitalocean.app`

---

### **PART 2: Deploy Blockchain to Your Droplet** (10 minutes)

#### **Option A: Web Console (Easiest)**

1. **Go to**: https://cloud.digitalocean.com/droplets/525676928/access

2. **Click "Launch Droplet Console"**

3. **Run these commands**:

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Create project directory
sudo mkdir -p /opt/aequitas
cd /opt/aequitas

# Clone the repository
sudo git clone https://github.com/CreoDAMO/REPAR.git .

# Install dependencies
cd frontend && sudo npm install
cd ../backend && sudo npm install  
cd ../dexplorer && sudo npm install

# Create PM2 ecosystem file
cd /opt/aequitas
cat > ecosystem.config.js <<'EOF'
module.exports = {
  apps: [
    {
      name: 'aequitas-frontend',
      cwd: '/opt/aequitas/frontend',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 5000',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'aequitas-backend',
      cwd: '/opt/aequitas/backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '3002'
      }
    },
    {
      name: 'aequitas-explorer',
      cwd: '/opt/aequitas/dexplorer',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3001',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

# Start all services with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Check status
pm2 status
```

4. **Your apps are now running on**:
   - Frontend: http://159.203.92.230:5000
   - Backend: http://159.203.92.230:3002
   - Explorer: http://159.203.92.230:3001

#### **Option B: SSH from Replit** (If you prefer automation)

From Replit Shell:

```bash
# Fix SSH key format if needed
chmod 600 ~/.ssh/id_rsa_do

# SSH into droplet
ssh -i ~/.ssh/id_rsa_do root@159.203.92.230

# Then run the commands from Option A above
```

---

### **PART 3: Initialize Blockchain (Testnet + Mainnet)**

Both networks are already initialized locally in Replit! You just need to copy them to your Droplet:

```bash
# From Replit Shell
tar -czf blockchain-initialized.tar.gz ~/.aequitas ~/.aequitas-testnet

# Transfer to Droplet
scp -i ~/.ssh/id_rsa_do blockchain-initialized.tar.gz root@159.203.92.230:/root/

# On Droplet (via console):
cd /root
tar -xzf blockchain-initialized.tar.gz

# Download the blockchain binary from GitHub Actions artifacts
# Go to: https://github.com/CreoDAMO/REPAR/actions
# Download latest "Blockchain Build" artifacts

# Or build locally (if Go installed):
cd /opt/aequitas/aequitas
make install

# Start Testnet
aequitasd start --home ~/.aequitas-testnet --minimum-gas-prices="0.025repar"

# Start Mainnet (different terminal)
aequitasd start --home ~/.aequitas --minimum-gas-prices="0.025repar" --rpc.laddr=tcp://0.0.0.0:36657 --p2p.laddr=tcp://0.0.0.0:36656
```

---

### **PART 4: Configure Cloudflare DNS** (5 minutes)

You have Cloudflare credentials ready! Let me set this up for you:

**Domains to configure**:
- `aequitaszone.io` → App Platform URL
- `api.aequitaszone.io` → App Platform API
- `explorer.aequitaszone.io` → App Platform Explorer
- `rpc.aequitaszone.io` → 159.203.92.230:36657 (Mainnet)
- `testnet-rpc.aequitaszone.io` → 159.203.92.230:26657 (Testnet)

---

## 📊 Deployment Status

### ✅ Ready to Deploy:
- [x] DigitalOcean account active
- [x] Droplet running (159.203.92.230)
- [x] App Platform spec created
- [x] Blockchain initialized (Testnet + Mainnet)
- [x] Founder allocation verified (23.58T REPAR)
- [x] All dependencies installed locally
- [x] API credentials configured

### 🚀 Next Actions:
1. **Deploy App Platform** (5 min) → Go to DO console
2. **Deploy to Droplet** (10 min) → Use web console
3. **Copy blockchain data** (5 min) → Transfer initialized networks
4. **Configure DNS** (5 min) → I'll automate this

**Total Time**: ~25 minutes to full production deployment!

---

## 🎯 Expected Results

After deployment:

### **App Platform** (Serverless - Auto-scaling)
- ✅ Frontend: `https://aequitas-protocol-production-xxxxx.ondigitalocean.app`
- ✅ Explorer: `https://aequitas-protocol-production-xxxxx.ondigitalocean.app/explorer`
- ✅ API: `https://aequitas-protocol-production-xxxxx.ondigitalocean.app/api`
- ✅ Auto-deploy on Git push
- ✅ Free SSL certificates
- ✅ Cost: $15/month total

### **Droplet** (Full Control - Blockchain Nodes)
- ✅ Frontend: `http://159.203.92.230:5000`
- ✅ Backend: `http://159.203.92.230:3002`  
- ✅ Explorer: `http://159.203.92.230:3001`
- ✅ Testnet RPC: `http://159.203.92.230:26657`
- ✅ Mainnet RPC: `http://159.203.92.230:36657`
- ✅ Cost: $48/month (already running)

**Combined Infrastructure**: $63/month for $2.401 quadrillion in managed value

---

## 🆘 Quick Troubleshooting

**App Platform not building?**
- Check GitHub is connected in DO settings
- Verify branch is `main`
- Check build logs in DO console

**Droplet services not starting?**
- Run: `pm2 logs` to see errors
- Check: `pm2 status`
- Restart: `pm2 restart all`

**Blockchain not syncing?**
- Check: `journalctl -u aequitasd -f`
- Verify ports: `sudo ufw allow 26657` and `sudo ufw allow 36657`

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] App Platform shows "Active" status
- [ ] Frontend loads at App Platform URL
- [ ] Explorer accessible at /explorer route
- [ ] API responds at /api/health
- [ ] Droplet shows all PM2 services running
- [ ] Blockchain RPC endpoints responding
- [ ] DNS pointing to correct IPs
- [ ] SSL certificates active

---

**Ready to deploy? Start with Part 1 (App Platform) - takes 5 minutes! 🚀**
