
import { useState, useEffect } from 'react';
import { TrendingUp, Lock, DollarSign, PieChart, Wallet, BarChart3 } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function FounderEndowment() {
  const [endowment, setEndowment] = useState({
    principal: 11790000000000, // 9% of 131T = 11.79T REPAR (endowment)
    discretionary: 3930000000000, // 3% of 131T = 3.93T REPAR (vested)
    renewalBonus: 7860000000000, // 6% of 131T = 7.86T REPAR (after 8 years)
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
    if (amount >= 1000000000000) {
      return `$${(amount / 1000000000000).toFixed(2)}T`;
    } else if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Wallet className="w-12 h-12 text-purple-400" />
            Founder's Endowment
          </h1>
          <p className="text-xl text-gray-300">
            12% Initial Allocation (9% Endowment + 3% Discretionary) → 18% After 8-Year Renewal
          </p>
        </div>

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
                <li>• Pure deflationary tokenomics</li>
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
