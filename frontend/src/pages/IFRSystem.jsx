import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, FileCheck, Database, Globe } from 'lucide-react';

export default function IFRSystem() {
  const [activeTab, setActiveTab] = useState('overview');

  const certifications = [
    {
      id: 1,
      defendantName: "Barclays Bank PLC",
      status: "Certified",
      certificationDate: "2024-09-15",
      certifiedBy: "International Forensic Registry",
      evidenceScore: 98,
      documentCount: 45,
      verificationLevel: "Triple-Verified"
    },
    {
      id: 2,
      defendantName: "Lloyd's of London",
      status: "Certified",
      certificationDate: "2024-09-12",
      certifiedBy: "International Forensic Registry",
      evidenceScore: 96,
      documentCount: 38,
      verificationLevel: "Triple-Verified"
    },
    {
      id: 3,
      defendantName: "JPMorgan Chase & Co.",
      status: "Under Review",
      certificationDate: null,
      certifiedBy: null,
      evidenceScore: 92,
      documentCount: 52,
      verificationLevel: "Double-Verified"
    }
  ];

  const verificationStandards = [
    {
      level: "Single-Verified",
      requirements: "Primary source documentation from national archives",
      trustScore: "70-79%"
    },
    {
      level: "Double-Verified",
      requirements: "Cross-referenced with secondary historical records + academic peer review",
      trustScore: "80-89%"
    },
    {
      level: "Triple-Verified",
      requirements: "Third-party forensic audit + blockchain timestamping + IPFS immutability",
      trustScore: "90-100%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12 text-emerald-400" />
            <div>
              <h1 className="text-4xl font-bold">International Forensic Registry (IFR)</h1>
              <p className="text-xl text-emerald-200">Certified Evidence & Verification Standards</p>
            </div>
          </div>
          <p className="text-sm text-emerald-300 mt-2">
            Independent certification body ensuring evidence integrity and historical accuracy
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {['overview', 'certifications', 'standards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <h3 className="text-lg font-bold">Certified Cases</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">187</p>
                <p className="text-sm text-gray-600 mt-2">Triple-verified evidence</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <h3 className="text-lg font-bold">Under Review</h3>
                </div>
                <p className="text-3xl font-bold text-yellow-600">13</p>
                <p className="text-sm text-gray-600 mt-2">Pending verification</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Evidence Items</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">8,452</p>
                <p className="text-sm text-gray-600 mt-2">Blockchain-secured</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">About the IFR</h3>
              <div className="prose max-w-none text-gray-700 space-y-3">
                <p>
                  The International Forensic Registry (IFR) is an independent certification body
                  that validates historical evidence of slavery-derived wealth. Operating under
                  ISO 17025 forensic standards, the IFR ensures:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Multi-tier verification of historical documents</li>
                  <li>Cross-reference with national archives and academic institutions</li>
                  <li>Blockchain timestamping for evidence immutability</li>
                  <li>IPFS decentralized storage for permanent record retention</li>
                  <li>Third-party forensic audits by certified historians</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cert.defendantName}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        cert.status === 'Certified' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cert.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        {cert.verificationLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">{cert.evidenceScore}%</div>
                    <div className="text-sm text-gray-600">Evidence Score</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Certification Date</p>
                    <p className="font-semibold">{cert.certificationDate || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Documents Verified</p>
                    <p className="font-semibold">{cert.documentCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Certified By</p>
                    <p className="font-semibold">{cert.certifiedBy || 'In Review'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Standards Tab */}
        {activeTab === 'standards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-emerald-600" />
                Verification Standards
              </h3>
              <div className="space-y-4">
                {verificationStandards.map((standard, idx) => (
                  <div key={idx} className="border-l-4 border-emerald-600 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{standard.level}</h4>
                      <span className="text-emerald-600 font-semibold">{standard.trustScore}</span>
                    </div>
                    <p className="text-gray-700">{standard.requirements}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Blockchain & IPFS Integration
              </h3>
              <p className="text-gray-700 mb-3">
                All certified evidence is secured using:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>SHA-256 hash verification on Cosmos blockchain</li>
                <li>IPFS permanent storage with content addressing</li>
                <li>Multi-signature verification from 3+ certified historians</li>
                <li>Timestamp proof using block headers</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
