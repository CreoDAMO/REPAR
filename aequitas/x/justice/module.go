package justice

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

        "github.com/CreoDAMO/REPAR/aequitas/x/justice/keeper"
        "github.com/CreoDAMO/REPAR/aequitas/x/justice/types"
)

var (
        _ module.AppModuleBasic = AppModule{}
        _ module.HasGenesis     = AppModule{}
        _ module.HasServices    = AppModule{}
        _ appmodule.AppModule   = AppModule{}
)

const ModuleName = "justice"

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
        // Initialize genesis state with 131 trillion REPAR initial supply
        initialSupply := math.NewInt(131000000000000) // 131 trillion
        defaultGenesis := types.GenesisState{
                Statistics: types.BurnStatistics{
                        TotalBurned:    math.ZeroInt(),
                        TotalUsdValue:  math.LegacyZeroDec(),
                        CurrentSupply:  initialSupply,
                        InitialSupply:  initialSupply,
                        TotalBurns:     0,
                        LastBurnTimestamp: 0,
                },
                Burns: []types.JusticeBurn{},
                InitialSupply: initialSupply,
        }
        return cdc.MustMarshalJSON(&defaultGenesis)
}

func (am AppModule) ValidateGenesis(cdc codec.JSONCodec, _ client.TxEncodingConfig, bz json.RawMessage) error {
        var data types.GenesisState
        if err := cdc.UnmarshalJSON(bz, &data); err != nil {
                return fmt.Errorf("failed to unmarshal %s genesis state: %w", ModuleName, err)
        }
        // Add more validation logic here if needed in the future
        return nil
}

func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, data json.RawMessage) {
        var genesisState types.GenesisState
        cdc.MustUnmarshalJSON(data, &genesisState)
        // Set genesis state to keeper
        am.keeper.SetBurnStatistics(ctx, genesisState.Statistics)
        am.keeper.SetBurns(ctx, genesisState.Burns)
}

func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
        burns, err := am.keeper.ListBurns(ctx)
        if err != nil {
                panic(err)
        }

        stats, err := am.keeper.GetBurnStatistics(ctx)
        if err != nil {
                stats = types.BurnStatistics{
                        TotalBurned:    math.ZeroInt(),
                        TotalUsdValue:  math.LegacyZeroDec(),
                        CurrentSupply:  math.NewInt(131000000000000),
                        InitialSupply:  math.NewInt(131000000000000),
                        TotalBurns:     0,
                        LastBurnTimestamp: 0,
                }
        }

        gs := &types.GenesisState{
                Statistics:    stats,
                Burns:         burns,
                InitialSupply: stats.InitialSupply,
        }
        return cdc.MustMarshalJSON(gs)
}

func (am AppModule) ConsensusVersion() uint64 { return 1 }