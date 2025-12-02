package scheduler

import (
        "crypto/sha256"
        "encoding/hex"
        "fmt"

        "github.com/CreoDAMO/aequitas-cloud-engine/pkg/observability"
        "go.uber.org/zap"
)

type AIWorkloadScheduler struct {
        NIMEndpoint string
        logger      *zap.Logger
        metrics     *observability.Metrics
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

func NewAIWorkloadScheduler(nimEndpoint string, logger *zap.Logger, metrics *observability.Metrics) *AIWorkloadScheduler {
        return &AIWorkloadScheduler{
                NIMEndpoint: nimEndpoint,
                logger:      logger,
                metrics:     metrics,
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

        if s.logger != nil {
                s.logger.Info("AI Scheduler analyzing workload", zap.String("type", workloadType), zap.Int("priority", priority), zap.Int64("stake", userStake))
        }

        if s.NIMEndpoint != "" && s.NIMEndpoint != "http://localhost:8000" {
                prediction := s.CallNIMForPrediction(workloadType, userDID, userStake)
                if prediction.Confidence > 0.7 {
                        if s.logger != nil {
                                s.logger.Info("AI prediction", zap.String("node", prediction.OptimalNode), zap.Float64("confidence", prediction.Confidence))
                        }
                        return prediction.OptimalNode, nil
                }
        }

        nodeID := s.simpleSchedule(workloadType, userDID, userStake)
        if s.logger != nil {
                s.logger.Info("Fallback scheduler selected", zap.String("nodeID", nodeID))
        }
        return nodeID, nil
}

func (s *AIWorkloadScheduler) CallNIMForPrediction(workloadType, userDID string, userStake int64) WorkloadPrediction {
        if s.logger != nil {
                s.logger.Warn("NVIDIA NIM integration stub - using fallback scheduling")
        }
        
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
