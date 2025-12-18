# Proxmox Setup Guide: One-Time API Token Creation

**Purpose:** Create a permanent API token for APEX autonomous deployment. This is a one-time setup step performed locally in Replit shell.

**Time Required:** 2-3 minutes  
**Frequency:** Once (or when rotating tokens)

---

## Why This Step?

Every Proxmox automation system starts with a trust root. This guide establishes it securely:

1. You create an API token via Replit shell (one-time manual step)
2. You save the token to GitHub Secrets  
3. All future automation uses this token (zero additional manual steps)
4. Your Proxmox host has zero exposure to GitHub workflows

This is the standard pattern used by Terraform, Ansible, and all professional Proxmox automation tools.

---

## Prerequisites

- Your Proxmox server is installed and running
- You know the Proxmox host IP or hostname
- You have root credentials for Proxmox
- You have access to Replit shell

---

## Option A: Manual Setup via Replit Shell (Recommended)

### Step 1: SSH Into Your Proxmox Server

Open the Replit shell and run:

```bash
ssh root@YOUR_PROXMOX_IP
```

Replace `YOUR_PROXMOX_IP` with your actual Proxmox IP or hostname.

When prompted, enter your Proxmox root password.

### Step 2: Create the API Token

Once connected to Proxmox, run:

```bash
pveum apitoken add root@pam apex-automation --privsep 0 --expire 0
```

**What this does:**
- `root@pam` - Creates token for root user
- `apex-automation` - Names the token "apex-automation"
- `--privsep 0` - Disables privilege separation (full access)
- `--expire 0` - Token never expires

### Step 3: Save the Output

The command will display output like:

```
┌────────────────────────────┬──────────────────────────────────────┐
│ tokenid                    │ value                                │
╞════════════════════════════╪══════════════════════════════════════╡
│ root@pam!apex-automation   │ 12345678-1234-1234-1234-123456789abc │
└────────────────────────────┴──────────────────────────────────────┘
```

**⚠️ IMPORTANT:** Token secrets are shown only once. Copy these values now:

- **Token ID:** `root@pam!apex-automation`
- **Token Secret:** `12345678-1234-1234-1234-123456789abc` (the value in the second column)

### Step 4: Exit Proxmox

```bash
exit
```

### Step 5: Add Secrets to GitHub Repository

Go to your GitHub repository and add three secrets:

**Navigate to:** Settings → Secrets and variables → Actions → New repository secret

| Secret Name | Value |
|-------------|-------|
| `PROXMOX_HOST` | Your Proxmox IP/hostname (e.g., `192.168.1.100`) |
| `PROXMOX_API_TOKEN_ID` | `apex-automation` |
| `PROXMOX_API_TOKEN_SECRET` | The token secret from Step 3 |

**Example:**
```
PROXMOX_HOST = 192.168.1.100
PROXMOX_API_TOKEN_ID = apex-automation
PROXMOX_API_TOKEN_SECRET = 12345678-1234-1234-1234-123456789abc
```

---

## Option B: Automated Setup via Replit Agent

If you prefer, create a setup script and ask Replit Agent to execute it:

```bash
#!/bin/bash
# setup-proxmox-token.sh

read -p "Enter Proxmox IP: " PROXMOX_IP
read -sp "Enter root password: " ROOT_PASSWORD
echo

# SSH and create token
TOKEN_OUTPUT=$(sshpass -p "$ROOT_PASSWORD" ssh -o StrictHostKeyChecking=no root@$PROXMOX_IP \
  "pveum apitoken add root@pam apex-automation --privsep 0 --expire 0 --output-format json")

# Parse output
TOKEN_ID=$(echo "$TOKEN_OUTPUT" | jq -r '.tokenid')
TOKEN_SECRET=$(echo "$TOKEN_OUTPUT" | jq -r '.value')

echo ""
echo "✅ API Token Created Successfully"
echo ""
echo "Add these to GitHub Secrets:"
echo ""
echo "PROXMOX_HOST=$PROXMOX_IP"
echo "PROXMOX_API_TOKEN_ID=$TOKEN_ID"
echo "PROXMOX_API_TOKEN_SECRET=$TOKEN_SECRET"
```

---

## Verification: Test Your Token

To verify the token works, run from Replit shell:

```bash
PROXMOX_HOST="your_proxmox_ip"
TOKEN_ID="apex-automation"
TOKEN_SECRET="your_token_secret"

curl -sk -H "Authorization: PVEAPIToken=root@pam!${TOKEN_ID}=${TOKEN_SECRET}" \
  "https://${PROXMOX_HOST}:8006/api2/json/nodes"
```

If successful, you'll see your Proxmox nodes listed as JSON.

---

## Optional: Secure Your Proxmox Host

After verifying the token works, you can disable password-based SSH access to Proxmox:

```bash
ssh root@YOUR_PROXMOX_IP
sed -i 's/#PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
systemctl restart sshd
exit
```

This allows key-based access only (more secure).

---

## Troubleshooting

### "Connection refused" when trying to SSH
- Verify the Proxmox IP is correct
- Ensure Proxmox is running and SSH is enabled
- Check network connectivity from Replit to Proxmox

### "Permission denied (publickey,password)" 
- Ensure you're using the correct root password
- Some Proxmox installations may require different credentials

### "pveum: command not found"
- SSH is connecting to something other than Proxmox
- Verify the correct IP and credentials

### Token creation fails
- Ensure you have root privileges on Proxmox
- Check that the token name doesn't already exist

---

## Security Best Practices

1. **Token Rotation:** Rotate this token annually
   ```bash
   # List tokens
   ssh root@YOUR_PROXMOX_IP "pveum apitoken list"
   
   # Delete old token
   ssh root@YOUR_PROXMOX_IP "pveum apitoken remove root@pam!apex-automation"
   
   # Create new token (repeat setup above)
   ```

2. **Token Scope:** For production, consider restricting token privileges:
   ```bash
   pveum acl modify / --token root@pam!apex-automation --role PVEVMUser
   ```

3. **Audit:** Monitor token usage in Proxmox logs

---

## Next Steps

After completing this setup:

1. ✅ Token created and secrets added to GitHub
2. ✅ Run Phase 0B workflow to verify token connectivity
3. ✅ Run full deployment workflow

Your APEX constellation deployment is ready to go!
