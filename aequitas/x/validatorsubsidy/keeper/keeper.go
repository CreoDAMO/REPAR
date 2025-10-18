package keeper

import (
	"context"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/aequitas/aequitas/x/validatorsubsidy/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string
	bankKeeper   types.BankKeeper

	// Collections for state management
	Pool       collections.Item[types.ValidatorSubsidyPool]
	Validators collections.Map[string, types.ValidatorSubsidyRecord]
	Payments   collections.Map[string, types.SubsidyPayment]
	Schedule   collections.Item[types.SubsidyDistributionSchedule]
	Schema     collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
	bankKeeper types.BankKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		bankKeeper:   bankKeeper,
		Pool:         collections.NewItem(sb, collections.NewPrefix(0), "pool", codec.CollValue[types.ValidatorSubsidyPool](cdc)),
		Validators:   collections.NewMap(sb, collections.NewPrefix(1), "validators", collections.StringKey, codec.CollValue[types.ValidatorSubsidyRecord](cdc)),
		Payments:     collections.NewMap(sb, collections.NewPrefix(2), "payments", collections.StringKey, codec.CollValue[types.SubsidyPayment](cdc)),
		Schedule:     collections.NewItem(sb, collections.NewPrefix(3), "schedule", codec.CollValue[types.SubsidyDistributionSchedule](cdc)),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

func (k Keeper) Logger(ctx context.Context) log.Logger {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	return sdkCtx.Logger().With("module", "x/validatorsubsidy")
}

// RegisterValidator registers a new validator for subsidy program
func (k Keeper) RegisterValidator(ctx context.Context, record types.ValidatorSubsidyRecord) error {
	// Check if already registered
	existing, err := k.Validators.Get(ctx, record.ValidatorAddress)
	if err == nil && existing.ValidatorAddress != "" {
		return fmt.Errorf("validator already registered: %s", record.ValidatorAddress)
	}

	record.Status = types.ValidatorStatus_VALIDATOR_STATUS_ACTIVE
	record.RegisteredAt = time.Now().Unix()
	record.TotalReceived = math.ZeroInt()

	return k.Validators.Set(ctx, record.ValidatorAddress, record)
}

// GetValidator retrieves validator subsidy record
func (k Keeper) GetValidator(ctx context.Context, address string) (types.ValidatorSubsidyRecord, error) {
	return k.Validators.Get(ctx, address)
}

// ListValidators returns all registered validators
func (k Keeper) ListValidators(ctx context.Context) ([]types.ValidatorSubsidyRecord, error) {
	var validators []types.ValidatorSubsidyRecord
	err := k.Validators.Walk(ctx, nil, func(key string, value types.ValidatorSubsidyRecord) (bool, error) {
		validators = append(validators, value)
		return false, nil
	})
	return validators, err
}

// DistributeMonthlySubsidies distributes subsidies to all active validators
func (k Keeper) DistributeMonthlySubsidies(ctx context.Context) (uint32, math.Int, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	var count uint32
	totalDistributed := math.ZeroInt()

	err := k.Validators.Walk(ctx, nil, func(key string, validator types.ValidatorSubsidyRecord) (bool, error) {
		// Only pay active validators
		if validator.Status != types.ValidatorStatus_VALIDATOR_STATUS_ACTIVE {
			return false, nil
		}

		// Check if payment is due (30 days since last payment)
		if validator.LastPayment > 0 {
			timeSinceLastPayment := time.Now().Unix() - validator.LastPayment
			if timeSinceLastPayment < 2592000 { // 30 days in seconds
				return false, nil
			}
		}

		// Calculate payment amount
		amount := validator.MonthlyAllocation
		if amount.IsZero() {
			return false, nil
		}

		// Send payment from module account to operator
		coins := sdk.NewCoins(sdk.NewCoin("urepar", amount))
		operatorAddr, err := sdk.AccAddressFromBech32(validator.OperatorAddress)
		if err != nil {
			k.Logger(ctx).Error("invalid operator address", "address", validator.OperatorAddress, "error", err)
			return false, nil
		}

		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, operatorAddr, coins); err != nil {
			k.Logger(ctx).Error("failed to send subsidy", "validator", validator.ValidatorAddress, "error", err)
			return false, nil
		}

		// Update validator record
		validator.TotalReceived = validator.TotalReceived.Add(amount)
		validator.LastPayment = time.Now().Unix()
		if err := k.Validators.Set(ctx, validator.ValidatorAddress, validator); err != nil {
			return false, err
		}

		// Record payment
		paymentId := fmt.Sprintf("%s-%d", validator.ValidatorAddress, time.Now().Unix())
		payment := types.SubsidyPayment{
			Id:               paymentId,
			ValidatorAddress: validator.ValidatorAddress,
			Amount:           amount,
			Timestamp:        time.Now().Unix(),
			Type:             types.PaymentType_PAYMENT_TYPE_MONTHLY_SUBSIDY,
			Notes:            "Monthly validator subsidy payment",
		}
		if err := k.Payments.Set(ctx, paymentId, payment); err != nil {
			return false, err
		}

		// Emit event
		sdkCtx.EventManager().EmitEvent(
			sdk.NewEvent(
				"validator_subsidy_distributed",
				sdk.NewAttribute("validator", validator.ValidatorAddress),
				sdk.NewAttribute("operator", validator.OperatorAddress),
				sdk.NewAttribute("amount", amount.String()),
				sdk.NewAttribute("type", "monthly_subsidy"),
			),
		)

		count++
		totalDistributed = totalDistributed.Add(amount)

		k.Logger(ctx).Info("Validator subsidy distributed",
			"validator", validator.ValidatorAddress,
			"amount", amount.String(),
		)

		return false, nil
	})

	// Update pool
	pool, err := k.Pool.Get(ctx)
	if err == nil {
		pool.LastDistribution = time.Now().Unix()
		k.Pool.Set(ctx, pool)
	}

	return count, totalDistributed, err
}

