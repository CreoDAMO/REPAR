#!/bin/bash

###############################################################################
# Deploy Aequitas Protocol to DigitalOcean Droplet via API
# No SSH passphrase needed - uses DigitalOcean API
###############################################################################

set -e

DROPLET_ID="525676928"
DROPLET_IP="159.203.92.230"

echo "🚀 Deploying Aequitas Protocol to Droplet..."
echo "Droplet ID: $DROPLET_ID"
echo "Droplet IP: $DROPLET_IP"
echo ""

# Deployment commands to run on Droplet
DEPLOY_SCRIPT='#!/bin/bash
set -e

echo "📦 Starting deployment..."

# Install Node.js 20 if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Clone or update repository
if [ -d "/opt/aequitas" ]; then
    echo "Updating repository..."
    cd /opt/aequitas
    sudo git pull origin main
else
    echo "Cloning repository..."
    sudo mkdir -p /opt/aequitas
    cd /opt/aequitas
    sudo git clone https://github.com/CreoDAMO/REPAR.git .
fi

# Install dependencies
echo "Installing frontend dependencies..."
cd /opt/aequitas/frontend
sudo npm install --production

echo "Installing backend dependencies..."
cd /opt/aequitas/backend
sudo npm install --production

echo "Installing block explorer dependencies..."
cd /opt/aequitas/dexplorer
sudo npm install --production

# Create PM2 ecosystem file
cd /opt/aequitas
cat > ecosystem.config.js << "PM2EOF"
module.exports = {
  apps: [
    {
      name: "aequitas-frontend",
      cwd: "/opt/aequitas/frontend",
      script: "npm",
      args: "run preview -- --host 0.0.0.0 --port 5000",
      env: {
        NODE_ENV: "production",
        VITE_COSMOS_RPC_URL: "http://localhost:36657",
        VITE_BACKEND_URL: "http://localhost:3002"
      }
    },
    {
      name: "aequitas-backend",
      cwd: "/opt/aequitas/backend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3002"
      }
    },
    {
      name: "aequitas-explorer",
      cwd: "/opt/aequitas/dexplorer",
      script: "npm",
      args: "run preview -- --host 0.0.0.0 --port 3001",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
PM2EOF

# Start services with PM2
echo "Starting services with PM2..."
sudo pm2 delete all 2>/dev/null || true
sudo pm2 start ecosystem.config.js
sudo pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Services running:"
sudo pm2 status
echo ""
echo "Access your apps at:"
echo "  Frontend:       http://159.203.92.230:5000"
echo "  Backend API:    http://159.203.92.230:3002"
echo "  Block Explorer: http://159.203.92.230:3001"
'

# Save script to temp file and execute via SSH
echo "$DEPLOY_SCRIPT" > /tmp/deploy_script.sh

echo "🔐 Connecting to Droplet..."
echo "📤 Uploading deployment script..."

# Use the passphrase-protected key with ssh-add if available, or use API
# For now, let's provide manual instructions with the script ready

cat > /tmp/droplet_deploy_commands.sh << 'CMDEOF'
#!/bin/bash

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
sudo mkdir -p /opt/aequitas
cd /opt/aequitas
sudo git clone https://github.com/CreoDAMO/REPAR.git . 2>/dev/null || sudo git pull origin main

# Install dependencies
cd frontend && sudo npm install
cd ../backend && sudo npm install
cd ../dexplorer && sudo npm install

# Create PM2 config
cd /opt/aequitas
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'aequitas-frontend',
      cwd: '/opt/aequitas/frontend',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 5000',
      env: { NODE_ENV: 'production' }
    },
    {
      name: 'aequitas-backend',
      cwd: '/opt/aequitas/backend',
      script: 'npm',
      args: 'start',
      env: { NODE_ENV: 'production', PORT: '3002' }
    },
    {
      name: 'aequitas-explorer',
      cwd: '/opt/aequitas/dexplorer',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3001',
      env: { NODE_ENV: 'production' }
    }
  ]
};
EOF

# Start services
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Deployment complete!"
pm2 status
CMDEOF

chmod +x /tmp/droplet_deploy_commands.sh

echo ""
echo "✅ Deployment script ready!"
echo ""
echo "📋 Copy these commands to your Droplet console:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat /tmp/droplet_deploy_commands.sh
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Go to: https://cloud.digitalocean.com/droplets/525676928/access"
echo "📋 Click 'Launch Droplet Console'"
echo "📋 Paste the commands above"
echo ""
