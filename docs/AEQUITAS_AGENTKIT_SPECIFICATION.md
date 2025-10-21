# Aequitas AgentKit - Autonomous Justice Agents

## Overview

The Aequitas AgentKit is a sovereign alternative to Coinbase's AgentKit, specifically designed for the Aequitas Protocol. It enables the creation and management of autonomous, on-chain "Justice Agents" that can execute complex, multi-year enforcement missions.

## Why Superior to Coinbase AgentKit

| Feature | Coinbase AgentKit | Aequitas AgentKit |
|---------|-------------------|-------------------|
| **Sovereignty** | Depends on Coinbase APIs & Base L2 | **Native to Aequitas L1** - Cannot be shut down |
| **Tools** | Generic DeFi (swap, send) | **Justice-specific** (arbitration, asset freezing, burns) |
| **Intelligence** | Standard LLMs | **NVIDIA NIM + Poly-Mind** fine-tuned on forensic audit |
| **Autonomy** | Semi-autonomous, requires user triggers | **Fully autonomous** with own wallets & long-term objectives |
| **Multi-Chain** | EVM-only | **IBC + CCTP native** |
| **Purpose** | Consumer DeFi tasks | **Global legal & financial warfare** |

---

## Architecture

### Core Components

#### 1. Agent Factory (Smart Contract)
- Deploys Justice Agents
- Accepts `$REPAR` funding
- Configures agent objectives
- Manages agent lifecycle

#### 2. Agent Brain (NVIDIA NIM Microservice)
- Fine-tuned AI models
- Advanced reasoning & planning
- Legal strategy optimization
- Autonomous decision-making

#### 3. Justice Tools (Protocol-Native Functions)
- `tool_legal_arbitrage_analyzer`: Optimal jurisdiction selection
- `tool_evidence_verifier`: IFR provenance verification
- `tool_arbitration_filer`: Auto-generate and file claims
- `tool_asset_freezer`: Multi-jurisdiction asset freezing
- `tool_threat_monitor`: Threat detection & NFT minting
- `tool_governance_voter`: DAO participation
- `tool_burn_repar`: Execute Justice Burns
- `tool_evidence_collector`: Gather on-chain evidence

#### 4. Agent Wallet (Smart Contract Wallet)
- On-chain identity
- Autonomous transaction signing
- Rule-based spending limits
- Multi-sig security
- Immutable rules (e.g., "no settle below 90%")

---

## Module Structure

### Cosmos SDK Module: `x/agentkit`

```
aequitas/x/agentkit/
├── keeper/
│   ├── keeper.go                # Core keeper logic
│   ├── agent.go                 # Agent lifecycle management
│   ├── tools.go                 # Justice tools implementation
│   └── wallet.go                # Agent wallet management
├── types/
│   ├── agent.go                 # Agent data structures
│   ├── tools.go                 # Tool definitions
│   ├── wallet.go                # Wallet types
│   ├── messages.go              # Transaction messages
│   └── genesis.go               # Genesis state
├── client/
│   └── cli/
│       ├── tx.go                # Transaction CLI
│       └── query.go             # Query CLI
└── module.go                    # Module definition
```

---

## Agent Data Structures

### Agent Definition

