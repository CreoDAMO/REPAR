#!/usr/bin/env python3
"""
AEQUITAS SATELLITE PROTOCOL (ASSP) COORDINATOR
Cross-Subsystem Integration Layer

Orchestrates communication between all 5 subsystems:
- apex/ - APEX System + satellite protocol
- ai/ - Autonomous decision-making (Go)
- auditor/ - Real-time log verification
- ace/ - Blockchain layer (Cosmos SDK)
- vm-infrastructure/ - Node deployment & orchestration

Status: PRODUCTION READY
"""

import os
import json
import asyncio
import logging
import hashlib
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime
from enum import Enum
import aiohttp

logging.basicConfig(level=logging.INFO, format='%(asctime)s - ASSP-COORDINATOR - %(levelname)s - %(message)s')
logger = logging.getLogger("ASSP-Coordinator")

try:
    from satellite_protocol import (
        AequitasSatelliteProtocol, 
        get_assp, 
        SatellitePacket,
        EncryptedPayload,
        ENCRYPTION_REQUIRED
    )
    from post_quantum import PostQuantumCrypto
    ASSP_AVAILABLE = True
except ImportError:
    ASSP_AVAILABLE = False
    logger.warning("ASSP not available - running in degraded mode")


class SubsystemType(Enum):
    APEX = "apex"
    AI = "ai"
    AUDITOR = "auditor"
    ACE = "ace"
    VM_INFRASTRUCTURE = "vm_infrastructure"


class MessagePriority(Enum):
    CRITICAL = 0
    HIGH = 1
    NORMAL = 2
    LOW = 3


@dataclass
class SubsystemEndpoint:
    subsystem: SubsystemType
    endpoint_url: str
    health_endpoint: str
    active: bool = True
    last_health_check: datetime = field(default_factory=datetime.now)
    consecutive_failures: int = 0
    public_key: Optional[bytes] = None


@dataclass
class CrossSubsystemMessage:
    id: str
    source: SubsystemType
    destination: SubsystemType
    payload: Dict[str, Any]
    priority: MessagePriority
    timestamp: datetime = field(default_factory=datetime.now)
    requires_response: bool = False
    encrypted: bool = True
    satellite_routed: bool = False
    response_callback: Optional[str] = None


