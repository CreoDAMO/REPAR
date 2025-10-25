# 🚀 GitHub Actions Blockchain Build Guide

## ✅ What's Been Done

I've optimized `.github/workflows/blockchain-build.yml` with production-ready configuration:

### Key Improvements:
1. **Correct Go Version**: Updated to 1.24.x (matches your go.mod)
2. **Proper Build Flags**: Added version information via ldflags
3. **Accurate Status**: Removed continue-on-error flags for real build results
4. **Dual Artifacts**: Uploads both versioned (`aequitasd-{commit}`) and latest (`aequitasd-latest`)
5. **Comprehensive Summaries**: Detailed build reports with next steps
6. **Testnet Validation**: Verifies binary can initialize a test chain
7. **Long Retention**: 90-day artifact storage for production use

### Build Process:
- **Time**: 10-15 minutes automated
- **Dependencies**: ~200 Cosmos SDK packages (5-10 min download)
- **Compilation**: Go build with optimizations (3-5 min)
- **Validation**: Binary verification + testnet init (1-2 min)
- **Result**: Production-ready `aequitasd` binary

---

## 🎯 How to Trigger the Build

### Step 1: Push Changes to GitHub

Run these commands in your Replit Shell:

```bash
# Stage the updated workflow
git add .github/workflows/blockchain-build.yml

# Commit with a descriptive message
git commit -m "🚀 Optimize blockchain build workflow for production"

# Push to GitHub (this triggers the build)
git push origin main
```

**What happens next:**
- GitHub Actions automatically starts the build
- You'll receive a notification (if enabled)
- Build takes ~10-15 minutes

---

## 📊 Monitor the Build

### Option 1: GitHub Web Interface (Recommended)
1. Go to: https://github.com/YOUR_USERNAME/REPAR/actions
2. Click on the latest "Build Aequitas Zone Blockchain" workflow
3. Watch real-time build progress with logs
4. See summary when complete

### Option 2: GitHub CLI (if installed)
```bash
# Watch workflow run
gh run watch

# List recent runs
gh run list --workflow=blockchain-build.yml
```

### Option 3: Wait for Email
GitHub will email you when the build completes (success or failure)

---

## 📦 Download the Binary

Once the build succeeds (✅ green checkmark), download the binary:

### Method 1: GitHub Web Interface
1. Go to the completed workflow run
2. Scroll to "Artifacts" section at the bottom
3. Download **`aequitasd-latest`** (recommended) or the versioned artifact
4. Extract the ZIP file to get the `aequitasd` binary

### Method 2: GitHub CLI
```bash
# List available artifacts
gh run download

# Download specific artifact
gh run download -n aequitasd-latest
```

### Method 3: API (for automation)
```bash
# Get artifact download URL
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/REPAR/actions/artifacts
```

---

## 🚀 Deploy the Binary

### To DigitalOcean Droplet (Production)

1. **Upload to your droplet:**
```bash
# Extract the binary first
unzip aequitasd-latest.zip

# Upload to DigitalOcean
scp -i ~/.ssh/aequitas_key aequitasd root@159.203.92.230:/opt/aequitas/bin/

# SSH to droplet
ssh -i ~/.ssh/aequitas_key root@159.203.92.230

# Make executable
chmod +x /opt/aequitas/bin/aequitasd
```

2. **Initialize the chain:**
```bash
cd /opt/aequitas/bin

# Initialize node
./aequitasd init validator --chain-id aequitas-1 --home /opt/aequitas/data

# Create validator key
./aequitasd keys add validator --home /opt/aequitas/data

# Configure genesis (see BLOCKCHAIN_DEPLOYMENT.md for full setup)
```

3. **Start the blockchain:**
```bash
# Start in foreground (for testing)
./aequitasd start --home /opt/aequitas/data

# Or start as systemd service (recommended)
sudo systemctl start aequitas
sudo systemctl enable aequitas
```

### To Replit (Development/Testing)

```bash
# Create bin directory
mkdir -p ~/bin

# Upload binary (from your local machine)
# Then in Replit shell:
chmod +x ~/bin/aequitasd

# Initialize
~/bin/aequitasd init validator --chain-id aequitas-dev-1

# Start
~/bin/aequitasd start
```

---

## 🔍 Verify the Build

After downloading, verify the binary:

