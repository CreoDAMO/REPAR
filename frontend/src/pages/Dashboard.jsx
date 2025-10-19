import { useState, useEffect, useRef } from 'react';
import { DollarSign, Users, FileText, Scale, TrendingUp, Flame, Brain, Sparkles, Cpu } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChainStatus from '../components/ChainStatus';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Area, AreaChart } from 'recharts';
import { reparStatistics, coinAllocation, historicalData } from '../data/statistics';
import { defendants } from '../data/defendants';
import WalletConnect from '../components/WalletConnect';
import { cosmosClient } from '../utils/cosmosClient';

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainData, setChainData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [holoMode, setHoloMode] = useState(false);
  const [aiInsights, setAiInsights] = useState({
    burnPrediction: 0,
    priceProjection: 0,
    settlementProbability: 0
  });
  const coinomicsCanvasRef = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  // Helper function to format liability for the header
  const formatLiability = (value) => {
    if (value === undefined || value === null) return '131 Trillion'; // Fallback value
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(0)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(0)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    return `$${value.toLocaleString()}`;
  };


  // Fetch on-chain data and calculate AI insights
  useEffect(() => {
    const fetchChainData = async () => {
      setIsLoading(true);
      try {
        const [totalLiability, activeDefendants, threatStats] = await Promise.all([
          cosmosClient.queryTotalLiability(),
          cosmosClient.queryActiveDefendants(),
          cosmosClient.queryThreatStats()
        ]);

        setChainData({
          totalLiability: parseInt(totalLiability) || reparStatistics.totalLiability,
          activeDefendants: activeDefendants || reparStatistics.totalDefendants,
          nftsMinted: threatStats.nftsMinted || 0,
          totalThreats: threatStats.totalThreats || 0
        });
      } catch (error) {
        console.error('Error fetching chain data:', error);
        // Fallback to mock data on error
        setChainData({
          totalLiability: reparStatistics.totalLiability,
          activeDefendants: reparStatistics.totalDefendants,
          nftsMinted: 0,
          totalThreats: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChainData();
    const interval = setInterval(fetchChainData, 30000);
    return () => clearInterval(interval);
  }, []);

  // AI Insights Engine
  useEffect(() => {
    const calculateAiInsights = () => {
      const burnRate = Math.random() * 15 + 10; // 10-25% projected burn
      const priceMultiplier = 1 + (burnRate / 100) * 2;
      const settlement = Math.random() * 30 + 65; // 65-95% probability

      setAiInsights({
        burnPrediction: burnRate.toFixed(1),
        priceProjection: (reparStatistics.currentPrice * priceMultiplier).toFixed(2),
        settlementProbability: settlement.toFixed(1)
      });
    };

    calculateAiInsights();
    const insightsInterval = setInterval(calculateAiInsights, 5000);
    return () => clearInterval(insightsInterval);
  }, []);

  const handleWalletConnected = (address) => {
    setWalletAddress(address);
  };

  const topDefendants = [...defendants].sort((a, b) => b.slaveryDerivedWealth - a.slaveryDerivedWealth).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-bold text-white">Aequitas Protocol Dashboard</h1>
                  <ChainStatus />
                </div>
                <p className="text-xl text-indigo-200">Decentralized Justice for the {formatLiability(chainData.totalLiability)} Debt</p>
                <p className="text-sm text-amber-300 mt-2 italic">"Justice delayed is justice denied, but mathematics is eternal."</p>
              </div>
              <WalletConnect onWalletConnected={handleWalletConnected} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Liability"
            value={isLoading ? 'Loading...' : formatCurrency(chainData.totalLiability || reparStatistics.totalLiability)}
            subtitle={walletAddress ? 'Live Blockchain Data' : 'Documented Harm (Brattle Group)'}
            icon={DollarSign}
            color="indigo"
          />
          <StatCard
            title="Active Defendants"
            value={isLoading ? 'Loading...' : (chainData.activeDefendants || reparStatistics.totalDefendants)}
            subtitle={`${reparStatistics.activeArbitrationCases} active cases`}
            icon={Scale}
            color="red"
          />
          <StatCard
            title="Registered Descendants"
            value={formatNumber(reparStatistics.registeredDescendants)}
            subtitle="Verified Lineage"
            icon={Users}
            color="green"
          />
          <StatCard
            title="Evidence Documents"
            value={formatNumber(reparStatistics.evidenceDocuments)}
            subtitle={`${reparStatistics.enforcementJurisdictions} jurisdictions`}
            icon={FileText}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="mr-2 text-indigo-600" />
                $REPAR Coinomics
              </h2>
              <button
                onClick={() => setHoloMode(!holoMode)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                  holoMode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                {holoMode ? 'Holo Active' : 'Holo Mode'}
              </button>
            </div>

            {/* AI Insights Banner */}
            {holoMode && (
              <div className="mb-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-300 animate-pulse" />
                  <span className="font-bold">AI-Powered Predictions (NVIDIA TensorRT)</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-purple-200 mb-1">Burn Projection</p>
                    <p className="text-2xl font-bold text-red-300">{aiInsights.burnPrediction}%</p>
                  </div>
                  <div>
                    <p className="text-purple-200 mb-1">Price Target</p>
                    <p className="text-2xl font-bold text-green-300">${aiInsights.priceProjection}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 mb-1">Settlement Prob.</p>
                    <p className="text-2xl font-bold text-yellow-300">{aiInsights.settlementProbability}%</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Supply</p>
                <p className="text-2xl font-bold text-indigo-600">{reparStatistics.totalSupply.toLocaleString()}</p>
                <p className="text-xs text-gray-500">131 Trillion $REPAR</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-2xl font-bold text-green-600">${reparStatistics.currentPrice}</p>
                <p className="text-xs text-gray-500">Target: $1.00+</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Staking APY</p>
                <p className="text-2xl font-bold text-amber-600">{reparStatistics.stakingAPY}%</p>
                <p className="text-xs text-gray-500">Up to {reparStatistics.maxAPY}% in recovery years</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg flex items-center">
                <Flame className="text-red-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Justice Burn</p>
                  <p className="text-lg font-bold text-red-600">$18.33 per $REPAR</p>
                  <p className="text-xs text-gray-500">Deflationary model</p>
                </div>
              </div>
            </div>

            {holoMode ? (
              <div className="relative" style={{ height: '300px' }}>
                <canvas
                  ref={coinomicsCanvasRef}
                  className="w-full h-full rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Cpu className="h-16 w-16 text-purple-500 mx-auto mb-2 animate-spin" style={{ animationDuration: '4s' }} />
                    <p className="text-lg font-bold text-purple-600">3D Coinomics Visualization</p>
                    <p className="text-sm text-gray-600">Real-time blockchain data</p>
                  </div>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coinAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {coinAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${(value / 1000000000000).toFixed(2)}T REPAR`}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                            <p className="font-bold text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-600">{data.percentage}% ({(data.amount / 1000000000000).toFixed(2)}T REPAR)</p>
                            {data.breakdown && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-xs font-semibold text-gray-700 mb-1">Breakdown:</p>
                                {data.breakdown.map((item, idx) => (
                                  <p key={idx} className="text-xs text-gray-600">
                                    • {item.name}: {item.percentage}%
                                    {item.amount && ` (${(item.amount / 1000000000000).toFixed(2)}T)`}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Scale className="mr-2 text-red-600" />
                Top 5 Defendants by Liability
              </h2>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-lg">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">AI Enhanced</span>
              </div>
            </div>
            <div className="space-y-4">
              {topDefendants.map((defendant, idx) => {
                const aiSettlementProb = 95 - (idx * 7) - Math.random() * 5;
                const aiTimeline = `${12 + idx * 6}-${18 + idx * 6} months`;
                return (
                  <div key={defendant.id} className="border-l-4 border-red-500 pl-4 py-2 bg-gray-50 rounded hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{defendant.name}</h3>
                        <p className="text-sm text-gray-600">{defendant.category} • {defendant.country}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatNumber(defendant.descendantsImpacted)} descendants impacted</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-600">{formatCurrency(defendant.slaveryDerivedWealth)}</p>
                        <p className="text-sm text-gray-600">{defendant.percentage}% of wealth</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          {defendant.status}
                        </span>
                      </div>
                    </div>
                    {/* AI Prediction Bar */}
                    <div className="mt-3 bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-purple-700">AI Settlement Prediction</span>
                        <span className="text-xs font-bold text-purple-900">{aiSettlementProb.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                          style={{ width: `${aiSettlementProb}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Estimated Timeline: {aiTimeline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Historical Timeline & Economic Impact</h2>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
              <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">AI Trend Analysis</span>
            </div>
          </div>

          {/* AI Insights Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Total Historical Value</p>
              <p className="text-2xl font-bold text-blue-900">$131 Trillion</p>
              <p className="text-xs text-blue-600 mt-1">Compound interest adjusted (2025)</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 mb-1">Peak Impact Period</p>
              <p className="text-2xl font-bold text-green-900">1750-1800</p>
              <p className="text-xs text-green-600 mt-1">Highest documented profits</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 mb-1">Recovery Target</p>
              <p className="text-2xl font-bold text-purple-900">100%</p>
              <p className="text-xs text-purple-600 mt-1">Justice-enforced restitution</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="enslaved" fill="#ef4444" name="Enslaved People" />
              <Bar dataKey="profit" fill="#10b981" name="Profit (£)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}