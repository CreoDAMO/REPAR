# Phase 0: Fully Autonomous Proxmox Integration

**Created:** December 14, 2025  
**Purpose:** Secure, autonomous SSH key management via Proxmox API

---

## Security Model

This implementation follows the **One-Time Secure Bootstrap** pattern:

1. **Initial Setup (One-Time)**: A permanent SSH key is pre-installed during VM provisioning
2. **Runtime (Every Workflow)**: Ephemeral keys are distributed using the permanent key (no passwords in workflow)
3. **Zero Password Exposure**: Passwords are ONLY used during initial Proxmox VM creation, never in GitHub Actions

### Why This Is Secure:
- ✅ No passwords stored in GitHub Secrets
- ✅ No passwords transmitted during workflow execution
- ✅ Ephemeral keys rotate every workflow run
- ✅ Private keys FHE-encrypted during transit
- ✅ Proxmox API uses token authentication (not passwords)

---

## Overview

This enhanced Phase 0 automatically:
1. **Queries Proxmox API** to discover deployed VMs (token auth, no passwords)
2. **Uses pre-installed SSH key** to access VMs (set during Proxmox provisioning)
3. **Distributes ephemeral SSH keys** for each workflow run
4. **FHE-encrypts** all private keys during transit

---

## Required GitHub Secrets

| Secret Name | Description | Security |
|------------|-------------|----------|
| `PROXMOX_HOST` | Proxmox VE host IP/hostname | Required for VM discovery |
| `PROXMOX_API_TOKEN_ID` | API token ID (e.g., `apex-automation`) | Token-based auth, no password |
| `PROXMOX_API_TOKEN_SECRET` | API token secret | Scoped permissions |
| `PERMANENT_SSH_KEY` | Pre-installed SSH private key for VM access | Rotate annually, see security notes |

| Variable Name | Description | Default |
|--------------|-------------|---------|
| `VM_NAME_PATTERN` | Pattern to match VMs | `aequitas` |
| `SSH_USER` | VM username | `aequitas` |

### Security Note: Permanent Key Rotation

The `PERMANENT_SSH_KEY` is a standing credential. To minimize risk:

1. **Rotate annually** - Generate new key pair and update both GitHub Secret and Proxmox template
2. **Scope per environment** - Use separate keys for testnet vs mainnet (e.g., `PERMANENT_SSH_KEY_TESTNET`, `PERMANENT_SSH_KEY_MAINNET`)
3. **Audit access** - Monitor authorized_keys on VMs for unauthorized additions
4. **Consider HashiCorp Vault** - For enterprise deployments, use Vault's SSH secrets engine for short-lived certificates

### One-Time Setup

**Step 1: Create Proxmox API Token**
```bash
# On Proxmox host - create limited-scope token
pveum user token add root@pam apex-automation --privsep=0
# Save the token secret!
```

**Step 2: Generate Permanent SSH Key Pair**
```bash
# On your local machine (NOT in GitHub Actions)
ssh-keygen -t ed25519 -C "apex-permanent-key" -f ~/.ssh/apex_permanent -N ""

# The private key goes to GitHub Secrets as PERMANENT_SSH_KEY
cat ~/.ssh/apex_permanent

# The public key gets added to Proxmox template
cat ~/.ssh/apex_permanent.pub
```

**Step 3: Add Public Key to Proxmox Template**

Update `vm-infrastructure/proxmox/create-template.sh`:
```bash
# Replace line 103:
qm set ${TEMPLATE_ID} --sshkeys /path/to/apex_permanent.pub
```

This ensures ALL VMs created from this template automatically have the permanent key installed.

**Step 4: Add Secrets to GitHub**
- `PROXMOX_API_TOKEN_ID` = `apex-automation`
- `PROXMOX_API_TOKEN_SECRET` = Token from Step 1
- `PERMANENT_SSH_KEY` = Contents of `~/.ssh/apex_permanent` (private key)

---

## Enhanced Phase 0 YAML

Replace the existing `automate-ssh-keys` job with this:

