// ═══════════════════════════════════════════════════════════════════════════
// AUTONOMOUS AEQUITAS AI - Type Definitions
// ═══════════════════════════════════════════════════════════════════════════

package autonomous

import (
	"time"
)

// AIAnalysis contains the AI's analysis of a security threat
type AIAnalysis struct {
	RootCause            string   `json:"root_cause"`
	ExploitationDifficulty int    `json:"exploitation_difficulty"` // 1-10 scale
	PotentialImpact      string   `json:"potential_impact"`
	CanAutoFix           bool     `json:"can_auto_fix"`
	AutoFixReasoning     string   `json:"auto_fix_reasoning"`
	RecommendedFix       string   `json:"recommended_fix"`
	AxiomsAffected       []string `json:"axioms_affected"`
}

// Threat represents a detected security threat
type Threat struct {
	ID              string      `json:"id"`
	Severity        string      `json:"severity"`
	Type            string      `json:"type"`
	Location        string      `json:"location"`
	Description     string      `json:"description"`
	CodeSnippet     string      `json:"code_snippet"`
	DetectedAt      time.Time   `json:"detected_at"`
	AIAnalysis      *AIAnalysis `json:"ai_analysis,omitempty"`
	AxiomsAffected  []string    `json:"axioms_affected"`
	AutoFixAttempted bool       `json:"auto_fix_attempted"`
	AutoFixSuccessful bool      `json:"auto_fix_successful"`
	PRURL           string      `json:"pr_url,omitempty"`
}

// ChaosScenario represents a chaos engineering test scenario
type ChaosScenario struct {
	Name     string `json:"name"`
	Severity string `json:"severity"`
}

// ChaosTestResult contains results from a chaos engineering test
type ChaosTestResult struct {
	Scenario         ChaosScenario `json:"scenario"`
	ExecutedAt       time.Time     `json:"executed_at"`
	SystemRecovered  bool          `json:"system_recovered"`
	RecoveryTimeSeconds int        `json:"recovery_time_seconds"`
	Details          map[string]interface{} `json:"details"`
}

// TestResults contains results from testing an auto-fix
type TestResults struct {
	AllTestsPassed bool     `json:"all_tests_passed"`
	Failures       []string `json:"failures,omitempty"`
	TestCount      int      `json:"test_count"`
	PassedCount    int      `json:"passed_count"`
}

// ScanResult represents the result of a full system scan
type ScanResult struct {
	ScanID         string    `json:"scan_id"`
	StartedAt      time.Time `json:"started_at"`
	CompletedAt    time.Time `json:"completed_at"`
	ThreatsFound   int       `json:"threats_found"`
	ThreatsFixed   int       `json:"threats_fixed"`
	Status         string    `json:"status"`
	Threats        []*Threat `json:"threats"`
}
