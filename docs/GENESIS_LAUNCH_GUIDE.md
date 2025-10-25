# Aequitas Zone Genesis Launch Guide

## Overview

This guide provides complete instructions for initializing and launching the Aequitas Zone blockchain with the correct genesis configuration.

## Genesis Configuration Summary

### Chain Information
- **Chain ID**: `aequitas-1`
- **Genesis Time**: `2025-10-20T16:00:00Z` (October 20, 2025 at 12:00 PM EDT / 4:00 PM UTC)
- **Initial Height**: `1`
- **EVM Chain ID**: `1619` (for EVM compatibility layer)

### Token Economics
- **Token Symbol**: REPAR
- **Base Denomination**: urepar (micro-REPAR, 10^-6 REPAR)
- **Total Supply**: 131,000,000,000,000 REPAR (131 Trillion)
  - In base units: `131000000000000000000` urepar
- **Founder Allocation**: 13,100,000,000,000 REPAR (10% = 13.1 Trillion)
  - In base units: `13100000000000000000` urepar
- **Founder Address**: `repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun`

### Key Features

#### 1. Zero Inflation Model
```json
"inflation": "0.000000000000000000"
```
- **No new token issuance**: REPAR has ZERO inflation
- All tokens exist at genesis
- Supply can only decrease through Justice Burn mechanism

#### 2. Validator Subsidy Protocol
The genesis includes the Validator Subsidy module with:
- **Monthly Budget**: 1,000,000 REPAR (1M REPAR per month)
- **Emergency Reserve**: 500,000 REPAR (500K REPAR for unforeseen expenses)
- **Distribution Interval**: 2,592,000 seconds (30 days)
- **Min Uptime Required**: 95.0%
- **Auto-Distribution**: Enabled

**Per-Validator Allocation** (based on $80/month infrastructure + $40/month emergency):
- Base infrastructure cost: $80/month = ~4.36 REPAR (at $18.33/REPAR)
- Emergency buffer: $40/month = ~2.18 REPAR
- **Total per validator**: ~6.54 REPAR/month

This ensures **Day 1 self-sustainability** for validators.

#### 3. Justice Burn Mechanism
```json
"justice": {
  "params": {
    "total_debt": "131000000000000000000",
    "debt_paid": "0"
  }
}
```
- Tracks the $131 Trillion debt
- Burns tokens 1:1 as debt is paid
- Creates deflationary pressure

#### 4. Governance Parameters
- **Min Deposit**: 10,000 REPAR (10K REPAR)
- **Voting Period**: 48 hours (172,800 seconds)
- **Quorum**: 33.4%
- **Pass Threshold**: 50%
- **Veto Threshold**: 33.4%

#### 5. Staking Parameters
- **Unbonding Time**: 21 days (1,814,400 seconds)
- **Max Validators**: 100
- **Min Commission**: 5%
- **Bond Denomination**: urepar

#### 6. DEX Configuration
- **Pool Creation Fee**: 100 REPAR
- **Supported Pool Type**: Standard AMM (Constant Product)
- **Min Pool Liquidity**: 1,000,000 REPAR

## Pre-Launch Checklist

### 1. Server Setup (DigitalOcean)
- [ ] Droplet created (16GB RAM / 8 vCPUs / 320GB SSD / $80/month)
- [ ] IP Address recorded: `_________________`
- [ ] SSH access configured
- [ ] Firewall rules set:
  - Port 22 (SSH)
  - Port 26656 (P2P)
  - Port 26657 (RPC)
  - Port 1317 (REST API)
  - Port 9090 (gRPC)

### 2. Dependencies Installed
- [ ] Go 1.21.3+ installed
- [ ] Build tools (make, gcc, git, etc.)
- [ ] Aequitas binary compiled (`aequitasd`)

### 3. DNS Configuration (Cloudflare)
- [ ] Root domain CNAME: `aequitasprotocol.zone` → `creodamo.github.io`
- [ ] WWW CNAME: `www.aequitasprotocol.zone`
- [ ] App CNAME: `app.aequitasprotocol.zone`
- [ ] REPAR CNAME: `repar.aequitasprotocol.zone`
- [ ] RPC A Record: `rpc.aequitasprotocol.zone` → `[DROPLET_IP]`
- [ ] API A Record: `api.aequitasprotocol.zone` → `[DROPLET_IP]`
- [ ] gRPC A Record: `grpc.aequitasprotocol.zone` → `[DROPLET_IP]`

### 4. GitHub Pages
- [ ] Custom domain set to `aequitasprotocol.zone`
- [ ] HTTPS enforced
- [ ] Site deploying correctly

## Launch Procedure

### Step 1: Initialize Node

```bash
# Set chain ID
export CHAIN_ID=aequitas-1

# Initialize node
aequitasd init aequitas-validator-1 --chain-id $CHAIN_ID

# This creates ~/.aequitasd/config/ directory
```

### Step 2: Copy Genesis File

```bash
# Copy the prepared genesis file
cp genesis-template.json ~/.aequitasd/config/genesis.json

# Verify genesis file
aequitasd validate-genesis
```

### Step 3: Create Validator Key

```bash
# Create validator operator key
aequitasd keys add validator --keyring-backend file

# IMPORTANT: Save the mnemonic phrase securely!
# This is your ONLY way to recover the key
```

### Step 4: Create Genesis Transaction

