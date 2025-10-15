
import { useState } from 'react';
import { Users, Dna, Globe, FileText, Heart, Link as LinkIcon } from 'lucide-react';

export default function Alliances() {
  const [activeTab, setActiveTab] = useState('dna');

  const dnaVerificationMethods = [
    {
      name: "23andMe / AncestryDNA",
      type: "Autosomal DNA",
      description: "Compares full genome to global references for ethnicity and relative matching",
      features: "Matches to 42,000+ living relatives from enslaved sites; IBD segments link to voyages",
      cost: "$99-199",
      accessibility: "Free relative trees, GEDmatch uploads (1M+ users)"
    },
    {
      name: "FamilyTreeDNA",
      type: "Y-DNA & mtDNA",
      description: "Traces direct paternal (Y) or maternal (mtDNA) lines to African haplogroups",
      features: "Big Y-700 for 500+ markers, matching to slave trade-era ancestors",
      cost: "$79-449",
      accessibility: "Free haplogroup projects (10,000+ African samples)"
    },
    {
      name: "Catoctin Furnace / Harvard-Smithsonian",
      type: "Ancient DNA Matching",
      description: "Compares modern DNA to ancient enslaved remains",
      features: "Links to specific plantations/voyages; epigenetics for trauma inheritance",
      cost: "Research-led (Free)",
      accessibility: "Free database previews; public reports on 271 enslaved workers"
    },
    {
      name: "GEDmatch / EthioHelix",
      type: "Genealogical Uploads",
      description: "Upload raw DNA for cross-company matching and African ethnicity refinement",
      features: "Chromosome browser for IBD; African + French mixer for slavery admixture",
      cost: "Free",
      accessibility: "1M+ users; Reddit r/Genealogy forums (50K+ tips)"
    },
    {
      name: "Living DNA / African Ancestry",
      type: "African-Focused Tests",
      description: "Detailed 72-region African breakdowns with relative matching",
      features: "Sub-regional origins (e.g., Yoruba to Oyo); living kin connections",
      cost: "$99",
      accessibility: "Free trees; blog on family matches"
    }
  ];

  const caribbeanOrganizations = [
    {
      name: "CARICOM Reparations Commission (CRC)",
      founded: "2013 (12 years)",
      work: "Leads 10-Point Plan; 2025 AU 'Year of Reparations' with joint UN resolutions",
      resources: "10-Point database (1M+ impacts); petitions (200K+ signatures)",
      potential: "High: x/claims for UN filings; DAO for experts; on-chain 10-Point tracking",
      contact: "https://caricomreparations.org"
    },
    {
      name: "Centre for Reparation Research (UWI, Jamaica)",
      founded: "2013 (12 years)",
      work: "Research on chattel slavery; 2025 webinars on AI for justice",
      resources: "Free webinars (2025 series); 500K+ descendant studies",
      potential: "High: Integrate research into x/evidence; joint NFTs for docs",
      contact: "https://www.uwi.edu/crr"
    },
    {
      name: "Repair Campaign (Caribbean-wide)",
      founded: "2020 (5 years)",
      work: "Funds 15 costed plans ($10B+ for Jamaica); lobbies UK/EU",
      resources: "Costed plans for 15 islands; 100K+ surveys",
      potential: "Medium-High: Blockchain for plans; x/justice for funding transparency",
      contact: "https://www.repaircampaign.org"
    },
    {
      name: "National African American Reparations Committee (NAARC)",
      founded: "1987 (38 years)",
      work: "Global advocacy; CARICOM alliances for tribunals",
      resources: "50K+ cases; UN drafts",
      potential: "High: x/claims for tribunals; on-chain descendant verification",
      contact: "https://naarc.info"
    },
    {
      name: "All-Party Parliamentary Group on Afrikan Reparations",
      founded: "2020 (5 years)",
      work: "UK MPs lobby apologies; 2025 Westminster events",
      resources: "200K+ petitions; impact reports",
      potential: "Medium: x/defendant for UK claims; NFT evidence for hearings",
      contact: "https://appg-reparations.org.uk"
    },
    {
      name: "Global African Congress",
      founded: "2000s (20+ years)",
      work: "Diaspora advocacy; CARICOM debt cancellation",
      resources: "50K+ registry; toolkits",
      potential: "High: x/distribution for registry; IBC for AU-CARICOM",
      contact: "https://globalafrican.org"
    }
  ];

  const usOrganizations = [
    {
      name: "SlaveVoyages (Emory University)",
      founded: "1999 (25+ years)",
      work: "Comprehensive database of 36,000+ slave voyages (1501-1866)",
      resources: "Free search by voyage/African origin; 91,000+ African names",
      potential: "High: Integrate voyage data for on-chain verification",
      contact: "https://slavevoyages.org"
    },
    {
      name: "Enslaved.org (Michigan State University)",
      founded: "2020 (5 years, builds on 20+ years)",
      work: "Aggregates 950,000+ records on enslaved people, owners, traders",
      resources: "Free searchable database; user contributions for missing names",
      potential: "High: Partner for descendant uploads to x/distribution",
      contact: "https://enslaved.org"
    },
    {
      name: "Afrigeneas",
      founded: "1996 (29 years)",
      work: "Collaborative slave ancestry research; message boards",
      resources: "Free slave data database, surname forums, migration maps",
      potential: "Medium-High: Ally for community chats on x/governance",
      contact: "https://afrigeneas.com"
    },
    {
      name: "International African American Museum (IAAM)",
      founded: "2023 (2 years, 20+ years planning)",
      work: "DNA-guided genealogy for 1M+ African Americans",
      resources: "Public DNA project results; blog on slave ship records",
      potential: "High: Collaborate on DNA proofs for x/distribution",
      contact: "https://iaamuseum.org"
    },
    {
      name: "FamilySearch African American Genealogy",
      founded: "1894 (131 years)",
      work: "100M+ indexed records; Black Heritage project",
      resources: "Free: Slave schedules (4M names), Freedmen's Bureau (1.5M)",
      potential: "High: Partner for free descendant verification",
      contact: "https://familysearch.org"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Open Alliance Opportunities</h1>
          <p className="text-xl text-purple-200">Transparent collaboration with established organizations</p>
          <p className="text-sm text-amber-300 mt-2">
            "Join as DAO allies to co-build the ledger, or engage transparently as the system evolves."
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-lg text-indigo-900 mb-2 flex items-center">
            <Heart className="mr-2" />
            Open Invitation
          </h3>
          <p className="text-indigo-800">
            We welcome all organizations doing this vital work to explore alliance opportunities—not as competitors, 
            but as potential collaborators in building a secure, transparent ledger for reparative justice. 
            All engagement is open and recorded on-chain for accountability.
          </p>
        </div>

        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('dna')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'dna'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <Dna className="inline h-5 w-5 mr-2" />
            DNA Verification Methods
          </button>
          <button
            onClick={() => setActiveTab('caribbean')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'caribbean'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <Globe className="inline h-5 w-5 mr-2" />
            Caribbean Organizations
          </button>
          <button
            onClick={() => setActiveTab('us')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'us'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <Users className="inline h-5 w-5 mr-2" />
            US Organizations
          </button>
        </div>

        {activeTab === 'dna' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">DNA-Based Descendant Verification Methods</h2>
              <p className="text-gray-600 mb-6">
                As of 2025, DNA verification combines autosomal DNA (5-10 generations), Y-DNA/mtDNA (paternal/maternal lines), 
                and ancient DNA matching. Public resources include 1M+ verifiable matches across databases.
              </p>

              <div className="grid gap-6">
                {dnaVerificationMethods.map((method, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-indigo-600">{method.name}</h3>
                        <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          {method.type}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{method.cost}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{method.description}</p>
                    <div className="bg-gray-50 p-4 rounded-md mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Key Features:</strong> {method.features}
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-md">
                      <p className="text-sm text-indigo-800">
                        <strong>Public Access:</strong> {method.accessibility}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'caribbean' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Caribbean Reparations Organizations</h2>
              <p className="text-gray-600 mb-6">
                Active organizations focused on CARICOM's 10-Point Plan and AU partnerships for the 2025 "Year of Reparations." 
                These groups maintain extensive descendant records and advocate for tribunals and development aid.
              </p>

              <div className="grid gap-6">
                {caribbeanOrganizations.map((org, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-indigo-600">{org.name}</h3>
                        <span className="text-sm text-gray-600">Founded: {org.founded}</span>
                      </div>
                      <a
                        href={org.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </a>
                    </div>
                    <p className="text-gray-700 mb-3"><strong>Key Work:</strong> {org.work}</p>
                    <div className="bg-gray-50 p-4 rounded-md mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Descendant Resources:</strong> {org.resources}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-green-800">
                        <strong>Alliance Potential:</strong> {org.potential}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'us' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">US-Based Descendant Organizations</h2>
              <p className="text-gray-600 mb-6">
                Long-standing organizations with extensive databases tracking slave voyages, genealogy, and descendant records. 
                Many have 20+ years of experience and maintain public, searchable databases.
              </p>

              <div className="grid gap-6">
                {usOrganizations.map((org, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-indigo-600">{org.name}</h3>
                        <span className="text-sm text-gray-600">Founded: {org.founded}</span>
                      </div>
                      <a
                        href={org.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </a>
                    </div>
                    <p className="text-gray-700 mb-3"><strong>Key Work:</strong> {org.work}</p>
                    <div className="bg-gray-50 p-4 rounded-md mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Public Resources:</strong> {org.resources}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-green-800">
                        <strong>Alliance Potential:</strong> {org.potential}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
          <h3 className="font-bold text-lg text-purple-900 mb-2 flex items-center">
            <FileText className="mr-2" />
            Transparent Engagement
          </h3>
          <p className="text-purple-800">
            All alliance opportunities are publicly documented and recorded on-chain. Organizations can engage 
            at their own pace—whether as collaborative partners contributing to the DAO, or as observers of the 
            transparent ledger. The system welcomes all engagement openly, with full accountability through blockchain records.
          </p>
        </div>
      </div>
    </div>
  );
}