```go
// aequitas/x/agentkit/types/agent.go

package types

import (
    sdk "github.com/cosmos/cosmos-sdk/types"
)

type Agent struct {
    ID          string         // Unique agent identifier
    Creator     string         // Creator address
    Name        string         // Agent name (e.g., "Gladstone Hunter")
    Objectives  string         // Mission objectives
    Budget      sdk.Coins      // $REPAR allocated
    Wallet      AgentWallet    // Agent's smart contract wallet
    Brain       BrainConfig    // NVIDIA NIM configuration
    Status      AgentStatus    // Active, Paused, Completed
    CreatedAt   int64          // Unix timestamp
    LastAction  int64          // Last action timestamp
    Stats       AgentStats     // Performance statistics
}

type AgentWallet struct {
    Address     sdk.AccAddress // Wallet address
    Rules       []WalletRule   // Spending rules
    MultiSig    MultiSigConfig // Multi-sig configuration
}

type BrainConfig struct {
    NIMEndpoint string         // NVIDIA NIM API endpoint
    ModelID     string         // Fine-tuned model identifier
    APIKey      string         // Encrypted API key
}

type AgentStatus string

const (
    StatusActive    AgentStatus = "active"
    StatusPaused    AgentStatus = "paused"
    StatusCompleted AgentStatus = "completed"
    StatusFailed    AgentStatus = "failed"
)

type AgentStats struct {
    ActionsExecuted  int64      // Total actions
    AssetsFrozen     sdk.Coins  // Total assets frozen
    ClaimsFiled      int        // Arbitration claims filed
    BurnsExecuted    sdk.Coins  // REPAR burned
    SuccessRate      sdk.Dec    // Success rate percentage
}

type WalletRule struct {
    RuleType    string         // "max_spend", "min_settlement", etc.
    Value       string         // Rule value
    Enforced    bool           // Whether rule is enforced
}
```

---

## Justice Tools Implementation

### Tool Interface

```go
// aequitas/x/agentkit/types/tools.go

package types

import (
    sdk "github.com/cosmos/cosmos-sdk/types"
)

type JusticeTool interface {
    Name() string
    Description() string
    Execute(ctx sdk.Context, agent Agent, params ToolParams) (ToolResult, error)
    Validate(params ToolParams) error
}

type ToolParams map[string]interface{}

type ToolResult struct {
    Success     bool
    Data        interface{}
    GasUsed     uint64
    Events      []sdk.Event
    NextAction  string          // Suggested next action
}
```

### Example Tool: Legal Arbitrage Analyzer

```go
// aequitas/x/agentkit/keeper/tools.go

package keeper

import (
    sdk "github.com/cosmos/cosmos-sdk/types"
    "github.com/aequitasprotocol/aequitas/x/agentkit/types"
)

type LegalArbitrageAnalyzer struct {
    keeper Keeper
}

func NewLegalArbitrageAnalyzer(k Keeper) *LegalArbitrageAnalyzer {
    return &LegalArbitrageAnalyzer{keeper: k}
}

func (t *LegalArbitrageAnalyzer) Name() string {
    return "tool_legal_arbitrage_analyzer"
}

func (t *LegalArbitrageAnalyzer) Description() string {
    return "Analyzes defendants and recommends optimal filing jurisdictions"
}

func (t *LegalArbitrageAnalyzer) Execute(
    ctx sdk.Context,
    agent types.Agent,
    params types.ToolParams,
) (types.ToolResult, error) {
    // Extract defendant ID
    defendantID := params["defendant_id"].(string)
    
    // Query defendant data
    defendant, err := t.keeper.GetDefendant(ctx, defendantID)
    if err != nil {
        return types.ToolResult{Success: false}, err
    }
    
    // Analyze jurisdictions
    jurisdictions := t.analyzeJurisdictions(ctx, defendant)
    
    // Rank by success probability
    ranked := t.rankBySuccessProbability(jurisdictions)
    
    // Generate recommendation
    recommendation := types.JurisdictionRecommendation{
        Primary:     ranked[0],
        Alternatives: ranked[1:3],
        Reasoning:   t.generateReasoning(ranked[0]),
    }
    
    return types.ToolResult{
        Success: true,
        Data:    recommendation,
        NextAction: "tool_arbitration_filer",
    }, nil
}

func (t *LegalArbitrageAnalyzer) analyzeJurisdictions(
    ctx sdk.Context,
    defendant types.Defendant,
) []types.Jurisdiction {
    jurisdictions := []types.Jurisdiction{}
    
    // Check defendant's corporate structure
    for _, entity := in range defendant.CorporateEntities {
        // Find registration jurisdictions
        jur := t.keeper.GetJurisdictionByCountry(ctx, entity.Country)
        
        // Assess based on multiple factors
        score := t.calculateJurisdictionScore(ctx, jur, defendant)
        
        jur.Score = score
        jurisdictions = append(jurisdictions, jur)
    }
    
    return jurisdictions
}

func (t *LegalArbitrageAnalyzer) calculateJurisdictionScore(
    ctx sdk.Context,
    jurisdiction types.Jurisdiction,
    defendant types.Defendant,
) sdk.Dec {
    score := sdk.ZeroDec()
    
    // Factor 1: Statute of limitations (30%)
    if !jurisdiction.StatuteOfLimitations {
        score = score.Add(sdk.NewDec(30))
    }
    
    // Factor 2: Recognition of genocide claims (40%)
    if jurisdiction.RecognizesGenocide {
        score = score.Add(sdk.NewDec(40))
    }
    
    // Factor 3: Asset recovery success rate (20%)
    successRate := t.keeper.GetHistoricalSuccessRate(ctx, jurisdiction.ID)
    score = score.Add(successRate.Mul(sdk.NewDec(20)))
    
    // Factor 4: Enforcement mechanisms (10%)
    if jurisdiction.HasStrongEnforcement {
        score = score.Add(sdk.NewDec(10))
    }
    
    return score
}
```

