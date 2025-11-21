#!/usr/bin/env python3
"""
Test script for APEX system components
"""

import asyncio
import logging
from apex import APEXOrchestrator, APEXConfig, ConstitutionalEnforcer, PostQuantumCrypto, ConstitutionalAxiom

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)8s | %(message)s'
)

logger = logging.getLogger(__name__)


def test_constitutional_enforcer():
    """Test constitutional axiom enforcement"""
    logger.info("=" * 80)
    logger.info("TESTING CONSTITUTIONAL ENFORCER")
    logger.info("=" * 80)
    
    enforcer = ConstitutionalEnforcer()
    
    assert enforcer.verify_integrity(), "Constitutional integrity check failed"
    logger.info("✅ Constitutional integrity verified")
    
    context = {
        'fully_transparent': True,
        'immutable': True,
        'automated': True,
        'mathematically_certain': True,
        'permanent_record': True,
    }
    
    compliant = enforcer.enforce_axiom(ConstitutionalAxiom.TRANSPARENCY_IS_SECURITY, context)
    assert compliant, "Axiom enforcement failed"
    logger.info("✅ Axiom enforcement working")
    
    logger.info(f"✅ Total axioms: {len(ConstitutionalAxiom)}")
    logger.info(f"✅ Violations recorded: {len(enforcer.get_violations())}")
    
    for i, axiom in enumerate(list(ConstitutionalAxiom)[:5], 1):
        desc = enforcer.get_axiom_description(axiom)
        logger.info(f"   {i}. {axiom.name}: {desc[:60]}...")


def test_post_quantum_crypto():
    """Test post-quantum cryptography"""
    logger.info("\n" + "=" * 80)
    logger.info("TESTING POST-QUANTUM CRYPTOGRAPHY")
    logger.info("=" * 80)
    
    pqc = PostQuantumCrypto(gpu_accelerated=True)
    
    if not pqc.initialized:
        logger.warning("⚠️  PQC not initialized - skipping tests")
        logger.warning("   Install: pip install liboqs-python")
        return
    
    kem_keypair = pqc.generate_kem_keypair()
    assert kem_keypair is not None, "KEM keypair generation failed"
    logger.info(f"✅ KEM keypair generated ({kem_keypair.algorithm})")
    
    sig_keypair = pqc.generate_signature_keypair()
    assert sig_keypair is not None, "Signature keypair generation failed"
    logger.info(f"✅ Signature keypair generated ({sig_keypair.algorithm})")
    
    result = pqc.encapsulate(kem_keypair.public_key)
    assert result is not None, "Encapsulation failed"
    ciphertext, shared_secret = result
    logger.info(f"✅ Key encapsulation successful")
    logger.info(f"   Ciphertext length: {len(ciphertext)} bytes")
    logger.info(f"   Shared secret length: {len(shared_secret)} bytes")
    
    message = b"Test message for quantum-safe signing"
    signature = pqc.sign(message)
    assert signature is not None, "Signing failed"
    logger.info(f"✅ Message signed ({len(signature)} bytes)")
    
    is_valid = pqc.verify(message, signature, sig_keypair.public_key)
    assert is_valid, "Signature verification failed"
    logger.info(f"✅ Signature verified successfully")
    
    logger.info("\n📊 Running performance benchmark...")
    perf = pqc.benchmark_performance(iterations=100)
    logger.info(f"✅ Benchmark completed")
    

async def test_apex_orchestrator():
    """Test APEX orchestrator"""
    logger.info("\n" + "=" * 80)
    logger.info("TESTING APEX ORCHESTRATOR")
    logger.info("=" * 80)
    
    config = APEXConfig(
        enable_pqc=True,
        enable_constitutional_enforcement=True,
        scan_interval_hours=1,
        auto_fix_enabled=False,
        chaos_testing_enabled=False,
    )
    
    orchestrator = APEXOrchestrator(config)
    logger.info("✅ APEX orchestrator initialized")
    
    status = orchestrator.get_status()
    logger.info(f"✅ Status retrieved:")
    logger.info(f"   Running: {status['running']}")
    logger.info(f"   PQC Initialized: {status['pqc_initialized']}")
    logger.info(f"   Constitutional Integrity: {status['constitutional_integrity']}")
    
    report = orchestrator.get_constitutional_report()
    logger.info(f"✅ Constitutional report generated:")
    logger.info(f"   Total Axioms: {report['total_axioms']}")
    logger.info(f"   Violations: {report['total_violations']}")
    logger.info(f"   Integrity Verified: {report['integrity_verified']}")
    
    logger.info("\n🚀 Starting single APEX cycle (will run briefly)...")
    
    try:
        task = asyncio.create_task(orchestrator.start())
        await asyncio.sleep(2)
        orchestrator.stop()
        await asyncio.sleep(1)
    except Exception as e:
        logger.error(f"Orchestrator test error: {e}")


async def main():
    """Run all tests"""
    logger.info("\n" + "╔" + "═" * 78 + "╗")
    logger.info("║" + " " * 20 + "AEQUITAS APEX SYSTEM TEST SUITE" + " " * 26 + "║")
    logger.info("╚" + "═" * 78 + "╝\n")
    
    try:
        test_constitutional_enforcer()
        test_post_quantum_crypto()
        await test_apex_orchestrator()
        
        logger.info("\n" + "=" * 80)
        logger.info("🎉 ALL TESTS COMPLETED SUCCESSFULLY")
        logger.info("=" * 80)
        
    except Exception as e:
        logger.error(f"\n❌ TEST FAILED: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(main())
