// ═══════════════════════════════════════════════════════════════════════════
// THREAT DATABASE - PostgreSQL Storage for Security Threats
// ═══════════════════════════════════════════════════════════════════════════

package autonomous

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

// ThreatDatabase manages persistent storage of threats and scan results
type ThreatDatabase struct {
	db *sql.DB
}

// NewThreatDatabase creates a new threat database connection
func NewThreatDatabase() (*ThreatDatabase, error) {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://localhost/aequitas_threats?sslmode=disable"
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	tdb := &ThreatDatabase{db: db}
	
	if err := tdb.createTables(); err != nil {
		return nil, fmt.Errorf("failed to create tables: %w", err)
	}

	log.Println("✅ Threat database initialized")
	return tdb, nil
}

// createTables creates the necessary database tables
func (tdb *ThreatDatabase) createTables() error {
	schema := `
	CREATE TABLE IF NOT EXISTS threats (
		id VARCHAR(255) PRIMARY KEY,
		severity VARCHAR(50) NOT NULL,
		type VARCHAR(100) NOT NULL,
		location TEXT NOT NULL,
		description TEXT NOT NULL,
		code_snippet TEXT,
		detected_at TIMESTAMP NOT NULL DEFAULT NOW(),
		resolved_at TIMESTAMP,
		ai_analysis JSONB,
		auto_fix_attempted BOOLEAN DEFAULT FALSE,
		auto_fix_successful BOOLEAN DEFAULT FALSE,
		pr_url TEXT,
		axioms_affected TEXT[]
	);

	CREATE TABLE IF NOT EXISTS chaos_tests (
		id SERIAL PRIMARY KEY,
		scenario_name VARCHAR(255) NOT NULL,
		severity VARCHAR(50) NOT NULL,
		executed_at TIMESTAMP NOT NULL DEFAULT NOW(),
		system_recovered BOOLEAN NOT NULL,
		recovery_time_seconds INT,
		details JSONB
	);

	CREATE TABLE IF NOT EXISTS scan_history (
		id SERIAL PRIMARY KEY,
		scan_started_at TIMESTAMP NOT NULL,
		scan_completed_at TIMESTAMP,
		threats_found INT DEFAULT 0,
		threats_fixed INT DEFAULT 0,
		status VARCHAR(50) NOT NULL
	);

	CREATE INDEX IF NOT EXISTS idx_threats_severity ON threats(severity);
	CREATE INDEX IF NOT EXISTS idx_threats_detected ON threats(detected_at);
	CREATE INDEX IF NOT EXISTS idx_chaos_executed ON chaos_tests(executed_at);
	`

	_, err := tdb.db.Exec(schema)
	return err
}

// StoreScanResults persists scan results to the database
func (tdb *ThreatDatabase) StoreScanResults(threats []*Threat) error {
	tx, err := tdb.db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	for _, threat := range threats {
		var aiAnalysisJSON []byte
		if threat.AIAnalysis != nil {
			aiAnalysisJSON, _ = json.Marshal(threat.AIAnalysis)
		}

		_, err := tx.Exec(`
			INSERT INTO threats (
				id, severity, type, location, description,
				code_snippet, ai_analysis, axioms_affected,
				auto_fix_attempted, auto_fix_successful, pr_url
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
			ON CONFLICT (id) DO UPDATE SET
				ai_analysis = EXCLUDED.ai_analysis,
				auto_fix_attempted = EXCLUDED.auto_fix_attempted,
				auto_fix_successful = EXCLUDED.auto_fix_successful,
				pr_url = EXCLUDED.pr_url,
				resolved_at = CASE
					WHEN EXCLUDED.auto_fix_successful = true AND threats.resolved_at IS NULL
					THEN NOW()
					ELSE threats.resolved_at
				END
		`, threat.ID, threat.Severity, threat.Type, threat.Location,
			threat.Description, threat.CodeSnippet, aiAnalysisJSON,
			pq.Array(threat.AxiomsAffected), threat.AutoFixAttempted,
			threat.AutoFixSuccessful, threat.PRURL)

		if err != nil {
			return fmt.Errorf("failed to insert threat %s: %w", threat.ID, err)
		}
	}

	return tx.Commit()
}

// StoreChaosTestResult stores a chaos test result
func (tdb *ThreatDatabase) StoreChaosTestResult(result *ChaosTestResult) error {
	detailsJSON, _ := json.Marshal(result.Details)

	_, err := tdb.db.Exec(`
		INSERT INTO chaos_tests (
			scenario_name, severity, executed_at,
			system_recovered, recovery_time_seconds, details
		) VALUES ($1, $2, $3, $4, $5, $6)
	`, result.Scenario.Name, result.Scenario.Severity, result.ExecutedAt,
		result.SystemRecovered, result.RecoveryTimeSeconds, detailsJSON)

	return err
}

// GetRecentThreats retrieves recent threats
func (tdb *ThreatDatabase) GetRecentThreats(limit int) ([]*Threat, error) {
	rows, err := tdb.db.Query(`
		SELECT id, severity, type, location, description,
			   code_snippet, detected_at, resolved_at,
			   ai_analysis, auto_fix_attempted, auto_fix_successful,
			   pr_url, axioms_affected
		FROM threats
		ORDER BY detected_at DESC
		LIMIT $1
	`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	threats := make([]*Threat, 0)
	for rows.Next() {
		var threat Threat
		var aiAnalysisJSON []byte
		var resolvedAt sql.NullTime

		err := rows.Scan(
			&threat.ID, &threat.Severity, &threat.Type, &threat.Location,
			&threat.Description, &threat.CodeSnippet, &threat.DetectedAt,
			&resolvedAt, &aiAnalysisJSON, &threat.AutoFixAttempted,
			&threat.AutoFixSuccessful, &threat.PRURL,
			pq.Array(&threat.AxiomsAffected),
		)
		if err != nil {
			return nil, err
		}

		if len(aiAnalysisJSON) > 0 {
			var analysis AIAnalysis
			if err := json.Unmarshal(aiAnalysisJSON, &analysis); err == nil {
				threat.AIAnalysis = &analysis
			}
		}

		threats = append(threats, &threat)
	}

	return threats, rows.Err()
}

// GetChaosTestHistory retrieves chaos test history
func (tdb *ThreatDatabase) GetChaosTestHistory(limit int) ([]ChaosTestResult, error) {
	rows, err := tdb.db.Query(`
		SELECT scenario_name, severity, executed_at,
			   system_recovered, recovery_time_seconds, details
		FROM chaos_tests
		ORDER BY executed_at DESC
		LIMIT $1
	`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	results := make([]ChaosTestResult, 0)
	for rows.Next() {
		var result ChaosTestResult
		var detailsJSON []byte

		err := rows.Scan(
			&result.Scenario.Name, &result.Scenario.Severity,
			&result.ExecutedAt, &result.SystemRecovered,
			&result.RecoveryTimeSeconds, &detailsJSON,
		)
		if err != nil {
			return nil, err
		}

		if len(detailsJSON) > 0 {
			json.Unmarshal(detailsJSON, &result.Details)
		}

		results = append(results, result)
	}

	return results, rows.Err()
}

// Close closes the database connection
func (tdb *ThreatDatabase) Close() error {
	return tdb.db.Close()
}
