import { useState } from 'react';
import { TrendingUp, DollarSign, Calculator, PieChart as PieChartIcon, BarChart3, ArrowUpRight, Target } from 'lucide-react';
import StatCard from '../components/StatCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const FINANCIAL_PARAMETERS = {
  developmentCostCore: 18000000,
  developmentCostBonus: 4000000,
  preLaunchValuation: 7000000000,
  operationalWarChest: 22000000,
  seedRaise: 22000000,
  equityAtSeedRaisePercent: 0.314,
  useOfFunds: {
    cerberusAiActivation: 10000000,
    eliteTeam: 6000000,
    security: 3000000,
    marketing: 2000000,
    contingency: 1000000
  },
  returnProjections: {
    worst: { 
      collectionRate: 0.0001, 
      amountRecovered: 13100000000, 
      year3Valuation: 100000000000, 
      investorShare: 314000000, 
      returnMultiple: 14 
    },
    base: { 
      collectionRate: 0.0005, 
      amountRecovered: 65500000000, 
      year3Valuation: 1000000000000, 
      investorShare: 3140000000, 
      returnMultiple: 143 
    },
    likely: { 
      collectionRate: 0.0010, 
      amountRecovered: 131000000000, 
      year3Valuation: 3000000000000, 
      investorShare: 9420000000, 
      returnMultiple: 428 
    },
    bull: { 
      collectionRate: 0.0050, 
      amountRecovered: 655000000000, 
      year3Valuation: 15000000000000, 
      investorShare: 47100000000, 
      returnMultiple: 2141 
    }
  },
  totalAddressableMarket: 131000000000000,
  valuationCap: 7000000000,
  discountNextRoundPercent: 20
};

