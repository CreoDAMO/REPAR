# 🚀 Deploy Aequitas Blockchain to DigitalOcean Droplet

## Prerequisites ✅
- ✅ GitHub Release created with blockchain binary (61MB)
- ✅ Droplet IP: 159.203.92.230
- ✅ SSH access to Droplet
- ✅ Domain: aequitasprotocol.zone

## Deployment Steps

### 1. Copy Script to Droplet

From your local machine or mobile SSH client:

```bash
# Option A: Download directly on Droplet
ssh root@159.203.92.230
wget https://raw.githubusercontent.com/CreoDAMO/REPAR/main/deploy-blockchain-to-droplet.sh
chmod +x scripts/deploy-blockchain-to-droplet.sh
./scripts/deploy-blockchain-to-droplet.sh
```

### 2. Start Blockchain Nodes

After the script completes:

```bash
# Start Mainnet
sudo systemctl start aequitas-mainnet
sudo systemctl enable aequitas-mainnet

# Start Testnet
sudo systemctl start aequitas-testnet
sudo systemctl enable aequitas-testnet
```

### 3. Verify Deployment

```bash
# Check service status
sudo systemctl status aequitas-mainnet
sudo systemctl status aequitas-testnet

# Test RPC endpoints
curl http://localhost:26657/status | jq
curl http://localhost:26658/status | jq

# View logs
sudo journalctl -u aequitas-mainnet -f --lines=50
sudo journalctl -u aequitas-testnet -f --lines=50
```

## Network Configuration

- **Mainnet**
  - Chain ID: `aequitas-1`
  - RPC Port: `26657`
  - P2P Port: `26656`
  - Home: `~/.aequitas`

- **Testnet**
  - Chain ID: `aequitas-testnet-1`
  - RPC Port: `26658`
  - P2P Port: `26666`
  - Home: `~/.aequitas-testnet`

## Next: Configure Nginx Reverse Proxy

Add to `/etc/nginx/sites-available/aequitasprotocol.zone`:

```nginx
# Mainnet RPC
server {
    listen 80;
    server_name rpc.aequitasprotocol.zone;

    location / {
        proxy_pass http://localhost:26657;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Testnet RPC
server {
    listen 80;
    server_name rpc-testnet.aequitasprotocol.zone;

    location / {
        proxy_pass http://localhost:26658;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Then reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Troubleshooting

### Check if binary is installed
```bash
which aequitasd
aequitasd version
```

### Check genesis files
```bash
ls -lh ~/.aequitas/config/genesis.json
ls -lh ~/.aequitas-testnet/config/genesis.json
```

### Check ports are listening
```bash
sudo netstat -tulpn | grep aequitasd
```

### Restart services
```bash
sudo systemctl restart aequitas-mainnet
sudo systemctl restart aequitas-testnet
```
