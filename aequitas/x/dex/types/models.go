package types

import (
	"cosmossdk.io/math"
)

// Pool represents a liquidity pool for token swaps
type Pool struct {
	Id            uint64
	ReserveA      math.Int
	ReserveB      math.Int
	DenomA        string
	DenomB        string
	TotalShares   math.Int
	SwapFeeRate   uint64 // in basis points (30 = 0.3%)
	LpTokenDenom  string // LP token denomination for this pool
	LpTokenSupply math.Int
}

// LiquidityPosition represents a user's position in a pool
type LiquidityPosition struct {
	PoolId uint64
	Owner  string
	Shares math.Int
}

// SwapRoute defines a path for token swaps
type SwapRoute struct {
	PoolId         uint64
	TokenInDenom   string
	TokenOutDenom  string
}

// GenesisState defines the dex module's genesis state
type GenesisState struct {
	Params     Params
	Pools      []Pool
	Positions  []LiquidityPosition
	NextPoolId uint64
}

// Params defines the parameters for the dex module
type Params struct {
	PoolCreationFee         math.Int
	MinInitialPoolLiquidity math.Int
	MaxSwapFeeRate          uint64
}