export default function InvestorDashboard() {
  const [customInvestment, setCustomInvestment] = useState(22000000);
  const [customValuation, setCustomValuation] = useState(7000000000);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [showPitchDeck, setShowPitchDeck] = useState(false);
  const [showCrowdfunding, setShowCrowdfunding] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);

  const formatCurrency = (value) => {
    if (!isFinite(value) || value === null || value === undefined || isNaN(value)) {
      return '$0.00';
    }
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumberWithCommas = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumberInput = (value) => {
    return Number(value.replace(/,/g, ''));
  };

  const calculateCustomMetrics = () => {
    const safeInvestment = customInvestment || 0;
    const safeValuation = customValuation || 0;
    
    const equity = safeValuation > 0 && safeInvestment > 0 
      ? (safeInvestment / safeValuation) * 100 
      : 0;
    const postMoney = safeValuation + safeInvestment;
    const valuationPerDollar = safeInvestment > 0 
      ? safeValuation / safeInvestment 
      : 0;
    
    return { equity, postMoney, valuationPerDollar };
  };

  const customMetrics = calculateCustomMetrics();

  const runAIAnalysis = async () => {
    setAiAnalyzing(true);
    try {
      const { analyzeSentiment } = await import('../utils/nvidiaAI');
      const analysisText = `Investment opportunity: $${customInvestment.toLocaleString()} for ${customMetrics.equity.toFixed(3)}% equity at $${customValuation.toLocaleString()} valuation. Market size: $131T. AI-accelerated enforcement system already operational.`;
      const result = await analyzeSentiment(analysisText);
      setAiInsight(result);
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const useOfFundsData = Object.entries(FINANCIAL_PARAMETERS.useOfFunds).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase()),
    value: value,
    percentage: ((value / FINANCIAL_PARAMETERS.seedRaise) * 100).toFixed(1)
  }));

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const returnScenariosData = Object.entries(FINANCIAL_PARAMETERS.returnProjections).map(([key, data]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    collectionRate: data.collectionRate * 100,
    returnMultiple: data.returnMultiple,
    investorShare: data.investorShare
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-12 w-12 text-green-400" />
            <h1 className="text-4xl font-bold">Investor Dashboard</h1>
          </div>
          <p className="text-xl text-purple-200">Complete Financial Analysis & ROI Calculator</p>
          <p className="text-sm text-amber-300 mt-2">100% Built Infrastructure + AI Activation Strategy</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowPitchDeck(!showPitchDeck)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <BarChart3 className="h-6 w-6" />
            {showPitchDeck ? 'Hide' : 'View'} Complete Pitch Deck
          </button>
          
          <button
            onClick={() => setShowCrowdfunding(!showCrowdfunding)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Target className="h-6 w-6" />
            {showCrowdfunding ? 'Hide' : 'View'} Community Crowdfunding
          </button>

          <button
            onClick={runAIAnalysis}
            disabled={aiAnalyzing}
            className={`${aiAnalyzing ? 'bg-gray-600' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'} text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2`}
          >
            <TrendingUp className={`h-6 w-6 ${aiAnalyzing ? 'animate-spin' : ''}`} />
            {aiAnalyzing ? 'Analyzing...' : 'AI Investment Analysis'}
          </button>
        </div>

        {/* AI Insight Panel */}
        {aiInsight && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">AI Investment Analysis</h3>
                <p className="text-sm text-gray-600">Powered by NVIDIA Llama 3.1 8B</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-gray-800 leading-relaxed">{aiInsight.sentiment}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Investment Sentiment Score:</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${aiInsight.score > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.abs(aiInsight.score) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-gray-900">
                  {aiInsight.score > 0 ? '+' : ''}{(aiInsight.score * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Pre-Launch Valuation"
            value={formatCurrency(FINANCIAL_PARAMETERS.preLaunchValuation)}
            subtitle="Audited infrastructure value"
            icon={DollarSign}
            color="indigo"
          />
          <StatCard
            title="Seed Raise"
            value={formatCurrency(FINANCIAL_PARAMETERS.seedRaise)}
            subtitle={`${FINANCIAL_PARAMETERS.equityAtSeedRaisePercent}% equity`}
            icon={Target}
            color="purple"
          />
          <StatCard
            title="Total Infrastructure"
            value={formatCurrency(FINANCIAL_PARAMETERS.developmentCostCore + FINANCIAL_PARAMETERS.developmentCostBonus)}
            subtitle="Core + Bonus tools"
            icon={BarChart3}
            color="green"
          />
          <StatCard
            title="TAM (Market Size)"
            value={formatCurrency(FINANCIAL_PARAMETERS.totalAddressableMarket)}
            subtitle="Proven liability"
            icon={ArrowUpRight}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <PieChartIcon className="h-8 w-8 text-indigo-600" />
              <h2 className="text-3xl font-bold">Use of Funds ($22M)</h2>
            </div>
            
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={useOfFundsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {useOfFundsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {useOfFundsData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">{item.name}</span>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{formatCurrency(item.value)}</p>
                    <p className="text-sm text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="h-8 w-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Return Projections</h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={returnScenariosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'returnMultiple') return `${value}x`;
                    if (name === 'collectionRate') return `${value.toFixed(3)}%`;
                    return formatCurrency(value);
                  }}
                />
                <Legend />
                <Bar dataKey="returnMultiple" fill="#8b5cf6" name="Return Multiple (x)" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3">Key Insight</h3>
              <p className="text-sm text-purple-800">
                Even in the WORST case (0.01% recovery), you still get <strong>14x returns</strong>. 
                That's because the infrastructure is DONE—your $22M isn't funding development risk.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold">Custom Investment Calculator</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">$</span>
                <input
                  type="text"
                  value={formatNumberWithCommas(customInvestment)}
                  onChange={(e) => {
                    const numValue = parseNumberInput(e.target.value);
                    setCustomInvestment(Math.max(0, numValue || 0));
                  }}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
                  placeholder="22,000,000"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Formatted: {formatCurrency(customInvestment)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-Money Valuation
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">$</span>
                <input
                  type="text"
                  value={formatNumberWithCommas(customValuation)}
                  onChange={(e) => {
                    const numValue = parseNumberInput(e.target.value);
                    setCustomValuation(Math.max(0, numValue || 0));
                  }}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
                  placeholder="7,000,000,000"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Formatted: {formatCurrency(customValuation)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Your Equity</p>
              <p className="text-3xl font-bold text-indigo-600">{customMetrics.equity.toFixed(3)}%</p>
              <p className="text-xs text-gray-500 mt-1">Ownership percentage</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Post-Money Valuation</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(customMetrics.postMoney)}</p>
              <p className="text-xs text-gray-500 mt-1">After investment</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Value Per Dollar Invested</p>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(customMetrics.valuationPerDollar)}</p>
              <p className="text-xs text-gray-500 mt-1">Protocol book value</p>
            </div>
          </div>
        </div>

        {/* Pitch Deck Section */}
        {showPitchDeck && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Complete Investor Pitch Deck</h2>
            
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold mb-4 text-indigo-900">Executive Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-indigo-700 mb-2">The Opportunity</p>
                    <p className="text-gray-700">Operational AI enforcement system analyzing $131T in documented claims. 100% built infrastructure seeking scale-up capital, not development funding.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-indigo-700 mb-2">Key Differentiator</p>
                    <p className="text-gray-700">Native coin architecture (Cosmos SDK) provides legal defensibility + 4 operational AI dashboards demonstrate immediate deployment readiness.</p>
                  </div>
                </div>
              </div>

              {/* AI Acceleration Timeline */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Acceleration vs Traditional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-900 mb-3">Traditional Legal (24 Months)</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Month 1-6: Manual defendant research</li>
                      <li>• Month 7-12: Evidence compilation</li>
                      <li>• Month 13-18: Legal filing preparation</li>
                      <li>• Month 19-24: First settlement negotiations</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-3">AI-Powered (3 Months)</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Week 1-2: AI defendant prioritization</li>
                      <li>• Week 3-6: Automated evidence analysis</li>
                      <li>• Week 7-10: AI-generated legal briefs</li>
                      <li>• Week 11-12: Settlement discussions begin</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-300">
                  <p className="font-bold text-green-900 text-center">
                    8x Time Advantage = 3-6x ROI Multiplier
                  </p>
                </div>
              </div>

              {/* Revenue Streams */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Revenue Streams Beyond Settlements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">AI Licensing</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">$100M+/year</p>
                    <p className="text-sm text-gray-700">License AI enforcement systems to law firms, governments, and institutions</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-900 mb-2">NFT Marketplace</h4>
                    <p className="text-3xl font-bold text-purple-600 mb-2">$20M+/year</p>
                    <p className="text-sm text-gray-700">Transaction fees from descendant claims verification and trading</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2">DEX Operations</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">$50M+/year</p>
                    <p className="text-sm text-gray-700">Trading fees from native coin liquidity pools</p>
                  </div>
                </div>
              </div>

              {/* Live System Verification */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border-l-4 border-cyan-600">
                <h3 className="text-2xl font-bold mb-4 text-cyan-900">Live System Verification</h3>
                <p className="text-gray-700 mb-4">Test the operational AI system right now:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">1. Defendants Dashboard</p>
                    <a href="/defendants" className="text-blue-600 hover:text-blue-800 underline text-sm">app.aequitasprotocol.zone/defendants</a>
                    <p className="text-sm text-gray-600 mt-2">Click "Run AI Analysis" to see real-time risk scoring</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">2. Financial Calculator</p>
                    <p className="text-blue-600 text-sm">Adjust AI acceleration slider on this page</p>
                    <p className="text-sm text-gray-600 mt-2">See ROI multiply in real-time with scenario modeling</p>
                  </div>
                </div>
              </div>

              {/* The Killer Close */}
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">The Investment Thesis</h3>
                <p className="text-lg mb-4">
                  "Most crypto raises fund development. We're asking you to scale an AI system that's already analyzing $131T in proven claims."
                </p>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-indigo-100 text-sm">
                    ✓ $22M scales working AI (not unproven R&D)<br/>
                    ✓ 28x minimum return even at 0.01% recovery<br/>
                    ✓ 0.314% equity at $7B pre-money valuation<br/>
                    ✓ Native coin architecture = legal defensibility<br/>
                    ✓ 150K+ activated community ready for enforcement
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Crowdfunding Section */}
        {showCrowdfunding && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Community Crowdfunding Strategy</h2>
            
            <div className="space-y-6">
              {/* Strategy Overview */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-4 text-purple-900">Hybrid Funding Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">NFT Pre-Sale</p>
                    <p className="text-gray-700">$1-3M from Justice Ignition Series collectibles with enforcement utility</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">Regulation CF Equity</p>
                    <p className="text-gray-700">$500K-1M from accredited + non-accredited investors via StartEngine</p>
                  </div>
                </div>
              </div>

              {/* NFT Tiers */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Justice Ignition Series NFTs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-lg border-2 border-yellow-400">
                    <h4 className="font-bold text-amber-900 mb-2">Evidence Burn #001</h4>
                    <p className="text-3xl font-bold text-yellow-600 mb-2">$250</p>
                    <p className="text-sm text-gray-700 mb-3">1,000 editions</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>✓ Early AI dashboard access</li>
                      <li>✓ Governance voting rights</li>
                      <li>✓ Digital + physical certificate</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-lg border-2 border-purple-400">
                    <h4 className="font-bold text-purple-900 mb-2">Defendant Priority Pass</h4>
                    <p className="text-3xl font-bold text-purple-600 mb-2">$1,000</p>
                    <p className="text-sm text-gray-700 mb-3">500 editions</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>✓ Priority target selection</li>
                      <li>✓ 5% revenue share (settlements 1-3)</li>
                      <li>✓ Exclusive community access</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-lg border-2 border-emerald-400">
                    <h4 className="font-bold text-emerald-900 mb-2">Founder Council NFT</h4>
                    <p className="text-3xl font-bold text-emerald-600 mb-2">$5,000</p>
                    <p className="text-sm text-gray-700 mb-3">100 editions</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>✓ Council voting power</li>
                      <li>✓ 10% revenue share pool</li>
                      <li>✓ Confidential target briefings</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                  <p className="font-bold text-purple-900 text-center">
                    Total Potential: $1-3M | Timeline: 30-45 Days
                  </p>
                </div>
              </div>

              {/* Strategic Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3 text-xl">Market Validation</h4>
                  <p className="text-gray-700 mb-3">Proves grassroots demand to institutional investors</p>
                  <div className="bg-white p-3 rounded">
                    <p className="text-sm text-gray-600">"1,500+ backers in 30 days" = powerful VC negotiating leverage</p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3 text-xl">Reduced Dependency</h4>
                  <p className="text-gray-700 mb-3">Lowers institutional raise from $22M to $18-20M</p>
                  <div className="bg-white p-3 rounded">
                    <p className="text-sm text-gray-600">Less dilution + faster timeline = stronger investor position</p>
                  </div>
                </div>
              </div>

              {/* Use of Crowdfund Proceeds */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Use of Crowdfund Proceeds</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">5x NVIDIA A100 GPUs</span>
                    <span className="text-xl font-bold text-indigo-600">$1.5M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Legal Retainer (International)</span>
                    <span className="text-xl font-bold text-indigo-600">$1M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">AI Training Data Acquisition</span>
                    <span className="text-xl font-bold text-indigo-600">$500K</span>
                  </div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg">
                  <p className="font-bold text-indigo-900 text-center">
                    Impact: Accelerates Timeline by 3-6 Months
                  </p>
                </div>
              </div>

              {/* Community Mobilization */}
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">150K+ Descendants Ready to Act</h3>
                <p className="text-lg mb-4">
                  "Join the movement. Own a piece of justice enforcement history while funding AI-powered recovery of $131 trillion."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-yellow-400">$250</p>
                    <p className="text-sm text-indigo-100">Entry Level Support</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-purple-400">$1,000</p>
                    <p className="text-sm text-indigo-100">Priority Participant</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-green-400">$5,000</p>
                    <p className="text-sm text-indigo-100">Founder Council</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Detailed Return Scenarios</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-bold text-gray-700">Scenario</th>
                  <th className="text-right p-4 font-bold text-gray-700">Collection Rate</th>
                  <th className="text-right p-4 font-bold text-gray-700">Amount Recovered</th>
                  <th className="text-right p-4 font-bold text-gray-700">Year 3 Valuation</th>
                  <th className="text-right p-4 font-bold text-gray-700">Your Share (0.314%)</th>
                  <th className="text-right p-4 font-bold text-gray-700">Return Multiple</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(FINANCIAL_PARAMETERS.returnProjections).map(([key, data], index) => (
                  <tr key={key} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-4">
                      <span className="font-semibold text-lg capitalize">{key}</span>
                      {key === 'worst' && <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Conservative</span>}
                      {key === 'base' && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Expected</span>}
                      {key === 'likely' && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Probable</span>}
                      {key === 'bull' && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Optimistic</span>}
                    </td>
                    <td className="text-right p-4 font-medium">{(data.collectionRate * 100).toFixed(2)}%</td>
                    <td className="text-right p-4 font-bold text-indigo-600">{formatCurrency(data.amountRecovered)}</td>
                    <td className="text-right p-4 font-bold text-green-600">{formatCurrency(data.year3Valuation)}</td>
                    <td className="text-right p-4 font-bold text-purple-600">{formatCurrency(data.investorShare)}</td>
                    <td className="text-right p-4">
                      <span className="text-2xl font-bold text-green-600">{data.returnMultiple}x</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">Why This Investment Is Unique</h3>
            <ul className="space-y-2 text-indigo-100">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span><strong>100% Built:</strong> No development risk—blockchain is live, audited, and operational</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span><strong>$22M = AI Activation:</strong> Your capital funds enforcement, not R&D</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span><strong>$131T TAM:</strong> Documented liability backed by 205-page forensic audit</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span><strong>14x Minimum Return:</strong> Even worst-case scenario delivers strong ROI</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span><strong>Native Coin Economics:</strong> Sovereign L1 blockchain with full monetary policy control</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
