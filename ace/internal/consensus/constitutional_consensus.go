package consensus

import (
        "crypto/ed25519"
        "encoding/json"
        "errors"
        "fmt"
        "sync"
        "time"
)

type ConstitutionalAction struct {
        ID          string                 `json:"id"`
        Type        ActionType             `json:"type"`
        Proposal    map[string]interface{} `json:"proposal"`
        ProposerID  string                 `json:"proposer_id"`
        Timestamp   time.Time              `json:"timestamp"`
        Status      ActionStatus           `json:"status"`
        Votes       map[string]*Vote       `json:"votes"`
        Result      *ActionResult          `json:"result,omitempty"`
}

type ActionType string

const (
        ActionEnforcement     ActionType = "enforcement"
        ActionGovernance      ActionType = "governance"
        ActionSecurity        ActionType = "security"
        ActionConstitutional  ActionType = "constitutional"
        ActionEmergency       ActionType = "emergency"
)

type ActionStatus string

const (
        StatusPending   ActionStatus = "pending"
        StatusVoting    ActionStatus = "voting"
        StatusApproved  ActionStatus = "approved"
        StatusRejected  ActionStatus = "rejected"
        StatusExecuted  ActionStatus = "executed"
        StatusFailed    ActionStatus = "failed"
)

type Vote struct {
        ValidatorID string    `json:"validator_id"`
        Approve     bool      `json:"approve"`
        Reason      string    `json:"reason,omitempty"`
        Signature   []byte    `json:"signature"`
        Timestamp   time.Time `json:"timestamp"`
}

type ActionResult struct {
        Success     bool      `json:"success"`
        Output      string    `json:"output,omitempty"`
        Error       string    `json:"error,omitempty"`
        ExecutedAt  time.Time `json:"executed_at"`
        ExecutedBy  string    `json:"executed_by"`
}

type APEXValidator struct {
        ID        string            `json:"id"`
        PublicKey ed25519.PublicKey `json:"public_key"`
        Weight    float64           `json:"weight"`
        Active    bool              `json:"active"`
        LastVote  time.Time         `json:"last_vote"`
}

type ConstitutionalConsensus struct {
        validators     map[string]*APEXValidator
        actions        map[string]*ConstitutionalAction
        threshold      float64
        axioms         []ConstitutionalAxiom
        mu             sync.RWMutex
        actionTimeout  time.Duration
}

type ConstitutionalAxiom struct {
        ID          int    `json:"id"`
        Name        string `json:"name"`
        Description string `json:"description"`
        Weight      float64 `json:"weight"`
        Immutable   bool   `json:"immutable"`
}

var DefaultAxioms = []ConstitutionalAxiom{
        {1, "HUMAN_DIGNITY", "Every human being has inherent dignity and worth", 1.0, true},
        {2, "ECONOMIC_JUSTICE", "Historical economic injustices must be rectified", 1.0, true},
        {3, "SOVEREIGNTY", "The Protocol operates as a sovereign digital jurisdiction", 1.0, true},
        {4, "TRANSPARENCY", "All enforcement actions must be publicly auditable", 1.0, true},
        {5, "DUE_PROCESS", "Defendants have the right to respond to claims", 1.0, true},
        {6, "IMMUTABILITY", "Core constitutional axioms cannot be modified", 1.0, true},
        {7, "PROPORTIONALITY", "Enforcement must be proportional to historical harm", 1.0, true},
        {8, "EVIDENCE_BASED", "All claims must be supported by cryptographic evidence", 1.0, true},
        {9, "NON_DISCRIMINATION", "Protocol treats all defendants equally under the law", 1.0, true},
        {10, "SUCCESSION_RIGHTS", "Descendants inherit claims from ancestors", 1.0, true},
        {11, "COMPOUND_INTEREST", "Historical debts accrue interest per established law", 1.0, true},
        {12, "DECENTRALIZATION", "No single entity can control the Protocol", 1.0, true},
        {13, "CENSORSHIP_RESISTANCE", "The Protocol cannot be shut down by external actors", 1.0, true},
        {14, "PRIVACY", "Claimant identities protected unless voluntarily disclosed", 1.0, true},
        {15, "AUDITABILITY", "All transactions are publicly verifiable", 1.0, true},
        {16, "NATURAL_LAW", "Protocol authority derives from Natural Law principles", 1.0, true},
        {17, "HUMAN_AI_SYMBIOSIS", "AI amplifies human judgment, never replaces it", 1.0, true},
        {18, "DEFENSIVE_POSTURE", "Offensive action only in response to aggression", 1.0, true},
        {19, "LEGAL_COMPLIANCE", "FRE 901 evidence standards for all records", 1.0, true},
        {20, "QUANTUM_SECURITY", "Post-quantum cryptography for long-term security", 1.0, true},
        {21, "MESH_RESILIENCE", "Multi-layer communication for unkillable network", 1.0, true},
        {22, "VALIDATOR_INTEGRITY", "Validators must be cryptographically authenticated", 1.0, true},
        {23, "GENESIS_BINDING", "All nodes bound to genesis configuration", 1.0, true},
        {24, "DISTRIBUTED_CONSENSUS", "Constitutional decisions require validator majority", 1.0, true},
        {25, "SOVEREIGN_AI", "AI systems operate independently of external APIs", 1.0, true},
}

