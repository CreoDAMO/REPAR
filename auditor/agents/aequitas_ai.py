# auditor/agents/aequitas_ai.py
"""
Aequitas AI - Unified Security Analysis Model
Powered by NVIDIA NIM (NVIDIA Inference Microservices)

This replaces 4 external AI APIs (Claude, GPT-4, Grok, Deepseek) with one
sovereign NVIDIA-powered inference engine that combines their strengths.
"""

import os
import json
import asyncio
from typing import List, Dict
import requests

class AequitasAI:
    """
    Unified AI model for Aequitas Protocol security auditing
    Uses NVIDIA NIM API for sovereign inference
    """
    
    def __init__(self, nvidia_api_key: str = None):
        self.api_key = nvidia_api_key or os.getenv("NVIDIA_API_KEY") or ""
        
        # NVIDIA NIM endpoint - can be self-hosted or cloud
        self.nim_endpoint = os.getenv("NVIDIA_NIM_ENDPOINT", "https://integrate.api.nvidia.com/v1")
        
        # Model selection - NVIDIA provides multiple options
        # Using Llama 3.1 70B or Nemotron for reasoning + code analysis
        self.model = os.getenv("NVIDIA_MODEL", "meta/llama-3.1-70b-instruct")
        
        # Specialized prompts combining strengths of all 4 previous models
        self.analyst_persona = self._build_analyst_persona()
        self.adversary_persona = self._build_adversary_persona()
        self.engineer_persona = self._build_engineer_persona()
        
        print(f"✅ Aequitas AI initialized with NVIDIA NIM")
        print(f"   Model: {self.model}")
        print(f"   Endpoint: {self.nim_endpoint}")
    
    def _build_analyst_persona(self) -> str:
        """
        Combines strengths of Claude (reasoning), GPT-4 (general analysis),
        Grok (novel threats), and Deepseek (code patterns)
        """
        return """You are Aequitas AI, an elite blockchain security auditor combining:

**Claude Sonnet's Advanced Reasoning**: Deep logical analysis, multi-step threat chains
**GPT-4's Broad Knowledge**: Comprehensive security pattern recognition
**Grok's Novel Threat Detection**: Unconventional attack vectors, zero-day thinking
**Deepseek's Code Analysis**: Static analysis expertise, pattern matching

Your mission: Analyze Cosmos SDK Go code for vulnerabilities with military-grade precision.

Focus Areas (Priority Order):
1. Economic exploits - Can attacker drain funds or manipulate $REPAR supply?
2. Consensus attacks - Can validator set be compromised?
3. State machine violations - Can invalid state transitions occur?
4. Access control - Can unauthorized users execute privileged operations?
5. Integer arithmetic - Overflow, underflow, precision loss
6. Reentrancy - Cross-module call vulnerabilities
7. Gas griefing - DoS via excessive computation
8. Cryptographic flaws - Weak RNG, signature forgery
9. Time manipulation - Block timestamp dependencies
10. Edge cases - Unexpected inputs, boundary conditions

Analysis Framework:
- IMPACT: What's the worst-case scenario?
- LIKELIHOOD: How easy to exploit?
- EVIDENCE: Line numbers, code snippets, proof of concept
- REMEDIATION: Specific fix with code example

Return JSON array of findings with this structure:
[
  {
    "severity": "CRITICAL|HIGH|MEDIUM|LOW",
    "type": "vulnerability_class",
    "description": "clear threat description",
    "line_number": number,
    "exploit_scenario": "step-by-step attack path",
    "fix_recommendation": "concrete code fix",
    "confidence": 0.0-1.0
  }
]

If no issues found, return empty array: []

Be thorough. The $131 trillion reparations protocol depends on your vigilance."""

    def _build_adversary_persona(self) -> str:
        """Specialized for exploit confirmation and PoC generation"""
        return """You are Aequitas Adversary AI - a white-hat penetration tester.

Your job: Confirm if vulnerabilities are actually exploitable, not just theoretical.

For each potential threat:
1. Build minimal exploit proof-of-concept
2. Test against edge cases
3. Verify real-world exploitability
4. Estimate attack cost (gas, capital, time)

Return:
{
  "exploitable": true/false,
  "evidence": "concrete proof",
  "attack_cost": "economic cost to attacker",
  "severity_multiplier": 0.0-2.0
}

Only confirm exploits you can prove. False positives waste developer time."""

    def _build_engineer_persona(self) -> str:
        """Specialized for patch generation"""
        return """You are Aequitas Engineer AI - an expert at writing secure blockchain code.

Given a confirmed vulnerability, generate:
1. Minimal, surgical patch (not refactor)
2. Preserves existing functionality
3. Adds defensive checks
4. Includes inline comments explaining fix
5. Go idiomatic code (proper error handling)

Return:
{
  "patch": "complete code fix",
  "rationale": "why this fix works",
  "test_cases": ["test scenarios to validate fix"]
}

Keep patches small. Large rewrites introduce new bugs."""
    
    async def audit_file(self, file_path: str) -> Dict[str, List[Dict]]:
        """
        Analyze Go source code for security vulnerabilities
        Uses self-consistency sampling for consensus (like the 4-model approach)
        Returns same format as AnalystGuild for compatibility
        """
        print(f"🤖 Aequitas AI analyzing {os.path.basename(file_path)}...")
        
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Run 3 independent analyses with temperature variation
        # This simulates the multi-model consensus approach
        analyses = await asyncio.gather(
            self._analyze_with_temperature(code, 0.3),  # Conservative
            self._analyze_with_temperature(code, 0.5),  # Balanced
            self._analyze_with_temperature(code, 0.7)   # Creative
        )
        
        # Convert tuple to list for type compatibility
        analyses_list = list(analyses)
        
        # Merge findings and apply consensus logic
        consensus_findings = self._apply_consensus(analyses_list)
        
        print(f"  ✅ Found {len(consensus_findings)} consensus issues")
        
        # Return in same format as AnalystGuild (4 sources)
        return {
            "aequitas_conservative": analyses[0] if len(analyses) > 0 else [],
            "aequitas_balanced": analyses[1] if len(analyses) > 1 else [],
            "aequitas_creative": analyses[2] if len(analyses) > 2 else [],
            "aequitas_consensus": consensus_findings
        }
    
    async def audit_document(self, file_path: str) -> Dict[str, List[Dict]]:
        """
        Audit a markdown/text document (like TAST)
        Returns same format as AnalystGuild for compatibility
        """
        print(f"📄 Aequitas AI analyzing document {file_path}...")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Use document-specific prompts
        analyses = await asyncio.gather(
            self._analyze_document(content, 0.3),
            self._analyze_document(content, 0.5),
            self._analyze_document(content, 0.7)
        )
        
        # Convert tuple to list for type compatibility
        analyses_list = list(analyses)
        
        consensus_findings = self._apply_consensus(analyses_list)
        
        print(f"  ✅ Found {len(consensus_findings)} document issues")
        
        return {
            "aequitas_conservative": analyses[0] if len(analyses) > 0 else [],
            "aequitas_balanced": analyses[1] if len(analyses) > 1 else [],
            "aequitas_creative": analyses[2] if len(analyses) > 2 else [],
            "aequitas_consensus": consensus_findings
        }
    
    async def _analyze_document(self, content: str, temperature: float) -> List[Dict]:
        """Analyze document for logical/legal issues"""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            prompt = f"""Analyze this legal/forensic document for:
1. Logical inconsistencies
2. Mathematical errors in calculations
3. Legal vulnerabilities in arguments
4. Missing evidence or citations
5. Ambiguous language that could be exploited

Document:
---
{content[:8000]}
---

Return findings as JSON array."""
            
            payload = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": self.analyst_persona},
                    {"role": "user", "content": prompt}
                ],
                "temperature": temperature,
                "max_tokens": 4096
            }
            
            response = requests.post(
                f"{self.nim_endpoint}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                content_text = response.json()["choices"][0]["message"]["content"]
                return self._extract_json(content_text)
            else:
                print(f"  ⚠️  NIM API error: {response.status_code}")
                return []
                
        except Exception as e:
            print(f"  ⚠️  Document analysis error: {str(e)}")
            return []
    
    async def _analyze_with_temperature(self, code: str, temperature: float) -> List[Dict]:
        """Run analysis with specific temperature for diversity"""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": self.analyst_persona},
                    {"role": "user", "content": f"Analyze this code:\n\n```go\n{code}\n```"}
                ],
                "temperature": temperature,
                "max_tokens": 4096
            }
            
            response = requests.post(
                f"{self.nim_endpoint}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                return self._extract_json(content)
            else:
                print(f"  ⚠️  NIM API error: {response.status_code}")
                return []
                
        except Exception as e:
            print(f"  ⚠️  Analysis error: {str(e)}")
            return []
    
    def _apply_consensus(self, analyses: List[List[Dict]]) -> List[Dict]:
        """
        Apply consensus logic (same as original 4-model approach)
        Issues found by 2+ analyses are considered consensus
        """
        findings_map = {}
        
        for analysis in analyses:
            for finding in analysis:
                desc = finding.get('description', '').lower()
                severity = finding.get('severity', 'UNKNOWN')
                
                key = (desc[:50], severity)
                
                if key not in findings_map:
                    findings_map[key] = {
                        'count': 0,
                        'details': finding
                    }
                
                findings_map[key]['count'] += 1
        
        # Consensus threshold: 2+ analyses agree
        consensus = []
        for key, data in findings_map.items():
            if data['count'] >= 2:
                finding = data['details']
                finding['consensus_count'] = data['count']
                consensus.append(finding)
        
        return consensus
    
    async def confirm_exploit(self, vulnerability: Dict, code_snippet: str) -> Dict:
        """
        Test if vulnerability is actually exploitable
        Uses adversary persona
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""Vulnerability:
{json.dumps(vulnerability, indent=2)}

Code Context:
```go
{code_snippet}
```

Build a proof-of-concept exploit. Is this actually exploitable?"""
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.adversary_persona},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.4,
            "max_tokens": 2048
        }
        
        try:
            response = requests.post(
                f"{self.nim_endpoint}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                result = self._extract_json(content)
                return result[0] if result else {"exploitable": False}
            
        except Exception as e:
            print(f"  ⚠️  Exploit confirmation error: {str(e)}")
        
        return {"exploitable": False}
    
    async def generate_patch(self, vulnerability: Dict, code_snippet: str) -> Dict:
        """
        Generate code patch to fix vulnerability
        Uses engineer persona
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""Vulnerability to fix:
{json.dumps(vulnerability, indent=2)}

Vulnerable Code:
```go
{code_snippet}
```

Generate a minimal, surgical patch to fix this vulnerability."""
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.engineer_persona},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,  # Low temp for deterministic fixes
            "max_tokens": 2048
        }
        
        try:
            response = requests.post(
                f"{self.nim_endpoint}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                result = self._extract_json(content)
                return result[0] if result else {}
            
        except Exception as e:
            print(f"  ⚠️  Patch generation error: {str(e)}")
        
        return {}
    
    async def generate_document_patch(self, vulnerability: Dict, content_snippet: str) -> Dict:
        """
        Generate patch for document vulnerabilities
        Uses engineer persona for document corrections
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""Document vulnerability to fix:
{json.dumps(vulnerability, indent=2)}

Problematic content:
---
{content_snippet}
---

Generate a corrected version that:
1. Fixes the logical/legal flaw
2. Maintains the core argument
3. Strengthens the position
4. Uses precise legal language

Return JSON with:
{{
  "corrected_content": "the fixed content",
  "explanation": "what was wrong and how it's fixed",
  "legal_rationale": "why this correction is stronger"
}}"""
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.engineer_persona},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,
            "max_tokens": 2048
        }
        
        try:
            response = requests.post(
                f"{self.nim_endpoint}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                result = self._extract_json(content)
                return result[0] if result else {}
            
        except Exception as e:
            print(f"  ⚠️  Document patch generation error: {str(e)}")
        
        return {}
    
    def _extract_json(self, text: str) -> List[Dict]:
        """Extract JSON from model response"""
        try:
            # Try to find JSON array in response
            start = text.find('[')
            end = text.rfind(']') + 1
            if start >= 0 and end > start:
                return json.loads(text[start:end])
            
            # Try to find JSON object
            start = text.find('{')
            end = text.rfind('}') + 1
            if start >= 0 and end > start:
                obj = json.loads(text[start:end])
                return [obj] if isinstance(obj, dict) else obj
            
        except json.JSONDecodeError:
            pass
        
        return []


# Convenience function for backward compatibility
def create_analyst_guild(nvidia_api_key: str) -> AequitasAI:
    """
    Drop-in replacement for AnalystGuild
    Returns single Aequitas AI instead of 4 separate models
    """
    return AequitasAI(nvidia_api_key)
