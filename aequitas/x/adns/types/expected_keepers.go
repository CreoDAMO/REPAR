package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// AccountKeeper defines the expected account keeper interface
type AccountKeeper interface {
	GetAccount(ctx context.Context, addr sdk.AccAddress) sdk.AccountI
	HasAccount(ctx context.Context, addr sdk.AccAddress) bool
}

// BankKeeper defines the expected bank keeper interface
type BankKeeper interface {
	SpendableCoins(ctx context.Context, addr sdk.AccAddress) sdk.Coins
	SendCoinsFromAccountToModule(ctx context.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
	SendCoinsFromModuleToAccount(ctx context.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
}

// NFTKeeper defines the expected NFT keeper interface
type NFTKeeper interface {
	Mint(ctx context.Context, classID, nftID, uri string, owner sdk.AccAddress) error
	Transfer(ctx context.Context, classID, nftID string, receiver sdk.AccAddress) error
	GetNFT(ctx context.Context, classID, nftID string) (interface{}, bool)
}
