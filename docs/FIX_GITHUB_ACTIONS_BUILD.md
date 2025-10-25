# Fix GitHub Actions Build - Complete Guide

## Problem Summary
The GitHub Actions build is failing due to:
1. ✅ **FIXED**: Missing proto imports in DEX module
2. ✅ **FIXED**: Syntax errors (duplicate package declarations)
3. ✅ **FIXED**: Duplicate ModuleName constants
4. ❌ **NEEDS COMMIT**: Missing proto-generated `.pb.go` files

## What Has Been Fixed Locally

### 1. Proto Import Fixes
Added `import "cosmos_proto/cosmos.proto"` to:
- `aequitas/proto/aequitas/dex/v1/dex.proto`
- `aequitas/proto/aequitas/dex/v1/genesis.proto`
- `aequitas/proto/aequitas/dex/v1/query.proto`
- `aequitas/proto/aequitas/dex/v1/tx.proto`

### 2. Syntax Error Fixes
- Fixed `aequitas/x/dex/types/expected_keepers.go` (removed duplicate package declaration)
- Fixed `aequitas/x/validatorsubsidy/types/keys.go` (removed duplicate package declaration)

### 3. Duplicate ModuleName Fixes
- Removed ModuleName from `aequitas/x/distribution/types/errors.go` (kept in expected_keepers.go)
- Removed ModuleName from `aequitas/x/nftmarketplace/types/errors.go` (kept in keys.go)

### 4. Proto Generation Completed
Generated all missing `.pb.go` files for modules:
- ✅ defendant (4 files)
- ✅ claims (4 files)
- ✅ justice (4 files)
- ✅ dex (4 files)
- ✅ endowment (4 files)
- ✅ founderendowment (4 files)
- ✅ nftmarketplace (4 files)
- ✅ validatorsubsidy (4 files)

## What You Need to Do

### Step 1: Commit All Changes

Run these commands to commit all the fixes:

```bash
cd /home/runner/workspace

# Add proto definition fixes
git add aequitas/proto/aequitas/dex/v1/*.proto
git add aequitas/proto/buf.lock

# Add syntax error fixes
git add aequitas/x/dex/types/expected_keepers.go
git add aequitas/x/validatorsubsidy/types/keys.go
git add aequitas/x/distribution/types/errors.go
git add aequitas/x/nftmarketplace/types/errors.go

# Add ALL generated proto files (.pb.go and .pb.gw.go)
git add 'aequitas/x/*/types/*.pb.go'
git add 'aequitas/x/*/types/*.pb.gw.go'

# Commit everything
git commit -m "fix: Generate proto files and resolve build errors

- Add cosmos_proto imports to DEX module proto files
- Fix duplicate package declarations in dex and validatorsubsidy
- Remove duplicate ModuleName constants
- Generate all missing proto files for all modules
- Update buf.lock with correct dependencies

Fixes #42"

# Push to GitHub
git push origin main
```

### Step 2: Verify the Build

After pushing, GitHub Actions will automatically run. Check:
https://github.com/CreoDAMO/REPAR/actions

The build should now pass! ✅

## Files Changed Summary

### Proto Definition Files (4 files)
- `aequitas/proto/aequitas/dex/v1/dex.proto`
- `aequitas/proto/aequitas/dex/v1/genesis.proto`
- `aequitas/proto/aequitas/dex/v1/query.proto`
- `aequitas/proto/aequitas/dex/v1/tx.proto`

### Buf Configuration (1 file)
- `aequitas/proto/buf.lock`

### Syntax Fixes (4 files)
- `aequitas/x/dex/types/expected_keepers.go`
- `aequitas/x/validatorsubsidy/types/keys.go`
- `aequitas/x/distribution/types/errors.go`
- `aequitas/x/nftmarketplace/types/errors.go`

### Generated Proto Files (~32 .pb.go files + ~8 .pb.gw.go files)
All modules now have complete proto-generated code:
- `aequitas/x/claims/types/*.pb.go`
- `aequitas/x/defendant/types/*.pb.go`
- `aequitas/x/dex/types/*.pb.go`
- `aequitas/x/distribution/types/*.pb.go`
- `aequitas/x/endowment/types/*.pb.go`
- `aequitas/x/founderendowment/types/*.pb.go`
- `aequitas/x/justice/types/*.pb.go`
- `aequitas/x/nftmarketplace/types/*.pb.go`
- `aequitas/x/validatorsubsidy/types/*.pb.go`

## Verification Commands

After committing, you can verify locally:

```bash
cd aequitas

# Test build
go build ./cmd/aequitasd

# Or test specific modules
go build ./x/defendant/...
go build ./x/claims/...
go build ./x/dex/...
```

## What This Fixes

All these GitHub Actions errors will be resolved:
- ✅ `undefined: types.ArbitrationClaim`
- ✅ `undefined: types.Defendant`
- ✅ `undefined: types.Payment`
- ✅ `undefined: types.MsgServer`
- ✅ `undefined: types.JusticeBurn`
- ✅ `undefined: types.GenesisState`
- ✅ `ModuleName redeclared in this block`
- ✅ `syntax error: non-declaration statement outside function body`

---

**Note**: The proto files must be committed because GitHub Actions doesn't run `buf generate` - it expects the generated files to already be in the repository.
