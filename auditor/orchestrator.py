#!/usr/bin/env python3
# auditor/orchestrator.py
"""
AEQUITAS CERBERUS AUDITOR
The Master AI Orchestrator for Multi-Agent Security Auditing

This orchestrator coordinates:
- Analyst Guild: 4 AI agents (Claude, GPT-4, Grok, Deepseek)
- Adversary Guild: Exploit testing and chaos engineering
- Engineer Guild: Automated patch generation
"""

import os
import sys
import json
import time
import asyncio
from pathlib import Path
from datetime import datetime
from typing import List, Dict

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent))

from agents.analyst_guild import AnalystGuild
from agents.adversary_guild import AdversaryGuild
from agents.engineer_guild import EngineerGuild
from agents.vulnerability_scanner import VulnerabilityScanner
from agents.smart_contract_analyzer import SmartContractAnalyzer
from agents.protocol_tuner import ProtocolTuner
from db_models import DatabaseManager


class CerberusOrchestrator:
    """
    The Master AI Director - Coordinates all guilds for comprehensive auditing
    """
    
    def __init__(self, api_keys: Dict[str, str], repo_path: str):
        print("=" * 80)
        print("🛡️  AEQUITAS CERBERUS AUDITOR - INITIALIZING")
        print("=" * 80)
        
        self.repo_path = Path(repo_path)
        self.reports_path = self.repo_path / "auditor" / "reports"
        
        # Create reports directory if it doesn't exist
        self.reports_path.mkdir(exist_ok=True)
        
        # Initialize database manager
        try:
            self.db = DatabaseManager()
            print("✅ Database connected successfully")
        except Exception as e:
            print(f"⚠️  Database connection failed: {e}")
            print("   Falling back to JSON-based threat ledger")
            self.db = None
            self.threat_ledger_path = self.repo_path / "auditor" / "threat_ledger.json"
        
        # Initialize all security agents
        print("\n🎯 Initializing AI Security Agents...")
        self.analysts = AnalystGuild(api_keys)
        self.adversaries = AdversaryGuild()
        self.engineers = EngineerGuild(api_keys["openai"])
        self.vuln_scanner = VulnerabilityScanner()
        self.contract_analyzer = SmartContractAnalyzer()
        self.protocol_tuner = ProtocolTuner()
        
        print("✅ All agents initialized successfully")
        print("  - Analyst Guild (4 AI agents)")
        print("  - Adversary Guild (Chaos Engineering)")
        print("  - Engineer Guild (Patch Generation)")
        print("  - Vulnerability Scanner (CVE Database)")
        print("  - Smart Contract Analyzer (Aequitas Modules)")
        print("  - Protocol-Tuner (Governance Proposals)")
        print("=" * 80)
    
    async def run_full_audit(self, target_directory: str = "aequitas") -> Dict:
        """
        Execute comprehensive security audit on the entire codebase
        
        Args:
            target_directory: Directory to audit (default: aequitas blockchain code)
            
        Returns:
            Complete audit report
        """
        print(f"\n🔍 Starting Full Security Audit of {target_directory}")
        print("=" * 80)
        
        start_time = time.time()
        all_findings = []
        all_fixes = []
        
        # Find all Go files in target directory
        target_path = self.repo_path / target_directory
        go_files = list(target_path.rglob("*.go"))
        
        print(f"\n📊 Found {len(go_files)} Go files to audit")
        print(f"🎯 Target: {target_path}")
        
        # Audit each file (all files, batched for performance)
        batch_size = 5
        for i in range(0, len(go_files), batch_size):
            batch = go_files[i:i+batch_size]
            print(f"\n📦 Processing batch {i//batch_size + 1}/{(len(go_files) + batch_size - 1)//batch_size}")
            
            # Process files in batch asynchronously
            batch_tasks = [self._audit_single_file(str(go_file)) for go_file in batch]
            batch_results = await asyncio.gather(*batch_tasks)
            
            for idx, (go_file, result) in enumerate(zip(batch, batch_results)):
                findings = result['findings']
                fixes = result['fixes']
                print(f"  [{i+idx+1}/{len(go_files)}] {go_file.relative_to(self.repo_path)}: {len(findings)} findings, {len(fixes)} fixes")
                if findings:
                    all_findings.extend(findings)
                if fixes:
                    all_fixes.extend(fixes)
        
        # Generate report
        elapsed = time.time() - start_time
        report = self._generate_comprehensive_report(
            all_findings,
            all_fixes,
            target_directory,
            elapsed
        )
        
        # Save report
        report_file = self._save_report(report, "full_audit")
        
        # Save report to database
        if self.db:
            try:
                self.db.save_audit_report(report)
                print("✅ Report saved to database")
            except Exception as e:
                print(f"⚠️  Database report save failed: {e}")
        
        print("\n" + "=" * 80)
        print("✅ AUDIT COMPLETE")
        print(f"📄 Report saved to: {report_file}")
        print(f"⏱️  Time elapsed: {elapsed:.2f} seconds")
        
        # Show threat statistics if using database
        if self.db:
            stats = self.db.get_threat_statistics()
            print(f"\n📊 Threat Statistics:")
            print(f"   Total threats in database: {stats['total_threats']}")
            print(f"   Unpatched threats: {stats['unpatched']}")
        
        # Generate governance proposals if there are findings
        if all_findings:
            print("\n🔧 Generating governance proposals...")
            governance_proposals = self.protocol_tuner.analyze_findings_for_governance(all_findings)
            
            if governance_proposals:
                gov_file = self.protocol_tuner.generate_governance_json(governance_proposals)
                print(self.protocol_tuner.get_proposal_summary(governance_proposals))
                report['governance_proposals'] = governance_proposals
        
        print("=" * 80)
        
        return report
    
    async def audit_document(self, document_path: str) -> Dict:
        """
        Audit a legal/forensic document (like TAST)
        
        Args:
            document_path: Path to the document
            
        Returns:
            Document audit report
        """
        print(f"\n📄 Starting Document Audit: {document_path}")
        print("=" * 80)
        
        start_time = time.time()
        
        # PHASE 1: Analysis
        print("\n[PHASE 1/5] ANALYST GUILD: Scanning document...")
        doc_path = self.repo_path / document_path
        
        if not doc_path.exists():
            print(f"❌ ERROR: Document not found: {doc_path}")
            return {"error": "Document not found"}
        
        analysis_results = await self.analysts.audit_document(str(doc_path))
        
        # PHASE 2: Consensus
        print("\n[PHASE 2/5] ORCHESTRATOR: Establishing consensus...")
        high_confidence_threats = self._get_consensus_threats(analysis_results)
        
        if not high_confidence_threats:
            print("✅ No high-confidence issues found. Document is robust.")
            elapsed = time.time() - start_time
            return self._generate_document_report([], [], document_path, elapsed)
        
        print(f"⚠️  Found {len(high_confidence_threats)} consensus issues")
        
        # PHASE 3: Adversarial Testing
        print("\n[PHASE 3/5] ADVERSARY GUILD: Testing exploitability...")
        confirmed_exploits = []
        
        for threat in high_confidence_threats:
            is_exploitable = self.adversaries.test_document_exploit(threat)
            if is_exploitable:
                print(f"  🔴 CONFIRMED EXPLOIT: {threat['description']}")
                confirmed_exploits.append(threat)
                self._update_threat_ledger(threat)
        
        if not confirmed_exploits:
            print("✅ No exploitable issues confirmed.")
        
        # PHASE 4: Remediation
        print("\n[PHASE 4/5] ENGINEER GUILD: Generating patches...")
        fixes = []
        
        for exploit in confirmed_exploits:
            # Read a snippet around the issue for context
            with open(doc_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            snippet = content[:1000]  # First 1000 chars as context
            patch = self.engineers.generate_document_patch(exploit, snippet)
            fixes.append({
                'vulnerability': exploit,
                'patch': patch
            })
            print(f"  ✅ Patch generated for: {exploit['description']}")
        
        # PHASE 5: Reporting
        print("\n[PHASE 5/5] Generating comprehensive report...")
        elapsed = time.time() - start_time
        
        report = self._generate_document_report(
            high_confidence_threats,
            fixes,
            document_path,
            elapsed
        )
        
        report_file = self._save_report(report, "document_audit")
        
        print("\n" + "=" * 80)
        print("✅ DOCUMENT AUDIT COMPLETE")
        print(f"📄 Report saved to: {report_file}")
        print(f"⏱️  Time elapsed: {elapsed:.2f} seconds")
        print("=" * 80)
        
        return report
    
    async def _audit_single_file(self, file_path: str) -> Dict:
        """Audit a single file through all phases"""
        
        # Phase 1: Multi-source Analysis
        # Run AI analysis, vulnerability scanning, and contract analysis in parallel
        analysis_results = await self.analysts.audit_file(file_path)
        vuln_scan_results = self.vuln_scanner.scan_file(file_path)
        contract_analysis_results = self.contract_analyzer.analyze_file(file_path)
        
        # Merge all findings
        all_findings = analysis_results.copy()
        all_findings['vulnerability_scanner'] = vuln_scan_results
        all_findings['contract_analyzer'] = contract_analysis_results
        
        # Phase 2: Consensus
        consensus_threats = self._get_consensus_threats(all_findings)
        
        if not consensus_threats:
            return {'findings': [], 'fixes': []}
        
        # Phase 3: Adversarial Testing
        confirmed = []
        generated_fixes = []
        
        for threat in consensus_threats:
            # Enrich threat with file context BEFORE exploit confirmation
            threat['file'] = file_path
            
            # Now test exploitability with full context
            exploit_confirmation = self.adversaries.run_exploit_poc(threat)
            
            if exploit_confirmation:
                # Mark as confirmed and add evidence
                threat['confirmed'] = True
                threat['exploit_evidence'] = exploit_confirmation['evidence']
                confirmed.append(threat)
                self._update_threat_ledger(threat)
                
                # Phase 4: Generate Fix for confirmed exploit
                with open(file_path, 'r', encoding='utf-8') as f:
                    code = f.read()
                
                # Get code snippet around the vulnerability
                lines = code.split('\n')
                line_num = threat.get('line_number', 1)
                start = max(0, line_num - 5)
                end = min(len(lines), line_num + 5)
                snippet = '\n'.join(lines[start:end])
                
                fix = self.engineers.generate_patch(threat, snippet)
                
                fix_entry = {
                    'vulnerability': threat,
                    'patch': fix,
                    'file': file_path
                }
                generated_fixes.append(fix_entry)
        
        return {'findings': confirmed, 'fixes': generated_fixes}
    
    def _get_consensus_threats(self, results: Dict[str, List[Dict]]) -> List[Dict]:
        """
        Determine consensus threats - issues found by multiple AI agents
        
        Consensus rules:
        - CRITICAL: Found by 2+ agents
        - HIGH: Found by 2+ agents
        - MEDIUM: Found by 3+ agents
        - LOW: Found by all 4 agents
        """
        findings_map = {}
        
        for ai_name, findings in results.items():
            for finding in findings:
                # Create a key based on description and severity
                desc = finding.get('description', '').lower()
                severity = finding.get('severity', 'UNKNOWN')
                
                key = (desc[:50], severity)  # Use first 50 chars of description
                
                if key not in findings_map:
                    findings_map[key] = {
                        'count': 0,
                        'details': finding,
                        'sources': []
                    }
                
                findings_map[key]['count'] += 1
                findings_map[key]['sources'].append(ai_name)
        
        # Apply consensus rules
        consensus = []
        for key, data in findings_map.items():
            finding = data['details']
            count = data['count']
            severity = finding.get('severity', 'MEDIUM')
            
            # Determine if it meets consensus threshold
            meets_consensus = False
            if severity in ['CRITICAL', 'HIGH'] and count >= 2:
                meets_consensus = True
            elif severity == 'MEDIUM' and count >= 3:
                meets_consensus = True
            elif severity == 'LOW' and count >= 4:
                meets_consensus = True
            
            if meets_consensus:
                finding['consensus_count'] = count
                finding['found_by'] = data['sources']
                consensus.append(finding)
        
        return consensus
    
    def _update_threat_ledger(self, threat: Dict):
        """Record threat in the permanent ledger (PostgreSQL or JSON fallback)"""
        
        if self.db:
            # Use PostgreSQL database
            try:
                db_threat = self.db.add_threat(threat)
                print(f"  📝 Threat ledger (DB) updated: {threat.get('description', 'Unknown')} [ID: {db_threat.threat_id}]")
            except Exception as e:
                print(f"  ⚠️  Database write failed: {e}")
                self._fallback_json_ledger(threat)
        else:
            # Fallback to JSON file
            self._fallback_json_ledger(threat)
    
    def _fallback_json_ledger(self, threat: Dict):
        """Fallback to JSON-based threat ledger"""
        ledger = []
        
        if self.threat_ledger_path.exists():
            with open(self.threat_ledger_path, 'r') as f:
                ledger = json.load(f)
        
        threat_entry = {
            "timestamp": datetime.now().isoformat(),
            "id": f"threat-{len(ledger) + 1}",
            **threat
        }
        
        ledger.append(threat_entry)
        
        with open(self.threat_ledger_path, 'w') as f:
            json.dump(ledger, f, indent=2)
        
        print(f"  📝 Threat ledger (JSON) updated: {threat.get('description', 'Unknown')}")
    
    def _generate_comprehensive_report(
        self,
        findings: List[Dict],
        fixes: List[Dict],
        target: str,
        elapsed: float
    ) -> Dict:
        """Generate comprehensive audit report"""
        
        severity_counts = {
            'CRITICAL': len([f for f in findings if f.get('severity') == 'CRITICAL']),
            'HIGH': len([f for f in findings if f.get('severity') == 'HIGH']),
            'MEDIUM': len([f for f in findings if f.get('severity') == 'MEDIUM']),
            'LOW': len([f for f in findings if f.get('severity') == 'LOW'])
        }
        
        # Calculate security score (100 - weighted deductions)
        score = 100
        score -= severity_counts['CRITICAL'] * 20
        score -= severity_counts['HIGH'] * 10
        score -= severity_counts['MEDIUM'] * 5
        score -= severity_counts['LOW'] * 2
        score = max(0, score)
        
        return {
            'audit_type': 'full_codebase',
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'duration_seconds': elapsed,
            'summary': {
                'total_findings': len(findings),
                'by_severity': severity_counts,
                'fixes_generated': len(fixes),
                'security_score': score
            },
            'findings': findings,
            'fixes': fixes,
            'recommendations': self._generate_recommendations(findings)
        }
    
    def _generate_document_report(
        self,
        findings: List[Dict],
        fixes: List[Dict],
        document: str,
        elapsed: float
    ) -> Dict:
        """Generate document audit report"""
        
        return {
            'audit_type': 'document',
            'document': document,
            'timestamp': datetime.now().isoformat(),
            'duration_seconds': elapsed,
            'summary': {
                'total_issues': len(findings),
                'critical_issues': len([f for f in findings if f.get('severity') == 'CRITICAL']),
                'patches_generated': len(fixes)
            },
            'findings': findings,
            'patches': fixes
        }
    
    def _generate_recommendations(self, findings: List[Dict]) -> List[str]:
        """Generate security recommendations based on findings"""
        recommendations = []
        
        if any(f.get('severity') == 'CRITICAL' for f in findings):
            recommendations.append("⚠️  CRITICAL: Immediate action required before launch")
            recommendations.append("Review and apply all critical patches immediately")
        
        if any('overflow' in f.get('description', '').lower() for f in findings):
            recommendations.append("Implement SafeMath library for all arithmetic operations")
        
        if any('access control' in f.get('type', '').lower() for f in findings):
            recommendations.append("Review all keeper permissions and access controls")
        
        if not recommendations:
            recommendations.append("✅ No critical issues found - system is secure")
        
        return recommendations
    
    def _save_report(self, report: Dict, report_type: str) -> Path:
        """Save report to file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{report_type}_{timestamp}.json"
        filepath = self.reports_path / filename
        
        with open(filepath, 'w') as f:
            json.dump(report, f, indent=2)
        
        return filepath


async def main():
    """Main entry point for the Cerberus Auditor"""
    
    # Get API keys from environment
    api_keys = {
        "openai": os.getenv("OPENAI_API_KEY"),
        "anthropic": os.getenv("ANTHROPIC_API_KEY"),
        "xai": os.getenv("XAI_API_KEY", ""),
        "deepseek": os.getenv("DEEPSEEK_API_KEY", "")
    }
    
    # Validate required keys
    if not api_keys["openai"] or not api_keys["anthropic"]:
        print("❌ ERROR: OPENAI_API_KEY and ANTHROPIC_API_KEY are required")
        sys.exit(1)
    
    # Initialize orchestrator
    orchestrator = CerberusOrchestrator(api_keys, repo_path=".")
    
    # Check if TAST document exists
    tast_path = "docs/TAST_Full_Audit_&_Arbitration_By-Jacque_Antoine_DeGraff.md"
    
    if Path(tast_path).exists():
        print("\n📄 TAST document found - Running document audit first...")
        await orchestrator.audit_document(tast_path)
    else:
        print(f"\n⚠️  TAST document not found at: {tast_path}")
        print("Proceeding with codebase audit...")
    
    # Run full codebase audit
    print("\n🔍 Running full Aequitas blockchain audit...")
    await orchestrator.run_full_audit("aequitas")
    
    print("\n🎉 All audits complete!")
    print(f"📊 Reports available in: auditor/reports/")
    print(f"📝 Threat ledger: auditor/threat_ledger.json")


if __name__ == "__main__":
    asyncio.run(main())
