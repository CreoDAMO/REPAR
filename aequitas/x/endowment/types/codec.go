package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgDepositToEndowment{}, "endowment/DepositToEndowment", nil)
	cdc.RegisterConcrete(&MsgDistributeYield{}, "endowment/DistributeYield", nil)
	cdc.RegisterConcrete(&MsgRebalanceStrategies{}, "endowment/RebalanceStrategies", nil)
	cdc.RegisterConcrete(&MsgUpdateStrategyAllocation{}, "endowment/UpdateStrategyAllocation", nil)
	cdc.RegisterConcrete(&MsgDistributeToSocialPrograms{}, "endowment/DistributeToSocialPrograms", nil)
	cdc.RegisterConcrete(&MsgUpdateParams{}, "endowment/UpdateParams", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDepositToEndowment{},
		&MsgDistributeYield{},
		&MsgRebalanceStrategies{},
		&MsgUpdateStrategyAllocation{},
		&MsgDistributeToSocialPrograms{},
		&MsgUpdateParams{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