func NewConstitutionalConsensus(threshold float64) *ConstitutionalConsensus {
        if threshold < 0.5 || threshold > 1.0 {
                threshold = 0.67
        }

        return &ConstitutionalConsensus{
                validators:    make(map[string]*APEXValidator),
                actions:       make(map[string]*ConstitutionalAction),
                threshold:     threshold,
                axioms:        DefaultAxioms,
                actionTimeout: 24 * time.Hour,
        }
}

func (cc *ConstitutionalConsensus) RegisterValidator(id string, publicKey ed25519.PublicKey, weight float64) error {
        cc.mu.Lock()
        defer cc.mu.Unlock()

        if _, exists := cc.validators[id]; exists {
                return fmt.Errorf("validator %s already registered", id)
        }

        cc.validators[id] = &APEXValidator{
                ID:        id,
                PublicKey: publicKey,
                Weight:    weight,
                Active:    true,
                LastVote:  time.Time{},
        }

        return nil
}

func (cc *ConstitutionalConsensus) ProposeAction(action *ConstitutionalAction) error {
        cc.mu.Lock()
        defer cc.mu.Unlock()

        if _, exists := cc.validators[action.ProposerID]; !exists {
                return errors.New("proposer is not a registered validator")
        }

        if !cc.validateAgainstAxioms(action) {
                return errors.New("action violates constitutional axioms")
        }

        action.Status = StatusVoting
        action.Votes = make(map[string]*Vote)
        action.Timestamp = time.Now()
        cc.actions[action.ID] = action

        return nil
}

func VoteMessage(actionID, validatorID string, approve bool, reason string) []byte {
        return []byte(fmt.Sprintf("APEX_VOTE:%s:%s:%t:%s", actionID, validatorID, approve, reason))
}

func CreateVoteSignature(actionID, validatorID string, approve bool, reason string, privateKey ed25519.PrivateKey) []byte {
        message := VoteMessage(actionID, validatorID, approve, reason)
        return ed25519.Sign(privateKey, message)
}

func VerifyVoteSignature(actionID, validatorID string, approve bool, reason string, signature []byte, publicKey ed25519.PublicKey) bool {
        message := VoteMessage(actionID, validatorID, approve, reason)
        return ed25519.Verify(publicKey, message, signature)
}

func (cc *ConstitutionalConsensus) CastVote(actionID, validatorID string, approve bool, reason string, signature []byte) error {
        cc.mu.Lock()
        defer cc.mu.Unlock()

        action, exists := cc.actions[actionID]
        if !exists {
                return fmt.Errorf("action %s not found", actionID)
        }

        if action.Status != StatusVoting {
                return fmt.Errorf("action %s is not in voting status", actionID)
        }

        validator, exists := cc.validators[validatorID]
        if !exists {
                return fmt.Errorf("validator %s not registered", validatorID)
        }

        if !validator.Active {
                return fmt.Errorf("validator %s is not active", validatorID)
        }

        if _, alreadyVoted := action.Votes[validatorID]; alreadyVoted {
                return fmt.Errorf("validator %s has already voted on action %s", validatorID, actionID)
        }

        if len(signature) == 0 {
                return errors.New("signature is required")
        }

        if !VerifyVoteSignature(actionID, validatorID, approve, reason, signature, validator.PublicKey) {
                return errors.New("invalid vote signature - cryptographic verification failed")
        }

        action.Votes[validatorID] = &Vote{
                ValidatorID: validatorID,
                Approve:     approve,
                Reason:      reason,
                Signature:   signature,
                Timestamp:   time.Now(),
        }

        validator.LastVote = time.Now()

        cc.checkConsensus(action)

        return nil
}

func (cc *ConstitutionalConsensus) checkConsensus(action *ConstitutionalAction) {
        totalWeight := 0.0
        approveWeight := 0.0

        for id, validator := range cc.validators {
                if !validator.Active {
                        continue
                }
                totalWeight += validator.Weight

                if vote, voted := action.Votes[id]; voted && vote.Approve {
                        approveWeight += validator.Weight
                }
        }

        if totalWeight == 0 {
                return
        }

        approvalRatio := approveWeight / totalWeight

        if approvalRatio >= cc.threshold {
                action.Status = StatusApproved
                fmt.Printf("✅ Action %s APPROVED with %.2f%% consensus\n", action.ID, approvalRatio*100)
        } else if (1 - approvalRatio) > (1 - cc.threshold) {
                allVoted := len(action.Votes) == len(cc.validators)
                if allVoted {
                        action.Status = StatusRejected
                        fmt.Printf("❌ Action %s REJECTED with only %.2f%% approval\n", action.ID, approvalRatio*100)
                }
        }
}

