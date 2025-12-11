import { useState, useEffect } from 'react';
import { Globe, Shield, Server, Layers, Zap, Search, Plus, RefreshCw, Lock, ArrowRight, CheckCircle, AlertTriangle, Database, Radio } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export default function ADNSDashboard() {
  const [status, setStatus] = useState(null);
  const [domains, setDomains] = useState([]);
  const [cacheStats, setCacheStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolveQuery, setResolveQuery] = useState('');
  const [resolveResult, setResolveResult] = useState(null);
  const [resolving, setResolving] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    domain: '',
    recordType: 'A',
    values: '',
    ttl: 300,
    owner: ''
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerResult, setRegisterResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statusRes, domainsRes, cacheRes] = await Promise.all([
        fetch(`${API_BASE}/api/adns/status`),
        fetch(`${API_BASE}/api/adns/domains`),
        fetch(`${API_BASE}/api/adns/cache/stats`)
      ]);
      
      if (statusRes.ok) {
        const data = await statusRes.json();
        setStatus(data);
      }
      if (domainsRes.ok) {
        const data = await domainsRes.json();
        setDomains(data.domains || []);
      }
      if (cacheRes.ok) {
        const data = await cacheRes.json();
        setCacheStats(data.cache);
      }
    } catch (error) {
      console.error('Failed to fetch ADNS data:', error);
    }
    setLoading(false);
  };

  const handleResolve = async () => {
    if (!resolveQuery.trim()) return;
    setResolving(true);
    setResolveResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/adns/resolve?domain=${encodeURIComponent(resolveQuery)}`);
      const data = await res.json();
      setResolveResult(data);
    } catch (error) {
      setResolveResult({ success: false, error: error.message });
    }
    setResolving(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/adns/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerForm,
          values: registerForm.values.split(',').map(v => v.trim())
        })
      });
      const data = await res.json();
      setRegisterResult(data);
      if (data.success) {
        fetchData();
        setRegisterForm({ domain: '', recordType: 'A', values: '', ttl: 300, owner: '' });
      }
    } catch (error) {
      setRegisterResult({ success: false, error: error.message });
    }
    setRegisterLoading(false);
  };

  const LayerCard = ({ layer, name, status: layerStatus, latency, extra }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-purple-400 font-bold">L{layer}</span>
          <span className="text-white font-medium">{name}</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          layerStatus === 'active' ? 'bg-green-900 text-green-300' :
          layerStatus === 'ready' ? 'bg-blue-900 text-blue-300' :
          'bg-yellow-900 text-yellow-300'
        }`}>
          {layerStatus}
        </span>
      </div>
      <div className="text-gray-400 text-sm">
        {latency && <span>Latency: {latency}</span>}
        {extra && <span className="ml-2">{extra}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ADNS - Aequitas DNS System
              </h1>
              <p className="text-gray-400">Sovereign DNS with 5-Layer Architecture</p>
            </div>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-6 h-6 text-purple-400" />
              <span className="text-gray-400">Total Domains</span>
            </div>
            <p className="text-3xl font-bold text-white">{status?.statistics?.totalDomains || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-6 border border-blue-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-blue-400" />
              <span className="text-gray-400">Cache Size</span>
            </div>
            <p className="text-3xl font-bold text-white">{cacheStats?.size || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-6 border border-green-700/50">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-gray-400">Active Domains</span>
            </div>
            <p className="text-3xl font-bold text-white">{status?.statistics?.activeDomains || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 rounded-xl p-6 border border-amber-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-6 h-6 text-amber-400" />
              <span className="text-gray-400">Frozen Domains</span>
            </div>
            <p className="text-3xl font-bold text-white">{status?.statistics?.frozenDomains || 0}</p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-400" />
            DNS Resolution
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={resolveQuery}
              onChange={(e) => setResolveQuery(e.target.value)}
              placeholder="Enter domain (e.g., rpc.aequitas)"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleResolve()}
            />
            <button
              onClick={handleResolve}
              disabled={resolving}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-50"
            >
              {resolving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Resolve
            </button>
          </div>
          {resolveResult && (
            <div className={`mt-4 p-4 rounded-lg ${resolveResult.success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              {resolveResult.success ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-green-400">Resolved via {resolveResult.layerName}</span>
                    <span className="text-gray-400 text-sm">({resolveResult.resolveTime})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-400">Domain:</span> <span className="text-white">{resolveResult.record?.domain}</span></div>
                    <div><span className="text-gray-400">Type:</span> <span className="text-white">{resolveResult.record?.recordType}</span></div>
                    <div><span className="text-gray-400">Values:</span> <span className="text-white">{resolveResult.record?.values?.join(', ')}</span></div>
                    <div><span className="text-gray-400">TTL:</span> <span className="text-white">{resolveResult.record?.ttl}s</span></div>
                    <div><span className="text-gray-400">Owner:</span> <span className="text-white font-mono text-xs">{resolveResult.record?.owner}</span></div>
                    <div><span className="text-gray-400">Cached:</span> <span className="text-white">{resolveResult.cached ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">{resolveResult.error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              5-Layer Architecture
            </h2>
            <div className="space-y-3">
              {status?.architecture?.layers?.map((layer, i) => (
                <LayerCard key={i} {...layer} />
              )) || (
                <>
                  <LayerCard layer={1} name="Redis Cache" status="active" latency="<1ms" />
                  <LayerCard layer={2} name="Blockchain Authority" status="active" latency="<50ms" />
                  <LayerCard layer={3} name="BIND9 Root Zone" status="ready" latency="<10ms" />
                  <LayerCard layer={4} name="BGP Anycast" status="configured" latency="<10ms" />
                  <LayerCard layer={5} name="9-Protocol Fallback" status="active" extra="8 resolvers" />
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Security & FHE Protection
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>Post-Quantum Signatures</span>
                </div>
                <span className="text-purple-400 font-mono text-sm">ML-DSA-87</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>APEX-FHE v3.0</span>
                </div>
                <span className="text-cyan-400 font-mono text-sm">{status?.fhe?.enabled ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <span>Constitutional Axioms</span>
                </div>
                <span className="text-green-400 font-mono text-sm">{status?.fhe?.axiomCount || 25} enforced</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <span>Bootstrap Time</span>
                </div>
                <span className="text-blue-400 font-mono text-sm">{status?.fhe?.bootstrapTime || '<30ms'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                    <Radio className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>Fallback Protocols</span>
                </div>
                <span className="text-amber-400 font-mono text-sm">9 layers</span>
              </div>
            </div>
            {status?.fhe?.features && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">FHE Capabilities:</p>
                <div className="flex flex-wrap gap-1">
                  {status.fhe.features.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded text-xs">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              Registered Domains
            </h2>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              Register Domain
            </button>
          </div>

          {showRegister && (
            <form onSubmit={handleRegister} className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Register New Domain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Domain</label>
                  <input
                    type="text"
                    value={registerForm.domain}
                    onChange={(e) => setRegisterForm({...registerForm, domain: e.target.value})}
                    placeholder="mydomain.aequitas"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Record Type</label>
                  <select
                    value={registerForm.recordType}
                    onChange={(e) => setRegisterForm({...registerForm, recordType: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="A">A (IPv4)</option>
                    <option value="AAAA">AAAA (IPv6)</option>
                    <option value="CNAME">CNAME</option>
                    <option value="TXT">TXT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Values (comma-separated)</label>
                  <input
                    type="text"
                    value={registerForm.values}
                    onChange={(e) => setRegisterForm({...registerForm, values: e.target.value})}
                    placeholder="135.232.208.145"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">TTL (seconds)</label>
                  <input
                    type="number"
                    value={registerForm.ttl}
                    onChange={(e) => setRegisterForm({...registerForm, ttl: parseInt(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Owner Address</label>
                  <input
                    type="text"
                    value={registerForm.owner}
                    onChange={(e) => setRegisterForm({...registerForm, owner: e.target.value})}
                    placeholder="aequitas1..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={registerLoading}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {registerLoading ? 'Registering...' : 'Register Domain'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
              {registerResult && (
                <div className={`mt-4 p-3 rounded-lg ${registerResult.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {registerResult.success ? `Domain registered! Token ID: ${registerResult.tokenId}` : registerResult.error}
                </div>
              )}
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Domain</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Values</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">TTL</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium text-purple-400">{domain.domain}</td>
                    <td className="py-3 px-4 text-gray-300">{domain.recordType}</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-300">{domain.values?.join(', ')}</td>
                    <td className="py-3 px-4 text-gray-400">{domain.ttl}s</td>
                    <td className="py-3 px-4">
                      {domain.frozen ? (
                        <span className="px-2 py-1 bg-amber-900/50 text-amber-400 rounded text-xs flex items-center gap-1 w-fit">
                          <Lock className="w-3 h-3" /> Frozen
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs">Active</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-500">{domain.owner?.substring(0, 20)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            Sovereign TLDs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['.aequitas', '.repar', '.sovereign'].map((tld, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-400">{tld}</span>
                  <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs">Active</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {tld === '.aequitas' && 'Primary protocol TLD for Aequitas services'}
                  {tld === '.repar' && 'Reparations and claims domain space'}
                  {tld === '.sovereign' && 'Sovereign nation infrastructure'}
                </p>
                <p className="text-purple-400 text-sm mt-2">
                  {status?.statistics?.tldDistribution?.[tld] || 0} domains registered
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>"If I build it, they will come. No more GoDaddy. No more ICANN. Pure sovereignty."</p>
          <p className="mt-2">ADNS v1.0.0 - Post-Quantum Secured - Constitutional Enforcement Active</p>
        </div>
      </div>
    </div>
  );
}
