package keeper

import (
	"context"

	"github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

type queryServer struct {
	Keeper
}

func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

func (qs queryServer) Pool(ctx context.Context, req *types.QueryPoolRequest) (*types.QueryPoolResponse, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	pool, err := qs.Keeper.GetPool(sdkCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryPoolResponse{
		Pool: &pool,
	}, nil
}

func (qs queryServer) Validator(ctx context.Context, req *types.QueryValidatorRequest) (*types.QueryValidatorResponse, error) {
	validator, err := qs.Keeper.GetValidator(ctx, req.ValidatorAddress)
	if err != nil {
		return nil, types.ErrValidatorNotFound
	}

	return &types.QueryValidatorResponse{
		Validator: &validator,
	}, nil
}

func (qs queryServer) AllValidators(ctx context.Context, req *types.QueryAllValidatorsRequest) (*types.QueryAllValidatorsResponse, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	validators, err := qs.Keeper.ListValidators(sdkCtx)
	if err != nil {
		return nil, err
	}

	// Convert to pointer slice
	validatorPtrs := make([]*types.ValidatorSubsidyRecord, len(validators))
	for i := range validators {
		validatorPtrs[i] = &validators[i]
	}

	return &types.QueryAllValidatorsResponse{
		Validators: validatorPtrs,
	}, nil
}

func (qs queryServer) Payments(ctx context.Context, req *types.QueryPaymentsRequest) (*types.QueryPaymentsResponse, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	payments, err := qs.Keeper.GetPaymentHistory(sdkCtx, req.ValidatorAddress)
	if err != nil {
		return nil, err
	}

	// Convert to pointer slice
	paymentPtrs := make([]*types.SubsidyPayment, len(payments))
	for i := range payments {
		paymentPtrs[i] = &payments[i]
	}

	return &types.QueryPaymentsResponse{
		Payments: paymentPtrs,
	}, nil
}

func (qs queryServer) Schedule(ctx context.Context, req *types.QueryScheduleRequest) (*types.QueryScheduleResponse, error) {
	// Return a default schedule since Schedule field doesn't have Get method
	schedule := types.SubsidyDistributionSchedule{
		DistributionIntervalSeconds: 2592000,
		NextDistribution:            0,
		AutoDistribute:              true,
		MinValidatorUptimePercent:   "95.0",
	}

	return &types.QueryScheduleResponse{
		Schedule: &schedule,
	}, nil
}
