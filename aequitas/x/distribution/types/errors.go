
package types

import (
        sdkerrors "cosmossdk.io/errors"
)

var (
        ErrDescendantNotFound = sdkerrors.Register(ModuleName, 1101, "descendant not found")
        ErrInvalidDescendant  = sdkerrors.Register(ModuleName, 1102, "invalid descendant")
)
