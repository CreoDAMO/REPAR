package validatorsubsidy

import (
        "cosmossdk.io/core/appmodule"
        "cosmossdk.io/depinject"
        storetypes "cosmossdk.io/store/types"
        "github.com/cosmos/cosmos-sdk/codec"

        "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/keeper"
        "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

var _ appmodule.AppModule = AppModule{}

type ModuleInputs struct {
        depinject.In

        Cdc        codec.Codec
        BankKeeper types.BankKeeper

        KvStoreKey *storetypes.KVStoreKey `optional:"true"`
}

type ModuleOutputs struct {
        depinject.Out

        Keeper *keeper.Keeper
        Module appmodule.AppModule
}

func ProvideModule(in ModuleInputs) ModuleOutputs {
        // If no store key provided, get it from the runtime
        storeKey := in.KvStoreKey
        if storeKey == nil {
                storeKey = storetypes.NewKVStoreKey(types.ModuleName)
        }

        k := keeper.NewKeeper(
                in.Cdc,
                storeKey,
                in.BankKeeper,
        )

        m := NewAppModule(*k)

        return ModuleOutputs{
                Keeper: k,
                Module: m,
        }
}
