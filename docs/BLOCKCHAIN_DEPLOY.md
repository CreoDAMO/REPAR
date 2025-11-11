# 🚀 Deploy Aequitas Blockchain from GitHub Release

## One-Command Deployment on DigitalOcean Droplet

### Option 1: Direct Download & Run (Easiest)

In your DigitalOcean console, run:

```bash
cd /root
wget https://raw.githubusercontent.com/CreoDAMO/REPAR/main/deploy-blockchain-from-release.sh
chmod +x scripts/deploy-blockchain-from-release.sh
./scripts/deploy-blockchain-from-release.sh
```

### Option 2: One-Liner (Even Easier)

```bash
bash <(wget -qO- https://raw.githubusercontent.com/CreoDAMO/REPAR/main/deploy-blockchain-from-release.sh)
```

---

## What This Script Does

1. ✅ Cleans up any previous installation
2. ✅ Downloads pre-built binary from GitHub release (61MB)
3. ✅ Installs to `/usr/local/bin/aequitasd`
4. ✅ Initializes Mainnet blockchain
5. ✅ Downloads genesis file (131T $REPAR allocations)
6. ✅ Configures RPC to listen on 0.0.0.0:26657
7. ✅ Starts blockchain with PM2 (skips slow validation)
8. ✅ Saves PM2 config for auto-restart

---

## After Installation

### Check Status
```bash
pm2 status
```

You should see:
- backend (online)
- explorer (online)
- frontend (online)
- blockchain (online)

### View Logs
```bash
pm2 logs blockchain --lines 50
```

### Test RPC
```bash
curl http://localhost:26657/status | jq
```

### Monitor Block Production
```bash
watch -n 2 'curl -s http://localhost:26657/status | jq .result.sync_info.latest_block_height'
```

Press Ctrl+C to exit.

---

## Network Details

- **Chain ID**: aequitas-1
- **RPC Port**: 26657
- **Total Supply**: 131 trillion $REPAR
- **Founder Allocation**: 23.58T REPAR (18%)

---

## Troubleshooting

### Blockchain shows "errored"
```bash
pm2 restart blockchain
pm2 logs blockchain
```

### Binary not found
```bash
which aequitasd
# Should show: /usr/local/bin/aequitasd
```

### Genesis file missing
```bash
ls -lh ~/.aequitas/config/genesis.json
```

### Re-run deployment from scratch
```bash
./scripts/deploy-blockchain-from-release.sh
```
