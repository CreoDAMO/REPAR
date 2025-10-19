import React, { useState, useEffect, useRef } from 'react';
import { Brain, TrendingUp, Target, Zap, Database, LineChart, Upload, Play, Download, Settings, Eye, Globe, Cpu, Activity } from 'lucide-react';
import OracleQuery from '../components/ai/OracleQuery';
import WarRoomVisualization from '../components/ai/WarRoomVisualization';

export default function AIAnalytics() {
  const [activeModel, setActiveModel] = useState('predictive');
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [selectedDefendant, setSelectedDefendant] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [holographicView, setHolographicView] = useState(false);

  const aiModels = [
    {
      id: 'predictive',
      name: 'Predictive Case Modeling',
      icon: TrendingUp,
      description: 'AI forecasts case success probability and optimal jurisdiction selection',
      accuracy: '94.2%',
      powered: 'NVIDIA AI Enterprise + TensorRT',
      capabilities: ['Success Probability', 'Jurisdiction Optimization', 'Timeline Prediction']
    },
    {
      id: 'evidence',
      name: 'Evidence Pattern Recognition',
      icon: Database,
      description: 'Deep learning identifies hidden connections in historical documents',
      accuracy: '89.7%',
      powered: 'NVIDIA NeMo + Triton Inference Server',
      capabilities: ['Document Analysis', 'Entity Linking', 'Corporate Succession Tracing']
    },
    {
      id: 'optimization',
      name: 'Settlement Optimization',
      icon: Target,
      description: 'Neural networks calculate optimal settlement amounts and timing',
      accuracy: '91.5%',
      powered: 'NVIDIA cuDNN + RAPIDS',
      capabilities: ['Amount Calculation', 'Timing Strategy', 'Negotiation Tactics']
    }
  ];

  const defendants = [
    'Barclays PLC',
    'Lloyd\'s of London',
    'Bank of America',
    'JPMorgan Chase',
    'Wells Fargo',
    'Aetna Inc.',
    'Deutsche Bank'
  ];

  const insights = [
    {
      title: "High-Value Target Identified",
      description: "AI model detected 3 previously unknown subsidiaries of Barclays with slavery ties",
      potential: "+$340M liability",
      confidence: "96%",
      action: "Review Evidence"
    },
    {
      title: "Optimal Filing Window",
      description: "Predictive model suggests filing claims in Q2 2025 for 23% higher success rate",
      potential: "Timing advantage",
      confidence: "92%",
      action: "View Timeline"
    },
    {
      title: "Document Link Discovery",
      description: "Pattern recognition found causal chain: Lloyd's → 4 modern insurers",
      potential: "+$1.2B exposure",
      confidence: "88%",
      action: "Explore Network"
    }
  ];

  const performanceMetrics = [
    { metric: "Claims Analyzed", value: "12,847", change: "+23%" },
    { metric: "Patterns Detected", value: "3,592", change: "+41%" },
    { metric: "GPU Hours Used", value: "48,291", change: "+18%" },
    { metric: "Model Accuracy", value: "92.1%", change: "+2.3%" }
  ];

  const handleRunSimulation = () => {
    if (!selectedDefendant) {
      alert('Please select a defendant first');
      return;
    }

    setIsRunningSimulation(true);
    setSimulationProgress(0);
    setPredictionResult(null);

    // Simulate AI processing
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningSimulation(false);
          
          // Generate mock prediction
          const successRate = Math.floor(Math.random() * 20) + 75;
          const estimatedSettlement = (Math.random() * 500 + 200).toFixed(1);
          const optimalJurisdiction = ['New York', 'California', 'UK High Court', 'ICC'][Math.floor(Math.random() * 4)];
          
          setPredictionResult({
            defendant: selectedDefendant,
            successProbability: successRate,
            estimatedSettlement: `$${estimatedSettlement}M`,
            optimalJurisdiction,
            recommendedFilingDate: 'Q2 2025',
            keyEvidence: Math.floor(Math.random() * 50) + 30,
            riskFactors: ['Statute of Limitations', 'Sovereign Immunity', 'Corporate Veil']
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      alert(`Document uploaded: ${file.name}\n\nNVIDIA NeMo is analyzing the document for:\n• Entity extraction\n• Historical connections\n• Legal precedents\n• Corporate successors\n\nAnalysis will complete in ~45 seconds.`);
    }
  };

  const handleExportResults = () => {
    const data = predictionResult || { message: 'Run a simulation first' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-prediction-results.json';
    a.click();
  };

  const canvasRef = useRef(null);
  const [aiProcessingMetrics, setAiProcessingMetrics] = useState({
    gpuUtilization: 0,
    inferenceSpeed: 0,
    modelsActive: 0,
    neuralNetworkDepth: 0
  });

  useEffect(() => {
    if (holographicView && canvasRef.current) {
      // Simulate real-time AI metrics
      const metricsInterval = setInterval(() => {
        setAiProcessingMetrics({
          gpuUtilization: Math.floor(Math.random() * 30) + 70,
          inferenceSpeed: (Math.random() * 100 + 400).toFixed(1),
          modelsActive: Math.floor(Math.random() * 3) + 5,
          neuralNetworkDepth: Math.floor(Math.random() * 20) + 180
        });
      }, 2000);

      return () => clearInterval(metricsInterval);
    }
  }, [holographicView]);

  const toggleHolographicView = () => {
    setHolographicView(!holographicView);
  };

  const ActiveModelIcon = aiModels.find(m => m.id === activeModel)?.icon || Brain;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Brain className="h-12 w-12 text-cyan-400" />
                <div>
                  <h1 className="text-4xl font-bold">AI Analytics Dashboard</h1>
                  <p className="text-xl text-cyan-200">NVIDIA-Powered Forensic Intelligence</p>
                </div>
              </div>
              <p className="text-sm text-cyan-300 mt-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Powered by NVIDIA AI Enterprise, TensorRT, and RAPIDS ML
              </p>
            </div>
            <button
              onClick={toggleHolographicView}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                holographicView 
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Globe className="h-5 w-5" />
              {holographicView ? 'Holographic Mode Active' : 'Enable Holographic View'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">{item.metric}</p>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-green-600 font-semibold mt-1">{item.change}</p>
            </div>
          ))}
        </div>

        {/* Interactive Simulation Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Play className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">Run AI Simulation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Defendant</label>
              <select
                value={selectedDefendant}
                onChange={(e) => setSelectedDefendant(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose a defendant...</option>
                {defendants.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">AI Model</label>
              <select
                value={activeModel}
                onChange={(e) => setActiveModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {aiModels.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Evidence (Optional)</label>
              <label className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Upload className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {uploadedFile ? uploadedFile.name : 'Upload Document'}
                </span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isRunningSimulation}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Play className="h-5 w-5" />
              {isRunningSimulation ? 'Running Simulation...' : 'Run Prediction'}
            </button>
            {predictionResult && (
              <button
                onClick={handleExportResults}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <Download className="h-5 w-5" />
                Export Results
              </button>
            )}
          </div>

          {isRunningSimulation && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Processing with NVIDIA TensorRT...</span>
                <span className="text-sm font-bold text-blue-600">{simulationProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${simulationProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Prediction Results */}
        {predictionResult && (
          <div className="bg-white border-2 border-green-300 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-green-900">AI Prediction Results</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Success Probability</p>
                <p className="text-3xl font-bold text-green-600">{predictionResult.successProbability}%</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Est. Settlement</p>
                <p className="text-3xl font-bold text-blue-600">{predictionResult.estimatedSettlement}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Optimal Jurisdiction</p>
                <p className="text-xl font-bold text-purple-600">{predictionResult.optimalJurisdiction}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Key Evidence Found</p>
                <p className="text-3xl font-bold text-amber-600">{predictionResult.keyEvidence}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">Recommended Action Plan</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Filing Date:</strong> {predictionResult.recommendedFilingDate}</li>
                <li>• <strong>Defendant:</strong> {predictionResult.defendant}</li>
                <li>• <strong>Risk Factors:</strong> {predictionResult.riskFactors.join(', ')}</li>
              </ul>
            </div>
          </div>
        )}

        {/* AI Models */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">AI Model Suite</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiModels.map((model) => {
              const Icon = model.icon;
              return (
                <div 
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                    activeModel === model.id ? 'ring-2 ring-cyan-600 shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  <Icon className="h-10 w-10 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{model.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-bold text-green-600">{model.accuracy}</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Capabilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((cap, idx) => (
                        <span key={idx} className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-cyan-600 font-semibold">{model.powered}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent AI Insights</h2>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-700">{insight.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="block text-sm text-gray-600">Confidence</span>
                    <span className="text-2xl font-bold text-cyan-600">{insight.confidence}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      Potential Impact: {insight.potential}
                    </span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                    {insight.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Oracle Query */}
        <div className="mb-8">
          <OracleQuery />
        </div>

        {/* Interactive War Room */}
        <div className="mb-8">
          <WarRoomVisualization />
        </div>

        {/* Technical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center gap-2">
              <Brain className="h-6 w-6" />
              NVIDIA AI Stack
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>TensorRT:</strong> High-performance deep learning inference</li>
              <li>• <strong>RAPIDS:</strong> GPU-accelerated data science pipelines</li>
              <li>• <strong>NeMo:</strong> Conversational AI and NLP models</li>
              <li>• <strong>Triton:</strong> Multi-framework inference serving</li>
              <li>• <strong>cuDNN:</strong> Deep neural network optimization</li>
              <li>• <strong>Omniverse:</strong> 3D holographic visualization platform</li>
              <li>• <strong>Maxine:</strong> Real-time avatar animation and AR effects</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <LineChart className="h-6 w-6" />
              Interactive Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Defendant Discovery:</strong> Identify hidden corporate successors</li>
              <li>• <strong>Evidence Correlation:</strong> Link documents across centuries</li>
              <li>• <strong>Liability Forecasting:</strong> Predict compound interest accurately</li>
              <li>• <strong>Jurisdiction Optimization:</strong> Select best courts for claims</li>
              <li>• <strong>Settlement Modeling:</strong> Calculate optimal negotiation terms</li>
              <li>• <strong>Holographic Witnesses:</strong> Interactive AI avatars (NeMo + Maxine)</li>
              <li>• <strong>War Room Visualization:</strong> Real-time 3D data in Omniverse</li>
            </ul>
          </div>
        </div>

        {/* Holographic Platform Active */}
        {holographicView && (
          <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 text-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-cyan-400 animate-pulse" />
                <h3 className="text-2xl font-bold">Holographic Justice Intelligence Platform - ACTIVE</h3>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-400/50">
                <Activity className="h-5 w-5 text-green-400 animate-pulse" />
                <span className="text-green-300 font-semibold">LIVE</span>
              </div>
            </div>
            
            {/* Real-time AI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                  <p className="text-cyan-300 text-sm">GPU Utilization</p>
                </div>
                <p className="text-2xl font-bold text-white">{aiProcessingMetrics.gpuUtilization}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${aiProcessingMetrics.gpuUtilization}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <p className="text-cyan-300 text-sm">Inference Speed</p>
                </div>
                <p className="text-2xl font-bold text-white">{aiProcessingMetrics.inferenceSpeed} TFLOPS</p>
                <p className="text-xs text-cyan-200 mt-1">TensorRT Optimized</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-cyan-300 text-sm">Active Models</p>
                </div>
                <p className="text-2xl font-bold text-white">{aiProcessingMetrics.modelsActive}</p>
                <p className="text-xs text-cyan-200 mt-1">NVIDIA NeMo + RAPIDS</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-green-400" />
                  <p className="text-cyan-300 text-sm">Network Depth</p>
                </div>
                <p className="text-2xl font-bold text-white">{aiProcessingMetrics.neuralNetworkDepth}</p>
                <p className="text-xs text-cyan-200 mt-1">Layers Active</p>
              </div>
            </div>

            {/* 3D Visualization Canvas */}
            <div className="relative bg-black/50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <canvas 
                ref={canvasRef}
                className="w-full h-full"
                style={{ 
                  background: 'radial-gradient(ellipse at center, rgba(0,150,255,0.1) 0%, rgba(0,0,0,0.9) 100%)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Globe className="h-24 w-24 text-cyan-400 mx-auto mb-4 animate-spin" style={{ animationDuration: '8s' }} />
                  <p className="text-2xl font-bold text-cyan-300 mb-2">3D Corporate Network Visualization</p>
                  <p className="text-cyan-400">Real-time Blockchain Data Integration</p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-green-300">247 Defendants Tracked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-sm text-yellow-300">$131T Liability Mapped</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                      <span className="text-sm text-purple-300">IBC Cross-Chain Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
              <div className="bg-white/5 p-3 rounded">
                <p className="text-cyan-300 mb-1 font-semibold">Omniverse SDK</p>
                <p className="text-white">3D War Room with live blockchain data rendering</p>
              </div>
              <div className="bg-white/5 p-3 rounded">
                <p className="text-cyan-300 mb-1 font-semibold">Riva + Maxine SDK</p>
                <p className="text-white">AI-powered conversational interfaces</p>
              </div>
              <div className="bg-white/5 p-3 rounded">
                <p className="text-cyan-300 mb-1 font-semibold">Morpheus Framework</p>
                <p className="text-white">Real-time threat detection & cybersecurity</p>
              </div>
            </div>
          </div>
        )}

        {/* GPU Infrastructure */}
        <div className="bg-gradient-to-r from-green-900 to-cyan-900 text-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-cyan-300 mb-1">GPU Cluster</p>
              <p className="font-semibold">16x NVIDIA A100 (80GB)</p>
            </div>
            <div>
              <p className="text-cyan-300 mb-1">Training Speed</p>
              <p className="font-semibold">~420 TFLOPS per GPU</p>
            </div>
            <div>
              <p className="text-cyan-300 mb-1">Model Update Frequency</p>
              <p className="font-semibold">Real-time (streaming inference)</p>
            </div>
            <div>
              <p className="text-cyan-300 mb-1">API Endpoints</p>
              <p className="font-semibold">gRPC + REST available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
