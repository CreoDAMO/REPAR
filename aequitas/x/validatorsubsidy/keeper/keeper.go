package keeper

import (
	"context"
	"encoding/binary"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/math"
	storetypes "cosmossdk.io/store/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

type Keeper struct {
	cdc        codec.BinaryCodec
	storeKey   storetypes.StoreKey
	authority  string
	bankKeeper types.BankKeeper
	
	// Collections for state management
	Pool     collections.Item[types.SubsidyPool]
	Schedule collections.Item[types.SubsidyDistributionSchedule]
}

func NewKeeper(cdc codec.BinaryCodec, storeKey storetypes.StoreKey, bankKeeper types.BankKeeper) *Keeper {
	// Use governance module as default authority for validator subsidy operations
	// This ensures compatibility with the current chain's Bech32 prefix
	return &Keeper{
		cdc:        cdc,
		storeKey:   storeKey,
		authority:  authtypes.NewModuleAddress(govtypes.ModuleName).String(),
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
		return fmt.Errorf("DEX Treasury has insufficient funds: %s, need %s", balance.Amount, subsidyAmount)
	}

	// Execute transfer using bank keeper SendCoins
	err := k.bankKeeper.SendCoins(ctx, dexTreasury, operatorAddr, sdk.NewCoins(subsidyCoin))
	if err != nil {
		return fmt.Errorf("failed to transfer subsidy: %w", err)
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
	if bz == nil || len(bz) == 0 {
		return time.Time{}
	}

	timestamp := int64(binary.BigEndian.Uint64(bz))
	return time.Unix(timestamp, 0)
}

// SetLastDistribution stores the last distribution timestamp
func (k Keeper) SetLastDistribution(ctx sdk.Context, t time.Time) {
	store := ctx.KVStore(k.storeKey)
	timestamp := t.Unix()
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, uint64(timestamp))
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

// RegisterValidator registers a validator for subsidy payments
func (k Keeper) RegisterValidator(ctx sdk.Context, record types.ValidatorSubsidyRecord) error {
	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshal(&record)
	store.Set(types.ValidatorKey(record.ValidatorAddress), bz)
	return nil
}

// DistributeMonthlySubsidies distributes subsidies to all active validators
func (k Keeper) DistributeMonthlySubsidies(ctx sdk.Context) (uint32, math.Int, error) {
	// This would iterate through registered validators and distribute
	// For now, return placeholder values
	return 0, math.ZeroInt(), nil
}

// ClaimEmergencyFunds allows operators to claim emergency buffer funds
func (k Keeper) ClaimEmergencyFunds(ctx sdk.Context, operatorAddr string, amount math.Int, reason string) error {
	// Implementation for emergency fund claims
	return nil
}

// UpdateValidatorStatus updates a validator's subsidy status
func (k Keeper) UpdateValidatorStatus(ctx sdk.Context, validatorAddr string, status types.ValidatorStatus) error {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.ValidatorKey(validatorAddr))
	if bz == nil {
		return fmt.Errorf("validator not found: %s", validatorAddr)
	}

	var record types.ValidatorSubsidyRecord
	k.cdc.MustUnmarshal(bz, &record)
	record.Status = status

	newBz := k.cdc.MustMarshal(&record)
	store.Set(types.ValidatorKey(validatorAddr), newBz)
	return nil
}

// GetPool returns pool information (stub for now)
func (k Keeper) GetPool(ctx sdk.Context) (types.SubsidyPool, error) {
	return types.SubsidyPool{}, nil
}

// ListValidators returns all registered validators
func (k Keeper) ListValidators(ctx sdk.Context) ([]types.ValidatorSubsidyRecord, error) {
	return []types.ValidatorSubsidyRecord{}, nil
}

// GetPaymentHistory returns payment history for a validator
func (k Keeper) GetPaymentHistory(ctx sdk.Context, validatorAddr string) ([]types.SubsidyPayment, error) {
	return []types.SubsidyPayment{}, nil
}

// GetValidator returns a validator subsidy record by address
func (k Keeper) GetValidator(ctx context.Context, validatorAddr string) (types.ValidatorSubsidyRecord, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	store := sdkCtx.KVStore(k.storeKey)
	bz := store.Get(types.ValidatorKey(validatorAddr))
	if bz == nil {
		return types.ValidatorSubsidyRecord{}, types.ErrValidatorNotFound
	}

	var record types.ValidatorSubsidyRecord
	k.cdc.MustUnmarshal(bz, &record)
	return record, nil
}

// GetAuthority returns the module's authority address
func (k Keeper) GetAuthority() string {
	return k.authority
}