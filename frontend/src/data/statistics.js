export const reparStatistics = {
  totalSupply: 131000000000000,
  initialPrice: 18.33,
  targetPrice: 1.00,
  currentPrice: 18.33,
  stakingAPY: 4.5,
  maxAPY: 15,
  totalLiability: 131000000000000,
  totalDefendants: 200,
  activeArbitrationCases: 50,
  registeredDescendants: 150000,
  evidenceDocuments: 1000000,
  enforcementJurisdictions: 172,
  totalRecovered: 0,
  coinsBurned: 0
};

export const coinAllocation = [
  { name: 'Community & Descendant Fund', percentage: 43, amount: 56330000000000, color: '#3b82f6' },
  { name: 'Claims & Compensation Fund', percentage: 25, amount: 32750000000000, color: '#10b981' },
  { name: 'Protocol Funding (90%)', percentage: 10, amount: 13100000000000, color: '#f59e0b', 
    breakdown: [
      { name: 'DEX Liquidity', percentage: 25, color: '#3b82f6' },
      { name: 'DAO Treasury', percentage: 25, color: '#10b981' },
      { name: 'Social Endowment', percentage: 25, color: '#22c55e' },
      { name: 'Validator Subsidy', percentage: 15, color: '#eab308' }
    ]
  },
  { name: "Founder's Allocation", percentage: 10, amount: 13100000000000, color: '#8b5cf6' },
  { name: 'Development Fund', percentage: 8, amount: 10480000000000, color: '#ec4899' },
  { name: 'Foundation Treasury & Reserves', percentage: 4, amount: 5240000000000, color: '#6366f1' }
];

export const historicalData = [
  { year: 1440, period: 'Portuguese Begin Trade', enslaved: 5000, profit: 2000000 },
  { year: 1500, period: 'Spanish Colonies', enslaved: 50000, profit: 25000000 },
  { year: 1600, period: 'Dutch & British Enter', enslaved: 280000, profit: 180000000 },
  { year: 1700, period: 'Peak British Dominance', enslaved: 2500000, profit: 1500000000 },
  { year: 1800, period: 'US Cotton Boom', enslaved: 4000000, profit: 8000000000 },
  { year: 1833, period: 'British Abolition', enslaved: 0, profit: 20000000 },
  { year: 1865, period: 'US Abolition', enslaved: 0, profit: 0 },
  { year: 1888, period: 'Brazil Abolition (Last)', enslaved: 0, profit: 0 },
  { year: 2025, period: 'Aequitas Protocol Launch', enslaved: 0, profit: -131000000000000 }
];

export const regionalContributions = [
  { region: 'Angola/Kongo', enslaved: 5600000, profit: 15000000, impact: 'Catastrophic' },
  { region: 'Bight of Benin (Dahomey)', enslaved: 2000000, profit: 45000000, impact: 'Severe' },
  { region: 'Bight of Biafra', enslaved: 1500000, profit: 8000000, impact: 'Severe' },
  { region: 'Gold Coast (Asante)', enslaved: 1200000, profit: 35000000, impact: 'Severe' },
  { region: 'Senegambia', enslaved: 750000, profit: 12000000, impact: 'Moderate' },
  { region: 'Mozambique', enslaved: 400000, profit: 5000000, impact: 'Moderate' }
];
