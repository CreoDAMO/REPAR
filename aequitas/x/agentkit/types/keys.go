package types

const (
	// ModuleName defines the module name
	ModuleName = "agentkit"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName
)

// AgentKey generates store key for agent
func AgentKey(agentID string) []byte {
	return []byte("agent:" + agentID)
}

// Agent status constants
const (
	AgentStatusActive    = "active"
	AgentStatusPaused    = "paused"
	AgentStatusCompleted = "completed"
)
