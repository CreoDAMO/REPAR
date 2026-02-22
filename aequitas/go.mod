module github.com/CreoDAMO/REPAR/aequitas

go 1.24.0

toolchain go1.24.9

require (
	github.com/CreoDAMO/REPAR/ai/autonomous v0.0.0-20260221213135-b66040cfe89e
	github.com/lib/pq v1.10.9
)

// Pin cosmossdk.io and cosmos packages to versions compatible with cosmos-sdk v0.50.10
replace (
	cosmossdk.io/api => cosmossdk.io/api v0.7.5
	cosmossdk.io/core => cosmossdk.io/core v0.11.1
	cosmossdk.io/x/tx => cosmossdk.io/x/tx v0.13.7 // Security fix: ASA-2024-0012, ASA-2024-0013
	github.com/CreoDAMO/REPAR/aequitas => ./
	github.com/cosmos/iavl => github.com/cosmos/iavl v1.2.0
)
