
# Proto-First Cleanup Strategy

## Problem
Manual Go files were duplicating proto-generated types, causing compilation conflicts.

## Solution
**Keep only helper files with business logic. Delete manual type definitions.**

## File Categories

### ✅ KEEP - Helper Files (Business Logic)
These files complement proto-generated code:
- `codec.go` - Interface registration
- `errors.go` - Custom error definitions  
- `expected_keepers.go` - Keeper interface contracts
- `keys.go` - Store key constants
- `msgs.go` - Message validation logic
- `*_helpers.go` - Utility functions
- `params.go` - Parameter defaults/validation

### ❌ DELETE - Type Definition Files
These duplicate `.pb.go` files and must be removed:
- `claims.go`, `defendant.go`, `dex.go`, etc. - Main type structs
- `query.go` - Query request/response (unless it has validation logic)
- `tx.go` - Transaction messages (unless it has validation logic)
- `genesis.go` - Genesis state (unless it has validation logic)

## Workflow

1. **Delete conflicting manual files**
   ```bash
   ./scripts/remove-duplicate-types.sh
   ```

2. **Regenerate proto files**
   ```bash
   ./scripts/protocgen.sh
   ```

3. **Verify build**
   ```bash
   go build ./cmd/aequitasd
   ```

## Why This Works

- Proto files define the **structure** (types, fields, serialization)
- Helper files define the **behavior** (validation, registration, utilities)
- No duplication = no conflicts
- GitHub workflow generates .pb.go files fresh each time
- Helper files provide the glue between generated code and Cosmos SDK

## Current Status

✅ Manual type files removed  
✅ Helper files preserved  
✅ GitHub workflow fixed to not delete helpers  
🔄 Proto generation will create all type definitions  
