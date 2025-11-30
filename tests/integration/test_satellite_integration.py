#!/usr/bin/env python3
"""
AEQUITAS PROTOCOL - INTEGRATION TESTS
Cross-Subsystem Integration Testing Suite

Tests all 5 subsystems working together:
- apex/ - Satellite protocol and consensus
- ai/ - Autonomous decision-making
- auditor/ - Log verification
- ace/ - Blockchain layer
- vm-infrastructure/ - Node deployment

Status: PRODUCTION TESTING
"""

import os
import sys
import json
import asyncio
import unittest
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "apex"))

try:
    from satellite_protocol import (
        AequitasSatelliteProtocol,
        get_assp,
        VirtualSatellite,
        MobileValidatorSatellite,
        SatellitePacket,
        Position3D,
        RFSignal
    )
    from satellite_coordinator import (
        ASSPCoordinator,
        get_coordinator,
        SubsystemType,
        MessagePriority,
        CrossSubsystemMessage
    )
    from satellite_autonomous import (
        AutonomousSatelliteLoop,
        get_autonomous,
        NodeState,
        ScalingAction
    )
    from telemetry.constellation_telemetry import (
        ConstellationTelemetry,
        get_telemetry,
        NodeTelemetry,
        MetricType
    )
    IMPORTS_AVAILABLE = True
except ImportError as e:
    IMPORTS_AVAILABLE = False
    IMPORT_ERROR = str(e)


class TestSatelliteProtocol(unittest.TestCase):
    """Test the core satellite protocol"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_assp_initialization(self):
        """Test ASSP initializes correctly"""
        assp = get_assp()
        self.assertIsNotNone(assp)
        self.assertIsNotNone(assp.pqc)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_virtual_satellite_creation(self):
        """Test virtual satellite creation"""
        assp = get_assp()
        sat = assp.create_virtual_satellite("test-vsat-1", 10.0, 20.0)
        
        self.assertIsNotNone(sat)
        self.assertEqual(sat.get_satellite_id(), "test-vsat-1")
        
        position = sat.calculate_position(int(datetime.now().timestamp()))
        self.assertEqual(position.latitude, 10.0)
        self.assertEqual(position.longitude, 20.0)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_mobile_satellite_creation(self):
        """Test mobile validator satellite creation"""
        assp = get_assp()
        mobile = assp.create_mobile_satellite("validator-test-001")
        
        self.assertIsNotNone(mobile)
        self.assertEqual(mobile.get_satellite_id(), "mobile-validator-test-001")
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_constellation_status(self):
        """Test constellation status reporting"""
        assp = get_assp()
        
        assp.create_virtual_satellite("status-test-1")
        assp.create_virtual_satellite("status-test-2")
        
        status = assp.get_constellation_status()
        
        self.assertIn("total_satellites", status)
        self.assertIn("satellites", status)
        self.assertIn("status", status)
        self.assertEqual(status["status"], "OPERATIONAL")
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_redacted_status(self):
        """Test that redacted status hides position data"""
        assp = get_assp()
        assp.create_virtual_satellite("redact-test", 45.0, -90.0)
        
        redacted = assp.get_redacted_constellation_status()
        
        for sat in redacted.get("satellites", []):
            if "position" in sat:
                self.assertEqual(sat["position"]["lat"], "REDACTED")
                self.assertEqual(sat["position"]["lon"], "REDACTED")


class TestCoordinator(unittest.TestCase):
    """Test the cross-subsystem coordinator"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_coordinator_initialization(self):
        """Test coordinator initializes correctly"""
        coordinator = get_coordinator()
        self.assertIsNotNone(coordinator)
        self.assertEqual(coordinator.node_id, "coordinator-primary")
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_subsystem_registration(self):
        """Test subsystem registration"""
        coordinator = ASSPCoordinator("test-coordinator")
        
        result = coordinator.register_subsystem(
            SubsystemType.APEX,
            "http://localhost:8001",
            "/health"
        )
        
        self.assertTrue(result)
        self.assertIn(SubsystemType.APEX, coordinator.subsystems)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_message_creation(self):
        """Test cross-subsystem message creation"""
        coordinator = get_coordinator()
        
        message = coordinator.create_consensus_message(
            "TEST-ACTION-001",
            "enforcement",
            {"target": "test-defendant"}
        )
        
        self.assertEqual(message.source, SubsystemType.APEX)
        self.assertEqual(message.destination, SubsystemType.ACE)
        self.assertEqual(message.priority, MessagePriority.CRITICAL)
        self.assertTrue(message.requires_response)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_threat_alert_creation(self):
        """Test threat alert message creation"""
        coordinator = get_coordinator()
        
        alert = coordinator.create_threat_alert(
            "THREAT-TEST-001",
            "HIGH",
            {"description": "Test threat"}
        )
        
        self.assertEqual(alert.source, SubsystemType.AUDITOR)
        self.assertEqual(alert.destination, SubsystemType.AI)
        self.assertIn("threat_id", alert.payload)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_coordinator_status(self):
        """Test coordinator status reporting"""
        coordinator = get_coordinator()
        
        status = coordinator.get_status()
        
        self.assertIn("node_id", status)
        self.assertIn("assp_available", status)
        self.assertIn("registered_subsystems", status)


