import { useState, useEffect } from 'react';
import { TrendingUp, Lock, Unlock, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import StatCard from '../components/StatCard';
import InvestmentStrategies from '../components/InvestmentStrategies';
import SocialProgramsPanel from '../components/SocialProgramsPanel';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <TrendingUp className="w-12 h-12 text-green-400" />
            Endowment Dashboard
          </h1>
          <p className="text-xl text-gray-300 italic">
            "Never spend the principal. Only distribute the yield." - The Perpetual Endowment Model
          </p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