// ClaimEmergencyFunds allows validators to claim from emergency reserve
func (k Keeper) ClaimEmergencyFunds(ctx context.Context, operatorAddr string, amount math.Int, reason string) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	// Find validator by operator address
	var validatorRecord *types.ValidatorSubsidyRecord
	err := k.Validators.Walk(ctx, nil, func(key string, value types.ValidatorSubsidyRecord) (bool, error) {
		if value.OperatorAddress == operatorAddr {
			validatorRecord = &value
			return true, nil
		}
		return false, nil
	})
	if err != nil {
		return err
	}
	if validatorRecord == nil {
		return fmt.Errorf("validator not found for operator: %s", operatorAddr)
	}

	// Check if validator is active
	if validatorRecord.Status != types.ValidatorStatus_VALIDATOR_STATUS_ACTIVE {
		return fmt.Errorf("validator is not active")
	}

	// Check pool emergency reserve
	pool, err := k.Pool.Get(ctx)
	if err != nil {
		return fmt.Errorf("failed to get pool: %w", err)
	}
	if pool.EmergencyReserve.LT(amount) {
		return fmt.Errorf("insufficient emergency reserve")
	}

	// Send emergency funds
	coins := sdk.NewCoins(sdk.NewCoin("urepar", amount))
	recipientAddr, err := sdk.AccAddressFromBech32(operatorAddr)
	if err != nil {
		return err
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, recipientAddr, coins); err != nil {
		return fmt.Errorf("failed to send emergency funds: %w", err)
	}

	// Update validator record
	validatorRecord.TotalReceived = validatorRecord.TotalReceived.Add(amount)
	k.Validators.Set(ctx, validatorRecord.ValidatorAddress, *validatorRecord)

	// Update pool
	pool.EmergencyReserve = pool.EmergencyReserve.Sub(amount)
	k.Pool.Set(ctx, pool)

	// Record payment
	paymentId := fmt.Sprintf("emergency-%s-%d", validatorRecord.ValidatorAddress, time.Now().Unix())
	payment := types.SubsidyPayment{
		Id:               paymentId,
		ValidatorAddress: validatorRecord.ValidatorAddress,
		Amount:           amount,
		Timestamp:        time.Now().Unix(),
		Type:             types.PaymentType_PAYMENT_TYPE_EMERGENCY_EXPENSE,
		Notes:            reason,
	}
	k.Payments.Set(ctx, paymentId, payment)

	// Emit event
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"emergency_funds_claimed",
			sdk.NewAttribute("validator", validatorRecord.ValidatorAddress),
			sdk.NewAttribute("operator", operatorAddr),
			sdk.NewAttribute("amount", amount.String()),
			sdk.NewAttribute("reason", reason),
		),
	)

	k.Logger(ctx).Info("Emergency funds claimed",
		"validator", validatorRecord.ValidatorAddress,
		"amount", amount.String(),
		"reason", reason,
	)

	return nil
}

// GetPaymentHistory returns payment history
func (k Keeper) GetPaymentHistory(ctx context.Context, validatorAddr string) ([]types.SubsidyPayment, error) {
	var payments []types.SubsidyPayment
	err := k.Payments.Walk(ctx, nil, func(key string, value types.SubsidyPayment) (bool, error) {
		if validatorAddr == "" || value.ValidatorAddress == validatorAddr {
			payments = append(payments, value)
		}
		return false, nil
	})
	return payments, err
}

// UpdateValidatorStatus updates validator subsidy status
func (k Keeper) UpdateValidatorStatus(ctx context.Context, validatorAddr string, status types.ValidatorStatus) error {
	validator, err := k.Validators.Get(ctx, validatorAddr)
	if err != nil {
		return fmt.Errorf("validator not found: %s", validatorAddr)
	}

	validator.Status = status
	return k.Validators.Set(ctx, validatorAddr, validator)
}
