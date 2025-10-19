package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/legacy"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	legacy.RegisterAminoMsg(cdc, &MsgInitializeEndowment{}, "founderendowment/InitializeEndowment")
	legacy.RegisterAminoMsg(cdc, &MsgDistributeYield{}, "founderendowment/DistributeYield")
	legacy.RegisterAminoMsg(cdc, &MsgUpdateDistributionConfig{}, "founderendowment/UpdateDistributionConfig")
	legacy.RegisterAminoMsg(cdc, &MsgRenewEndowment{}, "founderendowment/RenewEndowment")
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgInitializeEndowment{},
		&MsgDistributeYield{},
		&MsgUpdateDistributionConfig{},
		&MsgRenewEndowment{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
