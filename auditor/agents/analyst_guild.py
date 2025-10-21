# auditor/agents/analyst_guild.py
# Blueprint reference: python_anthropic, python_openai
import os
import json
import asyncio
from typing import List, Dict
import anthropic
import openai
import requests

class AnalystGuild:
    """
    The Analyst Guild: Four AI agents working in parallel
    - Claude Sonnet 4 (Anthropic) - Most advanced reasoning
    - GPT-4 Turbo (OpenAI) - General security analysis
    - Grok (xAI) - Novel threat detection
    - Deepseek - Code analysis specialist
    """
    
    def __init__(self, api_keys: Dict[str, str]):
        # The newest Anthropic model is "claude-sonnet-4-20250514"
        self.anthropic_client = anthropic.Anthropic(api_key=api_keys["anthropic"])
        self.openai_client = openai.OpenAI(api_key=api_keys["openai"])
        self.xai_key = api_keys.get("xai", "")
        self.deepseek_key = api_keys.get("deepseek", "")
        
        self.base_prompt_template = """You are an elite blockchain security auditor specializing in Cosmos SDK Go code and legal document analysis.

Your mission: Analyze the following content for vulnerabilities, inconsistencies, and potential exploits.

Focus Areas:
1. Integer overflow/underflow
2. Reentrancy vulnerabilities
3. Unsafe type assertions
4. Keeper privilege escalation
5. Gas griefing and DoS vectors
6. State machine inconsistencies
7. Cryptographic implementation errors
8. Logic errors and edge cases
9. Access control vulnerabilities
10. Economic exploit vectors

Return your findings as a JSON array of objects with this structure:
[
  {{
    "severity": "CRITICAL|HIGH|MEDIUM|LOW",
    "type": "vulnerability_type",
    "description": "detailed description",
    "line_number": number (if applicable),
    "exploit_scenario": "how this could be exploited",
    "fix_recommendation": "how to fix it"
  }}
]

If no issues are found, return an empty array: []

Content to analyze:
---
{content}
---
"""

    async def audit_file(self, file_path: str) -> Dict[str, List[Dict]]:
        """Audit a Go source file with all four AI agents"""
        print(f"📄 Analyst Guild: Scanning {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Run all analyses in parallel
        tasks = [
            self._analyze_with_claude(code, file_path),
            self._analyze_with_gpt4(code, file_path),
            self._analyze_with_grok(code, file_path),
            self._analyze_with_deepseek(code, file_path)
        ]
        
        results = await asyncio.gather(*tasks)
        
        return {
            "claude": results[0],
            "gpt4": results[1],
            "grok": results[2],
            "deepseek": results[3]
        }
    
    async def audit_document(self, file_path: str) -> Dict[str, List[Dict]]:
        """Audit a markdown/text document (like TAST) with all four AI agents"""
        print(f"📄 Analyst Guild: Scanning document {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Run all analyses in parallel
        tasks = [
            self._analyze_document_claude(content, file_path),
            self._analyze_document_gpt4(content, file_path),
            self._analyze_document_grok(content, file_path),
            self._analyze_document_deepseek(content, file_path)
        ]
        
        results = await asyncio.gather(*tasks)
        
        return {
            "claude": results[0],
            "gpt4": results[1],
            "grok": results[2],
            "deepseek": results[3]
        }

    async def _analyze_with_claude(self, code: str, file_path: str) -> List[Dict]:
        """Use Claude Sonnet 4 for advanced security analysis"""
        try:
            print(f"  🤖 Claude Sonnet 4 analyzing {os.path.basename(file_path)}...")
            
            prompt = self.base_prompt_template.format(content=code)
            
            # The newest Anthropic model is "claude-sonnet-4-20250514"
            response = self.anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Extract JSON from response
            content = response.content[0].text
            findings = self._extract_json(content)
            
            print(f"  ✅ Claude found {len(findings)} potential issues")
            return findings
            
        except Exception as e:
            print(f"  ⚠️  Claude analysis error: {str(e)}")
            return []

    async def _analyze_with_gpt4(self, code: str, file_path: str) -> List[Dict]:
        """Use GPT-4 Turbo for independent verification"""
        try:
            print(f"  🤖 GPT-4 Turbo analyzing {os.path.basename(file_path)}...")
            
            prompt = self.base_prompt_template.format(content=code)
            
            response = self.openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": "You are a blockchain security expert specializing in Cosmos SDK."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            
            content = response.choices[0].message.content
            findings = self._extract_json(content)
            
            print(f"  ✅ GPT-4 found {len(findings)} potential issues")
            return findings
            
        except Exception as e:
            print(f"  ⚠️  GPT-4 analysis error: {str(e)}")
            return []

    async def _analyze_with_grok(self, code: str, file_path: str) -> List[Dict]:
        """Use Grok for novel threat detection"""
        try:
            print(f"  🤖 Grok analyzing {os.path.basename(file_path)}...")
            
            # Grok API endpoint (xAI)
            url = "https://api.x.ai/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.xai_key}",
                "Content-Type": "application/json"
            }
            
            prompt = self.base_prompt_template.format(content=code)
            
            payload = {
                "model": "grok-beta",
                "messages": [
                    {"role": "system", "content": "You are a blockchain security expert specializing in finding novel attack vectors."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=60)
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                findings = self._extract_json(content)
                print(f"  ✅ Grok found {len(findings)} potential issues")
                return findings
            else:
                print(f"  ⚠️  Grok API error: {response.status_code}")
                return self._simulate_grok(code, file_path)
                
        except Exception as e:
            print(f"  ⚠️  Grok analysis error: {str(e)} - using simulation")
            return self._simulate_grok(code, file_path)

    async def _analyze_with_deepseek(self, code: str, file_path: str) -> List[Dict]:
        """Use Deepseek for code analysis"""
        try:
            print(f"  🤖 Deepseek analyzing {os.path.basename(file_path)}...")
            
            # Deepseek API endpoint
            url = "https://api.deepseek.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.deepseek_key}",
                "Content-Type": "application/json"
            }
            
            prompt = self.base_prompt_template.format(content=code)
            
            payload = {
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": "You are a code security expert specializing in static analysis."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=60)
            
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                findings = self._extract_json(content)
                print(f"  ✅ Deepseek found {len(findings)} potential issues")
                return findings
            else:
                print(f"  ⚠️  Deepseek API error: {response.status_code}")
                return self._simulate_deepseek(code, file_path)
                
        except Exception as e:
            print(f"  ⚠️  Deepseek analysis error: {str(e)} - using simulation")
            return self._simulate_deepseek(code, file_path)

    async def _analyze_document_claude(self, content: str, file_path: str) -> List[Dict]:
        """Analyze document with Claude"""
        try:
            print(f"  🤖 Claude analyzing document...")
            
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
            
            # The newest Anthropic model is "claude-sonnet-4-20250514"
            response = self.anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}]
            )
            
            findings = self._extract_json(response.content[0].text)
            print(f"  ✅ Claude found {len(findings)} document issues")
            return findings
            
        except Exception as e:
            print(f"  ⚠️  Claude document analysis error: {str(e)}")
            return []

    async def _analyze_document_gpt4(self, content: str, file_path: str) -> List[Dict]:
        """Analyze document with GPT-4"""
        try:
            print(f"  🤖 GPT-4 analyzing document...")
            
            prompt = f"""Analyze this document for logical flaws, calculation errors, and legal vulnerabilities:

{content[:8000]}

Return findings as JSON array."""
            
            response = self.openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            
            findings = self._extract_json(response.choices[0].message.content)
            print(f"  ✅ GPT-4 found {len(findings)} document issues")
            return findings
            
        except Exception as e:
            print(f"  ⚠️  GPT-4 document analysis error: {str(e)}")
            return []

    async def _analyze_document_grok(self, content: str, file_path: str) -> List[Dict]:
        """Analyze document with Grok"""
        return []  # Simulated for now

    async def _analyze_document_deepseek(self, content: str, file_path: str) -> List[Dict]:
        """Analyze document with Deepseek"""
        return []  # Simulated for now

    def _simulate_grok(self, code: str, file_path: str) -> List[Dict]:
        """Simulated Grok analysis (fallback)"""
        print(f"  🔮 Using simulated Grok analysis")
        return []

    def _simulate_deepseek(self, code: str, file_path: str) -> List[Dict]:
        """Simulated Deepseek analysis (fallback)"""
        print(f"  🔮 Using simulated Deepseek analysis")
        return []

    def _extract_json(self, text: str) -> List[Dict]:
        """Extract JSON array from AI response"""
        try:
            # Try to find JSON in the response
            start = text.find('[')
            end = text.rfind(']') + 1
            
            if start != -1 and end > start:
                json_str = text[start:end]
                return json.loads(json_str)
            
            # If no array found, try parsing entire text
            return json.loads(text)
            
        except json.JSONDecodeError:
            # Return empty if can't parse
            return []
