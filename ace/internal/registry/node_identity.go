package registry

import (
        "crypto/ed25519"
        "crypto/rand"
        "crypto/sha256"
        "encoding/base64"
        "encoding/hex"
        "encoding/json"
        "errors"
        "fmt"
        "os"
        "sync"
        "time"
)

type NodeIdentity struct {
        ID          string            `json:"id"`
        IP          string            `json:"ip"`
        PublicKey   ed25519.PublicKey `json:"public_key"`
        Signature   []byte            `json:"signature"`
        GenesisHash string            `json:"genesis_hash"`
        Moniker     string            `json:"moniker"`
        CreatedAt   time.Time         `json:"created_at"`
        LastSeen    time.Time         `json:"last_seen"`
        Status      NodeStatus        `json:"status"`
}

type NodeStatus string

const (
        StatusActive      NodeStatus = "active"
        StatusInactive    NodeStatus = "inactive"
        StatusUnverified  NodeStatus = "unverified"
        StatusCompromised NodeStatus = "compromised"
)

type NodeKeypair struct {
        PrivateKey ed25519.PrivateKey `json:"private_key"`
        PublicKey  ed25519.PublicKey  `json:"public_key"`
}

func GenerateNodeKeypair() (*NodeKeypair, error) {
        publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
        if err != nil {
                return nil, fmt.Errorf("failed to generate Ed25519 keypair: %w", err)
        }

        return &NodeKeypair{
                PrivateKey: privateKey,
                PublicKey:  publicKey,
        }, nil
}

func (kp *NodeKeypair) SaveToFile(path string) error {
        data := map[string]string{
                "private_key": base64.StdEncoding.EncodeToString(kp.PrivateKey),
                "public_key":  base64.StdEncoding.EncodeToString(kp.PublicKey),
        }

        jsonData, err := json.MarshalIndent(data, "", "  ")
        if err != nil {
                return err
        }

        return os.WriteFile(path, jsonData, 0600)
}

func LoadKeypairFromFile(path string) (*NodeKeypair, error) {
        data, err := os.ReadFile(path)
        if err != nil {
                return nil, err
        }

        var keyData map[string]string
        if err := json.Unmarshal(data, &keyData); err != nil {
                return nil, err
        }

        privateKey, err := base64.StdEncoding.DecodeString(keyData["private_key"])
        if err != nil {
                return nil, err
        }

        publicKey, err := base64.StdEncoding.DecodeString(keyData["public_key"])
        if err != nil {
                return nil, err
        }

        return &NodeKeypair{
                PrivateKey: privateKey,
                PublicKey:  publicKey,
        }, nil
}

func CreateNodeIdentity(nodeID, ip, moniker, genesisHash string, keypair *NodeKeypair) (*NodeIdentity, error) {
        message := fmt.Sprintf("%s:%s:%s:%s", nodeID, ip, moniker, genesisHash)
        signature := ed25519.Sign(keypair.PrivateKey, []byte(message))

        return &NodeIdentity{
                ID:          nodeID,
                IP:          ip,
                PublicKey:   keypair.PublicKey,
                Signature:   signature,
                GenesisHash: genesisHash,
                Moniker:     moniker,
                CreatedAt:   time.Now(),
                LastSeen:    time.Now(),
                Status:      StatusUnverified,
        }, nil
}

func (ni *NodeIdentity) Verify() bool {
        message := fmt.Sprintf("%s:%s:%s:%s", ni.ID, ni.IP, ni.Moniker, ni.GenesisHash)
        return ed25519.Verify(ni.PublicKey, []byte(message), ni.Signature)
}

func (ni *NodeIdentity) VerifyMessage(message, signature []byte) bool {
        return ed25519.Verify(ni.PublicKey, message, signature)
}

func (ni *NodeIdentity) PublicKeyHex() string {
        return hex.EncodeToString(ni.PublicKey)
}

func (ni *NodeIdentity) PublicKeyBase64() string {
        return base64.StdEncoding.EncodeToString(ni.PublicKey)
}

type SecureNodeRegistry struct {
        nodes           map[string]*NodeIdentity
        genesisHash     string
        genesisValidators map[string]bool
        mu              sync.RWMutex
}

