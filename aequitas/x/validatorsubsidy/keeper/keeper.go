
package keeper

import (
        "time"

        "cosmossdk.io/math"
        storetypes "cosmossdk.io/store/types"
        "github.com/cosmos/cosmos-sdk/codec"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/cosmos/cosmos-sdk/types/errors"

        "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
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
        subsidyAmount := math.NewInt(6456000000)
        subsidyCoin := sdk.NewCoin("uusdc", subsidyAmount)

        // DEX Treasury module account
        dexTreasury := k.GetDexTreasuryAddress(ctx)

        // Check DEX Treasury balance
        balance := k.bankKeeper.GetBalance(ctx, dexTreasury, "uusdc")
        if balance.Amount.LT(subsidyAmount) {
                return errors.Wrapf(errors.ErrInsufficientFunds, 
                        "DEX Treasury has %s, need %s", balance.Amount, subsidyAmount)
        }

        // Execute transfer
        if err := k.bankKeeper.SendCoinsFromAccountToAccount(ctx, dexTreasury, operatorAddr, sdk.NewCoins(subsidyCoin)); err != nil {
                return errors.Wrap(err, "failed to transfer subsidy")
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

        var timestamp int64
        if err := k.cdc.Unmarshal(bz, &timestamp); err != nil {
                return time.Time{}
        }
        return time.Unix(timestamp, 0)
}

// SetLastDistribution stores the last distribution timestamp
func (k Keeper) SetLastDistribution(ctx sdk.Context, t time.Time) {
        store := ctx.KVStore(k.storeKey)
        timestamp := t.Unix()
        bz, err := k.cdc.Marshal(&timestamp)
        if err != nil {
                panic(err)
        }
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
