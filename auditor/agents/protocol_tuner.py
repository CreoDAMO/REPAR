# auditor/agents/protocol_tuner.py
"""
Protocol-Tuner Agent
Proposes on-chain governance changes based on audit findings
Learns from discovered vulnerabilities to strengthen protocol parameters
"""

from typing import List, Dict
import json

class ProtocolTuner:
    """
    The Protocol-Tuner analyzes audit findings and proposes governance actions
    to strengthen the Aequitas Protocol at the parameter level.
    
    This creates a feedback loop:
    1. Vulnerabilities discovered
    2. Patterns identified
    3. Governance proposals generated
    4. Protocol parameters adjusted
    5. Protocol becomes more resilient
    """
    
    def __init__(self):
        self.governance_proposals = []
        self.parameter_adjustments = []
    
    def analyze_findings_for_governance(self, findings: List[Dict]) -> List[Dict]:
        """
        Analyze audit findings and generate governance proposals
        
        Args:
            findings: List of discovered vulnerabilities
            
        Returns:
            List of governance proposals
        """
        print("\n🔧 Protocol-Tuner: Analyzing findings for governance actions...")
        
        proposals = []
        
        # Group findings by type
        findings_by_type = self._group_by_type(findings)
        
        # Generate proposals based on patterns
        for vuln_type, type_findings in findings_by_type.items():
            if len(type_findings) >= 2:  # Pattern detected
                proposal = self._generate_governance_proposal(vuln_type, type_findings)
                if proposal:
                    proposals.append(proposal)
        
        # Check for systemic issues
        systemic_proposals = self._check_systemic_issues(findings)
        proposals.extend(systemic_proposals)
        
        self.governance_proposals.extend(proposals)
        
        print(f"  ✅ Generated {len(proposals)} governance proposals")
        
        return proposals
    
    def _group_by_type(self, findings: List[Dict]) -> Dict[str, List[Dict]]:
        """Group findings by vulnerability type"""
        grouped = {}
        
        for finding in findings:
            vuln_type = finding.get('type', 'unknown')
            if vuln_type not in grouped:
                grouped[vuln_type] = []
            grouped[vuln_type].append(finding)
        
        return grouped
    
    def _generate_governance_proposal(self, vuln_type: str, findings: List[Dict]) -> Dict:
        """
        Generate a governance proposal for a pattern of vulnerabilities
        
        Args:
            vuln_type: Type of vulnerability
            findings: List of findings of this type
            
        Returns:
            Governance proposal dictionary
        """
        severity = findings[0].get('severity', 'MEDIUM')
        count = len(findings)
        
        # Define parameter adjustments based on vulnerability patterns
        param_adjustments = self._get_parameter_adjustments(vuln_type, severity, count)
        
        if not param_adjustments:
            return None
        
        proposal = {
            'type': 'parameter_change',
            'title': f'Strengthen Protocol: Address {vuln_type} Vulnerabilities',
            'description': f'Pattern detected: {count} instances of {vuln_type} vulnerabilities (severity: {severity}). ' +
                          f'This proposal adjusts protocol parameters to mitigate future occurrences.',
            'rationale': self._get_proposal_rationale(vuln_type, findings),
            'parameter_changes': param_adjustments,
            'affected_modules': list(set([f.get('module', 'unknown') for f in findings if f.get('module')])),
            'priority': self._calculate_priority(severity, count),
            'voting_period': '7 days',
            'execution_delay': '48 hours',
            'risk_assessment': self._assess_risk(param_adjustments)
        }
        
        return proposal
    
    def _get_parameter_adjustments(self, vuln_type: str, severity: str, count: int) -> List[Dict]:
        """
        Determine which protocol parameters to adjust based on vulnerability type
        
        Args:
            vuln_type: Type of vulnerability
            severity: Severity level
            count: Number of occurrences
            
        Returns:
            List of parameter adjustment dictionaries
        """
        adjustments = []
        
        # Map vulnerability types to parameter changes
        if 'gas' in vuln_type.lower() or 'dos' in vuln_type.lower():
            adjustments.append({
                'parameter': 'max_gas_per_block',
                'current_value': '50000000',
                'proposed_value': '40000000',
                'reasoning': 'Reduce gas limit to prevent DoS attacks'
            })
            adjustments.append({
                'parameter': 'min_gas_price',
                'current_value': '0.001',
                'proposed_value': '0.01',
                'reasoning': 'Increase minimum gas price to make spam attacks more expensive'
            })
        
        if 'overflow' in vuln_type.lower() or 'underflow' in vuln_type.lower():
            adjustments.append({
                'parameter': 'max_supply_increase_per_block',
                'current_value': '1000000',
                'proposed_value': '100000',
                'reasoning': 'Limit supply changes to prevent overflow exploits'
            })
        
        if 'timelock' in vuln_type.lower() or 'unlock' in vuln_type.lower():
            adjustments.append({
                'parameter': 'endowment_unlock_delay',
                'current_value': '30 days',
                'proposed_value': '90 days',
                'reasoning': 'Increase unlock delay for additional security'
            })
            adjustments.append({
                'parameter': 'governance_timelock',
                'current_value': '24 hours',
                'proposed_value': '72 hours',
                'reasoning': 'Extended timelock for governance unlock actions'
            })
        
        if 'bridge' in vuln_type.lower() or 'cctp' in vuln_type.lower():
            adjustments.append({
                'parameter': 'bridge_rate_limit_per_block',
                'current_value': '1000000',
                'proposed_value': '500000',
                'reasoning': 'Reduce bridge rate limit to contain potential exploits'
            })
            adjustments.append({
                'parameter': 'bridge_proof_requirement',
                'current_value': '2',
                'proposed_value': '3',
                'reasoning': 'Require additional proof signatures for cross-chain transfers'
            })
        
        if 'burn' in vuln_type.lower() or 'justice' in vuln_type.lower():
            adjustments.append({
                'parameter': 'min_burn_amount',
                'current_value': '1',
                'proposed_value': '100',
                'reasoning': 'Increase minimum burn amount to prevent micro-attack patterns'
            })
            adjustments.append({
                'parameter': 'burn_cooldown_period',
                'current_value': '0',
                'proposed_value': '10 blocks',
                'reasoning': 'Add cooldown period between burns to prevent rapid exploitation'
            })
        
        if 'arbitrator' in vuln_type.lower() or 'claims' in vuln_type.lower():
            adjustments.append({
                'parameter': 'arbitrator_bond_requirement',
                'current_value': '10000',
                'proposed_value': '50000',
                'reasoning': 'Increase arbitrator bond to ensure accountability'
            })
            adjustments.append({
                'parameter': 'claim_dispute_period',
                'current_value': '7 days',
                'proposed_value': '14 days',
                'reasoning': 'Extended dispute period for thorough review'
            })
        
        return adjustments
    
    def _get_proposal_rationale(self, vuln_type: str, findings: List[Dict]) -> str:
        """Generate detailed rationale for the proposal"""
        rationale = f"The Cerberus Auditor has detected a pattern of {vuln_type} vulnerabilities across the protocol. "
        rationale += f"Specifically, {len(findings)} instances were found with the following characteristics:\n\n"
        
        for i, finding in enumerate(findings[:3], 1):  # Show top 3
            rationale += f"{i}. {finding.get('description', 'Unknown')}\n"
            rationale += f"   Location: {finding.get('file', 'Unknown')}\n"
            rationale += f"   Severity: {finding.get('severity', 'Unknown')}\n\n"
        
        if len(findings) > 3:
            rationale += f"... and {len(findings) - 3} more instances.\n\n"
        
        rationale += "To prevent future exploits of this nature, we propose adjusting the protocol parameters listed above. "
        rationale += "These changes are designed to make such attacks economically unfeasible or technically impossible."
        
        return rationale
    
    def _calculate_priority(self, severity: str, count: int) -> str:
        """Calculate proposal priority"""
        if severity == 'CRITICAL' or count >= 5:
            return 'URGENT'
        elif severity == 'HIGH' or count >= 3:
            return 'HIGH'
        elif severity == 'MEDIUM':
            return 'MEDIUM'
        else:
            return 'LOW'
    
    def _assess_risk(self, param_adjustments: List[Dict]) -> str:
        """Assess the risk of implementing the parameter changes"""
        if len(param_adjustments) > 5:
            return 'HIGH - Multiple parameter changes may have unforeseen interactions'
        elif len(param_adjustments) > 2:
            return 'MEDIUM - Changes should be tested on testnet first'
        else:
            return 'LOW - Minimal parameter changes with low risk'
    
    def _check_systemic_issues(self, findings: List[Dict]) -> List[Dict]:
        """Check for systemic issues that require protocol-level changes"""
        proposals = []
        
        # Check if we have many CRITICAL issues
        critical_count = len([f for f in findings if f.get('severity') == 'CRITICAL'])
        
        if critical_count >= 3:
            proposals.append({
                'type': 'emergency_pause',
                'title': 'Emergency Protocol Pause - Multiple Critical Vulnerabilities',
                'description': f'{critical_count} CRITICAL vulnerabilities detected. Recommend pausing protocol until patches are applied.',
                'rationale': 'Multiple critical vulnerabilities pose existential risk to the protocol. ' +
                            'Immediate pause recommended to prevent exploitation while fixes are implemented.',
                'parameter_changes': [{
                    'parameter': 'protocol_paused',
                    'current_value': 'false',
                    'proposed_value': 'true',
                    'reasoning': 'Emergency pause to prevent exploitation'
                }],
                'priority': 'EMERGENCY',
                'voting_period': '24 hours',
                'execution_delay': 'immediate',
                'risk_assessment': 'HIGH - But necessary to prevent greater losses'
            })
        
        # Check for access control issues
        access_control_count = len([f for f in findings if 'access' in f.get('type', '').lower()])
        
        if access_control_count >= 2:
            proposals.append({
                'type': 'access_control_hardening',
                'title': 'Implement Multi-Signature Requirements',
                'description': f'Pattern of {access_control_count} access control vulnerabilities detected. ' +
                              'Propose implementing multi-signature requirements for sensitive operations.',
                'rationale': 'Access control vulnerabilities can lead to unauthorized state changes. ' +
                            'Multi-sig requirements add an additional layer of security.',
                'parameter_changes': [{
                    'parameter': 'multisig_threshold',
                    'current_value': '1',
                    'proposed_value': '3',
                    'reasoning': 'Require 3-of-5 signatures for critical operations'
                }],
                'priority': 'HIGH',
                'voting_period': '7 days',
                'execution_delay': '48 hours',
                'risk_assessment': 'LOW - Improves security without breaking changes'
            })
        
        return proposals
    
    def generate_governance_json(self, proposals: List[Dict]) -> str:
        """
        Generate JSON file for on-chain governance submission
        
        Args:
            proposals: List of governance proposals
            
        Returns:
            Path to generated JSON file
        """
        if not proposals:
            return None
        
        governance_data = {
            'version': '1.0.0',
            'generated_by': 'Cerberus Auditor - Protocol-Tuner',
            'timestamp': '2025-10-21T00:00:00Z',
            'proposals': proposals,
            'summary': {
                'total_proposals': len(proposals),
                'urgent_count': len([p for p in proposals if p.get('priority') == 'URGENT']),
                'high_count': len([p for p in proposals if p.get('priority') == 'HIGH']),
                'affected_modules': list(set([
                    module
                    for p in proposals
                    for module in p.get('affected_modules', [])
                ]))
            }
        }
        
        output_path = 'auditor/reports/governance_proposals.json'
        
        with open(output_path, 'w') as f:
            json.dump(governance_data, f, indent=2)
        
        print(f"  📄 Governance proposals saved to: {output_path}")
        
        return output_path
    
    def get_proposal_summary(self, proposals: List[Dict]) -> str:
        """Generate human-readable summary of proposals"""
        if not proposals:
            return "No governance proposals generated."
        
        summary = "🔧 PROTOCOL-TUNER GOVERNANCE PROPOSALS\n"
        summary += "=" * 80 + "\n\n"
        
        for i, proposal in enumerate(proposals, 1):
            summary += f"{i}. {proposal['title']}\n"
            summary += f"   Priority: {proposal['priority']}\n"
            summary += f"   Type: {proposal['type']}\n"
            summary += f"   Parameter Changes: {len(proposal.get('parameter_changes', []))}\n"
            summary += f"   Risk Assessment: {proposal['risk_assessment']}\n\n"
        
        summary += f"Total Proposals: {len(proposals)}\n"
        summary += "=" * 80 + "\n"
        
        return summary