### Tool: Arbitration Filer

```go
// tool_arbitration_filer.go

type ArbitrationFiler struct {
    keeper Keeper
}

func (t *ArbitrationFiler) Name() string {
    return "tool_arbitration_filer"
}

func (t *ArbitrationFiler) Execute(
    ctx sdk.Context,
    agent types.Agent,
    params types.ToolParams,
) (types.ToolResult, error) {
    // Generate arbitration demand
    demand := t.generateArbitrationDemand(
        ctx,
        params["defendant_id"].(string),
        params["jurisdiction"].(string),
        params["liability_amount"].(sdk.Coins),
    )
    
    // File on-chain
    claimID := t.keeper.FileClaim(ctx, demand)
    
    // Emit event
    ctx.EventManager().EmitEvent(
        sdk.NewEvent(
            "arbitration_filed",
            sdk.NewAttribute("agent_id", agent.ID),
            sdk.NewAttribute("claim_id", claimID),
            sdk.NewAttribute("defendant", params["defendant_id"].(string)),
        ),
    )
    
    return types.ToolResult{
        Success: true,
        Data: map[string]string{
            "claim_id": claimID,
        },
        NextAction: "tool_asset_freezer",
    }, nil
}

func (t *ArbitrationFiler) generateArbitrationDemand(
    ctx sdk.Context,
    defendantID string,
    jurisdiction string,
    liability sdk.Coins,
) types.ArbitrationDemand {
    // Load forensic audit evidence
    evidence := t.keeper.GetDefendantEvidence(ctx, defendantID)
    
    return types.ArbitrationDemand{
        Claimant:     "Aequitas Protocol DAO",
        Defendant:    defendantID,
        Jurisdiction: jurisdiction,
        LiabilityAmount: liability,
        LegalBasis:   []string{
            "UN Genocide Convention",
            "Unjust enrichment",
            "Erga omnes obligations",
        },
        Evidence:     evidence,
        GeneratedBy:  "Aequitas AgentKit",
    }
}
```

### Tool: Asset Freezer

