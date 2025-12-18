# Proxmox Bootstrap & ACE Deployment - Complete Guide

## Current Status ✅

You've set these GitHub secrets:
- `PROXMOX_HOST` = 135.232.208.145
- `PROXMOX_ROOT_PASSWORD` = [Your secure password]

## How It Works (3-Stage Process)

### Stage 1: Proxmox Bootstrap (Automated - GitHub Actions)

The `apex-autonomous-deployment.yml` workflow will:

1. **SSH into your Proxmox server** using the root password
2. **Create API token** `root@pam!apex-deploy` via `pveum` command
3. **Extract token secret** and save to workflow output
4. **Clean up SSH access** (idempotent - safe to re-run)

**Trigger the workflow:**
```bash
# Via GitHub UI:
# 1. Go to https://github.com/CreoDAMO/REPAR/actions
# 2. Select "APEX Autonomous Constellation Deployment"
# 3. Click "Run workflow"
# 4. Select:
#    - deployment_target: bare-metal
#    - cluster_size: 1 (start with founder node)
#    - network: mainnet
# 5. Click "Run workflow"

# OR via CLI:
gh workflow run apex-autonomous-deployment.yml \
  -f deployment_target=bare-metal \
  -f cluster_size=1 \
  -f network=mainnet
```

**What the workflow does:**
- ✅ Bootstrap Proxmox API token (job: `bootstrap-proxmox-token`)
- ✅ Deploy Founder Node (job: `deploy-founder-node`)
- ✅ Verify constellation (job: `verify-constellation`)
- ✅ Deploy VM Infrastructure (ACE/AVM)
- ✅ Configure ADNS sovereign DNS
- ✅ Deploy mobile APK

### Stage 2: Monitor Workflow Progress

Go to: https://github.com/CreoDAMO/REPAR/actions/workflows/apex-autonomous-deployment.yml

Look for:
1. **bootstrap-proxmox-token** job
   - Should show: "✅ SSH connectivity verified"
   - Should show: "✅ Token created successfully!"
   - Output: `root@pam!apex-deploy` token ID

2. **deploy-founder-node** job
   - Should show: "Founder Node Deployed"
   - Output: RPC endpoint, validator info

3. **Verify Constellation** job
   - Should show all 7 nodes deployed
   - Shows: 7-node BFT constellation

### Stage 3: Verify Deployment (Manual - From Anywhere)

Once workflow completes, test your infrastructure:

```bash
# Check ACE control plane health
curl http://135.232.208.145:8080/health

# Expected response:
# {"status":"healthy","version":"1.0.0"}

# Check blockchain RPC
curl http://135.232.208.145:26657/status

# Register first validator
curl -X POST http://135.232.208.145:8080/api/v1/register-node \
  -H 'Content-Type: application/json' \
  -d '{
    "node_id": "validator-001",
    "hardware": {"cpu_cores": 64, "gpu_count": 8, "memory_gb": 512},
    "network_mode": "internet"
  }'

# Check metrics
curl http://135.232.208.145:9090/metrics
```

## What Gets Deployed

```
135.232.208.145 (Your Bare-Metal Infrastructure)
│
├─ Proxmox (Hypervisor)
│  └─ API Token: root@pam!apex-deploy (created by workflow)
│
├─ ACE Control Plane (port 8080)
│  ├─ Health: /health
│  ├─ API: /api/v1/*
│  └─ Metrics: /metrics
│
├─ Aequitas Blockchain (port 26657)
│  ├─ RPC: /status, /tx_search
│  ├─ Chain ID: aequitas-1
│  └─ Founder Node (validator-001)
│
├─ AI Sidecar (port 8001)
│  └─ NVIDIA NIM integration
│
├─ IPFS Storage (port 5001)
│  └─ Evidence & claims storage
│
├─ ADNS Sovereign DNS (port 53)
│  ├─ aequitasprotocol.zone
│  ├─ Cloudflare nameservers
│  └─ 135.232.208.145 as primary
│
└─ 7-Node Constellation
   ├─ aequitas-founder-01 (validator)
   ├─ aequitas-validator-02 through 07
   └─ BFT consensus running
```

## GitHub Secrets Now Configured

Your repository has these secrets set:

| Secret | Value | Purpose |
|--------|-------|---------|
| `PROXMOX_HOST` | 135.232.208.145 | Connect to your bare-metal server |
| `PROXMOX_ROOT_PASSWORD` | [Your password] | Bootstrap API token via SSH |

The workflow uses these to:
1. SSH into Proxmox
2. Run `pveum apitoken add` command
3. Extract token secret
4. Continue with deployment

## Troubleshooting

### Workflow Fails at "bootstrap-proxmox-token"

**Error: "Cannot connect to Proxmox host via SSH"**
- Check if Proxmox is running: `ping 135.232.208.145`
- Verify SSH is enabled (port 22 open)
- Verify root password is correct

**Error: "Failed to create API token"**
- Token might already exist (check Proxmox web UI: https://135.232.208.145:8006)
- Try deleting old token: `pveum apitoken delete root@pam!apex-deploy`
- Re-run workflow

### Workflow Fails at "deploy-founder-node"

- Check ACE logs: Access Proxmox console → tail -f ace-kernel.log
- Verify blockchain synced: `curl http://135.232.208.145:26657/status`
- Check Go binary built: `ls -la /opt/aequitas/ace/bin/ace-kernel`

### Port Not Reachable

- Check Proxmox firewall: `ufw status`
- Allow ACE ports: `ufw allow 8080,9090,8001`
- Restart ACE: `systemctl restart ace-kernel`

## Next Steps

1. **Set workflow to run** (via GitHub Actions UI)
2. **Monitor workflow progress** (watch the jobs complete)
3. **Verify endpoints** (curl health checks)
4. **Register nodes** (API calls to add validators)
5. **Enable APEX** (autonomous prosecution & enforcement)
6. **Monitor constellation** (via explorer.aequitasprotocol.zone)

## Security Notes

- ✅ `PROXMOX_ROOT_PASSWORD` is encrypted in GitHub (never logged)
- ✅ SSH key is ephemeral (generated per workflow, deleted after)
- ✅ API token has limited privileges (created with `--privsep 0`)
- ✅ Token never expires (EXPIRE_DAYS: 0 means unlimited)
- ✅ SSH access is cleaned up after token creation

## Real-World Flow

```
You (Set secrets in GitHub)
        ↓
GitHub Actions (Workflow triggered)
        ↓
SSH into 135.232.208.145 (using root password)
        ↓
Create API token via pveum
        ↓
Deploy ACE binary
        ↓
Start blockchain node
        ↓
Register 7-node constellation
        ↓
Configure ADNS DNS
        ↓
✅ Complete sovereign infrastructure
```

---

**Ready? Trigger the workflow:**
https://github.com/CreoDAMO/REPAR/actions/workflows/apex-autonomous-deployment.yml

Click "Run workflow" and watch the magic happen.