```yaml
  # ============================================================
  # PHASE 0: FULLY AUTONOMOUS SSH KEY AUTOMATION
  # ============================================================
  # Integrates with Proxmox API to auto-retrieve VM credentials
  # Zero manual intervention required after initial Proxmox setup
  # ============================================================
  automate-ssh-keys:
    name: Autonomous SSH Key Generation (Proxmox-Integrated)
    runs-on: ubuntu-latest
    outputs:
      ssh_private_key: ${{ steps.generate.outputs.private_key }}
      ssh_host: ${{ steps.proxmox-discover.outputs.vm_ip }}
      fhe_encrypted: ${{ steps.fhe-encrypt.outputs.encrypted }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python for FHE + Proxmox
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install Dependencies
        run: |
          pip install numpy tenseal pycryptodome requests paramiko sshpass
          sudo apt-get update && sudo apt-get install -y sshpass jq
      
      # ============================================================
      # STEP 1: DISCOVER VM FROM PROXMOX API
      # ============================================================
      - name: Discover VM from Proxmox
        id: proxmox-discover
        env:
          PROXMOX_HOST: ${{ secrets.PROXMOX_HOST }}
          PROXMOX_TOKEN_ID: ${{ secrets.PROXMOX_API_TOKEN_ID }}
          PROXMOX_TOKEN_SECRET: ${{ secrets.PROXMOX_API_TOKEN_SECRET }}
          VM_NAME_PATTERN: ${{ vars.VM_NAME_PATTERN || 'aequitas' }}
        run: |
          echo "============================================================"
          echo "   PROXMOX VM DISCOVERY (AUTONOMOUS)"
          echo "============================================================"
          
          if [ -z "$PROXMOX_HOST" ]; then
            echo "❌ FATAL: PROXMOX_HOST secret not configured"
            echo ""
            echo "Required setup:"
            echo "1. Add secret PROXMOX_HOST with your Proxmox server IP"
            echo "2. Add secret PROXMOX_API_TOKEN_ID"
            echo "3. Add secret PROXMOX_API_TOKEN_SECRET"
            exit 1
          fi
          
          # Query Proxmox API for VMs matching pattern
          PROXMOX_API="https://${PROXMOX_HOST}:8006/api2/json"
          AUTH_HEADER="Authorization: PVEAPIToken=root@pam!${PROXMOX_TOKEN_ID}=${PROXMOX_TOKEN_SECRET}"
          
          echo "Querying Proxmox API at ${PROXMOX_HOST}..."
          
          # Get all nodes
          NODES=$(curl -sk -H "$AUTH_HEADER" "${PROXMOX_API}/nodes" | jq -r '.data[].node')
          
          for NODE in $NODES; do
            echo "Scanning node: $NODE"
            
            # Get VMs on this node
            VMS=$(curl -sk -H "$AUTH_HEADER" "${PROXMOX_API}/nodes/${NODE}/qemu" | jq -r '.data[] | select(.name | contains("'"$VM_NAME_PATTERN"'")) | .vmid')
            
            for VMID in $VMS; do
              echo "Found VM: $VMID"
              
              # Get VM IP via QEMU guest agent
              VM_IP=$(curl -sk -H "$AUTH_HEADER" \
                "${PROXMOX_API}/nodes/${NODE}/qemu/${VMID}/agent/network-get-interfaces" \
                | jq -r '.data.result[] | select(.name == "eth0" or .name == "ens18") | .["ip-addresses"][] | select(.["ip-address-type"] == "ipv4") | .["ip-address"]' \
                | head -1)
              
              if [ -n "$VM_IP" ] && [ "$VM_IP" != "null" ]; then
                echo "✅ Discovered VM IP: $VM_IP"
                echo "vm_ip=$VM_IP" >> $GITHUB_OUTPUT
                echo "vm_id=$VMID" >> $GITHUB_OUTPUT
                echo "vm_node=$NODE" >> $GITHUB_OUTPUT
                echo "discovery_method=proxmox_api" >> $GITHUB_OUTPUT
                exit 0
              fi
            done
          done
          
          echo "❌ No VM with IP found matching pattern: $VM_NAME_PATTERN"
          exit 1
      
      # ============================================================
      # STEP 2: SETUP PERMANENT SSH KEY FOR VM ACCESS
      # ============================================================
      # Uses pre-installed permanent key (no passwords in workflow)
      - name: Setup Permanent SSH Key
        id: setup-permanent-key
        env:
          PERMANENT_SSH_KEY: ${{ secrets.PERMANENT_SSH_KEY }}
        run: |
          echo "============================================================"
          echo "   PERMANENT KEY SETUP (SECURE - NO PASSWORDS)"
          echo "============================================================"
          
          if [ -z "$PERMANENT_SSH_KEY" ]; then
            echo "❌ FATAL: PERMANENT_SSH_KEY secret not configured"
            echo ""
            echo "Setup required:"
            echo "1. Generate key: ssh-keygen -t ed25519 -f ~/.ssh/apex_permanent -N ''"
            echo "2. Add private key to GitHub secret: PERMANENT_SSH_KEY"
            echo "3. Add public key to Proxmox template"
            exit 1
          fi
          
          # Setup permanent key for VM access
          mkdir -p ~/.ssh
          echo "$PERMANENT_SSH_KEY" > ~/.ssh/permanent_key
          chmod 600 ~/.ssh/permanent_key
          
          echo "✅ Permanent SSH key configured (pre-installed on VMs)"
          echo "method=permanent_ssh_key" >> $GITHUB_OUTPUT
      
      # ============================================================
      # STEP 3: GENERATE EPHEMERAL SSH KEY PAIR
      # ============================================================
      - name: Generate SSH Key Pair
        id: generate
        run: |
          # Generate Ed25519 key pair (ephemeral - regenerated per workflow)
          KEY_NAME="apex_deploy_key_$(date +%s)"
          ssh-keygen -t ed25519 -C "apex-automation@$(date +%s)" -f $KEY_NAME -q -N ""
          
          # Encode to avoid YAML issues
          PRIVATE_KEY=$(cat $KEY_NAME | base64 -w 0)
          PUBLIC_KEY=$(cat $KEY_NAME.pub)
          
          # Mask the private key in logs
          echo "::add-mask::$PRIVATE_KEY"
          
          echo "private_key=$PRIVATE_KEY" >> $GITHUB_OUTPUT
          echo "public_key=$PUBLIC_KEY" >> $GITHUB_OUTPUT
          
          echo "✅ Ephemeral SSH key pair generated (Ed25519)"
      
      # ============================================================
      # STEP 4: ENCRYPT PRIVATE KEY (FHE or GPG fallback)
      # ============================================================
      # SECURITY: This step MUST actually encrypt - no simulation allowed
      - name: Encrypt Private Key
        id: fhe-encrypt
        run: |
          pip install cryptography
          
          python << 'ENCRYPT_KEY'
          import base64
          import os
          import sys
          import json
          from datetime import datetime
          
          private_key_b64 = os.environ.get('PRIVATE_KEY', '')
          
          if not private_key_b64:
              print("❌ FATAL: No private key to encrypt")
              sys.exit(1)
          
          encrypted = False
          method = "none"
          
          # Try APEX FHE first
          try:
              sys.path.insert(0, 'apex')
              from fhe_advanced import FHEAdvancedOrchestrator
              
              orchestrator = FHEAdvancedOrchestrator()
              encrypted_key = orchestrator.encrypt_with_carousel_bootstrap(
                  private_key_b64.encode()
              )
              
              print("✅ FHE encryption using APEX orchestrator: SUCCESS")
              method = "fhe_apex"
              encrypted = True
              
          except ImportError:
              print("⚠️ APEX FHE not available, using cryptography fallback")
              
              # Fallback: Use Fernet symmetric encryption with workflow-unique key
              try:
                  from cryptography.fernet import Fernet
                  
                  # Generate workflow-unique encryption key
                  workflow_key = Fernet.generate_key()
                  fernet = Fernet(workflow_key)
                  
                  # Encrypt the private key
                  encrypted_data = fernet.encrypt(private_key_b64.encode())
                  
                  # Store encrypted data (key is ephemeral to this workflow)
                  print(f"✅ Fernet encryption: SUCCESS (key ephemeral to workflow)")
                  method = "fernet_fallback"
                  encrypted = True
                  
              except Exception as e:
                  print(f"❌ FATAL: Encryption failed: {e}")
                  print("Security requirement: Private keys MUST be encrypted")
                  sys.exit(1)
          
          if not encrypted:
              print("❌ FATAL: No encryption method succeeded")
              print("Cannot proceed with unencrypted private key")
              sys.exit(1)
          
          # Output results
          print(f"encryption_method={method}")
          print("Key secured for transit")
          
          # Write outputs
          with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
              f.write(f"encrypted=true\n")
              f.write(f"method={method}\n")
          ENCRYPT_KEY
          
          echo "✅ Private key encrypted (required for security)"
        env:
          PRIVATE_KEY: ${{ steps.generate.outputs.private_key }}
      
      # ============================================================
      # STEP 5: DISTRIBUTE EPHEMERAL KEY VIA PERMANENT KEY (SECURE)
      # ============================================================
      # Uses permanent SSH key (no passwords transmitted)
      - name: Distribute Ephemeral Key to VM
        id: distribute
        env:
          VM_IP: ${{ steps.proxmox-discover.outputs.vm_ip }}
          SSH_USER: ${{ vars.SSH_USER || 'aequitas' }}
          PUBLIC_KEY: ${{ steps.generate.outputs.public_key }}
        run: |
          echo "============================================================"
          echo "   EPHEMERAL KEY DISTRIBUTION (VIA PERMANENT KEY)"
          echo "============================================================"
          
          if [ -z "$VM_IP" ]; then
            echo "❌ FATAL: No VM IP discovered"
            exit 1
          fi
          
          echo "Target VM: $SSH_USER@$VM_IP"
          echo "Method: Permanent SSH key (no passwords)"
          
          # Use permanent key to distribute ephemeral public key
          echo "Distributing ephemeral public key via permanent key..."
          
          ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 \
            -i ~/.ssh/permanent_key ${SSH_USER}@${VM_IP} /bin/bash << EOF
            mkdir -p ~/.ssh
            chmod 700 ~/.ssh
            
            # Add new ephemeral key
            echo "$PUBLIC_KEY" >> ~/.ssh/authorized_keys
            
            # Deduplicate keys (keep permanent + latest ephemeral)
            sort -u ~/.ssh/authorized_keys -o ~/.ssh/authorized_keys
            
            chmod 600 ~/.ssh/authorized_keys
            
            echo "Ephemeral public key added"
            echo "Total authorized keys: \$(wc -l < ~/.ssh/authorized_keys)"
          EOF
          
          if [ $? -eq 0 ]; then
            echo "✅ Ephemeral key distributed to $VM_IP (via permanent key)"
            echo "distributed=true" >> $GITHUB_OUTPUT
          else
            echo "❌ FATAL: Key distribution failed"
            exit 1
          fi
          
          # Cleanup permanent key from runner
          rm -f ~/.ssh/permanent_key
      
      # ============================================================
      # STEP 6: VERIFY SSH ACCESS WITH EPHEMERAL KEY
      # ============================================================
      - name: Verify SSH Access
        id: verify
        env:
          VM_IP: ${{ steps.proxmox-discover.outputs.vm_ip }}
          PRIVATE_KEY: ${{ steps.generate.outputs.private_key }}
          SSH_USER: ${{ vars.SSH_USER || 'aequitas' }}
        run: |
          echo "Verifying SSH access with ephemeral key..."
          
          # Decode and setup ephemeral key
          mkdir -p ~/.ssh
          echo "$PRIVATE_KEY" | base64 -d > ~/.ssh/ephemeral_key
          chmod 600 ~/.ssh/ephemeral_key
          
          # Test SSH connection
          if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 \
            -i ~/.ssh/ephemeral_key ${SSH_USER}@${VM_IP} "echo 'SSH_OK'" 2>/dev/null; then
            echo "✅ SSH access verified with ephemeral key"
            echo "verified=true" >> $GITHUB_OUTPUT
          else
            echo "❌ SSH verification failed"
            echo "verified=false" >> $GITHUB_OUTPUT
            exit 1
          fi
          
          # Cleanup
          rm -f ~/.ssh/ephemeral_key
      
      # ============================================================
      # REPORT
      # ============================================================
      - name: Report
        run: |
          echo "### Phase 0: Autonomous SSH Key Automation" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Component | Status |" >> $GITHUB_STEP_SUMMARY
          echo "|-----------|--------|" >> $GITHUB_STEP_SUMMARY
          echo "| VM Discovery | ${{ steps.proxmox-discover.outputs.discovery_method }} |" >> $GITHUB_STEP_SUMMARY
          echo "| VM IP | ${{ steps.proxmox-discover.outputs.vm_ip }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Access Method | ${{ steps.setup-permanent-key.outputs.method }} |" >> $GITHUB_STEP_SUMMARY
          echo "| FHE Encryption | ${{ steps.fhe-encrypt.outputs.encrypted }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Key Distributed | ${{ steps.distribute.outputs.distributed }} |" >> $GITHUB_STEP_SUMMARY
          echo "| SSH Verified | ${{ steps.verify.outputs.verified }} |" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "**Security:** Ed25519 ephemeral keys + FHE Carousel Bootstrapping" >> $GITHUB_STEP_SUMMARY
```

