
package types

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Agent represents an autonomous Justice Agent
type Agent struct {
	ID          string         `json:"id"`
	Creator     string         `json:"creator"`
	Wallet      string         `json:"wallet"`
	Objective   string         `json:"objective"`
	Budget      sdk.Coins      `json:"budget"`
	Rules       []string       `json:"rules"`
	Status      string         `json:"status"` // active, paused, completed
	CreatedAt   time.Time      `json:"created_at"`
	LastAction  time.Time      `json:"last_action"`
	MissionLog  []MissionEntry `json:"mission_log"`
}

// MissionEntry logs agent actions
type MissionEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Tool      string    `json:"tool"`
	Action    string    `json:"action"`
	Result    string    `json:"result"`
}

// AgentKey generates store key for agent
func AgentKey(agentID string) []byte {
	return []byte("agent:" + agentID)
}

// Constants
const (
	AgentStatusActive    = "active"
	AgentStatusPaused    = "paused"
	AgentStatusCompleted = "completed"
)
