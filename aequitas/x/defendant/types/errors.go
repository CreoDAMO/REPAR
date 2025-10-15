
package types

import (
	sdkerrors "cosmossdk.io/errors"
)

var (
	ErrDefendantNotFound = sdkerrors.Register(ModuleName, 1, "defendant not found")
	ErrInvalidDefendant  = sdkerrors.Register(ModuleName, 2, "invalid defendant")
)

const ModuleName = "defendant"