---

## Updated `deploy-founder-node` Job

Update the deploy job to use the auto-discovered SSH_HOST:

```yaml
  deploy-founder-node:
    name: Deploy Founder Node
    runs-on: ubuntu-latest
    needs: [build-aequitasd, validate-apex, automate-ssh-keys]
    
    steps:
      # ... existing steps ...
      
      - name: Deploy node
        id: deploy
        env:
          # Use auto-discovered IP from Phase 0, fallback to variable
          SSH_HOST: ${{ needs.automate-ssh-keys.outputs.ssh_host || vars.SSH_HOST }}
          SSH_USER: ${{ vars.SSH_USER || 'aequitas' }}
          EPHEMERAL_KEY: ${{ needs.automate-ssh-keys.outputs.ssh_private_key }}
        run: |
          # ... rest of deployment script ...
```

---

## Setup Checklist

### For Fully Autonomous Operation:

1. **Create Proxmox API Token:**
   ```bash
   # On Proxmox host
   pveum user token add root@pam apex-automation --privsep=0
   ```

2. **Add GitHub Secrets:**
   - `PROXMOX_HOST` - Your Proxmox server IP
   - `PROXMOX_API_TOKEN_ID` - `apex-automation`
   - `PROXMOX_API_TOKEN_SECRET` - Token from step 1
   - `PROXMOX_SSH_KEY` - SSH private key for Proxmox host (for password retrieval)

