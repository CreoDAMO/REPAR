import { useState } from 'react';
import { Search, Building2, MapPin, TrendingUp, FileText } from 'lucide-react';
import { defendants } from '../data/defendants';

export default function Defendants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const categories = ['All', ...new Set(defendants.map(d => d.category))];
  const statuses = ['All', ...new Set(defendants.map(d => d.status))];

  const filteredDefendants = defendants.filter(defendant => {
    const matchesSearch = defendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         defendant.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || defendant.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || defendant.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const totalLiability = filteredDefendants.reduce((sum, d) => sum + d.slaveryDerivedWealth, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Defendant Database</h1>
          <p className="text-xl text-red-200">200+ Entities with Documented Slavery-Derived Wealth</p>
          <p className="text-sm text-amber-300 mt-2">Complete forensic audit with provable liability</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline h-4 w-4 mr-1" />
                Search Defendants
              </label>
              <input
                type="text"
                placeholder="Search by name or country..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between bg-indigo-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Showing {filteredDefendants.length} defendants</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalLiability)} Total Liability</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition">
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredDefendants.map((defendant) => (
            <div key={defendant.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold">{defendant.name}</h2>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {defendant.country}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{defendant.category}</span>
                    <span>Founded: {defendant.founded}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-600">{formatCurrency(defendant.slaveryDerivedWealth)}</p>
                  <p className="text-sm text-gray-600 mb-2">{defendant.percentage}% of current wealth</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    defendant.status === 'Active Defendant' ? 'bg-red-100 text-red-800' :
                    defendant.status === 'Settlement Discussions' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {defendant.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                      Evidence Summary
                    </h3>
                    <p className="text-sm text-gray-700">{defendant.evidence}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
                      Enforcement Strategy
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {defendant.filingJurisdictions.map((jurisdiction) => (
                        <span
                          key={jurisdiction}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {jurisdiction}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {defendant.descendantsImpacted.toLocaleString()} descendants impacted
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold transition">
                  View Full Audit
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold transition">
                  File Arbitration Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
