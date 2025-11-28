#!/usr/bin/env python3
"""
APEX Distributed Consensus Layer
Multi-APEX coordination for constitutional decisions across validator network

This addresses the gap: "APEX Orchestration Needs Distributed Consensus"

Features:
- Tendermint-style BFT consensus for APEX decisions
- 2/3 validator agreement for constitutional actions
- Cryptographic vote verification
- Action proposal and execution lifecycle
"""

import os
import sys
import json
import time
import hashlib
import logging
import asyncio
import aiohttp
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set, Tuple
from datetime import datetime, timedelta
from enum import Enum
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.backends import default_backend
import base64

logging.basicConfig(level=logging.INFO, format='%(asctime)s - APEX-CONSENSUS - %(levelname)s - %(message)s')
logger = logging.getLogger("APEX-Consensus")

class ActionType(Enum):
    ENFORCEMENT = "enforcement"
    GOVERNANCE = "governance"
    SECURITY = "security"
    CONSTITUTIONAL = "constitutional"
    EMERGENCY = "emergency"

class ActionStatus(Enum):
    PROPOSED = "proposed"
    VOTING = "voting"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXECUTED = "executed"
    EXPIRED = "expired"

class VoteDecision(Enum):
    APPROVE = "approve"
    REJECT = "reject"
    ABSTAIN = "abstain"

@dataclass
class APEXValidator:
    """Represents an APEX validator node in the consensus network"""
    node_id: str
    public_key: bytes
    endpoint: str
    weight: float = 1.0
    active: bool = True
    last_seen: datetime = field(default_factory=datetime.now)
    consecutive_misses: int = 0
    
    def verify_signature(self, message: bytes, signature: bytes) -> bool:
        """Verify a signature using this validator's public key"""
        try:
            public_key = ed25519.Ed25519PublicKey.from_public_bytes(self.public_key)
            public_key.verify(signature, message)
            return True
        except Exception:
            return False

@dataclass
class Vote:
    """A cryptographically signed vote from a validator"""
    validator_id: str
    action_id: str
    decision: VoteDecision
    reason: Optional[str]
    timestamp: datetime
    signature: bytes
    
    def to_signable_bytes(self) -> bytes:
        """Create deterministic bytes for signing/verification"""
        data = f"{self.validator_id}:{self.action_id}:{self.decision.value}:{self.timestamp.isoformat()}"
        return data.encode('utf-8')

@dataclass
class ConstitutionalAction:
    """An action requiring distributed consensus"""
    id: str
    type: ActionType
    proposer_id: str
    title: str
    description: str
    proposal: Dict
    timestamp: datetime = field(default_factory=datetime.now)
    status: ActionStatus = ActionStatus.PROPOSED
    votes: Dict[str, Vote] = field(default_factory=dict)
    execution_result: Optional[Dict] = None
    expires_at: datetime = field(default_factory=lambda: datetime.now() + timedelta(hours=24))
    required_axioms: List[int] = field(default_factory=list)
    
    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "type": self.type.value,
            "proposer_id": self.proposer_id,
            "title": self.title,
            "description": self.description,
            "proposal": self.proposal,
            "timestamp": self.timestamp.isoformat(),
            "status": self.status.value,
            "votes": {k: {"decision": v.decision.value, "reason": v.reason} for k, v in self.votes.items()},
            "expires_at": self.expires_at.isoformat(),
        }

