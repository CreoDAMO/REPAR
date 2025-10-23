import { useState, useEffect } from 'react';
import { TrendingUp, Lock, DollarSign, PieChart, Wallet, BarChart3, Brain, Sparkles, Activity, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import { analyzeSentiment } from '../utils/nvidiaAI';

export default function FounderEndowment() {
  const [endowment, setEndowment] = useState({
    principal: 7860000000000, // 6% of 131T = 7.86T REPAR (Founder Endowment from 8% dev fund)
    founderVested: 11790000000000, // 9% of 131T = 11.79T REPAR (vested over 4 years)
    founderDiscretionary: 1310000000000, // 1% of 131T = 1.31T REPAR (founder discretionary)
    devDiscretionary: 2620000000000, // 2% of 131T = 2.62T REPAR (dev fund discretionary)
    discretionary: 3930000000000, // 3% total discretionary (1% founder + 2% dev)
    renewalBonus: 7860000000000, // 6% of 131T = 7.86T REPAR (renewal bonus after 8 years)
    totalControl: 23580000000000, // 18% total = 23.58T REPAR
    targetAPY: 4.5,
    yieldAccumulated: 0,
    unlockYear: 8, // 8-year renewal period
    isLocked: true,
    renewalCount: 0
  });

  const [projectedYields, setProjectedYields] = useState({
    annualYield: 0,
    quarterlyYield: 0,
    founderAnnualDividend: 0,
    protocolAnnualFunding: 0
  });

  const [distributions, setDistributions] = useState([]);

  const [aiInsights, setAiInsights] = useState({
    protocolHealth: null,
    scenarioAnalysis: null,
    sustainabilityScore: null
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  useEffect(() => {
    // Calculate projected yields
    const annualYield = endowment.principal * (endowment.targetAPY / 100);
    const quarterlyYield = annualYield / 4;
    const founderAnnualDividend = annualYield * 0.10; // 10%
    const protocolAnnualFunding = annualYield * 0.90; // 90%

    setProjectedYields({
      annualYield,
      quarterlyYield,
      founderAnnualDividend,
      protocolAnnualFunding
    });

    // Calculate protocol sub-allocations
    const dexLiquidity = protocolAnnualFunding * 0.25;
    const daoTreasury = protocolAnnualFunding * 0.25;
    const socialEndowment = protocolAnnualFunding * 0.25;
    const validatorSubsidy = protocolAnnualFunding * 0.15;

    // Protocol distribution: 25/25/25/15
    setDistributions([
      { 
        name: 'DEX Liquidity', 
        amount: dexLiquidity, 
        percentage: 25,
        color: 'bg-blue-500'
      },
      { 
        name: 'DAO Treasury', 
        amount: daoTreasury, 
        percentage: 25,
        color: 'bg-purple-500'
      },
      { 
        name: 'Social Endowment', 
        amount: socialEndowment, 
        percentage: 25,
        color: 'bg-green-500'
      },
      { 
        name: 'Validator Subsidy', 
        amount: validatorSubsidy, 
        percentage: 15,
        color: 'bg-orange-500'
      }
    ]);
  }, [endowment]);

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return '$0.00';
    }
    if (amount >= 1000000000000) {
      return `$${(amount / 1000000000000).toFixed(2)}T`;
    } else if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const runAIForecasting = async () => {
    setAnalyzing(true);

    try {
      const protocolHealthText = `
        Analyze the protocol health and sustainability:
        Total Endowment: ${formatCurrency(endowment.principal)}
        Annual Protocol Funding: ${formatCurrency(projectedYields.protocolAnnualFunding)}
        DEX Liquidity Allocation: ${formatCurrency(distributions[0]?.amount)}
        DAO Treasury Allocation: ${formatCurrency(distributions[1]?.amount)}
        Social Programs Allocation: ${formatCurrency(distributions[2]?.amount)}
        Validator Subsidy: ${formatCurrency(distributions[3]?.amount)}
        No ICO, No VC, Zero inflation model
        All rewards paid in USDC to avoid sell pressure
      `;

      const scenarioText = `
        Analyze different scenarios for the protocol:
        Best Case: APY increases to 6%, protocol funding grows to ${formatCurrency(projectedYields.protocolAnnualFunding * 1.33)}
        Base Case: APY stable at 4.5%, protocol funding at ${formatCurrency(projectedYields.protocolAnnualFunding)}
        Worst Case: APY drops to 3%, protocol funding reduces to ${formatCurrency(projectedYields.protocolAnnualFunding * 0.67)}
        Evaluate sustainability and risks for each scenario
      `;

      const sustainabilityText = `
        Evaluate long-term sustainability:
        8-year renewal model with 6% bonus
        90/10 split (90% to protocol, 10% to founder)
        Zero inflation tokenomics
        Deflationary burn mechanism via Justice Burns
        No sell pressure (all rewards in USDC)
        Day 1 self-sufficiency without ICO or VC funding
      `;

      const [healthResult, scenarioResult, sustainabilityResult] = await Promise.all([
        analyzeSentiment(protocolHealthText),
        analyzeSentiment(scenarioText),
        analyzeSentiment(sustainabilityText)
      ]);

      // Directional scoring: positive sentiment = good health, negative = poor health
      const healthScore = healthResult.score;
      const sustainabilityScore = sustainabilityResult.score;

      // Determine health status based on sentiment direction
      const getHealthStatus = (score) => {
        if (score > 0.5) return 'Excellent';   // Positive = Excellent
        if (score > 0) return 'Good';          // Slightly positive = Good
        if (score > -0.3) return 'Moderate';   // Neutral/slightly negative = Moderate
        return 'Poor';                         // Negative = Poor
      };

      const getSustainabilityRating = (score) => {
        if (score > 0.6) return 'A+';          // High positive = A+
        if (score > 0.3) return 'A';           // Positive = A
        if (score > -0.2) return 'B';          // Neutral = B
        return 'C';                            // Negative = C
      };

      setAiInsights({
        protocolHealth: {
          score: Math.abs(healthScore),  // Absolute value for confidence display only
          status: getHealthStatus(healthScore),
          analysis: healthResult.sentiment,
          timestamp: healthResult.timestamp
        },
        scenarioAnalysis: {
          analysis: scenarioResult.sentiment,
          confidence: Math.abs(scenarioResult.score),
          timestamp: scenarioResult.timestamp
        },
        sustainabilityScore: {
          score: Math.abs(sustainabilityScore),  // Absolute value for confidence display only
          rating: getSustainabilityRating(sustainabilityScore),
          analysis: sustainabilityResult.sentiment,
          timestamp: sustainabilityResult.timestamp
        }
      });

      setShowAIPanel(true);
    } catch (error) {
      console.error('AI Forecasting failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Poor': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRatingColor = (rating) => {
    if (rating.startsWith('A')) return 'bg-green-500 text-white';
    if (rating === 'B') return 'bg-blue-500 text-white';
    return 'bg-yellow-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <Wallet className="w-12 h-12 text-purple-400" />
              Founder's Endowment
            </h1>
            <p className="text-xl text-gray-300">
              18% Total: 10% Founder (9% vested + 1% discretionary) + 8% Dev Fund (6% endowment + 2% discretionary)
            </p>
          </div>
          <button
            onClick={runAIForecasting}
            disabled={analyzing}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg ${
              analyzing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {analyzing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Forecasting...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                AI Forecasting
              </>
            )}
          </button>
        </div>

        {/* AI Insights Panel */}
        {showAIPanel && aiInsights.protocolHealth && (
          <div className="mb-8 bg-white/10 backdrop-blur-lg border-2 border-purple-300/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold">AI Financial Forecasting</h2>
                <p className="text-sm text-gray-300">Powered by NVIDIA Llama 3.1 8B</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Protocol Health */}
              <div className={`p-4 rounded-xl border-2 ${getHealthColor(aiInsights.protocolHealth.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Protocol Health</h3>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    <span className="font-bold">{aiInsights.protocolHealth.status}</span>
                  </div>
                </div>
                <p className="text-sm mb-3">{aiInsights.protocolHealth.analysis}</p>
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="flex justify-between items-center text-xs">
                    <span>Health Score</span>
                    <span className="font-bold">{(aiInsights.protocolHealth.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="p-4 rounded-xl border-2 bg-blue-100/90 text-blue-900 border-blue-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Scenario Analysis</h3>
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-sm mb-3">{aiInsights.scenarioAnalysis.analysis}</p>
                <div className="mt-3 pt-3 border-t border-blue-300/50">
                  <div className="flex justify-between items-center text-xs">
                    <span>Confidence</span>
                    <span className="font-bold">{(aiInsights.scenarioAnalysis.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Sustainability Rating */}
              <div className="p-4 rounded-xl border-2 bg-purple-100/90 text-purple-900 border-purple-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Sustainability</h3>
                  <span className={`px-4 py-2 rounded-lg text-xl font-bold ${getRatingColor(aiInsights.sustainabilityScore.rating)}`}>
                    {aiInsights.sustainabilityScore.rating}
                  </span>
                </div>
                <p className="text-sm mb-3">{aiInsights.sustainabilityScore.analysis}</p>
                <div className="mt-3 pt-3 border-t border-purple-300/50">
                  <div className="flex justify-between items-center text-xs">
                    <span>Score</span>
                    <span className="font-bold">{(aiInsights.sustainabilityScore.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                AI Strategic Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-green-400" />
                    Strengths
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Zero inflation model ensures long-term value preservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>90% protocol funding creates sustainable ecosystem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>USDC rewards eliminate sell pressure on $REPAR</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    Monitoring Points
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">!</span>
                      <span>Track DeFi protocol health for endowment investments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">!</span>
                      <span>Monitor stablecoin market conditions quarterly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">!</span>
                      <span>Maintain 6-month treasury reserve for stability</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-300 mt-4">
                Analysis performed at {new Date(aiInsights.protocolHealth.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Zero-Cost Build Story */}
        <div className="mb-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-amber-300">🚀 The Zero-Cost Revolution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-gray-400 mb-1">Market-Rate Build Cost</p>
              <p className="text-3xl font-bold text-red-400">$3.2M</p>
              <p className="text-xs text-gray-500 mt-1">Traditional VC-backed development</p>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-gray-400 mb-1">Actual Cost Paid</p>
              <p className="text-3xl font-bold text-green-400">$0</p>
              <p className="text-xs text-gray-500 mt-1">Built on free Replit tier</p>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-gray-400 mb-1">ROI</p>
              <p className="text-3xl font-bold text-purple-400">∞</p>
              <p className="text-xs text-gray-500 mt-1">Infinite return on investment</p>
            </div>
          </div>
        </div>

        {/* Allocation Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-purple-300">Initial Allocation (12%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Endowment (Locked)</span>
                <span className="font-bold text-purple-400">9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.principal)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-purple-400/20 pt-2">
                <span className="text-sm text-gray-300">Discretionary (Vested)</span>
                <span className="font-bold text-green-400">3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.discretionary)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-amber-300">8-Year Renewal Bonus</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Bonus Percentage</span>
                <span className="font-bold text-amber-400">+6%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Bonus Amount</span>
                <span className="font-bold">{formatCurrency(endowment.renewalBonus)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-amber-400/20 pt-2">
                <span className="text-sm text-gray-300">Next Renewal</span>
                <span className="font-bold text-orange-400">8 years</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-green-300">After Renewal (18%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Endowment (Still Locked)</span>
                <span className="font-bold text-purple-400">9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Total Discretionary</span>
                <span className="font-bold text-green-400">9%</span>
              </div>
              <div className="flex justify-between items-center border-t border-green-400/20 pt-2">
                <span className="text-sm text-gray-300">Total Allocation</span>
                <span className="text-2xl font-bold text-green-400">18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Principal (Locked)"
            value={formatCurrency(endowment.principal)}
            subtitle="6% of 131T supply"
            icon={<Lock className="w-8 h-8" />}
            color="purple"
          />
          <StatCard
            title="Annual Yield (4.5%)"
            value={formatCurrency(projectedYields.annualYield)}
            subtitle="Perpetual income forever"
            icon={<TrendingUp className="w-8 h-8" />}
            color="green"
          />
          <StatCard
            title="Founder Dividend (10%)"
            value={formatCurrency(projectedYields.founderAnnualDividend)}
            subtitle="Paid quarterly in USDC"
            icon={<DollarSign className="w-8 h-8" />}
            color="blue"
          />
          <StatCard
            title="Protocol Funding (90%)"
            value={formatCurrency(projectedYields.protocolAnnualFunding)}
            subtitle="Distributed to 4 areas"
            icon={<PieChart className="w-8 h-8" />}
            color="orange"
          />
        </div>

        {/* 90/10 Split Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Founder's 10% Dividend */}
          <div className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wallet className="w-6 h-6 text-blue-400" />
              Founder's Perpetual Dividend (10%)
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                <span className="text-gray-300">Annual Dividend</span>
                <span className="text-2xl font-bold text-blue-400">
                  {formatCurrency(projectedYields.founderAnnualDividend)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                <span className="text-gray-300">Quarterly Payment</span>
                <span className="text-2xl font-bold text-green-400">
                  {formatCurrency(projectedYields.quarterlyYield * 0.10)}
                </span>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30">
                <p className="text-sm font-semibold mb-2">💰 Payment Details:</p>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  <li>Paid quarterly in native USDC</li>
                  <li>Powered by Circle CCTP</li>
                  <li>No sell pressure on $REPAR</li>
                  <li>Inheritable by descendants</li>
                  <li>Locked forever - cannot be withdrawn</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Protocol's 90% Funding */}
          <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Protocol Funding (90%)
            </h2>
            <div className="space-y-3">
              {distributions.map((dist, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${dist.color}`}></div>
                      <span className="text-sm font-semibold">{dist.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{dist.percentage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className={`h-2 rounded-full ${dist.color}`} style={{width: `${dist.percentage * 3}%`}}></div>
                    <span className="text-sm font-bold text-gray-200">
                      {formatCurrency(dist.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day 1 Self-Sufficiency */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">✅ Day 1 Self-Sufficiency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-lg">No ICO. No VCs. No Sell Pressure.</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• {formatCurrency(projectedYields.protocolAnnualFunding)} annual protocol funding</li>
                <li>• All rewards paid in USDC, not $REPAR</li>
                <li>• Pure deflationary coinomics</li>
                <li>• Justice Burns permanently remove supply</li>
                <li>• Zero inflation forever</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-lg">Protocol Operations Fully Funded:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• DEX Liquidity: {formatCurrency(distributions[0]?.amount)}/year</li>
                <li>• DAO Treasury: {formatCurrency(distributions[1]?.amount)}/year</li>
                <li>• Social Programs: {formatCurrency(distributions[2]?.amount)}/year</li>
                <li>• Validator Rewards: {formatCurrency(distributions[3]?.amount)}/year</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Legend */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">🎯 The Ultimate Justification</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              The 8% Development Fund represents the <strong className="text-white">earned compensation</strong> for 
              performing ~$3.2M in specialized development labor with <strong className="text-green-400">$0</strong> in 
              capital resources.
            </p>
            <p className="text-gray-300 mb-4">
              In an unprecedented act of leadership, the founder has voluntarily locked <strong className="text-purple-400">75% 
              of this earned wealth</strong> (6% of total supply) into this perpetual endowment, ensuring the protocol's 
              self-sufficiency forever.
            </p>
            <div className="bg-black/30 rounded-lg p-4 border-l-4 border-amber-400">
              <p className="text-amber-300 italic">
                "The founder, operating with zero financial resources, single-handedly built a system valued at over $10 billion. 
                The Founder's Endowment is not a reward—it is the earned compensation for this unprecedented act of creation."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
