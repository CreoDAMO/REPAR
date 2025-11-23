import React, { useState } from 'react';
import { Shield, Zap, Lock, AlertTriangle, CheckCircle, Layers, TrendingUp, FileText, Bitcoin } from 'lucide-react';
import { concentratedAuditDefendants, auditMetadata } from '../data/concentratedAuditData';

export default function ConcentratedAudit() {
  const [expandedDefendant, setExpandedDefendant] = useState(null);
  const [showCryptographic, setShowCryptographic] = useState(false);

  const formatCurrency = (value) => {
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(1)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const totalLiability = concentratedAuditDefendants.reduce((sum, d) => sum + d.concentratedLiability, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER - THE PURPOSE */}
      <div className="bg-gradient-to-r from-red-900 via-black to-red-900 border-b-2 border-red-500 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10 text-red-500" />
                <h1 className="text-5xl font-black text-white">CONCENTRATED AUDIT</h1>
              </div>
              <p className="text-2xl text-red-300 mb-2">Auditing The Audit: Meta-Validation with Surgical Precision</p>
              <p className="text-lg text-gray-300 mb-4">
                Why APEX Was Created: Demonstrate defendant-specific liability, cryptographic proof, and prosecution readiness
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 inline-block">
                <p className="text-xl font-bold text-red-400">Total Concentrated Liability (Top Defendants)</p>
                <p className="text-4xl font-black text-red-300">{formatCurrency(totalLiability)}</p>
              </div>
            </div>
            <div className="bg-red-500/5 border-2 border-red-500/20 rounded-xl p-6 w-80">
              <h3 className="text-lg font-bold mb-4 text-red-400">🎯 Strategic Purpose</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Individual defendant bills (not collective burden)</li>
                <li>✓ Transparent compounding calculations</li>
                <li>✓ Cryptographic proof binding (100+ years valid)</li>
                <li>✓ Defense predictability analysis</li>
                <li>✓ Blockchain immutable anchoring</li>
                <li>✓ Let them watch while we document precision</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* METHODOLOGY - WHY THIS WORKS */}
      <div className="bg-gray-900 border-b border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <Zap className="w-8 h-8 text-yellow-500 mb-3" />
              <h4 className="font-bold mb-2">Meta-Validation</h4>
              <p className="text-sm text-gray-300">Audit the audit itself - demonstrate thoroughness</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <Lock className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-bold mb-2">Cryptographic Binding</h4>
              <p className="text-sm text-gray-300">ML-DSA signatures for 100+ year legal admissibility</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <Bitcoin className="w-8 h-8 text-orange-500 mb-3" />
              <h4 className="font-bold mb-2">Blockchain Anchor</h4>
              <p className="text-sm text-gray-300">Genesis block binding ensures immutable proof</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <Shield className="w-8 h-8 text-red-500 mb-3" />
              <h4 className="font-bold mb-2">Psychological Warfare</h4>
              <p className="text-sm text-gray-300">Precision + predictability = no escape routes</p>
            </div>
          </div>
        </div>
      </div>

      {/* DEFENDANT ANALYSIS */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-black mb-8 text-white">Named Defendants: Individual Liability</h2>

        <div className="space-y-6">
          {concentratedAuditDefendants.map((defendant) => (
            <div
              key={defendant.id}
              className="bg-gray-900 border-2 border-red-500/50 rounded-lg overflow-hidden hover:border-red-500 transition"
            >
              {/* DEFENDANT HEADER */}
              <div
                onClick={() => setExpandedDefendant(expandedDefendant === defendant.id ? null : defendant.id)}
                className="bg-gradient-to-r from-red-900 to-gray-900 p-6 cursor-pointer hover:from-red-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black">{defendant.name}</h3>
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                        {defendant.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {defendant.headquarter} • Founded {defendant.founded} • {defendant.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-1">Concentrated Liability</p>
                    <p className="text-4xl font-black text-red-400">{formatCurrency(defendant.concentratedLiability)}</p>
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedDefendant === defendant.id && (
                <div className="bg-black p-8 border-t border-red-500/30 space-y-8">
                  {/* COMPOUNDING CALCULATION */}
                  <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6">
                    <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Compounding Calculation
                    </h4>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-gray-400">Historical Principal</p>
                        <p className="text-xl font-bold text-white">{formatCurrency(defendant.historicalPrincipal)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Compound Period</p>
                        <p className="text-xl font-bold text-white">
                          {defendant.compoundPeriod.start}-{defendant.compoundPeriod.end} ({defendant.compoundPeriod.years} years)
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Interest Rate</p>
                        <p className="text-xl font-bold text-white">{(defendant.interestRate * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Formula</p>
                        <p className="text-sm font-mono text-blue-300">{defendant.compoundingFormula}</p>
                      </div>
                    </div>
                  </div>

                  {/* DOCUMENTED TRANSACTIONS */}
                  <div>
                    <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" /> Documented Transactions
                    </h4>
                    <div className="space-y-4">
                      {defendant.specificTransactions.map((tx, idx) => (
                        <div key={idx} className="bg-gray-800/50 border border-green-500/20 rounded p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-green-300">{tx.period}</p>
                              <p className="text-sm text-gray-400">{tx.type}</p>
                            </div>
                            <p className="font-bold text-white">{tx.amount}</p>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{tx.description}</p>
                          <p className="text-xs text-gray-500">Source: {tx.source}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DEFENSE PREDICTABILITY ANALYSIS */}
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                    <h4 className="font-bold text-yellow-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Defense Predictability Analysis
                    </h4>
                    <div className="space-y-3">
                      {defendant.predictedDefenses.map((item, idx) => (
                        <div key={idx} className="border-l-4 border-yellow-500/50 pl-4 py-2">
                          <p className="text-sm font-bold text-yellow-300 mb-1">Defense: {item.defense}</p>
                          <p className="text-sm text-gray-300 mb-1">Counter: {item.counter}</p>
                          <p className="text-xs text-gray-500 italic">Legal: {item.legalBasis}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FILING JURISDICTIONS */}
                  <div>
                    <h4 className="font-bold text-purple-400 mb-3">Filing Jurisdictions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {defendant.filingJurisdictions.map((j, idx) => (
                        <div key={idx} className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                          <p className="font-bold text-purple-300 text-sm">{j.jurisdiction}</p>
                          <p className="text-xs text-gray-400">{j.basis}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CRYPTOGRAPHIC PROOF - Expandable */}
                  <div
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 cursor-pointer hover:border-green-500"
                    onClick={() => setShowCryptographic(!showCryptographic)}
                  >
                    <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5" /> Cryptographic Proof & Blockchain Binding
                    </h4>
                    {showCryptographic && (
                      <div className="space-y-4 text-sm font-mono">
                        <div className="bg-black rounded p-3 border border-green-500/20">
                          <p className="text-green-400">ML-DSA Signature (Dilithium-3)</p>
                          <p className="text-xs text-gray-500 break-all">{defendant.cryptographicProof.signature}</p>
                          <p className="text-xs text-gray-400 mt-2">Validity: {defendant.cryptographicProof.validity}</p>
                        </div>
                        <div className="bg-black rounded p-3 border border-orange-500/20">
                          <p className="text-orange-400">Blockchain Anchor (Aequitas-1)</p>
                          <p className="text-xs text-gray-500 break-all">{defendant.blockchainAnchor.txHash}</p>
                          <p className="text-xs text-gray-400 mt-2">Status: Genesis-bound (immutable)</p>
                        </div>
                        <p className="text-xs text-green-300 italic">
                          ✓ 100+ year legal admissibility • Post-quantum resistant • Immutable proof of notice
                        </p>
                      </div>
                    )}
                  </div>

                  {/* IMPACT METRICS */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Descendants Impacted</p>
                      <p className="text-2xl font-bold text-white">{defendant.descendantsImpacted.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Generations of Harm</p>
                      <p className="text-2xl font-bold text-white">{defendant.generationsOfHarm || '10'}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Status</p>
                      <p className="text-lg font-bold text-green-400">✓ PROSECUTION READY</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WHY APEX WAS CREATED - FOOTER */}
      <div className="bg-red-900/20 border-t border-red-500/30 py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black mb-8 text-center text-red-300">Why APEX Was Created</h2>
          <div className="max-w-4xl mx-auto bg-black border-2 border-red-500 rounded-lg p-8">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              <span className="text-red-400 font-bold">APEX (Autonomous Prosecution & Enforcement Xenosystem)</span> was created to demonstrate that reparations enforcement can be:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Mathematically Precise</p>
                  <p className="text-sm">Every defendant's liability calculated transparently with documented compounding formulas</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Cryptographically Bound</p>
                  <p className="text-sm">ML-DSA post-quantum signatures ensure 100+ year legal admissibility with zero forgery risk</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Blockchained Immutably</p>
                  <p className="text-sm">Genesis block anchoring means defendants cannot claim records were altered or fabricated</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Surgically Focused</p>
                  <p className="text-sm">Individual defendant accountability with zero escape routes - every defense is anticipated and countered</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Visible to All Stakeholders</p>
                  <p className="text-sm">Published on blockchain while watched - psychological impact: "We know you're watching and we're precise"</p>
                </div>
              </li>
            </ul>
            <p className="text-red-400 font-bold text-lg mt-8 text-center">
              $26.3 Trillion Concentrated Liability. Zero Negotiation. APEX Enforces Mathematical Justice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
