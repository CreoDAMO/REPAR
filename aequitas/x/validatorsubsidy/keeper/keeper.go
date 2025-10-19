
package keeper

import (
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/creodamo/aequitas/x/validatorsubsidy/types"
)

type Keeper struct {
	cdc        codec.BinaryCodec
	storeKey   storetypes.StoreKey
	bankKeeper types.BankKeeper
}

func NewKeeper(cdc codec.BinaryCodec, storeKey storetypes.StoreKey, bankKeeper types.BankKeeper) *Keeper {
	return &Keeper{
		cdc:        cdc,
		storeKey:   storeKey,
		bankKeeper: bankKeeper,
	}
}

// DistributeSubsidies transfers USDC from DEX Treasury to validator operator
func (k Keeper) DistributeSubsidies(ctx sdk.Context, operatorAddr sdk.AccAddress) error {
	// Monthly subsidy: $6,456 USDC (in uusdc: 6,456,000,000)
	subsidyAmount := sdk.NewInt(6456000000)
	subsidyCoin := sdk.NewCoin("uusdc", subsidyAmount)

	// DEX Treasury module account
	dexTreasury := k.GetDexTreasuryAddress(ctx)

	// Check DEX Treasury balance
	balance := k.bankKeeper.GetBalance(ctx, dexTreasury, "uusdc")
	if balance.Amount.LT(subsidyAmount) {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, 
			"DEX Treasury has %s, need %s", balance.Amount, subsidyAmount)
	}

	// Execute transfer
	if err := k.bankKeeper.SendCoins(ctx, dexTreasury, operatorAddr, sdk.NewCoins(subsidyCoin)); err != nil {
		return sdkerrors.Wrap(err, "failed to transfer subsidy")
	}

	// Update last distribution timestamp
	k.SetLastDistribution(ctx, ctx.BlockTime())

	// Emit event
	ctx.EventManager().EmitEvent(
		sdk.NewEvent("validator_subsidy_paid",
			sdk.NewAttribute("amount", subsidyCoin.String()),
			sdk.NewAttribute("recipient", operatorAddr.String()),
			sdk.NewAttribute("timestamp", ctx.BlockTime().String()),
		),
	)

	return nil
}

// CheckDistribution checks if 30 days have passed and triggers distribution
func (k Keeper) CheckDistribution(ctx sdk.Context, operatorAddr sdk.AccAddress) error {
	lastDist := k.GetLastDistribution(ctx)
	distributionPeriod := 30 * 24 * time.Hour // 30 days

	if ctx.BlockTime().Sub(lastDist) >= distributionPeriod {
		return k.DistributeSubsidies(ctx, operatorAddr)
	}

	return nil
}

// GetLastDistribution retrieves the last distribution timestamp
func (k Keeper) GetLastDistribution(ctx sdk.Context) time.Time {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.LastDistributionKey)
	if bz == nil {
		return time.Time{}
	}

	var t time.Time
	k.cdc.MustUnmarshal(bz, &t)
	return t
}

// SetLastDistribution stores the last distribution timestamp
func (k Keeper) SetLastDistribution(ctx sdk.Context, t time.Time) {
	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshal(&t)
	store.Set(types.LastDistributionKey, bz)
}

// GetDexTreasuryAddress returns the DEX module account address
func (k Keeper) GetDexTreasuryAddress(ctx sdk.Context) sdk.AccAddress {
	// DEX module account address
	return sdk.AccAddress([]byte("dex"))
}

// GetOperatorAddress returns the validator operator address from params
func (k Keeper) GetOperatorAddress(ctx sdk.Context) sdk.AccAddress {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.OperatorAddressKey)
	if bz == nil {
		return nil
	}
	return sdk.AccAddress(bz)
}

// SetOperatorAddress stores the validator operator address
func (k Keeper) SetOperatorAddress(ctx sdk.Context, addr sdk.AccAddress) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.OperatorAddressKey, addr.Bytes())
}
