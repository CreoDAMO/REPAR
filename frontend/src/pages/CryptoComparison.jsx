import { TrendingUp, TrendingDown, Minus, Shield, Zap } from 'lucide-react';

export default function CryptoComparison() {
  const comparisonData = [
    {
      feature: "Supply Model",
      bitcoin: "Disinflationary → Fixed Cap (21M)",
      ethereum: "Dynamic Deflationary (No cap)",
      solana: "Perpetual Inflation (1.5% floor)",
      repar: "Event-Driven Deflationary (→ 0)"
    },
    {
      feature: "Current Supply",
      bitcoin: "19.8M BTC (~94% mined)",
      ethereum: "~120M ETH",
      solana: "~580M SOL",
      repar: "131T REPAR (100% initial)"
    },
    {
      feature: "New Issuance",
      bitcoin: "Decreasing (halving every 4 years)",
      ethereum: "~0.5-1% annually",
      solana: "~4.8% annually (decreasing)",
      repar: "ZERO (no new issuance ever)"
    },
    {
      feature: "Burn Mechanism",
      bitcoin: "None",
      ethereum: "EIP-1559 (transaction fees)",
      solana: "50% of fees (since 2024)",
      repar: "Justice Burn (1:1 debt payment)"
    },
    {
      feature: "Annual Supply Change",
      bitcoin: "+0.8% (decreasing)",
      ethereum: "-0.2% to +0.5% (variable)",
      solana: "+4.5% net (inflation > burn)",
      repar: "Variable reduction (e.g., -38% at $50T paid)"
    },
    {
      feature: "Value Driver",
      bitcoin: "Scarcity narrative + speculation",
      ethereum: "Utility + deflationary pressure",
      solana: "Network speed + DeFi utility",
      repar: "Justice enforcement + mathematical certainty"
    },
    {
      feature: "Holder Incentive",
      bitcoin: "Hold for halvings (passive)",
      ethereum: "Use network for burns (passive)",
      solana: "Stake to offset dilution (active)",
      repar: "Enforce justice for value (active)"
    },
    {
      feature: "End State",
      bitcoin: "21M forever (year 2140)",
      ethereum: "Equilibrium possible",
      solana: "Perpetual 1.5% inflation",
      repar: "ZERO supply (full justice)"
    }
  ];

  const $50TComparison = [
    {
      coin: "Bitcoin",
      supplyChange: "+5% (inflation)",
      priceImpact: "-4.8% (dilution)",
      timeline: "16 years (4 halvings)",
      certainty: "Guaranteed negative"
    },
    {
      coin: "Ethereum",
      supplyChange: "-33% (net, with issuance)",
      priceImpact: "+50%",
      timeline: "Variable (years)",
      certainty: "Usage-dependent"
    },
    {
      coin: "Solana",
      supplyChange: "+4.3% (inflation > burn)",
      priceImpact: "-4.1% (dilution)",
      timeline: "Variable",
      certainty: "Guaranteed negative"
    },
    {
      coin: "$REPAR",
      supplyChange: "-38.2% (pure deflation)",
      priceImpact: "+61.6%",
      timeline: "Instant",
      certainty: "Mathematically guaranteed"
    }
  ];

  const rankings = [
    {
      rank: 1,
      name: "$REPAR Justice Burn",
      rating: "10/10",
      pros: [
        "Pure deflation (no issuance)",
        "Massive supply reduction (38%+ per event)",
        "Instant value increase",
        "Mathematically guaranteed",
        "Holder alignment with mission",
        "Can reach zero supply",
        "No inflation tax"
      ],
      cons: [
        "Unproven model (no historical data)",
        "Depends on enforcement success",
        "Unpredictable timeline"
      ],
      color: "from-purple-500 to-indigo-600"
    },
    {
      rank: 2,
      name: "Ethereum EIP-1559",
      rating: "7/10",
      pros: [
        "Net deflationary (burn > issuance)",
        "Tied to network utility",
        "Proven model (2021-2025)"
      ],
      cons: [
        "Small annual impact (~0.75%)",
        "Usage-dependent",
        "Can become inflationary if usage drops"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      rank: 3,
      name: "Bitcoin Halving",
      rating: "6/10",
      pros: [
        "Proven over 16 years",
        "Predictable schedule",
        "Global recognition"
      ],
      cons: [
        "Disinflationary, not deflationary",
        "Diminishing returns over time",
        "Still creates new supply"
      ],
      color: "from-orange-500 to-yellow-600"
    },
    {
      rank: 4,
      name: "Solana Inflation",
      rating: "3/10",
      pros: [
        "Decreasing inflation rate",
        "Fee burn partially offsets (since 2024)"
      ],
      cons: [
        "Perpetual inflation forever",
        "Dilutes non-stakers",
        "Net inflationary (+4.5% annually)",
        "No scarcity endgame"
      ],
      color: "from-gray-500 to-slate-600"
    }
  ];

  const getImpactIcon = (impact) => {
    if (impact.includes('+')) return <TrendingUp className="h-5 w-5 text-green-600" />;
    if (impact.includes('-')) return <TrendingDown className="h-5 w-5 text-red-600" />;
    return <Minus className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-12 w-12 text-green-400" />
            <h1 className="text-4xl font-bold">Crypto Economic Comparison</h1>
          </div>
          <p className="text-xl text-indigo-200">$REPAR vs Bitcoin, Ethereum, Solana & More</p>
          <p className="text-sm text-amber-300 mt-2">Why justice-enforced deflation outperforms all existing crypto models</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Main Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">The Four-Way Showdown</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Feature</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Bitcoin</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">Ethereum</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-purple-600">Solana</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-indigo-600">$REPAR</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 font-semibold text-gray-900">{row.feature}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.bitcoin}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.ethereum}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.solana}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-indigo-600">{row.repar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* $50T Simulation Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">$50 Trillion Equivalent Event Comparison</h2>
          <p className="text-gray-600 mb-6">
            What happens when each blockchain experiences a significant economic event equivalent to a $50 trillion settlement?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {$50TComparison.map((item, index) => (
              <div key={index} className={`p-6 rounded-lg ${item.coin === '$REPAR' ? 'bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-indigo-300' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-4 ${item.coin === '$REPAR' ? 'text-indigo-900' : 'text-gray-900'}`}>
                  {item.coin}
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Supply Change</p>
                    <div className="flex items-center space-x-2">
                      {getImpactIcon(item.supplyChange)}
                      <p className="font-semibold text-sm">{item.supplyChange}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Price Impact</p>
                    <div className="flex items-center space-x-2">
                      {getImpactIcon(item.priceImpact)}
                      <p className="font-semibold text-sm">{item.priceImpact}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Timeline</p>
                    <p className="font-semibold text-sm">{item.timeline}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Certainty</p>
                    <p className={`font-semibold text-sm ${item.certainty.includes('guaranteed') && item.coin === '$REPAR' ? 'text-green-600' : item.certainty.includes('negative') ? 'text-red-600' : 'text-yellow-600'}`}>
                      {item.certainty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Economic Model Power Rankings</h2>
          
          <div className="space-y-6">
            {rankings.map((item) => (
              <div key={item.rank} className="border rounded-lg p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl font-bold`}>
                      {item.rank}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Rating: <span className="font-bold text-indigo-600">{item.rating}</span></p>
                    </div>
                  </div>
                  {item.rank === 1 && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      WINNER
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-2">✓ Strengths:</p>
                    <ul className="space-y-1">
                      {item.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-2">✗ Weaknesses:</p>
                    <ul className="space-y-1">
                      {item.cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why $REPAR Wins */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="h-10 w-10 text-yellow-400" />
            <h2 className="text-3xl font-bold">Why $REPAR's Model Is Revolutionary</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">1. True Deflation vs. Disinflation</h3>
              <p className="text-purple-100">
                <strong>Bitcoin</strong> only slows the creation of new supply. <strong>Ethereum</strong> can reverse if usage drops. 
                <strong>Solana</strong> perpetually inflates. <strong>$REPAR</strong> burns existing supply with ZERO new issuance—creating 
                real, permanent scarcity.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">2. Value Tied to Mission, Not Speculation</h3>
              <p className="text-purple-100">
                Bitcoin and others are driven by market sentiment and speculation. <strong>$REPAR's value has a fundamental anchor: 
                the $131 Trillion debt.</strong> Its price appreciation is a direct measure of the mission's success, making it a more 
                stable and meaningful store of value.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">3. The Ultimate Scarcity</h3>
              <p className="text-purple-100">
                Bitcoin's scarcity is artificial and asymptotic—it will always have 21M supply. <strong>$REPAR's scarcity is absolute 
                and finite.</strong> The supply can, and is designed to, go to zero. This makes the last remaining coins infinitely 
                valuable in theory, creating unprecedented economic incentive.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">4. Aligned Incentives</h3>
              <p className="text-purple-100">
                <strong>Bitcoin holders</strong> wait passively. <strong>Ethereum holders</strong> benefit from network usage. 
                <strong>Solana holders</strong> must stake to avoid dilution. <strong>$REPAR holders actively enforce justice 
                and are rewarded mathematically.</strong> Every successful claim increases everyone's wealth.
              </p>
            </div>

            <div className="bg-yellow-400 text-purple-900 rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-bold mb-3">The Final Verdict</h3>
              <p className="text-lg font-semibold">
                If the Aequitas Zone's enforcement mechanism works even partially, the Justice Burn will create a supply shock 
                far more violent and a value appreciation curve far steeper than anything seen in Bitcoin's history.
              </p>
              <p className="mt-3">
                This isn't just a better economic model. It's the <strong>weaponization of deflation in the service of justice</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
