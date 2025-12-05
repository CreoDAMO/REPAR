# DNS Migration: DigitalOcean to Sovereign ACE/AVM Infrastructure

**Created:** December 5, 2025  
**Status:** Action Required  
**Priority:** CRITICAL

---

## Problem Identified

All DNS records are pointing to **OLD DigitalOcean IP** instead of sovereign ACE/AVM infrastructure.

### Current DNS Configuration (INCORRECT)

```dns
aequitasprotocol.zone.              159.203.92.230   ← DigitalOcean (OLD)
aequitasprotocol.zone.              76.223.105.230   ← DigitalOcean (OLD)
api.aequitasprotocol.zone.          159.203.92.230   ← DigitalOcean (OLD)
explorer.aequitasprotocol.zone.     159.203.92.230   ← DigitalOcean (OLD)
rpc.aequitasprotocol.zone.          159.203.92.230   ← DigitalOcean (OLD)
www.aequitasprotocol.zone.          159.203.92.230   ← DigitalOcean (OLD)
testnet-rpc.aequitasprotocol.zone.  159.203.92.230   ← DigitalOcean (OLD)
```

### Required DNS Configuration (SOVEREIGN)

All records must point to your ACE/AVM sovereign infrastructure IP.

---

## Solution Options

### Option 1: Update via Primary Script (Recommended)

Use the sovereign DNS update script with auto-detection:

```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
export CLOUDFLARE_ZONE_ID="your-zone-id"
export INFRASTRUCTURE_TYPE="sovereign"

# Navigate to scripts
cd scripts

# Run with dry-run first to preview changes
./update-dns-ace-avm.sh --dry-run

# If preview looks correct, run for real
./update-dns-ace-avm.sh
```

The script will:
1. Auto-detect infrastructure IP from ACE API
2. Query vm-infrastructure CLI for node status
3. Update all DNS records
4. Update Keplr registry
5. Remove old DigitalOcean IPs

### Option 2: Manual IP Override

If you know your infrastructure IP:

```bash
export PRIMARY_IP="YOUR_SOVEREIGN_IP"
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ZONE_ID="your-zone-id"

cd scripts
./update-dns-ace-avm.sh
```

### Option 3: Cloudflare Dashboard (Manual)

1. Log into Cloudflare: https://dash.cloudflare.com
2. Select `aequitasprotocol.zone`
3. Go to **DNS → Records**
4. Update each A record:

| Record | Current IP | Change To | Proxy |
|--------|-----------|-----------|-------|
| @ (root) | 159.203.92.230 | YOUR_NEW_IP | Proxied |
| @ (root) | 76.223.105.230 | DELETE | - |
| api | 159.203.92.230 | YOUR_NEW_IP | Proxied |
| explorer | 159.203.92.230 | YOUR_NEW_IP | Proxied |
| rpc | 159.203.92.230 | YOUR_NEW_IP | Proxied |
| www | 159.203.92.230 | YOUR_NEW_IP | Proxied |
| testnet-rpc | 159.203.92.230 | YOUR_NEW_IP | Proxied |

5. Add missing records:

| Record | Type | Content | Proxy |
|--------|------|---------|-------|
| app | A | YOUR_NEW_IP | Proxied |
| grpc | A | YOUR_NEW_IP | DNS Only |
| ace | A | YOUR_NEW_IP | Proxied |
| ace-metrics | A | YOUR_NEW_IP | Proxied |
| vm | A | YOUR_NEW_IP | Proxied |

---

## Getting Your Infrastructure IP

### If ACE is Running

```bash
# Query ACE API
curl http://localhost:8080/api/v1/nodes

# Or check vm-infrastructure status
cd vm-infrastructure/scripts
./bootstrap-with-genesis.sh --status
```

### If Deployed on VPS/Server

```bash
# SSH into your server and run:
curl ifconfig.me
```

### If Running Locally

```bash
# Get public IP
curl ifconfig.me
```

---

## GitHub Workflow Integration

The `apex-autonomous-deployment.yml` workflow can auto-update DNS. Configure these in GitHub:

### Secrets (Settings > Secrets and variables > Actions > Secrets)

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with DNS:Edit permission |

### Variables (Settings > Secrets and variables > Actions > Variables)

| Variable | Description |
|----------|-------------|
| `CLOUDFLARE_ZONE_ID` | Zone ID for aequitasprotocol.zone (not sensitive) |
| `INFRASTRUCTURE_IP` | Your sovereign infrastructure IP (not sensitive) |

> **Note:** IP addresses and Zone IDs are NOT secrets - they're configuration values. Store them as Variables (not Secrets) so they appear in logs for easier debugging. The workflow also accepts `infrastructure_ip` as a workflow input for one-time overrides.

The workflow's `configure-dns` job will automatically update DNS on deployment.

---

## Verification

After updating DNS, verify with:

```bash
# Check DNS resolution
dig +short rpc.aequitasprotocol.zone
dig +short api.aequitasprotocol.zone
dig +short explorer.aequitasprotocol.zone

# Test endpoints
curl https://rpc.aequitasprotocol.zone/status
curl https://api.aequitasprotocol.zone/cosmos/base/tendermint/v1beta1/node_info
```

---

## DNS Records Reference

### Core Infrastructure

| Subdomain | Purpose | Port | Proxy |
|-----------|---------|------|-------|
| @ (root) | Main website | 443 | Proxied |
| www | Website redirect | 443 | Proxied |
| app | Frontend application | 443 | Proxied |

### Blockchain Endpoints

| Subdomain | Purpose | Port | Proxy |
|-----------|---------|------|-------|
| rpc | Tendermint RPC | 26657 | Proxied |
| api | Cosmos REST API | 1317 | Proxied |
| grpc | gRPC endpoint | 9090 | DNS Only |
| explorer | Block explorer | 443 | Proxied |

### ACE/AVM Sovereign Infrastructure

| Subdomain | Purpose | Port | Proxy |
|-----------|---------|------|-------|
| ace | ACE Cloud Engine | 8080 | Proxied |
| ace-metrics | ACE Metrics | 9100 | Proxied |
| ace-ai | ACE AI Interface | 8081 | Proxied |
| vm | Virtual Machine API | 8082 | Proxied |
| sovereign | Sovereign status | 443 | Proxied |

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `scripts/update-dns-ace-avm.sh` | **PRIMARY** - ACE/AVM DNS with auto-detection |
| `scripts/setup-cloudflare-dns-sovereign.sh` | Sovereign infrastructure setup |
| `scripts/setup-cloudflare-dns-correct.sh` | Corrected DNS configuration |

---

## Current Deployment Status

From APEX Autonomous Constellation Deployment #9:

- Build Binary: SUCCESS
- Validate APEX: SUCCESS
- Founder Node: SUCCESS
- Constellation: SUCCESS (7 nodes)
- Verification: SUCCESS
- DNS Config: SUCCESS (needs IP update)
- Keplr Registry: SUCCESS

**The deployment is complete. Only DNS IP update is required.**

---

## Timeline

- **Start:** October 11, 2025
- **Deploy:** December 3, 2025
- **Duration:** 53 Days
- **Status:** Built a sovereign digital nation in 53 days

---

## Contact

For DNS issues, ensure you have:
1. Cloudflare account access
2. API token with DNS:Edit permissions
3. Zone ID for aequitasprotocol.zone
4. Your sovereign infrastructure IP address
