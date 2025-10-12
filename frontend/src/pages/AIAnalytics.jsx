import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Zap, Database, LineChart } from 'lucide-react';

export default function AIAnalytics() {
  const [activeModel, setActiveModel] = useState('predictive');

  const aiModels = [
    {
      id: 'predictive',
      name: 'Predictive Case Modeling',
      icon: TrendingUp,
      description: 'AI forecasts case success probability and optimal jurisdiction selection',
      accuracy: '94.2%',
      powered: 'NVIDIA AI Enterprise + TensorRT'
    },
    {
      id: 'evidence',
      name: 'Evidence Pattern Recognition',
      icon: Database,
      description: 'Deep learning identifies hidden connections in historical documents',
      accuracy: '89.7%',
      powered: 'NVIDIA NeMo + Triton Inference Server'
    },
    {
      id: 'optimization',
      name: 'Settlement Optimization',
      icon: Target,
      description: 'Neural networks calculate optimal settlement amounts and timing',
      accuracy: '91.5%',
      powered: 'NVIDIA cuDNN + RAPIDS'
    }
  ];

  const insights = [
    {
      title: "High-Value Target Identified",
      description: "AI model detected 3 previously unknown subsidiaries of Barclays with slavery ties",
      potential: "+$340M liability",
      confidence: "96%"
    },
    {
      title: "Optimal Filing Window",
      description: "Predictive model suggests filing claims in Q2 2025 for 23% higher success rate",
      potential: "Timing advantage",
      confidence: "92%"
    },
    {
      title: "Document Link Discovery",
      description: "Pattern recognition found causal chain: Lloyd's → 4 modern insurers",
      potential: "+$1.2B exposure",
      confidence: "88%"
    }
  ];

  const performanceMetrics = [
    { metric: "Claims Analyzed", value: "12,847", change: "+23%" },
    { metric: "Patterns Detected", value: "3,592", change: "+41%" },
    { metric: "GPU Hours Used", value: "48,291", change: "+18%" },
    { metric: "Model Accuracy", value: "92.1%", change: "+2.3%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-900 text-white py-12">
        <div className="container mx-auto px-4">
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
                    activeModel === model.id ? 'ring-2 ring-cyan-600' : 'hover:shadow-lg'
                  }`}
                >
                  <Icon className="h-10 w-10 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{model.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-bold text-green-600">{model.accuracy}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
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
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
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
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Potential Impact: {insight.potential}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <LineChart className="h-6 w-6" />
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Defendant Discovery:</strong> Identify hidden corporate successors</li>
              <li>• <strong>Evidence Correlation:</strong> Link documents across centuries</li>
              <li>• <strong>Liability Forecasting:</strong> Predict compound interest accurately</li>
              <li>• <strong>Jurisdiction Optimization:</strong> Select best courts for claims</li>
              <li>• <strong>Settlement Modeling:</strong> Calculate optimal negotiation terms</li>
            </ul>
          </div>
        </div>

        {/* GPU Infrastructure */}
        <div className="mt-6 bg-gradient-to-r from-green-900 to-cyan-900 text-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}
