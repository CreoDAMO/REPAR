package ai

import (
        "fmt"

        "go.uber.org/zap"
)

type NIMIntegration struct {
        LocalEndpoint string
        Models        map[string]string
        initialized   bool
        logger        *zap.Logger
}

func NewNIMIntegration(localEndpoint string, logger *zap.Logger) *NIMIntegration {
        return &NIMIntegration{
                LocalEndpoint: localEndpoint,
                Models: map[string]string{
                        "llama-3.1-70b":      "legal-analysis",
                        "stable-diffusion-xl": "nft-generation",
                        "clip":                "multimodal-search",
                },
                initialized: false,
                logger:      logger,
        }
}

func (n *NIMIntegration) InitializeLocalAI() error {
        if n.LocalEndpoint == "" || n.LocalEndpoint == "http://localhost:8000" {
                if n.logger != nil {
                        n.logger.Warn("NVIDIA NIM endpoint not configured - AI features will use stubs")
                }
                return fmt.Errorf("NIM endpoint not configured")
        }

        if n.logger != nil {
                n.logger.Info("Initializing NVIDIA NIM integration", zap.String("endpoint", n.LocalEndpoint))
        }

        n.initialized = true
        return nil
}

func (n *NIMIntegration) GetModelStatus() map[string]string {
        status := make(map[string]string)
        for model, purpose := range n.Models {
                if n.initialized {
                        status[model] = fmt.Sprintf("ready (%s)", purpose)
                } else {
                        status[model] = fmt.Sprintf("stub (%s)", purpose)
                }
        }
        return status
}

func (n *NIMIntegration) getModelList() []string {
        models := make([]string, 0, len(n.Models))
        for model := range n.Models {
                models = append(models, model)
        }
        return models
}

func (n *NIMIntegration) RunInference(model string, input interface{}) (interface{}, error) {
        if !n.initialized {
                return nil, fmt.Errorf("NIM not initialized - using stub response")
        }

        purpose, exists := n.Models[model]
        if !exists {
                return nil, fmt.Errorf("unknown model: %s", model)
        }

        if n.logger != nil {
                n.logger.Info("Running inference", zap.String("model", model), zap.String("purpose", purpose))
        }

        return map[string]interface{}{
                "model":  model,
                "result": "stub inference result",
                "status": "completed",
        }, nil
}
