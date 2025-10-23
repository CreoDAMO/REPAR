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

  const formatCurrency = (value) => {
    if (!isFinite(value) || value === null || value === undefined || isNaN(value)) {
      return '$0.00';
    }
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
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
              <input
                type="number"
                value={customInvestment}
                onChange={(e) => setCustomInvestment(Math.max(0, Number(e.target.value) || 0))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="22000000"
              />
              <p className="text-sm text-gray-500 mt-1">Enter amount in USD</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-Money Valuation
              </label>
              <input
                type="number"
                value={customValuation}
                onChange={(e) => setCustomValuation(Math.max(0, Number(e.target.value) || 0))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="7000000000"
              />
              <p className="text-sm text-gray-500 mt-1">Current: $7B</p>
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
