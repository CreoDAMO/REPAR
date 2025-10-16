package dex

import (
	"context"
	"encoding/json"
	"fmt"

	"cosmossdk.io/core/appmodule"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/spf13/cobra"

	"aequitas/x/dex/keeper"
	"aequitas/x/dex/types"
)

var (
	_ module.AppModuleBasic = AppModule{}
	_ module.HasGenesis     = AppModule{}
	_ module.HasServices    = AppModule{}
	_ appmodule.AppModule   = AppModule{}
)

// AppModuleBasic defines the basic application module used in the application structure.
type AppModuleBasic struct{}

// Name returns the module name.
func (AppModuleBasic) Name() string {
	return types.ModuleName
}

// RegisterLegacyAminoCodec registers the module's types for the given codec.
func (am AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	types.RegisterLegacyAminoCodec(cdc)
}

// RegisterGRPCGatewayRoutes registers the gRPC Gateway routes for the module.
func (am AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
	if err := types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx)); err != nil {
		panic(fmt.Errorf("failed to register gRPC gateway routes: %w", err))
	}
}

// GetTxCmd returns the root tx command for the module.
func (am AppModuleBasic) GetTxCmd() *cobra.Command {
	return nil
}

// GetQueryCmd returns the root query command for the module.
func (am AppModuleBasic) GetQueryCmd() *cobra.Command {
	return nil
}

// AppModule implements an application module for the dex module.
type AppModule struct {
	AppModuleBasic

	cdc keeper.Keeper
	// TODO: Add other keepers relevant to the module
}

// NewAppModule creates a new AppModule object.
func NewAppModule(
	cdc keeper.Keeper,
	// TODO: Add other keepers relevant to the module
) AppModule {
	return AppModule{
		AppModuleBasic: AppModuleBasic{},
		cdc:            cdc,
	}
}

// RegisterServices registers a orm.ORM, isg.ISG, and gRPC services.
func (am AppModule) RegisterServices(cfg module.Configurator) {
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServer(am.cdc))
	types.RegisterQueryServer(cfg.QueryServer(), keeper.NewQueryServer(am.cdc))
}

// RegisterInAVLTree registers the module's types for the given codec.
func (am AppModule) RegisterInAVLTree(cdc *codec.LegacyAmino) {
	types.RegisterLegacyAminoCodec(cdc)
}

// ConsensusVersion implements ConsensusVersion.
func (AppModule) ConsensusVersion() uint64 {
	return 1
}

// ModuleManager implements the appmodule.AppModule interface.
func (am AppModule) Register(app *module.BasicManager) {
	app.Register(types.ModuleName, am)
}

// InitGenesis performs the module's genesis initialization. It returns no err.
func (am AppModule) InitGenesis(ctx context.Context, cdc codec.JSONCodec, ak interface{}, eventManager sdk.EventManagerI) error {
	// Set key-value pairs
	// var genesisState types.GenesisState
	// completed := am.cdc.GetGenesis().(types.GenesisState)
	// am.cdc.SetGenesis(genesisState)
	return am.cdc.InitGenesis(ctx, &genesisState)
}

// ExportGenesis performs the module's genesis export.
func (am AppModule) ExportGenesis(ctx context.Context, cdc codec.JSONCodec, eventManager sdk.EventManagerI) json.RawMessage {
	gs := am.cdc.ExportGenesis(ctx)
	return cdc.MustMarshalJSON(gs)
}

// RegisterGRPCService registers the gRPC services for the module.
func (am AppModule) RegisterGRPCService(accountKeeper types.AccountKeeper, bankKeeper types.BankKeeper) {
	// Register the gRPC query server.
	types.RegisterQueryServer(nil, keeper.NewQueryServer(am.cdc))
}

// GenerateGenesisFile generates the genesis file for the module.
func (am AppModule) GenerateGenesisFile() *types.GenesisState {
	return am.cdc.GetGenesis().(*types.GenesisState)
}

// SetGenesis sets the genesis state for the module.
func (am AppModule) SetGenesis(genesisState *types.GenesisState) {
	am.cdc.SetGenesis(genesisState)
}

// Equal checks if two genesis states are equal.
func (am AppModule) Equal(genState1, genState2 *types.GenesisState) bool {
	return am.cdc.Equal(genState1, genState2)
}

// DefaultGenesis returns the default genesis state for the module.
func (am AppModule) DefaultGenesis() json.RawMessage {
	return am.cdc.DefaultGenesis()
}

// ValidateGenesis validates the genesis state for the module.
func (am AppModule) ValidateGenesis(cdc codec.JSONCodec, config client.TxEncodingConfig, genState json.RawMessage) error {
	var genesisState types.GenesisState
	if err := cdc.UnmarshalJSON(genState, &genesisState); err != nil {
		return fmt.Errorf("failed to unmarshal genesis state: %w", err)
	}
	return am.cdc.ValidateGenesis(genesisState)
}