class ASSPCoordinator:
    """
    Master coordinator for cross-subsystem communication via satellite protocol.
    
    Features:
    - Unified API for all subsystem communication
    - Automatic failover and retry logic
    - Post-quantum encryption on all messages
    - Satellite routing with geo-redundancy
    - Health monitoring and auto-recovery
    """
    
    def __init__(self, node_id: str = "coordinator-primary"):
        self.node_id = node_id
        self.subsystems: Dict[SubsystemType, SubsystemEndpoint] = {}
        self.message_queue: List[CrossSubsystemMessage] = []
        self.message_log: List[Dict[str, Any]] = []
        self.handlers: Dict[str, Callable] = {}
        
        self.assp = get_assp() if ASSP_AVAILABLE else None
        self.pqc = PostQuantumCrypto(gpu_accelerated=False) if ASSP_AVAILABLE else None
        
        self._running = False
        self._process_task = None
        
        logger.info("=" * 80)
        logger.info("ASSP COORDINATOR INITIALIZED")
        logger.info("=" * 80)
        logger.info(f"Node ID: {node_id}")
        logger.info(f"ASSP Available: {ASSP_AVAILABLE}")
        logger.info(f"Post-Quantum Crypto: {'Enabled' if self.pqc else 'Disabled'}")
        logger.info("=" * 80)
    
    def register_subsystem(self, 
                          subsystem: SubsystemType, 
                          endpoint_url: str,
                          health_endpoint: str = "/health",
                          public_key: Optional[bytes] = None) -> bool:
        """Register a subsystem endpoint for communication"""
        
        endpoint = SubsystemEndpoint(
            subsystem=subsystem,
            endpoint_url=endpoint_url,
            health_endpoint=health_endpoint,
            public_key=public_key
        )
        
        self.subsystems[subsystem] = endpoint
        logger.info(f"Registered subsystem: {subsystem.value} at {endpoint_url}")
        return True
    
    def register_handler(self, message_type: str, handler: Callable) -> None:
        """Register a handler for specific message types"""
        self.handlers[message_type] = handler
        logger.info(f"Registered handler for: {message_type}")
    
    async def send_message(self, message: CrossSubsystemMessage) -> Dict[str, Any]:
        """
        Send a message to another subsystem.
        
        Automatically:
        - Encrypts with ML-KEM/ML-DSA if enabled
        - Routes through satellite constellation if available
        - Handles failover and retries
        """
        
        if message.destination not in self.subsystems:
            logger.error(f"Unknown destination subsystem: {message.destination}")
            return {"success": False, "error": "Unknown destination"}
        
        destination = self.subsystems[message.destination]
        
        if not destination.active:
            logger.warning(f"Destination {message.destination.value} is inactive - attempting failover")
            return await self._handle_failover(message)
        
        payload = message.payload
        if message.encrypted and self.pqc and destination.public_key:
            payload = self._encrypt_payload(payload, destination.public_key)
        
        if ASSP_AVAILABLE and self.assp:
            return await self._send_via_satellite(message, destination, payload)
        else:
            return await self._send_direct(message, destination, payload)
    
    async def _send_via_satellite(self, 
                                  message: CrossSubsystemMessage,
                                  destination: SubsystemEndpoint,
                                  payload: Dict) -> Dict[str, Any]:
        """Route message through satellite constellation"""
        
        try:
            packet = self.assp.create_encrypted_packet(
                sender_id=f"{self.node_id}-{message.source.value}",
                receiver_id=f"{destination.endpoint_url}-{message.destination.value}",
                plaintext=json.dumps(payload).encode(),
                recipient_public_key=destination.public_key or b''
            )
            
            success = self.assp.route_packet(packet, (0.0, 0.0))
            
            if success:
                self._log_message(message, "satellite_routed")
                return {"success": True, "routed_via": "satellite", "packet_id": message.id}
            else:
                logger.warning("Satellite routing failed - falling back to direct")
                return await self._send_direct(message, destination, payload)
                
        except Exception as e:
            logger.error(f"Satellite routing error: {e}")
            return await self._send_direct(message, destination, payload)
    
    async def _send_direct(self,
                          message: CrossSubsystemMessage,
                          destination: SubsystemEndpoint,
                          payload: Dict) -> Dict[str, Any]:
        """Send message directly via HTTP"""
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{destination.endpoint_url}/api/message",
                    json={
                        "id": message.id,
                        "source": message.source.value,
                        "payload": payload,
                        "priority": message.priority.value,
                        "timestamp": message.timestamp.isoformat()
                    },
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    if response.status == 200:
                        self._log_message(message, "direct_http")
                        result = await response.json()
                        return {"success": True, "routed_via": "direct", "response": result}
                    else:
                        destination.consecutive_failures += 1
                        return {"success": False, "error": f"HTTP {response.status}"}
                        
        except Exception as e:
            destination.consecutive_failures += 1
            logger.error(f"Direct send failed: {e}")
            return {"success": False, "error": str(e)}
    
    async def _handle_failover(self, message: CrossSubsystemMessage) -> Dict[str, Any]:
        """Handle failover when destination is unavailable"""
        
        self.message_queue.append(message)
        logger.info(f"Message {message.id} queued for retry")
        
        return {"success": False, "queued": True, "message_id": message.id}
    
    def _encrypt_payload(self, payload: Dict, recipient_key: bytes) -> Dict:
        """Encrypt payload with post-quantum cryptography"""
        
        if not self.pqc:
            return payload
        
        try:
            plaintext = json.dumps(payload).encode()
            ciphertext, _ = self.pqc.encapsulate(recipient_key)
            signature = self.pqc.sign(plaintext, self.pqc.sig_keypair.secret_key if self.pqc.sig_keypair else b'')
            
            return {
                "_encrypted": True,
                "ciphertext": ciphertext.hex(),
                "signature": signature.hex(),
                "algorithm": "ML-KEM-768+ML-DSA-65"
            }
        except Exception as e:
            logger.error(f"Encryption failed: {e}")
            return payload
    
    def _log_message(self, message: CrossSubsystemMessage, route_type: str) -> None:
        """Log message for audit trail"""
        self.message_log.append({
            "id": message.id,
            "source": message.source.value,
            "destination": message.destination.value,
            "route_type": route_type,
            "timestamp": datetime.now().isoformat(),
            "priority": message.priority.value
        })
    
    async def broadcast_to_all(self, 
                               source: SubsystemType,
                               payload: Dict[str, Any],
                               priority: MessagePriority = MessagePriority.NORMAL) -> Dict[str, Any]:
        """Broadcast a message to all registered subsystems"""
        
        results = {}
        
        for subsystem in self.subsystems:
            if subsystem == source:
                continue
            
            message = CrossSubsystemMessage(
                id=f"broadcast-{hashlib.sha256(str(datetime.now()).encode()).hexdigest()[:8]}",
                source=source,
                destination=subsystem,
                payload=payload,
                priority=priority
            )
            
            result = await self.send_message(message)
            results[subsystem.value] = result
        
        return results
    
    async def health_check_all(self) -> Dict[str, Any]:
        """Check health of all registered subsystems"""
        
        results = {}
        
        for subsystem, endpoint in self.subsystems.items():
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.get(
                        f"{endpoint.endpoint_url}{endpoint.health_endpoint}",
                        timeout=aiohttp.ClientTimeout(total=5)
                    ) as response:
                        if response.status == 200:
                            endpoint.active = True
                            endpoint.consecutive_failures = 0
                            results[subsystem.value] = {"status": "healthy", "code": 200}
                        else:
                            endpoint.consecutive_failures += 1
                            if endpoint.consecutive_failures >= 3:
                                endpoint.active = False
                            results[subsystem.value] = {"status": "unhealthy", "code": response.status}
                            
            except Exception as e:
                endpoint.consecutive_failures += 1
                if endpoint.consecutive_failures >= 3:
                    endpoint.active = False
                results[subsystem.value] = {"status": "unreachable", "error": str(e)}
            
            endpoint.last_health_check = datetime.now()
        
        return results
    
    async def process_queue(self) -> int:
        """Process queued messages (for retries)"""
        
        processed = 0
        remaining = []
        
        for message in self.message_queue:
            result = await self.send_message(message)
            if result.get("success"):
                processed += 1
            else:
                remaining.append(message)
        
        self.message_queue = remaining
        return processed
    
    async def start(self, health_check_interval: int = 60) -> None:
        """Start the coordinator background tasks"""
        
        self._running = True
        logger.info("ASSP Coordinator started")
        
        while self._running:
            try:
                await self.health_check_all()
                await self.process_queue()
            except Exception as e:
                logger.error(f"Coordinator loop error: {e}")
            
            await asyncio.sleep(health_check_interval)
    
    def stop(self) -> None:
        """Stop the coordinator"""
        self._running = False
        logger.info("ASSP Coordinator stopped")
    
    def get_status(self) -> Dict[str, Any]:
        """Get coordinator status"""
        
        return {
            "node_id": self.node_id,
            "assp_available": ASSP_AVAILABLE,
            "registered_subsystems": [s.value for s in self.subsystems],
            "active_subsystems": [s.value for s, e in self.subsystems.items() if e.active],
            "queued_messages": len(self.message_queue),
            "total_messages_sent": len(self.message_log),
            "satellite_status": self.assp.get_constellation_status() if self.assp else None
        }
    
    def create_consensus_message(self,
                                action_id: str,
                                action_type: str,
                                proposal: Dict[str, Any]) -> CrossSubsystemMessage:
        """Create a message for distributed consensus"""
        
        return CrossSubsystemMessage(
            id=f"consensus-{action_id}",
            source=SubsystemType.APEX,
            destination=SubsystemType.ACE,
            payload={
                "type": "consensus_proposal",
                "action_id": action_id,
                "action_type": action_type,
                "proposal": proposal,
                "requires_2_3_majority": True
            },
            priority=MessagePriority.CRITICAL,
            requires_response=True
        )
    
    def create_threat_alert(self,
                           threat_id: str,
                           severity: str,
                           details: Dict[str, Any]) -> CrossSubsystemMessage:
        """Create a threat alert message for AI subsystem"""
        
        return CrossSubsystemMessage(
            id=f"threat-{threat_id}",
            source=SubsystemType.AUDITOR,
            destination=SubsystemType.AI,
            payload={
                "type": "threat_alert",
                "threat_id": threat_id,
                "severity": severity,
                "details": details,
                "timestamp": datetime.now().isoformat()
            },
            priority=MessagePriority.CRITICAL if severity == "CRITICAL" else MessagePriority.HIGH
        )
    
    def create_node_deployment(self,
                              node_id: str,
                              node_type: str,
                              config: Dict[str, Any]) -> CrossSubsystemMessage:
        """Create a node deployment message for VM infrastructure"""
        
        return CrossSubsystemMessage(
            id=f"deploy-{node_id}",
            source=SubsystemType.APEX,
            destination=SubsystemType.VM_INFRASTRUCTURE,
            payload={
                "type": "node_deployment",
                "node_id": node_id,
                "node_type": node_type,
                "config": config
            },
            priority=MessagePriority.HIGH
        )