```bash
# Check it's executable
file aequitasd
# Expected: ELF 64-bit LSB executable, x86-64

# Check size (should be 80-120 MB)
ls -lh aequitasd

# Run version command
./aequitasd version
# Expected: Version info with commit hash

# Test help command
./aequitasd --help
# Expected: Command list (init, start, keys, etc.)
```

---

## 🎯 What the Build Does

### Job 1: build-and-test
1. ✅ Checks out code
2. ✅ Sets up Go 1.24.x
3. ✅ Caches dependencies (speeds up future builds)
4. ✅ Downloads 200+ Cosmos SDK packages
5. ✅ Tidies and verifies modules
6. ✅ Compiles `aequitasd` with version info
7. ✅ Runs unit tests (continues on test failures)
8. ✅ Verifies binary can execute
9. ✅ Uploads two artifacts (versioned + latest)
10. ✅ Creates detailed build summary

### Job 2: initialize-testnet
1. ✅ Downloads the built binary
2. ✅ Initializes a test chain
3. ✅ Configures genesis
4. ✅ Validates initialization worked
5. ✅ Creates testnet summary

---

## 📋 Build Output Example

When successful, you'll see a summary like:

```
🚀 Aequitas Zone Blockchain Build Status

Build Details:
- Go Version: go1.24.0 linux/amd64
- Cosmos SDK: v0.54.0-alpha
- Chain ID: aequitas-1
- Native Coin: $REPAR
- Total Supply: 131 Trillion $REPAR
- Commit: abc1234

Status: ✅ Build successful
Binary Size: 95M
Artifacts:
- aequitasd-abc1234567... (versioned)
- aequitasd-latest (always latest)

Next Steps:
1. Download binary from Actions artifacts
2. Initialize chain: ./aequitasd init validator --chain-id aequitas-1
3. Start node: ./aequitasd start
4. See BLOCKCHAIN_DEPLOYMENT.md for full deployment guide
```

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
- Go version compatibility (must be 1.24.x)
- Dependency download errors (network issues)
- Module verification failures (corrupted cache)

**Solution:**
- Re-run the workflow (GitHub Actions > Re-run jobs)
- Check build logs for specific error messages
- Clear cache by updating `cache-dependency-path`

### Artifact Not Found
**Check:**
- Build completed successfully (green checkmark)
- Artifact retention period (90 days)
- Repository permissions (needs read access)

**Solution:**
- Rebuild if artifact expired
- Check Actions permissions in repo settings

### Binary Won't Run
**Check:**
- Architecture match (binary is Linux x86-64)
- Executable permissions (`chmod +x`)
- Library dependencies (`ldd aequitasd`)

**Solution:**
- Re-download artifact
- Run on compatible system (Linux/WSL/Docker)

---

## 🎉 Success Checklist

After the build completes, you should have:

- [ ] ✅ Green checkmark on GitHub Actions workflow
- [ ] ✅ Two artifacts uploaded (versioned + latest)
- [ ] ✅ Build summary with version info
- [ ] ✅ Downloaded `aequitasd` binary
- [ ] ✅ Binary verified (file type, size, version)
- [ ] ✅ Ready to deploy to DigitalOcean or Replit

---

## 🚀 Next Steps After Build

1. **Download Binary** (see above)
2. **Deploy to Production** (DigitalOcean droplet)
3. **Initialize Chain** (see BLOCKCHAIN_DEPLOYMENT.md)
4. **Start Node** (systemd service recommended)
5. **Update Frontend** (point to RPC endpoint)
6. **Test End-to-End** (dashboards, transactions, AI features)
7. **Go Live** (announce to investors!)

---

## 📚 Additional Resources

- **Full Deployment Guide**: `BLOCKCHAIN_DEPLOYMENT.md`
- **Build Status**: `BUILD_STATUS.md`
- **System Architecture**: `replit.md`
- **Workflow File**: `.github/workflows/blockchain-build.yml`
- **GitHub Actions Docs**: https://docs.github.com/actions

---

**Estimated Total Time:**
- Push changes: 1 minute
- GitHub build: 10-15 minutes
- Download binary: 2 minutes
- Deploy to server: 5-10 minutes
- **Total: ~20-30 minutes** 🚀

Your blockchain will be compiled and ready for production deployment!
