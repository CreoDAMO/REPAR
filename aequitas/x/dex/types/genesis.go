package types

import (
        "cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
        return &GenesisState{
                Params:     DefaultParams(),
                Pools:      []Pool{},
                Positions:  []LiquidityPosition{},
                NextPoolId: 1,
        }
}

// DefaultParams returns default module parameters
func DefaultParams() Params {
        return Params{
                PoolCreationFee:        math.NewInt(1000000), // 1 REPAR
                MinInitialPoolLiquidity: math.NewInt(1000000), // 1 REPAR minimum
                MaxSwapFeeRate:         300, // 3% maximum swap fee
        }
}

// ValidateGenesis validates the genesis state
func ValidateGenesis(data GenesisState) error {
        // Validate max swap fee rate
        if data.Params.MaxSwapFeeRate > 10000 {
                return ErrInvalidSwapFee
        }
        
        // Validate pool creation fee is positive
        if data.Params.PoolCreationFee.IsNegative() {
                return ErrInvalidPoolCreationFee
        }
        
        // Validate minimum liquidity is positive
        if data.Params.MinInitialPoolLiquidity.IsNegative() {
                return ErrInvalidMinLiquidity
        }
        
        return nil
}

func (gs GenesisState) Validate() error {
        return ValidateGenesis(gs)
}