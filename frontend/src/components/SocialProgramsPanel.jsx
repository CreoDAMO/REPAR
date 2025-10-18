import { Globe, Heart, GraduationCap, Vault, HandHeart, Users } from 'lucide-react';

export default function SocialProgramsPanel({ annualYield }) {
  const programs = [
    {
      id: 'global_ubi',
      name: 'Global Universal Basic Income',
      allocation: 20,
      icon: <Globe className="w-6 h-6" />,
      color: 'blue',
      recipients: '15,000 people',
      payment: '$20/month per recipient',
      impact: 'Lifting families out of extreme poverty'
    },
    {
      id: 'generational_trusts',
      name: 'Generational Wealth Trusts',
      allocation: 20,
      icon: <Heart className="w-6 h-6" />,
      color: 'pink',
      recipients: '720 new trusts/year',
      payment: '$5,000 per trust',
      impact: 'Multi-generational wealth preservation'
    },
    {
      id: 'aequitas_defi',
      name: 'Aequitas DeFi Platform',
      allocation: 13,
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'green',
      recipients: '100,000+ students',
      payment: '$85 per graduate',
      impact: 'Teaching financial sovereignty'
    },
    {
      id: 'dex_treasury',
      name: 'DEX Emergency Treasury',
      allocation: 20,
      icon: <Vault className="w-6 h-6" />,
      color: 'orange',
      recipients: 'Emergency reserve',
      payment: 'Accumulated fund',
      impact: 'Protocol financial immortality'
    },
    {
      id: 'charitable_giving',
      name: 'Charitable Giving Fund',
      allocation: 13,
      icon: <HandHeart className="w-6 h-6" />,
      color: 'red',
      recipients: '50+ organizations',
      payment: 'Quarterly distributions',
      impact: '500,000+ lives impacted'
    },
    {
      id: 'dao_treasury',
      name: 'DAO Governance Treasury',
      allocation: 14,
      icon: <Users className="w-6 h-6" />,
      color: 'purple',
      recipients: 'DAO operations',
      payment: 'Governance funding',
      impact: 'Community-driven initiatives'
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
      blue: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 hover:border-blue-400/50',
      pink: 'from-pink-500/20 to-rose-500/20 border-pink-400/30 hover:border-pink-400/50',
      green: 'from-green-500/20 to-emerald-500/20 border-green-400/30 hover:border-green-400/50',
      orange: 'from-orange-500/20 to-yellow-500/20 border-orange-400/30 hover:border-orange-400/50',
      red: 'from-red-500/20 to-pink-500/20 border-red-400/30 hover:border-red-400/50',
      purple: 'from-purple-500/20 to-indigo-500/20 border-purple-400/30 hover:border-purple-400/50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="mb-8 bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-purple-400" />
          6 Social Infrastructure Programs
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Annual Distribution</p>
          <p className="text-3xl font-bold text-purple-400">{formatCurrency(annualYield)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {programs.map((program) => {
          const programBudget = annualYield * (program.allocation / 100);
          
          return (
            <div
              key={program.id}
              className={`bg-gradient-to-br ${getColorClasses(program.color)} border rounded-xl p-5 hover:scale-105 transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  {program.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{program.allocation}%</p>
                  <p className="text-xs text-gray-400">of yield</p>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-2">{program.name}</h3>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span className="text-gray-400">Annual Budget:</span>
                  <span className="font-semibold text-green-400">{formatCurrency(programBudget)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span className="text-gray-400">Recipients:</span>
                  <span className="font-semibold">{program.recipients}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span className="text-gray-400">Payment:</span>
                  <span className="font-semibold">{program.payment}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-gray-300">
                  <span className="font-semibold">Impact:</span> {program.impact}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-xl p-5">
        <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
          🌍 Global Impact (Year 11+)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-gray-400 mb-1">Direct Beneficiaries</p>
            <p className="text-2xl font-bold text-blue-400">50,000+</p>
            <p className="text-xs text-gray-500">People directly receiving support</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-gray-400 mb-1">Indirect Impact</p>
            <p className="text-2xl font-bold text-green-400">500,000+</p>
            <p className="text-xs text-gray-500">Lives touched through programs</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-gray-400 mb-1">Sustainability</p>
            <p className="text-2xl font-bold text-purple-400">Forever</p>
            <p className="text-xs text-gray-500">Principal never touched</p>
          </div>
        </div>
      </div>
    </div>
  );
}
