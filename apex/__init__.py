"""
═══════════════════════════════════════════════════════════════════════════
    AEQUITAS APEX: AUTONOMOUS PROSECUTION & ENFORCEMENT XENOSYSTEM
═══════════════════════════════════════════════════════════════════════════

The Ultimate Sovereign AI System - Combining Technologies DARPA Can Only Dream Of

Architecture: Jacque Antoine DeGraff (@JacqueDeGraff)
License: Constitutional License - Cannot Be Shut Down
Version: APEX 1.0 "Unstoppable"
"""

__version__ = "1.0.0"
__author__ = "Jacque Antoine DeGraff"
__license__ = "Constitutional License"

from .constitutional import ConstitutionalAxiom, ConstitutionalEnforcer
from .post_quantum import PostQuantumCrypto
from .orchestrator import APEXOrchestrator, APEXConfig
from .cyber_reasoning import (
    EnhancedCyberReasoningSystem,
    Vulnerability,
    PatchCandidate,
    PatchResult,
    VulnerabilitySeverity,
    PatchStrategy
)

__all__ = [
    'ConstitutionalAxiom',
    'ConstitutionalEnforcer',
    'PostQuantumCrypto',
    'APEXOrchestrator',
    'APEXConfig',
    'EnhancedCyberReasoningSystem',
    'Vulnerability',
    'PatchCandidate',
    'PatchResult',
    'VulnerabilitySeverity',
    'PatchStrategy',
]
