import { useState } from 'react';
import { Sliders, Play, TrendingUp, DollarSign } from 'lucide-react';

export default function EndowmentSimulator() {
  const [params, setParams] = useState({
    annualDEXVolume: 60000000, // $60M
    years: 10,
    lpAllocation: 30, // 30% of fees
    socialAllocation: 15, // 15% of fees
    targetAPY: 7.0
  });

  const [results, setResults] = useState(null);

  const runSimulation = () => {
    const feeRate = 0.003; // 0.3% swap fee
    const annualFees = params.annualDEXVolume * feeRate;
    
    const lpAnnualContribution = annualFees * (params.lpAllocation / 100);
    const socialAnnualContribution = annualFees * (params.socialAllocation / 100);
    
    // Calculate accumulated principal over years
    const lpPrincipal = lpAnnualContribution * Math.min(params.years, 5); // 5-year lock
    const socialPrincipal = socialAnnualContribution * Math.min(params.years, 10); // 10-year lock
    
    // Calculate annual yield (APY * Principal)
    const lpAnnualYield = lpPrincipal * (params.targetAPY / 100);
    const socialAnnualYield = socialPrincipal * (params.targetAPY / 100);
    
    setResults({
      annualFees,
      lpPrincipal,
      socialPrincipal,
      totalPrincipal: lpPrincipal + socialPrincipal,
      lpAnnualYield,
      socialAnnualYield,
      totalYield: lpAnnualYield + socialAnnualYield,
      projectedLPYieldYear: 6,
      projectedSocialYieldYear: 11
    });
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Sliders className="w-8 h-8 text-cyan-400" />
        <div>
          <h2 className="text-2xl font-bold">🎯 Interactive Endowment Simulator</h2>
          <p className="text-sm text-gray-300">Adjust parameters to project future endowment growth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Annual DEX Volume</span>
              <span className="text-lg font-bold text-cyan-400">{formatCurrency(params.annualDEXVolume)}</span>
            </label>
            <input
              type="range"
              min="10000000"
              max="500000000"
              step="10000000"
              value={params.annualDEXVolume}
              onChange={(e) => setParams({...params, annualDEXVolume: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$10M</span>
              <span>$500M</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Simulation Period (Years)</span>
              <span className="text-lg font-bold text-purple-400">{params.years}</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={params.years}
              onChange={(e) => setParams({...params, years: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Target APY</span>
              <span className="text-lg font-bold text-green-400">{params.targetAPY.toFixed(1)}%</span>
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={params.targetAPY}
              onChange={(e) => setParams({...params, targetAPY: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3%</span>
              <span>15%</span>
            </div>
          </div>

          <button
            onClick={runSimulation}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
          >
            <Play className="w-6 h-6" />
            Run Simulation
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results ? (
            <>
              <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-400/30 rounded-xl p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  LP Provider Endowment (Year {results.projectedLPYieldYear}+)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Principal Locked:</span>
                    <span className="font-bold text-orange-400">{formatCurrency(results.lpPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Annual Yield ({params.targetAPY}%):</span>
                    <span className="font-bold text-green-400">{formatCurrency(results.lpAnnualYield)}/year</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Social Endowment (Year {results.projectedSocialYieldYear}+)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Principal Locked:</span>
                    <span className="font-bold text-purple-400">{formatCurrency(results.socialPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Annual Yield ({params.targetAPY}%):</span>
                    <span className="font-bold text-green-400">{formatCurrency(results.socialAnnualYield)}/year</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  Combined Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Principal Forever:</span>
                    <span className="font-bold text-cyan-400">{formatCurrency(results.totalPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Annual Yield:</span>
                    <span className="font-bold text-green-400">{formatCurrency(results.totalYield)}/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Annual DEX Fees (0.3%):</span>
                    <span className="font-bold text-blue-400">{formatCurrency(results.annualFees)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4">
                <p className="text-xs text-green-300 text-center font-semibold">
                  💰 This generates <span className="text-green-100 text-sm">{formatCurrency(results.totalYield)}</span> annually FOREVER with ZERO inflation
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Adjust parameters and click "Run Simulation"</p>
                <p className="text-sm mt-2">See how endowment growth changes over time</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
