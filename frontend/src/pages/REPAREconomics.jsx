import { useState } from 'react';
import { TrendingUp, DollarSign, Flame, Calculator, ChevronRight } from 'lucide-react';

export default function REPAREconomics() {
  const [debtPaid, setDebtPaid] = useState(50);
  
  const TOTAL_SUPPLY = 131;
  const INITIAL_PRICE = 18.33;
  const MARKET_CAP = 2400;
  
  const calculateBurn = (debt) => {
    const burned = debt;
    const newSupply = TOTAL_SUPPLY - burned;
    const newPrice = newSupply > 0 ? MARKET_CAP / newSupply : 0;
    const priceIncrease = ((newPrice - INITIAL_PRICE) / INITIAL_PRICE) * 100;
    
    return {
      burned,
      newSupply,
      newPrice: newPrice.toFixed(2),
      priceIncrease: priceIncrease.toFixed(1),
      supplyReduction: ((burned / TOTAL_SUPPLY) * 100).toFixed(1)
    };
  };
  
  const burnData = calculateBurn(debtPaid);
  
  const scenarios = [
    { debt: 1, name: "First Major Settlement", desc: "$1 Trillion Paid" },
    { debt: 13.1, name: "10% Debt Paid", desc: "$13.1 Trillion Paid" },
    { debt: 65.5, name: "50% Debt Paid", desc: "$65.5 Trillion Paid" },
    { debt: 117.9, name: "90% Debt Paid", desc: "$117.9 Trillion Paid" },
    { debt: 130, name: "Final 1% Remaining", desc: "$130 Trillion Paid" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-12 w-12 text-green-400" />
            <h1 className="text-4xl font-bold">$REPAR Economics</h1>
          </div>
          <p className="text-xl text-purple-200">The Mathematics of Justice-Enforced Value</p>
          <p className="text-sm text-amber-300 mt-2">Understanding the most powerful deflationary mechanism in history</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Current Value Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Current Currency Value of $REPAR</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Total Supply</p>
              <p className="text-3xl font-bold text-purple-600">131 Trillion</p>
              <p className="text-xs text-gray-500 mt-1">131,000,000,000,000 $REPAR</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Current Price</p>
              <p className="text-3xl font-bold text-green-600">$18.33</p>
              <p className="text-xs text-gray-500 mt-1">per $REPAR</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Market Capitalization</p>
              <p className="text-3xl font-bold text-blue-600">$2.4 Quadrillion</p>
              <p className="text-xs text-gray-500 mt-1">Total potential claim value</p>
            </div>
          </div>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-sm text-amber-900">
              <strong>What This Means:</strong> This represents the full, un-remedied debt of the transatlantic slave trade, 
              now tokenized and quantified on a sovereign blockchain. It is the largest valuation of any asset in human history 
              because it is pegged to the largest crime in human history.
            </p>
          </div>
        </div>

        {/* Justice Burn Simulator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">Justice Burn Simulator</h2>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Debt Payment Amount (Trillions)
            </label>
            <input
              type="range"
              min="0"
              max="130"
              value={debtPaid}
              onChange={(e) => setDebtPaid(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">$0T</span>
              <span className="text-lg font-bold text-indigo-600">${debtPaid}T</span>
              <span className="text-sm text-gray-600">$130T</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <div className="flex items-center space-x-2 mb-3">
                <Flame className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">REPAR Burned</h3>
              </div>
              <p className="text-4xl font-bold text-red-600 mb-2">{burnData.burned}T</p>
              <p className="text-sm text-red-700">Supply Reduction: {burnData.supplyReduction}%</p>
              <p className="text-xs text-gray-600 mt-2">For every $1 paid, 1 REPAR is permanently destroyed</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900">New REPAR Price</h3>
              </div>
              <p className="text-4xl font-bold text-green-600 mb-2">${burnData.newPrice}</p>
              <p className="text-sm text-green-700">Value Increase: +{burnData.priceIncrease}%</p>
              <p className="text-xs text-gray-600 mt-2">Mathematically guaranteed increase</p>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-50 p-6 rounded-lg">
            <h4 className="font-bold text-indigo-900 mb-3">Impact Breakdown:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Remaining Supply:</p>
                <p className="font-bold text-indigo-900">{burnData.newSupply} Trillion REPAR</p>
              </div>
              <div>
                <p className="text-gray-600">Price per REPAR:</p>
                <p className="font-bold text-indigo-900">${burnData.newPrice}</p>
              </div>
              <div>
                <p className="text-gray-600">Descendant Wealth Increase (43% holders):</p>
                <p className="font-bold text-green-600">+{burnData.priceIncrease}%</p>
              </div>
              <div>
                <p className="text-gray-600">Average per 150,000 Descendants:</p>
                <p className="font-bold text-green-600">${((burnData.newSupply * burnData.newPrice * 0.43 * 1000) / 150).toFixed(2)}B</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Scenarios */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Key Payment Scenarios</h2>
          
          <div className="space-y-4">
            {scenarios.map((scenario, index) => {
              const data = calculateBurn(scenario.debt);
              return (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{scenario.name}</h3>
                      <p className="text-gray-600">{scenario.desc}</p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Burned</p>
                      <p className="font-bold text-red-600">{data.burned}T REPAR</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">New Supply</p>
                      <p className="font-bold text-indigo-600">{data.newSupply}T REPAR</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">New Price</p>
                      <p className="font-bold text-green-600">${data.newPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Value Increase</p>
                      <p className="font-bold text-green-600">+{data.priceIncrease}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Justice Burn Mechanism */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">The Justice Burn Mechanism</h2>
          
          <div className="prose max-w-none">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3">How It Works</h3>
              <p className="text-purple-800 mb-4">
                For every <strong>$1 USD of reparations debt paid</strong> by defendants, exactly <strong>1 $REPAR</strong> is 
                permanently burned and removed from the total supply.
              </p>
              <p className="text-purple-800">
                This creates a powerful deflationary pressure. As the supply decreases, the value of the remaining coins 
                is mathematically forced to increase, assuming the total value of the claim remains constant or grows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <h4 className="font-bold text-blue-900">Success Breeds Value</h4>
                </div>
                <p className="text-sm text-blue-800">
                  Every legal victory and debt payment directly increases the value of every remaining $REPAR coin
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h4 className="font-bold text-green-900">Value Creates Power</h4>
                </div>
                <p className="text-sm text-green-800">
                  Increased value provides more resources for enforcement, legal actions, and descendant support
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Flame className="h-6 w-6 text-purple-600" />
                  <h4 className="font-bold text-purple-900">Power Enables Success</h4>
                </div>
                <p className="text-sm text-purple-800">
                  Greater power leads to more successful claims, creating a self-reinforcing cycle of justice
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">The Deflationary Economic Singularity</h3>
              <p className="text-lg text-indigo-100 mb-4">
                You have not just created a currency; you have created a <strong>deflationary economic singularity</strong> powered 
                by the enforcement of historical justice.
              </p>
              <p className="text-indigo-100">
                The more justice is served, the more valuable the system becomes for its participants. It is the perfect incentive structure: 
                financial self-interest aligned with moral imperative.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
