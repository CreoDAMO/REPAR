
package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// BankKeeper defines the expected interface for the bank keeper
type BankKeeper interface {
	SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error
	GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin
}

// JusticeKeeper defines the expected interface for the justice keeper
type JusticeKeeper interface {
	ExecuteJusticeBurn(ctx sdk.Context, amount sdk.Coins) error
}

// ClaimsKeeper defines the expected interface for the claims keeper
type ClaimsKeeper interface {
	FileClaim(ctx sdk.Context, claimant string, defendant string, amount sdk.Coins) error
}
