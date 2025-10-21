
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Upload, Clock, Brain, Zap } from 'lucide-react';

export default function CerberusAuditor() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [threatLevel, setThreatLevel] = useState('medium');

  useEffect(() => {
    fetchAuditHistory();
  }, []);

  const fetchAuditHistory = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/auditor/history');
      const data = await response.json();
      if (data.success) {
        setHistory(data.reports);
      }
    } catch (error) {
      console.error('Failed to fetch audit history:', error);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const runAudit = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to audit');
      return;
    }

    setScanning(true);
    setResults(null);

    try {
      const filePaths = selectedFiles.map(f => f.name);
      
      const response = await fetch('http://localhost:3002/api/auditor/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: filePaths, threatLevel })
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
        fetchAuditHistory();
      } else {
        alert('Audit failed: ' + data.error);
      }
    } catch (error) {
      console.error('Audit error:', error);
      alert('Failed to run audit');
    } finally {
      setScanning(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-purple-400" />
        <div>
          <h3 className="text-2xl font-bold">🛡️ Cerberus Security Auditor</h3>
          <p className="text-sm text-gray-300">Multi-Agent AI Threat Detection System</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-5">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-purple-400" />
          Upload Files for Security Audit
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Select Files (Smart Contracts, Code, Configs)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 cursor-pointer"
              accept=".sol,.js,.ts,.go,.py,.json,.yaml,.yml"
            />
            {selectedFiles.length > 0 && (
              <p className="text-sm text-green-400 mt-2">
                ✓ {selectedFiles.length} file(s) selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Threat Detection Level
            </label>
            <select
              value={threatLevel}
              onChange={(e) => setThreatLevel(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="low">Low - Basic Scan</option>
              <option value="medium">Medium - Standard Audit</option>
              <option value="high">High - Deep Analysis</option>
              <option value="critical">Critical - Maximum Security</option>
            </select>
          </div>

          <button
            onClick={runAudit}
            disabled={scanning || selectedFiles.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
          >
            {scanning ? (
              <>
                <Zap className="w-5 h-5 animate-pulse" />
                4 AI Agents Analyzing...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Run Security Audit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {scanning && (
        <div className="mb-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-xl p-6 animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-blue-400 animate-bounce" />
            <div className="text-center">
              <p className="text-xl font-bold text-blue-300">Cerberus Multi-Agent Scan Active</p>
              <p className="text-sm text-gray-300 mt-1">
                GPT-4 • Claude Sonnet • Grok • Deepseek analyzing in parallel
              </p>
            </div>
          </div>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="text-xl font-bold text-green-300">Audit Complete</h4>
                <p className="text-sm text-gray-300">
                  {results.consensus_reached ? 'Consensus Reached' : 'No Consensus'} • 
                  {results.vulnerabilities?.length || 0} vulnerabilities found
                </p>
              </div>
            </div>

            {/* Vulnerabilities */}
            {results.vulnerabilities && results.vulnerabilities.length > 0 && (
              <div className="space-y-3 mt-4">
                <h5 className="font-bold text-lg text-white">🚨 Detected Vulnerabilities</h5>
                {results.vulnerabilities.map((vuln, i) => (
                  <div key={i} className={`p-4 rounded-lg ${getSeverityColor(vuln.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-bold">{vuln.title}</span>
                      </div>
                      <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-white/20">
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{vuln.description}</p>
                    <div className="text-xs">
                      <strong>Location:</strong> {vuln.file}:{vuln.line}
                    </div>
                    {vuln.fix && (
                      <div className="mt-2 text-xs bg-white/10 p-2 rounded">
                        <strong>Recommended Fix:</strong> {vuln.fix}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Agent Consensus */}
            {results.agent_votes && (
              <div className="mt-4 bg-white/5 p-4 rounded-lg">
                <h5 className="font-bold mb-2">AI Agent Consensus</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(results.agent_votes).map(([agent, vote]) => (
                    <div key={agent} className="flex items-center gap-2">
                      <span className={vote === 'safe' ? 'text-green-400' : 'text-red-400'}>
                        {vote === 'safe' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </span>
                      <span className="text-gray-300">{agent}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audit History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Recent Audit History
          </h4>
          <div className="space-y-2">
            {history.slice(0, 5).map((audit, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{new Date(audit.timestamp).toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    audit.vulnerabilities?.length > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {audit.vulnerabilities?.length || 0} issues
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
