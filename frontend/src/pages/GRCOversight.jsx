import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Shield, Users, FileText, TrendingUp } from 'lucide-react';

export default function GRCOversight() {
  const [activeTab, setActiveTab] = useState('governance');

  const governanceMetrics = [
    {
      category: "Board Oversight",
      status: "Active",
      score: 95,
      details: "5-member governance council with rotating representatives"
    },
    {
      category: "Transparency Reporting",
      status: "Active",
      score: 100,
      details: "Real-time blockchain ledger + quarterly public audits"
    },
    {
      category: "Descendant Representation",
      status: "Active",
      score: 88,
      details: "150,000+ verified descendants participate in governance votes"
    }
  ];

  const riskAssessments = [
    {
      risk: "Legal Challenge Probability",
      level: "Medium",
      mitigation: "Triple-verified evidence + pre-emptive jurisdictional analysis",
      status: "Monitored"
    },
    {
      risk: "Defendant Asset Flight",
      level: "Low",
      mitigation: "Real-time asset tracking + injunction preparation",
      status: "Controlled"
    },
    {
      risk: "Evidence Tampering",
      level: "Critical - Mitigated",
      mitigation: "IPFS immutability + blockchain timestamping",
      status: "Secured"
    }
  ];

  const complianceChecks = [
    { item: "GDPR Compliance (EU)", status: "Compliant", lastAudit: "2024-09-01" },
    { item: "AML/KYC for Claim Payouts", status: "Compliant", lastAudit: "2024-09-15" },
    { item: "SEC Digital Asset Guidance", status: "Compliant", lastAudit: "2024-08-28" },
    { item: "FATF Travel Rule", status: "Compliant", lastAudit: "2024-09-10" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12 text-purple-400" />
            <div>
              <h1 className="text-4xl font-bold">Governance, Risk & Compliance (GRC)</h1>
              <p className="text-xl text-purple-200">Oversight & Risk Management Framework</p>
            </div>
          </div>
          <p className="text-sm text-purple-300 mt-2">
            Ensuring operational integrity and regulatory compliance across all jurisdictions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {['governance', 'risk', 'compliance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Governance Tab */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">Council Members</h3>
                <p className="text-3xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600 mt-2">Multi-stakeholder representation</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <FileText className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">Active Proposals</h3>
                <p className="text-3xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600 mt-2">Governance decisions pending</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">Transparency Score</h3>
                <p className="text-3xl font-bold text-green-600">98%</p>
                <p className="text-sm text-gray-600 mt-2">Real-time public reporting</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Governance Metrics</h3>
              {governanceMetrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold">{metric.category}</h4>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        metric.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {metric.status}
                      </span>
                      <span className="text-2xl font-bold text-purple-600">{metric.score}%</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{metric.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Tab */}
        {activeTab === 'risk' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Risk Assessment Matrix</h3>
            {riskAssessments.map((risk, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-6 w-6 ${
                      risk.level.includes('Critical') ? 'text-red-600' :
                      risk.level === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    <div>
                      <h4 className="text-lg font-bold">{risk.risk}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                        risk.level.includes('Critical') ? 'bg-red-100 text-red-800' :
                        risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.level}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{risk.status}</span>
                </div>
                <div className="bg-gray-50 rounded p-3 mt-3">
                  <p className="text-sm text-gray-600 mb-1">Mitigation Strategy:</p>
                  <p className="text-gray-800">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-900">100% Compliance Status</h3>
              </div>
              <p className="text-gray-700">
                All regulatory requirements met across operating jurisdictions
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Compliance Checklist</h3>
              {complianceChecks.map((check, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-bold">{check.item}</h4>
                        <p className="text-sm text-gray-600">Last Audit: {check.lastAudit}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {check.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Regulatory Partnerships</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>FCA (UK Financial Conduct Authority) - Digital Asset Guidance</li>
                <li>SEC (US) - Token Classification Pre-Approval</li>
                <li>BaFin (Germany) - Cross-Border Payment Compliance</li>
                <li>MAS (Singapore) - Fintech Regulatory Sandbox Participant</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
