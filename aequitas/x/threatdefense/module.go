
package threatdefense

import (
        "cosmossdk.io/core/appmodule"
        "github.com/cosmos/cosmos-sdk/codec"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/cosmos/cosmos-sdk/types/module"
)

var (
        _ module.AppModule      = AppModule{}
        _ module.AppModuleBasic = AppModuleBasic{}
)

// AppModuleBasic defines the basic application module used by the threatdefense module.
type AppModuleBasic struct {
        cdc codec.Codec
}

// AppModule implements an application module for the threatdefense module.
type AppModule struct {
        AppModuleBasic
        keeper Keeper
}

// NewAppModule creates a new AppModule object
func NewAppModule(cdc codec.Codec, keeper Keeper) AppModule {
        return AppModule{
                AppModuleBasic: AppModuleBasic{cdc: cdc},
                keeper:         keeper,
        }
}

// RegisterServices registers module services.
func (am AppModule) RegisterServices(cfg module.Configurator) {
        // Register msg server
        // Register query server
}

// BeginBlock performs module initialization logic at the beginning of every block
func (am AppModule) BeginBlock(ctx sdk.Context, req appmodule.BeginBlock) error {
        // Execute automated threat detection
        am.keeper.ExecuteThreatDefenseCycle(ctx)
        return nil
}

// IsOnePerModuleType implements the depinject.OnePerModuleType interface.
func (am AppModule) IsOnePerModuleType() {}

// IsAppModule implements the appmodule.AppModule interface.
func (am AppModule) IsAppModule() {}

// ConsensusVersion implements AppModule/ConsensusVersion.
func (AppModule) ConsensusVersion() uint64 { return 1 }

// Name returns the module's name.
func (AppModuleBasic) Name() string {
        return "threatdefense"
}
