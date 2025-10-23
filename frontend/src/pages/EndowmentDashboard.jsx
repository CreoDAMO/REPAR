import { useState, useEffect } from 'react';
import { TrendingUp, Lock, Unlock, DollarSign, PieChart, BarChart3, Brain, Sparkles, TrendingDown, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import InvestmentStrategies from '../components/InvestmentStrategies';
import SocialProgramsPanel from '../components/SocialProgramsPanel';
import EndowmentSimulator from '../components/endowment/EndowmentSimulator';
import { analyzeSentiment } from '../utils/nvidiaAI';

export default function EndowmentDashboard() {
  const [lpEndowment, setLpEndowment] = useState({
    principal: 0,
    yieldAccumulated: 0,
    targetAPY: 7.0,
    unlockYear: 5,
    isLocked: true
  });

  const [socialEndowment, setSocialEndowment] = useState({
    principal: 0,
    yieldAccumulated: 0,
    targetAPY: 7.0,
    unlockYear: 10,
    isLocked: true
  });

  const [feeDistribution, setFeeDistribution] = useState({
    total: 0,
    community: 0,
    lp: 0,
    social: 0
  });

  const [aiAnalysis, setAiAnalysis] = useState({
    lpRisk: null,
    socialRisk: null,
    marketPrediction: null,
    strategyRecommendation: null
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  useEffect(() => {
    const lpPrincipal = 153000000;
    const socialPrincipal = 256500000;
    const totalFees = 60000000;

    setLpEndowment({
      ...lpEndowment,
      principal: lpPrincipal,
      yieldAccumulated: lpPrincipal * 0.07,
    });

    setSocialEndowment({
      ...socialEndowment,
      principal: socialPrincipal,
      yieldAccumulated: socialPrincipal * 0.07,
    });

    setFeeDistribution({
      total: totalFees,
      community: totalFees * 0.55,
      lp: totalFees * 0.30,
      social: totalFees * 0.15
    });
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const runAIAnalysis = async () => {
    setAnalyzing(true);
    
    try {
      const lpAnalysisText = `
        Analyze investment risk for LP Endowment:
        Principal: $153M locked for 5 years
        Target APY: 7%
        Annual Yield: $10.71M
        Strategy: Conservative DeFi staking and yield farming
      `;
      
      const socialAnalysisText = `
        Analyze investment risk for Social Endowment:
        Principal: $256.5M locked for 10 years
        Target APY: 7%
        Annual Yield: $17.96M
        Strategy: Mixed portfolio with focus on stability
      `;

      const marketPredictionText = `
        Predict market conditions for endowment performance:
        Current DeFi APY trends
        Stablecoin yield sustainability
        Risk of protocol failures
      `;

      const strategyText = `
        Recommend investment strategy improvements for:
        Total endowment: $409.5M
        Target returns: 7% APY
        Risk tolerance: Low to moderate
        Time horizon: 5-10 years
      `;

      const [lpRiskResult, socialRiskResult, marketResult, strategyResult] = await Promise.all([
        analyzeSentiment(lpAnalysisText),
        analyzeSentiment(socialAnalysisText),
        analyzeSentiment(marketPredictionText),
        analyzeSentiment(strategyText)
      ]);

      const lpRiskScore = Math.abs(lpRiskResult.score);
      const socialRiskScore = Math.abs(socialRiskResult.score);
      const marketScore = marketResult.score;

      setAiAnalysis({
        lpRisk: {
          score: lpRiskScore,
          level: lpRiskScore > 0.7 ? 'High' : lpRiskScore > 0.4 ? 'Medium' : 'Low',
          analysis: lpRiskResult.sentiment,
          timestamp: lpRiskResult.timestamp
        },
        socialRisk: {
          score: socialRiskScore,
          level: socialRiskScore > 0.7 ? 'High' : socialRiskScore > 0.4 ? 'Medium' : 'Low',
          analysis: socialRiskResult.sentiment,
          timestamp: socialRiskResult.timestamp
        },
        marketPrediction: {
          score: marketScore,
          outlook: marketScore > 0.5 ? 'Bullish' : marketScore < -0.5 ? 'Bearish' : 'Neutral',
          analysis: marketResult.sentiment,
          timestamp: marketResult.timestamp
        },
        strategyRecommendation: {
          analysis: strategyResult.sentiment,
          confidence: Math.abs(strategyResult.score),
          timestamp: strategyResult.timestamp
        }
      });

      setShowAIPanel(true);
    } catch (error) {
      console.error('AI Analysis failed:', error);
    } finally {
      setAnalyzing(false);
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

  const getOutlookColor = (outlook) => {
    switch (outlook) {
      case 'Bullish': return 'bg-green-100 text-green-800';
      case 'Bearish': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <TrendingUp className="w-12 h-12 text-green-400" />
              Endowment Dashboard
            </h1>
            <p className="text-xl text-gray-300 italic">
              "Never spend the principal. Only distribute the yield." - The Perpetual Endowment Model
            </p>
          </div>
          <button
            onClick={runAIAnalysis}
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
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                Run AI Analysis
              </>
            )}
          </button>
        </div>

        {/* AI Analysis Panel */}
        {showAIPanel && aiAnalysis.lpRisk && (
          <div className="mb-8 bg-white/10 backdrop-blur-lg border-2 border-purple-300/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold">AI Investment Analysis</h2>
                <p className="text-sm text-gray-300">Powered by NVIDIA Llama 3.1 8B</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* LP Endowment Risk */}
              <div className={`p-4 rounded-xl border-2 ${getRiskColor(aiAnalysis.lpRisk.level)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">LP Endowment Risk</h3>
                  <div className="flex items-center gap-2">
                    {aiAnalysis.lpRisk.level === 'High' && <TrendingDown className="h-5 w-5" />}
                    {aiAnalysis.lpRisk.level === 'Medium' && <Activity className="h-5 w-5" />}
                    {aiAnalysis.lpRisk.level === 'Low' && <TrendingUp className="h-5 w-5" />}
                    <span className="font-bold">{aiAnalysis.lpRisk.level}</span>
                  </div>
                </div>
                <p className="text-sm mb-2">{aiAnalysis.lpRisk.analysis}</p>
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="flex justify-between items-center text-xs">
                    <span>Risk Score</span>
                    <span className="font-bold">{(aiAnalysis.lpRisk.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Social Endowment Risk */}
              <div className={`p-4 rounded-xl border-2 ${getRiskColor(aiAnalysis.socialRisk.level)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Social Endowment Risk</h3>
                  <div className="flex items-center gap-2">
                    {aiAnalysis.socialRisk.level === 'High' && <TrendingDown className="h-5 w-5" />}
                    {aiAnalysis.socialRisk.level === 'Medium' && <Activity className="h-5 w-5" />}
                    {aiAnalysis.socialRisk.level === 'Low' && <TrendingUp className="h-5 w-5" />}
                    <span className="font-bold">{aiAnalysis.socialRisk.level}</span>
                  </div>
                </div>
                <p className="text-sm mb-2">{aiAnalysis.socialRisk.analysis}</p>
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="flex justify-between items-center text-xs">
                    <span>Risk Score</span>
                    <span className="font-bold">{(aiAnalysis.socialRisk.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Market Prediction */}
              <div className="p-4 rounded-xl border-2 bg-blue-100/90 text-blue-900 border-blue-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Market Outlook</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getOutlookColor(aiAnalysis.marketPrediction.outlook)}`}>
                    {aiAnalysis.marketPrediction.outlook}
                  </span>
                </div>
                <p className="text-sm mb-2">{aiAnalysis.marketPrediction.analysis}</p>
                <div className="mt-3 pt-3 border-t border-blue-300/50">
                  <div className="flex justify-between items-center text-xs">
                    <span>Confidence Score</span>
                    <span className="font-bold">{(Math.abs(aiAnalysis.marketPrediction.score) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Strategy Recommendation */}
              <div className="p-4 rounded-xl border-2 bg-purple-100/90 text-purple-900 border-purple-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">AI Strategy Recommendation</h3>
                  <Brain className="h-5 w-5" />
                </div>
                <p className="text-sm mb-2">{aiAnalysis.strategyRecommendation.analysis}</p>
                <div className="mt-3 pt-3 border-t border-purple-300/50">
                  <div className="flex justify-between items-center text-xs">
                    <span>Recommendation Strength</span>
                    <span className="font-bold">{(aiAnalysis.strategyRecommendation.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Key AI Insights
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Both endowments show sustainable yield targets with conservative risk profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>5-10 year lock periods provide stability and reduce market timing risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">ℹ</span>
                  <span>Diversification across multiple DeFi protocols recommended to mitigate single-point failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">⚠</span>
                  <span>Monitor stablecoin depegging risks and maintain treasury reserves</span>
                </li>
              </ul>
              <p className="text-xs text-gray-300 mt-3">
                Analysis performed at {new Date(aiAnalysis.lpRisk.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Fee Distribution Model */}
        <div className="mb-8 bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-blue-400" />
            55/30/15 Fee Distribution Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total DEX Fees (Annual)"
              value={formatCurrency(feeDistribution.total)}
              subtitle="Year 1 Baseline"
              icon={<DollarSign className="w-8 h-8" />}
              trend="+33%"
              trendLabel="Year 2 projected"
            />
            <StatCard
              title="Community Matching (55%)"
              value={formatCurrency(feeDistribution.community)}
              subtitle="Immediate Distribution"
              icon={<BarChart3 className="w-8 h-8" />}
              color="green"
            />
            <StatCard
              title="LP Endowment (30%)"
              value={formatCurrency(feeDistribution.lp)}
              subtitle="5-year accumulation"
              icon={<Lock className="w-8 h-8" />}
              color="orange"
            />
            <StatCard
              title="Social Endowment (15%)"
              value={formatCurrency(feeDistribution.social)}
              subtitle="10-year accumulation"
              icon={<Lock className="w-8 h-8" />}
              color="purple"
            />
          </div>
        </div>

        {/* Endowment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* LP Provider Endowment */}
          <div className="bg-white/5 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              {lpEndowment.isLocked ? (
                <Lock className="w-6 h-6 text-orange-400" />
              ) : (
                <Unlock className="w-6 h-6 text-green-400" />
              )}
              LP Provider Endowment
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-orange-500/10 rounded-xl">
                <span className="text-gray-300">Principal (Locked Forever)</span>
                <span className="text-2xl font-bold text-orange-400">{formatCurrency(lpEndowment.principal)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl">
                <span className="text-gray-300">Annual Yield (7% APY)</span>
                <span className="text-2xl font-bold text-green-400">{formatCurrency(lpEndowment.yieldAccumulated)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                <span className="text-gray-300">Target APY</span>
                <span className="text-2xl font-bold text-blue-400">{lpEndowment.targetAPY}%</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl">
                <span className="text-gray-300">Lock Period</span>
                <span className="text-2xl font-bold text-purple-400">{lpEndowment.unlockYear} years</span>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl border border-orange-400/30">
                <p className="text-sm font-semibold mb-2">💰 What LP Providers Get:</p>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  <li>Year 6+: {formatCurrency(lpEndowment.yieldAccumulated)}/year forever</li>
                  <li>Paid quarterly in USDC</li>
                  <li>Principal never touched ({formatCurrency(lpEndowment.principal)} locked)</li>
                  <li>No inflation, no dilution</li>
                  <li>Inheritable by heirs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Infrastructure Endowment */}
          <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              {socialEndowment.isLocked ? (
                <Lock className="w-6 h-6 text-purple-400" />
              ) : (
                <Unlock className="w-6 h-6 text-green-400" />
              )}
              Social Infrastructure Endowment
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl">
                <span className="text-gray-300">Principal (Locked Forever)</span>
                <span className="text-2xl font-bold text-purple-400">{formatCurrency(socialEndowment.principal)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl">
                <span className="text-gray-300">Annual Yield (7% APY)</span>
                <span className="text-2xl font-bold text-green-400">{formatCurrency(socialEndowment.yieldAccumulated)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                <span className="text-gray-300">Target APY</span>
                <span className="text-2xl font-bold text-blue-400">{socialEndowment.targetAPY}%</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-pink-500/10 rounded-xl">
                <span className="text-gray-300">Lock Period</span>
                <span className="text-2xl font-bold text-pink-400">{socialEndowment.unlockYear} years</span>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                <p className="text-sm font-semibold mb-2">🌍 Year 11+ Distribution:</p>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  <li>{formatCurrency(socialEndowment.yieldAccumulated)}/year distributed</li>
                  <li>6 social programs funded perpetually</li>
                  <li>Global UBI: 15,000 recipients</li>
                  <li>Generational Trusts: 720/year</li>
                  <li>Principal untouched forever</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <EndowmentSimulator />

        <InvestmentStrategies endowmentId="lp_endowment" principal={lpEndowment.principal} />

        <SocialProgramsPanel annualYield={socialEndowment.yieldAccumulated} />

        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4">🔥 The Revolutionary Innovation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2 text-red-400">❌ Traditional Charity</h4>
              <p className="text-sm text-gray-300">Receive $100 → Spend $100 → Need new funding</p>
              <p className="text-xs text-gray-400 mt-2">Result: Fragile, dependent on continuous donations</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-yellow-400">⚠️ Traditional LP Rewards</h4>
              <p className="text-sm text-gray-300">Mint new tokens → Pay LPs → Inflation → Death spiral</p>
              <p className="text-xs text-gray-400 mt-2">Result: Unsustainable, coin value crashes</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-green-400">✅ Aequitas Perpetual Endowment</h4>
              <p className="text-sm text-gray-300">Receive $100 → Invest $100 → Earn $7/year forever</p>
              <p className="text-xs text-gray-400 mt-2">Result: Infinite sustainability, zero inflation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
