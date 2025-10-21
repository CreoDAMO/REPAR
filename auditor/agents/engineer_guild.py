# auditor/agents/engineer_guild.py
# Blueprint reference: python_openai
import os
import openai
from typing import Dict

class EngineerGuild:
    """
    The Engineer Guild: Generates automated fixes for discovered vulnerabilities
    Uses GPT-4 to create secure patches and test cases
    """
    
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
    
    def generate_patch(self, vulnerability: Dict, code_snippet: str) -> Dict:
        """
        Generate a secure patch for a code vulnerability
        
        Args:
            vulnerability: Dict with vulnerability details
            code_snippet: The vulnerable code section
            
        Returns:
            Dict with fixed code, explanation, and test cases
        """
        print(f"  🔧 Engineer Guild: Generating patch for '{vulnerability['description']}'...")
        
        prompt = f"""You are a blockchain security engineer specializing in Cosmos SDK.

A vulnerability was discovered:
Type: {vulnerability.get('type', 'Unknown')}
Severity: {vulnerability.get('severity', 'Unknown')}
Description: {vulnerability['description']}
Exploit Scenario: {vulnerability.get('exploit_scenario', 'N/A')}

Current vulnerable code:
```go
{code_snippet}
```

Generate a secure fix that:
1. Eliminates the vulnerability completely
2. Maintains all existing functionality
3. Follows Cosmos SDK best practices
4. Includes inline security comments
5. Uses proper error handling

Return a JSON object with:
{{
  "fixed_code": "the corrected Go code",
  "explanation": "detailed explanation of the fix",
  "security_rationale": "why this fix is secure",
  "test_cases": ["list of test cases to verify the fix"]
}}
"""
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert blockchain security engineer."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2
            )
            
            import json
            fix_data = json.loads(response.choices[0].message.content)
            
            print(f"  ✅ Patch generated successfully")
            
            return {
                'vulnerability_id': vulnerability.get('id', 'unknown'),
                'fixed_code': fix_data.get('fixed_code', ''),
                'explanation': fix_data.get('explanation', ''),
                'security_rationale': fix_data.get('security_rationale', ''),
                'test_cases': fix_data.get('test_cases', []),
                'severity': vulnerability.get('severity', 'UNKNOWN')
            }
            
        except Exception as e:
            print(f"  ⚠️  Patch generation error: {str(e)}")
            return self._generate_fallback_patch(vulnerability, code_snippet)
    
    def generate_document_patch(self, vulnerability: Dict, content_snippet: str) -> Dict:
        """
        Generate a patch for document vulnerabilities
        
        Args:
            vulnerability: Dict with vulnerability details
            content_snippet: The problematic section
            
        Returns:
            Dict with corrected content and explanation
        """
        print(f"  🔧 Engineer Guild: Generating document patch for '{vulnerability['description']}'...")
        
        prompt = f"""You are a legal document expert.

A vulnerability was found in a legal document:
Type: {vulnerability.get('type', 'Unknown')}
Severity: {vulnerability.get('severity', 'Unknown')}
Description: {vulnerability['description']}

Current problematic content:
---
{content_snippet}
---

Generate a corrected version that:
1. Fixes the logical/legal flaw
2. Maintains the core argument
3. Strengthens the position
4. Uses precise legal language

Return a JSON object with:
{{
  "corrected_content": "the fixed content",
  "explanation": "what was wrong and how it's fixed",
  "legal_rationale": "why this correction is stronger"
}}
"""
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": "You are a legal document expert."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2
            )
            
            import json
            fix_data = json.loads(response.choices[0].message.content)
            
            print(f"  ✅ Document patch generated")
            
            return {
                'corrected_content': fix_data.get('corrected_content', ''),
                'explanation': fix_data.get('explanation', ''),
                'legal_rationale': fix_data.get('legal_rationale', '')
            }
            
        except Exception as e:
            print(f"  ⚠️  Document patch error: {str(e)}")
            return {
                'corrected_content': content_snippet,
                'explanation': f"Manual review needed for: {vulnerability['description']}",
                'legal_rationale': 'Automated fix not available'
            }
    
    def _generate_fallback_patch(self, vulnerability: Dict, code_snippet: str) -> Dict:
        """Generate a simple fallback patch when AI generation fails"""
        return {
            'vulnerability_id': vulnerability.get('id', 'unknown'),
            'fixed_code': f"// TODO: Fix {vulnerability['description']}\n{code_snippet}",
            'explanation': 'Manual review required - automated patch generation failed',
            'security_rationale': 'Requires human security expert review',
            'test_cases': ['Manual testing required'],
            'severity': vulnerability.get('severity', 'UNKNOWN')
        }
    
    def optimize_with_cuda(self, file_path: str) -> Dict:
        """
        Scan for CUDA optimization opportunities
        
        Args:
            file_path: Path to code file
            
        Returns:
            Dict with optimization recommendations
        """
        print(f"  ⚡ Engineer Guild: Scanning {file_path} for CUDA optimizations...")
        
        # This is a placeholder for future NVIDIA integration
        return {
            "optimization_found": False,
            "recommended_kernel": None,
            "estimated_speedup": "N/A",
            "note": "CUDA optimization analysis coming soon"
        }