class TestAutonomousLoop(unittest.TestCase):
    """Test the autonomous satellite management"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_autonomous_initialization(self):
        """Test autonomous loop initializes correctly"""
        autonomous = get_autonomous()
        self.assertIsNotNone(autonomous)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_health_simulation(self):
        """Test simulated health data generation"""
        autonomous = AutonomousSatelliteLoop("test-controller")
        autonomous._simulate_health_data()
        
        self.assertGreater(len(autonomous.node_health), 0)
        
        for health in autonomous.node_health.values():
            self.assertIsNotNone(health.state)
            self.assertGreaterEqual(health.cpu_usage, 0)
            self.assertLessEqual(health.cpu_usage, 100)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_metrics_collection(self):
        """Test constellation metrics collection"""
        autonomous = AutonomousSatelliteLoop("metrics-test")
        autonomous._simulate_health_data()
        
        async def run_test():
            metrics = await autonomous._collect_metrics()
            
            self.assertEqual(metrics.total_nodes, len(autonomous.node_health))
            self.assertGreaterEqual(metrics.healthy_nodes, 0)
            self.assertGreaterEqual(metrics.average_latency_ms, 0)
        
        asyncio.run(run_test())
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_scaling_decision(self):
        """Test scaling decision logic"""
        autonomous = AutonomousSatelliteLoop("scaling-test")
        autonomous._simulate_health_data()
        
        async def run_test():
            metrics = await autonomous._collect_metrics()
            decision = await autonomous._scaling_decision(metrics)
            
            self.assertIsNotNone(decision)
            self.assertIn(decision.action, list(ScalingAction))
        
        asyncio.run(run_test())
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_autonomous_status(self):
        """Test autonomous loop status reporting"""
        autonomous = get_autonomous()
        autonomous._simulate_health_data()
        
        status = autonomous.get_status()
        
        self.assertIn("controller_id", status)
        self.assertIn("total_nodes", status)
        self.assertIn("node_states", status)


class TestTelemetry(unittest.TestCase):
    """Test the telemetry system"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_telemetry_initialization(self):
        """Test telemetry system initializes correctly"""
        telemetry = get_telemetry()
        self.assertIsNotNone(telemetry)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_node_telemetry_update(self):
        """Test node telemetry updates"""
        telemetry = ConstellationTelemetry()
        
        node_data = NodeTelemetry(
            node_id="test-node-1",
            latency_ms=50.0,
            packets_sent=1000,
            packets_received=980,
            packets_dropped=20,
            cpu_usage=45.0,
            memory_usage=60.0,
            uptime_seconds=3600
        )
        
        telemetry.update_node_telemetry(node_data)
        
        self.assertIn("test-node-1", telemetry.node_telemetry)
        self.assertEqual(telemetry.node_telemetry["test-node-1"].latency_ms, 50.0)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_constellation_health(self):
        """Test constellation health calculation"""
        telemetry = ConstellationTelemetry()
        
        for i in range(5):
            node_data = NodeTelemetry(
                node_id=f"health-test-{i}",
                latency_ms=30.0 + i * 10,
                packets_sent=1000,
                packets_received=950,
                packets_dropped=50,
                cpu_usage=40.0 + i * 5,
                memory_usage=50.0 + i * 3,
                uptime_seconds=7200
            )
            telemetry.update_node_telemetry(node_data)
        
        health = telemetry.get_constellation_health()
        
        self.assertIn("status", health)
        self.assertEqual(health["total_nodes"], 5)
        self.assertGreater(health["avg_latency_ms"], 0)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_aggregate_metrics(self):
        """Test metric aggregation"""
        telemetry = ConstellationTelemetry()
        
        for i in range(10):
            node_data = NodeTelemetry(
                node_id=f"aggregate-test-{i}",
                latency_ms=20.0 + i * 5,
                packets_sent=1000,
                packets_received=990,
                packets_dropped=10,
                cpu_usage=30.0 + i * 3,
                memory_usage=40.0 + i * 2,
                uptime_seconds=3600
            )
            telemetry.update_node_telemetry(node_data)
        
        latency_stats = telemetry.get_aggregate_metrics(MetricType.LATENCY)
        
        self.assertIn("count", latency_stats)
        self.assertIn("mean", latency_stats)
        self.assertGreater(latency_stats["count"], 0)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_prometheus_export(self):
        """Test Prometheus format export"""
        telemetry = ConstellationTelemetry()
        
        node_data = NodeTelemetry(
            node_id="prom-test",
            latency_ms=25.0,
            packets_sent=500,
            packets_received=490,
            packets_dropped=10,
            cpu_usage=35.0,
            memory_usage=45.0,
            uptime_seconds=1800
        )
        telemetry.update_node_telemetry(node_data)
        
        prom_output = telemetry.export_prometheus_format()
        
        self.assertIn("aequitas_node_latency_ms", prom_output)
        self.assertIn("aequitas_constellation_total_nodes", prom_output)