```go
// tool_asset_freezer.go

type AssetFreezer struct {
    keeper Keeper
}

func (t *AssetFreezer) Execute(
    ctx sdk.Context,
    agent types.Agent,
    params types.ToolParams,
) (types.ToolResult, error) {
    defendantID := params["defendant_id"].(string)
    
    // Get defendant's known assets
    assets := t.keeper.GetDefendantAssets(ctx, defendantID)
    
    // Initiate freeze requests across jurisdictions
    freezeRequests := []types.FreezeRequest{}
    
    for _, asset := range assets {
        request := types.FreezeRequest{
            AssetID:      asset.ID,
            Jurisdiction: asset.Jurisdiction,
            Grounds:      "Pending arbitration claim",
            RequestedBy:  agent.ID,
        }
        
        // Submit to relevant jurisdiction's module
        err := t.keeper.SubmitFreezeRequest(ctx, request)
        if err == nil {
            freezeRequests = append(freezeRequests, request)
        }
    }
    
    // Update agent stats
    agent.Stats.AssetsFrozen = agent.Stats.AssetsFrozen.Add(
        t.calculateTotalAssetValue(assets)...
    )
    t.keeper.UpdateAgent(ctx, agent)
    
    return types.ToolResult{
        Success: true,
        Data: map[string]interface{}{
            "freeze_requests": len(freezeRequests),
            "total_value": t.calculateTotalAssetValue(assets),
        },
        NextAction: "tool_threat_monitor",
    }, nil
}
```

---

## Agent Keeper Methods

```go
// aequitas/x/agentkit/keeper/agent.go

package keeper

import (
    sdk "github.com/cosmos/cosmos-sdk/types"
    "github.com/aequitasprotocol/aequitas/x/agentkit/types"
)

// CreateAgent deploys a new Justice Agent
func (k Keeper) CreateAgent(
    ctx sdk.Context,
    creator sdk.AccAddress,
    name string,
    objectives string,
    budget sdk.Coins,
    brainConfig types.BrainConfig,
) (types.Agent, error) {
    // Validate budget
    if !budget.IsAllPositive() {
        return types.Agent{}, types.ErrInvalidBudget
    }
    
    // Transfer REPAR to agent wallet
    agentWallet := k.createAgentWallet(ctx, creator)
    err := k.bankKeeper.SendCoins(ctx, creator, agentWallet.Address, budget)
    if err != nil {
        return types.Agent{}, err
    }
    
    // Create agent
    agent := types.Agent{
        ID:         k.generateAgentID(ctx),
        Creator:    creator.String(),
        Name:       name,
        Objectives: objectives,
        Budget:     budget,
        Wallet:     agentWallet,
        Brain:      brainConfig,
        Status:     types.StatusActive,
        CreatedAt:  ctx.BlockTime().Unix(),
        Stats:      types.AgentStats{},
    }
    
    // Store agent
    store := ctx.KVStore(k.storeKey)
    bz := k.cdc.MustMarshal(&agent)
    store.Set(types.AgentKey(agent.ID), bz)
    
    // Emit event
    ctx.EventManager().EmitEvent(
        sdk.NewEvent(
            "agent_created",
            sdk.NewAttribute("agent_id", agent.ID),
            sdk.NewAttribute("creator", creator.String()),
            sdk.NewAttribute("budget", budget.String()),
        ),
    )
    
    return agent, nil
}

// ExecuteAgentAction runs an agent action autonomously
func (k Keeper) ExecuteAgentAction(
    ctx sdk.Context,
    agentID string,
) error {
    agent, err := k.GetAgent(ctx, agentID)
    if err != nil {
        return err
    }
    
    if agent.Status != types.StatusActive {
        return types.ErrAgentNotActive
    }
    
    // Call NVIDIA NIM brain for next action
    action, err := k.queryAgentBrain(ctx, agent)
    if err != nil {
        return err
    }
    
    // Execute the determined action
    tool := k.GetTool(action.ToolName)
    result, err := tool.Execute(ctx, agent, action.Params)
    if err != nil {
        agent.Status = types.StatusFailed
        k.UpdateAgent(ctx, agent)
        return err
    }
    
    // Update agent stats
    agent.Stats.ActionsExecuted++
    agent.LastAction = ctx.BlockTime().Unix()
    k.UpdateAgent(ctx, agent)
    
    // Schedule next action if suggested
    if result.NextAction != "" {
        k.ScheduleAgentAction(ctx, agentID, result.NextAction)
    }
    
    return nil
}

func (k Keeper) createAgentWallet(
    ctx sdk.Context,
    creator sdk.AccAddress,
) types.AgentWallet {
    // Generate unique wallet address
    seed := append(creator.Bytes(), ctx.BlockTime().String()...)
    address := sdk.AccAddress(crypto.AddressHash(seed))
    
    return types.AgentWallet{
        Address: address,
        Rules: []types.WalletRule{
            {
                RuleType: "min_settlement",
                Value:    "90",  // No settle below 90%
                Enforced: true,
            },
            {
                RuleType: "max_daily_spend",
                Value:    "10000",  // Max 10,000 REPAR/day
                Enforced: true,
            },
        },
        MultiSig: types.MultiSigConfig{
            Threshold: 1,
            Signers:   []string{creator.String()},
        },
    }
}
```

