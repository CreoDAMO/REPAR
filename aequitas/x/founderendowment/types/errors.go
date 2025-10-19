
package types

import "errors"

var (
	ErrEndowmentNotInitialized = errors.New("founder endowment not initialized")
	ErrInsufficientYield       = errors.New("insufficient yield accumulated")
	ErrEndowmentLocked         = errors.New("endowment is still locked")
	ErrInvalidDistribution     = errors.New("invalid distribution configuration")
)
