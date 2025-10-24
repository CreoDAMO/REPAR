package types

import (
        sdkerrors "cosmossdk.io/errors"
)

var (
        ErrNFTNotFound         = sdkerrors.Register(ModuleName, 1, "NFT not found")
        ErrInvalidNFT          = sdkerrors.Register(ModuleName, 2, "invalid NFT")
        ErrNotNFTOwner         = sdkerrors.Register(ModuleName, 3, "not NFT owner")
        ErrListingNotFound     = sdkerrors.Register(ModuleName, 4, "listing not found")
        ErrNotListingSeller    = sdkerrors.Register(ModuleName, 5, "not listing seller")
        ErrListingNotActive    = sdkerrors.Register(ModuleName, 6, "listing not active")
        ErrListingExpired      = sdkerrors.Register(ModuleName, 7, "listing expired")
        ErrInvalidPrice        = sdkerrors.Register(ModuleName, 8, "invalid price")
        ErrInvalidRoyalty      = sdkerrors.Register(ModuleName, 9, "invalid royalty percentage")
        ErrCollectionNotFound  = sdkerrors.Register(ModuleName, 10, "collection not found")
        ErrNotEvidenceNFT      = sdkerrors.Register(ModuleName, 11, "NFT is not an evidence type")
        ErrInsufficientFunds   = sdkerrors.Register(ModuleName, 12, "insufficient funds")
)
