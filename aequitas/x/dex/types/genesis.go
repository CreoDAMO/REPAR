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
		TradingFeePercent: 30, // 0.3%
		ProtocolFeePercent: 5, // 0.05%
	}
}

// ValidateGenesis validates the genesis state
func ValidateGenesis(data GenesisState) error {
	if data.Params.TradingFeePercent > 10000 {
		return ErrInvalidParams
	}
	if data.Params.ProtocolFeePercent > 10000 {
		return ErrInvalidParams
	}
	return nil
}

func (gs GenesisState) Validate() error {
	return ValidateGenesis(gs)
}