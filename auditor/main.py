#!/usr/bin/env python3
"""
Aequitas Cerberus Auditor - FastAPI Wrapper
Provides HTTP endpoints for triggering security audits
"""

import os
import asyncio
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime
from pathlib import Path
import sys

# Add the auditor directory to the path
sys.path.insert(0, str(Path(__file__).parent))

# Try to import orchestrator, but don't fail if dependencies are missing
try:
    from orchestrator import CerberusOrchestrator
    ORCHESTRATOR_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Orchestrator not available: {e}")
    ORCHESTRATOR_AVAILABLE = False

app = FastAPI(
    title="Aequitas Cerberus Auditor API",
    description="Multi-agent AI security auditing system for blockchain security",
    version="1.0.0"
)

# Store audit results in memory (in production, use a database)
audit_history: List[Dict] = []
current_audit: Optional[Dict] = None

class AuditRequest(BaseModel):
    target_directory: str = "aequitas"
    description: Optional[str] = None

class AuditResponse(BaseModel):
    audit_id: str
    status: str
    message: str

@app.get("/")
async def root():
    """API information endpoint"""
    return {
        "name": "Aequitas Cerberus Auditor API",
        "version": "1.0.0",
        "description": "Multi-agent AI security auditing system",
        "status": "active" if ORCHESTRATOR_AVAILABLE else "limited",
        "endpoints": {
            "health": "GET /health",
            "audit_status": "GET /audit/status",
            "audit_history": "GET /audit/history",
            "start_audit": "POST /audit/start",
            "audit_document": "POST /audit/document"
        },
        "orchestrator_available": ORCHESTRATOR_AVAILABLE
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Docker"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "orchestrator_available": ORCHESTRATOR_AVAILABLE,
        "api_keys_configured": {
            "openai": bool(os.getenv("OPENAI_API_KEY")),
            "anthropic": bool(os.getenv("ANTHROPIC_API_KEY"))
        }
    }

@app.get("/audit/status")
async def get_audit_status():
    """Get current audit status"""
    if current_audit is None:
        return {
            "status": "idle",
            "message": "No audit currently running"
        }
    return current_audit

@app.get("/audit/history")
async def get_audit_history():
    """Get audit history"""
    return {
        "total_audits": len(audit_history),
        "audits": audit_history[-10:]  # Return last 10 audits
    }

@app.post("/audit/start")
async def start_audit(request: AuditRequest, background_tasks: BackgroundTasks):
    """Start a new security audit"""
    global current_audit
    
    if not ORCHESTRATOR_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Orchestrator not available. Please ensure all dependencies are installed."
        )
    
    if current_audit and current_audit.get("status") == "running":
        raise HTTPException(
            status_code=409,
            detail="An audit is already running"
        )
    
    audit_id = f"audit_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
    
    current_audit = {
        "audit_id": audit_id,
        "status": "running",
        "target_directory": request.target_directory,
        "description": request.description,
        "started_at": datetime.utcnow().isoformat(),
        "progress": 0
    }
    
    # Run audit in background
    background_tasks.add_task(run_audit, audit_id, request.target_directory)
    
    return AuditResponse(
        audit_id=audit_id,
        status="started",
        message=f"Audit {audit_id} started successfully"
    )

@app.post("/audit/document")
async def audit_document(file_path: str, background_tasks: BackgroundTasks):
    """Audit a specific document"""
    if not ORCHESTRATOR_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Orchestrator not available"
        )
    
    if not Path(file_path).exists():
        raise HTTPException(
            status_code=404,
            detail=f"File not found: {file_path}"
        )
    
    audit_id = f"doc_audit_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
    
    background_tasks.add_task(run_document_audit, audit_id, file_path)
    
    return AuditResponse(
        audit_id=audit_id,
        status="started",
        message=f"Document audit {audit_id} started for {file_path}"
    )

async def run_audit(audit_id: str, target_directory: str):
    """Run the audit in the background"""
    global current_audit
    
    try:
        api_keys = {
            "openai": os.getenv("OPENAI_API_KEY"),
            "anthropic": os.getenv("ANTHROPIC_API_KEY")
        }
        
        orchestrator = CerberusOrchestrator(api_keys, ".")
        result = await orchestrator.run_full_audit(target_directory)
        
        current_audit = {
            **current_audit,
            "status": "completed",
            "completed_at": datetime.utcnow().isoformat(),
            "result": result
        }
        
        audit_history.append(current_audit)
        
    except Exception as e:
        current_audit = {
            **current_audit,
            "status": "failed",
            "error": str(e),
            "failed_at": datetime.utcnow().isoformat()
        }
        audit_history.append(current_audit)

async def run_document_audit(audit_id: str, file_path: str):
    """Run document audit in the background"""
    try:
        api_keys = {
            "openai": os.getenv("OPENAI_API_KEY"),
            "anthropic": os.getenv("ANTHROPIC_API_KEY")
        }
        
        orchestrator = CerberusOrchestrator(api_keys, ".")
        result = await orchestrator.audit_document(file_path)
        
        audit_result = {
            "audit_id": audit_id,
            "status": "completed",
            "file_path": file_path,
            "completed_at": datetime.utcnow().isoformat(),
            "result": result
        }
        
        audit_history.append(audit_result)
        
    except Exception as e:
        audit_result = {
            "audit_id": audit_id,
            "status": "failed",
            "file_path": file_path,
            "error": str(e),
            "failed_at": datetime.utcnow().isoformat()
        }
        audit_history.append(audit_result)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
