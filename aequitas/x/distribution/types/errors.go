
package types

import (
        sdkerrors "cosmossdk.io/errors"
)

var (
        ErrDescendantNotFound = sdkerrors.Register(ModuleName, 1, "descendant not found")
        ErrInvalidDescendant  = sdkerrors.Register(ModuleName, 2, "invalid descendant")
)