func NewSecureNodeRegistry(genesisHash string, genesisValidators []string) *SecureNodeRegistry {
        validatorSet := make(map[string]bool)
        for _, v := range genesisValidators {
                validatorSet[v] = true
        }

        return &SecureNodeRegistry{
                nodes:           make(map[string]*NodeIdentity),
                genesisHash:     genesisHash,
                genesisValidators: validatorSet,
        }
}

func (sr *SecureNodeRegistry) RegisterNode(node *NodeIdentity) error {
        sr.mu.Lock()
        defer sr.mu.Unlock()

        if !node.Verify() {
                return errors.New("invalid node identity signature")
        }

        if node.GenesisHash != sr.genesisHash {
                return errors.New("node genesis hash does not match registry genesis")
        }

        pubKeyHex := node.PublicKeyHex()
        if !sr.genesisValidators[pubKeyHex] {
                return errors.New("node public key not found in genesis validator set")
        }

        if existing, exists := sr.nodes[node.ID]; exists {
                if existing.PublicKeyHex() != pubKeyHex {
                        return errors.New("node ID already registered with different public key - possible spoofing attempt")
                }
        }

        node.Status = StatusActive
        node.LastSeen = time.Now()
        sr.nodes[node.ID] = node

        return nil
}

type PendingChallenge struct {
        Challenge   []byte
        NodeID      string
        RemoteIP    string
        IssuedAt    time.Time
        ExpiresAt   time.Time
}

type ChallengeManager struct {
        pending map[string]*PendingChallenge
        used    map[string]bool
        mu      sync.RWMutex
}

func NewChallengeManager() *ChallengeManager {
        return &ChallengeManager{
                pending: make(map[string]*PendingChallenge),
                used:    make(map[string]bool),
        }
}

func (cm *ChallengeManager) IssueChallenge(nodeID, remoteIP string) ([]byte, error) {
        cm.mu.Lock()
        defer cm.mu.Unlock()
        
        challenge := make([]byte, 32)
        if _, err := rand.Read(challenge); err != nil {
                return nil, err
        }
        
        challengeID := hex.EncodeToString(challenge)
        
        cm.pending[challengeID] = &PendingChallenge{
                Challenge:  challenge,
                NodeID:     nodeID,
                RemoteIP:   remoteIP,
                IssuedAt:   time.Now(),
                ExpiresAt:  time.Now().Add(30 * time.Second),
        }
        
        return challenge, nil
}

func (cm *ChallengeManager) ValidateAndConsume(challenge []byte) (*PendingChallenge, error) {
        cm.mu.Lock()
        defer cm.mu.Unlock()
        
        challengeID := hex.EncodeToString(challenge)
        
        if cm.used[challengeID] {
                return nil, errors.New("challenge already used (replay attempt)")
        }
        
        pending, exists := cm.pending[challengeID]
        if !exists {
                return nil, errors.New("unknown challenge")
        }
        
        if time.Now().After(pending.ExpiresAt) {
                delete(cm.pending, challengeID)
                return nil, errors.New("challenge expired")
        }
        
        cm.used[challengeID] = true
        delete(cm.pending, challengeID)
        
        return pending, nil
}

func (cm *ChallengeManager) Cleanup() int {
        cm.mu.Lock()
        defer cm.mu.Unlock()
        
        now := time.Now()
        cleaned := 0
        
        for id, p := range cm.pending {
                if now.After(p.ExpiresAt) {
                        delete(cm.pending, id)
                        cleaned++
                }
        }
        
        if len(cm.used) > 10000 {
                cm.used = make(map[string]bool)
        }
        
        return cleaned
}

type ChallengeResponse struct {
        Challenge   []byte `json:"challenge"`
        Signature   []byte `json:"signature"`
}

func SignServerChallenge(challenge []byte, keypair *NodeKeypair) *ChallengeResponse {
        signature := ed25519.Sign(keypair.PrivateKey, challenge)
        return &ChallengeResponse{
                Challenge: challenge,
                Signature: signature,
        }
}

