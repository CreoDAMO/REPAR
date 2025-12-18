# Bare-Metal ACE Deployment - Real-World Guide

**Problem:** SSH port 22 is not accessible from Replit to your bare-metal server.

## Solution: Two-Stage Deployment

### Stage 1: Create Proxmox API Token (From Replit)

Use the HTTP API instead of SSH:

```bash
bash /home/runner/workspace/scripts/deploy-ace-proxmox-api.sh
```

This will:
- ✅ Authenticate to Proxmox via HTTPS API
- ✅ Create `apex-automation` API token
- ✅ Save token credentials for GitHub secrets

### Stage 2: Deploy ACE Binary (On Your Bare-Metal Server)

Since SSH isn't available from Replit, you need to access your bare-metal server directly:

**Option A: SSH from your local machine** (recommended)
```bash
ssh root@135.232.208.145
cd /opt/aequitas
git clone https://github.com/CreoDAMO/REPAR.git
cd REPAR/ace
export DEPLOYMENT_TYPE=bare-metal
export BLOCKCHAIN_RPC=http://135.232.208.145:26657
export CHAIN_ID=aequitas-1
bash scripts/deploy-production.sh
```

**Option B: Proxmox Web Console**
- Open https://135.232.208.145:8006
- Go to Console tab
- Run the same commands

**Option C: Remote Desktop / VNC / Physical Access**
- Whatever method you use to manage the server

**Option D: Proxmox SSH Shell (from web UI)**
- https://135.232.208.145:8006 → Utilities → Console
- Run commands there

## What Each Stage Does

### Stage 1 (Replit): Proxmox Token Creation
```
✅ Creates apex-automation token
✅ Saves credentials for ACE to use
✅ No server access needed (HTTPS API only)
```

### Stage 2 (Bare-Metal): ACE Deployment
```
✅ Builds ACE binary
✅ Starts AI sidecar
✅ Creates systemd service
✅ Launches ACE control plane on port 8080
```

## Verify Deployment Success

After Stage 2, test from anywhere:

```bash
# Check ACE health
curl http://135.232.208.145:8080/health

# Check metrics
curl http://135.232.208.145:9090/metrics

# Register first validator
curl -X POST http://135.232.208.145:8080/api/v1/register-node \
  -H 'Content-Type: application/json' \
  -d '{"node_id":"validator-001","hardware":{"cpu_cores":64,"gpu_count":8,"memory_gb":512,"storage_gb":2000},"network_mode":"internet"}'
```

## GitHub Secrets Setup

After Stage 1, add these to your GitHub repository secrets:

```
PROXMOX_HOST=135.232.208.145
PROXMOX_API_TOKEN_ID=root@pam!apex-automation
PROXMOX_API_TOKEN_SECRET=[from Stage 1 output]
BLOCKCHAIN_RPC=http://135.232.208.145:26657
CHAIN_ID=aequitas-1
```

## Infrastructure Architecture

```
Stage 1 (Replit Shell)
│
├─ Create Proxmox API Token (HTTPS API)
└─ Save credentials to GitHub secrets

Stage 2 (Bare-Metal Server - Direct Access)
│
├─ Clone REPAR repo
├─ Build ACE binary
├─ Start AI sidecar
├─ Launch ACE control plane (port 8080)
└─ Register with constellation network

Result:
135.232.208.145
├─ Proxmox (with apex-automation token)
├─ ACE Control Plane (http://135.232.208.145:8080)
├─ AI Sidecar (port 8001)
├─ Aequitas Blockchain (port 26657)
├─ IPFS (port 5001)
└─ Metrics (port 9090)
```

## Ready?

**Step 1: Create token from Replit**
```bash
bash /home/runner/workspace/scripts/deploy-ace-proxmox-api.sh
```

**Step 2: Deploy ACE on your bare-metal server**
Use SSH, console, or physical access to run the deployment script there.

---

**This is the real-world approach: Replit for API calls (HTTP), your server for binaries (where network access works).**

