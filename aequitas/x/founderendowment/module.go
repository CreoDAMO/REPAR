package founderendowment

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

	"github.com/aequitas/aequitas/x/founderendowment/keeper"
	"github.com/aequitas/aequitas/x/founderendowment/types"
)

var (
	_ module.AppModuleBasic = AppModule{}
	_ module.HasGenesis     = AppModule{}
	_ module.HasServices    = AppModule{}
	_ appmodule.AppModule   = AppModule{}
)

const ModuleName = "founderendowment"

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
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	types.RegisterQueryServer(cfg.QueryServer(), keeper.NewQueryServerImpl(am.keeper))
}

func (am AppModule) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	// 6% of 131T = 7.86T REPAR as principal
	principalAmount := math.NewInt(131_000_000_000_000).MulRaw(6).QuoRaw(100)

	return cdc.MustMarshalJSON(&types.GenesisState{
		Endowment: types.FounderEndowment{
			Id:               "founder_endowment",
			Principal:        principalAmount,
			YieldAccumulated: math.ZeroInt(),
			TargetApyBps:     450, // 4.5%
			LastYieldCalc:    0,
			UnlockTime:       0, // Will be set during InitGenesis
			IsLocked:         true,
			FounderAddress:   "", // Will be set from genesis
			RenewalCount:     0,
		},
		DistributionConfig: types.DistributionConfig{
			ProtocolPercentage: 90,
			FounderPercentage:  10,
		},
		ProtocolAllocation: types.ProtocolAllocation{
			DexLiquidityPercentage:     25,
			DaoTreasuryPercentage:      25,
			SocialEndowmentPercentage:  25,
			ValidatorSubsidyPercentage: 15,
		},
		Statistics: types.EndowmentStats{
			TotalPrincipal:        principalAmount,
			TotalYieldDistributed: math.ZeroInt(),
			TotalFounderDividends: math.ZeroInt(),
			TotalProtocolFunding:  math.ZeroInt(),
			DistributionCount:     0,
		},
		Distributions: []types.YieldDistribution{},
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

	// Set endowment
	if err := am.keeper.Endowment.Set(ctx, genesisState.Endowment); err != nil {
		panic(err)
	}

	// Set distribution config
	if err := am.keeper.DistributionConfig.Set(ctx, genesisState.DistributionConfig); err != nil {
		panic(err)
	}

	// Set protocol allocation
	if err := am.keeper.ProtocolAllocation.Set(ctx, genesisState.ProtocolAllocation); err != nil {
		panic(err)
	}

	// Set statistics
	if err := am.keeper.Statistics.Set(ctx, genesisState.Statistics); err != nil {
		panic(err)
	}

	// Set distribution events
	for _, dist := range genesisState.Distributions {
		if err := am.keeper.Distributions.Set(ctx, dist.Id, dist); err != nil {
			panic(err)
		}
	}
}

func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	endowment, err := am.keeper.Endowment.Get(ctx)
	if err != nil {
		panic(err)
	}

	distConfig, err := am.keeper.DistributionConfig.Get(ctx)
	if err != nil {
		panic(err)
	}

	protocolAlloc, err := am.keeper.ProtocolAllocation.Get(ctx)
	if err != nil {
		panic(err)
	}

	stats, err := am.keeper.Statistics.Get(ctx)
	if err != nil {
		panic(err)
	}

	// TODO: Implement method to list all distributions
	distributions := []types.YieldDistribution{}

	gs := &types.GenesisState{
		Endowment:          endowment,
		DistributionConfig: distConfig,
		ProtocolAllocation: protocolAlloc,
		Statistics:         stats,
		Distributions:      distributions,
	}
	return cdc.MustMarshalJSON(gs)
}

func (am AppModule) ConsensusVersion() uint64 { return 1 }