func (sr *SecureNodeRegistry) AuthenticateWithChallenge(cm *ChallengeManager, nodeID, remoteIP string, response *ChallengeResponse) (bool, error) {
        pending, err := cm.ValidateAndConsume(response.Challenge)
        if err != nil {
                return false, fmt.Errorf("challenge validation failed: %w", err)
        }
        
        if pending.NodeID != nodeID {
                return false, fmt.Errorf("challenge was issued for %s, not %s", pending.NodeID, nodeID)
        }
        
        if pending.RemoteIP != remoteIP {
                return false, fmt.Errorf("IP changed: challenge issued for %s, response from %s", pending.RemoteIP, remoteIP)
        }
        
        sr.mu.Lock()
        defer sr.mu.Unlock()
        
        node, exists := sr.nodes[nodeID]
        if !exists {
                return false, fmt.Errorf("node %s not registered", nodeID)
        }
        
        if node.IP != remoteIP {
                node.Status = StatusCompromised
                return false, fmt.Errorf("IP spoofing: registered %s, request from %s", node.IP, remoteIP)
        }
        
        if !ed25519.Verify(node.PublicKey, response.Challenge, response.Signature) {
                node.Status = StatusCompromised
                return false, errors.New("invalid signature - cryptographic verification failed")
        }
        
        node.Status = StatusActive
        node.LastSeen = time.Now()
        
        return true, nil
}

func LoadGenesisValidators(genesisPath string) (map[string]bool, string, error) {
        data, err := os.ReadFile(genesisPath)
        if err != nil {
                return nil, "", fmt.Errorf("failed to read genesis: %w", err)
        }
        
        hash := sha256.Sum256(data)
        genesisHash := hex.EncodeToString(hash[:])
        
        var genesis struct {
                Validators []struct {
                        PubKey struct {
                                Value string `json:"value"`
                        } `json:"pub_key"`
                } `json:"validators"`
                AppState struct {
                        Staking struct {
                                Validators []struct {
                                        ConsensusPubkey struct {
                                                Key string `json:"key"`
                                        } `json:"consensus_pubkey"`
                                } `json:"validators"`
                        } `json:"staking"`
                } `json:"app_state"`
        }
        
        if err := json.Unmarshal(data, &genesis); err != nil {
                return nil, "", fmt.Errorf("failed to parse genesis: %w", err)
        }
        
        validators := make(map[string]bool)
        
        for _, v := range genesis.Validators {
                if v.PubKey.Value != "" {
                        validators[v.PubKey.Value] = true
                }
        }
        
        for _, v := range genesis.AppState.Staking.Validators {
                if v.ConsensusPubkey.Key != "" {
                        validators[v.ConsensusPubkey.Key] = true
                }
        }
        
        return validators, genesisHash, nil
}

func NewSecureNodeRegistryFromGenesis(genesisPath string) (*SecureNodeRegistry, error) {
        validators, genesisHash, err := LoadGenesisValidators(genesisPath)
        if err != nil {
                return nil, err
        }
        
        validatorList := make([]string, 0, len(validators))
        for k := range validators {
                validatorList = append(validatorList, k)
        }
        
        registry := NewSecureNodeRegistry(genesisHash, validatorList)
        
        fmt.Printf("Loaded %d validators from genesis (hash: %s...)\n", len(validators), genesisHash[:16])
        
        return registry, nil
}

func (sr *SecureNodeRegistry) SaveToFile(path string) error {
        sr.mu.RLock()
        defer sr.mu.RUnlock()
        
        state := struct {
                GenesisHash       string              `json:"genesis_hash"`
                GenesisValidators []string            `json:"genesis_validators"`
                Nodes             map[string]*NodeIdentity `json:"nodes"`
                SavedAt           string              `json:"saved_at"`
        }{
                GenesisHash:       sr.genesisHash,
                GenesisValidators: make([]string, 0, len(sr.genesisValidators)),
                Nodes:             sr.nodes,
                SavedAt:           time.Now().Format(time.RFC3339),
        }
        
        for k := range sr.genesisValidators {
                state.GenesisValidators = append(state.GenesisValidators, k)
        }
        
        data, err := json.MarshalIndent(state, "", "  ")
        if err != nil {
                return err
        }
        
        return os.WriteFile(path, data, 0600)
}

func LoadSecureNodeRegistry(path string) (*SecureNodeRegistry, error) {
        data, err := os.ReadFile(path)
        if err != nil {
                return nil, err
        }
        
        var state struct {
                GenesisHash       string                   `json:"genesis_hash"`
                GenesisValidators []string                 `json:"genesis_validators"`
                Nodes             map[string]*NodeIdentity `json:"nodes"`
        }
        
        if err := json.Unmarshal(data, &state); err != nil {
                return nil, err
        }
        
        registry := NewSecureNodeRegistry(state.GenesisHash, state.GenesisValidators)
        registry.nodes = state.Nodes
        
        return registry, nil
}

