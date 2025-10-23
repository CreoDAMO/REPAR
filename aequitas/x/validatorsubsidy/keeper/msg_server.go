package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

type msgServer struct {
	Keeper
}

func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (ms msgServer) RegisterValidator(ctx context.Context, msg *types.MsgRegisterValidator) (*types.MsgRegisterValidatorResponse, error) {
	// Calculate monthly allocation based on USD cost
	// For simplicity, using a fixed conversion rate (this should be dynamic in production)
	// Assuming 1 REPAR = $18.33, infrastructure cost of $80/month = ~4.36 REPAR
	// Emergency buffer of $40/month = ~2.18 REPAR
	// Total: ~6.54 REPAR per month per validator

	// Parse USD costs (stored as strings like "80.00")
	infraCost := msg.InfrastructureCostUsd
	bufferCost := msg.EmergencyBufferUsd

	// For this implementation, we'll use a simple allocation
	// In production, this would use a price oracle
	monthlyAllocation := math.NewInt(6540000) // ~6.54 REPAR in urepar (microREPAR)

	record := types.ValidatorSubsidyRecord{
		ValidatorAddress:       msg.ValidatorAddress,
		OperatorAddress:        msg.OperatorAddress,
		MonthlyAllocation:      monthlyAllocation,
		TotalReceived:          math.ZeroInt(),
		Status:                 types.ValidatorStatus_VALIDATOR_STATUS_ACTIVE,
		InfrastructureCostUsd:  infraCost,
		EmergencyBufferUsd:     bufferCost,
	}

	if err := ms.Keeper.RegisterValidator(ctx, record); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"validator_registered_for_subsidy",
			sdk.NewAttribute("validator", msg.ValidatorAddress),
			sdk.NewAttribute("operator", msg.OperatorAddress),
			sdk.NewAttribute("monthly_allocation", monthlyAllocation.String()),
		),
	)

	return &types.MsgRegisterValidatorResponse{}, nil
}

func (ms msgServer) DistributeSubsidies(ctx context.Context, msg *types.MsgDistributeSubsidies) (*types.MsgDistributeSubsidiesResponse, error) {
	// Verify authority
	if ms.authority != msg.Authority {
		return nil, types.ErrUnauthorized
	}

	count, total, err := ms.Keeper.DistributeMonthlySubsidies(ctx)
	if err != nil {
		return nil, err
	}

	return &types.MsgDistributeSubsidiesResponse{
		ValidatorsPaid:  count,
		TotalDistributed: total,
	}, nil
}

func (ms msgServer) ClaimEmergencyFunds(ctx context.Context, msg *types.MsgClaimEmergencyFunds) (*types.MsgClaimEmergencyFundsResponse, error) {
	if err := ms.Keeper.ClaimEmergencyFunds(ctx, msg.OperatorAddress, msg.Amount, msg.Reason); err != nil {
		return nil, err
	}

	return &types.MsgClaimEmergencyFundsResponse{}, nil
}

func (ms msgServer) UpdateValidatorStatus(ctx context.Context, msg *types.MsgUpdateValidatorStatus) (*types.MsgUpdateValidatorStatusResponse, error) {
	// Verify authority
	if ms.authority != msg.Authority {
		return nil, types.ErrUnauthorized
	}

	if err := ms.Keeper.UpdateValidatorStatus(ctx, msg.ValidatorAddress, msg.Status); err != nil {
		return nil, err
	}

	return &types.MsgUpdateValidatorStatusResponse{}, nil
}
