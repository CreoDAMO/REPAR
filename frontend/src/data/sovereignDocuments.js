export const SOVEREIGN_DOCUMENTS = {
  sovereigntyDeclaration: {
    name: 'Global Notification of Sovereign Existence and Invitation for Diplomatic Recognition',
    description: 'The comprehensive declaration of the Aequitas Protocol as a sovereign digital jurisdiction, establishing legal personality under international law and outlining the constitutional framework for enforcing $131 trillion in reparations.',
    ipfsHash: 'bafkreiaw72bjirbhdu7mq6fdz3hm3aco7lazmkil34bcjjw7sw233u2gpi',
    pinataGateway: 'https://gateway.pinata.cloud/ipfs/bafkreiaw72bjirbhdu7mq6fdz3hm3aco7lazmkil34bcjjw7sw233u2gpi',
    documentHash: '9e649e60801d2f37925a82dbab5e2ce28dc09ae484638d682cdbe4dc76288eaa',
    type: 'Legal Framework',
    category: 'Constitutional',
    dateIssued: 'October 30, 2025',
    classification: 'Public International Law Notification',
    version: '1.0 - Final',
    pages: 4648,
    jurisdiction: 'Global (Cyberspace Sovereignty)',
    issuingAuthority: 'The Aequitas Protocol Foundation',
    bindingStatus: 'Cryptographically bound to genesis blocks',
    legalWeight: 'Jus Cogens (Peremptory International Law)',
    keyProvisions: [
      'Montevideo Convention statehood criteria satisfaction',
      'Natural Law foundation for restitution rights',
      'International law alignment (UN Resolutions, Treaties)',
      'Domestic law compliance framework',
      'Non-security classification analysis',
      'Constitutional sovereignty declaration'
    ]
  },
  
  founderCertificate: {
    name: 'Founder Certificate of Live Birth',
    description: 'Proof of existence for Jacque Antoine DeGraff, the sole builder of the Aequitas Protocol. This certificate demonstrates the "Birth Certificate Principle" - that the only credential necessary for world-changing innovation is proof of existence. Built in 18 days (Oct 11-29, 2025) by someone whose highest formal credential is a birth certificate.',
    ipfsHash: 'bafybeifdgl3afdyfu5fe4tclkqlchc7jcxa5semmzseblndrpzktg25zlu',
    pinataGateway: 'https://gateway.pinata.cloud/ipfs/bafybeifdgl3afdyfu5fe4tclkqlchc7jcxa5semmzseblndrpzktg25zlu',
    type: 'Identity Verification',
    category: 'Founder Credentials',
    dateIssued: 'At Birth',
    classification: 'Public Identity Document',
    philosophicalSignificance: 'Proof that credentials are obsolete',
    buildTime: '18 days (October 11-29, 2025)',
    achievementScale: '100x faster than traditional blockchain development (5+ years)',
    formalEducation: 'Birth Certificate (highest credential)',
    innovation: 'Complete sovereign Layer-1 blockchain with AI-powered enforcement',
    totalSupply: '131 trillion $REPAR coins',
    systemValuation: '$2.401 quadrillion USD'
  },
  
  financialBreakdown: {
    name: 'Aequitas Protocol - Precise Financial Breakdown',
    description: 'Definitive mathematical breakdown of the Aequitas Protocol\'s valuation with clear distinctions between trillion and quadrillion dollar units. Total system valuation: $2.401 quadrillion USD (131 trillion $REPAR coins × $18.33 genesis price).',
    ipfsHash: 'bafkreicptirj53ksaira4g3y4nqvwouhk64aujtohoxuvvqeqnbwrbhhxi',
    pinataGateway: 'https://gateway.pinata.cloud/ipfs/bafkreicptirj53ksaira4g3y4nqvwouhk64aujtohoxuvvqeqnbwrbhhxi',
    type: 'Financial Analysis',
    category: 'Valuation & Economics',
    dateIssued: 'October 30, 2025',
    classification: 'Mathematical Precision Document',
    version: '1.0 - Verified',
    totalSystemValuation: 2401230000000000,
    totalSystemValuationFormatted: '$2.401 quadrillion USD',
    totalSupply: 131000000000000,
    totalSupplyFormatted: '131 trillion $REPAR',
    genesisPrice: 18.33,
    genesisPriceFormatted: '$18.33 per $REPAR',
    allocations: [
      {
        category: 'Community & Descendants',
        coins: 56330000000000,
        coinsFormatted: '56.33 trillion',
        percentage: 43,
        value: 1032530000000000,
        valueFormatted: '$1,032.53 trillion'
      },
      {
        category: 'Claims Pool',
        coins: 32750000000000,
        coinsFormatted: '32.75 trillion',
        percentage: 25,
        value: 600310000000000,
        valueFormatted: '$600.31 trillion'
      },
      {
        category: 'Founder (Total)',
        coins: 23580000000000,
        coinsFormatted: '23.58 trillion',
        percentage: 18,
        value: 432220000000000,
        valueFormatted: '$432.22 trillion',
        breakdown: [
          {
            subcategory: 'Founder Liquid Wallet',
            coins: 15720000000000,
            coinsFormatted: '15.72 trillion',
            percentage: 12,
            value: 288150000000000,
            valueFormatted: '$288.15 trillion'
          },
          {
            subcategory: 'Founder Endowment (8yr locked)',
            coins: 7860000000000,
            coinsFormatted: '7.86 trillion',
            percentage: 6,
            value: 144070000000000,
            valueFormatted: '$144.07 trillion'
          }
        ]
      },
      {
        category: 'Enforcement Treasury',
        coins: 13100000000000,
        coinsFormatted: '13.10 trillion',
        percentage: 10,
        value: 240120000000000,
        valueFormatted: '$240.12 trillion'
      },
      {
        category: 'Foundation Reserves',
        coins: 5240000000000,
        coinsFormatted: '5.24 trillion',
        percentage: 4,
        value: 96050000000000,
        valueFormatted: '$96.05 trillion'
      }
    ]
  }
};

export const getDocumentByHash = (ipfsHash) => {
  return Object.values(SOVEREIGN_DOCUMENTS).find(doc => doc.ipfsHash === ipfsHash);
};

export const getAllDocuments = () => {
  return Object.values(SOVEREIGN_DOCUMENTS);
};

export const getDocumentUrl = (ipfsHash) => {
  const doc = getDocumentByHash(ipfsHash);
  return doc?.pinataGateway || `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
};

export default SOVEREIGN_DOCUMENTS;