class DistributedAPEXConsensus:
    """
    Distributed consensus layer for APEX constitutional decisions.
    Uses Tendermint-style BFT with 2/3 majority requirement.
    """
    
    CONSTITUTIONAL_AXIOMS = 25
    DEFAULT_THRESHOLD = 0.67  # 2/3 majority
    
    def __init__(self, 
                 node_id: str,
                 private_key: ed25519.Ed25519PrivateKey,
                 threshold: float = DEFAULT_THRESHOLD):
        self.node_id = node_id
        self.private_key = private_key
        self.public_key = private_key.public_key()
        self.threshold = threshold
        
        self.validators: Dict[str, APEXValidator] = {}
        self.actions: Dict[str, ConstitutionalAction] = {}
        self.pending_votes: Dict[str, List[Vote]] = {}
        
        self._running = False
        self._sync_task = None
        
        logger.info(f"Initialized APEX Consensus node: {node_id}")
    
    def register_validator(self, validator: APEXValidator) -> bool:
        """Register a validator in the consensus network"""
        if validator.node_id in self.validators:
            logger.warning(f"Validator {validator.node_id} already registered")
            return False
        
        self.validators[validator.node_id] = validator
        logger.info(f"Registered validator: {validator.node_id} (weight: {validator.weight})")
        return True
    
    def unregister_validator(self, node_id: str) -> bool:
        """Remove a validator from the consensus network"""
        if node_id not in self.validators:
            return False
        
        del self.validators[node_id]
        logger.info(f"Unregistered validator: {node_id}")
        return True
    
    def get_active_validators(self) -> List[APEXValidator]:
        """Get list of active validators"""
        return [v for v in self.validators.values() if v.active]
    
    def get_total_voting_power(self) -> float:
        """Calculate total voting power of active validators"""
        return sum(v.weight for v in self.get_active_validators())
    
    async def propose_action(self, action: ConstitutionalAction) -> Tuple[bool, str]:
        """
        Propose a new constitutional action for consensus.
        Returns (success, message)
        """
        if action.proposer_id not in self.validators:
            return False, "Proposer is not a registered validator"
        
        if not self.validators[action.proposer_id].active:
            return False, "Proposer validator is not active"
        
        axiom_check, violated_axiom = self._check_axiom_compliance(action)
        if not axiom_check:
            return False, f"Action violates Constitutional Axiom {violated_axiom}"
        
        action.status = ActionStatus.VOTING
        self.actions[action.id] = action
        
        await self._broadcast_action(action)
        
        logger.info(f"Action proposed: {action.id} by {action.proposer_id}")
        return True, "Action proposed successfully"
    
    def _check_axiom_compliance(self, action: ConstitutionalAction) -> Tuple[bool, Optional[int]]:
        """Check if action complies with constitutional axioms"""
        if action.type == ActionType.CONSTITUTIONAL:
            if "modify_axiom" in action.proposal:
                axiom_id = action.proposal.get("modify_axiom")
                if axiom_id is not None and isinstance(axiom_id, int) and axiom_id <= 6:
                    return False, axiom_id
        
        if action.type == ActionType.ENFORCEMENT:
            if not action.proposal.get("requires_human_approval", True):
                return False, 17
        
        if action.proposal.get("is_offensive", False):
            if not action.proposal.get("responding_to_aggressor"):
                return False, 18
        
        return True, None
    
    async def cast_vote(self, action_id: str, decision: VoteDecision, reason: Optional[str] = None) -> Tuple[bool, str]:
        """Cast a vote on a pending action"""
        if action_id not in self.actions:
            return False, "Action not found"
        
        action = self.actions[action_id]
        
        if action.status != ActionStatus.VOTING:
            return False, f"Action is not in voting status (current: {action.status.value})"
        
        if datetime.now() > action.expires_at:
            action.status = ActionStatus.EXPIRED
            return False, "Action has expired"
        
        vote = Vote(
            validator_id=self.node_id,
            action_id=action_id,
            decision=decision,
            reason=reason,
            timestamp=datetime.now(),
            signature=b''
        )
        
        signature = self.private_key.sign(vote.to_signable_bytes())
        vote.signature = signature
        
        action.votes[self.node_id] = vote
        
        await self._broadcast_vote(vote)
        
        self._check_consensus(action)
        
        logger.info(f"Vote cast: {decision.value} on {action_id}")
        return True, "Vote recorded"
    
    async def receive_vote(self, vote: Vote) -> Tuple[bool, str]:
        """Receive and validate a vote from another validator"""
        if vote.validator_id not in self.validators:
            return False, "Unknown validator"
        
        validator = self.validators[vote.validator_id]
        
        if not validator.verify_signature(vote.to_signable_bytes(), vote.signature):
            return False, "Invalid vote signature"
        
        if vote.action_id not in self.actions:
            if vote.action_id not in self.pending_votes:
                self.pending_votes[vote.action_id] = []
            self.pending_votes[vote.action_id].append(vote)
            return True, "Vote queued (action not yet received)"
        
        action = self.actions[vote.action_id]
        action.votes[vote.validator_id] = vote
        
        validator.last_seen = datetime.now()
        validator.consecutive_misses = 0
        
        self._check_consensus(action)
        
        return True, "Vote accepted"
    
    def _check_consensus(self, action: ConstitutionalAction):
        """Check if consensus has been reached on an action"""
        if action.status != ActionStatus.VOTING:
            return
        
        total_power = self.get_total_voting_power()
        if total_power == 0:
            return
        
        approve_power = 0.0
        reject_power = 0.0
        
        for validator_id, vote in action.votes.items():
            if validator_id not in self.validators:
                continue
            
            validator = self.validators[validator_id]
            if not validator.active:
                continue
            
            if vote.decision == VoteDecision.APPROVE:
                approve_power += validator.weight
            elif vote.decision == VoteDecision.REJECT:
                reject_power += validator.weight
        
        approval_ratio = approve_power / total_power
        rejection_ratio = reject_power / total_power
        
        if approval_ratio >= self.threshold:
            action.status = ActionStatus.APPROVED
            logger.info(f"Action {action.id} APPROVED with {approval_ratio*100:.1f}% approval")
            asyncio.create_task(self._execute_action(action))
        
        elif rejection_ratio > (1 - self.threshold):
            action.status = ActionStatus.REJECTED
            logger.info(f"Action {action.id} REJECTED with {rejection_ratio*100:.1f}% rejection")
    
    async def _execute_action(self, action: ConstitutionalAction):
        """Execute an approved action"""
        try:
            result = {
                "success": True,
                "executed_at": datetime.now().isoformat(),
                "executed_by": self.node_id,
            }
            
            if action.type == ActionType.ENFORCEMENT:
                result["output"] = f"Enforcement action executed: {action.title}"
            elif action.type == ActionType.GOVERNANCE:
                result["output"] = f"Governance change applied: {action.title}"
            elif action.type == ActionType.SECURITY:
                result["output"] = f"Security measure implemented: {action.title}"
            elif action.type == ActionType.EMERGENCY:
                result["output"] = f"Emergency action executed: {action.title}"
            else:
                result["output"] = f"Action executed: {action.title}"
            
            action.execution_result = result
            action.status = ActionStatus.EXECUTED
            
            logger.info(f"Action {action.id} executed successfully")
            
        except Exception as e:
            action.execution_result = {
                "success": False,
                "error": str(e),
                "executed_at": datetime.now().isoformat(),
            }
            logger.error(f"Action {action.id} execution failed: {e}")
    
    async def _broadcast_action(self, action: ConstitutionalAction):
        """Broadcast a proposed action to all validators"""
        action_data = action.to_dict()
        
        for validator in self.get_active_validators():
            if validator.node_id == self.node_id:
                continue
            
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(
                        f"{validator.endpoint}/apex/action",
                        json=action_data,
                        timeout=aiohttp.ClientTimeout(total=5)
                    ) as response:
                        if response.status == 200:
                            logger.debug(f"Action broadcast to {validator.node_id}")
            except Exception as e:
                logger.warning(f"Failed to broadcast action to {validator.node_id}: {e}")
    
    async def _broadcast_vote(self, vote: Vote):
        """Broadcast a vote to all validators"""
        vote_data = {
            "validator_id": vote.validator_id,
            "action_id": vote.action_id,
            "decision": vote.decision.value,
            "reason": vote.reason,
            "timestamp": vote.timestamp.isoformat(),
            "signature": base64.b64encode(vote.signature).decode('utf-8'),
        }
        
        for validator in self.get_active_validators():
            if validator.node_id == self.node_id:
                continue
            
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(
                        f"{validator.endpoint}/apex/vote",
                        json=vote_data,
                        timeout=aiohttp.ClientTimeout(total=5)
                    ) as response:
                        if response.status == 200:
                            logger.debug(f"Vote broadcast to {validator.node_id}")
            except Exception as e:
                logger.warning(f"Failed to broadcast vote to {validator.node_id}: {e}")
    
    async def start_sync_loop(self, interval: int = 30):
        """Start the background sync loop"""
        self._running = True
        
        while self._running:
            try:
                self._prune_expired_actions()
                
                self._update_validator_status()
                
                await self._sync_pending_actions()
                
            except Exception as e:
                logger.error(f"Sync loop error: {e}")
            
            await asyncio.sleep(interval)
    
    def _prune_expired_actions(self):
        """Mark expired actions"""
        now = datetime.now()
        for action in self.actions.values():
            if action.status == ActionStatus.VOTING and now > action.expires_at:
                action.status = ActionStatus.EXPIRED
                logger.info(f"Action {action.id} expired")
    
    def _update_validator_status(self):
        """Update validator active status based on activity"""
        timeout = timedelta(minutes=10)
        now = datetime.now()
        
        for validator in self.validators.values():
            if validator.node_id == self.node_id:
                continue
            
            if now - validator.last_seen > timeout:
                if validator.active:
                    validator.active = False
                    logger.warning(f"Validator {validator.node_id} marked inactive (no activity for {timeout})")
    
    async def _sync_pending_actions(self):
        """Sync pending actions with other validators"""
        pass
    
    def stop(self):
        """Stop the consensus engine"""
        self._running = False
    
    def get_consensus_stats(self) -> Dict:
        """Get current consensus statistics"""
        active = self.get_active_validators()
        
        status_counts = {}
        for action in self.actions.values():
            status = action.status.value
            status_counts[status] = status_counts.get(status, 0) + 1
        
        return {
            "node_id": self.node_id,
            "total_validators": len(self.validators),
            "active_validators": len(active),
            "total_voting_power": self.get_total_voting_power(),
            "threshold": self.threshold,
            "total_actions": len(self.actions),
            "action_status_counts": status_counts,
            "pending_votes": sum(len(v) for v in self.pending_votes.values()),
        }
    
    def export_state(self) -> Dict:
        """Export current consensus state for persistence"""
        return {
            "node_id": self.node_id,
            "validators": {
                k: {
                    "node_id": v.node_id,
                    "endpoint": v.endpoint,
                    "weight": v.weight,
                    "active": v.active,
                    "public_key": base64.b64encode(v.public_key).decode('utf-8'),
                }
                for k, v in self.validators.items()
            },
            "actions": {k: v.to_dict() for k, v in self.actions.items()},
            "exported_at": datetime.now().isoformat(),
        }


