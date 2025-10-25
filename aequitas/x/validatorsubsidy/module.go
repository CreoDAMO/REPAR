package validatorsubsidy

import (
	"context"
	"encoding/json"
	"fmt"

	"cosmossdk.io/core/appmodule"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"

	"github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/keeper"
	"github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

var (
	_ module.AppModuleBasic      = AppModule{}
	_ module.HasGenesis          = AppModule{}
	_ module.HasServices         = AppModule{}
	_ appmodule.AppModule        = AppModule{}
)

const ModuleName = "validatorsubsidy"

type AppModuleBasic struct{}

func (AppModuleBasic) Name() string { return ModuleName }

func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {}

func (AppModuleBasic) RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	types.RegisterInterfaces(registry)
}

func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
	if err := types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx)); err != nil {
		panic(err)
	}
}

type AppModule struct {
	AppModuleBasic
	keeper keeper.Keeper
}

func NewAppModule(keeper keeper.Keeper) AppModule {
	return AppModule{
		keeper: keeper,
	}
}

func (am AppModule) IsOnePerModuleType() {}
func (am AppModule) IsAppModule()        {}

func (am AppModule) RegisterServices(cfg module.Configurator) {
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper, am.keeper.GetAuthority()))
	types.RegisterQueryServer(cfg.QueryServer(), keeper.NewQueryServerImpl(am.keeper))
}

func (am AppModule) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	return cdc.MustMarshalJSON(&types.GenesisState{
		Pool: types.ValidatorSubsidyPool{
			TotalAllocated:   math.ZeroInt(),
			MonthlyBudget:    math.NewInt(1000000000000), // 1M REPAR per month for subsidies
			EmergencyReserve: math.NewInt(500000000000),  // 500K REPAR emergency reserve
			LastDistribution: 0,
		},
		Validators: []types.ValidatorSubsidyRecord{},
		Payments:   []types.SubsidyPayment{},
		Schedule: types.SubsidyDistributionSchedule{
			DistributionIntervalSeconds: 2592000, // 30 days
			NextDistribution:            0,
			AutoDistribute:              true,
			MinValidatorUptimePercent:   "95.0",
		},
	})
}

func (am AppModule) ValidateGenesis(cdc codec.JSONCodec, _ client.TxEncodingConfig, bz json.RawMessage) error {
	var data types.GenesisState
	if err := cdc.UnmarshalJSON(bz, &data); err != nil {
		return fmt.Errorf("failed to unmarshal %s genesis state: %w", ModuleName, err)
	}
	return nil
}

func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, data json.RawMessage) {
	var genesisState types.GenesisState
	cdc.MustUnmarshalJSON(data, &genesisState)

	// Register validators
	for _, validator := range genesisState.Validators {
		if err := am.keeper.RegisterValidator(ctx, validator); err != nil {
			panic(err)
		}
	}

	// Note: Pool, Schedule, and Payments would need collections.Item or collections.Map 
	// defined in the keeper if you want to use them. For now, we'll skip those.
}

func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	validators, err := am.keeper.ListValidators(ctx)
	if err != nil {
		panic(err)
	}

	gs := &types.GenesisState{
		Pool: types.ValidatorSubsidyPool{
			TotalAllocated:   math.ZeroInt(),
			MonthlyBudget:    math.NewInt(1000000000000),
			EmergencyReserve: math.NewInt(500000000000),
			LastDistribution: 0,
		},
		Validators: validators,
		Payments:   []types.SubsidyPayment{},
		Schedule: types.SubsidyDistributionSchedule{
			DistributionIntervalSeconds: 2592000,
			NextDistribution:            0,
			AutoDistribute:              true,
			MinValidatorUptimePercent:   "95.0",
		},
	}
	return cdc.MustMarshalJSON(gs)
}

func (am AppModule) ConsensusVersion() uint64 { return 1 }
