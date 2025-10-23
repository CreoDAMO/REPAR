package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
)

type msgServer struct {
	Keeper
}

func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (m msgServer) DepositToEndowment(ctx context.Context, msg *types.MsgDepositToEndowment) (*types.MsgDepositToEndowmentResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	amount := msg.Amount.Amount

	if err := m.Keeper.DepositToEndowment(ctx, msg.EndowmentId, amount); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"endowment_deposit",
			sdk.NewAttribute("endowment_id", msg.EndowmentId),
			sdk.NewAttribute("amount", amount.String()),
		),
	)

	return &types.MsgDepositToEndowmentResponse{}, nil
}

func (m msgServer) DistributeYield(ctx context.Context, msg *types.MsgDistributeYield) (*types.MsgDistributeYieldResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	distributedAmount, err := m.Keeper.DistributeYield(ctx, msg.EndowmentId)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"yield_distributed",
			sdk.NewAttribute("endowment_id", msg.EndowmentId),
			sdk.NewAttribute("amount", distributedAmount.String()),
		),
	)

	return &types.MsgDistributeYieldResponse{
		AmountDistributed: distributedAmount,
	}, nil
}

func (m msgServer) RebalanceStrategies(ctx context.Context, msg *types.MsgRebalanceStrategies) (*types.MsgRebalanceStrategiesResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"strategies_rebalanced",
			sdk.NewAttribute("endowment_id", msg.EndowmentId),
		),
	)

	return &types.MsgRebalanceStrategiesResponse{}, nil
}

func (m msgServer) UpdateStrategyAllocation(ctx context.Context, msg *types.MsgUpdateStrategyAllocation) (*types.MsgUpdateStrategyAllocationResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	if msg.NewAllocationPercentage > 100 {
		return nil, types.ErrInvalidAllocation
	}

	strategy, err := m.Keeper.InvestmentStrategies.Get(ctx, msg.StrategyId)
	if err != nil {
		return nil, types.ErrInvalidStrategy
	}

	strategy.AllocationPercentage = msg.NewAllocationPercentage

	if err := m.Keeper.InvestmentStrategies.Set(ctx, msg.StrategyId, strategy); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"strategy_allocation_updated",
			sdk.NewAttribute("strategy_id", msg.StrategyId),
			sdk.NewAttribute("new_allocation", fmt.Sprintf("%d", msg.NewAllocationPercentage)),
		),
	)

	return &types.MsgUpdateStrategyAllocationResponse{}, nil
}

func (m msgServer) DistributeToSocialPrograms(ctx context.Context, msg *types.MsgDistributeToSocialPrograms) (*types.MsgDistributeToSocialProgramsResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	totalDistributed, err := m.Keeper.DistributeToSocialPrograms(ctx)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"social_programs_distributed",
			sdk.NewAttribute("total_amount", totalDistributed.String()),
		),
	)

	return &types.MsgDistributeToSocialProgramsResponse{
		TotalDistributed: totalDistributed,
	}, nil
}

func (m msgServer) UpdateParams(ctx context.Context, msg *types.MsgUpdateParams) (*types.MsgUpdateParamsResponse, error) {
	if m.authority != msg.Authority {
		return nil, fmt.Errorf("unauthorized: expected %s, got %s", m.authority, msg.Authority)
	}

	if err := m.Keeper.Params.Set(ctx, msg.Params); err != nil {
		return nil, err
	}

	return &types.MsgUpdateParamsResponse{}, nil
}
