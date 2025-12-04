
import { useState } from 'react';
import { FileText, Download, ExternalLink, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOVEREIGN_DOCUMENTS } from '../data/sovereignDocuments';

export default function BlackPaper() {
  const [activeSection, setActiveSection] = useState('abstract');
  
  // Link to IPFS sovereign documents
  const financialBreakdown = SOVEREIGN_DOCUMENTS.financialBreakdown;

  const sections = [
    { id: 'abstract', title: 'Abstract', icon: FileText },
    { id: 'premise', title: '1. The Premise', icon: FileText },
    { id: 'value', title: '2. Value Creation', icon: FileText },
    { id: 'legal', title: '3. Legal Framework', icon: FileText },
    { id: 'technical', title: '4. Technical Architecture', icon: FileText },
    { id: 'economics', title: '5. The Economics', icon: FileText },
    { id: 'enforcement', title: '6. Enforcement', icon: FileText },
    { id: 'conclusion', title: 'Conclusion', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Black Paper v1.1</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">The Aequitas Protocol Black Paper</h1>
          <p className="text-xl text-indigo-200 mb-2">Version 1.1 (Mainnet Launch Edition)</p>
          <p className="text-sm text-amber-300 mb-6">
            "A Sovereign Protocol for the Enforcement of Reparative Justice"
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/sovereign-documents"
              className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <FileText className="w-5 h-5" />
              View Sovereign Documents (IPFS)
            </Link>
            {financialBreakdown && (
              <a
                href={financialBreakdown.ipfsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <Download className="w-5 h-5" />
                Financial Breakdown ($2.401Q)
              </a>
            )}
            <a
              href="https://github.com/aequitas-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              <ExternalLink className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-900 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                {activeSection === 'abstract' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Abstract</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Aequitas Protocol is a sovereign Layer-1 blockchain built to enforce and collect the{' '}
                      <strong className="text-indigo-600">$131 trillion debt</strong> owed for the transatlantic slave
                      trade—a crime classified as <strong>genocide</strong> under international law.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In an unprecedented feat of lean innovation, the entire multi-billion dollar system was developed
                      with <strong>zero capital expenditure</strong> by its founder in collaboration with AI, proving that
                      a singular vision can challenge global systems without permission.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Aequitas moves beyond advocacy to create a decentralized, autonomous, and unstoppable machine for
                      justice, powered by its native coin, <strong className="text-amber-600">$REPAR</strong>. It is a
                      system where the enforcement of historical justice is inextricably linked to the creation of economic
                      value through a revolutionary deflationary mechanism, the "Justice Burn."
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                      <p className="text-xl font-bold text-amber-900 italic">
                        "We are not asking for reparations. We have built the system to collect them."
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Highlights</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Total Liability:</strong> $131 Trillion USD mathematically traced and documented</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Traceable Wealth:</strong> $920+ Billion identified in 200+ specific entities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Development Cost:</strong> $0 USD (vs. $3.2M market-rate build cost)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Pre-Launch Valuation:</strong> $10-12 Billion USD</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Legal Framework:</strong> Multi-jurisdiction enforcement across 172 countries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Chain ID:</strong> aequitas-1 (Cosmos) / 1619 (EVM)</span>
                      </li>
                    </ul>
                    <div className="bg-indigo-50 rounded-lg p-6 my-8">
                      <h4 className="text-lg font-bold text-indigo-900 mb-3">Official Resources</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Domain:</strong>{' '}
                          <a href="https://aequitasprotocol.zone" className="text-indigo-600 hover:underline">
                            https://aequitasprotocol.zone
                          </a>
                        </p>
                        <p><strong>Author:</strong> Jacque Antoine DeGraff</p>
                        <p><strong>Date:</strong> October 19, 2025</p>
                        <p><strong>Version:</strong> 1.1 (Mainnet Launch Edition - FINAL)</p>
                      </div>
                    </div>
                  </>
                )}

                {activeSection === 'premise' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">1. The Premise</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The transatlantic slave trade represents the largest wealth transfer in human history. Over 12.5 million Africans were forcibly enslaved, generating approximately $131 trillion USD in unpaid labor over 400 years.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      This debt remains legally unpaid. The Aequitas Protocol is built on the premise that this historical injustice can be mathematically calculated, legally enforced, and permanently settled through a blockchain-based system.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Sovereignty demands that reparations enforcement cannot depend on external platforms or governments. The protocol must be platform-agnostic, executing on distributed nodes via satellite protocol, ensuring no entity can shut down justice collection.
                    </p>
                  </>
                )}

                {activeSection === 'value' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Value Creation</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Aequitas creates value through multiple mechanisms:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Justice Burn:</strong> Deflationary mechanism where 10% of all transactions burn, increasing $REPAR value as reparations are collected</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>DEX Trading Fees:</strong> Founder Wallet DEX generates revenue for validator subsidies and operational costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Claims Arbitration:</strong> Smart contract enforcement of reparations claims with cryptographic proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Token Appreciation:</strong> Limited supply (131 trillion) with increasing demand as enforcement begins</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      The system is designed so that enforcing justice directly increases the wealth of $REPAR holders, aligning incentives for reparations collection.
                    </p>
                  </>
                )}

                {activeSection === 'legal' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Legal Framework</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Aequitas Protocol operates under a multi-jurisdiction legal framework:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Wyoming DUNA:</strong> Decentralized Unincorporated Nonprofit Association for network governance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>BRCA (Blockchain Reparations Claim Authority):</strong> Constitutional enforcement of reparations arbitration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>FRE 901 Evidence Standards:</strong> All records secured with cryptographic proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>International Law:</strong> Enforcement across 172 countries with treaty recognition</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeSection === 'technical' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Technical Architecture</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Aequitas is built on platform-agnostic architecture:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>ACE Blockchain:</strong> Cosmos SDK Layer-1 with Tendermint BFT consensus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>AVM (Aequitas Virtual Machine):</strong> Constellation nodes executing via satellite protocol</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>ASSP (Aequitas Satellite Protocol):</strong> Software-defined satellite layer for cross-constellation coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>APEX System:</strong> Constitutional AI with 25 axioms, local LLM ensemble (Llama 3.1, Mistral, Phi-3, DeepSeek)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Post-Quantum Cryptography:</strong> ML-KEM-768 + ML-DSA-65 + AES-256-GCM</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeSection === 'economics' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">5. The Economics</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The economic model aligns incentives for reparations enforcement:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>$REPAR Supply:</strong> 131 trillion (matching debt amount in USD)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Validator Subsidies:</strong> Monthly payments from DEX Treasury funded by trading fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Justice Burn Mechanism:</strong> 10% of transactions burn, creating deflation as claims are paid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Pre-Launch Valuation:</strong> $10-12 Billion USD based on enforcement roadmap</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      As the protocol enforces reparations claims, the burning mechanism increases $REPAR scarcity, driving coin appreciation for holders who funded the enforcement infrastructure.
                    </p>
                  </>
                )}

                {activeSection === 'enforcement' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Enforcement</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The protocol enforces reparations through multiple mechanisms:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Concentrated Audit System:</strong> Calculates defendant-specific liability with cryptographic proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Vulnerability Detection:</strong> ACE constellation nodes identify financial vulnerabilities in defendants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Threat Analysis:</strong> APEX LLM analyzes enforcement tactics on AVM nodes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Patch Generation:</strong> Automated reparations strategy generation on constellation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span><strong>Legal Automation:</strong> Self-executing smart contracts for claim arbitration and payment</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeSection === 'conclusion' && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Aequitas Protocol represents a fundamental shift in how historical injustice is addressed. Rather than relying on political will or charitable institutions, it creates an autonomous, mathematically-enforced system that makes reparations collection economically rational.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      By operating on platform-agnostic infrastructure (constellation nodes via satellite protocol), the system cannot be shut down by any single government or corporation. Justice becomes an executable algorithm on the Aequitas Network.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The economic alignment ensures that those who fund enforcement infrastructure benefit directly as $REPAR appreciates through the Justice Burn mechanism—making the enforcement of reparations the most profitable mission in blockchain history.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                      <p className="text-lg font-bold text-amber-900 italic">
                        "Justice delayed is justice denied, but mathematics is eternal."
                      </p>
                    </div>
                  </>
                )}

                <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
                  <p className="text-sm text-gray-600 italic">
                    Aequitas Protocol v1.1 | Author: Jacque Antoine DeGraff | Date: October 19, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
