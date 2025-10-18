package types

import (
	"cosmossdk.io/errors"
)

var (
	ErrInvalidValidator      = errors.Register(ModuleName, 1, "invalid validator")
	ErrValidatorNotFound     = errors.Register(ModuleName, 2, "validator not found")
	ErrInsufficientFunds     = errors.Register(ModuleName, 3, "insufficient funds in subsidy pool")
	ErrInvalidAmount         = errors.Register(ModuleName, 4, "invalid amount")
	ErrValidatorNotActive    = errors.Register(ModuleName, 5, "validator is not active")
	ErrUnauthorized          = errors.Register(ModuleName, 6, "unauthorized")
	ErrAlreadyRegistered     = errors.Register(ModuleName, 7, "validator already registered")
	ErrInvalidOperator       = errors.Register(ModuleName, 8, "invalid operator address")
	ErrDistributionFailed    = errors.Register(ModuleName, 9, "subsidy distribution failed")
	ErrInsufficientReserve   = errors.Register(ModuleName, 10, "insufficient emergency reserve")
)
