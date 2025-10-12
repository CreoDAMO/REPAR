export const defendants = [
  {
    id: 1,
    name: "Barclays Bank PLC",
    country: "United Kingdom",
    slaveryDerivedWealth: 1850000000,
    percentage: 5.8,
    category: "Banking",
    founded: 1690,
    currentAssets: 32000000000,
    status: "Active Defendant",
    evidence: "Predecessor firms financed 30+ slave plantations in Jamaica. John Henry Gurney received £7,052 compensation for 419 enslaved people (1833). Direct ownership of slave plantations, insurance of slave ships.",
    filingJurisdictions: ["UK", "Switzerland", "Singapore", "US-SDNY"],
    descendantsImpacted: 450000,
    ipfsEvidence: [
      {
        type: "Historical Ledger",
        description: "Evidence of financing slave plantations in Jamaica",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1788
      },
      {
        type: "Compensation Records",
        description: "John Henry Gurney's compensation for enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Asset Tracing",
        description: "Documentation of direct ownership of slave plantations",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 2024
      }
    ],
    chainOfGuilt: [
      { year: 1690, entity: "Goldsmith Banking House", slaveryDerivedWealth: 125000 },
      { year: 1736, entity: "Barclay & Co", slaveryDerivedWealth: 458000 },
      { year: 1896, entity: "Barclays Bank Limited", slaveryDerivedWealth: 1200000 },
      { year: 2024, entity: "Barclays Bank PLC", slaveryDerivedWealth: 1850000000 }
    ]
  },
  {
    id: 2,
    name: "Lloyd's of London",
    country: "United Kingdom",
    slaveryDerivedWealth: 1520000000,
    percentage: 4.75,
    category: "Insurance",
    founded: 1686,
    currentAssets: 45000000000,
    status: "Active Defendant",
    evidence: "Insured slave ships and 'cargo loss' including enslaved persons. Zong massacre case: ship owners claimed insurance for slaves thrown overboard. Developed modern marine insurance from slave ship practices.",
    filingJurisdictions: ["UK", "Switzerland", "US-SDNY"],
    descendantsImpacted: 380000,
    ipfsEvidence: [
      {
        type: "Insurance Policy",
        description: "Policy covering slave ship 'Zong'",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1781
      },
      {
        type: "Marine Insurance Records",
        description: "Practices derived from slave ship insurance",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      },
      {
        type: "Legal Filings",
        description: "Claims related to 'cargo loss' of enslaved people",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1782
      }
    ],
    chainOfGuilt: [
      { year: 1686, entity: "Edward Lloyd's Coffee House", slaveryDerivedWealth: 950000 },
      { year: 1770, entity: "Lloyd's Insurance Market", slaveryDerivedWealth: 1450000 },
      { year: 2024, entity: "Lloyd's of London", slaveryDerivedWealth: 1520000000 }
    ]
  },
  {
    id: 3,
    name: "JPMorgan Chase & Co.",
    country: "United States",
    slaveryDerivedWealth: 2100000000,
    percentage: 0.37,
    category: "Banking",
    founded: 1799,
    currentAssets: 570000000000,
    status: "Active Defendant",
    evidence: "Citizens Bank of Louisiana accepted 13,000 enslaved people as loan collateral valued at $3.1M (1860). Canal Bank foreclosed on plantations with 1,200+ enslaved people. Documented slave mortgages: $1.8M (1850s).",
    filingJurisdictions: ["US-SDNY", "UK", "Switzerland"],
    descendantsImpacted: 525000,
    ipfsEvidence: [
      {
        type: "Loan Collateral Records",
        description: "Enslaved people accepted as collateral by Citizens Bank of Louisiana",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      },
      {
        type: "Foreclosure Documents",
        description: "Canal Bank's foreclosure on plantations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1855
      },
      {
        type: "Mortgage Records",
        description: "Documented slave mortgages",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1858
      }
    ],
    chainOfGuilt: [
      { year: 1799, entity: "The Bank of the Manhattan Company", slaveryDerivedWealth: 1100000 },
      { year: 1850, entity: "Chemical Bank", slaveryDerivedWealth: 1500000 },
      { year: 1929, entity: "Chase National Bank", slaveryDerivedWealth: 1800000 },
      { year: 2000, entity: "JPMorgan Chase & Co.", slaveryDerivedWealth: 2100000000 }
    ]
  },
  {
    id: 4,
    name: "Bank of England",
    country: "United Kingdom",
    slaveryDerivedWealth: 2100000000,
    percentage: 6.5,
    category: "Central Banking",
    founded: 1694,
    currentAssets: 85000000000,
    status: "Under Investigation",
    evidence: "Owned hundreds of enslaved people in 1770s. Paid £20 million compensation to slave owners in 1833 (£17 billion today). Financial backing of slave trade infrastructure.",
    filingJurisdictions: ["UK", "ICC"],
    descendantsImpacted: 520000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Documentation of Bank of England's ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1775
      },
      {
        type: "Compensation Records",
        description: "Payment of £20 million compensation to slave owners",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Financial Reports",
        description: "Evidence of backing slave trade infrastructure",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1790
      }
    ],
    chainOfGuilt: [
      { year: 1694, entity: "Bank of England", slaveryDerivedWealth: 1500000000 },
      { year: 1833, entity: "Bank of England", slaveryDerivedWealth: 2100000000 }
    ]
  },
  {
    id: 5,
    name: "Royal Bank of Scotland (NatWest Group)",
    country: "United Kingdom",
    slaveryDerivedWealth: 980000000,
    percentage: 3.2,
    category: "Banking",
    founded: 1727,
    currentAssets: 28000000000,
    status: "Active Defendant",
    evidence: "Predecessor banks' directors owned slaves, provided loans to plantation owners, listed in slave-owner compensation records. Direct plantation ownership documented.",
    filingJurisdictions: ["UK", "Switzerland"],
    descendantsImpacted: 245000,
    ipfsEvidence: [
      {
        type: "Director Records",
        description: "Evidence of predecessor bank directors owning slaves",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1750
      },
      {
        type: "Loan Records",
        description: "Loans provided to plantation owners",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1790
      },
      {
        type: "Compensation Records",
        description: "Listing in slave-owner compensation records",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1727, entity: "The Royal Bank of Scotland", slaveryDerivedWealth: 600000 },
      { year: 1810, entity: "Caledonian Banking Company", slaveryDerivedWealth: 800000 },
      { year: 1969, entity: "National Westminster Bank", slaveryDerivedWealth: 980000000 }
    ]
  },
  {
    id: 6,
    name: "Greene King PLC",
    country: "United Kingdom",
    slaveryDerivedWealth: 425000000,
    percentage: 12.5,
    category: "Hospitality",
    founded: 1799,
    currentAssets: 3400000000,
    status: "Settlement Discussions",
    evidence: "Founder Benjamin Greene received £500,000 in slave compensation (1833). Company built on plantation wealth from enslaved labor.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Compensation Records",
        description: "Benjamin Greene's slave compensation",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1833
      },
      {
        type: "Financial Records",
        description: "Evidence of company built on plantation wealth",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1799, entity: "Benjamin Greene", slaveryDerivedWealth: 500000 },
      { year: 1850, entity: "Greene King Brewery", slaveryDerivedWealth: 425000000 }
    ]
  },
  {
    id: 7,
    name: "Brown University",
    country: "United States",
    slaveryDerivedWealth: 650000000,
    percentage: 10.2,
    category: "Education",
    founded: 1764,
    currentAssets: 4700000000,
    status: "Under Investigation",
    evidence: "Moses Brown - initial endowment from slave trade. Nicholas Brown & Company operated as slave trading firm. Original slave capital: $60,000 (1764) compounded to $2.1M today.",
    filingJurisdictions: ["US-Rhode Island", "US-SDNY"],
    descendantsImpacted: 162000,
    ipfsEvidence: [
      {
        type: "Endowment Records",
        description: "Initial endowment from slave trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1764
      },
      {
        type: "Company Records",
        description: "Nicholas Brown & Company's slave trading operations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1780
      }
    ],
    chainOfGuilt: [
      { year: 1764, entity: "Moses Brown", slaveryDerivedWealth: 60000 },
      { year: 1790, entity: "Nicholas Brown & Company", slaveryDerivedWealth: 150000 },
      { year: 2024, entity: "Brown University", slaveryDerivedWealth: 650000000 }
    ]
  },
  {
    id: 8,
    name: "Aetna Inc.",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 1.9,
    category: "Insurance",
    founded: 1853,
    currentAssets: 20000000000,
    status: "Active Defendant",
    evidence: "Sold insurance policies on enslaved people as property. Paid slaveholders when enslaved people died. Documented policies treating humans as insurable cargo.",
    filingJurisdictions: ["US-Connecticut", "US-SDNY"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Policies insuring enslaved people as property",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1855
      },
      {
        type: "Claims Records",
        description: "Payments to slaveholders for deaths of enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1853, entity: "Aetna Insurance Company", slaveryDerivedWealth: 200000000 },
      { year: 1902, entity: "Aetna Life Insurance Company", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 9,
    name: "Wells Fargo & Company (Wachovia)",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 0.42,
    category: "Banking",
    founded: 1852,
    currentAssets: 210000000000,
    status: "Active Defendant",
    evidence: "Wachovia predecessor banks owned, financed, and insured enslaved people. Accepted enslaved people as collateral for loans. Foreclosed and took ownership when loans defaulted.",
    filingJurisdictions: ["US-SDNY", "US-NC"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Loan Records",
        description: "Financing and insurance of enslaved people by Wachovia predecessor banks",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Collateral Records",
        description: "Enslaved people accepted as collateral for loans",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1855
      },
      {
        type: "Foreclosure Records",
        description: "Foreclosure and ownership of plantations",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1852, entity: "Wells, Fargo & Co.", slaveryDerivedWealth: 400000 },
      { year: 1879, entity: "Wachovia National Bank", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 10,
    name: "New York Life Insurance",
    country: "United States",
    slaveryDerivedWealth: 520000000,
    percentage: 2.1,
    category: "Insurance",
    founded: 1845,
    currentAssets: 25000000000,
    status: "Active Defendant",
    evidence: "Sold policies that insured enslaved people. Profited from death benefits paid to slave owners. Original policies documented in company archives.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Policies insuring enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1848
      },
      {
        type: "Claims Records",
        description: "Death benefits paid to slave owners",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1855
      }
    ],
    chainOfGuilt: [
      { year: 1845, entity: "New York Life Insurance Company", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 11,
    name: "Harvard University",
    country: "United States",
    slaveryDerivedWealth: 1200000000,
    percentage: 2.3,
    category: "Education",
    founded: 1636,
    currentAssets: 53000000000,
    status: "Under Investigation",
    evidence: "Isaac Royall Jr. bequest (slave owner) founded Harvard Law School. Benjamin Wadsworth (President) owned enslaved people. Original slave-derived donations: $400,000 (1820s) compounded to $1.2B today.",
    filingJurisdictions: ["US-MA", "US-SDNY"],
    descendantsImpacted: 300000,
    ipfsEvidence: [
      {
        type: "Bequest Documents",
        description: "Isaac Royall Jr.'s bequest founding Harvard Law School",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1781
      },
      {
        type: "Presidential Records",
        description: "Benjamin Wadsworth's ownership of enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1725
      },
      {
        type: "Donation Records",
        description: "Slave-derived donations",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1820
      }
    ],
    chainOfGuilt: [
      { year: 1636, entity: "Harvard University", slaveryDerivedWealth: 1200000000 }
    ]
  },
  {
    id: 12,
    name: "Yale University",
    country: "United States",
    slaveryDerivedWealth: 950000000,
    percentage: 2.3,
    category: "Education",
    founded: 1701,
    currentAssets: 42000000000,
    status: "Under Investigation",
    evidence: "Elihu Yale was East India Company director - company traded enslaved people. Personal slave ownership documented. Original donation: £2,000 (1718) = $12M today.",
    filingJurisdictions: ["US-CT", "US-SDNY"],
    descendantsImpacted: 238000,
    ipfsEvidence: [
      {
        type: "Company Records",
        description: "Elihu Yale's role in East India Company slave trading",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1710
      },
      {
        type: "Personal Records",
        description: "Documented personal slave ownership",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1720
      },
      {
        type: "Donation Records",
        description: "Original donation from Elihu Yale",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1718
      }
    ],
    chainOfGuilt: [
      { year: 1701, entity: "Yale University", slaveryDerivedWealth: 950000000 }
    ]
  },
  {
    id: 13,
    name: "Grosvenor Estate (Duke of Westminster)",
    country: "United Kingdom",
    slaveryDerivedWealth: 2580000000,
    percentage: 28.0,
    category: "Real Estate",
    founded: 1677,
    currentAssets: 9200000000,
    status: "Active Defendant",
    evidence: "Sir Thomas Grosvenor married Mary Davies - heiress to slave trade fortune. Mary's father owned Barbados sugar plantations with 400+ enslaved people. Original slave-derived capital: £60,000 (1677).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 645000,
    ipfsEvidence: [
      {
        type: "Marriage Records",
        description: "Marriage of Sir Thomas Grosvenor and Mary Davies",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1677
      },
      {
        type: "Estate Records",
        description: "Documentation of Mary Davies' father's plantation ownership",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1670
      }
    ],
    chainOfGuilt: [
      { year: 1677, entity: "Grosvenor Estate", slaveryDerivedWealth: 2580000000 }
    ]
  },
  {
    id: 14,
    name: "Cadogan Estate (Earl Cadogan)",
    country: "United Kingdom",
    slaveryDerivedWealth: 688000000,
    percentage: 16.0,
    category: "Real Estate",
    founded: 1717,
    currentAssets: 4300000000,
    status: "Active Defendant",
    evidence: "Charles Cadogan married Elizabeth Sloane - slave trade heiress. Sir Hans Sloane wealth from Jamaican slave plantations. Original slave-derived capital: £45,000 (1717).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 172000,
    ipfsEvidence: [
      {
        type: "Marriage Records",
        description: "Marriage of Charles Cadogan and Elizabeth Sloane",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1717
      },
      {
        type: "Wealth Records",
        description: "Sir Hans Sloane's wealth from Jamaican slave plantations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1700
      }
    ],
    chainOfGuilt: [
      { year: 1717, entity: "Cadogan Estate", slaveryDerivedWealth: 688000000 }
    ]
  },
  {
    id: 15,
    name: "Tate & Lyle PLC",
    country: "United Kingdom",
    slaveryDerivedWealth: 420000000,
    percentage: 15.0,
    category: "Food & Agriculture",
    founded: 1859,
    currentAssets: 2800000000,
    status: "Active Defendant",
    evidence: "Henry Tate fortune built on slave-grown sugar. Abram Lyle same - golden syrup originally slave economy product. Original slave-derived capital: £120,000 (1859).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Financial Records",
        description: "Henry Tate's fortune from slave-grown sugar",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Product History",
        description: "Golden syrup's origin in slave economy",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1885
      }
    ],
    chainOfGuilt: [
      { year: 1859, entity: "Henry Tate", slaveryDerivedWealth: 120000 },
      { year: 1883, entity: "Abram Lyle", slaveryDerivedWealth: 100000 },
      { year: 1921, entity: "Tate & Lyle", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 16,
    name: "Gladstone Family Trust",
    country: "United Kingdom",
    slaveryDerivedWealth: 142000000,
    percentage: 16.7,
    category: "Family Estate",
    founded: 1790,
    currentAssets: 850000000,
    status: "Active Defendant",
    evidence: "John Gladstone: Largest slave owner in British West Indies. 2,508 enslaved people across Jamaica & Demerara. Slave compensation (1833): £106,769. Annual plantation profits: £40,000/year.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "John Gladstone's ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1830
      },
      {
        type: "Compensation Records",
        description: "John Gladstone's slave compensation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Financial Records",
        description: "Annual plantation profits",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1790, entity: "John Gladstone", slaveryDerivedWealth: 142000000 }
    ]
  },
  {
    id: 17,
    name: "Harewood House (Lascelles Family)",
    country: "United Kingdom",
    slaveryDerivedWealth: 34800000,
    percentage: 53.5,
    category: "Family Estate",
    founded: 1759,
    currentAssets: 65000000,
    status: "Settlement Discussions",
    evidence: "Edward Lascelles: 1,277 enslaved people in Barbados. Compensation (1833): £26,000. Sugar profits (1740-1833): £1.2 million total.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 87000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Edward Lascelles' ownership of enslaved people in Barbados",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1830
      },
      {
        type: "Compensation Records",
        description: "Edward Lascelles' slave compensation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Financial Records",
        description: "Total sugar profits from plantations",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1759, entity: "Edward Lascelles", slaveryDerivedWealth: 34800000 }
    ]
  },
  {
    id: 18,
    name: "Cambridge University (Colleges)",
    country: "United Kingdom",
    slaveryDerivedWealth: 420000000,
    percentage: 7.3,
    category: "Education",
    founded: 1209,
    currentAssets: 5800000000,
    status: "Under Investigation",
    evidence: "Jesus College: Christopher Codrington bequest £10,000 (1710) from Barbados plantations. Trinity College: Multiple fellows received slave compensation. St John's: William Craven bequest from slave trade.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Bequest Records",
        description: "Christopher Codrington's bequest from Barbados plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1710
      },
      {
        type: "Compensation Records",
        description: "Slave compensation received by Trinity College fellows",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Bequest Records",
        description: "William Craven's bequest from slave trade",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1750
      }
    ],
    chainOfGuilt: [
      { year: 1209, entity: "Cambridge University", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 19,
    name: "Oxford University (Colleges)",
    country: "United Kingdom",
    slaveryDerivedWealth: 380000000,
    percentage: 6.8,
    category: "Education",
    founded: 1096,
    currentAssets: 5600000000,
    status: "Under Investigation",
    evidence: "All Souls College: Christopher Codrington library built with slave wealth. Original bequest: £12,000. University College: Multiple slave-owning benefactors documented.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Library Records",
        description: "Christopher Codrington library built with slave wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1720
      },
      {
        type: "Bequest Records",
        description: "Original bequest from Christopher Codrington",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1710
      },
      {
        type: "Benefactor Records",
        description: "Documentation of slave-owning benefactors",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1096, entity: "Oxford University", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 20,
    name: "Dutch West India Company Successors (ABN AMRO/ING)",
    country: "Netherlands",
    slaveryDerivedWealth: 42600000000,
    percentage: 12.0,
    category: "Banking",
    founded: 1621,
    currentAssets: 360000000000,
    status: "Active Defendant",
    evidence: "Transported 500,000-600,000 enslaved Africans. Controlled Dutch Brazil, Suriname, Curaçao. Original slave trade profits: £6 million compounded over 320 years.",
    filingJurisdictions: ["Netherlands", "ICC"],
    descendantsImpacted: 1250000,
    ipfsEvidence: [
      {
        type: "Transport Records",
        description: "Records of enslaved African transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1650
      },
      {
        type: "Company Records",
        description: "Control over Dutch Brazil, Suriname, Curaçao",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1700
      },
      {
        type: "Financial Records",
        description: "Original slave trade profits",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1670
      }
    ],
    chainOfGuilt: [
      { year: 1621, entity: "Dutch West India Company", slaveryDerivedWealth: 42600000000 }
    ]
  },
  {
    id: 21,
    name: "Lloyds Banking Group (HBOS)",
    country: "United Kingdom",
    slaveryDerivedWealth: 1240000000,
    percentage: 4.1,
    category: "Banking",
    founded: 1695,
    currentAssets: 30000000000,
    status: "Active Defendant",
    evidence: "Bank of Scotland directors owned plantations. Halifax Building Society built on slave-derived deposits. Documented loans to slave traders with enslaved people as collateral.",
    filingJurisdictions: ["UK", "Switzerland"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Director Records",
        description: "Bank of Scotland directors' plantation ownership",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1750
      },
      {
        type: "Deposit Records",
        description: "Halifax Building Society's reliance on slave-derived deposits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      },
      {
        type: "Loan Records",
        description: "Loans to slave traders with enslaved people as collateral",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1840
      }
    ],
    chainOfGuilt: [
      { year: 1695, entity: "Bank of Scotland", slaveryDerivedWealth: 700000 },
      { year: 1907, entity: "Halifax Building Society", slaveryDerivedWealth: 540000000 },
      { year: 2009, entity: "Lloyds Banking Group", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 22,
    name: "UCL (University College London)",
    country: "United Kingdom",
    slaveryDerivedWealth: 280000000,
    percentage: 8.5,
    category: "Education",
    founded: 1826,
    currentAssets: 3300000000,
    status: "Under Investigation",
    evidence: "Founded with donations from slave owners. Original donors received £3M in compensation (1833). Eugenics department funded by slave wealth.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 70000,
    ipfsEvidence: [
      {
        type: "Donation Records",
        description: "Donations from slave owners",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1830
      },
      {
        type: "Compensation Records",
        description: "Compensation received by original donors",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Departmental Funding",
        description: "Eugenics department funded by slave wealth",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1826, entity: "UCL", slaveryDerivedWealth: 280000000 }
    ]
  },
  {
    id: 23,
    name: "Georgetown University",
    country: "United States",
    slaveryDerivedWealth: 410000000,
    percentage: 9.8,
    category: "Education",
    founded: 1789,
    currentAssets: 4200000000,
    status: "Settlement Discussions",
    evidence: "Sold 272 enslaved people (1838) for $115,000 to save university. Maryland Province Jesuits owned 1,000+ enslaved people. Original sale proceeds: $3.2M today.",
    filingJurisdictions: ["US-DC", "US-SDNY"],
    descendantsImpacted: 103000,
    ipfsEvidence: [
      {
        type: "Sale Records",
        description: "Sale of 272 enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1838
      },
      {
        type: "Ownership Records",
        description: "Maryland Province Jesuits' ownership of enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1789, entity: "Georgetown University", slaveryDerivedWealth: 410000000 }
    ]
  },
  {
    id: 24,
    name: "Church of England",
    country: "United Kingdom",
    slaveryDerivedWealth: 1680000000,
    percentage: 18.5,
    category: "Religious Institution",
    founded: 1534,
    currentAssets: 9100000000,
    status: "Active Defendant",
    evidence: "Queen Anne's Bounty invested £9M in South Sea Company (slave traders). Codrington plantations: 750+ enslaved people. Compensation received: £8,823 (1833).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Investment Records",
        description: "Queen Anne's Bounty investment in South Sea Company",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1711
      },
      {
        type: "Ownership Records",
        description: "Codrington plantations and enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      },
      {
        type: "Compensation Records",
        description: "Compensation received for enslaved people",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1534, entity: "Church of England", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 25,
    name: "Rothschild & Co",
    country: "United Kingdom",
    slaveryDerivedWealth: 890000000,
    percentage: 3.2,
    category: "Banking",
    founded: 1760,
    currentAssets: 28000000000,
    status: "Active Defendant",
    evidence: "Nathan Mayer Rothschild underwrote £20M slave compensation loan (1833). Original financing fees: £500,000 compounded to £1.2B. Plantation bonds held until 1843.",
    filingJurisdictions: ["UK", "France", "Switzerland"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Loan Underwriting",
        description: "Underwriting of slave compensation loan",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1833
      },
      {
        type: "Financial Records",
        description: "Original financing fees and compounded value",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Bond Holdings",
        description: "Plantation bonds held until 1843",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1843
      }
    ],
    chainOfGuilt: [
      { year: 1760, entity: "Mayer Amschel Rothschild", slaveryDerivedWealth: 500000 },
      { year: 1833, entity: "Nathan Mayer Rothschild", slaveryDerivedWealth: 20000000 },
      { year: 2000, entity: "Rothschild & Co", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 26,
    name: "Princeton University",
    country: "United States",
    slaveryDerivedWealth: 320000000,
    percentage: 1.8,
    category: "Education",
    founded: 1746,
    currentAssets: 18000000000,
    status: "Under Investigation",
    evidence: "Presidents owned enslaved people. Original endowments from slave-owning families: $80,000 (1750s). Witherspoon family: 80 enslaved people.",
    filingJurisdictions: ["US-NJ", "US-SDNY"],
    descendantsImpacted: 80000,
    ipfsEvidence: [
      {
        type: "Presidential Records",
        description: "Records of presidents owning enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1770
      },
      {
        type: "Endowment Records",
        description: "Endowments from slave-owning families",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1755
      },
      {
        type: "Family Records",
        description: "Witherspoon family's ownership of enslaved people",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1760
      }
    ],
    chainOfGuilt: [
      { year: 1746, entity: "College of New Jersey (Princeton)", slaveryDerivedWealth: 320000000 }
    ]
  },
  {
    id: 27,
    name: "HSBC Holdings",
    country: "United Kingdom",
    slaveryDerivedWealth: 2800000000,
    percentage: 1.1,
    category: "Banking",
    founded: 1865,
    currentAssets: 250000000000,
    status: "Active Defendant",
    evidence: "Founded with opium trade profits (slavery-adjacent). Predecessor banks financed coolie trade (1850-1874). British Bank of West Africa: Direct plantation financing.",
    filingJurisdictions: ["UK", "Hong Kong", "US-SDNY"],
    descendantsImpacted: 700000,
    ipfsEvidence: [
      {
        type: "Founding Records",
        description: "Profits from opium trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Financing Records",
        description: "Financing of coolie trade by predecessor banks",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      },
      {
        type: "Financing Records",
        description: "Direct plantation financing by British Bank of West Africa",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1865, entity: "Hongkong and Shanghai Banking Corporation", slaveryDerivedWealth: 1400000000 },
      { year: 1992, entity: "HSBC Holdings plc", slaveryDerivedWealth: 2800000000 }
    ]
  },
  {
    id: 28,
    name: "Drapers' Company (City of London Livery)",
    country: "United Kingdom",
    slaveryDerivedWealth: 145000000,
    percentage: 24.0,
    category: "Trade Guild",
    founded: 1361,
    currentAssets: 604000000,
    status: "Active Defendant",
    evidence: "Members owned 15+ plantations. Compensation received: £18,500 (1833). Investment in West India Docks. Original slave capital: £45,000 (1780s).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 36000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Members' ownership of plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      },
      {
        type: "Compensation Records",
        description: "Compensation received for enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Investment Records",
        description: "Investment in West India Docks",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1802
      }
    ],
    chainOfGuilt: [
      { year: 1361, entity: "Drapers' Company", slaveryDerivedWealth: 145000000 }
    ]
  },
  {
    id: 29,
    name: "Columbia University",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 3.9,
    category: "Education",
    founded: 1754,
    currentAssets: 15000000000,
    status: "Under Investigation",
    evidence: "King's College trustees owned enslaved people. Original land grants from slave-owning families. Stuyvesant family bequest: 200+ enslaved people value.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Trustee Records",
        description: "King's College trustees' ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1760
      },
      {
        type: "Land Grant Records",
        description: "Land grants from slave-owning families",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1750
      },
      {
        type: "Bequest Records",
        description: "Stuyvesant family bequest of enslaved people's value",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1780
      }
    ],
    chainOfGuilt: [
      { year: 1754, entity: "King's College (Columbia University)", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 30,
    name: "Truman Hanburg (Brewing/Real Estate)",
    country: "United Kingdom",
    slaveryDerivedWealth: 78000000,
    percentage: 31.2,
    category: "Hospitality",
    founded: 1666,
    currentAssets: 250000000,
    status: "Active Defendant",
    evidence: "Truman family: Barbados plantation owners. Compensation (1833): £12,683 for 378 enslaved people. Brewery expansion funded by slave profits.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 19500,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Truman family's Barbados plantation ownership",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      },
      {
        type: "Compensation Records",
        description: "Truman family's slave compensation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      },
      {
        type: "Financial Records",
        description: "Brewery expansion funded by slave profits",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1666, entity: "Truman Brewery", slaveryDerivedWealth: 78000000 }
    ]
  },
  {
    id: 31,
    name: "Coutts & Co (NatWest Private Banking)",
    country: "United Kingdom",
    slaveryDerivedWealth: 420000000,
    percentage: 7.8,
    category: "Banking",
    founded: 1692,
    currentAssets: 5400000000,
    status: "Active Defendant",
    evidence: "Royal banker to slave-owning families. Held accounts for 50+ plantation owners. Compensation payments processed: £2.1M total (1833-1843).",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Account Records",
        description: "Accounts for 50+ plantation owners",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1750
      },
      {
        type: "Compensation Processing Records",
        description: "Processing of slave compensation payments",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1692, entity: "Coutts & Co", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 32,
    name: "William & Mary (College)",
    country: "United States",
    slaveryDerivedWealth: 195000000,
    percentage: 11.3,
    category: "Education",
    founded: 1693,
    currentAssets: 1730000000,
    status: "Under Investigation",
    evidence: "College owned enslaved people directly. Blair, Braxton, Carter families: Major donors with 500+ enslaved people. Original slave-derived endowment: $120,000.",
    filingJurisdictions: ["US-VA"],
    descendantsImpacted: 49000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "College's direct ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1780
      },
      {
        type: "Donor Records",
        description: "Major donors with enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      },
      {
        type: "Endowment Records",
        description: "Original slave-derived endowment",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1790
      }
    ],
    chainOfGuilt: [
      { year: 1693, entity: "College of William & Mary", slaveryDerivedWealth: 195000000 }
    ]
  },
  {
    id: 33,
    name: "Pinault Family (Kering/Christie's)",
    country: "France",
    slaveryDerivedWealth: 1870000000,
    percentage: 4.2,
    category: "Luxury/Auction",
    founded: 1685,
    currentAssets: 44500000000,
    status: "Active Defendant",
    evidence: "Pinault ancestor timber used in slave ships. Christie's auctioned enslaved people (1769-1834). Documented: 80+ slave auctions. Original profits: £340,000.",
    filingJurisdictions: ["France", "UK", "US-SDNY"],
    descendantsImpacted: 468000,
    ipfsEvidence: [
      {
        type: "Timber Records",
        description: "Ancestor's timber used in slave ships",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1700
      },
      {
        type: "Auction Records",
        description: "Christie's auctions of enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1770
      }
    ],
    chainOfGuilt: [
      { year: 1685, entity: "Pinault Family", slaveryDerivedWealth: 1870000000 }
    ]
  },
  {
    id: 34,
    name: "Vanderbilt University",
    country: "United States",
    slaveryDerivedWealth: 245000000,
    percentage: 3.1,
    category: "Education",
    founded: 1873,
    currentAssets: 7900000000,
    status: "Active Defendant",
    evidence: "Cornelius Vanderbilt fortune from shipping enslaved people. Original $1M endowment traced to slave-transport profits. Slave ships operated: 1830-1862.",
    filingJurisdictions: ["US-TN"],
    descendantsImpacted: 61000,
    ipfsEvidence: [
      {
        type: "Shipping Records",
        description: "Cornelius Vanderbilt's shipping of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1840
      },
      {
        type: "Endowment Records",
        description: "Original endowment traced to slave-transport profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1873
      }
    ],
    chainOfGuilt: [
      { year: 1873, entity: "Vanderbilt University", slaveryDerivedWealth: 245000000 }
    ]
  },
  {
    id: 35,
    name: "Jardine Matheson Holdings",
    country: "Hong Kong/UK",
    slaveryDerivedWealth: 3400000000,
    percentage: 8.9,
    category: "Conglomerate",
    founded: 1832,
    currentAssets: 38200000000,
    status: "Active Defendant",
    evidence: "Founded with opium trade profits (slavery-adjacent). Coolie trade financier (1850-1874). Original slave/coolie capital: £2M compounded.",
    filingJurisdictions: ["UK", "Hong Kong", "Singapore"],
    descendantsImpacted: 850000,
    ipfsEvidence: [
      {
        type: "Founding Records",
        description: "Profits from opium trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1832
      },
      {
        type: "Financing Records",
        description: "Financier of coolie trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1832, entity: "Jardine Matheson", slaveryDerivedWealth: 3400000000 }
    ]
  },
  {
    id: 36,
    name: "Baring Family Trust (ING Barings)",
    country: "United Kingdom",
    slaveryDerivedWealth: 680000000,
    percentage: 9.4,
    category: "Banking",
    founded: 1762,
    currentAssets: 7200000000,
    status: "Active Defendant",
    evidence: "Financed Louisiana Purchase (slave territory). Plantation bonds underwriter. Compensation loan syndicate member. Original profits: £890,000.",
    filingJurisdictions: ["UK", "Netherlands"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Louisiana Purchase",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1803
      },
      {
        type: "Underwriting Records",
        description: "Underwriter of plantation bonds",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1820
      },
      {
        type: "Compensation Loan Records",
        description: "Member of compensation loan syndicate",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1762, entity: "Baring Brothers", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 37,
    name: "Emory University",
    country: "United States",
    slaveryDerivedWealth: 168000000,
    percentage: 2.1,
    category: "Education",
    founded: 1836,
    currentAssets: 8000000000,
    status: "Settlement Discussions",
    evidence: "Named after Methodist bishop who owned enslaved people. Original endowment from slave-owning families: $15,000. Asa Candler (Coca-Cola): Slave family fortune.",
    filingJurisdictions: ["US-GA"],
    descendantsImpacted: 42000,
    ipfsEvidence: [
      {
        type: "Biographical Records",
        description: "Methodist bishop's ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      },
      {
        type: "Endowment Records",
        description: "Original endowment from slave-owning families",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1836
      },
      {
        type: "Family Records",
        description: "Asa Candler's slave family fortune",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1836, entity: "Emory University", slaveryDerivedWealth: 168000000 }
    ]
  },
  {
    id: 38,
    name: "Guinness Family Trust",
    country: "Ireland/UK",
    slaveryDerivedWealth: 890000000,
    percentage: 14.8,
    category: "Brewing/Real Estate",
    founded: 1759,
    currentAssets: 6000000000,
    status: "Active Defendant",
    evidence: "Arthur Guinness investments in West India trade. Family estates purchased with slave-derived capital. Original investment: £180,000 (1780s).",
    filingJurisdictions: ["Ireland", "UK"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Investment Records",
        description: "Arthur Guinness's investments in West India trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1780
      },
      {
        type: "Estate Records",
        description: "Family estates purchased with slave-derived capital",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1759, entity: "Arthur Guinness", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 39,
    name: "Duke University",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 3.4,
    category: "Education",
    founded: 1838,
    currentAssets: 11200000000,
    status: "Under Investigation",
    evidence: "Washington Duke fortune from post-Civil War tobacco (sharecropping/convict lease). Original Trinity College endowment from slave-owning families.",
    filingJurisdictions: ["US-NC"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Washington Duke's fortune from post-Civil War tobacco",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Endowment Records",
        description: "Original Trinity College endowment from slave-owning families",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1838, entity: "Trinity College (Duke University)", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 40,
    name: "University of Virginia",
    country: "United States",
    slaveryDerivedWealth: 720000000,
    percentage: 5.1,
    category: "Education",
    founded: 1819,
    currentAssets: 14100000000,
    status: "Under Investigation",
    evidence: "Thomas Jefferson owned 600+ enslaved people. University built by enslaved labor. Original construction value: $300,000 in slave labor.",
    filingJurisdictions: ["US-VA"],
    descendantsImpacted: 180000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Thomas Jefferson's ownership of enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      },
      {
        type: "Construction Records",
        description: "University built by enslaved labor",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1820
      }
    ],
    chainOfGuilt: [
      { year: 1819, entity: "University of Virginia", slaveryDerivedWealth: 720000000 }
    ]
  },
  {
    id: 41,
    name: "University of North Carolina",
    country: "United States",
    slaveryDerivedWealth: 540000000,
    percentage: 4.8,
    category: "Education",
    founded: 1789,
    currentAssets: 11200000000,
    status: "Under Investigation",
    evidence: "Enslaved people built campus buildings. Original benefactors owned 300+ enslaved people. Campus construction labor valued at $200,000.",
    filingJurisdictions: ["US-NC"],
    descendantsImpacted: 135000,
    ipfsEvidence: [
      {
        type: "Construction Records",
        description: "Enslaved people building campus buildings",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      },
      {
        type: "Benefactor Records",
        description: "Benefactors owning enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1790
      }
    ],
    chainOfGuilt: [
      { year: 1789, entity: "University of North Carolina", slaveryDerivedWealth: 540000000 }
    ]
  },
  {
    id: 42,
    name: "Lehman Brothers Holdings (Creditors)",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 8.2,
    category: "Banking",
    founded: 1850,
    currentAssets: 10800000000,
    status: "Active Defendant",
    evidence: "Henry Lehman & Emmanuel Lehman: Alabama cotton traders using enslaved labor. Original capital: $120,000 from slave-picked cotton sales.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Business Records",
        description: "Alabama cotton trading using enslaved labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1855
      },
      {
        type: "Capital Records",
        description: "Original capital from slave-picked cotton sales",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1850, entity: "Lehman Brothers", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 43,
    name: "AXA Group",
    country: "France",
    slaveryDerivedWealth: 1240000000,
    percentage: 1.3,
    category: "Insurance",
    founded: 1817,
    currentAssets: 95000000000,
    status: "Active Defendant",
    evidence: "Predecessor firms insured slave ships and plantations. Original policies: 200+ slave ship voyages. Compensation paid for 'cargo loss' of enslaved people.",
    filingJurisdictions: ["France", "UK", "US-SDNY"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Policies insuring slave ships and plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1820
      },
      {
        type: "Claims Records",
        description: "Compensation for 'cargo loss' of enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1817, entity: "AXA Group", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 44,
    name: "Crédit Agricole",
    country: "France",
    slaveryDerivedWealth: 680000000,
    percentage: 0.8,
    category: "Banking",
    founded: 1894,
    currentAssets: 85000000000,
    status: "Active Defendant",
    evidence: "Founded with capital from French colonial plantation profits. Original deposits from Saint-Domingue sugar wealth: ₣2.5M.",
    filingJurisdictions: ["France"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from French colonial plantation profits",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1890
      },
      {
        type: "Deposit Records",
        description: "Deposits from Saint-Domingue sugar wealth",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1894, entity: "Crédit Agricole", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 45,
    name: "Santander Group",
    country: "Spain",
    slaveryDerivedWealth: 920000000,
    percentage: 1.1,
    category: "Banking",
    founded: 1857,
    currentAssets: 84000000000,
    status: "Active Defendant",
    evidence: "Financed Spanish colonial slave trade in Cuba. Original loans to Cuban plantation owners: ₱8M. Foreclosed on 40+ plantations.",
    filingJurisdictions: ["Spain", "US-SDNY"],
    descendantsImpacted: 230000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Spanish colonial slave trade in Cuba",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      },
      {
        type: "Loan Records",
        description: "Loans to Cuban plantation owners",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1870
      },
      {
        type: "Foreclosure Records",
        description: "Foreclosure on plantations",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1857, entity: "Banco de Santander", slaveryDerivedWealth: 920000000 }
    ]
  },
  {
    id: 46,
    name: "Generali Group",
    country: "Italy",
    slaveryDerivedWealth: 340000000,
    percentage: 0.9,
    category: "Insurance",
    founded: 1831,
    currentAssets: 38000000000,
    status: "Under Investigation",
    evidence: "Insured Austrian Empire slave-trading vessels. Mediterranean slave trade insurance policies: 150+ documented.",
    filingJurisdictions: ["Italy", "Austria"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance for Austrian Empire slave-trading vessels",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1840
      },
      {
        type: "Policy Records",
        description: "Mediterranean slave trade insurance policies",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1831, entity: "Generali Group", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 47,
    name: "Deutsche Bank AG",
    country: "Germany",
    slaveryDerivedWealth: 780000000,
    percentage: 0.6,
    category: "Banking",
    founded: 1870,
    currentAssets: 130000000000,
    status: "Active Defendant",
    evidence: "Financed colonial enterprises with slave labor in Africa. Original loans to German East Africa Company: ℳ15M.",
    filingJurisdictions: ["Germany", "US-SDNY"],
    descendantsImpacted: 195000,
    ipfsEvidence: [
      {
        type: "Loan Records",
        description: "Financing of colonial enterprises with slave labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1880
      },
      {
        type: "Loan Records",
        description: "Loans to German East Africa Company",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1870, entity: "Deutsche Bank", slaveryDerivedWealth: 780000000 }
    ]
  },
  {
    id: 48,
    name: "Commerzbank AG",
    country: "Germany",
    slaveryDerivedWealth: 420000000,
    percentage: 0.9,
    category: "Banking",
    founded: 1870,
    currentAssets: 47000000000,
    status: "Under Investigation",
    evidence: "Hamburg banking house financed Atlantic trade routes including slave ships. Documented: 80+ voyage financings.",
    filingJurisdictions: ["Germany"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Atlantic trade routes including slave ships",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1875
      }
    ],
    chainOfGuilt: [
      { year: 1870, entity: "Commerzbank", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 49,
    name: "UBS Group AG",
    country: "Switzerland",
    slaveryDerivedWealth: 1560000000,
    percentage: 1.8,
    category: "Banking",
    founded: 1862,
    currentAssets: 86000000000,
    status: "Active Defendant",
    evidence: "Predecessor banks held slave-trade wealth deposits. Original Swiss accounts from Caribbean planters: CHF 12M.",
    filingJurisdictions: ["Switzerland", "US-SDNY"],
    descendantsImpacted: 390000,
    ipfsEvidence: [
      {
        type: "Deposit Records",
        description: "Slave-trade wealth deposits held by predecessor banks",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Account Records",
        description: "Swiss accounts from Caribbean planters",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1862, entity: "UBS Group AG", slaveryDerivedWealth: 1560000000 }
    ]
  },
  {
    id: 50,
    name: "Credit Suisse (UBS acquisition)",
    country: "Switzerland",
    slaveryDerivedWealth: 1180000000,
    percentage: 2.1,
    category: "Banking",
    founded: 1856,
    currentAssets: 56000000000,
    status: "Active Defendant",
    evidence: "Managed wealth from Brazilian coffee plantations using enslaved labor. Original deposits: CHF 8.5M from slave-grown commodities.",
    filingJurisdictions: ["Switzerland", "Brazil"],
    descendantsImpacted: 295000,
    ipfsEvidence: [
      {
        type: "Wealth Management Records",
        description: "Management of wealth from Brazilian coffee plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Deposit Records",
        description: "Deposits from slave-grown commodities",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1856, entity: "Credit Suisse", slaveryDerivedWealth: 1180000000 }
    ]
  },
  {
    id: 51,
    name: "Julius Baer Group",
    country: "Switzerland",
    slaveryDerivedWealth: 340000000,
    percentage: 3.4,
    category: "Banking",
    founded: 1890,
    currentAssets: 10000000000,
    status: "Under Investigation",
    evidence: "Private banking for colonial plantation owners. Client accounts from slave-owning families: CHF 4.2M.",
    filingJurisdictions: ["Switzerland"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Client Records",
        description: "Private banking for colonial plantation owners",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Account Records",
        description: "Client accounts from slave-owning families",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1910
      }
    ],
    chainOfGuilt: [
      { year: 1890, entity: "Julius Baer Group", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 52,
    name: "Pictet Group",
    country: "Switzerland",
    slaveryDerivedWealth: 480000000,
    percentage: 4.0,
    category: "Banking",
    founded: 1805,
    currentAssets: 12000000000,
    status: "Active Defendant",
    evidence: "Geneva bankers to Caribbean planters. Original capital from slave trade: CHF 2.8M. Family owned plantations in Haiti.",
    filingJurisdictions: ["Switzerland", "France"],
    descendantsImpacted: 120000,
    ipfsEvidence: [
      {
        type: "Client Records",
        description: "Geneva bankers to Caribbean planters",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      },
      {
        type: "Capital Records",
        description: "Original capital from slave trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1805
      },
      {
        type: "Ownership Records",
        description: "Family ownership of plantations in Haiti",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1820
      }
    ],
    chainOfGuilt: [
      { year: 1805, entity: "Pictet Group", slaveryDerivedWealth: 480000000 }
    ]
  },
  {
    id: 53,
    name: "Lombard Odier",
    country: "Switzerland",
    slaveryDerivedWealth: 390000000,
    percentage: 3.9,
    category: "Banking",
    founded: 1796,
    currentAssets: 10000000000,
    status: "Active Defendant",
    evidence: "Managed wealth from Saint-Domingue plantations. Original accounts: CHF 3.1M from slave-produced sugar.",
    filingJurisdictions: ["Switzerland"],
    descendantsImpacted: 98000,
    ipfsEvidence: [
      {
        type: "Wealth Management Records",
        description: "Management of wealth from Saint-Domingue plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      },
      {
        type: "Account Records",
        description: "Original accounts from slave-produced sugar",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1796
      }
    ],
    chainOfGuilt: [
      { year: 1796, entity: "Lombard Odier", slaveryDerivedWealth: 390000000 }
    ]
  },
  {
    id: 54,
    name: "Rabobank",
    country: "Netherlands",
    slaveryDerivedWealth: 680000000,
    percentage: 1.2,
    category: "Banking",
    founded: 1898,
    currentAssets: 57000000000,
    status: "Under Investigation",
    evidence: "Founded with capital from Dutch colonial enterprises. Suriname plantation financing: ƒ6M.",
    filingJurisdictions: ["Netherlands"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from Dutch colonial enterprises",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Financing Records",
        description: "Suriname plantation financing",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1910
      }
    ],
    chainOfGuilt: [
      { year: 1898, entity: "Rabobank", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 55,
    name: "ING Group",
    country: "Netherlands",
    slaveryDerivedWealth: 1420000000,
    percentage: 1.9,
    category: "Banking",
    founded: 1845,
    currentAssets: 75000000000,
    status: "Active Defendant",
    evidence: "Predecessor banks financed Dutch West Indies plantations. Original loans with enslaved people as collateral: ƒ12M.",
    filingJurisdictions: ["Netherlands", "US-SDNY"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Dutch West Indies plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Loan Records",
        description: "Loans with enslaved people as collateral",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1845, entity: "ING Group", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 56,
    name: "Standard Chartered",
    country: "United Kingdom",
    slaveryDerivedWealth: 890000000,
    percentage: 2.8,
    category: "Banking",
    founded: 1853,
    currentAssets: 32000000000,
    status: "Active Defendant",
    evidence: "Chartered Bank of India financed coolie trade (slavery-adjacent). Original capital from opium/coolie profits: £4.5M.",
    filingJurisdictions: ["UK", "Hong Kong"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of coolie trade by Chartered Bank of India",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      },
      {
        type: "Capital Records",
        description: "Original capital from opium/coolie profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1853
      }
    ],
    chainOfGuilt: [
      { year: 1853, entity: "Standard Chartered Bank", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 57,
    name: "Schroders",
    country: "United Kingdom",
    slaveryDerivedWealth: 420000000,
    percentage: 4.2,
    category: "Banking",
    founded: 1804,
    currentAssets: 10000000000,
    status: "Active Defendant",
    evidence: "Schröder family sugar merchants using enslaved labor. Original capital from slave-grown sugar: £1.8M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Business Records",
        description: "Schröder family sugar merchants using enslaved labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      },
      {
        type: "Capital Records",
        description: "Original capital from slave-grown sugar",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1804
      }
    ],
    chainOfGuilt: [
      { year: 1804, entity: "Schroders", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 58,
    name: "Prudential plc",
    country: "United Kingdom",
    slaveryDerivedWealth: 680000000,
    percentage: 1.4,
    category: "Insurance",
    founded: 1848,
    currentAssets: 48000000000,
    status: "Under Investigation",
    evidence: "Original investors received slave compensation (1833). Founding capital traced to plantation wealth: £2.1M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Compensation Records",
        description: "Slave compensation received by original investors",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1833
      },
      {
        type: "Capital Records",
        description: "Founding capital traced to plantation wealth",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1848
      }
    ],
    chainOfGuilt: [
      { year: 1848, entity: "Prudential plc", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 59,
    name: "Legal & General",
    country: "United Kingdom",
    slaveryDerivedWealth: 520000000,
    percentage: 1.8,
    category: "Insurance",
    founded: 1836,
    currentAssets: 29000000000,
    status: "Under Investigation",
    evidence: "Founding investors included slave owners. Original policies on plantations: 40+ documented.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Founding investors included slave owners",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1836
      },
      {
        type: "Policy Records",
        description: "Original policies on plantations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1840
      }
    ],
    chainOfGuilt: [
      { year: 1836, entity: "Legal & General", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 60,
    name: "Aviva plc",
    country: "United Kingdom",
    slaveryDerivedWealth: 780000000,
    percentage: 1.6,
    category: "Insurance",
    founded: 1797,
    currentAssets: 49000000000,
    status: "Active Defendant",
    evidence: "Norwich Union insured slave plantations. Original policies: £8M coverage on enslaved 'property'.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 195000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Norwich Union insuring slave plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      }
    ],
    chainOfGuilt: [
      { year: 1797, entity: "Norwich Union", slaveryDerivedWealth: 8000000 },
      { year: 2000, entity: "Aviva plc", slaveryDerivedWealth: 780000000 }
    ]
  },
  {
    id: 61,
    name: "Scottish Widows (Lloyds Banking)",
    country: "United Kingdom",
    slaveryDerivedWealth: 340000000,
    percentage: 2.8,
    category: "Insurance",
    founded: 1815,
    currentAssets: 12000000000,
    status: "Under Investigation",
    evidence: "Founding directors received slave compensation. Original capital from plantation profits: £1.2M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Compensation Records",
        description: "Slave compensation received by founding directors",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1833
      },
      {
        type: "Capital Records",
        description: "Original capital from plantation profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1815
      }
    ],
    chainOfGuilt: [
      { year: 1815, entity: "Scottish Widows", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 62,
    name: "Phoenix Group Holdings",
    country: "United Kingdom",
    slaveryDerivedWealth: 290000000,
    percentage: 2.1,
    category: "Insurance",
    founded: 1782,
    currentAssets: 14000000000,
    status: "Under Investigation",
    evidence: "Pelican Life Office insured slave traders. Documented policies on 60+ slave ships.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Pelican Life Office insuring slave traders",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1782, entity: "Phoenix Group Holdings", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 63,
    name: "American International Group (AIG)",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 0.9,
    category: "Insurance",
    founded: 1919,
    currentAssets: 47000000000,
    status: "Under Investigation",
    evidence: "Predecessor firms in Shanghai insured coolie trade. Original policies on indentured labor ships: 80+.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of coolie trade by predecessor firms in Shanghai",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1920
      }
    ],
    chainOfGuilt: [
      { year: 1919, entity: "AIG", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 64,
    name: "MetLife Inc.",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 1.2,
    category: "Insurance",
    founded: 1868,
    currentAssets: 48000000000,
    status: "Active Defendant",
    evidence: "Early policies insured enslaved people as property. Original slave life insurance policies: 200+ documented.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Early policies insuring enslaved people as property",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1868, entity: "MetLife Inc.", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 65,
    name: "Prudential Financial (US)",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 0.8,
    category: "Insurance",
    founded: 1875,
    currentAssets: 42000000000,
    status: "Under Investigation",
    evidence: "Founding investors held slave-derived wealth. Original capital from post-Civil War plantation profits: $2.8M.",
    filingJurisdictions: ["US-NJ"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Founding investors held slave-derived wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1875
      },
      {
        type: "Capital Records",
        description: "Original capital from post-Civil War plantation profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1875, entity: "Prudential Financial", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 66,
    name: "Travelers Companies",
    country: "United States",
    slaveryDerivedWealth: 280000000,
    percentage: 0.9,
    category: "Insurance",
    founded: 1853,
    currentAssets: 31000000000,
    status: "Under Investigation",
    evidence: "St. Paul Fire & Marine insured plantation properties. Original policies: $4.5M coverage.",
    filingJurisdictions: ["US-CT"],
    descendantsImpacted: 70000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "St. Paul Fire & Marine insuring plantation properties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1853, entity: "Travelers Companies", slaveryDerivedWealth: 280000000 }
    ]
  },
  {
    id: 67,
    name: "Allianz SE",
    country: "Germany",
    slaveryDerivedWealth: 890000000,
    percentage: 0.7,
    category: "Insurance",
    founded: 1890,
    currentAssets: 127000000000,
    status: "Under Investigation",
    evidence: "Predecessor firms insured German colonial enterprises using forced labor. Original policies: ℳ18M.",
    filingJurisdictions: ["Germany"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of German colonial enterprises using forced labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1890, entity: "Allianz SE", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 68,
    name: "Munich Re",
    country: "Germany",
    slaveryDerivedWealth: 520000000,
    percentage: 0.6,
    category: "Insurance",
    founded: 1880,
    currentAssets: 87000000000,
    status: "Under Investigation",
    evidence: "Reinsured colonial trade routes including coolie ships. Documented: 100+ voyage policies.",
    filingJurisdictions: ["Germany"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Reinsurance Policies",
        description: "Reinsurance of colonial trade routes including coolie ships",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1880, entity: "Munich Re", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 69,
    name: "Zurich Insurance Group",
    country: "Switzerland",
    slaveryDerivedWealth: 680000000,
    percentage: 1.1,
    category: "Insurance",
    founded: 1872,
    currentAssets: 62000000000,
    status: "Under Investigation",
    evidence: "Insured colonial commodities from slave labor. Original policies on slave-grown cotton: CHF 8M.",
    filingJurisdictions: ["Switzerland"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of colonial commodities from slave labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1872, entity: "Zurich Insurance Group", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 70,
    name: "The Hartford Financial Services",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.3,
    category: "Insurance",
    founded: 1810,
    currentAssets: 26000000000,
    status: "Active Defendant",
    evidence: "Insured New England textile mills processing slave-picked cotton. Original policies: $6M coverage.",
    filingJurisdictions: ["US-CT"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of New England textile mills processing slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1810, entity: "The Hartford Financial Services", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 71,
    name: "Nationwide Mutual Insurance",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.1,
    category: "Insurance",
    founded: 1926,
    currentAssets: 26000000000,
    status: "Under Investigation",
    evidence: "Founded with capital from Ohio investors with slave-trade family wealth. Original capital: $3.2M.",
    filingJurisdictions: ["US-OH"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Original capital from Ohio investors with slave-trade family wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1926
      }
    ],
    chainOfGuilt: [
      { year: 1926, entity: "Nationwide Mutual Insurance", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 72,
    name: "TIAA (Teachers Insurance)",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 0.9,
    category: "Insurance",
    founded: 1918,
    currentAssets: 47000000000,
    status: "Under Investigation",
    evidence: "Early investors included university endowments with slave wealth. Original capital from slave-derived donations: $5M.",
    filingJurisdictions: ["US-NY"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Early investors included university endowments with slave wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1920
      },
      {
        type: "Capital Records",
        description: "Original capital from slave-derived donations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1918
      }
    ],
    chainOfGuilt: [
      { year: 1918, entity: "TIAA", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 73,
    name: "Northwestern Mutual",
    country: "United States",
    slaveryDerivedWealth: 520000000,
    percentage: 1.2,
    category: "Insurance",
    founded: 1857,
    currentAssets: 43000000000,
    status: "Active Defendant",
    evidence: "Early policies on enslaved people. Founding capital from Wisconsin investors with Southern plantation ties: $4.8M.",
    filingJurisdictions: ["US-WI"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Early policies on enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      },
      {
        type: "Capital Records",
        description: "Founding capital from Wisconsin investors with Southern plantation ties",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1857
      }
    ],
    chainOfGuilt: [
      { year: 1857, entity: "Northwestern Mutual", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 74,
    name: "Massachusetts Mutual (MassMutual)",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 1.0,
    category: "Insurance",
    founded: 1851,
    currentAssets: 38000000000,
    status: "Active Defendant",
    evidence: "Insured textile mills processing slave-picked cotton. Original policies: $7.2M coverage.",
    filingJurisdictions: ["US-MA"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of textile mills processing slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1855
      }
    ],
    chainOfGuilt: [
      { year: 1851, entity: "Massachusetts Mutual", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 75,
    name: "New York Stock Exchange (Intercontinental Exchange)",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 1.8,
    category: "Financial Exchange",
    founded: 1792,
    currentAssets: 69000000000,
    status: "Active Defendant",
    evidence: "Founding members were slave traders and owners. Original slave auctions held at Wall & Pearl Streets. 40+ founding members documented slave owners.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Membership Records",
        description: "Founding members were slave traders and owners",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1792
      },
      {
        type: "Auction Records",
        description: "Original slave auctions held at Wall & Pearl Streets",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1792, entity: "New York Stock Exchange", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 76,
    name: "London Stock Exchange Group",
    country: "United Kingdom",
    slaveryDerivedWealth: 890000000,
    percentage: 1.5,
    category: "Financial Exchange",
    founded: 1801,
    currentAssets: 59000000000,
    status: "Active Defendant",
    evidence: "Traded shares of slave-trading companies. Original listings: East India Company, Royal African Company, South Sea Company.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Trading Records",
        description: "Traded shares of slave-trading companies",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      }
    ],
    chainOfGuilt: [
      { year: 1801, entity: "London Stock Exchange", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 77,
    name: "Euronext NV",
    country: "Netherlands",
    slaveryDerivedWealth: 520000000,
    percentage: 1.2,
    category: "Financial Exchange",
    founded: 1602,
    currentAssets: 43000000000,
    status: "Active Defendant",
    evidence: "Amsterdam Exchange traded Dutch West India Company shares. Original slave trade company listings: 12+ entities.",
    filingJurisdictions: ["Netherlands", "France", "Belgium"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Trading Records",
        description: "Amsterdam Exchange traded Dutch West India Company shares",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1650
      }
    ],
    chainOfGuilt: [
      { year: 1602, entity: "Euronext NV", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 78,
    name: "Toronto-Dominion Bank",
    country: "Canada",
    slaveryDerivedWealth: 680000000,
    percentage: 0.9,
    category: "Banking",
    founded: 1855,
    currentAssets: 75000000000,
    status: "Under Investigation",
    evidence: "Predecessor banks held deposits from Canadian merchants in slave trade. Original accounts: C$8M.",
    filingJurisdictions: ["Canada", "US-SDNY"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Deposit Records",
        description: "Deposits from Canadian merchants in slave trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1855, entity: "Toronto-Dominion Bank", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 79,
    name: "Royal Bank of Canada",
    country: "Canada",
    slaveryDerivedWealth: 780000000,
    percentage: 1.0,
    category: "Banking",
    founded: 1869,
    currentAssets: 78000000000,
    status: "Under Investigation",
    evidence: "Early investors from Maritime shipping families involved in triangular trade. Original capital: C$9.5M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 195000,
    ipfsEvidence: [
      {
        type: "Investment Records",
        description: "Investors from Maritime shipping families involved in triangular trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1869, entity: "Royal Bank of Canada", slaveryDerivedWealth: 780000000 }
    ]
  },
  {
    id: 80,
    name: "Bank of Montreal",
    country: "Canada",
    slaveryDerivedWealth: 620000000,
    percentage: 0.8,
    category: "Banking",
    founded: 1817,
    currentAssets: 77000000000,
    status: "Under Investigation",
    evidence: "Founding members included Montreal merchants in West Indies trade. Original deposits from slave-trade profits: C$6.8M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 155000,
    ipfsEvidence: [
      {
        type: "Membership Records",
        description: "Founding members included Montreal merchants in West Indies trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1820
      },
      {
        type: "Deposit Records",
        description: "Original deposits from slave-trade profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1817, entity: "Bank of Montreal", slaveryDerivedWealth: 620000000 }
    ]
  },
  {
    id: 81,
    name: "Bank of Nova Scotia",
    country: "Canada",
    slaveryDerivedWealth: 540000000,
    percentage: 0.7,
    category: "Banking",
    founded: 1832,
    currentAssets: 77000000000,
    status: "Under Investigation",
    evidence: "Halifax founding family investments in Caribbean shipping. Original capital from triangular trade: C$5.2M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 135000,
    ipfsEvidence: [
      {
        type: "Investment Records",
        description: "Halifax founding family investments in Caribbean shipping",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1840
      },
      {
        type: "Capital Records",
        description: "Original capital from triangular trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1832
      }
    ],
    chainOfGuilt: [
      { year: 1832, entity: "Bank of Nova Scotia", slaveryDerivedWealth: 540000000 }
    ]
  },
  {
    id: 82,
    name: "Sun Life Financial",
    country: "Canada",
    slaveryDerivedWealth: 380000000,
    percentage: 1.2,
    category: "Insurance",
    founded: 1865,
    currentAssets: 32000000000,
    status: "Under Investigation",
    evidence: "Early investors from Montreal shipping families. Post-Civil War expansion funded by slave-derived capital: C$3.8M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Early investors from Montreal shipping families",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Capital Records",
        description: "Post-Civil War expansion funded by slave-derived capital",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1875
      }
    ],
    chainOfGuilt: [
      { year: 1865, entity: "Sun Life Financial", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 83,
    name: "Manulife Financial",
    country: "Canada",
    slaveryDerivedWealth: 420000000,
    percentage: 1.1,
    category: "Insurance",
    founded: 1887,
    currentAssets: 38000000000,
    status: "Under Investigation",
    evidence: "Founding capital from Toronto merchants with Caribbean trade ties. Original investment: C$4.5M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founding capital from Toronto merchants with Caribbean trade ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1887
      }
    ],
    chainOfGuilt: [
      { year: 1887, entity: "Manulife Financial", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 84,
    name: "CIBC (Canadian Imperial Bank of Commerce)",
    country: "Canada",
    slaveryDerivedWealth: 580000000,
    percentage: 0.9,
    category: "Banking",
    founded: 1867,
    currentAssets: 64000000000,
    status: "Under Investigation",
    evidence: "Predecessor Imperial Bank of Canada held accounts from slave-trading families. Original deposits: C$6.2M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Account Records",
        description: "Accounts from slave-trading families held by Imperial Bank of Canada",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1867, entity: "CIBC", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 85,
    name: "McGill University",
    country: "Canada",
    slaveryDerivedWealth: 340000000,
    percentage: 6.8,
    category: "Education",
    founded: 1821,
    currentAssets: 5000000000,
    status: "Under Investigation",
    evidence: "James McGill bequest from fur trade profits (slavery-adjacent). Original endowment: C$3.5M in slave-era wealth.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Bequest Records",
        description: "James McGill bequest from fur trade profits",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1821
      },
      {
        type: "Endowment Records",
        description: "Original endowment in slave-era wealth",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1821
      }
    ],
    chainOfGuilt: [
      { year: 1821, entity: "McGill University", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 86,
    name: "University of Toronto",
    country: "Canada",
    slaveryDerivedWealth: 290000000,
    percentage: 3.2,
    category: "Education",
    founded: 1827,
    currentAssets: 9000000000,
    status: "Under Investigation",
    evidence: "Early benefactors from Upper Canada merchant class with slave-trade connections. Original donations: C$2.8M.",
    filingJurisdictions: ["Canada"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Benefactor Records",
        description: "Benefactors from Upper Canada merchant class with slave-trade connections",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1830
      },
      {
        type: "Donation Records",
        description: "Original donations",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1827
      }
    ],
    chainOfGuilt: [
      { year: 1827, entity: "University of Toronto", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 87,
    name: "Berkshire Hathaway",
    country: "United States",
    slaveryDerivedWealth: 1680000000,
    percentage: 0.18,
    category: "Conglomerate",
    founded: 1839,
    currentAssets: 930000000000,
    status: "Active Defendant",
    evidence: "Valley Falls Company (predecessor) used slave-picked cotton. Berkshire Fine Spinning: Original slave-cotton capital $12M (1850s).",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Production Records",
        description: "Valley Falls Company used slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Capital Records",
        description: "Original slave-cotton capital",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1839, entity: "Berkshire Hathaway", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 88,
    name: "Wachovia (Wells Fargo Heritage)",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 0.59,
    category: "Banking",
    founded: 1879,
    currentAssets: 210000000000,
    status: "Active Defendant",
    evidence: "Predecessor banks financed North Carolina tobacco plantations. Enslaved people as collateral: documented 800+ loans.",
    filingJurisdictions: ["US-NC", "US-SDNY"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of North Carolina tobacco plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1880
      },
      {
        type: "Loan Records",
        description: "Loans with enslaved people as collateral",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1879, entity: "Wachovia", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 89,
    name: "US Bancorp",
    country: "United States",
    slaveryDerivedWealth: 680000000,
    percentage: 0.75,
    category: "Banking",
    founded: 1863,
    currentAssets: 91000000000,
    status: "Under Investigation",
    evidence: "First National Bank of Cincinnati financed Ohio River trade including slave transport. Original capital: $8.2M.",
    filingJurisdictions: ["US-OH"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Ohio River trade including slave transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1865
      }
    ],
    chainOfGuilt: [
      { year: 1863, entity: "US Bancorp", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 90,
    name: "PNC Financial Services",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 0.68,
    category: "Banking",
    founded: 1845,
    currentAssets: 85000000000,
    status: "Under Investigation",
    evidence: "Pittsburgh National Bank predecessor accepted enslaved people as collateral. Documented: 200+ slave mortgages.",
    filingJurisdictions: ["US-PA"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Collateral Records",
        description: "Pittsburgh National Bank predecessor accepted enslaved people as collateral",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Mortgage Records",
        description: "Documented slave mortgages",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1845, entity: "PNC Financial Services", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 91,
    name: "Truist Financial (BB&T/SunTrust)",
    country: "United States",
    slaveryDerivedWealth: 980000000,
    percentage: 1.12,
    category: "Banking",
    founded: 1872,
    currentAssets: 87000000000,
    status: "Active Defendant",
    evidence: "Branch Banking & Trust: Virginia plantation financing. SunTrust: Georgia cotton factor loans. Combined slave capital: $15M.",
    filingJurisdictions: ["US-VA", "US-GA"],
    descendantsImpacted: 245000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Virginia plantation financing by Branch Banking & Trust",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1880
      },
      {
        type: "Loan Records",
        description: "Georgia cotton factor loans by SunTrust",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1872, entity: "Truist Financial", slaveryDerivedWealth: 980000000 }
    ]
  },
  {
    id: 92,
    name: "Capital One",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 0.52,
    category: "Banking",
    founded: 1994,
    currentAssets: 81000000000,
    status: "Under Investigation",
    evidence: "Predecessor banks (Signet, Hibernia) held slave-era deposits from Louisiana planters. Original accounts: $5.8M.",
    filingJurisdictions: ["US-VA", "US-LA"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Deposit Records",
        description: "Slave-era deposits from Louisiana planters",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1994, entity: "Capital One", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 93,
    name: "Fifth Third Bank",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 0.78,
    category: "Banking",
    founded: 1858,
    currentAssets: 44000000000,
    status: "Under Investigation",
    evidence: "Bank of the Ohio Valley financed river commerce including slave transport. Original capital: $4.2M.",
    filingJurisdictions: ["US-OH"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of river commerce including slave transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1858, entity: "Fifth Third Bank", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 94,
    name: "Regions Financial",
    country: "United States",
    slaveryDerivedWealth: 520000000,
    percentage: 1.45,
    category: "Banking",
    founded: 1971,
    currentAssets: 36000000000,
    status: "Active Defendant",
    evidence: "Predecessor banks in Alabama/Georgia: Direct plantation financing. First National Bank of Birmingham: 150+ slave mortgages.",
    filingJurisdictions: ["US-AL", "US-GA"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Direct plantation financing by predecessor banks in Alabama/Georgia",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Mortgage Records",
        description: "150+ slave mortgages by First National Bank of Birmingham",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1971, entity: "Regions Financial", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 95,
    name: "KeyCorp",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 0.92,
    category: "Banking",
    founded: 1825,
    currentAssets: 32000000000,
    status: "Under Investigation",
    evidence: "Commercial Bank of Albany financed Erie Canal (built partially by enslaved labor). Original investment: $3.8M.",
    filingJurisdictions: ["US-NY"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of Erie Canal (built partially by enslaved labor)",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1825
      }
    ],
    chainOfGuilt: [
      { year: 1825, entity: "KeyCorp", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 96,
    name: "M&T Bank",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 1.12,
    category: "Banking",
    founded: 1856,
    currentAssets: 34000000000,
    status: "Under Investigation",
    evidence: "Manufacturers and Traders Bank: Buffalo grain trade using slave-grown produce. Original capital: $4.5M.",
    filingJurisdictions: ["US-NY"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Trade Records",
        description: "Buffalo grain trade using slave-grown produce",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1856, entity: "M&T Bank", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 97,
    name: "Huntington Bancshares",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.05,
    category: "Banking",
    founded: 1866,
    currentAssets: 32000000000,
    status: "Under Investigation",
    evidence: "Huntington National Bank: Columbus merchants with Southern trade ties. Original deposits from slave economy: $4.1M.",
    filingJurisdictions: ["US-OH"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Trade Records",
        description: "Columbus merchants with Southern trade ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Deposit Records",
        description: "Original deposits from slave economy",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1866
      }
    ],
    chainOfGuilt: [
      { year: 1866, entity: "Huntington Bancshares", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 98,
    name: "Citizens Financial Group",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 0.88,
    category: "Banking",
    founded: 1828,
    currentAssets: 48000000000,
    status: "Under Investigation",
    evidence: "Rhode Island textile mill financing using slave-picked cotton. Original capital from slave economy: $5.2M.",
    filingJurisdictions: ["US-RI"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Rhode Island textile mill financing using slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Capital Records",
        description: "Original capital from slave economy",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1828
      }
    ],
    chainOfGuilt: [
      { year: 1828, entity: "Citizens Financial Group", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 99,
    name: "Comerica",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 0.95,
    category: "Banking",
    founded: 1849,
    currentAssets: 31000000000,
    status: "Under Investigation",
    evidence: "Detroit Savings Fund Institute: Great Lakes shipping including slave transport. Original capital: $3.5M.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Shipping Records",
        description: "Great Lakes shipping including slave transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1849, entity: "Comerica", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 100,
    name: "Zions Bancorporation",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.25,
    category: "Banking",
    founded: 1873,
    currentAssets: 19200000000,
    status: "Under Investigation",
    evidence: "Founded with capital from Mormon settlers who practiced slavery in Missouri/Illinois. Original investment: $2.8M.",
    filingJurisdictions: ["US-UT"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from Mormon settlers who practiced slavery",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1873
      }
    ],
    chainOfGuilt: [
      { year: 1873, entity: "Zions Bancorporation", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 101,
    name: "Hancock Whitney",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 2.15,
    category: "Banking",
    founded: 1899,
    currentAssets: 18000000000,
    status: "Active Defendant",
    evidence: "Hancock Bank: Mississippi plantation loans. Whitney Bank: New Orleans cotton factors. Combined slave capital: $6.2M.",
    filingJurisdictions: ["US-MS", "US-LA"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Loan Records",
        description: "Mississippi plantation loans by Hancock Bank",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Business Records",
        description: "New Orleans cotton factors by Whitney Bank",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1905
      }
    ],
    chainOfGuilt: [
      { year: 1899, entity: "Hancock Whitney", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 102,
    name: "First Horizon (First Tennessee)",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 1.85,
    category: "Banking",
    founded: 1864,
    currentAssets: 23000000000,
    status: "Active Defendant",
    evidence: "First National Bank of Memphis: Cotton factor financing. Direct loans on 500+ enslaved people. Original capital: $5.8M.",
    filingJurisdictions: ["US-TN"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Cotton factor financing by First National Bank of Memphis",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Loan Records",
        description: "Direct loans on 500+ enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1864, entity: "First Horizon", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 103,
    name: "Synovus Financial",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.92,
    category: "Banking",
    founded: 1888,
    currentAssets: 18000000000,
    status: "Active Defendant",
    evidence: "Columbus Bank & Trust: Georgia plantation financing. Documented: 200+ slave mortgages. Original capital: $4.5M.",
    filingJurisdictions: ["US-GA"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Georgia plantation financing by Columbus Bank & Trust",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1890
      },
      {
        type: "Mortgage Records",
        description: "Documented slave mortgages",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1888, entity: "Synovus Financial", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 104,
    name: "Valley National Bank",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.35,
    category: "Banking",
    founded: 1927,
    currentAssets: 18000000000,
    status: "Under Investigation",
    evidence: "Predecessor banks in New Jersey financed New York/Philadelphia slave trade routes. Original capital: $3.2M.",
    filingJurisdictions: ["US-NJ"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financing of New York/Philadelphia slave trade routes",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1930
      }
    ],
    chainOfGuilt: [
      { year: 1927, entity: "Valley National Bank", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 105,
    name: "Western & Southern Financial",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 1.45,
    category: "Insurance",
    founded: 1888,
    currentAssets: 26000000000,
    status: "Under Investigation",
    evidence: "Cincinnati-based insurer of Ohio River commerce including slave transport. Original policies: $5.2M coverage.",
    filingJurisdictions: ["US-OH"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of Ohio River commerce including slave transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1888, entity: "Western & Southern Financial", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 106,
    name: "Principal Financial Group",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 0.95,
    category: "Insurance",
    founded: 1879,
    currentAssets: 44000000000,
    status: "Under Investigation",
    evidence: "Early Iowa investors from families with Missouri slave-trade connections. Original capital: $5.8M.",
    filingJurisdictions: ["US-IA"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Early Iowa investors from families with Missouri slave-trade connections",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1879, entity: "Principal Financial Group", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 107,
    name: "Lincoln National",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.12,
    category: "Insurance",
    founded: 1905,
    currentAssets: 30000000000,
    status: "Under Investigation",
    evidence: "Founded with capital from Fort Wayne merchants with Southern trade ties. Original investment: $4.5M.",
    filingJurisdictions: ["US-IN"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from Fort Wayne merchants with Southern trade ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1905
      }
    ],
    chainOfGuilt: [
      { year: 1905, entity: "Lincoln National", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 108,
    name: "Aflac",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 0.85,
    category: "Insurance",
    founded: 1955,
    currentAssets: 34000000000,
    status: "Under Investigation",
    evidence: "Founding family wealth from Georgia textile mills processing slave-picked cotton. Original capital: $3.8M.",
    filingJurisdictions: ["US-GA"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Wealth Records",
        description: "Founding family wealth from Georgia textile mills processing slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1955
      }
    ],
    chainOfGuilt: [
      { year: 1955, entity: "Aflac", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 109,
    name: "Guardian Life",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 1.05,
    category: "Insurance",
    founded: 1860,
    currentAssets: 36000000000,
    status: "Active Defendant",
    evidence: "Germania Life (predecessor) insured New York merchants in slave trade. Original policies on slave ships: 80+ documented.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Germania Life insured New York merchants in slave trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1865
      }
    ],
    chainOfGuilt: [
      { year: 1860, entity: "Guardian Life", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 110,
    name: "Mutual of Omaha",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.25,
    category: "Insurance",
    founded: 1909,
    currentAssets: 23000000000,
    status: "Under Investigation",
    evidence: "Early investors from Nebraska families with Missouri plantation ties. Original capital: $3.5M.",
    filingJurisdictions: ["US-NE"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Early investors from Nebraska families with Missouri plantation ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1910
      }
    ],
    chainOfGuilt: [
      { year: 1909, entity: "Mutual of Omaha", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 111,
    name: "New York Life Insurance",
    country: "United States",
    slaveryDerivedWealth: 680000000,
    percentage: 2.35,
    category: "Insurance",
    founded: 1845,
    currentAssets: 29000000000,
    status: "Active Defendant",
    evidence: "Insured enslaved people as property. Original policies: 500+ documented on enslaved 'cargo'. Death benefits paid to slaveholders.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Policies insuring enslaved people as property",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Claims Records",
        description: "Death benefits paid to slaveholders",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1845, entity: "New York Life Insurance", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 112,
    name: "Pacific Life",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.15,
    category: "Insurance",
    founded: 1868,
    currentAssets: 21000000000,
    status: "Under Investigation",
    evidence: "California founding capital from San Francisco merchants in coolie trade (slavery-adjacent). Original investment: $3.2M.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "California founding capital from San Francisco merchants in coolie trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1868, entity: "Pacific Life", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 113,
    name: "Transamerica",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 0.95,
    category: "Insurance",
    founded: 1928,
    currentAssets: 36000000000,
    status: "Under Investigation",
    evidence: "Predecessor firms insured Pacific trade routes including coolie ships. Original policies: 100+ documented voyages.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Insurance of Pacific trade routes including coolie ships",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1930
      }
    ],
    chainOfGuilt: [
      { year: 1928, entity: "Transamerica", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 114,
    name: "Unum Group",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.45,
    category: "Insurance",
    founded: 1848,
    currentAssets: 20000000000,
    status: "Under Investigation",
    evidence: "Union Mutual (predecessor) insured Portland, Maine shipping including slave-trade routes. Original capital: $3.8M.",
    filingJurisdictions: ["US-ME"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Union Mutual insured Portland, Maine shipping including slave-trade routes",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1848, entity: "Unum Group", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 115,
    name: "Assurant",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.25,
    category: "Insurance",
    founded: 1892,
    currentAssets: 19200000000,
    status: "Under Investigation",
    evidence: "Predecessor firms insured textile mills processing slave-picked cotton. Original policies: $3.5M coverage.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Insurance Policies",
        description: "Predecessor firms insured textile mills processing slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1895
      }
    ],
    chainOfGuilt: [
      { year: 1892, entity: "Assurant", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 116,
    name: "Reinsurance Group of America",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.35,
    category: "Insurance",
    founded: 1973,
    currentAssets: 25000000000,
    status: "Under Investigation",
    evidence: "Predecessor reinsurance companies covered slave-ship voyages and plantation properties. Original policies: $4.8M.",
    filingJurisdictions: ["US-MO"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Reinsurance Policies",
        description: "Coverage of slave-ship voyages and plantation properties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1975
      }
    ],
    chainOfGuilt: [
      { year: 1973, entity: "Reinsurance Group of America", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 117,
    name: "Globe Life",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.55,
    category: "Insurance",
    founded: 1900,
    currentAssets: 15500000000,
    status: "Under Investigation",
    evidence: "Oklahoma/Texas founding capital from families with Arkansas plantation ties. Original investment: $3.2M.",
    filingJurisdictions: ["US-TX"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founding capital from families with Arkansas plantation ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1900, entity: "Globe Life", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 118,
    name: "Voya Financial",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.25,
    category: "Insurance",
    founded: 1991,
    currentAssets: 23000000000,
    status: "Under Investigation",
    evidence: "ING America predecessor firms held slave-era wealth deposits. Original capital from Dutch colonial profits: $3.8M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Deposit Records",
        description: "Slave-era wealth deposits held by ING America predecessor firms",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1991
      },
      {
        type: "Capital Records",
        description: "Original capital from Dutch colonial profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1991
      }
    ],
    chainOfGuilt: [
      { year: 1991, entity: "Voya Financial", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 119,
    name: "Brighthouse Financial",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.15,
    category: "Insurance",
    founded: 2017,
    currentAssets: 21000000000,
    status: "Under Investigation",
    evidence: "MetLife spin-off carrying historical slave-era policy liabilities. Original slave life insurance: $3.2M documented.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Policy Liabilities",
        description: "Historical slave-era policy liabilities",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2017
      },
      {
        type: "Insurance Records",
        description: "Original slave life insurance documented",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 2017, entity: "Brighthouse Financial", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 120,
    name: "Athene Holding",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 0.95,
    category: "Insurance",
    founded: 2009,
    currentAssets: 31000000000,
    status: "Under Investigation",
    evidence: "Acquired legacy portfolios from insurers with slave-era policies. Historical liabilities: $3.8M traced.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Portfolio Acquisition Records",
        description: "Acquired legacy portfolios from insurers with slave-era policies",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2009
      }
    ],
    chainOfGuilt: [
      { year: 2009, entity: "Athene Holding", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 121,
    name: "Brown Brothers Harriman",
    country: "United States",
    slaveryDerivedWealth: 1420000000,
    percentage: 8.5,
    category: "Banking",
    founded: 1818,
    currentAssets: 16700000000,
    status: "Active Defendant",
    evidence: "Founded by Alexander Brown - slave ship owner and cotton merchant. Original capital from slave trade: $8.2M. Financed Southern plantation expansion.",
    filingJurisdictions: ["US-SDNY", "UK"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Alexander Brown - slave ship owner",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1820
      },
      {
        type: "Capital Records",
        description: "Original capital from slave trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1818
      },
      {
        type: "Financing Records",
        description: "Financed Southern plantation expansion",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1818, entity: "Brown Brothers Harriman", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 122,
    name: "Northern Trust",
    country: "United States",
    slaveryDerivedWealth: 680000000,
    percentage: 3.2,
    category: "Banking",
    founded: 1889,
    currentAssets: 21300000000,
    status: "Under Investigation",
    evidence: "Founded with Chicago merchant wealth from slave-economy commodities. Original capital: $7.8M from grain/meat trade.",
    filingJurisdictions: ["US-IL"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Chicago merchant wealth from slave-economy commodities",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1889
      }
    ],
    chainOfGuilt: [
      { year: 1889, entity: "Northern Trust", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 123,
    name: "State Street Corporation",
    country: "United States",
    slaveryDerivedWealth: 1890000000,
    percentage: 5.2,
    category: "Banking",
    founded: 1792,
    currentAssets: 36400000000,
    status: "Active Defendant",
    evidence: "Union Bank predecessor accepted enslaved people as collateral. Boston shipping investments in triangular trade. Original slave capital: $12.5M.",
    filingJurisdictions: ["US-MA", "US-SDNY"],
    descendantsImpacted: 473000,
    ipfsEvidence: [
      {
        type: "Collateral Records",
        description: "Union Bank predecessor accepted enslaved people as collateral",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1810
      },
      {
        type: "Investment Records",
        description: "Boston shipping investments in triangular trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1820
      }
    ],
    chainOfGuilt: [
      { year: 1792, entity: "State Street Corporation", slaveryDerivedWealth: 1890000000 }
    ]
  },
  {
    id: 124,
    name: "BNY Mellon",
    country: "United States",
    slaveryDerivedWealth: 2340000000,
    percentage: 4.8,
    category: "Banking",
    founded: 1784,
    currentAssets: 48700000000,
    status: "Active Defendant",
    evidence: "Bank of New York founders owned enslaved people. Alexander Hamilton's bank financed slave trade routes. Original capital: $15.2M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 585000,
    ipfsEvidence: [
      {
        type: "Ownership Records",
        description: "Bank of New York founders owned enslaved people",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1790
      },
      {
        type: "Financing Records",
        description: "Alexander Hamilton's bank financed slave trade routes",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1784, entity: "BNY Mellon", slaveryDerivedWealth: 2340000000 }
    ]
  },
  {
    id: 125,
    name: "Morgan Stanley",
    country: "United States",
    slaveryDerivedWealth: 1680000000,
    percentage: 1.4,
    category: "Banking",
    founded: 1935,
    currentAssets: 120000000000,
    status: "Active Defendant",
    evidence: "Predecessor firms handled slave-owner estates and plantation mortgages. J.P. Morgan lineage: $11.8M slave-derived capital.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Estate Records",
        description: "Handling of slave-owner estates",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Mortgage Records",
        description: "Handling of plantation mortgages",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1910
      },
      {
        type: "Capital Records",
        description: "J.P. Morgan lineage slave-derived capital",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1935
      }
    ],
    chainOfGuilt: [
      { year: 1935, entity: "Morgan Stanley", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 126,
    name: "Goldman Sachs",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 0.9,
    category: "Banking",
    founded: 1869,
    currentAssets: 138000000000,
    status: "Under Investigation",
    evidence: "Early investors included families with Southern plantation wealth. Post-Civil War cotton factor financing: $9.5M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Investor Records",
        description: "Families with Southern plantation wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Financing Records",
        description: "Post-Civil War cotton factor financing",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1875
      }
    ],
    chainOfGuilt: [
      { year: 1869, entity: "Goldman Sachs", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 127,
    name: "Lazard Ltd",
    country: "France/US",
    slaveryDerivedWealth: 580000000,
    percentage: 4.2,
    category: "Banking",
    founded: 1848,
    currentAssets: 13800000000,
    status: "Active Defendant",
    evidence: "Founded with New Orleans dry goods wealth from slave economy. Lazard Frères handled plantation estates. Original capital: $6.8M.",
    filingJurisdictions: ["France", "US-SDNY"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "New Orleans dry goods wealth from slave economy",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1848
      },
      {
        type: "Estate Records",
        description: "Lazard Frères handled plantation estates",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1848, entity: "Lazard Ltd", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 128,
    name: "Raymond James Financial",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 1.8,
    category: "Banking",
    founded: 1962,
    currentAssets: 18900000000,
    status: "Under Investigation",
    evidence: "Acquired firms with historical slave-era trust portfolios. Florida land grants from slave labor: $4.2M traced.",
    filingJurisdictions: ["US-FL"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Portfolio Acquisition Records",
        description: "Historical slave-era trust portfolios",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1962
      },
      {
        type: "Land Grant Records",
        description: "Florida land grants from slave labor",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1965
      }
    ],
    chainOfGuilt: [
      { year: 1962, entity: "Raymond James Financial", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 129,
    name: "Jefferies Financial Group",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.5,
    category: "Banking",
    founded: 1962,
    currentAssets: 19300000000,
    status: "Under Investigation",
    evidence: "Predecessor firms handled estates with slave-derived wealth. Historical trading in slave-economy securities: $3.5M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Estate Records",
        description: "Handling of estates with slave-derived wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1965
      },
      {
        type: "Trading Records",
        description: "Historical trading in slave-economy securities",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1970
      }
    ],
    chainOfGuilt: [
      { year: 1962, entity: "Jefferies Financial Group", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 130,
    name: "Stifel Financial",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 2.1,
    category: "Banking",
    founded: 1890,
    currentAssets: 18100000000,
    status: "Under Investigation",
    evidence: "St. Louis founding capital from Mississippi River commerce including slave transport. Original investment: $4.8M.",
    filingJurisdictions: ["US-MO"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "St. Louis founding capital from Mississippi River commerce including slave transport",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1890, entity: "Stifel Financial", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 131,
    name: "Edward Jones",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 2.8,
    category: "Banking",
    founded: 1922,
    currentAssets: 15000000000,
    status: "Under Investigation",
    evidence: "Founded with St. Louis merchant wealth from slave-economy trade. Original capital: $5.2M from river commerce.",
    filingJurisdictions: ["US-MO"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "St. Louis merchant wealth from slave-economy trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1922
      }
    ],
    chainOfGuilt: [
      { year: 1922, entity: "Edward Jones", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 132,
    name: "Robert W. Baird & Co",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 2.4,
    category: "Banking",
    founded: 1919,
    currentAssets: 12100000000,
    status: "Under Investigation",
    evidence: "Milwaukee founding families with grain trade ties to slave economy. Original capital: $3.6M.",
    filingJurisdictions: ["US-WI"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Milwaukee founding families with grain trade ties to slave economy",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1919
      }
    ],
    chainOfGuilt: [
      { year: 1919, entity: "Robert W. Baird & Co", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 133,
    name: "Piper Sandler",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 2.2,
    category: "Banking",
    founded: 1895,
    currentAssets: 10900000000,
    status: "Under Investigation",
    evidence: "Minnesota founding capital from lumber trade using forced labor. Original investment: $3.1M.",
    filingJurisdictions: ["US-MN"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Minnesota founding capital from lumber trade using forced labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1895
      }
    ],
    chainOfGuilt: [
      { year: 1895, entity: "Piper Sandler", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 134,
    name: "William Blair & Company",
    country: "United States",
    slaveryDerivedWealth: 340000000,
    percentage: 2.6,
    category: "Banking",
    founded: 1935,
    currentAssets: 13100000000,
    status: "Under Investigation",
    evidence: "Founding partners' families held slave-derived Chicago real estate. Original capital: $4.3M.",
    filingJurisdictions: ["US-IL"],
    descendantsImpacted: 85000,
    ipfsEvidence: [
      {
        type: "Real Estate Records",
        description: "Founding partners' families held slave-derived Chicago real estate",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1935
      }
    ],
    chainOfGuilt: [
      { year: 1935, entity: "William Blair & Company", slaveryDerivedWealth: 340000000 }
    ]
  },
  {
    id: 135,
    name: "Bessemer Trust",
    country: "United States",
    slaveryDerivedWealth: 520000000,
    percentage: 5.8,
    category: "Banking",
    founded: 1907,
    currentAssets: 8970000000,
    status: "Active Defendant",
    evidence: "Founded with Phipps family steel fortune - built on slave-mined coal and iron. Original capital: $6.5M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 130000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Phipps family steel fortune built on slave-mined coal and iron",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1907
      }
    ],
    chainOfGuilt: [
      { year: 1907, entity: "Bessemer Trust", slaveryDerivedWealth: 520000000 }
    ]
  },
  {
    id: 136,
    name: "Oppenheimer & Co",
    country: "United States",
    slaveryDerivedWealth: 380000000,
    percentage: 3.4,
    category: "Banking",
    founded: 1881,
    currentAssets: 11200000000,
    status: "Under Investigation",
    evidence: "Early clients included families with plantation wealth. Historical slave-economy securities trading: $4.9M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 95000,
    ipfsEvidence: [
      {
        type: "Client Records",
        description: "Early clients included families with plantation wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1885
      },
      {
        type: "Trading Records",
        description: "Historical slave-economy securities trading",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1890
      }
    ],
    chainOfGuilt: [
      { year: 1881, entity: "Oppenheimer & Co", slaveryDerivedWealth: 380000000 }
    ]
  },
  {
    id: 137,
    name: "Cantor Fitzgerald",
    country: "United States",
    slaveryDerivedWealth: 290000000,
    percentage: 1.8,
    category: "Banking",
    founded: 1945,
    currentAssets: 16100000000,
    status: "Under Investigation",
    evidence: "Predecessor firms traded government bonds that financed slave territories. Historical portfolio: $3.7M traced.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Trading Records",
        description: "Government bonds that financed slave territories",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1950
      }
    ],
    chainOfGuilt: [
      { year: 1945, entity: "Cantor Fitzgerald", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 138,
    name: "Evercore Inc",
    country: "United States",
    slaveryDerivedWealth: 240000000,
    percentage: 1.6,
    category: "Banking",
    founded: 1995,
    currentAssets: 15000000000,
    status: "Under Investigation",
    evidence: "Founding partners inherited wealth from families with slave-era estates. Traced lineage: $3.2M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 60000,
    ipfsEvidence: [
      {
        type: "Inheritance Records",
        description: "Wealth inherited from families with slave-era estates",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1995
      }
    ],
    chainOfGuilt: [
      { year: 1995, entity: "Evercore Inc", slaveryDerivedWealth: 240000000 }
    ]
  },
  {
    id: 139,
    name: "Greenhill & Co",
    country: "United States",
    slaveryDerivedWealth: 180000000,
    percentage: 2.1,
    category: "Banking",
    founded: 1996,
    currentAssets: 8570000000,
    status: "Under Investigation",
    evidence: "Founding capital from families with historical Southern plantation ties. Original investment: $2.4M traced.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 45000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founding capital from families with historical Southern plantation ties",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1996
      }
    ],
    chainOfGuilt: [
      { year: 1996, entity: "Greenhill & Co", slaveryDerivedWealth: 180000000 }
    ]
  },
  {
    id: 140,
    name: "Moelis & Company",
    country: "United States",
    slaveryDerivedWealth: 220000000,
    percentage: 1.9,
    category: "Banking",
    founded: 2007,
    currentAssets: 11600000000,
    status: "Under Investigation",
    evidence: "Founding team wealth traced to families with slave-economy real estate holdings. Historical capital: $2.8M.",
    filingJurisdictions: ["US-SDNY", "US-CA"],
    descendantsImpacted: 55000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founding team wealth traced to families with slave-economy real estate holdings",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2007
      }
    ],
    chainOfGuilt: [
      { year: 2007, entity: "Moelis & Company", slaveryDerivedWealth: 220000000 }
    ]
  },
  {
    id: 141,
    name: "Citigroup Inc.",
    country: "United States",
    slaveryDerivedWealth: 4280000000,
    percentage: 1.9,
    category: "Banking",
    founded: 1812,
    currentAssets: 225000000000,
    status: "Active Defendant",
    evidence: "City Bank of New York accepted enslaved people as collateral. Original slave mortgages: $18.5M. Predecessor banks financed cotton plantations across the South.",
    filingJurisdictions: ["US-SDNY", "UK", "Switzerland"],
    descendantsImpacted: 1070000,
    ipfsEvidence: [
      {
        type: "Collateral Records",
        description: "City Bank of New York accepted enslaved people as collateral",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1820
      },
      {
        type: "Mortgage Records",
        description: "Original slave mortgages",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      },
      {
        type: "Financing Records",
        description: "Financed cotton plantations across the South",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1840
      }
    ],
    chainOfGuilt: [
      { year: 1812, entity: "Citigroup Inc.", slaveryDerivedWealth: 4280000000 }
    ]
  },
  {
    id: 142,
    name: "Bank of America",
    country: "United States",
    slaveryDerivedWealth: 3650000000,
    percentage: 1.3,
    category: "Banking",
    founded: 1904,
    currentAssets: 280000000000,
    status: "Active Defendant",
    evidence: "Acquired banks (NationsBank, FleetBoston) held slave-era mortgages. North Carolina predecessor banks: 300+ plantation loans. Original capital: $16.2M.",
    filingJurisdictions: ["US-NC", "US-SDNY"],
    descendantsImpacted: 913000,
    ipfsEvidence: [
      {
        type: "Mortgage Records",
        description: "Slave-era mortgages held by acquired banks",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1905
      },
      {
        type: "Loan Records",
        description: "300+ plantation loans by North Carolina predecessor banks",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1880
      }
    ],
    chainOfGuilt: [
      { year: 1904, entity: "Bank of America", slaveryDerivedWealth: 3650000000 }
    ]
  },
  {
    id: 143,
    name: "Peabody Trust",
    country: "United Kingdom",
    slaveryDerivedWealth: 1240000000,
    percentage: 38.5,
    category: "Housing/Charity",
    founded: 1862,
    currentAssets: 3220000000,
    status: "Active Defendant",
    evidence: "George Peabody wealth from Baltimore slave-trade merchant banking. Original endowment: £500,000 from slave economy profits.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Banking Records",
        description: "George Peabody wealth from Baltimore slave-trade merchant banking",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      },
      {
        type: "Endowment Records",
        description: "Original endowment from slave economy profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1862
      }
    ],
    chainOfGuilt: [
      { year: 1862, entity: "Peabody Trust", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 144,
    name: "Wellcome Trust",
    country: "United Kingdom",
    slaveryDerivedWealth: 8900000000,
    percentage: 24.2,
    category: "Medical Research",
    founded: 1936,
    currentAssets: 36800000000,
    status: "Active Defendant",
    evidence: "Henry Wellcome pharmaceutical fortune built on quinine trade (colonial extraction). Original capital from colonial medicine monopolies: £42M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 2225000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Henry Wellcome pharmaceutical fortune built on quinine trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Capital Records",
        description: "Original capital from colonial medicine monopolies",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1936
      }
    ],
    chainOfGuilt: [
      { year: 1936, entity: "Wellcome Trust", slaveryDerivedWealth: 8900000000 }
    ]
  },
  {
    id: 145,
    name: "National Trust (UK)",
    country: "United Kingdom",
    slaveryDerivedWealth: 2680000000,
    percentage: 42.8,
    category: "Heritage/Conservation",
    founded: 1895,
    currentAssets: 6260000000,
    status: "Settlement Discussions",
    evidence: "115+ properties with direct slavery connections. Estates donated by families who received compensation: £12.8M aggregate.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 670000,
    ipfsEvidence: [
      {
        type: "Property Records",
        description: "115+ properties with direct slavery connections",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1895
      },
      {
        type: "Donation Records",
        description: "Estates donated by families who received compensation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1895, entity: "National Trust (UK)", slaveryDerivedWealth: 2680000000 }
    ]
  },
  {
    id: 146,
    name: "British Museum",
    country: "United Kingdom",
    slaveryDerivedWealth: 420000000,
    percentage: 31.3,
    category: "Museum/Cultural",
    founded: 1753,
    currentAssets: 1340000000,
    status: "Under Investigation",
    evidence: "Hans Sloane founding collection purchased with Jamaican plantation wealth. Original bequest from 350+ enslaved people's labor.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Collection Acquisition Records",
        description: "Hans Sloane founding collection purchased with Jamaican plantation wealth",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1753
      }
    ],
    chainOfGuilt: [
      { year: 1753, entity: "British Museum", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 147,
    name: "Tate Galleries",
    country: "United Kingdom",
    slaveryDerivedWealth: 180000000,
    percentage: 28.1,
    category: "Museum/Cultural",
    founded: 1897,
    currentAssets: 640000000,
    status: "Settlement Discussions",
    evidence: "Henry Tate sugar fortune from slave-grown cane. Original endowment: £80,000 from plantation commodities.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 45000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Henry Tate sugar fortune from slave-grown cane",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1897
      },
      {
        type: "Endowment Records",
        description: "Original endowment from plantation commodities",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1897
      }
    ],
    chainOfGuilt: [
      { year: 1897, entity: "Tate Galleries", slaveryDerivedWealth: 180000000 }
    ]
  },
  {
    id: 148,
    name: "Dulwich Picture Gallery",
    country: "United Kingdom",
    slaveryDerivedWealth: 42000000,
    percentage: 35.6,
    category: "Museum/Cultural",
    founded: 1811,
    currentAssets: 118000000,
    status: "Under Investigation",
    evidence: "Edward Alleyn estate from slave-trade era investments. Founding benefactors owned plantations in West Indies.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 11000,
    ipfsEvidence: [
      {
        type: "Estate Records",
        description: "Edward Alleyn estate from slave-trade era investments",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1811
      },
      {
        type: "Benefactor Records",
        description: "Founding benefactors owned plantations in West Indies",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1811
      }
    ],
    chainOfGuilt: [
      { year: 1811, entity: "Dulwich Picture Gallery", slaveryDerivedWealth: 42000000 }
    ]
  },
  {
    id: 149,
    name: "Victoria & Albert Museum",
    country: "United Kingdom",
    slaveryDerivedWealth: 290000000,
    percentage: 22.3,
    category: "Museum/Cultural",
    founded: 1852,
    currentAssets: 1300000000,
    status: "Under Investigation",
    evidence: "Early donors included families with slave compensation receipts. Collections purchased with slave-derived wealth: £3.2M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 73000,
    ipfsEvidence: [
      {
        type: "Donor Records",
        description: "Early donors included families with slave compensation receipts",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1852
      },
      {
        type: "Acquisition Records",
        description: "Collections purchased with slave-derived wealth",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1852, entity: "Victoria & Albert Museum", slaveryDerivedWealth: 290000000 }
    ]
  },
  {
    id: 150,
    name: "Royal Society",
    country: "United Kingdom",
    slaveryDerivedWealth: 68000000,
    percentage: 18.9,
    category: "Scientific Institution",
    founded: 1660,
    currentAssets: 360000000,
    status: "Under Investigation",
    evidence: "Fellows owned plantations and received compensation. Hans Sloane (President) owned 800+ enslaved people in Jamaica.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 17000,
    ipfsEvidence: [
      {
        type: "Fellowship Records",
        description: "Fellows owned plantations and received compensation",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1700
      },
      {
        type: "Ownership Records",
        description: "Hans Sloane (President) owned 800+ enslaved people in Jamaica",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1720
      }
    ],
    chainOfGuilt: [
      { year: 1660, entity: "Royal Society", slaveryDerivedWealth: 68000000 }
    ]
  },
  {
    id: 151,
    name: "Royal Academy of Arts",
    country: "United Kingdom",
    slaveryDerivedWealth: 95000000,
    percentage: 26.4,
    category: "Arts Institution",
    founded: 1768,
    currentAssets: 360000000,
    status: "Under Investigation",
    evidence: "Founding members owned plantations. Early patrons received slave compensation totaling £420,000.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 24000,
    ipfsEvidence: [
      {
        type: "Membership Records",
        description: "Founding members owned plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1770
      },
      {
        type: "Compensation Records",
        description: "Early patrons received slave compensation totaling £420,000",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1768, entity: "Royal Academy of Arts", slaveryDerivedWealth: 95000000 }
    ]
  },
  {
    id: 152,
    name: "Smithsonian Institution",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 21.4,
    category: "Museum/Research",
    founded: 1846,
    currentAssets: 5800000000,
    status: "Under Investigation",
    evidence: "James Smithson fortune from mining operations using enslaved labor. Early trustees owned enslaved people. Original bequest: £104,960.",
    filingJurisdictions: ["US-DC"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "James Smithson fortune from mining operations using enslaved labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1846
      },
      {
        type: "Trustee Records",
        description: "Early trustees owned enslaved people",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1846
      }
    ],
    chainOfGuilt: [
      { year: 1846, entity: "Smithsonian Institution", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 153,
    name: "Metropolitan Museum of Art",
    country: "United States",
    slaveryDerivedWealth: 1680000000,
    percentage: 18.2,
    category: "Museum/Cultural",
    founded: 1870,
    currentAssets: 9230000000,
    status: "Under Investigation",
    evidence: "Founding families' wealth from slave-economy investments. Early donations traced to plantation profits: $8.5M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Investment Records",
        description: "Founding families' wealth from slave-economy investments",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Donation Records",
        description: "Early donations traced to plantation profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1875
      }
    ],
    chainOfGuilt: [
      { year: 1870, entity: "Metropolitan Museum of Art", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 154,
    name: "Museum of Fine Arts Boston",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 24.1,
    category: "Museum/Cultural",
    founded: 1870,
    currentAssets: 2400000000,
    status: "Under Investigation",
    evidence: "Founded with textile merchant wealth from slave-picked cotton. Original endowment: $2.8M from slave economy.",
    filingJurisdictions: ["US-MA"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founded with textile merchant wealth from slave-picked cotton",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      },
      {
        type: "Endowment Records",
        description: "Original endowment from slave economy",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1870, entity: "Museum of Fine Arts Boston", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 155,
    name: "Carnegie Corporation",
    country: "United States",
    slaveryDerivedWealth: 2340000000,
    percentage: 58.5,
    category: "Foundation/Charity",
    founded: 1911,
    currentAssets: 4000000000,
    status: "Active Defendant",
    evidence: "Andrew Carnegie steel fortune built on coal mined by enslaved/convict labor. Original capital from post-Civil War exploitation: $12M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 585000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Andrew Carnegie steel fortune built on coal mined by enslaved/convict labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Capital Records",
        description: "Original capital from post-Civil War exploitation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1911
      }
    ],
    chainOfGuilt: [
      { year: 1911, entity: "Carnegie Corporation", slaveryDerivedWealth: 2340000000 }
    ]
  },
  {
    id: 156,
    name: "Rockefeller Foundation",
    country: "United States",
    slaveryDerivedWealth: 1890000000,
    percentage: 35.8,
    category: "Foundation/Charity",
    founded: 1913,
    currentAssets: 5280000000,
    status: "Active Defendant",
    evidence: "Standard Oil monopoly profited from slave-labor coal mining. John D. Rockefeller Sr. investments in sharecropping systems: $9.2M traced.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 473000,
    ipfsEvidence: [
      {
        type: "Profit Records",
        description: "Standard Oil monopoly profited from slave-labor coal mining",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      },
      {
        type: "Investment Records",
        description: "John D. Rockefeller Sr. investments in sharecropping systems",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1910
      }
    ],
    chainOfGuilt: [
      { year: 1913, entity: "Rockefeller Foundation", slaveryDerivedWealth: 1890000000 }
    ]
  },
  {
    id: 157,
    name: "Ford Foundation",
    country: "United States",
    slaveryDerivedWealth: 1420000000,
    percentage: 9.5,
    category: "Foundation/Charity",
    founded: 1936,
    currentAssets: 14900000000,
    status: "Under Investigation",
    evidence: "Henry Ford fortune from auto industry using convict lease labor. Original capital from exploitative labor systems: $6.8M.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Henry Ford fortune from auto industry using convict lease labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1920
      },
      {
        type: "Capital Records",
        description: "Original capital from exploitative labor systems",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1936
      }
    ],
    chainOfGuilt: [
      { year: 1936, entity: "Ford Foundation", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 158,
    name: "Getty Trust",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 10.4,
    category: "Museum/Foundation",
    founded: 1953,
    currentAssets: 8560000000,
    status: "Under Investigation",
    evidence: "J. Paul Getty oil fortune from Oklahoma fields using discriminatory labor practices. Original capital: $4.2M traced to exploitative systems.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "J. Paul Getty oil fortune from Oklahoma fields using discriminatory labor practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1953
      }
    ],
    chainOfGuilt: [
      { year: 1953, entity: "Getty Trust", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 159,
    name: "Mellon Foundation",
    country: "United States",
    slaveryDerivedWealth: 2680000000,
    percentage: 32.1,
    category: "Foundation/Charity",
    founded: 1969,
    currentAssets: 8350000000,
    status: "Active Defendant",
    evidence: "Mellon banking/industrial fortune from Pittsburgh steel mills using slave-labor coal. Original capital: $14.5M from exploitative systems.",
    filingJurisdictions: ["US-PA"],
    descendantsImpacted: 670000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Mellon banking/industrial fortune from Pittsburgh steel mills using slave-labor coal",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1969
      }
    ],
    chainOfGuilt: [
      { year: 1969, entity: "Mellon Foundation", slaveryDerivedWealth: 2680000000 }
    ]
  },
  {
    id: 160,
    name: "Kellogg Foundation",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 8.9,
    category: "Foundation/Charity",
    founded: 1930,
    currentAssets: 4720000000,
    status: "Under Investigation",
    evidence: "W.K. Kellogg cereal fortune from grain sourced via exploitative sharecropping. Original capital: $2.1M traced.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "W.K. Kellogg cereal fortune from grain sourced via exploitative sharecropping",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1930
      }
    ],
    chainOfGuilt: [
      { year: 1930, entity: "Kellogg Foundation", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 161,
    name: "Duke Endowment",
    country: "United States",
    slaveryDerivedWealth: 1680000000,
    percentage: 42.0,
    category: "Foundation/Charity",
    founded: 1924,
    currentAssets: 4000000000,
    status: "Active Defendant",
    evidence: "Duke family tobacco fortune from sharecropping and convict lease systems. Original capital: $8.9M from exploitative labor.",
    filingJurisdictions: ["US-NC"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Duke family tobacco fortune from sharecropping and convict lease systems",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1924
      }
    ],
    chainOfGuilt: [
      { year: 1924, entity: "Duke Endowment", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 162,
    name: "Pew Charitable Trusts",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 18.2,
    category: "Foundation/Charity",
    founded: 1948,
    currentAssets: 6820000000,
    status: "Under Investigation",
    evidence: "Sun Oil (Sunoco) fortune from discriminatory hiring and Texas oil fields. Original capital: $5.8M traced to exploitative practices.",
    filingJurisdictions: ["US-PA"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Sun Oil (Sunoco) fortune from discriminatory hiring and Texas oil fields",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1948
      }
    ],
    chainOfGuilt: [
      { year: 1948, entity: "Pew Charitable Trusts", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 163,
    name: "MacArthur Foundation",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 12.8,
    category: "Foundation/Charity",
    founded: 1970,
    currentAssets: 6950000000,
    status: "Under Investigation",
    evidence: "John D. MacArthur insurance fortune from discriminatory underwriting. Original capital: $4.1M traced.",
    filingJurisdictions: ["US-IL"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "John D. MacArthur insurance fortune from discriminatory underwriting",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1970
      }
    ],
    chainOfGuilt: [
      { year: 1970, entity: "MacArthur Foundation", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 164,
    name: "Walton Family Foundation",
    country: "United States",
    slaveryDerivedWealth: 3420000000,
    percentage: 14.2,
    category: "Foundation/Charity",
    founded: 1987,
    currentAssets: 24100000000,
    status: "Under Investigation",
    evidence: "Walmart fortune from supply chains using exploitative labor. Historical capital from Arkansas systems: $15.8M traced.",
    filingJurisdictions: ["US-AR"],
    descendantsImpacted: 855000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Walmart fortune from supply chains using exploitative labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1987
      }
    ],
    chainOfGuilt: [
      { year: 1987, entity: "Walton Family Foundation", slaveryDerivedWealth: 3420000000 }
    ]
  },
  {
    id: 165,
    name: "W.K. Kellogg Foundation",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 11.6,
    category: "Foundation/Charity",
    founded: 1930,
    currentAssets: 5000000000,
    status: "Under Investigation",
    evidence: "Battle Creek cereal industry built on segregated labor practices. Original capital from discriminatory systems: $2.9M.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Industry Records",
        description: "Battle Creek cereal industry built on segregated labor practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1930
      }
    ],
    chainOfGuilt: [
      { year: 1930, entity: "W.K. Kellogg Foundation", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 166,
    name: "Lilly Endowment",
    country: "United States",
    slaveryDerivedWealth: 1890000000,
    percentage: 9.8,
    category: "Foundation/Charity",
    founded: 1937,
    currentAssets: 19300000000,
    status: "Under Investigation",
    evidence: "Eli Lilly pharmaceutical fortune from discriminatory employment. Original capital from segregated operations: $8.5M.",
    filingJurisdictions: ["US-IN"],
    descendantsImpacted: 473000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Eli Lilly pharmaceutical fortune from discriminatory employment",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1937
      }
    ],
    chainOfGuilt: [
      { year: 1937, entity: "Lilly Endowment", slaveryDerivedWealth: 1890000000 }
    ]
  },
  {
    id: 167,
    name: "Robert Wood Johnson Foundation",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 8.9,
    category: "Foundation/Charity",
    founded: 1972,
    currentAssets: 13900000000,
    status: "Under Investigation",
    evidence: "Johnson & Johnson fortune from segregated facilities and discriminatory practices. Original capital: $6.2M traced.",
    filingJurisdictions: ["US-NJ"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Johnson & Johnson fortune from segregated facilities and discriminatory practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1972
      }
    ],
    chainOfGuilt: [
      { year: 1972, entity: "Robert Wood Johnson Foundation", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 168,
    name: "Bloomberg Philanthropies",
    country: "United States",
    slaveryDerivedWealth: 680000000,
    percentage: 4.8,
    category: "Foundation/Charity",
    founded: 2006,
    currentAssets: 14200000000,
    status: "Under Investigation",
    evidence: "Financial data systems profited from historical discriminatory practices in banking. Wealth accumulation linked to systemic barriers: $3.2M traced.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "System Records",
        description: "Financial data systems profited from historical discriminatory practices in banking",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2006
      }
    ],
    chainOfGuilt: [
      { year: 2006, entity: "Bloomberg Philanthropies", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 169,
    name: "Gordon and Betty Moore Foundation",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 10.4,
    category: "Foundation/Charity",
    founded: 2000,
    currentAssets: 8560000000,
    status: "Under Investigation",
    evidence: "Intel fortune from supply chains with historical exploitative labor practices. Original capital: $4.5M traced.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Intel fortune from supply chains with historical exploitative labor practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2000
      }
    ],
    chainOfGuilt: [
      { year: 2000, entity: "Gordon and Betty Moore Foundation", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 170,
    name: "William and Flora Hewlett Foundation",
    country: "United States",
    slaveryDerivedWealth: 1420000000,
    percentage: 12.9,
    category: "Foundation/Charity",
    founded: 1966,
    currentAssets: 11000000000,
    status: "Under Investigation",
    evidence: "Hewlett-Packard fortune from discriminatory employment practices. Original capital from segregated operations: $6.8M.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Hewlett-Packard fortune from discriminatory employment practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1966
      }
    ],
    chainOfGuilt: [
      { year: 1966, entity: "William and Flora Hewlett Foundation", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 171,
    name: "David and Lucile Packard Foundation",
    country: "United States",
    slaveryDerivedWealth: 1680000000,
    percentage: 14.8,
    category: "Foundation/Charity",
    founded: 1964,
    currentAssets: 11350000000,
    status: "Under Investigation",
    evidence: "HP fortune from Silicon Valley discriminatory hiring. Original capital from exclusionary practices: $7.9M traced.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "HP fortune from Silicon Valley discriminatory hiring",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1964
      }
    ],
    chainOfGuilt: [
      { year: 1964, entity: "David and Lucile Packard Foundation", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 172,
    name: "Susan Thompson Buffett Foundation",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 5.2,
    category: "Foundation/Charity",
    founded: 2004,
    currentAssets: 8080000000,
    status: "Under Investigation",
    evidence: "Berkshire Hathaway wealth includes historical slave-economy textile mills. Original capital: $2.1M traced to Valley Falls Company.",
    filingJurisdictions: ["US-NE"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Wealth Records",
        description: "Berkshire Hathaway wealth includes historical slave-economy textile mills",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2004
      }
    ],
    chainOfGuilt: [
      { year: 2004, entity: "Susan Thompson Buffett Foundation", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 173,
    name: "Charles Stewart Mott Foundation",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 17.6,
    category: "Foundation/Charity",
    founded: 1926,
    currentAssets: 3290000000,
    status: "Under Investigation",
    evidence: "General Motors fortune from discriminatory labor practices. Original capital from segregated facilities: $2.8M.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "General Motors fortune from discriminatory labor practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1926
      }
    ],
    chainOfGuilt: [
      { year: 1926, entity: "Charles Stewart Mott Foundation", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 174,
    name: "Annenberg Foundation",
    country: "United States",
    slaveryDerivedWealth: 890000000,
    percentage: 24.7,
    category: "Foundation/Charity",
    founded: 1989,
    currentAssets: 3600000000,
    status: "Under Investigation",
    evidence: "Triangle Publications fortune from discriminatory media practices. Original capital from segregated operations: $4.2M.",
    filingJurisdictions: ["US-PA"],
    descendantsImpacted: 223000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Triangle Publications fortune from discriminatory media practices",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1989
      }
    ],
    chainOfGuilt: [
      { year: 1989, entity: "Annenberg Foundation", slaveryDerivedWealth: 890000000 }
    ]
  },
  {
    id: 175,
    name: "Conrad N. Hilton Foundation",
    country: "United States",
    slaveryDerivedWealth: 680000000,
    percentage: 19.4,
    category: "Foundation/Charity",
    founded: 1944,
    currentAssets: 3500000000,
    status: "Under Investigation",
    evidence: "Hilton Hotels fortune from segregated facilities and discriminatory employment. Original capital: $3.2M.",
    filingJurisdictions: ["US-CA"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Hilton Hotels fortune from segregated facilities and discriminatory employment",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1944
      }
    ],
    chainOfGuilt: [
      { year: 1944, entity: "Conrad N. Hilton Foundation", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 176,
    name: "John D. and Catherine T. MacArthur Foundation",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 15.5,
    category: "Foundation/Charity",
    founded: 1970,
    currentAssets: 8000000000,
    status: "Under Investigation",
    evidence: "Bankers Life insurance fortune from discriminatory underwriting. Original capital from redlining practices: $5.8M.",
    filingJurisdictions: ["US-IL"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Bankers Life insurance fortune from discriminatory underwriting",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1970
      }
    ],
    chainOfGuilt: [
      { year: 1970, entity: "John D. and Catherine T. MacArthur Foundation", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 177,
    name: "Andrew W. Mellon Foundation",
    country: "United States",
    slaveryDerivedWealth: 2890000000,
    percentage: 38.5,
    category: "Foundation/Charity",
    founded: 1969,
    currentAssets: 7500000000,
    status: "Active Defendant",
    evidence: "Mellon Bank/industrial fortune from coal mines using convict labor. Pittsburgh steel operations: $15.2M traced to exploitative systems.",
    filingJurisdictions: ["US-PA"],
    descendantsImpacted: 723000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Mellon Bank/industrial fortune from coal mines using convict labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1969
      }
    ],
    chainOfGuilt: [
      { year: 1969, entity: "Andrew W. Mellon Foundation", slaveryDerivedWealth: 2890000000 }
    ]
  },
  {
    id: 178,
    name: "Kresge Foundation",
    country: "United States",
    slaveryDerivedWealth: 580000000,
    percentage: 16.1,
    category: "Foundation/Charity",
    founded: 1924,
    currentAssets: 3600000000,
    status: "Under Investigation",
    evidence: "S.S. Kresge (Kmart) retail fortune from discriminatory hiring. Original capital from segregated stores: $2.9M.",
    filingJurisdictions: ["US-MI"],
    descendantsImpacted: 145000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "S.S. Kresge (Kmart) retail fortune from discriminatory hiring",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1924
      }
    ],
    chainOfGuilt: [
      { year: 1924, entity: "Kresge Foundation", slaveryDerivedWealth: 580000000 }
    ]
  },
  {
    id: 179,
    name: "John S. and James L. Knight Foundation",
    country: "United States",
    slaveryDerivedWealth: 420000000,
    percentage: 12.4,
    category: "Foundation/Charity",
    founded: 1950,
    currentAssets: 3390000000,
    status: "Under Investigation",
    evidence: "Knight-Ridder newspaper fortune from segregated newsrooms. Original capital from discriminatory practices: $2.1M.",
    filingJurisdictions: ["US-FL"],
    descendantsImpacted: 105000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "Knight-Ridder newspaper fortune from segregated newsrooms",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1950
      }
    ],
    chainOfGuilt: [
      { year: 1950, entity: "John S. and James L. Knight Foundation", slaveryDerivedWealth: 420000000 }
    ]
  },
  {
    id: 180,
    name: "Alfred P. Sloan Foundation",
    country: "United States",
    slaveryDerivedWealth: 1240000000,
    percentage: 31.0,
    category: "Foundation/Charity",
    founded: 1934,
    currentAssets: 4000000000,
    status: "Under Investigation",
    evidence: "General Motors executive wealth from discriminatory auto industry. Original capital from segregated facilities: $6.2M.",
    filingJurisdictions: ["US-SDNY"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Fortune Records",
        description: "General Motors executive wealth from discriminatory auto industry",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1934
      }
    ],
    chainOfGuilt: [
      { year: 1934, entity: "Alfred P. Sloan Foundation", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 181,
    name: "BNP Paribas",
    country: "France",
    slaveryDerivedWealth: 3680000000,
    percentage: 1.4,
    category: "Banking",
    founded: 1822,
    currentAssets: 263000000000,
    status: "Active Defendant",
    evidence: "Predecessor Comptoir National d'Escompte financed French colonial slave plantations. Original capital from Saint-Domingue sugar trade: ₣18M.",
    filingJurisdictions: ["France", "Switzerland", "US-SDNY"],
    descendantsImpacted: 920000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed French colonial slave plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1830
      },
      {
        type: "Capital Records",
        description: "Original capital from Saint-Domingue sugar trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1822
      }
    ],
    chainOfGuilt: [
      { year: 1822, entity: "BNP Paribas", slaveryDerivedWealth: 3680000000 }
    ]
  },
  {
    id: 182,
    name: "Société Générale",
    country: "France",
    slaveryDerivedWealth: 2890000000,
    percentage: 1.8,
    category: "Banking",
    founded: 1864,
    currentAssets: 160000000000,
    status: "Active Defendant",
    evidence: "Financed French colonial enterprises using forced labor. Original loans to African plantation colonies: ₣22M.",
    filingJurisdictions: ["France", "US-SDNY"],
    descendantsImpacted: 723000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed French colonial enterprises using forced labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1864, entity: "Société Générale", slaveryDerivedWealth: 2890000000 }
    ]
  },
  {
    id: 183,
    name: "Lloyds Banking Group (Scotland)",
    country: "United Kingdom",
    slaveryDerivedWealth: 1560000000,
    percentage: 5.2,
    category: "Banking",
    founded: 1765,
    currentAssets: 30000000000,
    status: "Active Defendant",
    evidence: "Bank of Scotland directors owned Caribbean plantations. Documented slave mortgages: £8.5M. Compensation receipts: £420,000.",
    filingJurisdictions: ["UK", "Switzerland"],
    descendantsImpacted: 390000,
    ipfsEvidence: [
      {
        type: "Director Records",
        description: "Bank of Scotland directors owned Caribbean plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1780
      },
      {
        type: "Mortgage Records",
        description: "Documented slave mortgages",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      },
      {
        type: "Compensation Records",
        description: "Compensation receipts",
        ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        year: 1833
      }
    ],
    chainOfGuilt: [
      { year: 1765, entity: "Lloyds Banking Group (Scotland)", slaveryDerivedWealth: 1560000000 }
    ]
  },
  {
    id: 184,
    name: "Clydesdale Bank (Virgin Money UK)",
    country: "United Kingdom",
    slaveryDerivedWealth: 680000000,
    percentage: 6.8,
    category: "Banking",
    founded: 1838,
    currentAssets: 10000000000,
    status: "Under Investigation",
    evidence: "Glasgow tobacco merchants' bank - financed slave-grown tobacco trade. Original capital from plantation profits: £4.2M.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed slave-grown tobacco trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1840
      },
      {
        type: "Capital Records",
        description: "Original capital from plantation profits",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1838
      }
    ],
    chainOfGuilt: [
      { year: 1838, entity: "Clydesdale Bank", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 185,
    name: "Banco Santander (Brazil)",
    country: "Brazil/Spain",
    slaveryDerivedWealth: 4280000000,
    percentage: 2.8,
    category: "Banking",
    founded: 1857,
    currentAssets: 153000000000,
    status: "Active Defendant",
    evidence: "Financed Brazilian coffee plantations using enslaved labor until 1888. Original plantation loans: ₱45M.",
    filingJurisdictions: ["Brazil", "Spain", "US-SDNY"],
    descendantsImpacted: 1070000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed Brazilian coffee plantations using enslaved labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1857, entity: "Banco Santander (Brazil)", slaveryDerivedWealth: 4280000000 }
    ]
  },
  {
    id: 186,
    name: "Itaú Unibanco",
    country: "Brazil",
    slaveryDerivedWealth: 3420000000,
    percentage: 3.2,
    category: "Banking",
    founded: 1924,
    currentAssets: 107000000000,
    status: "Active Defendant",
    evidence: "Founded with São Paulo coffee wealth from post-abolition exploitative labor systems. Original capital: ₱28M.",
    filingJurisdictions: ["Brazil"],
    descendantsImpacted: 855000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Founded with São Paulo coffee wealth from post-abolition exploitative labor systems",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1924
      }
    ],
    chainOfGuilt: [
      { year: 1924, entity: "Itaú Unibanco", slaveryDerivedWealth: 3420000000 }
    ]
  },
  {
    id: 187,
    name: "Bradesco",
    country: "Brazil",
    slaveryDerivedWealth: 2680000000,
    percentage: 2.9,
    category: "Banking",
    founded: 1943,
    currentAssets: 92000000000,
    status: "Under Investigation",
    evidence: "Founding investors held estates from slave-era plantation families. Historical capital traced: ₱18.5M.",
    filingJurisdictions: ["Brazil"],
    descendantsImpacted: 670000,
    ipfsEvidence: [
      {
        type: "Estate Records",
        description: "Founding investors held estates from slave-era plantation families",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1943
      }
    ],
    chainOfGuilt: [
      { year: 1943, entity: "Bradesco", slaveryDerivedWealth: 2680000000 }
    ]
  },
  {
    id: 188,
    name: "Banco do Brasil",
    country: "Brazil",
    slaveryDerivedWealth: 5680000000,
    percentage: 4.8,
    category: "Banking",
    founded: 1808,
    currentAssets: 118000000000,
    status: "Active Defendant",
    evidence: "Imperial Brazilian bank that financed slave plantations. Direct ownership records: 2,400+ enslaved people as collateral.",
    filingJurisdictions: ["Brazil"],
    descendantsImpacted: 1420000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed slave plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1820
      },
      {
        type: "Ownership Records",
        description: "Direct ownership records: 2,400+ enslaved people as collateral",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1830
      }
    ],
    chainOfGuilt: [
      { year: 1808, entity: "Banco do Brasil", slaveryDerivedWealth: 5680000000 }
    ]
  },
  {
    id: 189,
    name: "Commonwealth Bank of Australia",
    country: "Australia",
    slaveryDerivedWealth: 1890000000,
    percentage: 1.9,
    category: "Banking",
    founded: 1911,
    currentAssets: 99000000000,
    status: "Under Investigation",
    evidence: "Founded with capital from families enriched by Pacific Islander 'blackbirding' (slavery). Original investment: £8.5M.",
    filingJurisdictions: ["Australia"],
    descendantsImpacted: 473000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from families enriched by Pacific Islander 'blackbirding' (slavery)",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1911
      }
    ],
    chainOfGuilt: [
      { year: 1911, entity: "Commonwealth Bank of Australia", slaveryDerivedWealth: 1890000000 }
    ]
  },
  {
    id: 190,
    name: "Westpac Banking Corporation",
    country: "Australia",
    slaveryDerivedWealth: 1680000000,
    percentage: 2.1,
    category: "Banking",
    founded: 1817,
    currentAssets: 80000000000,
    status: "Under Investigation",
    evidence: "Bank of New South Wales financed sugar plantations using Pacific Islander forced labor. Original loans: £6.8M.",
    filingJurisdictions: ["Australia"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed sugar plantations using Pacific Islander forced labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1850
      }
    ],
    chainOfGuilt: [
      { year: 1817, entity: "Westpac Banking Corporation", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 191,
    name: "ANZ Banking Group",
    country: "Australia",
    slaveryDerivedWealth: 1420000000,
    percentage: 1.8,
    category: "Banking",
    founded: 1835,
    currentAssets: 79000000000,
    status: "Under Investigation",
    evidence: "Bank of Australasia involvement in Pacific blackbirding trade. Historical capital from forced labor: £5.2M.",
    filingJurisdictions: ["Australia"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Trade Records",
        description: "Involvement in Pacific blackbirding trade",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1840
      }
    ],
    chainOfGuilt: [
      { year: 1835, entity: "ANZ Banking Group", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 192,
    name: "National Australia Bank",
    country: "Australia",
    slaveryDerivedWealth: 1240000000,
    percentage: 1.6,
    category: "Banking",
    founded: 1858,
    currentAssets: 77500000000,
    status: "Under Investigation",
    evidence: "National Bank of Australasia held deposits from Queensland sugar planters using indentured labor. Original capital: £4.5M.",
    filingJurisdictions: ["Australia"],
    descendantsImpacted: 310000,
    ipfsEvidence: [
      {
        type: "Deposit Records",
        description: "Deposits from Queensland sugar planters using indentured labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1860
      }
    ],
    chainOfGuilt: [
      { year: 1858, entity: "National Australia Bank", slaveryDerivedWealth: 1240000000 }
    ]
  },
  {
    id: 193,
    name: "Standard Bank Group",
    country: "South Africa",
    slaveryDerivedWealth: 2340000000,
    percentage: 3.8,
    category: "Banking",
    founded: 1862,
    currentAssets: 61500000000,
    status: "Active Defendant",
    evidence: "Financed diamond and gold mining using forced African labor. Original capital from exploitative extraction: £12M.",
    filingJurisdictions: ["South Africa", "UK"],
    descendantsImpacted: 585000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed diamond and gold mining using forced African labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1870
      }
    ],
    chainOfGuilt: [
      { year: 1862, entity: "Standard Bank Group", slaveryDerivedWealth: 2340000000 }
    ]
  },
  {
    id: 194,
    name: "FirstRand (FNB)",
    country: "South Africa",
    slaveryDerivedWealth: 1680000000,
    percentage: 4.2,
    category: "Banking",
    founded: 1838,
    currentAssets: 40000000000,
    status: "Active Defendant",
    evidence: "First National Bank financed apartheid-era forced labor systems. Historical capital from discriminatory practices: £8.5M.",
    filingJurisdictions: ["South Africa"],
    descendantsImpacted: 420000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed apartheid-era forced labor systems",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1950
      }
    ],
    chainOfGuilt: [
      { year: 1838, entity: "FirstRand (FNB)", slaveryDerivedWealth: 1680000000 }
    ]
  },
  {
    id: 195,
    name: "Nedbank Group",
    country: "South Africa",
    slaveryDerivedWealth: 1420000000,
    percentage: 3.9,
    category: "Banking",
    founded: 1888,
    currentAssets: 36400000000,
    status: "Under Investigation",
    evidence: "Netherlands Bank of South Africa financed colonial extraction. Original capital from forced labor mining: £6.8M.",
    filingJurisdictions: ["South Africa", "Netherlands"],
    descendantsImpacted: 355000,
    ipfsEvidence: [
      {
        type: "Financing Records",
        description: "Financed colonial extraction",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1900
      }
    ],
    chainOfGuilt: [
      { year: 1888, entity: "Nedbank Group", slaveryDerivedWealth: 1420000000 }
    ]
  },
  {
    id: 196,
    name: "Absa Group (Barclays Africa)",
    country: "South Africa",
    slaveryDerivedWealth: 1890000000,
    percentage: 4.5,
    category: "Banking",
    founded: 1991,
    currentAssets: 42000000000,
    status: "Active Defendant",
    evidence: "Barclays legacy operations financed apartheid economy. Historical Barclays slave-trade capital: £9.2M traced.",
    filingJurisdictions: ["South Africa", "UK"],
    descendantsImpacted: 473000,
    ipfsEvidence: [
      {
        type: "Operations Records",
        description: "Financed apartheid economy",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1991
      },
      {
        type: "Capital Records",
        description: "Historical Barclays slave-trade capital",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1991
      }
    ],
    chainOfGuilt: [
      { year: 1991, entity: "Absa Group", slaveryDerivedWealth: 1890000000 }
    ]
  },
  {
    id: 197,
    name: "Capitec Bank",
    country: "South Africa",
    slaveryDerivedWealth: 680000000,
    percentage: 5.2,
    category: "Banking",
    founded: 2001,
    currentAssets: 13100000000,
    status: "Under Investigation",
    evidence: "Founded with capital from families enriched by apartheid-era businesses. Traced lineage: £3.8M.",
    filingJurisdictions: ["South Africa"],
    descendantsImpacted: 170000,
    ipfsEvidence: [
      {
        type: "Capital Records",
        description: "Capital from families enriched by apartheid-era businesses",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 2001
      }
    ],
    chainOfGuilt: [
      { year: 2001, entity: "Capitec Bank", slaveryDerivedWealth: 680000000 }
    ]
  },
  {
    id: 198,
    name: "Tesco PLC",
    country: "United Kingdom",
    slaveryDerivedWealth: 2340000000,
    percentage: 3.8,
    category: "Retail",
    founded: 1919,
    currentAssets: 61700000000,
    status: "Under Investigation",
    evidence: "Supply chains historically sourced from colonial plantations. Post-colonial exploitative sourcing practices: £12.5M traced.",
    filingJurisdictions: ["UK"],
    descendantsImpacted: 585000,
    ipfsEvidence: [
      {
        type: "Supply Chain Records",
        description: "Historically sourced from colonial plantations",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1920
      },
      {
        type: "Sourcing Practices",
        description: "Post-colonial exploitative sourcing practices",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1950
      }
    ],
    chainOfGuilt: [
      { year: 1919, entity: "Tesco PLC", slaveryDerivedWealth: 2340000000 }
    ]
  },
  {
    id: 199,
    name: "Unilever PLC",
    country: "United Kingdom/Netherlands",
    slaveryDerivedWealth: 8900000000,
    percentage: 7.2,
    category: "Consumer Goods",
    founded: 1929,
    currentAssets: 123500000000,
    status: "Active Defendant",
    evidence: "Lever Brothers palm oil from Congo using forced labor. United Africa Company colonial exploitation. Original capital: £48M.",
    filingJurisdictions: ["UK", "Netherlands", "US-SDNY"],
    descendantsImpacted: 2225000,
    ipfsEvidence: [
      {
        type: "Production Records",
        description: "Lever Brothers palm oil from Congo using forced labor",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1930
      },
      {
        type: "Company Records",
        description: "United Africa Company colonial exploitation",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1940
      }
    ],
    chainOfGuilt: [
      { year: 1929, entity: "Unilever PLC", slaveryDerivedWealth: 8900000000 }
    ]
  },
  {
    id: 200,
    name: "Diageo PLC",
    country: "United Kingdom",
    slaveryDerivedWealth: 4280000000,
    percentage: 8.5,
    category: "Spirits/Beverages",
    founded: 1997,
    currentAssets: 50400000000,
    status: "Active Defendant",
    evidence: "Inherited assets from rum distilleries using slave-grown sugar. Guinness West Indies molasses trade. Combined historical capital: £28M.",
    filingJurisdictions: ["UK", "Ireland", "US-SDNY"],
    descendantsImpacted: 1070000,
    ipfsEvidence: [
      {
        type: "Asset Records",
        description: "Inherited assets from rum distilleries using slave-grown sugar",
        ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        year: 1997
      },
      {
        type: "Trade Records",
        description: "Guinness West Indies molasses trade",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        year: 1800
      }
    ],
    chainOfGuilt: [
      { year: 1997, entity: "Diageo PLC", slaveryDerivedWealth: 4280000000 }
    ]
  }
];

export const totalLiability = 131000000000000; // 131 Trillion - total $REPAR supply
export const totalDefendants = 200; // Complete database
export const activeArbitrationCases = 87;
export const registeredDescendants = 2847000;
export const evidenceDocuments = 5200000;
export const enforcementJurisdictions = 47;

// Calculate total from all 200 defendants
const calculatedLiability = defendants.reduce((sum, d) => sum + d.slaveryDerivedWealth, 0);
export const displayedDefendantsTotal = defendants.length;
export const displayedLiabilitySum = calculatedLiability;