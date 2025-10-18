import { Bitcoin, Coins, Shield, TrendingUp } from 'lucide-react';

export default function InvestmentStrategies({ endowmentId, principal }) {
  const strategies = [
    {
      name: 'BTC Staking',
      allocation: 40,
      amount: principal * 0.40,
      apy: 5.0,
      icon: <Bitcoin className="w-6 h-6" />,
      color: 'orange',
      description: 'Conservative BTC staking via Babylon, Lombard',
      risk: 'Lowest (BTC is digital gold)'
    },
    {
      name: 'ETH Staking',
      allocation: 30,
      amount: principal * 0.30,
      apy: 4.0,
      icon: <Coins className="w-6 h-6" />,
      color: 'blue',
      description: 'ETH 2.0 validators via Lido, Rocket Pool',
      risk: 'Very Low (battle-tested protocols)'
    },
    {
      name: 'Stablecoin Lending',
      allocation: 20,
      amount: principal * 0.20,
      apy: 10.0,
      icon: <Shield className="w-6 h-6" />,
      color: 'green',
      description: 'USDC lending on Aave, Compound',
      risk: 'Low (overcollateralized loans)'
    },
    {
      name: 'Liquid Staking Derivatives',
      allocation: 10,
      amount: principal * 0.10,
      apy: 12.0,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      description: 'stATOM, stSOL yield strategies',
      risk: 'Moderate (newer protocols)'
    }
  ];

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getColorClasses = (color) => {
    const colors = {
      orange: 'from-orange-500/20 to-yellow-500/20 border-orange-400/30',
      blue: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
      green: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
      purple: 'from-purple-500/20 to-pink-500/20 border-purple-400/30'
    };
    return colors[color] || colors.blue;
  };

  const blendedAPY = strategies.reduce((acc, strategy) => {
    return acc + (strategy.apy * strategy.allocation / 100);
  }, 0);

  return (
    <div className="mb-8 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          3-Layer Investment Strategy
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Blended APY</p>
          <p className="text-3xl font-bold text-green-400">{blendedAPY.toFixed(2)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${getColorClasses(strategy.color)} border rounded-xl p-4 hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/10 rounded-lg">
                {strategy.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{strategy.allocation}%</p>
                <p className="text-xs text-gray-400">allocation</p>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2">{strategy.name}</h3>
            <p className="text-sm text-gray-300 mb-3">{strategy.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Invested:</span>
                <span className="font-semibold">{formatCurrency(strategy.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">APY:</span>
                <span className="font-semibold text-green-400">{strategy.apy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Risk:</span>
                <span className="font-semibold text-yellow-400">{strategy.risk.split(' ')[0]}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400">{strategy.risk}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-400/30 rounded-xl p-4">
        <h4 className="font-bold mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Risk Management
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Diversification</p>
            <p className="font-semibold">4 major asset classes</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Blue-chip Protocols</p>
            <p className="font-semibold">Lido ($30B+ TVL), Aave ($12B+)</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Overcollateralization</p>
            <p className="font-semibold">All lending fully backed</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">DAO Oversight</p>
            <p className="font-semibold">Quarterly rebalancing votes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