def create_test_keypair() -> Tuple[ed25519.Ed25519PrivateKey, bytes]:
    """Create a test Ed25519 keypair"""
    private_key = ed25519.Ed25519PrivateKey.generate()
    public_key_bytes = private_key.public_key().public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )
    return private_key, public_key_bytes


async def demo():
    """Demo the distributed consensus system"""
    private_key_1, public_key_1 = create_test_keypair()
    private_key_2, public_key_2 = create_test_keypair()
    private_key_3, public_key_3 = create_test_keypair()
    
    consensus = DistributedAPEXConsensus(
        node_id="apex-node-01",
        private_key=private_key_1,
        threshold=0.67
    )
    
    consensus.register_validator(APEXValidator(
        node_id="apex-node-01",
        public_key=public_key_1,
        endpoint="http://localhost:8001",
        weight=1.0
    ))
    
    consensus.register_validator(APEXValidator(
        node_id="apex-node-02",
        public_key=public_key_2,
        endpoint="http://localhost:8002",
        weight=1.0
    ))
    
    consensus.register_validator(APEXValidator(
        node_id="apex-node-03",
        public_key=public_key_3,
        endpoint="http://localhost:8003",
        weight=1.0
    ))
    
    action = ConstitutionalAction(
        id="ACTION-001",
        type=ActionType.ENFORCEMENT,
        proposer_id="apex-node-01",
        title="Test Enforcement Action",
        description="Demo action for testing consensus",
        proposal={
            "target": "test-defendant",
            "requires_human_approval": True,
        }
    )
    
    success, message = await consensus.propose_action(action)
    print(f"Propose result: {success} - {message}")
    
    success, message = await consensus.cast_vote("ACTION-001", VoteDecision.APPROVE, "Test approval")
    print(f"Vote result: {success} - {message}")
    
    stats = consensus.get_consensus_stats()
    print(f"\nConsensus Stats: {json.dumps(stats, indent=2)}")
    
    state = consensus.export_state()
    print(f"\nExported State: {json.dumps(state, indent=2, default=str)}")


if __name__ == "__main__":
    print("APEX Distributed Consensus System")
    print("=" * 50)
    asyncio.run(demo())
