# ⚡ Quick Start: Build Blockchain with GitHub Actions

## 🎯 ONE Command to Start the Build

```bash
git add .github/workflows/blockchain-build.yml && \
git commit -m "🚀 Optimize blockchain build workflow" && \
git push origin main
```

That's it! GitHub Actions will now compile your blockchain.

---

## ⏱️ What Happens Next

1. **GitHub Actions Starts** (30 seconds)
   - Workflow triggers automatically on push
   - Sets up Ubuntu runner with Go 1.24.x

2. **Dependencies Download** (5-10 minutes)
   - Downloads 200+ Cosmos SDK packages
   - Caches for faster future builds

3. **Compilation** (3-5 minutes)
   - Builds `aequitasd` binary
   - Adds version information
   - Validates binary works

4. **Testnet Validation** (1-2 minutes)
   - Initializes test chain
   - Verifies configuration
   - Uploads artifacts

**Total Time: ~10-15 minutes** ⏱️

---

## 📊 Monitor Progress

**GitHub Web** (easiest):
https://github.com/YOUR_USERNAME/REPAR/actions

**Watch for:**
- ✅ Green checkmark = Success!
- ❌ Red X = Check logs
- 🟡 Yellow dot = Running...

---

## 📦 Download Binary (After Success)

1. Go to completed workflow run
2. Scroll to "Artifacts" section
3. Download **`aequitasd-latest.zip`**
4. Extract to get `aequitasd` binary

---

## 🚀 Deploy to Production

**Upload to DigitalOcean:**
```bash
scp -i ~/.ssh/aequitas_key aequitasd root@159.203.92.230:/opt/aequitas/bin/
```

**Initialize & Start:**
```bash
ssh -i ~/.ssh/aequitas_key root@159.203.92.230
cd /opt/aequitas/bin
chmod +x aequitasd
./aequitasd init validator --chain-id aequitas-1
./aequitasd start
```

---

## 📚 Full Guide

See `GITHUB_ACTIONS_BUILD_GUIDE.md` for:
- Detailed troubleshooting
- Multiple deployment options
- Verification steps
- Next steps after deployment

---

## ✅ Current Status

- [x] GitHub Actions workflow optimized
- [ ] Push changes to trigger build ← **YOU ARE HERE**
- [ ] Monitor build progress (10-15 min)
- [ ] Download binary artifact
- [ ] Deploy to DigitalOcean
- [ ] Initialize blockchain
- [ ] Connect frontend to RPC

---

**Ready? Run the command above to start! 🚀**
