# Blockchain Build - Final Fix Guide

## 🚨 The Root Cause

Your blockchain build has **hundreds of duplicate type declarations**:

| File Type | Defines Types | Example |
|-----------|---------------|---------|
| `.proto` files | Messages, Queries, Genesis | `message Pool { ... }` |
| Manual `.go` files | Same types again | `type Pool struct { ... }` |
| **Result** | Compiler error: "other declaration of Pool" | ❌ Build fails |

## Files With Duplicates

### x/dex/types/
- `models.go` → Duplicates `dex.pb.go`
- `msgs.go` → Duplicates `tx.pb.go`
- `query.go` → Duplicates `query.pb.go`

### x/distribution/types/
- `genesis.go` → Duplicates `genesis.pb.go`

### Similar conflicts in:
- x/defendant/
- x/endowment/
- x/founderendowment/
- x/justice/
- x/nftmarketplace/
- x/validatorsubsidy/
- x/claims/

## ✅ The Solution

### Step 1: Commit Generated Protobuf Files

The protobuf files (`*.pb.go`) ARE the correct types. We need to commit them:

```bash
# Stage the protobuf files
git add aequitas/x/*/types/*.pb.go

# Commit
git commit -m "Add generated protobuf files for blockchain modules"
```

### Step 2: Remove Conflicting Manual Files

These files define types that conflict with protobuf:

```bash
cd aequitas

# Remove duplicate type definitions
rm -f x/dex/types/models.go
rm -f x/dex/types/msgs.go  
rm -f x/dex/types/query.go
rm -f x/distribution/types/genesis.go

# Note: Keep these files (they have helper methods only):
# - codec.go
# - keys.go
# - errors.go
# - expected_keepers.go
```

### Step 3: Fix Keeper Files

After removing duplicates, some keeper files may need updates if they reference fields that don't exist in the protobuf-generated types.

Check for errors like:
```
undefined: defendant.TotalPaid
undefined: value.LiabilityAmount
```

These mean the keeper code expects fields that aren't in the protobuf definitions.

### Step 4: Update Workflow & Push

```bash
# Stage workflow change
git add .github/workflows/blockchain-build.yml

# Commit all changes
git commit -m "Fix blockchain build: use protobuf-only types

- Committed generated .pb.go files
- Removed conflicting manual type definitions
- Updated workflow to verify protobuf files exist
- Fixes hundreds of 'other declaration' errors"

# Push
git push origin main
```

## 🎯 Expected Result

After these changes:

✅ No more "other declaration of Pool" errors  
✅ No more "redeclared in this block" errors  
✅ Build should succeed (or show only remaining keeper field errors)  
✅ Significantly fewer errors (from ~500+ to maybe 10-20)  

## 🔧 Quick Fix Script

I've created `fix-blockchain-build.sh` to automate this!

```bash
./fix-blockchain-build.sh
```

## ⚠️ Remaining Issues

After this fix, you may still see errors like:

```
undefined: defendant.TotalPaid
unknown field UseAmount
```

These are **keeper implementation errors** where the code uses fields that don't match the protobuf definitions. You'll need to:

1. Check the protobuf definition for the correct field names
2. Update keeper code to use the correct fields
3. Or add missing fields to the `.proto` files and regenerate

## 📊 Build Time

Once fixed:
- **First build**: ~25-30 minutes (dependency download)
- **Subsequent builds**: ~10-15 minutes (cached)

## 🆘 If Still Failing

Share the error log after this fix, and we can tackle the remaining keeper issues one by one!

---

**The key insight**: Your blockchain was designed with protobuf, so protobuf must be the source of truth. All manual type definitions must be removed.
