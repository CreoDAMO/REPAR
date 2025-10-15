package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/aequitas/aequitas/x/defendant/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the defendant MsgServer interface
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// RecordPayment records a financial payment from a defendant
func (ms msgServer) RecordPayment(goCtx context.Context, msg *types.MsgRecordPayment) (*types.MsgRecordPaymentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate authority
	if ms.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.authority, msg.Authority)
	}

	// Get defendant to verify it exists
	defendant, err := ms.Keeper.GetDefendant(ctx, msg.DefendantId)
	if err != nil {
		return nil, err
	}

	// Create payment record
	payment := types.Payment{
		Id:          fmt.Sprintf("%s-%d", msg.DefendantId, ctx.BlockHeight()),
		DefendantId: msg.DefendantId,
		Amount:      msg.Amount,
		Method:      msg.Method,
		EvidenceCid: msg.EvidenceCid,
		Description: msg.Description,
		Timestamp:   ctx.BlockTime(),
	}

	// Record payment
	if err := ms.Keeper.RecordPayment(ctx, payment); err != nil {
		return nil, err
	}

	// Emit event
	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			"payment_recorded",
			sdk.NewAttribute("defendant_id", msg.DefendantId),
			sdk.NewAttribute("amount", msg.Amount.String()),
			sdk.NewAttribute("payment_id", payment.Id),
		),
	)

	return &types.MsgRecordPaymentResponse{
		PaymentId:     payment.Id,
		RemainingDebt: defendant.RemainingLiability,
	}, nil
}

// RecordNonMonetaryContribution records non-monetary contributions (cultural artifacts, land, education, etc.)
func (ms msgServer) RecordNonMonetaryContribution(goCtx context.Context, msg *types.MsgRecordNonMonetaryContribution) (*types.MsgRecordNonMonetaryContributionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate authority
	if ms.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.authority, msg.Authority)
	}

	// Record contribution
	if err := ms.Keeper.RecordNonMonetaryContribution(
		ctx,
		msg.DefendantId,
		msg.ContributionType,
		msg.EstimatedValue,
		msg.Description,
		msg.EvidenceCid,
	); err != nil {
		return nil, err
	}

	// Get updated defendant
	defendant, err := ms.Keeper.GetDefendant(ctx, msg.DefendantId)
	if err != nil {
		return nil, err
	}

	// Emit event
	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			"non_monetary_contribution_recorded",
			sdk.NewAttribute("defendant_id", msg.DefendantId),
			sdk.NewAttribute("contribution_type", msg.ContributionType),
			sdk.NewAttribute("estimated_value", msg.EstimatedValue.String()),
		),
	)

	return &types.MsgRecordNonMonetaryContributionResponse{
		RemainingDebt: defendant.RemainingLiability,
	}, nil
}

// UpdateDefendantStatus updates the compliance status of a defendant (Active, Engaged, Non-Compliant, Settled)
func (ms msgServer) UpdateDefendantStatus(goCtx context.Context, msg *types.MsgUpdateDefendantStatus) (*types.MsgUpdateDefendantStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate authority
	if ms.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.authority, msg.Authority)
	}

	// Update status
	if err := ms.Keeper.UpdateDefendantStatus(ctx, msg.DefendantId, msg.Status); err != nil {
		return nil, err
	}

	// Emit event
	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			"defendant_status_updated",
			sdk.NewAttribute("defendant_id", msg.DefendantId),
			sdk.NewAttribute("status", msg.Status.String()),
		),
	)

	return &types.MsgUpdateDefendantStatusResponse{}, nil
}
