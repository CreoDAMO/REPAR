# ACE Bare-Metal Deployment Guide (Replit Shell)

**Your Infrastructure IP:** `135.232.208.145`

## Quick Start (Copy & Paste)

```bash
cd /home/runner/workspace
bash /tmp/deploy-ace-bare-metal.sh
```

## What This Does

1. **Generates SSH key** (non-interactive, Ed25519)
2. **Copies public key to Proxmox** (may prompt for password once)
3. **Creates Proxmox API token** `apex-automation` via SSH
4. **Deploys ACE binary** on your bare-metal server
5. **Starts ACE control plane** at port 8080

## After Deployment

### Verify ACE is running:
```bash
curl http://135.232.208.145:8080/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Register first validator node:
```bash
curl -X POST http://135.232.208.145:8080/api/v1/register-node \
  -H 'Content-Type: application/json' \
  -d '{
    "node_id": "validator-001",
    "hardware": {
      "cpu_cores": 64,
      "gpu_count": 8,
      "memory_gb": 512,
      "storage_gb": 2000
    },
    "network_mode": "internet"
  }'
```

### View ACE logs:
```bash
ssh -i /tmp/apex_deploy_key root@135.232.208.145 'tail -f ace-kernel.log'
```

### Check metrics:
```
http://135.232.208.145:9090/metrics
```

## Architecture Deployed

```
Replit Shell (Your Session)
       ↓
  /tmp/deploy-ace-bare-metal.sh
       ↓
135.232.208.145 (Your Bare-Metal Server)
  ├─ Proxmox (Hypervisor with API token)
  ├─ ACE Control Plane (port 8080)
  ├─ AI Sidecar (port 8001)
  ├─ Aequitas Blockchain (port 26657)
  ├─ IPFS Storage (port 5001)
  └─ Metrics (port 9090)
```

## Next Steps

1. **Add Proxmox credentials to GitHub secrets:**
   ```
   PROXMOX_HOST = 135.232.208.145
   PROXMOX_API_TOKEN_ID = apex-automation
   PROXMOX_API_TOKEN_SECRET = [from deployment output]
   ```

2. **Deploy 7-node constellation:**
   ACE orchestrates VM creation and validator node deployment

3. **Enable APEX autonomous system:**
   Constitutional AI enforcement layer activates

4. **ADNS sovereign DNS:**
   Routes all *.aequitasprotocol.zone to 135.232.208.145

## SSH Key Location

Generated key saved at: `/tmp/apex_deploy_key`

Use it for future SSH commands:
```bash
ssh -i /tmp/apex_deploy_key root@135.232.208.145
```

## Troubleshooting

**SSH key copy fails (permission denied):**
- Manually add public key to `~/.ssh/authorized_keys` on Proxmox:
  ```bash
  ssh root@135.232.208.145 'echo "$(cat /tmp/apex_deploy_key.pub)" >> ~/.ssh/authorized_keys'
  ```

**ACE build times out:**
- Run on Proxmox directly instead (less git locking issues):
  ```bash
  ssh -i /tmp/apex_deploy_key root@135.232.208.145 'cd REPAR/ace && DEPLOYMENT_TYPE=bare-metal bash scripts/deploy-production.sh'
  ```

**Port 8080 unreachable:**
- Check firewall on Proxmox
- Verify ACE is running: `ssh -i /tmp/apex_deploy_key root@135.232.208.145 'ps aux | grep ace-kernel'`

---

**Ready to deploy? Run:**
```bash
bash /tmp/deploy-ace-bare-metal.sh
```

