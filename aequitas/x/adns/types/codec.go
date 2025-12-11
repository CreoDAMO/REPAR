package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRegisterDomain{},
		&MsgUpdateRecord{},
		&MsgTransferDomain{},
		&MsgFreezeDomain{},
	)
}

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgRegisterDomain{}, "adns/RegisterDomain", nil)
	cdc.RegisterConcrete(&MsgUpdateRecord{}, "adns/UpdateRecord", nil)
	cdc.RegisterConcrete(&MsgTransferDomain{}, "adns/TransferDomain", nil)
	cdc.RegisterConcrete(&MsgFreezeDomain{}, "adns/FreezeDomain", nil)
}
