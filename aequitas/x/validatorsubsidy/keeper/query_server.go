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
	pool, err := qs.Keeper.Pool.Get(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryPoolResponse{
		Pool: pool,
	}, nil
}

func (qs queryServer) Validator(ctx context.Context, req *types.QueryValidatorRequest) (*types.QueryValidatorResponse, error) {
	validator, err := qs.Keeper.GetValidator(ctx, req.ValidatorAddress)
	if err != nil {
		return nil, types.ErrValidatorNotFound
	}

	return &types.QueryValidatorResponse{
		Validator: validator,
	}, nil
}

func (qs queryServer) AllValidators(ctx context.Context, req *types.QueryAllValidatorsRequest) (*types.QueryAllValidatorsResponse, error) {
	validators, err := qs.Keeper.ListValidators(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryAllValidatorsResponse{
		Validators: validators,
	}, nil
}

func (qs queryServer) Payments(ctx context.Context, req *types.QueryPaymentsRequest) (*types.QueryPaymentsResponse, error) {
	payments, err := qs.Keeper.GetPaymentHistory(ctx, req.ValidatorAddress)
	if err != nil {
		return nil, err
	}

	return &types.QueryPaymentsResponse{
		Payments: payments,
	}, nil
}

func (qs queryServer) Schedule(ctx context.Context, req *types.QueryScheduleRequest) (*types.QueryScheduleResponse, error) {
	schedule, err := qs.Keeper.Schedule.Get(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryScheduleResponse{
		Schedule: schedule,
	}, nil
}