```bash
# Create gentx (genesis transaction) for your validator
aequitasd gentx validator 1000000000000urepar \
  --chain-id $CHAIN_ID \
  --moniker="aequitas-validator-1" \
  --website="https://aequitasprotocol.zone" \
  --details="Primary validator for Aequitas Zone" \
  --commission-rate="0.05" \
  --commission-max-rate="0.10" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000000000" \
  --keyring-backend file

# Collect genesis transactions
aequitasd collect-gentxs
```

### Step 5: Configure Node Settings

Edit `~/.aequitasd/config/config.toml`:

```toml
# Enable RPC
[rpc]
laddr = "tcp://0.0.0.0:26657"
cors_allowed_origins = ["*"]

# Configure P2P
[p2p]
laddr = "tcp://0.0.0.0:26656"
external_address = "[YOUR_DROPLET_IP]:26656"

# Enable prometheus metrics
prometheus = true
```

Edit `~/.aequitasd/config/app.toml`:

```toml
# Enable API
[api]
enable = true
address = "tcp://0.0.0.0:1317"
enabled-unsafe-cors = true

# Enable gRPC
[grpc]
enable = true
address = "0.0.0.0:9090"

# Minimum gas prices
minimum-gas-prices = "0.001urepar"
```

### Step 6: Create Systemd Service

Create `/etc/systemd/system/aequitasd.service`:

```ini
[Unit]
Description=Aequitas Zone Daemon
After=network-online.target

[Service]
User=root
ExecStart=/root/go/bin/aequitasd start
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```

### Step 7: Start the Chain

```bash
# Reload systemd
systemctl daemon-reload

# Enable service
systemctl enable aequitasd

# Start the blockchain
systemctl start aequitasd

# Check status
systemctl status aequitasd

# View logs
journalctl -u aequitasd -f
```

### Step 8: Verify Launch

```bash
# Check node status
aequitasd status

# Check validator status
aequitasd query staking validator $(aequitasd keys show validator --bech val -a --keyring-backend file)

# Check balance
aequitasd query bank balances repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun

# Check validator subsidy pool
aequitasd query validatorsubsidy pool
```

### Step 9: Register for Validator Subsidy

```bash
# Register your validator for monthly subsidies
aequitasd tx validatorsubsidy register-validator \
  [VALIDATOR_ADDRESS] \
  "80.00" \
  "40.00" \
  --from validator \
  --chain-id $CHAIN_ID \
  --keyring-backend file \
  --fees 1000urepar
```

## Post-Launch Monitoring

### Health Checks
- Node syncing: `curl http://localhost:26657/status`
- Validator active: `aequitasd query staking validators`
- Block production: Watch for increasing block height
- Subsidy distribution: Check every 30 days

### Important Endpoints
- RPC: `https://rpc.aequitasprotocol.zone`
- REST API: `https://api.aequitasprotocol.zone`
- gRPC: `grpc.aequitasprotocol.zone:9090`
- Frontend: `https://aequitasprotocol.zone`

### Monthly Validator Operations

#### 1. Subsidy Distribution (Automatic)
Every 30 days, the protocol automatically distributes:
- 6.54 REPAR to each active validator
- Requires 95% uptime to qualify

#### 2. Emergency Fund Claims (Manual)
If unexpected costs arise:
```bash
aequitasd tx validatorsubsidy claim-emergency-funds \
  [AMOUNT] \
  "Reason for emergency claim" \
  --from validator \
  --chain-id $CHAIN_ID
```

#### 3. Monitor Subsidy Status
```bash
# Check your validator's subsidy status
aequitasd query validatorsubsidy validator [VALIDATOR_ADDRESS]

# Check payment history
aequitasd query validatorsubsidy payments [VALIDATOR_ADDRESS]

# Check pool status
aequitasd query validatorsubsidy pool
```

## Troubleshooting

### Node Won't Start
1. Check logs: `journalctl -u aequitasd -n 100`
2. Verify genesis: `aequitasd validate-genesis`
3. Check ports: `netstat -tulpn | grep aequitasd`

### Validator Not Active
1. Check bonded status: `aequitasd query staking validator [VAL_ADDR]`
2. Verify sufficient stake
3. Check missed blocks: `aequitasd query slashing signing-info [VAL_CONS_ADDR]`

### Subsidy Not Received
1. Check validator status: Must be `ACTIVE`
2. Verify uptime: Must be >95%
3. Check distribution schedule: `aequitasd query validatorsubsidy schedule`

## Security Best Practices

1. **Never share your mnemonic phrase**
2. **Enable firewall** (ufw configured in setup)
3. **Regular backups** of `~/.aequitasd/config/` and `~/.aequitasd/data/`
4. **Monitor validator uptime** to maintain subsidy eligibility
5. **Use strong passwords** for server access
6. **Enable 2FA** on DigitalOcean and Cloudflare accounts

## Emergency Contacts

- **Technical Issues**: Review logs and blockchain status
- **Subsidy Problems**: Check validator eligibility requirements
- **Network Issues**: Verify DNS and firewall configuration

## Success Criteria

✅ Node is syncing blocks  
✅ Validator is in active set  
✅ Endpoints are accessible  
✅ Subsidy registration confirmed  
✅ Frontend displays correctly  
✅ Wallet connections work  

---

**The Aequitas Zone blockchain is now live!** 🚀

*"Justice delayed is justice denied, but mathematics is eternal."*