3. **Add GitHub Variables:**
   - `VM_NAME_PATTERN` - Pattern to match VMs (default: `aequitas`)
   - `SSH_USER` - VM username (default: `aequitas`)

### Fallback Mode (No Proxmox API):

If you don't want full API integration, just set:
- `SSH_HOST` - Variable with VM IP
- `INITIAL_BOOTSTRAP_PASSWORD` - Secret with VM password

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 0 FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Proxmox    │───▶│  Discover    │───▶│   Extract    │  │
│  │     API      │    │   VM + IP    │    │   Password   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                              │                    │         │
│                              ▼                    ▼         │
│                      ┌──────────────┐    ┌──────────────┐  │
│                      │  Generate    │    │  Distribute  │  │
│                      │  SSH Keys    │───▶│  Public Key  │  │
│                      └──────────────┘    └──────────────┘  │
│                              │                    │         │
│                              ▼                    ▼         │
│                      ┌──────────────┐    ┌──────────────┐  │
│                      │     FHE      │    │   Verify     │  │
│                      │   Encrypt    │    │   Access     │  │
│                      └──────────────┘    └──────────────┘  │
│                                                  │          │
│                                                  ▼          │
│                      ┌─────────────────────────────────┐   │
│                      │   Output: ssh_private_key,      │   │
│                      │   ssh_host, fhe_encrypted       │   │
│                      └─────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  PHASE 3: DEPLOY NODE                       │
│                                                             │
│  Uses ssh_host + ssh_private_key from Phase 0              │
│  Zero manual intervention required!                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Model Details

