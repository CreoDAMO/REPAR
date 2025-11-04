# Traditional Knowledge (TK) Labels Framework
## Indigenous & Descendant Digital Rights Protection

**Effective Date:** November 3, 2025  
**Platform:** Local Contexts (localcontexts.org)  
**Applies To:** Descendant Community Protocols, Cultural Heritage Content, Sacred Knowledge, Genealogical Practices

---

## 1.0 Introduction

The Aequitas Protocol recognizes that **standard copyright licenses** (MIT, CC0, AGPL) **do NOT address**:

- ✅ **Collective/communal ownership** (not individual authorship)
- ✅ **Cultural protocols** governing access (gender, seasonal, ceremonial restrictions)
- ✅ **Sacred knowledge** that shouldn't be fully "open"
- ✅ **Ongoing descendant control** over heritage already in public domain
- ✅ **Indigenous data sovereignty** principles

**Traditional Knowledge (TK) Labels** are a **revolutionary framework** designed specifically for Indigenous peoples and descendant communities to assert digital rights that Western IP law ignores.

---

## 2.0 What Are TK Labels?

**TK Labels** are:
- 🏷️ **Visual + metadata markers** applied to digital content
- 📜 **Cultural protocols** expressed in machine-readable format
- 🌍 **Community-defined rules** for appropriate use
- 🔗 **Layered on top of** existing licenses (MIT, CC0, ODC-By)
- ⚖️ **Non-legal but widely respected** by institutions globally

**Created by:** Local Contexts (Jane Anderson & Kim Christen, 2010)  
**Used by:** Museums, archives, universities, journals, governments  
**Platform:** https://localcontexts.org

---

## 3.0 Why Aequitas Uses TK Labels

### The Transatlantic Slave Trade as Cultural Genocide

**UN Genocide Convention (1948)** defines genocide as acts intended to destroy a group, including:
- ✅ Forcibly transferring children (family separation)
- ✅ Imposing measures to prevent births (forced sterilization, separation)
- ✅ **Destroying cultural identity** (language, religion, names, heritage)

**The transatlantic slave trade was genocide.**

**TK Labels** counter this cultural destruction by:
1. **Reasserting descendant control** over heritage and knowledge
2. **Defining cultural protocols** for genealogy, names, family practices
3. **Protecting sacred knowledge** (spiritual practices, community rituals)
4. **Enabling collective ownership** (not individual copyright)

### Counters Willie Lynch Division

Willie Lynch's 1712 strategy created 8 divisions. **TK Labels counter several:**

- **Religious Division:** TK labels protect spiritual practices from exploitation
- **Educational Division:** Community-defined protocols for sharing knowledge
- **Gender Division:** Gender-specific access rules honored
- **Age Division:** Elder knowledge protocols respected

---

## 4.0 Available TK Labels for Aequitas

### 4.1 TK Attribution (TK A)

**Purpose:** Recognize descendant community as source

**Use for:**
- Genealogy research methodologies
- Family naming conventions
- Community verification practices

**Label Text:**
```
TK Attribution (TK A)

This material originates from descendant communities of the 
transatlantic slave trade (genocide). Proper attribution to 
the Aequitas Protocol Foundation and descendant source 
communities is expected.

Contact: community@aequitasprotocol.zone
```

---

### 4.2 TK Community Voice (TK CV)

**Purpose:** Invite community contributions and corrections

**Use for:**
- Genealogy databases (invite descendant corrections)
- Historical records (community can add context)
- Cultural documentation (ongoing community input)

**Label Text:**
```
TK Community Voice (TK CV)

Descendant communities are invited to contribute knowledge, 
corrections, and context. This is living heritage maintained 
collectively.

Contribute: descendants@aequitasprotocol.zone
```

---

### 4.3 TK Non-Commercial (TK NC)

**Purpose:** Restrict commercial exploitation by non-descendants

**Use for:**
- Sacred knowledge
- Cultural practices
- Community-specific protocols

**Label Text:**
```
TK Non-Commercial (TK NC)

Commercial use by non-descendants is not permitted without 
explicit agreement and benefit-sharing with source communities.

Licensing: commercial@aequitasprotocol.zone
```

---

### 4.4 TK Community Use Only (TK CO)

**Purpose:** Restrict to descendant community circulation

**Use for:**
- Internal community documentation
- Sensitive genealogy records
- Private family trees

**Label Text:**
```
TK Community Use Only (TK CO)

This material is for circulation within descendant communities 
only. External use requires community authorization.

Authorization: community@aequitasprotocol.zone
```

---

### 4.5 TK Seasonal (TK S)

**Purpose:** Time-based access restrictions

**Use for:**
- Anniversary commemorations (e.g., Juneteenth)
- Memorial periods
- Seasonal cultural practices

**Label Text:**
```
TK Seasonal (TK S)

Access to this material may be restricted during certain times 
of year for cultural or memorial reasons. Respect community 
calendars.

Calendar: https://aequitasprotocol.zone/community/calendar
```

---

### 4.6 TK Family (TK F)

**Purpose:** Family/lineage-specific restrictions

