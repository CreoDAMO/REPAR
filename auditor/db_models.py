# auditor/db_models.py
"""
Database models for Cerberus Auditor threat persistence
Uses PostgreSQL for robust threat tracking and historical analysis
"""

import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class ThreatLedger(Base):
    """
    Threat Ledger - Permanent record of all discovered vulnerabilities
    """
    __tablename__ = 'threat_ledger'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    threat_id = Column(String(100), unique=True, nullable=False, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    
    # Vulnerability details
    severity = Column(String(20), nullable=False, index=True)
    type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    file_path = Column(String(500))
    line_number = Column(Integer)
    
    # Consensus information
    consensus_count = Column(Integer, default=0)
    found_by = Column(JSON)  # List of AI agents that found this
    
    # Exploit information
    confirmed = Column(String(10), default='false')
    exploit_scenario = Column(Text)
    exploit_evidence = Column(JSON)  # Detailed evidence from adversary guild
    
    # Remediation
    fix_recommendation = Column(Text)
    fix_generated = Column(String(10), default='false')
    fix_applied = Column(String(10), default='false')
    
    # Module information (for Aequitas-specific threats)
    module = Column(String(100))
    
    # Additional metadata
    threat_metadata = Column(JSON)
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'threat_id': self.threat_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'severity': self.severity,
            'type': self.type,
            'description': self.description,
            'file': self.file_path,
            'line_number': self.line_number,
            'consensus_count': self.consensus_count,
            'found_by': self.found_by,
            'confirmed': self.confirmed == 'true',
            'exploit_scenario': self.exploit_scenario,
            'exploit_evidence': self.exploit_evidence,
            'fix_recommendation': self.fix_recommendation,
            'fix_generated': self.fix_generated == 'true',
            'fix_applied': self.fix_applied == 'true',
            'module': self.module,
            'metadata': self.threat_metadata
        }


class AuditReport(Base):
    """
    Audit Report - Summary of each audit run
    """
    __tablename__ = 'audit_reports'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    audit_type = Column(String(50), nullable=False)  # 'full_codebase', 'document', 'module'
    target = Column(String(500), nullable=False)
    
    # Summary statistics
    total_findings = Column(Integer, default=0)
    critical_count = Column(Integer, default=0)
    high_count = Column(Integer, default=0)
    medium_count = Column(Integer, default=0)
    low_count = Column(Integer, default=0)
    
    # Metrics
    security_score = Column(Integer, default=0)
    duration_seconds = Column(Integer)
    files_scanned = Column(Integer, default=0)
    
    # Full report data
    report_data = Column(JSON)
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'audit_type': self.audit_type,
            'target': self.target,
            'total_findings': self.total_findings,
            'critical_count': self.critical_count,
            'high_count': self.high_count,
            'medium_count': self.medium_count,
            'low_count': self.low_count,
            'security_score': self.security_score,
            'duration_seconds': self.duration_seconds,
            'files_scanned': self.files_scanned,
            'report_data': self.report_data
        }


