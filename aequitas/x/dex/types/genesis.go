package types

import (
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:          DefaultParams(),
		Pools:           []Pool{},
		Positions:       []Position{},
		FeeDistribution: FeeDistribution{
			TreasuryPool:     math.ZeroInt(),
			StakingRewards:   math.ZeroInt(),
			LiquidityRewards: math.ZeroInt(),
		},
	}
}

// DefaultParams returns default module parameters
func DefaultParams() Params {
	return Params{
		SwapFeeRate:     "0.003",
		ProtocolFeeRate: "0.001",
		MinLiquidity:    "1000",
	}
}

// ValidateGenesis validates the genesis state
func ValidateGenesis(data *GenesisState) error {
	if data.Params.SwapFeeRate == "" {
		return ErrInvalidSwapFee
	}
	return nil
}

func (gs GenesisState) Validate() error {
	return ValidateGenesis(&gs)
}