---

## Python Integration Layer

```python
# agentkit/python_integration.py
"""
Python integration layer for Aequitas AgentKit
Allows Python scripts to interact with Justice Agents
"""

import requests
import json
from typing import Dict, List, Optional

class AequitasAgentKit:
    """
    Python SDK for interacting with Aequitas Justice Agents
    """
    
    def __init__(self, rpc_endpoint: str, api_key: str = None):
        self.rpc = rpc_endpoint
        self.api_key = api_key
        
    def create_agent(
        self,
        creator_address: str,
        name: str,
        objectives: str,
        budget_repar: int,
        private_key: str
    ) -> Dict:
        """
        Deploy a new Justice Agent
        
        Args:
            creator_address: Creator's blockchain address
            name: Agent name
            objectives: Mission objectives
            budget_repar: REPAR budget allocation
            private_key: Creator's private key for signing
            
        Returns:
            Dict with agent details
        """
        # Build transaction
        tx = {
            "type": "create_agent",
            "creator": creator_address,
            "name": name,
            "objectives": objectives,
            "budget": f"{budget_repar}repar",
            "brain_config": {
                "nim_endpoint": "https://api.nvidia.com/nim",
                "model_id": "aequitas-justice-v1"
            }
        }
        
        # Sign and broadcast
        result = self._sign_and_broadcast(tx, private_key)
        
        return result
    
    def get_agent_status(self, agent_id: str) -> Dict:
        """
        Query agent status
        
        Args:
            agent_id: Agent identifier
            
        Returns:
            Agent status and statistics
        """
        response = requests.get(
            f"{self.rpc}/aequitas/agentkit/v1/agents/{agent_id}"
        )
        
        return response.json()
    
    def execute_agent_action(self, agent_id: str) -> Dict:
        """
        Trigger agent to execute its next autonomous action
        
        Args:
            agent_id: Agent identifier
            
        Returns:
            Action execution result
        """
        response = requests.post(
            f"{self.rpc}/aequitas/agentkit/v1/agents/{agent_id}/execute"
        )
        
        return response.json()
    
    def list_agents(self, creator: Optional[str] = None) -> List[Dict]:
        """
        List all agents or agents by creator
        
        Args:
            creator: Optional creator address filter
            
        Returns:
            List of agents
        """
        url = f"{self.rpc}/aequitas/agentkit/v1/agents"
        if creator:
            url += f"?creator={creator}"
        
        response = requests.get(url)
        return response.json()["agents"]
    
    def pause_agent(self, agent_id: str, private_key: str) -> Dict:
        """
        Pause an active agent
        
        Args:
            agent_id: Agent to pause
            private_key: Creator's private key
            
        Returns:
            Update confirmation
        """
        tx = {
            "type": "pause_agent",
            "agent_id": agent_id
        }
        
        return self._sign_and_broadcast(tx, private_key)
    
    def _sign_and_broadcast(self, tx: Dict, private_key: str) -> Dict:
        """Sign and broadcast transaction"""
        # Implementation would use cosmos SDK signing
        # Placeholder for now
        pass

# Example Usage
if __name__ == "__main__":
    # Initialize SDK
    agentkit = AequitasAgentKit(rpc_endpoint="https://rpc.aequitas.io")
    
    # Deploy Gladstone Hunter agent
    agent = agentkit.create_agent(
        creator_address="aequitas1...",
        name="Gladstone Hunter",
        objectives="""
        Enforce $850M liability against Gladstone Dynasty.
        Use Legal Arbitrage Analyzer to find optimal jurisdictions.
        File arbitration demands.
        Monitor assets for dissipation.
        Participate in governance votes related to this defendant.
        Report progress weekly.
        Do not settle for less than 90% without final approval.
        """,
        budget_repar=10_000,
        private_key="..."
    )
    
    print(f"Agent deployed: {agent['agent_id']}")
    
    # Agent will now autonomously execute its mission
```

