# Aequitas Blockchain Proto Generation Build Fix

## Problem Summary

The Aequitas blockchain build was failing with multiple compilation errors related to undefined types and missing proto-generated files:

```
Error: x/claims/keeper/keeper.go:23:46: undefined: types.ArbitrationAward
Error: x/defendant/keeper/keeper.go:22:43: undefined: types.Defendant
Error: x/justice/keeper/keeper.go:24:43: undefined: types.JusticeBurn
Error: x/dex/types/msgs.go:9:14: cannot use &MsgCreatePool{} ... does not implement interface{ProtoMessage()...}
```

### Root Cause Analysis

The blockchain uses Protocol Buffers (proto3) to define message types. The Go compiler requires `.pb.go` files to be generated from `.proto` source files. The errors indicate:

1. **Proto files exist but `.pb.go` files are missing or empty** - The proto source files are in `aequitas/proto/aequitas/*/v1/*.proto` but the generated Go code isn't being created
2. **Go module import path mismatch** - The generated files may have incorrect package declarations or import paths
3. **Missing or incomplete proto definitions** - Some modules may have missing proto files or wrong message names

## Solution Overview

The fix involves three components:

### 1. **Proto Generation in GitHub Actions** (Recommended)

Update `.github/workflows/blockchain-build.yml` to:
- Install `buf` (Protocol Buffer compiler orchestrator)
- Install protobuf Go plugins
- Generate all `.pb.go` files before compilation
- Verify generated types exist before building

### 2. **Manual Fix Script** (For Local Development)

Use the provided `import-path-fix.sh` script to:
- Verify generated `.pb.go` files have correct content
- Check proto source files for correct message names
- Auto-generate missing proto files
- Regenerate all proto files
- Test the build

### 3. **Proto Configuration** (buf.gen.yaml)

Ensure `aequitas/buf.gen.yaml` exists with correct settings for proper module path configuration.

## Implementation Steps

### Step 1: Install buf Locally

```bash
go install github.com/bufbuild/buf/cmd/buf@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
export PATH=$PATH:$(go env GOPATH)/bin
```

### Step 2: Verify Proto Configuration

Ensure `aequitas/buf.gen.yaml` exists with correct settings:

```yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/CreoDAMO/REPAR/aequitas
plugins:
  - plugin: buf.build/protocolbuffers/go:v1.31.0
    out: .
    opt:
      - paths=source_relative
  - plugin: buf.build/grpc/go:v1.3.0
    out: .
    opt:
      - paths=source_relative
  - plugin: buf.build/grpc-ecosystem/gateway:v2.18.0
    out: .
    opt:
      - paths=source_relative
```

### Step 3: Run Manual Fix Script

Use the provided `import-path-fix.sh` script for automated diagnostics and fixes:

```bash
chmod +x import-path-fix.sh
./import-path-fix.sh
```

This script will:
1. Check if generated files have correct package declarations
2. Delete and regenerate all proto files from scratch
3. Verify critical types exist in generated files
4. Check proto source files for correct message names
5. Create missing proto files if needed
6. Test the build and report results

### Step 4: Update GitHub Actions Workflow

Edit `.github/workflows/blockchain-build.yml` and add proto generation steps before the build step:

```yaml
- name: Install buf for proto generation
  run: |
    echo "Installing buf and protobuf tools..."
    go install github.com/bufbuild/buf/cmd/buf@latest
    go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

- name: Generate proto files
  working-directory: ./aequitas
  timeout-minutes: 10
  run: |
    echo "Generating proto files with buf..."
    if [ -f "buf.gen.yaml" ]; then
      echo "✓ buf.gen.yaml found"
    else
      echo "⚠️ buf.gen.yaml not found, creating default..."
      # Create buf.gen.yaml with correct configuration
    fi
    
    echo "Running buf generate..."
    buf generate || buf generate --debug

- name: Verify proto-generated types
  working-directory: ./aequitas
  run: |
    echo "Verifying critical proto-generated types..."
    check_type() {
      local MODULE=$1
      local FILE=$2
      local TYPE=$3
      local FILEPATH="x/$MODULE/types/$FILE.pb.go"
      
      if [ ! -f "$FILEPATH" ]; then
        echo "✗ $MODULE: $FILE.pb.go missing"
        return 1
      fi
      
      if grep -q "type $TYPE struct" "$FILEPATH"; then
        echo "✓ $MODULE: $TYPE found"
        return 0
      else
        echo "✗ $MODULE: $TYPE NOT found"
        return 1
      fi
    }
    
    check_type "claims" "claims" "ArbitrationClaim" || true
    check_type "defendant" "defendant" "Defendant" || true
    check_type "justice" "justice" "JusticeBurn" || true
```

### Step 5: Regenerate Proto Files

Run proto generation locally:

```bash
cd aequitas
buf generate
cd ..
```

### Step 6: Verify Generated Files

Check that `.pb.go` files were created with correct content:

```bash
# List generated files
find aequitas/x/*/types -name "*.pb.go" | head -20

# Check for specific types
grep "type ArbitrationClaim struct" aequitas/x/claims/types/claims.pb.go
grep "type Defendant struct" aequitas/x/defendant/types/defendant.pb.go
grep "type JusticeBurn struct" aequitas/x/justice/types/justice.pb.go
```

