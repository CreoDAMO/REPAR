package types

import (
        "cosmossdk.io/math"
)

// Pool represents a liquidity pool for native coin swaps
// Note: $REPAR is a NATIVE COIN (not a token), used for gas fees on Aequitas Zone L1
// This DEX enables native coin-to-coin swaps (e.g., REPAR/USDC)
// LP tokens are receipt tokens given to liquidity providers (separate from $REPAR)
type Pool struct {
        Id            uint64
        ReserveA      math.Int
        ReserveB      math.Int
        DenomA        string   // e.g., "urepar" (native coin denomination)
        DenomB        string   // e.g., "uusdc" (native coin denomination)
        TotalShares   math.Int
        SwapFeeRate   uint64    // in basis points (30 = 0.3%)
        LpTokenDenom  string    // LP token denom (receipt token for liquidity providers)
        LpTokenSupply math.Int  // Total LP tokens issued
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