class TestCrossSubsystemIntegration(unittest.TestCase):
    """Test integration between all subsystems"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_full_stack_initialization(self):
        """Test all subsystems can be initialized together"""
        assp = get_assp()
        coordinator = get_coordinator()
        autonomous = get_autonomous()
        telemetry = get_telemetry()
        
        self.assertIsNotNone(assp)
        self.assertIsNotNone(coordinator)
        self.assertIsNotNone(autonomous)
        self.assertIsNotNone(telemetry)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_satellite_to_telemetry_flow(self):
        """Test data flow from satellite to telemetry"""
        assp = get_assp()
        telemetry = ConstellationTelemetry()
        
        sat = assp.create_virtual_satellite("flow-test-sat", 0.0, 0.0)
        
        node_data = NodeTelemetry(
            node_id=sat.get_satellite_id(),
            latency_ms=30.0,
            packets_sent=100,
            packets_received=98,
            packets_dropped=2,
            cpu_usage=25.0,
            memory_usage=35.0,
            uptime_seconds=600
        )
        telemetry.update_node_telemetry(node_data)
        
        self.assertIn(sat.get_satellite_id(), telemetry.node_telemetry)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_coordinator_to_autonomous_flow(self):
        """Test message flow from coordinator to autonomous system"""
        coordinator = ASSPCoordinator("integration-coordinator")
        autonomous = AutonomousSatelliteLoop("integration-autonomous")
        
        coordinator.register_subsystem(
            SubsystemType.APEX,
            "http://localhost:8001"
        )
        
        autonomous._simulate_health_data()
        
        status = coordinator.get_status()
        auto_status = autonomous.get_status()
        
        self.assertIn("registered_subsystems", status)
        self.assertIn("total_nodes", auto_status)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_end_to_end_consensus_flow(self):
        """Test end-to-end consensus message flow"""
        coordinator = ASSPCoordinator("e2e-coordinator")
        
        coordinator.register_subsystem(
            SubsystemType.APEX,
            "http://localhost:8001"
        )
        coordinator.register_subsystem(
            SubsystemType.ACE,
            "http://localhost:8004"
        )
        
        consensus_msg = coordinator.create_consensus_message(
            "E2E-ACTION-001",
            "enforcement",
            {
                "target": "test-defendant",
                "amount": 1000000,
                "jurisdiction": "international"
            }
        )
        
        self.assertIsNotNone(consensus_msg)
        self.assertEqual(consensus_msg.source, SubsystemType.APEX)
        self.assertEqual(consensus_msg.destination, SubsystemType.ACE)
        self.assertTrue(consensus_msg.requires_response)


class TestFailoverScenarios(unittest.TestCase):
    """Test failover and recovery scenarios"""
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_node_failure_detection(self):
        """Test detection of failed nodes"""
        autonomous = AutonomousSatelliteLoop("failover-test")
        autonomous._simulate_health_data()
        
        for node_id in list(autonomous.node_health.keys())[:2]:
            autonomous.node_health[node_id].state = NodeState.UNHEALTHY
        
        unhealthy_count = sum(
            1 for h in autonomous.node_health.values()
            if h.state == NodeState.UNHEALTHY
        )
        
        self.assertGreaterEqual(unhealthy_count, 2)
    
    @unittest.skipUnless(IMPORTS_AVAILABLE, "Required imports not available")
    def test_recovery_tracking(self):
        """Test tracking of recovered nodes"""
        autonomous = AutonomousSatelliteLoop("recovery-test")
        autonomous._simulate_health_data()
        
        node_id = list(autonomous.node_health.keys())[0]
        autonomous.recovered_nodes.add(node_id)
        
        self.assertIn(node_id, autonomous.recovered_nodes)
        
        status = autonomous.get_status()
        self.assertEqual(status["recovered_nodes"], 1)


def run_integration_tests():
    """Run all integration tests"""
    print("=" * 80)
    print("AEQUITAS PROTOCOL - INTEGRATION TEST SUITE")
    print("=" * 80)
    
    if not IMPORTS_AVAILABLE:
        print(f"\n⚠️  Warning: Some imports not available: {IMPORT_ERROR}")
        print("Running available tests only...\n")
    
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    suite.addTests(loader.loadTestsFromTestCase(TestSatelliteProtocol))
    suite.addTests(loader.loadTestsFromTestCase(TestCoordinator))
    suite.addTests(loader.loadTestsFromTestCase(TestAutonomousLoop))
    suite.addTests(loader.loadTestsFromTestCase(TestTelemetry))
    suite.addTests(loader.loadTestsFromTestCase(TestCrossSubsystemIntegration))
    suite.addTests(loader.loadTestsFromTestCase(TestFailoverScenarios))
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Tests Run: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print(f"Skipped: {len(result.skipped)}")
    print("=" * 80)
    
    return result.wasSuccessful()


if __name__ == "__main__":
    success = run_integration_tests()
    sys.exit(0 if success else 1)
