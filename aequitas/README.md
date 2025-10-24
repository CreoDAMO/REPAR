# Aequitas Zone Blockchain

**Last updated**: 2025-01-24

## Overview
Aequitas Zone is a sovereign Layer-1 blockchain built on Cosmos SDK for enforcing global reparations for the transatlantic slave trade.

## $REPAR Coin Parameters
- **Total Supply**: 131,000,000,000,000 (131 Trillion) $REPAR
- **Initial Price**: $18.33 (via Liquidity Bootstrapping Pool)
- **Denom**: `repar`
- **Minimum Commission Rate**: 4.5% (for validators)
- **Unbonding Period**: 21 days

## Allocation
- 43% - Community & Descendant Fund
- 25% - Claims & Compensation Fund  
- 10% - Ecosystem & Enforcement Treasury
- 10% - Founder's Allocation (1% immediate, 9% vested over 5 years)
- 8% - Development Fund
- 4% - Foundation Treasury & Reserves

## Development Status
- ✅ Basic blockchain structure created
- ✅ $REPAR coin parameters configured
- ✅ Genesis configuration with proper supply
- 🚧 Custom modules (Evidence Registry, Claims System) - In Progress
- 🚧 Full app.go implementation - In Progress

## Next Steps
1. Complete custom x/repar module for reparations logic
2. Add x/evidence module for forensic audit integration
3. Add x/claims module for descendant claim filing
4. Implement governance for DAO voting
5. Set up testnet for frontend integration

## Running Locally (Once Complete)
```bash
cd aequitas
go mod tidy
go build -o build/aequitasd ./cmd/aequitasd
./build/aequitasd init validator --chain-id aequitas-1
./build/aequitasd start
```

## Technical Stack
- Cosmos SDK v0.53.4
- CometBFT v0.38.17
- Go 1.24+

---
Built for justice | Powered by Cosmos SDK
