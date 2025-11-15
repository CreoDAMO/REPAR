#!/usr/bin/env python3
"""
ACE AI Sidecar - NVIDIA NIM Integration for Workload Optimization

This sidecar provides AI-powered workload scheduling and optimization
using NVIDIA NIM (Llama 3.1 70B) through the existing Aequitas AI system.
"""

import os
import sys
import json
import logging
from typing import Dict, List, Any
from flask import Flask, request, jsonify
import numpy as np

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))
from auditor.agents.aequitas_ai import AequitasAI

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('ace-sidecar')

app = Flask(__name__)

ai_engine = None

def initialize_ai():
    """Initialize the Aequitas AI engine with NVIDIA NIM"""
    global ai_engine
    
    nvidia_api_key = os.getenv('NVIDIA_API_KEY')
    if not nvidia_api_key:
        logger.warning("NVIDIA_API_KEY not set, AI features will use mock responses")
        ai_engine = None
        return False
    
    try:
        ai_engine = AequitasAI(nvidia_api_key=nvidia_api_key)
        logger.info("✅ NVIDIA NIM AI engine initialized successfully")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to initialize AI engine: {e}")
        ai_engine = None
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'ai_enabled': ai_engine is not None
    }), 200

@app.route('/api/v1/predict-placement', methods=['POST'])
def predict_placement():
    """
    Predict optimal node placement for a workload
    
    Request Body:
    {
        "workload_type": "claims_processing|evidence_storage|validator_compute",
        "duration_seconds": 3600,
        "user_did": "aequitas1...",
        "available_nodes": [
            {"id": "node1", "gpu_count": 8, "cpu_cores": 128, "memory_gb": 512},
            {"id": "node2", "gpu_count": 4, "cpu_cores": 64, "memory_gb": 256}
        ]
    }
    
    Response:
    {
        "optimal_node_id": "node1",
        "confidence": 0.95,
        "risk_score": 0.12,
        "reasoning": "Selected node1 due to higher GPU count..."
    }
    """
    try:
        data = request.get_json()
        
        workload_type = data.get('workload_type', '')
        duration = data.get('duration_seconds', 3600)
        user_did = data.get('user_did', '')
        nodes = data.get('available_nodes', [])
        
        if not nodes:
            return jsonify({'error': 'No available nodes provided'}), 400
        
        if ai_engine:
            result = predict_with_ai(workload_type, duration, nodes, user_did)
        else:
            result = predict_deterministic(workload_type, nodes)
        
        logger.info(f"Placement prediction: {workload_type} -> {result['optimal_node_id']}")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

def predict_with_ai(workload_type: str, duration: int, nodes: List[Dict], user_did: str) -> Dict[str, Any]:
    """Use NVIDIA NIM to predict optimal placement"""
    
    prompt = f"""Analyze this workload placement scenario and recommend the optimal node.

Workload Type: {workload_type}
Duration: {duration} seconds
User DID: {user_did}

Available Nodes:
{json.dumps(nodes, indent=2)}

Consider:
1. GPU availability for AI workloads
2. CPU cores for compute-heavy tasks
3. Memory for data processing
4. Load balancing across the cluster

Respond with JSON:
{{
  "optimal_node_id": "node_id",
  "confidence": 0.0-1.0,
  "risk_score": 0.0-1.0,
  "reasoning": "explanation"
}}
"""
    
    try:
        response = ai_engine.analyze(
            prompt,
            context={
                'workload_type': workload_type,
                'nodes': nodes
            }
        )
        
        result_text = response.get('analysis', {}).get('combined', '')
        
        try:
            result = json.loads(result_text)
            if 'optimal_node_id' not in result:
                raise ValueError("Missing optimal_node_id in AI response")
            return result
        except json.JSONDecodeError:
            logger.warning("AI response not JSON, using deterministic fallback")
            return predict_deterministic(workload_type, nodes)
            
    except Exception as e:
        logger.error(f"AI prediction failed: {e}, using fallback")
        return predict_deterministic(workload_type, nodes)

def predict_deterministic(workload_type: str, nodes: List[Dict]) -> Dict[str, Any]:
    """Deterministic fallback placement algorithm"""
    
    if not nodes:
        raise ValueError("No nodes available")
    
    scores = []
    for node in nodes:
        score = 0
        
        if workload_type in ['claims_processing', 'validator_compute']:
            score += node.get('cpu_cores', 0) * 2
            score += node.get('memory_gb', 0) * 0.5
        
        elif workload_type == 'evidence_storage':
            score += node.get('memory_gb', 0) * 3
            score += node.get('cpu_cores', 0) * 0.5
        
        elif workload_type == 'ai_analysis':
            score += node.get('gpu_count', 0) * 10
            score += node.get('cpu_cores', 0) * 1
        
        else:
            score = node.get('cpu_cores', 0) + node.get('memory_gb', 0) * 0.1
        
        scores.append(score)
    
    best_idx = int(np.argmax(scores))
    best_node = nodes[best_idx]
    
    return {
        'optimal_node_id': best_node['id'],
        'confidence': 0.75,
        'risk_score': 0.15,
        'reasoning': f"Selected {best_node['id']} using deterministic scoring (workload={workload_type})"
    }

