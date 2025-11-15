package scheduler

import (
        "crypto/sha256"
        "encoding/hex"
        "fmt"
        "log"
)

type AIWorkloadScheduler struct {
        NIMEndpoint string
}

type WorkloadRequest struct {
        Type      string            `json:"type"`
        UserDID   string            `json:"user_did"`
        Resources map[string]int64  `json:"resources"`
        Priority  int               `json:"priority"`
}

func (r WorkloadRequest) GetType() string {
        return r.Type
}

func (r WorkloadRequest) GetUserDID() string {
        return r.UserDID
}

func (r WorkloadRequest) GetPriority() int {
        return r.Priority
}

type WorkloadPrediction struct {
        OptimalNode string
        Confidence  float64
        Reasoning   string
}

func NewAIWorkloadScheduler(nimEndpoint string) *AIWorkloadScheduler {
        return &AIWorkloadScheduler{
                NIMEndpoint: nimEndpoint,
        }
}

func (s *AIWorkloadScheduler) PredictOptimalNode(request interface{}, userStake int64) (string, error) {
        var workloadType, userDID string
        var priority int

        switch req := request.(type) {
        case WorkloadRequest:
                workloadType = req.Type
                userDID = req.UserDID
                priority = req.Priority
        default:
                if reqStruct, ok := request.(struct {
                        Type      string
                        UserDID   string
                        Priority  int
                }); ok {
                        workloadType = reqStruct.Type
                        userDID = reqStruct.UserDID
                        priority = reqStruct.Priority
                } else {
                        return "", fmt.Errorf("invalid request type")
                }
        }

        log.Printf("🤖 AI Scheduler: Analyzing workload type=%s, priority=%d, stake=%d\n", 
                workloadType, priority, userStake)

        if s.NIMEndpoint != "" && s.NIMEndpoint != "http://localhost:8000" {
                prediction := s.CallNIMForPrediction(workloadType, userDID, userStake)
                if prediction.Confidence > 0.7 {
                        log.Printf("✅ AI prediction: node=%s, confidence=%.2f\n", prediction.OptimalNode, prediction.Confidence)
                        return prediction.OptimalNode, nil
                }
        }

        nodeID := s.simpleSchedule(workloadType, userDID, userStake)
        log.Printf("📊 Fallback scheduler selected: %s\n", nodeID)
        return nodeID, nil
}

func (s *AIWorkloadScheduler) CallNIMForPrediction(workloadType, userDID string, userStake int64) WorkloadPrediction {
        log.Printf("⚠️  NVIDIA NIM integration stub - using fallback scheduling\n")
        
        return WorkloadPrediction{
                OptimalNode: s.simpleSchedule(workloadType, userDID, userStake),
                Confidence:  0.5,
                Reasoning:   "NIM integration not available, using deterministic scheduler",
        }
}

func (s *AIWorkloadScheduler) simpleSchedule(workloadType, userDID string, userStake int64) string {
        hash := sha256.Sum256([]byte(fmt.Sprintf("%s-%s-%d", workloadType, userDID, userStake)))
        hashStr := hex.EncodeToString(hash[:])
        
        nodeTypes := []string{"sovereign-vm", "mobile-validator", "home-raspberry-pi", "cloud-core"}
        
        workloadNodeMap := map[string]string{
                "evidence_processing": "sovereign-vm",
                "governance_voting":   "mobile-validator",
                "blockchain_sync":     "home-raspberry-pi",
                "ai_inference":        "cloud-core",
        }
        
        nodeType := workloadNodeMap[workloadType]
        if nodeType == "" {
                index := int(hashStr[0]) % len(nodeTypes)
                nodeType = nodeTypes[index]
        }
        
        return fmt.Sprintf("%s-%s", nodeType, hashStr[:8])
}
