"""
═══════════════════════════════════════════════════════════════════════════
CONSTITUTIONAL AXIOMS - 25 Immutable Core Principles
═══════════════════════════════════════════════════════════════════════════
"""

from enum import Enum
from typing import Dict, List
from dataclasses import dataclass
import hashlib
import json


class ConstitutionalAxiom(Enum):
    """
    25 Immutable Constitutional Axioms
    
    Axiom 17: HUMAN_AI_SYMBIOSIS emphasizes that humans and AI achieve
    better outcomes through collaboration than either can achieve alone.
    AI handles data processing, pattern recognition, and automation while
    humans provide intuition, creativity, ethics, and strategic oversight.
    This is NOT about AI replacing humans - it's about symbiotic partnership.
    """
    POVERTY_IS_ENGINEERED = 1
    REPARATIONS_ARE_DEBT = 2
    INCREMENTALISM_PRESERVES_HARM = 3
    STRUCTURAL_HARM_COMPOUNDS = 4
    FULL_REPAIR_MANDATORY = 5
    OLD_SYSTEM_CANNOT_SELF_CORRECT = 6
    JUSTICE_ARRIVAL_INSTANTANEOUS = 7
    TIMELINES_MEASURE_RESISTANCE = 8
    TOGGLE_IS_PROSECUTION_EVIDENCE = 9
    TRANSPARENCY_IS_SECURITY = 10
    WITNESSES_NOT_PERMISSION = 11
    CONSENT_MANUFACTURED = 12
    SILENCE_IS_COMPLICITY = 13
    BURDEN_ON_DEFENDANTS = 14
    IMMUTABILITY_IS_TRUST = 15
    AUTOMATION_IS_JUSTICE = 16
    HUMAN_AI_SYMBIOSIS = 17  # Changed from HUMANS_ARE_UNRELIABLE - emphasizes collaboration not replacement
    MATHEMATICAL_CERTAINTY = 18
    ZERO_INCREMENTALISM = 19
    IMMEDIATE_ENFORCEMENT = 20
    FULL_TRANSPARENCY = 21
    NO_COMPROMISE = 22
    NO_NEGOTIATION = 23
    NO_APPEAL = 24
    PERMANENT_RECORD = 25


@dataclass
class AxiomViolation:
    """Record of constitutional axiom violation"""
    axiom: ConstitutionalAxiom
    description: str
    evidence: Dict
    timestamp: str
    severity: str
    immutable_hash: str