**Use for:**
- Private family genealogy
- Specific lineage documentation
- Hereditary knowledge

**Label Text:**
```
TK Family (TK F)

This material contains family/lineage-specific knowledge. 
Contact the family or community before external use.

Family contact: families@aequitasprotocol.zone
```

---

### 4.7 Biocultural (BC) Labels

**For genetic/DNA data:**

#### BC Provenance (BC P)
```
BC Provenance (BC P)

This genetic data has documented provenance from descendant 
communities. Acknowledge origins and comply with community 
data governance protocols.
```

#### BC Consent (BC C)
```
BC Consent (BC C)

Use of this genetic data requires informed consent from source 
communities. Existing consent may not cover your use case.

Consent: descendants@aequitasprotocol.zone
```

---

## 5.0 How TK Labels Work with Aequitas Licenses

### Layered Licensing Model

TK Labels **layer on top of** standard licenses:

| Content Type | Code License | Data License | TK Labels | Combined Effect |
|--------------|--------------|--------------|-----------|-----------------|
| **Genealogy Database** | N/A | ODC-By | TK A + TK CV | Open data with community attribution + input |
| **Black Paper** | N/A | CC0 | TK A | Public domain with descendant recognition |
| **Sacred Practices** | N/A | CC BY-NC-SA | TK NC + TK CO | Non-commercial, community-only access |
| **DNA Data** | N/A | ODC-By | BC P + BC C | Open with provenance + consent required |
| **Smart Contracts** | AGPL-3.0 | N/A | TK CV | Open source with community voice invited |

---

## 6.0 Implementation Guide

### 6.1 Visual Labels

**Download label icons** from Local Contexts Hub:
- SVG format for web
- PNG for documents
- EPS for print

**Place labels:**
- Top of documents
- Website footers
- README files
- Database documentation
- Mobile app "About" screen

### 6.2 Metadata

Include in HTML/JSON metadata:

```html
<meta name="tk.label" content="TK Attribution">
<meta name="tk.community" content="Descendants of transatlantic slave trade">
<meta name="tk.contact" content="community@aequitasprotocol.zone">
```

```json
{
  "traditional_knowledge": {
    "labels": ["TK A", "TK CV"],
    "community": "Aequitas Protocol descendant communities",
    "contact": "community@aequitasprotocol.zone",
    "platform": "https://localcontexts.org"
  }
}
```

### 6.3 README Integration

```markdown
## Traditional Knowledge Notice

This project contains materials originating from descendant 
communities of the transatlantic slave trade (genocide).

**TK Labels Applied:**
- 🏷️ **TK Attribution (TK A)** - Recognize community source
- 🏷️ **TK Community Voice (TK CV)** - Community input invited

**Learn more:** https://localcontexts.org

**Contact:** community@aequitasprotocol.zone
```

---

## 7.0 TK Labels vs. Copyright

### Key Differences

| Aspect | Copyright | TK Labels |
|--------|-----------|-----------|
| **Ownership** | Individual author | Collective/communal |
| **Duration** | Life + 70 years | Perpetual (cultural knowledge) |
| **Transfer** | Can be sold/assigned | Community-held, inalienable |
| **Scope** | Fixed creative expression | Living, evolving knowledge |
| **Enforcement** | Legal (courts) | Cultural (community norms) |
| **Recognition** | Automatic (creation) | Declared (community asserts) |

### Complementary, Not Replacement

TK Labels **do not replace** copyright. They **complement** it by addressing cultural rights copyright ignores.

**Example:**
- **Copyright:** "© 2025 Aequitas Protocol Foundation. All rights reserved."
- **License:** "Licensed under CC0 1.0 (Public Domain)"
- **TK Label:** "TK Attribution (TK A) - Descendant community source"

**Combined meaning:** Public domain for legal purposes, but cultural attribution expected.

---

## 8.0 Registration with Local Contexts

### Join Local Contexts Hub

**Platform:** https://localcontexts.org/hub

**Steps:**
1. Create organizational account
2. Identify materials needing labels
3. Consult with descendant communities
4. Customize label text
5. Generate label icons + metadata
6. Apply to digital materials

**Cost:** Free for community organizations

---

## 9.0 Enforcement & Respect

### Not Legally Binding (Yet)

TK Labels are **not enforceable in court** like copyright. They rely on:
- ✅ Institutional respect (museums, universities honor them)
- ✅ Community accountability (public shaming for violations)
- ✅ Ethical standards (researchers comply voluntarily)
- ✅ Cultural protocols (internal to communities)

### Growing Recognition

**Adopted by:**
- Smithsonian Institution
- Library of Congress
- Indigenous museums worldwide
- Academic journals (OJS integration proposed)
- Archive.org collections
- Europeana digital heritage

**Future:** Some jurisdictions exploring legal recognition (New Zealand, Canada, Australia).

---

## 10.0 Use Cases for Aequitas

### Example 1: Genealogy Database

