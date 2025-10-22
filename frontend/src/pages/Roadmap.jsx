import { useState } from 'react';
import { CheckCircle, Circle, Clock, Brain, TrendingUp, Shield, Zap, Globe, Rocket } from 'lucide-react';

export default function Roadmap() {
  const [selectedPhase, setSelectedPhase] = useState('phase1');

  const phases = [
    {
      id: 'phase1',
      name: 'Phase 1: Foundation',
      period: 'Q4 2025',
      status: 'in-progress',
      progress: 85,
      icon: Rocket,
      color: 'blue',
      items: [
        { text: 'Circle SDK Integration Complete (USDC payments)', status: 'completed' },
        { text: 'Coinbase Commerce Integration Ready', status: 'completed' },
        { text: 'Backend API Security Infrastructure Deployed', status: 'completed' },
        { text: 'All API Keys & Secrets Configured', status: 'completed' },
        { text: 'Block Explorer Integration (Dexplorer)', status: 'completed' },
        { text: 'Comprehensive Frontend Financial Dashboards', status: 'completed' },
        { text: 'Domain Migration to aequitasprotocol.zone', status: 'completed' },
        { text: 'Cloudflare DNS Setup for 24 Subdomains', status: 'completed' },
        { text: 'Testnet Launch & IFR Validator Onboarding', status: 'in-progress' },
        { text: 'Security Audits (Quantstamp, Informal Systems)', status: 'in-progress' },
      ]
    },
    {
      id: 'phase2',
      name: 'Phase 2: AI Integration',
      period: 'Q1 2026',
      status: 'planned',
      progress: 0,
      icon: Brain,
      color: 'purple',
      items: [
        { text: 'AI-Powered Dashboard Analytics (All Pages)', status: 'planned' },
        { text: 'Endowment Trading Optimizer (Smart Contract Logic)', status: 'planned' },
        { text: 'Real-time Market Monitoring & Alerts', status: 'planned' },
        { text: 'Predictive Yield Analysis for LP Endowment', status: 'planned' },
        { text: 'Automated Portfolio Rebalancing Recommendations', status: 'planned' },
        { text: 'Risk Assessment Engine for Endowment Strategies', status: 'planned' },
        { text: 'AI-Driven Threat Detection (Chaos Defense)', status: 'planned' },
        { text: 'Natural Language Query Interface for Analytics', status: 'planned' },
        { text: 'Automated Compliance Monitoring (FRE 901)', status: 'planned' },
        { text: 'Machine Learning Models for Defendant Payment Prediction', status: 'planned' },
      ]
    },
    {
      id: 'phase3',
      name: 'Phase 3: Enforcement',
      period: 'Q2 2026',
      status: 'planned',
      progress: 0,
      icon: Shield,
      color: 'green',
      items: [
        { text: '$REPAR LBP & Mainnet Launch', status: 'planned' },
        { text: 'First Real-World Arbitration Cases Filed', status: 'planned' },
        { text: 'Barclays, Lloyd\'s, JPMorgan Initial Filings', status: 'planned' },
        { text: 'AI-Optimized Legal Strategy Recommendations', status: 'planned' },
        { text: 'Automated Evidence Aggregation from IPFS', status: 'planned' },
        { text: 'Smart Contract Execution for Justice Burn', status: 'planned' },
        { text: 'Cross-Chain Asset Tracking (IBC Integration)', status: 'planned' },
      ]
    },
    {
      id: 'phase4',
      name: 'Phase 4: Scale',
      period: 'Q3-Q4 2026',
      status: 'planned',
      progress: 0,
      icon: TrendingUp,
      color: 'orange',
      items: [
        { text: 'NVIDIA AI Module Full Integration (NeMo, NIM)', status: 'planned' },
        { text: 'DAO Governance Launch with AI-Assisted Voting', status: 'planned' },
        { text: 'First Asset Seizures & Distributions', status: 'planned' },
        { text: 'Mobile App Deployment (iOS/Android)', status: 'planned' },
        { text: 'AI-Powered Descendant Verification System', status: 'planned' },
        { text: 'Automated Reparations Distribution Logic', status: 'planned' },
        { text: 'Multi-Language Support (AI Translation)', status: 'planned' },
        { text: 'Advanced Analytics Dashboard with Predictive Modeling', status: 'planned' },
      ]
    },
    {
      id: 'phase5',
      name: 'Phase 5: Sovereignty',
      period: '2027+',
      status: 'future',
      progress: 0,
      icon: Globe,
      color: 'indigo',
      items: [
        { text: '$REPAR as Diaspora Reserve Currency', status: 'future' },
        { text: 'Full Descendant Governance Transition', status: 'future' },
        { text: '$1.00+ Price Parity Achievement', status: 'future' },
        { text: 'AI-Managed Treasury Operations', status: 'future' },
        { text: 'Quantum-Resistant Security Upgrades', status: 'future' },
        { text: 'Global Ecosystem Expansion (172 Jurisdictions)', status: 'future' },
        { text: 'Fully Autonomous Justice Enforcement', status: 'future' },
      ]
    }
  ];

  const aiIntegrationFocus = [
    {
      title: 'Endowment Trading Optimizer',
      description: 'Smart contract logic to automatically maximize profits from the $7.86T Founder Endowment and other endowment pools.',
      features: [
        'Real-time market analysis across DEX pools',
        'Optimal entry/exit point detection using ML models',
        'Risk-adjusted return maximization',
        'Automated rebalancing based on market conditions',
        'Yield farming strategy optimization',
        'Gas fee optimization for trades'
      ],
      priority: 'critical',
      icon: TrendingUp
    },
    {
      title: 'Dashboard Analytics AI',
      description: 'Add AI-powered insights, predictions, and monitoring to every dashboard (Economics, Endowments, DEX, Validators, etc.)',
      features: [
        'Predictive analytics for $REPAR price movements',
        'Anomaly detection in transaction patterns',
        'Smart alerts for critical events',
        'Natural language insights generation',
        'Automated report generation',
        'Comparative analysis across time periods'
      ],
      priority: 'high',
      icon: Brain
    },
    {
      title: 'Automated Risk Management',
      description: 'AI-driven risk assessment and mitigation for endowment strategies and protocol security.',
      features: [
        'Portfolio risk scoring and alerts',
        'Market volatility prediction',
        'Smart contract vulnerability detection',
        'Compliance monitoring and reporting',
        'Threat detection and response automation',
        'Liquidity risk analysis'
      ],
      priority: 'high',
      icon: Shield
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400 animate-pulse" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPhaseColor = (color) => {
    const colors = {
      blue: 'from-blue-600 to-blue-800',
      purple: 'from-purple-600 to-purple-800',
      green: 'from-green-600 to-green-800',
      orange: 'from-orange-600 to-orange-800',
      indigo: 'from-indigo-600 to-indigo-800'
    };
    return colors[color] || colors.blue;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      critical: 'bg-red-500/20 text-red-300 border-red-500/50',
      high: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
    };
    return badges[priority] || badges.medium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Rocket className="w-12 h-12 text-purple-400" />
            Aequitas Protocol Roadmap
          </h1>
          <p className="text-xl text-gray-300">
            From Foundation to Global Sovereignty - The Path to $131 Trillion in Justice
          </p>
        </div>

        {/* Phase Timeline */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    selectedPhase === phase.id
                      ? 'border-white bg-white/10 scale-105'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${selectedPhase === phase.id ? 'text-white' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-sm mb-1">{phase.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{phase.period}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getPhaseColor(phase.color)} transition-all`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{phase.progress}%</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Details */}
        {phases.map((phase) => {
          if (phase.id !== selectedPhase) return null;
          const Icon = phase.icon;
          
          return (
            <div key={phase.id} className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Icon className="w-12 h-12 text-purple-400" />
                <div>
                  <h2 className="text-3xl font-bold">{phase.name}</h2>
                  <p className="text-gray-400">{phase.period}</p>
                </div>
              </div>

              <div className="space-y-3">
                {phase.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-black/20 rounded-lg hover:bg-black/30 transition"
                  >
                    {getStatusIcon(item.status)}
                    <span className={item.status === 'completed' ? 'text-white' : 'text-gray-300'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* AI Integration Focus Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-10 h-10 text-purple-400" />
              <div>
                <h2 className="text-3xl font-bold">Phase 2 Deep Dive: AI Integration</h2>
                <p className="text-gray-300">Intelligent automation across all dashboards and endowment management</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aiIntegrationFocus.map((focus, idx) => {
                const FocusIcon = focus.icon;
                return (
                  <div key={idx} className="bg-black/40 border border-purple-400/20 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <FocusIcon className="w-8 h-8 text-purple-400" />
                      <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityBadge(focus.priority)}`}>
                        {focus.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{focus.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{focus.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-purple-300 mb-2">Key Features:</p>
                      {focus.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <Zap className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span className="text-xs text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-400/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Globe className="w-10 h-10 text-indigo-400" />
            The Vision: Fully Autonomous Justice
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            By 2027+, the Aequitas Protocol will operate as a fully autonomous justice enforcement machine, 
            powered by AI, governed by descendants, and backed by the full force of international law.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-indigo-300">AI-Managed Operations</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Automated treasury management and yield optimization</li>
                <li>• Self-executing legal enforcement actions</li>
                <li>• Predictive analytics for defendant compliance</li>
                <li>• Autonomous threat detection and response</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-purple-300">Global Impact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• $REPAR as primary diaspora reserve currency</li>
                <li>• 172 jurisdiction coverage for enforcement</li>
                <li>• Millions of descendants receiving reparations</li>
                <li>• Full economic sovereignty achieved</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
