import { FileText, Download, Search, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { regionalContributions, historicalData } from '../data/statistics';

export default function ForensicAudit() {
  const keyFindings = [
    {
      title: "UK Slavery-Derived Wealth",
      value: "£255B+",
      detail: "1.62% of total UK wealth, but 18-45% of foundational sectors",
      severity: "High"
    },
    {
      title: "Global Total",
      value: "$920B",
      detail: "Conservative estimate across all participating nations",
      severity: "Critical"
    },
    {
      title: "Compound Interest",
      value: "£1 = £115,000",
      detail: "18th century wealth compounded to today",
      severity: "High"
    },
    {
      title: "Genocidal Classification",
      value: "5/5 UN Criteria Met",
      detail: "No statute of limitations applies",
      severity: "Critical"
    }
  ];

  const legalFrameworks = [
    { name: "Genocide (UN Convention)", status: "All 5 criteria met", strength: "No statute of limitations" },
    { name: "Money Laundering", status: "Identical to cartel operations", strength: "Proceeds traceable" },
    { name: "Unjust Enrichment", status: "Constructive trust theory", strength: "Common law remedy" },
    { name: "UCC Commercial Law", status: "Proceeds tracing framework", strength: "Self-executing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Forensic Audit Explorer</h1>
          <p className="text-xl text-purple-200">205-Page Comprehensive Analysis of Transatlantic Slavery</p>
          <p className="text-sm text-amber-300 mt-2">Mathematical Precision • Legal Classification • Universal Accountability</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-600 mr-3 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-amber-900 mb-2">Universal Accountability Standard</h3>
              <p className="text-amber-800">
                "When African countries who participated pay, then all must pay" - This framework ensures that ALL participants, 
                European buyers, American exploiters, AND African sellers, are held equally accountable. No selective enforcement.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyFindings.map((finding, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                finding.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {finding.severity}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{finding.title}</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">{finding.value}</p>
              <p className="text-sm text-gray-600">{finding.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="mr-2 text-indigo-600" />
              Legal Classification Framework
            </h2>
            <p className="text-gray-600 mb-4">
              Multiple legal pathways ensure no escape routes for defendants
            </p>
            <div className="space-y-4">
              {legalFrameworks.map((framework, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 rounded">
                  <h3 className="font-bold text-lg">{framework.name}</h3>
                  <p className="text-sm text-gray-600">{framework.status}</p>
                  <p className="text-sm text-green-600 font-semibold mt-1">✓ {framework.strength}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Regional Contributions & Impact</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalContributions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="enslaved" fill="#ef4444" name="Enslaved People" />
                <Bar yAxisId="right" dataKey="profit" fill="#10b981" name="Elite Profit (£M)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Critical Context:</strong> Even regions whose elites "profited" suffered catastrophic demographic loss, 
                political destabilization, and long-term economic devastation. The net effect on Africa was overwhelmingly negative.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Key Evidence Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-indigo-600">Historical Documentation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Slave ship manifests</li>
                <li>• Insurance policies</li>
                <li>• Corporate ledgers</li>
                <li>• Property deeds</li>
                <li>• Compensation records (1833)</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-indigo-600">Economic Analysis</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Compound interest calculations</li>
                <li>• Corporate genealogy tracing</li>
                <li>• Asset flow tracking</li>
                <li>• Brattle Group harm quantification</li>
                <li>• Sector-specific percentages</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-indigo-600">Legal Precedents</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Genocide case law</li>
                <li>• Money laundering frameworks</li>
                <li>• Constructive trust rulings</li>
                <li>• UCC Article 9 applications</li>
                <li>• NYC Convention enforcement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Complete Audit Documentation</h2>
              <p className="text-gray-600">205-page forensic analysis with full citations</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold flex items-center transition">
              <Download className="mr-2 h-5 w-5" />
              Download Full Audit (PDF)
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-indigo-600">205</p>
              <p className="text-sm text-gray-600">Total Pages</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-indigo-600">1,000+</p>
              <p className="text-sm text-gray-600">Citations</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-indigo-600">200+</p>
              <p className="text-sm text-gray-600">Defendants Named</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-indigo-600">$131T</p>
              <p className="text-sm text-gray-600">Documented Harm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
