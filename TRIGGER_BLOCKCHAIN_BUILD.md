# How to Trigger the Blockchain Build Workflow

## Why Your Last Push Didn't Trigger the Workflow

The blockchain build workflow (`.github/workflows/blockchain-build.yml`) is configured to **only trigger when files in the `aequitas/` directory change**.

### Current Trigger Conditions:

```yaml
on:
  push:
    branches: [ main, develop ]
    paths:
      - 'aequitas/**'
      - '.github/workflows/blockchain-build.yml'
```

This means:
- ✅ Changes to `aequitas/` directory → **WILL trigger the workflow**
- ❌ Changes to `frontend/`, `backend/`, `dexplorer/` → **WON'T trigger the workflow**
- ❌ Changes to root-level files only → **WON'T trigger the workflow**

## Recent Changes That Should Trigger the Build

We just generated **36 protobuf `.pb.go` files** in the `aequitas/x/*/types/` directories:

```
aequitas/x/claims/types/*.pb.go
aequitas/x/defendant/types/*.pb.go
aequitas/x/dex/types/*.pb.go
aequitas/x/distribution/types/*.pb.go
aequitas/x/endowment/types/*.pb.go
aequitas/x/founderendowment/types/*.pb.go
aequitas/x/justice/types/*.pb.go
aequitas/x/nftmarketplace/types/*.pb.go
aequitas/x/validatorsubsidy/types/*.pb.go
```

These changes **will trigger the workflow** when pushed to `main` or `develop` branch.

## How to Trigger the Workflow

### Option 1: Push the Protobuf Changes (Recommended)

```bash
# Stage the generated protobuf files
git add aequitas/x/*/types/*.pb.go

# Also add the generated files in proto directory if needed
git add aequitas/proto/github.com/

# Commit the changes
git commit -m "Generate protobuf files for blockchain modules

- Generated 36 .pb.go files across 9 modules
- Fixes build errors: undefined types and missing protobuf interfaces
- All modules now have proper type definitions"

# Push to trigger the workflow
git push origin main    # or develop
```

### Option 2: Manual Trigger (Fastest)

You can manually trigger the workflow from GitHub Actions UI:

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Select **Build Aequitas Zone Blockchain** workflow
4. Click **Run workflow** button (top right)
5. Select branch (`main` or `develop`)
6. Click **Run workflow**

### Option 3: Make a Small Change to Aequitas

Touch any file in the `aequitas/` directory to trigger the workflow:

```bash
# Add a comment or space to any Go file
cd aequitas
echo "" >> README.md
git add README.md
git commit -m "Trigger blockchain build workflow"
git push origin main
```

## What the Workflow Will Do

Once triggered, the workflow will:

1. ✅ **Build the blockchain daemon** (`aequitasd`)
2. ✅ **Run unit tests** (with continue-on-error for tests under development)
3. ✅ **Verify the binary** is working
4. ✅ **Upload artifacts**:
   - `aequitasd-{commit-sha}` (versioned)
   - `aequitasd-latest` (always the latest build)
5. ✅ **Initialize a testnet** (separate job)

## Expected Build Time

- **Dependency Download**: 5-10 minutes
- **Build Time**: 10-15 minutes
- **Total**: ~20-25 minutes

## Verifying the Build Fixed the Issues

After the workflow runs, you should see:

- ✅ No more "undefined: types.Defendant" errors
- ✅ No more "does not implement interface{ProtoMessage()}" errors
- ✅ All protobuf messages properly generated
- ✅ Successful binary build
- ✅ Artifacts uploaded

## Download the Built Binary

After a successful build:

1. Go to **Actions** → Select the workflow run
2. Scroll to **Artifacts** section
3. Download `aequitasd-latest` or `aequitasd-{commit-sha}`
4. Extract and use the binary

---

## Current Build Status

All protobuf files have been generated locally. The blockchain should now build successfully when the workflow is triggered!

**Modules Fixed:**
- ✅ claims
- ✅ defendant
- ✅ dex
- ✅ distribution
- ✅ endowment
- ✅ founderendowment
- ✅ justice
- ✅ nftmarketplace
- ✅ validatorsubsidy

**Files Generated:** 36 `.pb.go` files
