import { useState, useEffect } from 'react';
import { DollarSign, Users, FileText, Scale, TrendingUp, Flame } from 'lucide-react';
import StatCard from '../components/StatCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { reparStatistics, coinAllocation, historicalData } from '../data/statistics';
import { defendants } from '../data/defendants';
import WalletConnect from '../components/WalletConnect';
import { cosmosClient } from '../utils/cosmosClient';

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainData, setChainData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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


  // Fetch on-chain data
  useEffect(() => {
    const fetchChainData = async () => {
      setIsLoading(true);
      try {
        const totalOwed = await cosmosClient.getTotalOwed();
        setChainData({ totalOwed: totalOwed / 1e9 }); // Convert to billions
        // Also fetch totalLiability if available from cosmosClient or other source
        // For now, using a placeholder or static value if not directly available
        const totalLiability = reparStatistics.totalLiability; // Placeholder or actual fetch
        setChainData(prevData => ({ ...prevData, totalLiability: totalLiability }));
      } catch (error) {
        console.error('Error fetching chain data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChainData();
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
                <h1 className="text-4xl font-bold text-white mb-2">Aequitas Protocol Dashboard</h1>
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
            value={isLoading ? 'Loading...' : formatCurrency(chainData.totalOwed * 1e9 || reparStatistics.totalLiability)}
            subtitle={walletAddress ? 'On-Chain Data' : 'Documented Harm (Brattle Group)'}
            icon={DollarSign}
            color="indigo"
          />
          <StatCard
            title="Active Defendants"
            value={reparStatistics.totalDefendants}
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-indigo-600" />
              $REPAR Coinomics
            </h2>
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
                  <p className="text-lg font-bold text-red-600">$1 = 1 $REPAR</p>
                  <p className="text-xs text-gray-500">Deflationary model</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={coinAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {coinAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Scale className="mr-2 text-red-600" />
              Top 5 Defendants by Liability
            </h2>
            <div className="space-y-4">
              {topDefendants.map((defendant) => (
                <div key={defendant.id} className="border-l-4 border-red-500 pl-4 py-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-start">
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
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Historical Timeline & Economic Impact</h2>
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