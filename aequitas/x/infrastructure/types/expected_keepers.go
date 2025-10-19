package types

import (
        "cosmossdk.io/math"
        sdk "github.com/cosmos/cosmos-sdk/types"
)

type BankKeeper interface {
        GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin
        SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error
}

type StakingKeeper interface {
        GetLastTotalPower(ctx sdk.Context) math.Int
}
