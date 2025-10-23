package types

import (
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Pools:      []Pool{},
		Positions:  []LiquidityPosition{},
		NextPoolId: 1,
		Params:     DefaultParams(),
	}
}

// DefaultParams returns default module parameters
func DefaultParams() Params {
	return Params{
		PoolCreationFee:        math.NewInt(1000000), // 1 REPAR
		MinInitialPoolLiquidity: math.NewInt(100000), // 0.1 REPAR minimum
		MaxSwapFeeRate:         10000,                // 100% maximum (in basis points)
	}
}

// ValidateGenesis validates the genesis state
func ValidateGenesis(data GenesisState) error {
	// Validate pools
	for _, pool := range data.Pools {
		if pool.Id == 0 {
			return ErrInvalidPoolID
		}
		if pool.SwapFeeRate > 10000 {
			return ErrInvalidSwapFeeRate
		}
		if pool.DenomA == "" || pool.DenomB == "" {
			return ErrInvalidTokenDenom
		}
	}

	// Validate positions
	for _, position := range data.Positions {
		if position.PoolId == 0 {
			return ErrInvalidPoolID
		}
		if position.Owner == "" {
			return ErrInvalidTokenDenom
		}
	}

	return nil
}
