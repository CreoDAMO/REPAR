# auditor/agents/smart_contract_analyzer.py
"""
Smart Contract Analyzer for Aequitas-specific modules
Deep security analysis of custom x/ modules
"""

from typing import List, Dict
import re

class SmartContractAnalyzer:
    """
    Specialized analyzer for Aequitas Protocol custom modules:
    - x/justice: Justice Burn mechanism
    - x/endowment: Time-locked endowment fund
    - x/cctp: Cross-chain transfer protocol
    - x/defendant: Defendant tracking
    - x/claims: Arbitration system
    - x/distribution: Reparations distribution
    - x/threatdefense: Chaos defense mechanisms
    """
    
    def __init__(self):
        self.module_specific_checks = {
            'x/justice': self.analyze_justice_module,
            'x/endowment': self.analyze_endowment_module,
            'x/cctp': self.analyze_cctp_module,
            'x/defendant': self.analyze_defendant_module,
            'x/claims': self.analyze_claims_module,
            'x/distribution': self.analyze_distribution_module,
            'x/threatdefense': self.analyze_threat_defense_module
        }
    
    def analyze_file(self, file_path: str) -> List[Dict]:
        """
        Analyze a file for Aequitas-specific vulnerabilities
        
        Args:
            file_path: Path to the file
            
        Returns:
            List of findings specific to Aequitas modules
        """
        print(f"  🎯 Smart Contract Analyzer: Deep analysis of {file_path}...")
        
        findings = []
        
        # Determine which module this file belongs to
        module_name = self._identify_module(file_path)
        
        if module_name and module_name in self.module_specific_checks:
            print(f"    Analyzing {module_name} module...")
            findings = self.module_specific_checks[module_name](file_path)
        else:
            # Generic Aequitas protocol analysis
            findings = self._analyze_generic_aequitas(file_path)
        
        if findings:
            print(f"  ⚠️  Found {len(findings)} Aequitas-specific issues")
        else:
            print(f"  ✅ No Aequitas-specific issues detected")
        
        return findings
    
    def _identify_module(self, file_path: str) -> str:
        """Identify which Aequitas module a file belongs to"""
        for module in self.module_specific_checks.keys():
            if module in file_path:
                return module
        return None
    
    def analyze_justice_module(self, file_path: str) -> List[Dict]:
        """Analyze x/justice module - Justice Burn mechanism"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check 1: Burn mechanism integrity
        if 'Burn' in code and 'ValidateBasic' not in code:
            findings.append({
                'module': 'x/justice',
                'type': 'justice_burn_validation',
                'severity': 'CRITICAL',
                'description': 'Justice Burn function lacks input validation',
                'exploit_scenario': 'Attacker could trigger burn without valid payment proof',
                'fix_recommendation': 'Add ValidateBasic() checks before burn execution',
                'file': file_path
            })
        
        # Check 2: Supply manipulation protection
        if 'TotalSupply' in code and 'mutex' not in code.lower():
            findings.append({
                'module': 'x/justice',
                'type': 'supply_manipulation',
                'severity': 'HIGH',
                'description': 'Total supply calculation lacks concurrency protection',
                'exploit_scenario': 'Race condition could allow supply manipulation',
                'fix_recommendation': 'Add mutex locks for supply updates',
                'file': file_path
            })
        
        # Check 3: Front-running protection
        if 'ProcessBurn' in code and 'nonce' not in code.lower():
            findings.append({
                'module': 'x/justice',
                'type': 'burn_frontrunning',
                'severity': 'MEDIUM',
                'description': 'Burn processing vulnerable to front-running',
                'exploit_scenario': 'MEV extraction from burn events',
                'fix_recommendation': 'Implement nonce-based ordering',
                'file': file_path
            })
        
        return findings
    
    def analyze_endowment_module(self, file_path: str) -> List[Dict]:
        """Analyze x/endowment module - Time-locked funds"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check 1: Time-lock bypass
        if 'UnlockTime' in code or 'LockTime' in code:
            if 'ctx.BlockTime()' not in code:
                findings.append({
                    'module': 'x/endowment',
                    'type': 'timelock_bypass',
                    'severity': 'CRITICAL',
                    'description': 'Time-lock check missing block time validation',
                    'exploit_scenario': 'Funds could be unlocked prematurely',
                    'fix_recommendation': 'Always validate against ctx.BlockTime()',
                    'file': file_path
                })
        
        # Check 2: Governance unlock protection
        if 'Unlock' in code and 'governance' in code.lower():
            findings.append({
                'module': 'x/endowment',
                'type': 'governance_unlock',
                'severity': 'HIGH',
                'description': 'Governance-based unlock may bypass time-locks',
                'exploit_scenario': 'Malicious governance proposal could drain endowment',
                'fix_recommendation': 'Require multi-sig and time-delay for governance unlocks',
                'file': file_path
            })
        
        # Check 3: Integer overflow in unlock amount
        if 'Amount' in code and 'SafeMath' not in code:
            findings.append({
                'module': 'x/endowment',
                'type': 'amount_overflow',
                'severity': 'HIGH',
                'description': 'Unlock amount calculation vulnerable to overflow',
                'exploit_scenario': 'Overflow could allow draining entire endowment',
                'fix_recommendation': 'Use SafeMath for all amount calculations',
                'file': file_path
            })
        
        return findings
    
    def analyze_cctp_module(self, file_path: str) -> List[Dict]:
        """Analyze x/cctp module - Cross-chain transfer protocol"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check 1: Bridge security
        if 'Bridge' in code or 'Transfer' in code:
            if 'VerifyProof' not in code and 'ValidateSignature' not in code:
                findings.append({
                    'module': 'x/cctp',
                    'type': 'bridge_validation',
                    'severity': 'CRITICAL',
                    'description': 'Cross-chain transfer lacks cryptographic verification',
                    'exploit_scenario': 'Fake transfers could mint unbacked tokens',
                    'fix_recommendation': 'Implement signature or merkle proof validation',
                    'file': file_path
                })
        
        # Check 2: Replay attack protection
        if 'ProcessTransfer' in code and 'nonce' not in code.lower():
            findings.append({
                'module': 'x/cctp',
                'type': 'replay_attack',
                'severity': 'CRITICAL',
                'description': 'Bridge lacks replay attack protection',
                'exploit_scenario': 'Same transfer message could be replayed multiple times',
                'fix_recommendation': 'Implement nonce or unique message ID tracking',
                'file': file_path
            })
        
        # Check 3: Rate limiting
        if 'Mint' in code and 'RateLimit' not in code:
            findings.append({
                'module': 'x/cctp',
                'type': 'rate_limiting',
                'severity': 'HIGH',
                'description': 'No rate limiting on cross-chain minting',
                'exploit_scenario': 'Bridge exploit could rapidly drain liquidity',
                'fix_recommendation': 'Implement per-block and per-address rate limits',
                'file': file_path
            })
        
        return findings
    
    def analyze_defendant_module(self, file_path: str) -> List[Dict]:
        """Analyze x/defendant module - Defendant tracking"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check for privacy and access control
        if 'GetDefendant' in code and 'CheckPermission' not in code:
            findings.append({
                'module': 'x/defendant',
                'type': 'access_control',
                'severity': 'HIGH',
                'description': 'Defendant data access lacks permission checks',
                'exploit_scenario': 'Unauthorized access to sensitive defendant information',
                'fix_recommendation': 'Implement role-based access control',
                'file': file_path
            })
        
        return findings
    
    def analyze_claims_module(self, file_path: str) -> List[Dict]:
        """Analyze x/claims module - Arbitration system"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check arbitration fairness
        if 'ProcessClaim' in code and 'Arbitrator' in code:
            if 'ValidateArbitrator' not in code:
                findings.append({
                    'module': 'x/claims',
                    'type': 'arbitrator_validation',
                    'severity': 'CRITICAL',
                    'description': 'Arbitrator authority not validated',
                    'exploit_scenario': 'Unauthorized arbitrator could approve fraudulent claims',
                    'fix_recommendation': 'Validate arbitrator credentials before claim processing',
                    'file': file_path
                })
        
        return findings
    
    def analyze_distribution_module(self, file_path: str) -> List[Dict]:
        """Analyze x/distribution module - Reparations distribution"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check distribution fairness
        if 'Distribute' in code and 'CalculateShare' in code:
            if 'overflow' not in code.lower() and 'SafeMath' not in code:
                findings.append({
                    'module': 'x/distribution',
                    'type': 'distribution_calculation',
                    'severity': 'HIGH',
                    'description': 'Distribution calculation vulnerable to overflow',
                    'exploit_scenario': 'Overflow could cause incorrect reparation amounts',
                    'fix_recommendation': 'Use SafeMath for all distribution calculations',
                    'file': file_path
                })
        
        return findings
    
    def analyze_threat_defense_module(self, file_path: str) -> List[Dict]:
        """Analyze x/threatdefense module - Chaos defense mechanisms"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check defense mechanism activation
        if 'ActivateDefense' in code and 'threshold' in code.lower():
            findings.append({
                'module': 'x/threatdefense',
                'type': 'defense_activation',
                'severity': 'MEDIUM',
                'description': 'Threat defense activation threshold should be validated',
                'exploit_scenario': 'False positive defense activation could halt protocol',
                'fix_recommendation': 'Implement multi-signature or consensus-based activation',
                'file': file_path
            })
        
        return findings
    
    def _analyze_generic_aequitas(self, file_path: str) -> List[Dict]:
        """Generic Aequitas protocol analysis for non-module-specific files"""
        findings = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Check for proper keeper access patterns
        if 'keeper' in code.lower() and 'Get' in code:
            if 'ValidateBasic' not in code:
                findings.append({
                    'type': 'keeper_validation',
                    'severity': 'MEDIUM',
                    'description': 'Keeper access without input validation',
                    'exploit_scenario': 'Invalid data could corrupt state',
                    'fix_recommendation': 'Add ValidateBasic() checks',
                    'file': file_path
                })
        
        return findings