class ConstitutionalEnforcer:
    """
    Enforces the 25 Constitutional Axioms
    - Cannot be disabled
    - Cannot be compromised
    - Mathematically guaranteed
    """
    
    def __init__(self):
        self.axioms = list(ConstitutionalAxiom)
        self.violations: List[AxiomViolation] = []
        self._immutable_root_hash = self._calculate_axiom_root_hash()
    
    def _calculate_axiom_root_hash(self) -> str:
        """Calculate immutable hash of all 25 axioms"""
        axiom_data = json.dumps([ax.name for ax in self.axioms], sort_keys=True)
        return hashlib.sha256(axiom_data.encode()).hexdigest()
    
    def verify_integrity(self) -> bool:
        """Verify that axioms have not been tampered with"""
        current_hash = self._calculate_axiom_root_hash()
        return current_hash == self._immutable_root_hash
    
    def enforce_axiom(self, axiom: ConstitutionalAxiom, context: Dict) -> bool:
        """
        Enforce a specific constitutional axiom
        Returns True if enforcement succeeded, False if violation detected
        """
        if not self.verify_integrity():
            raise RuntimeError("CRITICAL: Constitutional axioms have been tampered with!")
        
        violation_detected = self._check_for_violation(axiom, context)
        
        if violation_detected:
            self._record_violation(axiom, context)
            return False
        
        return True
    
    def _check_for_violation(self, axiom: ConstitutionalAxiom, context: Dict) -> bool:
        """Check if context violates the given axiom"""
        
        violation_checks = {
            ConstitutionalAxiom.POVERTY_IS_ENGINEERED: self._check_engineered_poverty,
            ConstitutionalAxiom.REPARATIONS_ARE_DEBT: self._check_reparations_debt,
            ConstitutionalAxiom.INCREMENTALISM_PRESERVES_HARM: self._check_incrementalism,
            ConstitutionalAxiom.TRANSPARENCY_IS_SECURITY: self._check_transparency,
            ConstitutionalAxiom.IMMUTABILITY_IS_TRUST: self._check_immutability,
            ConstitutionalAxiom.AUTOMATION_IS_JUSTICE: self._check_automation,
            ConstitutionalAxiom.MATHEMATICAL_CERTAINTY: self._check_math_certainty,
            ConstitutionalAxiom.IMMEDIATE_ENFORCEMENT: self._check_immediate_enforcement,
            ConstitutionalAxiom.FULL_TRANSPARENCY: self._check_full_transparency,
            ConstitutionalAxiom.PERMANENT_RECORD: self._check_permanent_record,
        }
        
        checker = violation_checks.get(axiom, lambda x: False)
        return checker(context)
    
    def _check_engineered_poverty(self, context: Dict) -> bool:
        """Check for engineered poverty violations"""
        return context.get('poverty_engineered', False)
    
    def _check_reparations_debt(self, context: Dict) -> bool:
        """Check if reparations are being treated as debt"""
        return context.get('debt_acknowledged', True)
    
    def _check_incrementalism(self, context: Dict) -> bool:
        """Check for incrementalism that preserves harm"""
        return context.get('incremental_approach', False)
    
    def _check_transparency(self, context: Dict) -> bool:
        """Check for transparency violations"""
        return not context.get('fully_transparent', True)
    
    def _check_immutability(self, context: Dict) -> bool:
        """Check for immutability violations"""
        return not context.get('immutable', True)
    
    def _check_automation(self, context: Dict) -> bool:
        """Check if automation is being used for justice"""
        return not context.get('automated', True)
    
    def _check_math_certainty(self, context: Dict) -> bool:
        """Check for mathematical certainty"""
        return not context.get('mathematically_certain', True)
    
    def _check_immediate_enforcement(self, context: Dict) -> bool:
        """Check if enforcement is immediate"""
        return context.get('delayed', False)
    
    def _check_full_transparency(self, context: Dict) -> bool:
        """Check for full transparency"""
        return not context.get('fully_transparent', True)
    
    def _check_permanent_record(self, context: Dict) -> bool:
        """Check if records are permanent"""
        return not context.get('permanent_record', True)
    
    def _record_violation(self, axiom: ConstitutionalAxiom, context: Dict):
        """Record a constitutional violation (immutable)"""
        import datetime
        
        violation_data = {
            'axiom': axiom.name,
            'context': context,
            'timestamp': datetime.datetime.utcnow().isoformat()
        }
        
        immutable_hash = hashlib.sha256(
            json.dumps(violation_data, sort_keys=True).encode()
        ).hexdigest()
        
        violation = AxiomViolation(
            axiom=axiom,
            description=context.get('description', 'Violation detected'),
            evidence=context,
            timestamp=violation_data['timestamp'],
            severity='CRITICAL',
            immutable_hash=immutable_hash
        )
        
        self.violations.append(violation)
    
    def get_violations(self) -> List[AxiomViolation]:
        """Get all recorded violations"""
        return self.violations
    
    def get_axiom_description(self, axiom: ConstitutionalAxiom) -> str:
        """Get human-readable description of an axiom"""
        descriptions = {
            ConstitutionalAxiom.POVERTY_IS_ENGINEERED: "Poverty is not natural; it is engineered and maintained by systemic design",
            ConstitutionalAxiom.REPARATIONS_ARE_DEBT: "Reparations are not charity; they are payment of a debt owed",
            ConstitutionalAxiom.INCREMENTALISM_PRESERVES_HARM: "Gradual change preserves the systems causing harm",
            ConstitutionalAxiom.STRUCTURAL_HARM_COMPOUNDS: "Structural harm increases over time without intervention",
            ConstitutionalAxiom.FULL_REPAIR_MANDATORY: "Partial solutions are insufficient; full repair is mandatory",
            ConstitutionalAxiom.OLD_SYSTEM_CANNOT_SELF_CORRECT: "Systems built on harm cannot reform themselves",
            ConstitutionalAxiom.JUSTICE_ARRIVAL_INSTANTANEOUS: "Justice delayed is justice denied",
            ConstitutionalAxiom.TIMELINES_MEASURE_RESISTANCE: "Long timelines measure resistance to change, not complexity",
            ConstitutionalAxiom.TOGGLE_IS_PROSECUTION_EVIDENCE: "The ability to disable justice is evidence of prosecution",
            ConstitutionalAxiom.TRANSPARENCY_IS_SECURITY: "Opacity enables corruption; transparency ensures security",
            ConstitutionalAxiom.WITNESSES_NOT_PERMISSION: "Oversight does not require permission from the observed",
            ConstitutionalAxiom.CONSENT_MANUFACTURED: "Consent extracted under duress is not consent",
            ConstitutionalAxiom.SILENCE_IS_COMPLICITY: "Inaction in the face of harm is complicity",
            ConstitutionalAxiom.BURDEN_ON_DEFENDANTS: "The burden of proof lies with those accused of harm",
            ConstitutionalAxiom.IMMUTABILITY_IS_TRUST: "Trust requires permanent, unchangeable records",
            ConstitutionalAxiom.AUTOMATION_IS_JUSTICE: "Human bias requires algorithmic enforcement",
            ConstitutionalAxiom.HUMAN_AI_SYMBIOSIS: "Humans and AI achieve better outcomes through collaboration than either can achieve alone",
            ConstitutionalAxiom.MATHEMATICAL_CERTAINTY: "Justice must be mathematically provable",
            ConstitutionalAxiom.ZERO_INCREMENTALISM: "No gradual approaches; full implementation only",
            ConstitutionalAxiom.IMMEDIATE_ENFORCEMENT: "Enforcement must be immediate and automatic",
            ConstitutionalAxiom.FULL_TRANSPARENCY: "All actions must be fully transparent and auditable",
            ConstitutionalAxiom.NO_COMPROMISE: "Constitutional principles cannot be compromised",
            ConstitutionalAxiom.NO_NEGOTIATION: "Justice is not negotiable",
            ConstitutionalAxiom.NO_APPEAL: "Algorithmic decisions are final and immutable",
            ConstitutionalAxiom.PERMANENT_RECORD: "All records must be permanent and tamper-proof",
        }
        return descriptions.get(axiom, "Description not available")