class DatabaseManager:
    """
    Database manager for Cerberus Auditor
    Handles all database operations for threat persistence
    """
    
    def __init__(self, database_url: str = None):
        """
        Initialize database connection
        
        Args:
            database_url: PostgreSQL connection string (defaults to DATABASE_URL env var)
        """
        self.database_url = database_url or os.environ.get("DATABASE_URL")
        
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable not set")
        
        self.engine = create_engine(
            self.database_url,
            pool_recycle=300,
            pool_pre_ping=True
        )
        
        # Create tables if they don't exist
        Base.metadata.create_all(self.engine)
        
        # Create session factory
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
    
    def add_threat(self, threat_data: dict) -> ThreatLedger:
        """
        Add a threat to the ledger
        
        Args:
            threat_data: Dictionary containing threat information
            
        Returns:
            ThreatLedger object
        """
        # Generate unique threat ID
        threat_id = f"threat-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{threat_data.get('severity', 'UNKNOWN')}"
        
        threat = ThreatLedger(
            threat_id=threat_id,
            severity=threat_data.get('severity', 'UNKNOWN'),
            type=threat_data.get('type', 'unknown'),
            description=threat_data.get('description', ''),
            file_path=threat_data.get('file', ''),
            line_number=threat_data.get('line_number', 0),
            consensus_count=threat_data.get('consensus_count', 0),
            found_by=threat_data.get('found_by', []),
            confirmed='true' if threat_data.get('confirmed', False) else 'false',
            exploit_scenario=threat_data.get('exploit_scenario', ''),
            exploit_evidence=threat_data.get('exploit_evidence', {}),
            fix_recommendation=threat_data.get('fix_recommendation', ''),
            module=threat_data.get('module', ''),
            threat_metadata=threat_data.get('metadata', {})
        )
        
        self.session.add(threat)
        self.session.commit()
        
        return threat
    
    def get_all_threats(self) -> list:
        """Get all threats from the ledger"""
        threats = self.session.query(ThreatLedger).order_by(ThreatLedger.timestamp.desc()).all()
        return [t.to_dict() for t in threats]
    
    def get_threats_by_severity(self, severity: str) -> list:
        """Get threats by severity level"""
        threats = self.session.query(ThreatLedger).filter_by(severity=severity).all()
        return [t.to_dict() for t in threats]
    
    def get_unpatched_threats(self) -> list:
        """Get threats that haven't been patched yet"""
        threats = self.session.query(ThreatLedger).filter_by(fix_applied='false').all()
        return [t.to_dict() for t in threats]
    
    def mark_threat_patched(self, threat_id: str):
        """Mark a threat as patched"""
        threat = self.session.query(ThreatLedger).filter_by(threat_id=threat_id).first()
        if threat:
            threat.fix_applied = 'true'
            self.session.commit()
    
    def save_audit_report(self, report_data: dict) -> AuditReport:
        """
        Save an audit report
        
        Args:
            report_data: Dictionary containing report data
            
        Returns:
            AuditReport object
        """
        summary = report_data.get('summary', {})
        severity_counts = summary.get('by_severity', {})
        
        report = AuditReport(
            audit_type=report_data.get('audit_type', 'unknown'),
            target=report_data.get('target', ''),
            total_findings=summary.get('total_findings', 0),
            critical_count=severity_counts.get('CRITICAL', 0),
            high_count=severity_counts.get('HIGH', 0),
            medium_count=severity_counts.get('MEDIUM', 0),
            low_count=severity_counts.get('LOW', 0),
            security_score=summary.get('security_score', 0),
            duration_seconds=int(report_data.get('duration_seconds', 0)),
            files_scanned=summary.get('files_scanned', 0),
            report_data=report_data
        )
        
        self.session.add(report)
        self.session.commit()
        
        return report
    
    def get_recent_reports(self, limit: int = 10) -> list:
        """Get recent audit reports"""
        reports = self.session.query(AuditReport).order_by(AuditReport.timestamp.desc()).limit(limit).all()
        return [r.to_dict() for r in reports]
    
    def get_threat_statistics(self) -> dict:
        """Get overall threat statistics"""
        total = self.session.query(ThreatLedger).count()
        critical = self.session.query(ThreatLedger).filter_by(severity='CRITICAL').count()
        high = self.session.query(ThreatLedger).filter_by(severity='HIGH').count()
        medium = self.session.query(ThreatLedger).filter_by(severity='MEDIUM').count()
        low = self.session.query(ThreatLedger).filter_by(severity='LOW').count()
        unpatched = self.session.query(ThreatLedger).filter_by(fix_applied='false').count()
        
        return {
            'total_threats': total,
            'by_severity': {
                'CRITICAL': critical,
                'HIGH': high,
                'MEDIUM': medium,
                'LOW': low
            },
            'unpatched': unpatched,
            'patched': total - unpatched
        }
    
    def close(self):
        """Close the database session"""
        self.session.close()