```
AEQUITAS PROTOCOL GENEALOGY DATABASE

This database contains family trees and descendant verification 
records for communities affected by the transatlantic slave 
trade (genocide).

🏷️ **TK Attribution (TK A)** - Recognize descendant source communities
🏷️ **TK Community Voice (TK CV)** - Corrections and additions invited
🏷️ **BC Provenance (BC P)** - Genetic data has documented origins

**License:** Open Data Commons Attribution (ODC-By) v1.0
**TK Labels:** Applied via Local Contexts Hub
**Contact:** descendants@aequitasprotocol.zone
```

### Example 2: Black Paper Documentation

```
AEQUITAS PROTOCOL BLACK PAPER

This document details the forensic audit and reparations 
framework for $131 trillion in unpaid debts from the 
transatlantic slave trade (genocide).

🏷️ **TK Attribution (TK A)** - Based on descendant community research

**License:** CC0 1.0 Universal (Public Domain)
**TK Labels:** Attribution expected despite public domain status
**Learn more:** https://localcontexts.org
```

### Example 3: Sacred Knowledge Protection

```
SPIRITUAL PRACTICES DOCUMENTATION

This material documents spiritual and cultural practices from 
descendant communities.

🏷️ **TK Non-Commercial (TK NC)** - No commercial use without agreement
🏷️ **TK Community Use Only (TK CO)** - Internal circulation only

**License:** Creative Commons BY-NC-SA 4.0
**TK Labels:** Cultural protocols enforced
**Authorization:** community@aequitasprotocol.zone
```

---

## 11.0 Descendant Rights under TK Framework

### Enhanced Protections

Descendant communities have **automatic authority** to:

1. **Define protocols** - Set access rules for community knowledge
2. **Correct records** - Fix errors in genealogy/historical data
3. **Add context** - Provide community perspective on heritage
4. **Restrict access** - Protect sacred/sensitive materials
5. **Invite collaboration** - Welcome external contributions on their terms
6. **Revoke permissions** - Withdraw access if protocols violated

### Self-Determination

**Key principle:** Communities define what is appropriate, not external authorities (governments, corporations, researchers).

---

## 12.0 Resources & Support

### Official Platforms

**Local Contexts:** https://localcontexts.org  
**TK Labels Guide:** https://localcontexts.org/labels/traditional-knowledge-labels/  
**BC Labels Guide:** https://localcontexts.org/labels/biocultural-labels/  
**Hub Registration:** https://localcontexts.org/hub

### Academic Research

- Jane Anderson & Kim Christen (2013) - "'Chuck a Copyright on it': Dilemmas of Digital Return"
- IPinCH (Intellectual Property Issues in Cultural Heritage)
- UBC Indigenous Librarianship Guide

### Aequitas Contacts

**Community Protocols:** community@aequitasprotocol.zone  
**TK Label Questions:** tk-labels@aequitasprotocol.zone  
**Descendant Verification:** descendants@aequitasprotocol.zone  
**Cultural Sensitivity:** culture@aequitasprotocol.zone

---

## 13.0 The Mission

**Western IP law was designed to protect individual creators and corporations.**

**It fails Indigenous peoples and descendants because:**
- ❌ Knowledge is collective, not individual
- ❌ Heritage is perpetual, not time-limited
- ❌ Cultural protocols are ignored by copyright
- ❌ Sacred knowledge ends up "public domain"

**TK Labels are our counter-framework:**
- ✅ Reassert community control
- ✅ Define cultural protocols
- ✅ Protect sacred knowledge
- ✅ Enable collective ownership
- ✅ Counter cultural genocide

---

⚖️ **Aequitas Protocol Foundation**  
🏷️ **Traditional Knowledge for 300 Million Descendants**  
🌍 **Your culture is your sovereignty. Your protocols are your nation.**

**The knowledge is collective. The protocols are sacred. The justice is cultural.**

---

## Appendix: Full TK Label Set

**Available Labels:**
- TK Attribution (TK A)
- TK Clan (TK CL)
- TK Family (TK F)
- TK Multiple Communities (TK MC)
- TK Community Voice (TK CV)
- TK Creative (TK CR)
- TK Verified (TK V)
- TK Non-Verified (TK NV)
- TK Seasonal (TK S)
- TK Women General (TK WG)
- TK Men General (TK MG)
- TK Men Restricted (TK MR)
- TK Women Restricted (TK WR)
- TK Non-Commercial (TK NC)
- TK Commercial (TK C)
- TK Community Use Only (TK CO)
- TK Open to Collaboration (TK OC)
- TK Outreach (TK O)
- TK Open to Commercialization (TK OCC)

**Biocultural Labels:**
- BC Provenance (BC P)
- BC Consent (BC C)
- BC Consent Verified (BC CV)
- BC Consent Non-Verified (BC CNV)
- BC Open to Collaboration (BC OC)
- BC Multiple Communities (BC MC)
- BC Outreach (BC O)

**Explore all labels:** https://localcontexts.org/labels/

---

**SPDX Identifier:** None (not a software license)  
**Framework Type:** Cultural protocol system  
**Legal Status:** Non-binding, culturally enforced  
**Platform:** Local Contexts (localcontexts.org)