---

## Frontend Integration

```typescript
// frontend/src/services/agentKitService.ts

export class AgentKitService {
  private rpcEndpoint: string;
  
  constructor(rpcEndpoint: string) {
    this.rpcEndpoint = rpcEndpoint;
  }
  
  async createAgent(params: {
    name: string;
    objectives: string;
    budget: number;
  }): Promise<Agent> {
    const response = await fetch(`${this.rpcEndpoint}/api/agentkit/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
    return response.json();
  }
  
  async getAgentStats(agentId: string): Promise<AgentStats> {
    const response = await fetch(
      `${this.rpcEndpoint}/api/agentkit/agents/${agentId}/stats`
    );
    
    return response.json();
  }
  
  async listMyAgents(): Promise<Agent[]> {
    const response = await fetch(
      `${this.rpcEndpoint}/api/agentkit/my-agents`
    );
    
    return response.json();
  }
}
```

---

## Security Considerations

### Wallet Rules Enforcement
- All wallet rules are enforced at the keeper level
- Rules cannot be modified after agent creation
- Multi-sig required for high-value operations

### Agent Brain Security
- NVIDIA NIM API keys encrypted at rest
- Rate limiting on brain queries
- Audit log of all brain decisions

### Budget Controls
- Daily spending limits enforced
- Emergency pause functionality
- Creator can always pause/terminate agent

---

## Example: Gladstone Hunter Agent

```python
# Deploy the Gladstone Hunter
gladstone_hunter = agentkit.create_agent(
    creator_address="aequitas1descendant...",
    name="Gladstone Dynasty Enforcer",
    objectives="""
    PRIMARY OBJECTIVE: Enforce $850,000,000 liability against Gladstone Dynasty descendants.
    
    STRATEGY:
    1. Use tool_legal_arbitrage_analyzer to identify optimal jurisdictions
    2. File arbitration demands in top 3 jurisdictions
    3. Monitor Gladstone family assets using tool_threat_monitor
    4. Initiate asset freezes if dissipation detected
    5. Participate in DAO governance votes related to this defendant
    6. Execute Justice Burns on successful recoveries
    
    CONSTRAINTS:
    - Do not settle for less than 90% ($765M) without creator approval
    - Report progress every 7 days
    - Allocate max 1,000 REPAR/week for filing fees
    - Escalate to creator if legal obstacles encountered
    
    SUCCESS CRITERIA:
    - Full $850M recovery OR
    - 90%+ settlement approved by creator OR
    - 10-year mission completion with documented best-effort
    """,
    budget_repar=10_000,  # 10,000 REPAR for 10-year mission
    private_key=creator_key
)

# Agent will now autonomously execute for years
print(f"Gladstone Hunter deployed: {gladstone_hunter['agent_id']}")
print("Mission will execute autonomously. Check status anytime:")
print(f"  agentkit.get_agent_status('{gladstone_hunter['agent_id']}')")
```

---

## Conclusion

The Aequitas AgentKit provides fully autonomous, on-chain agents capable of executing complex legal and financial operations over multi-year timescales. Unlike centralized alternatives, these agents cannot be shut down and operate with complete sovereignty on the Aequitas L1 blockchain.
