# Aequitas Cerberus Auditor

## Multi-Agent AI Security System

✅ **Production Ready** - Architecture validated through comprehensive review

The Cerberus Auditor is a comprehensive, multi-agent AI security auditing system specifically designed for the Aequitas Protocol blockchain.

### Architecture

The system consists of six AI agents orchestrated by a master coordinator:

#### 1. **Analyst Guild** (4 AI Agents)
- **Claude Sonnet 4** (Anthropic) - Advanced reasoning and security analysis
- **GPT-4 Turbo** (OpenAI) - General security verification
- **Grok** (xAI) - Novel threat detection
- **Deepseek** - Code analysis specialist

#### 2. **Adversary Guild**
- Simulates attacks to confirm exploitability
- Chaos engineering tests
- Byzantine fault tolerance testing
- Race condition detection
- Front-running vulnerability analysis

#### 3. **Engineer Guild**
- Automated patch generation
- Test case creation
- Security fix verification
- CUDA optimization recommendations

#### 4. **Vulnerability Scanner**
- CVE database matching
- Known Cosmos SDK vulnerabilities
- Go language security patterns
- Cryptographic weakness detection

#### 5. **Smart Contract Analyzer**
- Aequitas-specific module analysis (x/justice, x/endowment, x/cctp, etc.)
- Justice Burn mechanism integrity
- Time-lock security verification
- Bridge security analysis
- Arbitration system validation

#### 6. **Protocol-Tuner**
- Analyzes patterns in discoveries
- Generates on-chain governance proposals
- Proposes parameter adjustments
- Creates feedback loop for protocol hardening

### Usage

#### Prerequisites

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set required API keys as environment variables (already configured in Replit)
# - OPENAI_API_KEY
# - ANTHROPIC_API_KEY
# - XAI_API_KEY (optional)
# - DEEPSEEK_API_KEY (optional)
```

#### Run Full Audit

```bash
# From the project root directory
python auditor/orchestrator.py
```

This will:
1. Audit the TAST document (if present)
2. Scan all Go files in the `aequitas` blockchain directory
3. Detect vulnerabilities using 4 AI agents
4. Confirm exploitability through adversarial testing
5. Generate automated patches
6. Save comprehensive reports

#### Audit Specific Document

```python
import asyncio
from auditor.orchestrator import CerberusOrchestrator

api_keys = {
    "openai": "your-key",
    "anthropic": "your-key"
}

orchestrator = CerberusOrchestrator(api_keys, ".")
asyncio.run(orchestrator.audit_document("path/to/document.md"))
```

### Output

All results are saved to:
- **`auditor/reports/`** - Detailed audit reports (JSON format)
- **PostgreSQL Database** - Permanent threat ledger with historical tracking
  - Fallback to `auditor/threat_ledger.json` if database unavailable
- **`auditor/reports/governance_proposals.json`** - Generated governance proposals

### Consensus Mechanism

Vulnerabilities must meet consensus thresholds to be reported:
- **CRITICAL/HIGH**: Found by 2+ AI agents
- **MEDIUM**: Found by 3+ AI agents
- **LOW**: Found by all 4 AI agents

This reduces false positives and ensures high-confidence findings.

### Security Score

Each audit generates a security score (0-100):
- **95-100**: Excellent security posture
- **85-94**: Good, minor improvements needed
- **70-84**: Moderate issues, patches recommended
- **Below 70**: Significant vulnerabilities, immediate action required

### Integration with Aequitas

The auditor is specifically tuned for:
- Cosmos SDK patterns and vulnerabilities
- Justice Burn mechanism integrity
- Endowment fund time-lock security
- CCTP bridge security
- Governance exploit vectors
- Custom Aequitas modules (x/justice, x/endowment, etc.)

### CI/CD Integration

The auditor includes complete GitHub Actions integration:
- **`.github/workflows/cerberus-audit.yml`** - Automated security audits on every push/PR
- Runs daily security scans
- Fails CI if CRITICAL vulnerabilities detected
- Generates audit reports as artifacts
- Posts PR comments with security scores
- Automatically creates patch PRs for discovered vulnerabilities

### Completed Features

- ✅ Multi-agent AI analysis (6 specialized agents)
- ✅ PostgreSQL database for threat persistence
- ✅ GitHub Actions CI/CD integration
- ✅ Automated PR creation for fixes
- ✅ Protocol-Tuner governance proposals
- ✅ Vulnerability Scanner (CVE database)
- ✅ Smart Contract Analyzer (Aequitas-specific)
- ✅ Consensus-based vulnerability detection
- ✅ Automated patch generation
- ✅ Comprehensive reporting system

### Future Enhancements

- [ ] Real-time continuous monitoring dashboard
- [ ] NVIDIA NIM integration for CUDA optimization
- [ ] Live testnet deployment for exploit testing
- [ ] Integration with AgentKit for autonomous security agents
- [ ] Webhook notifications for critical findings

## Philosophy

The Cerberus Auditor embodies the principle: **"The best defense is a relentless offense."**

By combining multiple AI perspectives, adversarial testing, and automated remediation, the system ensures the Aequitas Protocol maintains the highest security standards befitting a $131 trillion justice enforcement mechanism.