@app.route('/api/v1/analyze-audit', methods=['POST'])
def analyze_audit():
    """
    Analyze audit data for security threats
    
    Request Body:
    {
        "audit_data": {...},
        "context": "string"
    }
    
    Response:
    {
        "threats_detected": [...],
        "risk_level": "low|medium|high|critical",
        "recommendations": [...]
    }
    """
    try:
        data = request.get_json()
        audit_data = data.get('audit_data', {})
        context = data.get('context', '')
        
        if not ai_engine:
            return jsonify({
                'threats_detected': [],
                'risk_level': 'low',
                'recommendations': ['AI engine not available, using mock analysis']
            }), 200
        
        prompt = f"""Analyze this audit data for security threats:

Context: {context}
Data: {json.dumps(audit_data, indent=2)}

Identify:
1. Security vulnerabilities
2. Suspicious patterns
3. Risk level assessment
4. Recommended actions

Respond with JSON:
{{
  "threats_detected": ["threat1", "threat2"],
  "risk_level": "low|medium|high|critical",
  "recommendations": ["action1", "action2"]
}}
"""
        
        response = ai_engine.analyze(prompt, context={'audit': audit_data})
        analysis_text = response.get('analysis', {}).get('combined', '')
        
        try:
            result = json.loads(analysis_text)
        except json.JSONDecodeError:
            result = {
                'threats_detected': [],
                'risk_level': 'unknown',
                'recommendations': ['Failed to parse AI analysis']
            }
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Audit analysis error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/optimize-cost', methods=['POST'])
def optimize_cost():
    """
    Optimize resource allocation for cost efficiency
    
    Request Body:
    {
        "current_allocation": {...},
        "budget_repar": 1000000,
        "workload_requirements": {...}
    }
    
    Response:
    {
        "optimized_allocation": {...},
        "estimated_cost_repar": 850000,
        "savings_percent": 15.0
    }
    """
    try:
        data = request.get_json()
        current = data.get('current_allocation', {})
        budget = data.get('budget_repar', 0)
        requirements = data.get('workload_requirements', {})
        
        if ai_engine:
            result = optimize_with_ai(current, budget, requirements)
        else:
            result = {
                'optimized_allocation': current,
                'estimated_cost_repar': budget,
                'savings_percent': 0.0,
                'note': 'AI engine not available'
            }
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Cost optimization error: {e}")
        return jsonify({'error': str(e)}), 500

def optimize_with_ai(current: Dict, budget: int, requirements: Dict) -> Dict[str, Any]:
    """Use AI to optimize resource allocation for cost"""
    
    prompt = f"""Optimize this resource allocation for cost efficiency:

Current Allocation: {json.dumps(current, indent=2)}
Budget: {budget} $REPAR
Requirements: {json.dumps(requirements, indent=2)}

Optimize for:
1. Minimum cost while meeting requirements
2. Resource utilization efficiency
3. Performance guarantees

Respond with JSON:
{{
  "optimized_allocation": {{}},
  "estimated_cost_repar": 0,
  "savings_percent": 0.0,
  "reasoning": "explanation"
}}
"""
    
    try:
        response = ai_engine.analyze(prompt, context={'optimization': True})
        result_text = response.get('analysis', {}).get('combined', '')
        
        result = json.loads(result_text)
        return result
    except Exception as e:
        logger.error(f"AI optimization failed: {e}")
        return {
            'optimized_allocation': current,
            'estimated_cost_repar': budget,
            'savings_percent': 0.0,
            'error': str(e)
        }

def main():
    """Start the ACE AI Sidecar server"""
    port = int(os.getenv('ACE_SIDECAR_PORT', '8001'))
    host = os.getenv('ACE_SIDECAR_HOST', '0.0.0.0')
    
    logger.info("🚀 ACE AI Sidecar starting...")
    logger.info(f"   Host: {host}")
    logger.info(f"   Port: {port}")
    
    ai_initialized = initialize_ai()
    
    if ai_initialized:
        logger.info("✅ AI-powered scheduling enabled (NVIDIA NIM)")
    else:
        logger.warning("⚠️  AI engine disabled, using deterministic fallback")
    
    logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    logger.info("ACE AI Sidecar ready to optimize workloads")
    
    app.run(host=host, port=port, debug=False)

if __name__ == '__main__':
    main()
