#!/usr/bin/env python3
"""
AEQUITAS CONSTELLATION TELEMETRY SYSTEM
Real-time monitoring of satellite constellation health

Features:
- Constellation health metrics
- Packet loss tracking
- Latency monitoring
- Node participation stats
- Anomaly detection and alerting

Status: PRODUCTION READY
"""

import os
import json
import asyncio
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from enum import Enum
from collections import deque
import statistics

logging.basicConfig(level=logging.INFO, format='%(asctime)s - TELEMETRY - %(levelname)s - %(message)s')
logger = logging.getLogger("ASSP-Telemetry")


class MetricType(Enum):
    LATENCY = "latency"
    PACKET_LOSS = "packet_loss"
    THROUGHPUT = "throughput"
    CPU_USAGE = "cpu_usage"
    MEMORY_USAGE = "memory_usage"
    NODE_COUNT = "node_count"
    CONSENSUS_TIME = "consensus_time"


class AlertSeverity(Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


@dataclass
class MetricDataPoint:
    metric_type: MetricType
    value: float
    node_id: Optional[str]
    timestamp: datetime = field(default_factory=datetime.now)
    tags: Dict[str, str] = field(default_factory=dict)


@dataclass
class Alert:
    id: str
    severity: AlertSeverity
    metric_type: MetricType
    message: str
    value: float
    threshold: float
    node_id: Optional[str]
    timestamp: datetime = field(default_factory=datetime.now)
    acknowledged: bool = False


@dataclass
class NodeTelemetry:
    node_id: str
    latency_ms: float
    packets_sent: int
    packets_received: int
    packets_dropped: int
    cpu_usage: float
    memory_usage: float
    uptime_seconds: int
    last_update: datetime = field(default_factory=datetime.now)
    
    @property
    def packet_loss_rate(self) -> float:
        total = self.packets_sent + self.packets_received
        if total == 0:
            return 0.0
        return self.packets_dropped / total


class ConstellationTelemetry:
    """
    Real-time telemetry system for satellite constellation.
    
    Collects, aggregates, and analyzes metrics from all nodes.
    Provides alerting and anomaly detection.
    """
    
    DEFAULT_RETENTION_HOURS = 24
    DEFAULT_AGGREGATION_WINDOW = 60
    
    THRESHOLDS = {
        MetricType.LATENCY: {"warning": 200, "critical": 500},
        MetricType.PACKET_LOSS: {"warning": 0.05, "critical": 0.15},
        MetricType.CPU_USAGE: {"warning": 70, "critical": 90},
        MetricType.MEMORY_USAGE: {"warning": 75, "critical": 90},
        MetricType.THROUGHPUT: {"warning": 100, "critical": 50},
    }
    
    def __init__(self, 
                 retention_hours: int = DEFAULT_RETENTION_HOURS,
                 aggregation_window: int = DEFAULT_AGGREGATION_WINDOW):
        self.retention_hours = retention_hours
        self.aggregation_window = aggregation_window
        
        self.metrics: Dict[MetricType, deque] = {
            metric: deque(maxlen=retention_hours * 3600 // aggregation_window)
            for metric in MetricType
        }
        self.node_telemetry: Dict[str, NodeTelemetry] = {}
        self.alerts: List[Alert] = []
        self.alert_handlers: List[callable] = []
        
        self._running = False
        
        logger.info("=" * 80)
        logger.info("CONSTELLATION TELEMETRY INITIALIZED")
        logger.info("=" * 80)
        logger.info(f"Retention: {retention_hours} hours")
        logger.info(f"Aggregation Window: {aggregation_window} seconds")
        logger.info("=" * 80)
    
    def record_metric(self, data_point: MetricDataPoint) -> None:
        """Record a single metric data point"""
        self.metrics[data_point.metric_type].append(data_point)
        
        self._check_thresholds(data_point)
    
    def update_node_telemetry(self, telemetry: NodeTelemetry) -> None:
        """Update telemetry for a specific node"""
        self.node_telemetry[telemetry.node_id] = telemetry
        
        self.record_metric(MetricDataPoint(
            metric_type=MetricType.LATENCY,
            value=telemetry.latency_ms,
            node_id=telemetry.node_id
        ))
        
        self.record_metric(MetricDataPoint(
            metric_type=MetricType.PACKET_LOSS,
            value=telemetry.packet_loss_rate,
            node_id=telemetry.node_id
        ))
        
        self.record_metric(MetricDataPoint(
            metric_type=MetricType.CPU_USAGE,
            value=telemetry.cpu_usage,
            node_id=telemetry.node_id
        ))
        
        self.record_metric(MetricDataPoint(
            metric_type=MetricType.MEMORY_USAGE,
            value=telemetry.memory_usage,
            node_id=telemetry.node_id
        ))
    
    def _check_thresholds(self, data_point: MetricDataPoint) -> None:
        """Check if metric exceeds thresholds and create alerts"""
        
        if data_point.metric_type not in self.THRESHOLDS:
            return
        
        thresholds = self.THRESHOLDS[data_point.metric_type]
        
        if data_point.value >= thresholds["critical"]:
            self._create_alert(
                AlertSeverity.CRITICAL,
                data_point,
                thresholds["critical"]
            )
        elif data_point.value >= thresholds["warning"]:
            self._create_alert(
                AlertSeverity.WARNING,
                data_point,
                thresholds["warning"]
            )
    
    def _create_alert(self, 
                     severity: AlertSeverity,
                     data_point: MetricDataPoint,
                     threshold: float) -> None:
        """Create and store an alert"""
        
        alert = Alert(
            id=f"alert-{len(self.alerts)}-{datetime.now().timestamp()}",
            severity=severity,
            metric_type=data_point.metric_type,
            message=f"{data_point.metric_type.value} exceeded {severity.value} threshold",
            value=data_point.value,
            threshold=threshold,
            node_id=data_point.node_id
        )
        
        self.alerts.append(alert)
        logger.warning(f"Alert: {alert.message} (value: {alert.value}, threshold: {alert.threshold})")
        
        for handler in self.alert_handlers:
            try:
                handler(alert)
            except Exception as e:
                logger.error(f"Alert handler error: {e}")
    
    def register_alert_handler(self, handler: callable) -> None:
        """Register a callback for alerts"""
        self.alert_handlers.append(handler)
    
    def get_aggregate_metrics(self, 
                              metric_type: MetricType,
                              window_minutes: int = 5) -> Dict[str, float]:
        """Get aggregated metrics for a time window"""
        
        cutoff = datetime.now() - timedelta(minutes=window_minutes)
        
        recent = [
            dp.value for dp in self.metrics[metric_type]
            if dp.timestamp >= cutoff
        ]
        
        if not recent:
            return {"count": 0}
        
        return {
            "count": len(recent),
            "min": min(recent),
            "max": max(recent),
            "mean": statistics.mean(recent),
            "median": statistics.median(recent),
            "stdev": statistics.stdev(recent) if len(recent) > 1 else 0
        }
    
    def get_constellation_health(self) -> Dict[str, Any]:
        """Get overall constellation health summary"""
        
        total_nodes = len(self.node_telemetry)
        
        if total_nodes == 0:
            return {
                "status": "unknown",
                "total_nodes": 0,
                "message": "No nodes reporting telemetry"
            }
        
        avg_latency = statistics.mean(
            t.latency_ms for t in self.node_telemetry.values()
        )
        
        avg_packet_loss = statistics.mean(
            t.packet_loss_rate for t in self.node_telemetry.values()
        )
        
        avg_cpu = statistics.mean(
            t.cpu_usage for t in self.node_telemetry.values()
        )
        
        avg_memory = statistics.mean(
            t.memory_usage for t in self.node_telemetry.values()
        )
        
        if avg_packet_loss > 0.15 or avg_latency > 500:
            status = "critical"
        elif avg_packet_loss > 0.05 or avg_latency > 200:
            status = "degraded"
        else:
            status = "healthy"
        
        return {
            "status": status,
            "total_nodes": total_nodes,
            "active_nodes": sum(
                1 for t in self.node_telemetry.values()
                if datetime.now() - t.last_update < timedelta(minutes=5)
            ),
            "avg_latency_ms": round(avg_latency, 2),
            "avg_packet_loss": round(avg_packet_loss, 4),
            "avg_cpu_usage": round(avg_cpu, 2),
            "avg_memory_usage": round(avg_memory, 2),
            "unacknowledged_alerts": sum(1 for a in self.alerts if not a.acknowledged),
            "timestamp": datetime.now().isoformat()
        }
    
    def get_node_ranking(self, 
                        metric: MetricType = MetricType.LATENCY,
                        top_n: int = 10,
                        ascending: bool = True) -> List[Dict[str, Any]]:
        """Get top/bottom nodes by a specific metric"""
        
        nodes_with_metric = []
        
        for node_id, telemetry in self.node_telemetry.items():
            if metric == MetricType.LATENCY:
                value = telemetry.latency_ms
            elif metric == MetricType.PACKET_LOSS:
                value = telemetry.packet_loss_rate
            elif metric == MetricType.CPU_USAGE:
                value = telemetry.cpu_usage
            elif metric == MetricType.MEMORY_USAGE:
                value = telemetry.memory_usage
            else:
                continue
            
            nodes_with_metric.append({
                "node_id": node_id,
                "value": value,
                "last_update": telemetry.last_update.isoformat()
            })
        
        sorted_nodes = sorted(
            nodes_with_metric,
            key=lambda x: x["value"],
            reverse=not ascending
        )
        
        return sorted_nodes[:top_n]
    
    def get_time_series(self,
                       metric_type: MetricType,
                       node_id: Optional[str] = None,
                       last_n_points: int = 100) -> List[Dict[str, Any]]:
        """Get time series data for a metric"""
        
        data = list(self.metrics[metric_type])[-last_n_points:]
        
        if node_id:
            data = [dp for dp in data if dp.node_id == node_id]
        
        return [
            {
                "timestamp": dp.timestamp.isoformat(),
                "value": dp.value,
                "node_id": dp.node_id
            }
            for dp in data
        ]
    
    def acknowledge_alert(self, alert_id: str) -> bool:
        """Acknowledge an alert"""
        
        for alert in self.alerts:
            if alert.id == alert_id:
                alert.acknowledged = True
                return True
        return False
    
    def get_alerts(self, 
                  unacknowledged_only: bool = True,
                  severity: Optional[AlertSeverity] = None,
                  limit: int = 50) -> List[Dict[str, Any]]:
        """Get alerts with optional filtering"""
        
        filtered = self.alerts
        
        if unacknowledged_only:
            filtered = [a for a in filtered if not a.acknowledged]
        
        if severity:
            filtered = [a for a in filtered if a.severity == severity]
        
        return [
            {
                "id": a.id,
                "severity": a.severity.value,
                "metric": a.metric_type.value,
                "message": a.message,
                "value": a.value,
                "threshold": a.threshold,
                "node_id": a.node_id,
                "timestamp": a.timestamp.isoformat(),
                "acknowledged": a.acknowledged
            }
            for a in filtered[-limit:]
        ]
    
    def export_prometheus_format(self) -> str:
        """Export metrics in Prometheus format"""
        
        lines = []
        
        for node_id, telemetry in self.node_telemetry.items():
            safe_id = node_id.replace("-", "_")
            
            lines.append(f'aequitas_node_latency_ms{{node="{safe_id}"}} {telemetry.latency_ms}')
            lines.append(f'aequitas_node_packet_loss{{node="{safe_id}"}} {telemetry.packet_loss_rate}')
            lines.append(f'aequitas_node_cpu_usage{{node="{safe_id}"}} {telemetry.cpu_usage}')
            lines.append(f'aequitas_node_memory_usage{{node="{safe_id}"}} {telemetry.memory_usage}')
            lines.append(f'aequitas_node_uptime_seconds{{node="{safe_id}"}} {telemetry.uptime_seconds}')
        
        lines.append(f'aequitas_constellation_total_nodes {len(self.node_telemetry)}')
        lines.append(f'aequitas_constellation_alerts_total {len(self.alerts)}')
        lines.append(f'aequitas_constellation_alerts_unacked {sum(1 for a in self.alerts if not a.acknowledged)}')
        
        return "\n".join(lines)
    
    async def start_collection_loop(self, interval_seconds: int = 30) -> None:
        """Start the telemetry collection loop"""
        
        self._running = True
        logger.info("Telemetry collection loop started")
        
        while self._running:
            try:
                self._cleanup_old_data()
                
            except Exception as e:
                logger.error(f"Collection loop error: {e}")
            
            await asyncio.sleep(interval_seconds)
    
    def stop(self) -> None:
        """Stop the telemetry collection"""
        self._running = False
        logger.info("Telemetry collection stopped")
    
    def _cleanup_old_data(self) -> None:
        """Clean up old telemetry data"""
        
        cutoff = datetime.now() - timedelta(hours=self.retention_hours)
        
        for metric_type in self.metrics:
            while self.metrics[metric_type] and self.metrics[metric_type][0].timestamp < cutoff:
                self.metrics[metric_type].popleft()


_global_telemetry: Optional[ConstellationTelemetry] = None


def get_telemetry() -> ConstellationTelemetry:
    """Get or create global telemetry instance"""
    global _global_telemetry
    if _global_telemetry is None:
        _global_telemetry = ConstellationTelemetry()
    return _global_telemetry


async def demo():
    """Demo the telemetry system"""
    import random
    
    telemetry = get_telemetry()
    
    for i in range(10):
        node_telemetry = NodeTelemetry(
            node_id=f"sat-{i}",
            latency_ms=random.uniform(10, 300),
            packets_sent=random.randint(1000, 10000),
            packets_received=random.randint(1000, 10000),
            packets_dropped=random.randint(0, 500),
            cpu_usage=random.uniform(10, 80),
            memory_usage=random.uniform(20, 70),
            uptime_seconds=random.randint(3600, 86400)
        )
        telemetry.update_node_telemetry(node_telemetry)
    
    health = telemetry.get_constellation_health()
    print(f"\nConstellation Health:")
    print(json.dumps(health, indent=2))
    
    latency_metrics = telemetry.get_aggregate_metrics(MetricType.LATENCY)
    print(f"\nLatency Metrics:")
    print(json.dumps(latency_metrics, indent=2))
    
    top_nodes = telemetry.get_node_ranking(MetricType.LATENCY, top_n=5)
    print(f"\nTop 5 Nodes by Latency:")
    for node in top_nodes:
        print(f"  {node['node_id']}: {node['value']:.2f}ms")
    
    alerts = telemetry.get_alerts()
    print(f"\nActive Alerts: {len(alerts)}")
    for alert in alerts[:3]:
        print(f"  [{alert['severity']}] {alert['message']}")
    
    print(f"\nPrometheus Export (sample):")
    print(telemetry.export_prometheus_format()[:500] + "...")


if __name__ == "__main__":
    print("Constellation Telemetry System")
    print("=" * 60)
    asyncio.run(demo())
