
package types

import (
	sdkerrors "cosmossdk.io/errors"
)

var (
	ErrClaimNotFound = sdkerrors.Register(ModuleName, 1, "claim not found")
	ErrInvalidClaim  = sdkerrors.Register(ModuleName, 2, "invalid claim")
)

const ModuleName = "claims"