### Step 7: Test the Build

```bash
cd aequitas
go mod tidy
go build -v -o ./build/aequitasd ./cmd/aequitasd
cd ..
```

## Troubleshooting

### Issue: "buf: command not found"

**Solution:** Install buf globally and add to PATH:
```bash
go install github.com/bufbuild/buf/cmd/buf@latest
export PATH=$PATH:$(go env GOPATH)/bin
which buf
```

### Issue: Proto files exist but types still undefined

**Solution:** Check if proto files have correct message names:

```bash
# Check what messages are defined
grep "^message " aequitas/proto/aequitas/claims/v1/claims.proto

# If message names are wrong (e.g., "Claim" instead of "ArbitrationClaim"), fix them:
sed -i 's/message Claim {/message ArbitrationClaim {/g' aequitas/proto/aequitas/claims/v1/claims.proto
sed -i 's/message Award {/message ArbitrationAward {/g' aequitas/proto/aequitas/claims/v1/claims.proto

# Regenerate
cd aequitas
buf generate
cd ..
```

### Issue: ".pb.go files are empty or malformed"

**Solution:** Delete and regenerate:

```bash
cd aequitas
find x/*/types -name "*.pb.go" -delete
buf generate
cd ..
```

### Issue: "go_package option mismatch"

**Solution:** Verify all proto files have correct go_package option:

```bash
# Check go_package in proto files
grep "go_package" aequitas/proto/aequitas/*/v1/*.proto

# Should be: option go_package = "github.com/CreoDAMO/REPAR/aequitas/x/<module>/types";
```

## Required Proto Files and Messages

### aequitas/proto/aequitas/claims/v1/claims.proto
```protobuf
message ArbitrationClaim { ... }
message ArbitrationAward { ... }
```

### aequitas/proto/aequitas/defendant/v1/defendant.proto
```protobuf
enum DefendantStatus { ... }
message Defendant { ... }
message Payment { ... }
```

### aequitas/proto/aequitas/justice/v1/justice.proto
```protobuf
message JusticeBurn { ... }
message BurnStatistics { ... }
```

### aequitas/proto/aequitas/dex/v1/tx.proto
```protobuf
message MsgCreatePool { ... }
message MsgAddLiquidity { ... }
message MsgRemoveLiquidity { ... }
message MsgSwap { ... }
```

## Verification Checklist

- [ ] `buf` is installed and available in PATH
- [ ] `aequitas/buf.gen.yaml` exists with correct configuration
- [ ] All proto source files exist in `aequitas/proto/aequitas/*/v1/`
- [ ] Proto files have correct message names matching Go code expectations
- [ ] `.pb.go` files are generated in `aequitas/x/*/types/`
- [ ] Generated files contain expected type definitions
- [ ] `go build` completes successfully
- [ ] Binary `aequitas/build/aequitasd` is created

## Using the import-path-fix.sh Script

The provided `import-path-fix.sh` script automates the entire fix process:

```bash
chmod +x import-path-fix.sh
./import-path-fix.sh
```

**What the script does:**

1. **Step 1:** Checks if generated files have correct package declarations
2. **Step 2:** Deletes all old generated files and regenerates from scratch
3. **Step 3:** Verifies critical types exist in generated files
4. **Step 4:** Checks proto source files for correct message names
5. **Step 5:** Creates missing proto files if needed
6. **Step 6:** Performs final regeneration
7. **Step 7:** Tests the build and reports results

**Output example:**
```
🔧 Fixing Go Import Path Mismatch
==================================

Step 1: Checking generated file package declarations
Claims package: package types

Step 2: Regenerating proto with explicit paths
Deleting old generated files...
Checking buf.gen.yaml configuration...
Regenerating all proto files...
✓ Proto generation complete

Step 3: Verifying generated types
✓ claims: ArbitrationClaim found
✓ defendant: Defendant found
✓ justice: JusticeBurn found

Step 7: Testing build
✓ Build successful

═══════════════════════════════════════
✅ BUILD SUCCESSFUL!
═══════════════════════════════════════
```

## Additional Resources

- [Buf Documentation](https://buf.build/docs)
- [Protocol Buffers Go Guide](https://developers.google.com/protocol-buffers/docs/gotutorial)
- [Cosmos SDK Proto Guide](https://docs.cosmos.network/main/build/building-modules/messages-and-queries)
- [Cosmos SDK v0.50 Migration Guide](https://github.com/cosmos/cosmos-sdk/blob/release/v0.50.x/UPGRADING.md)

## Support

If the build still fails after following these steps:

1. Run the `import-path-fix.sh` script for automated diagnostics
2. Check if custom modules need updates for Cosmos SDK compatibility
3. Verify proto syntax uses `syntax = "proto3"`
4. Ensure all proto files have correct `go_package` options
5. Check that all message names match Go code expectations

---

**Status**: ✅ **READY FOR IMPLEMENTATION**
**Date**: October 24, 2025
**Related Files**: `import-path-fix.sh`, `.github/workflows/blockchain-build.yml`

