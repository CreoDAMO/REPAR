import { useState } from 'react';
import { Search, Building2, MapPin, TrendingUp, FileText, Sparkles, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import { defendants } from '../data/defendants';
import EvidenceExplorer from '../components/EvidenceExplorer';
import { multimodalSearch, analyzeSentiment } from '../utils/nvidiaAI';

export default function Defendants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedDefendant, setExpandedDefendant] = useState(null);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState(null);
  const [analyzingDefendant, setAnalyzingDefendant] = useState(null);
  const [riskAnalysis, setRiskAnalysis] = useState({});
  const [showAIPanel, setShowAIPanel] = useState(false);

  const activeDefendants = defendants;

  const categories = ['All', ...new Set(defendants.map(d => d.category))];
  const statuses = ['All', ...new Set(defendants.map(d => d.status))];

  const filteredDefendants = activeDefendants.filter(defendant => {
    const matchesSearch = defendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         defendant.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || defendant.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || defendant.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const totalLiability = filteredDefendants.reduce((sum, d) => sum + (d.slaveryDerivedWealth || d.liability || 0), 0);

  const handleAISearch = async () => {
    if (!searchTerm.trim()) return;
    
    setAiSearching(true);
    setShowAIPanel(true);
    
    try {
      const result = await multimodalSearch(searchTerm);
      setAiSearchResults(result);
    } catch (error) {
      console.error('AI Search failed:', error);
    } finally {
      setAiSearching(false);
    }
  };

  const analyzeDefendantRisk = async (defendant) => {
    setAnalyzingDefendant(defendant.id);
    
    try {
      const analysisText = `
        Analyze the legal and financial risk for: ${defendant.name}
        Category: ${defendant.category}
        Liability: ${formatCurrency(defendant.slaveryDerivedWealth)}
        Evidence: ${defendant.evidence}
        Status: ${defendant.status}
        Descendants Impacted: ${defendant.descendantsImpacted}
      `;
      
      const result = await analyzeSentiment(analysisText);
      
      const riskScore = Math.abs(result.score);
      const riskLevel = riskScore > 0.7 ? 'High' : riskScore > 0.4 ? 'Medium' : 'Low';
      
      setRiskAnalysis(prev => ({
        ...prev,
        [defendant.id]: {
          score: riskScore,
          level: riskLevel,
          analysis: result.sentiment,
          timestamp: result.timestamp
        }
      }));
    } catch (error) {
      console.error('Risk analysis failed:', error);
    } finally {
      setAnalyzingDefendant(null);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Defendant Database</h1>
              <p className="text-xl text-red-200">{defendants.length} Entities with Documented Slavery-Derived Wealth</p>
              <p className="text-sm text-amber-300 mt-2">Complete forensic audit with provable liability</p>
            </div>
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="h-5 w-5" />
              {showAIPanel ? 'Hide' : 'Show'} AI Panel
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Enhanced Search Panel */}
        {showAIPanel && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI-Powered Evidence Search</h2>
                <p className="text-sm text-gray-600">Using NVIDIA CLIP for multimodal liability search</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Search Query
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., 'Financial institutions with highest liability'"
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
                  />
                  <button
                    onClick={handleAISearch}
                    disabled={aiSearching || !searchTerm.trim()}
                    className={`px-6 py-2 rounded-md font-semibold text-white transition ${
                      aiSearching || !searchTerm.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {aiSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Searching...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        AI Search
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-600">Quick searches:</span>
                  {['Banking institutions', 'Universities', 'Insurance companies'].map((query) => (
                    <button
                      key={query}
                      onClick={() => {
                        setSearchTerm(query);
                        handleAISearch();
                      }}
                      className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI Capabilities
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Multimodal evidence search (text + images)</li>
                  <li>• Semantic similarity matching</li>
                  <li>• AI-powered risk scoring</li>
                  <li>• Evidence strength analysis</li>
                  <li>• Defendant liability ranking</li>
                </ul>
              </div>
            </div>

            {/* AI Search Results */}
            {aiSearchResults && (
              <div className="mt-6 bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">
                    AI Search Results ({aiSearchResults.totalResults} found)
                  </h3>
                  {aiSearchResults.isMock && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Demo Mode
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {aiSearchResults.results.map((result, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{result.name}</p>
                        <p className="text-xs text-gray-600">{result.category} • {result.liability}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Confidence</p>
                          <p className="font-bold text-purple-600">{(result.confidence * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Powered by {aiSearchResults.model} • Processed at {new Date(aiSearchResults.timestamp).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Standard Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline h-4 w-4 mr-1" />
                Search Defendants
              </label>
              <input
                type="text"
                placeholder="Search by name or country..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between bg-indigo-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Showing {filteredDefendants.length} defendants</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalLiability)} Total Liability</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition">
              Export Data
            </button>
          </div>
        </div>

        {/* Defendants List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredDefendants.map((defendant) => (
            <div key={defendant.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold">{defendant.name}</h2>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {defendant.country}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{defendant.category}</span>
                    <span>Founded: {defendant.founded}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-600">{formatCurrency(defendant.slaveryDerivedWealth)}</p>
                  <p className="text-sm text-gray-600 mb-2">{defendant.percentage}% of current wealth</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    defendant.status === 'Active Defendant' ? 'bg-red-100 text-red-800' :
                    defendant.status === 'Settlement Discussions' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {defendant.status}
                  </span>
                </div>
              </div>

              {/* AI Risk Analysis Section */}
              {riskAnalysis[defendant.id] && (
                <div className={`mb-4 p-4 rounded-lg border-2 ${getRiskColor(riskAnalysis[defendant.id].level)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-bold">AI Risk Assessment: {riskAnalysis[defendant.id].level}</span>
                    </div>
                    <span className="text-xs font-medium">
                      Score: {(riskAnalysis[defendant.id].score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm mt-2">{riskAnalysis[defendant.id].analysis}</p>
                  <p className="text-xs mt-2 opacity-75">
                    Analyzed at {new Date(riskAnalysis[defendant.id].timestamp).toLocaleTimeString()}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                      Evidence Summary
                    </h3>
                    <p className="text-sm text-gray-700">{defendant.evidence}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
                      Enforcement Strategy
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {defendant.filingJurisdictions.map((jurisdiction) => (
                        <span
                          key={jurisdiction}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {jurisdiction}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {defendant.descendantsImpacted.toLocaleString()} descendants impacted
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => setExpandedDefendant(expandedDefendant === defendant.id ? null : defendant.id)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold transition"
                >
                  {expandedDefendant === defendant.id ? 'Hide Evidence' : 'View Evidence & Chain of Guilt'}
                </button>
                <button 
                  onClick={() => analyzeDefendantRisk(defendant)}
                  disabled={analyzingDefendant === defendant.id}
                  className={`flex-1 px-4 py-2 rounded-md font-semibold transition flex items-center justify-center gap-2 ${
                    analyzingDefendant === defendant.id
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {analyzingDefendant === defendant.id ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      AI Risk Analysis
                    </>
                  )}
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold transition">
                  File Arbitration Claim
                </button>
              </div>

              {expandedDefendant === defendant.id && (
                <div className="mt-6">
                  <EvidenceExplorer defendant={defendant} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
