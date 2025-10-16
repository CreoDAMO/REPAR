package types

import (
	"cosmossdk.io/errors"
)

// x/dex module sentinel errors
var (
	ErrPoolNotFound           = errors.Register(ModuleName, 1, "pool not found")
	ErrInvalidPoolID          = errors.Register(ModuleName, 2, "invalid pool ID")
	ErrInsufficientLiquidity  = errors.Register(ModuleName, 3, "insufficient liquidity")
	ErrInvalidTokenDenom      = errors.Register(ModuleName, 4, "invalid token denomination")
	ErrZeroAmount             = errors.Register(ModuleName, 5, "amount cannot be zero")
	ErrSlippageExceeded       = errors.Register(ModuleName, 6, "slippage tolerance exceeded")
	ErrInvalidSwapRoute       = errors.Register(ModuleName, 7, "invalid swap route")
	ErrPoolAlreadyExists      = errors.Register(ModuleName, 8, "pool already exists for this token pair")
	ErrInsufficientShares     = errors.Register(ModuleName, 9, "insufficient liquidity shares")
	ErrInvalidSwapFeeRate     = errors.Register(ModuleName, 10, "invalid swap fee rate")
	ErrPoolCreationFeeNotMet  = errors.Register(ModuleName, 11, "pool creation fee not met")
	ErrMinLiquidityNotMet     = errors.Register(ModuleName, 12, "minimum initial liquidity not met")
)