func (cc *ConstitutionalConsensus) ExecuteAction(actionID, executorID string) (*ActionResult, error) {
        cc.mu.Lock()
        defer cc.mu.Unlock()

        action, exists := cc.actions[actionID]
        if !exists {
                return nil, fmt.Errorf("action %s not found", actionID)
        }

        if action.Status != StatusApproved {
                return nil, fmt.Errorf("action %s is not approved (status: %s)", actionID, action.Status)
        }

        result := &ActionResult{
                Success:    true,
                ExecutedAt: time.Now(),
                ExecutedBy: executorID,
        }

        switch action.Type {
        case ActionEnforcement:
                result.Output = fmt.Sprintf("Enforcement action executed: %v", action.Proposal)
        case ActionGovernance:
                result.Output = fmt.Sprintf("Governance change applied: %v", action.Proposal)
        case ActionSecurity:
                result.Output = fmt.Sprintf("Security measure implemented: %v", action.Proposal)
        case ActionEmergency:
                result.Output = fmt.Sprintf("Emergency action executed: %v", action.Proposal)
        default:
                result.Output = fmt.Sprintf("Action executed: %v", action.Proposal)
        }

        action.Status = StatusExecuted
        action.Result = result

        return result, nil
}

func (cc *ConstitutionalConsensus) validateAgainstAxioms(action *ConstitutionalAction) bool {
        for _, axiom := range cc.axioms {
                if !cc.checkAxiomCompliance(action, axiom) {
                        fmt.Printf("⚠️  Action %s violates Axiom %d: %s\n", action.ID, axiom.ID, axiom.Name)
                        return false
                }
        }
        return true
}

func (cc *ConstitutionalConsensus) checkAxiomCompliance(action *ConstitutionalAction, axiom ConstitutionalAxiom) bool {
        switch axiom.ID {
        case 6:
                if action.Type == ActionConstitutional {
                        if target, ok := action.Proposal["target_axiom"].(int); ok {
                                for _, a := range cc.axioms {
                                        if a.ID == target && a.Immutable {
                                                return false
                                        }
                                }
                        }
                }
        case 17:
                if requiresHuman, ok := action.Proposal["requires_human_approval"].(bool); ok {
                        if !requiresHuman && action.Type == ActionEnforcement {
                                return false
                        }
                }
        case 18:
                if isOffensive, ok := action.Proposal["is_offensive"].(bool); ok {
                        if isOffensive {
                                if _, hasAggressor := action.Proposal["responding_to_aggressor"]; !hasAggressor {
                                        return false
                                }
                        }
                }
        }
        return true
}

func (cc *ConstitutionalConsensus) GetActionStatus(actionID string) (*ConstitutionalAction, error) {
        cc.mu.RLock()
        defer cc.mu.RUnlock()

        action, exists := cc.actions[actionID]
        if !exists {
                return nil, fmt.Errorf("action %s not found", actionID)
        }

        return action, nil
}

func (cc *ConstitutionalConsensus) GetValidatorStats() map[string]interface{} {
        cc.mu.RLock()
        defer cc.mu.RUnlock()

        activeCount := 0
        totalWeight := 0.0

        for _, v := range cc.validators {
                if v.Active {
                        activeCount++
                        totalWeight += v.Weight
                }
        }

        return map[string]interface{}{
                "total_validators":    len(cc.validators),
                "active_validators":   activeCount,
                "total_voting_weight": totalWeight,
                "threshold":           cc.threshold,
                "pending_actions":     cc.countActionsByStatus(StatusVoting),
                "approved_actions":    cc.countActionsByStatus(StatusApproved),
                "executed_actions":    cc.countActionsByStatus(StatusExecuted),
        }
}

func (cc *ConstitutionalConsensus) countActionsByStatus(status ActionStatus) int {
        count := 0
        for _, action := range cc.actions {
                if action.Status == status {
                        count++
                }
        }
        return count
}

func (cc *ConstitutionalConsensus) ExportAxioms() ([]byte, error) {
        return json.MarshalIndent(cc.axioms, "", "  ")
}

func (cc *ConstitutionalConsensus) PruneExpiredActions() int {
        cc.mu.Lock()
        defer cc.mu.Unlock()

        pruned := 0
        cutoff := time.Now().Add(-cc.actionTimeout)

        for id, action := range cc.actions {
                if action.Status == StatusVoting && action.Timestamp.Before(cutoff) {
                        action.Status = StatusRejected
                        pruned++
                        fmt.Printf("⏰ Action %s expired and rejected\n", id)
                }
        }

        return pruned
}
