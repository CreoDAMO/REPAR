package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/legacy"
	"github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

// RegisterLegacyAminoCodec registers the necessary x/dex interfaces and concrete types
// on the provided LegacyAmino codec. These types are used for Amino JSON serialization.
func RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	legacy.RegisterAminoMsg(cdc, &MsgCreatePool{}, "github.com/CreoDAMO/REPAR/aequitas/dex/MsgCreatePool")
	legacy.RegisterAminoMsg(cdc, &MsgAddLiquidity{}, "github.com/CreoDAMO/REPAR/aequitas/dex/MsgAddLiquidity")
	legacy.RegisterAminoMsg(cdc, &MsgRemoveLiquidity{}, "github.com/CreoDAMO/REPAR/aequitas/dex/MsgRemoveLiquidity")
	legacy.RegisterAminoMsg(cdc, &MsgSwap{}, "github.com/CreoDAMO/REPAR/aequitas/dex/MsgSwap")
}

// RegisterInterfaces registers the x/dex interfaces types with the interface registry
func RegisterInterfaces(registry types.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreatePool{},
		&MsgAddLiquidity{},
		&MsgRemoveLiquidity{},
		&MsgSwap{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
