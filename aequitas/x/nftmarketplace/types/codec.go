package types

import (
        "github.com/cosmos/cosmos-sdk/codec"
        codectypes "github.com/cosmos/cosmos-sdk/codec/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
        cdc.RegisterConcrete(&MsgListNFT{}, "nftmarketplace/ListNFT", nil)
        cdc.RegisterConcrete(&MsgBuyNFT{}, "nftmarketplace/BuyNFT", nil)
        cdc.RegisterConcrete(&MsgCancelListing{}, "nftmarketplace/CancelListing", nil)
}

func RegisterInterfaces(registry codectypes.InterfaceRegistry) {
        registry.RegisterImplementations((*sdk.Msg)(nil),
                &MsgListNFT{},
                &MsgBuyNFT{},
                &MsgCancelListing{},
        )
        msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
        amino     = codec.NewLegacyAmino()
        ModuleCdc = codec.NewProtoCodec(codectypes.NewInterfaceRegistry())
)

func init() {
        RegisterCodec(amino)
        sdk.RegisterLegacyAminoCodec(amino)
        amino.Seal()
}