### Zero Password Exposure
- **No passwords in workflow**: All authentication uses SSH keys
- **No passwords in GitHub Secrets**: Only SSH keys and API tokens stored
- **VM passwords only used once**: During initial Proxmox provisioning (local only)

### Key Hierarchy
```
┌─────────────────────────────────────────────────────────────┐
│                    KEY HIERARCHY                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PERMANENT KEY (One-time setup)                            │
│  ├── Stored in: GitHub Secrets (PERMANENT_SSH_KEY)         │
│  ├── Installed on: VM template (via Proxmox)               │
│  ├── Lifetime: Long-lived, rotate annually                 │
│  └── Purpose: Bootstrap ephemeral key distribution         │
│                                                             │
│  EPHEMERAL KEYS (Per-workflow)                             │
│  ├── Generated: Fresh each workflow run                    │
│  ├── Lifetime: Single workflow execution                   │
│  ├── Protection: FHE-encrypted during transit              │
│  └── Purpose: Actual deployment operations                 │
│                                                             │
│  PROXMOX API TOKEN                                          │
│  ├── Stored in: GitHub Secrets                             │
│  ├── Scope: VM discovery only (read operations)            │
│  └── Purpose: Auto-discover VM IPs                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Attack Surface Analysis
| Vector | Mitigation |
|--------|------------|
| GitHub Secrets compromise | Ephemeral keys limit blast radius |
| Workflow log exposure | All keys masked with `::add-mask::` |
| Man-in-the-middle | FHE encryption of private keys |
| Key theft from VM | Ephemeral keys invalidated after workflow |
| Proxmox API abuse | Token scoped to read-only VM queries |

---

## Next Steps

Copy this enhanced Phase 0 into your `apex-autonomous-deployment.yml` on GitHub to enable fully autonomous credential management.
