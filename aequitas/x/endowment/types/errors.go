package types

import (
	"cosmossdk.io/errors"
)

var (
	ErrEndowmentNotFound        = errors.Register(ModuleName, 1, "endowment not found")
	ErrEndowmentLocked          = errors.Register(ModuleName, 2, "endowment is still locked")
	ErrInsufficientYield        = errors.Register(ModuleName, 3, "insufficient yield available")
	ErrInvalidStrategy          = errors.Register(ModuleName, 4, "invalid investment strategy")
	ErrPrincipalLocked          = errors.Register(ModuleName, 5, "principal is locked forever and cannot be withdrawn")
	ErrInvalidAllocation        = errors.Register(ModuleName, 6, "invalid allocation percentage")
	ErrProgramNotFound          = errors.Register(ModuleName, 7, "social program not found")
	ErrInvalidEndowmentType     = errors.Register(ModuleName, 8, "invalid endowment type")
)
