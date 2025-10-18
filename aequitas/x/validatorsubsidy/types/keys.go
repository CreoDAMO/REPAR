package types

const (
	// ModuleName defines the module name
	ModuleName = "validatorsubsidy"
	// StoreKey defines the primary module store key
	StoreKey = ModuleName
	// RouterKey defines the module's message routing key
	RouterKey = ModuleName
	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// Event types
	EventTypeValidatorSubsidyPaid = "validator_subsidy_paid"

	// Event attributes
	AttributeKeyAmount    = "amount"
	AttributeKeyRecipient = "recipient"
	AttributeKeyTimestamp = "timestamp"
)

var (
	// ParamsKey is the key for module parameters
	ParamsKey = []byte{0x01}

	// LastDistributionKey stores the last subsidy distribution time
	LastDistributionKey = []byte{0x02}
)