func (sr *SecureNodeRegistry) GetNode(nodeID string) (*NodeIdentity, error) {
        sr.mu.RLock()
        defer sr.mu.RUnlock()

        node, exists := sr.nodes[nodeID]
        if !exists {
                return nil, fmt.Errorf("node %s not found in registry", nodeID)
        }

        return node, nil
}

func (sr *SecureNodeRegistry) VerifyNodeMessage(nodeID string, message, signature []byte) (bool, error) {
        sr.mu.RLock()
        defer sr.mu.RUnlock()

        node, exists := sr.nodes[nodeID]
        if !exists {
                return false, fmt.Errorf("node %s not found in registry", nodeID)
        }

        return node.VerifyMessage(message, signature), nil
}

func (sr *SecureNodeRegistry) UpdateNodeStatus(nodeID string, status NodeStatus) error {
        sr.mu.Lock()
        defer sr.mu.Unlock()

        node, exists := sr.nodes[nodeID]
        if !exists {
                return fmt.Errorf("node %s not found", nodeID)
        }

        node.Status = status
        node.LastSeen = time.Now()

        return nil
}

func (sr *SecureNodeRegistry) GetActiveNodes() []*NodeIdentity {
        sr.mu.RLock()
        defer sr.mu.RUnlock()

        var active []*NodeIdentity
        for _, node := range sr.nodes {
                if node.Status == StatusActive {
                        active = append(active, node)
                }
        }

        return active
}

func (sr *SecureNodeRegistry) PruneInactiveNodes(timeout time.Duration) int {
        sr.mu.Lock()
        defer sr.mu.Unlock()

        pruned := 0
        cutoff := time.Now().Add(-timeout)

        for id, node := range sr.nodes {
                if node.LastSeen.Before(cutoff) && node.Status == StatusActive {
                        node.Status = StatusInactive
                        pruned++
                        fmt.Printf("⚠️  Node %s marked inactive (last seen: %s)\n", id, node.LastSeen)
                }
        }

        return pruned
}

func (sr *SecureNodeRegistry) ExportToJSON() ([]byte, error) {
        sr.mu.RLock()
        defer sr.mu.RUnlock()

        return json.MarshalIndent(sr.nodes, "", "  ")
}

func ComputeGenesisHash(genesisPath string) (string, error) {
        data, err := os.ReadFile(genesisPath)
        if err != nil {
                return "", fmt.Errorf("failed to read genesis file: %w", err)
        }

        hash := sha256.Sum256(data)
        return hex.EncodeToString(hash[:]), nil
}

type SignedMessage struct {
        NodeID    string `json:"node_id"`
        Payload   []byte `json:"payload"`
        Signature []byte `json:"signature"`
        Timestamp int64  `json:"timestamp"`
        Nonce     string `json:"nonce"`
}

func CreateSignedMessage(nodeID string, payload []byte, keypair *NodeKeypair) (*SignedMessage, error) {
        nonce := make([]byte, 16)
        if _, err := rand.Read(nonce); err != nil {
                return nil, err
        }

        timestamp := time.Now().UnixNano()
        message := fmt.Sprintf("%s:%s:%d:%s", nodeID, base64.StdEncoding.EncodeToString(payload), timestamp, hex.EncodeToString(nonce))
        signature := ed25519.Sign(keypair.PrivateKey, []byte(message))

        return &SignedMessage{
                NodeID:    nodeID,
                Payload:   payload,
                Signature: signature,
                Timestamp: timestamp,
                Nonce:     hex.EncodeToString(nonce),
        }, nil
}

func (sm *SignedMessage) Verify(publicKey ed25519.PublicKey) bool {
        message := fmt.Sprintf("%s:%s:%d:%s", sm.NodeID, base64.StdEncoding.EncodeToString(sm.Payload), sm.Timestamp, sm.Nonce)
        return ed25519.Verify(publicKey, []byte(message), sm.Signature)
}

func (sm *SignedMessage) IsExpired(maxAge time.Duration) bool {
        msgTime := time.Unix(0, sm.Timestamp)
        return time.Since(msgTime) > maxAge
}
