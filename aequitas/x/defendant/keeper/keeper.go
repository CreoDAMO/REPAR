package keeper

import (
	"context"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/defendant/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string

	// Collections for state management
	Defendants collections.Map[string, types.Defendant]
	Payments   collections.Map[string, types.Payment]
	Schema     collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		Defendants:   collections.NewMap(sb, collections.NewPrefix(0), "defendants", collections.StringKey, codec.CollValue[types.Defendant](cdc)),
		Payments:     collections.NewMap(sb, collections.NewPrefix(1), "payments", collections.StringKey, codec.CollValue[types.Payment](cdc)),
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
	return sdkCtx.Logger().With("module", "x/defendant")
}

// GetDefendant retrieves a defendant by ID
func (k Keeper) GetDefendant(ctx context.Context, id string) (types.Defendant, error) {
	defendant, err := k.Defendants.Get(ctx, id)
	if err != nil {
		return types.Defendant{}, fmt.Errorf("defendant not found: %s", id)
	}
	return defendant, nil
}

// SetDefendant stores a defendant
func (k Keeper) SetDefendant(ctx context.Context, defendant types.Defendant) error {
	return k.Defendants.Set(ctx, defendant.Id, defendant)
}

// ListDefendants returns all defendants
func (k Keeper) ListDefendants(ctx context.Context) ([]types.Defendant, error) {
	var defendants []types.Defendant
	err := k.Defendants.Walk(ctx, nil, func(key string, value types.Defendant) (bool, error) {
		defendants = append(defendants, value)
		return false, nil
	})
	return defendants, err
}

// RecordPayment records a payment from a defendant and reduces their liability
func (k Keeper) RecordPayment(ctx context.Context, payment types.Payment) error {
	// Get defendant
	defendant, err := k.GetDefendant(ctx, payment.DefendantId)
	if err != nil {
		return err
	}

	// Update defendant's total paid and remaining liability
	defendant.TotalPaid = defendant.TotalPaid.Add(payment.Amount)
	defendant.RemainingLiability = defendant.LiabilityAmount.Sub(defendant.TotalPaid)

	// Check if fully settled
	if defendant.RemainingLiability.LTE(math.ZeroInt()) {
		defendant.Status = types.DefendantStatus_DEFENDANT_STATUS_SETTLED
		defendant.RemainingLiability = math.ZeroInt()
	}

	// Save payment
	if err := k.Payments.Set(ctx, payment.Id, payment); err != nil {
		return err
	}

	// Update defendant
	return k.SetDefendant(ctx, defendant)
}

// GetTotalLiability calculates total outstanding liability across all defendants
func (k Keeper) GetTotalLiability(ctx context.Context) (total, paid, remaining math.Int, err error) {
	total = math.ZeroInt()
	paid = math.ZeroInt()
	remaining = math.ZeroInt()

	err = k.Defendants.Walk(ctx, nil, func(key string, value types.Defendant) (bool, error) {
		total = total.Add(value.LiabilityAmount)
		paid = paid.Add(value.TotalPaid)
		remaining = remaining.Add(value.RemainingLiability)
		return false, nil
	})

	return total, paid, remaining, err
}

// RecordNonMonetaryContribution records non-monetary contributions (for African nations, etc.)
func (k Keeper) RecordNonMonetaryContribution(ctx context.Context, defendantId string, contributionType string, estimatedValue math.Int, description string, evidenceCid string) error {
	defendant, err := k.GetDefendant(ctx, defendantId)
	if err != nil {
		return err
	}

	// Create non-monetary contribution record
	contribution := types.NonMonetaryContribution{
		Id:               fmt.Sprintf("%s-%d", defendantId, len(defendant.NonMonetaryContributions)),
		DefendantId:      defendantId,
		ContributionType: contributionType,
		EstimatedValue:   estimatedValue,
		Description:      description,
		EvidenceCid:      evidenceCid,
		Timestamp:        sdk.UnwrapSDKContext(ctx).BlockTime(),
	}

	// Add to defendant's contributions
	defendant.NonMonetaryContributions = append(defendant.NonMonetaryContributions, &contribution)
	defendant.TotalPaid = defendant.TotalPaid.Add(estimatedValue)
	defendant.RemainingLiability = defendant.LiabilityAmount.Sub(defendant.TotalPaid)

	// Check if fully settled
	if defendant.RemainingLiability.LTE(math.ZeroInt()) {
		defendant.Status = types.DefendantStatus_DEFENDANT_STATUS_SETTLED
		defendant.RemainingLiability = math.ZeroInt()
	}

	return k.SetDefendant(ctx, defendant)
}

// UpdateDefendantStatus updates the compliance status of a defendant
func (k Keeper) UpdateDefendantStatus(ctx context.Context, defendantId string, status types.DefendantStatus) error {
	defendant, err := k.GetDefendant(ctx, defendantId)
	if err != nil {
		return err
	}

	defendant.Status = status
	return k.SetDefendant(ctx, defendant)
}