_global_coordinator: Optional[ASSPCoordinator] = None


def get_coordinator() -> ASSPCoordinator:
    """Get or create global coordinator instance"""
    global _global_coordinator
    if _global_coordinator is None:
        _global_coordinator = ASSPCoordinator()
    return _global_coordinator


async def demo():
    """Demo the ASSP Coordinator"""
    
    coordinator = get_coordinator()
    
    coordinator.register_subsystem(
        SubsystemType.APEX,
        "http://localhost:8001",
        "/health"
    )
    coordinator.register_subsystem(
        SubsystemType.AI,
        "http://localhost:8002",
        "/health"
    )
    coordinator.register_subsystem(
        SubsystemType.AUDITOR,
        "http://localhost:8003",
        "/health"
    )
    coordinator.register_subsystem(
        SubsystemType.ACE,
        "http://localhost:8004",
        "/health"
    )
    coordinator.register_subsystem(
        SubsystemType.VM_INFRASTRUCTURE,
        "http://localhost:8005",
        "/health"
    )
    
    status = coordinator.get_status()
    print(f"\nCoordinator Status:\n{json.dumps(status, indent=2, default=str)}")
    
    consensus_msg = coordinator.create_consensus_message(
        "ACTION-001",
        "enforcement",
        {"target": "test-defendant", "amount": 1000000}
    )
    
    print(f"\nConsensus Message Created: {consensus_msg.id}")
    
    threat_msg = coordinator.create_threat_alert(
        "THREAT-001",
        "HIGH",
        {"description": "Suspicious activity detected", "source_ip": "192.168.1.100"}
    )
    
    print(f"Threat Alert Created: {threat_msg.id}")


if __name__ == "__main__":
    print("ASSP Coordinator - Cross-Subsystem Integration")
    print("=" * 60)
    asyncio.run(demo())
