package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

// RegisterCodec registers the necessary interfaces and concrete types
// on the provided LegacyAmino codec.
func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgRegisterValidator{}, "validatorsubsidy/RegisterValidator", nil)
	cdc.RegisterConcrete(&MsgDistributeSubsidies{}, "validatorsubsidy/DistributeSubsidies", nil)
	cdc.RegisterConcrete(&MsgClaimEmergencyFunds{}, "validatorsubsidy/ClaimEmergencyFunds", nil)
	cdc.RegisterConcrete(&MsgUpdateValidatorStatus{}, "validatorsubsidy/UpdateValidatorStatus", nil)
}

// RegisterInterfaces registers the module's interface types
func RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRegisterValidator{},
		&MsgDistributeSubsidies{},
		&MsgClaimEmergencyFunds{},
		&MsgUpdateValidatorStatus{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
