package types

import (
	"cosmossdk.io/errors"
)

var (
	ErrInvalidNFT          = errors.Register(ModuleName, 1, "invalid NFT")
	ErrNFTNotFound         = errors.Register(ModuleName, 2, "NFT not found")
	ErrListingNotFound     = errors.Register(ModuleName, 3, "listing not found")
	ErrUnauthorized        = errors.Register(ModuleName, 4, "unauthorized")
	ErrInvalidPrice        = errors.Register(ModuleName, 5, "invalid price")
	ErrInsufficientFunds   = errors.Register(ModuleName, 6, "insufficient funds")
	ErrInvalidParams       = errors.Register(ModuleName, 7, "invalid parameters")
	ErrDuplicateNFT        = errors.Register(ModuleName, 8, "duplicate NFT ID")
	ErrDuplicateCollection = errors.Register(ModuleName, 9, "duplicate collection ID")
)