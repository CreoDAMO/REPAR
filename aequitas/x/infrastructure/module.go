package infrastructure

import (
        "context"

        "cosmossdk.io/core/appmodule"
        "github.com/cosmos/cosmos-sdk/codec"

        "github.com/CreoDAMO/REPAR/aequitas/x/infrastructure/keeper"
        "github.com/CreoDAMO/REPAR/aequitas/x/infrastructure/types"
)

var (
        _ appmodule.AppModule       = AppModule{}
        _ appmodule.HasBeginBlocker = AppModule{}
)

type AppModule struct {
        cdc    codec.Codec
        keeper keeper.Keeper
}

func NewAppModule(cdc codec.Codec, keeper keeper.Keeper) AppModule {
        return AppModule{
                cdc:    cdc,
                keeper: keeper,
        }
}

func (AppModule) Name() string { return types.ModuleName }

func (am AppModule) ConsensusVersion() uint64 { return 1 }

func (am AppModule) BeginBlock(ctx context.Context) error {
        return am.keeper.CheckAndProvision(ctx)
}

func (am AppModule) IsOnePerModuleType() {}

func (am AppModule) IsAppModule() {}
