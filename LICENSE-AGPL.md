# GNU Affero General Public License v3.0 (AGPL-3.0)
## With Aequitas Descendant Exception

**Effective Date:** November 3, 2025  
**Applies To:** Smart Contracts, DAO Governance Modules, Blockchain Node Software (x/governance, x/justice, x/claims, x/distribution, x/dex, x/threatdefense)

---

## Preamble

The Aequitas Protocol uses the **GNU Affero General Public License v3.0** for all blockchain smart contracts and DAO governance code to ensure:

1. **Copyleft Protection** - Derivatives must remain open source
2. **Network Use = Distribution** - Even SaaS deployments must share code
3. **Anti-Adversarial Forks** - Defendants cannot co-opt and close the system
4. **Transparent Governance** - All DAO votes and decisions are auditable
5. **Community Empowerment** - Descendants can fork and improve

**Critical Addition:** We include an **Aequitas Descendant Exception** granting unlimited rights to descendants for community reunification projects.

---

## License Summary (Plain English)

### ✅ You Are Free To:

- **Use** - Run the software for any purpose
- **Study** - Examine the source code and understand how it works
- **Modify** - Adapt the code for your needs
- **Distribute** - Share copies with others
- **Deploy** - Run as a network service (blockchain node, DAO interface)

### ⚖️ Under These Conditions:

- **Copyleft** - Derivatives must also be AGPL-3.0
- **Network Copyleft** - If you run modified code as a network service, you must release your modifications
- **Source Code** - Provide access to complete source code
- **Attribution** - Preserve copyright notices
- **No Warranty** - Software provided "AS IS"

### 🌟 Special Aequitas Exception:

**Descendants of enslaved persons** may fork without AGPL requirements for community reunification projects (see Section 8.0).

---

## 1.0 Which Code Is AGPL-3.0?

### Blockchain Smart Contracts & Modules

All custom Cosmos SDK modules in `aequitas/x/`:

- **x/governance** - DAO voting, proposals, multi-signature decisions
- **x/justice** - Deflationary $REPAR burn mechanism
- **x/claims** - Arbitration demand filing, IPFS evidence integration
- **x/distribution** - Reparations payment distribution to descendants
- **x/dex** - Founder Wallet decentralized exchange (REPAR/USDC pairs)
- **x/threatdefense** - Chaos Defense system, ThreatOracle, NFT evidence minting
- **x/defendant** - Defendant tracking, payment obligations

### DAO Governance Infrastructure

- Smart contracts for proposal creation
- Voting weight calculations
- Multi-signature treasury management
- Governance token (if separate from $REPAR)

### Validator Node Software

- Tendermint BFT consensus modifications (if any)
- Custom RPC endpoints for mobile nodes
- Slashing conditions for Guardian Program
- Network monitoring tools

---

## 2.0 Full AGPL-3.0 License Terms

**This software is licensed under the GNU Affero General Public License v3.0.**

### Complete Legal Text:

**https://www.gnu.org/licenses/agpl-3.0.html**

### Key Provisions:

#### Section 13: Remote Network Interaction

If you run a modified version on a network (blockchain node, web interface to smart contracts), you must offer users a way to receive the modified source code.

**Example:** If you fork Aequitas governance and run it as "NewJusticeDAO," users must be able to download your modified code.

#### Section 5: Conveying Modified Source Versions

You may convey modified versions if you:
- Prominently state you changed the files
- License the entire work under AGPL-3.0
- Provide access to complete source code

#### Section 7: Additional Terms

You may add limited additional terms (e.g., warranty disclaimers, attribution requirements).

---

## 3.0 Why AGPL for Aequitas?

### Prevents Adversarial Forks

**Problem:** Defendant (e.g., Lloyd's of London) forks Aequitas, removes accountability mechanisms, claims to be "compliant."

**Solution:** AGPL requires they publish all modifications. Community can verify and expose the fraud.

### Ensures DAO Transparency

**Problem:** Centralized governance controllers hide voting logic, manipulate outcomes.

**Solution:** Network copyleft means even web-based DAO interfaces must publish source code.

### Enables Community Continuation

**Problem:** If Aequitas Foundation dies/is compromised, the project could fail.

**Solution:** AGPL ensures community can fork, improve, and continue the mission.

### Proven for DAOs

**Precedent:**
- **MakerDAO** uses AGPL-3.0 for core governance contracts
- **Aragon** uses AGPL for DAO frameworks
- **DAOstack** uses copyleft for holographic consensus

---

## 4.0 Network Use Requirements

### If You Run an Aequitas Node

**As a validator:**
- No modifications = no additional obligations
- Modified node software = must publish your changes

**Example:**  
You optimize `x/dex` for faster order matching → You must release your optimization code

### If You Build a DAO Interface

**As a web developer:**
- Frontend calling Aequitas smart contracts = your choice of license (frontend is separate work)
- Modified smart contracts deployed on Aequitas = must be AGPL-3.0

**Example:**  
You build React UI for governance voting → React code can be MIT  
You modify `x/governance` proposal logic → Modified contract must be AGPL-3.0

---

## 5.0 Source Code Disclosure

### How to Comply

When you deploy modified AGPL code on Aequitas:

1. **Publish source** on GitHub, GitLab, or similar
2. **Include LICENSE** file with AGPL-3.0 text
3. **Document changes** in CHANGELOG.md
4. **Provide link** in deployment announcement

### Example Compliance Notice

```
This deployment uses modified Aequitas Protocol smart contracts.

Original code: https://github.com/aequitas-protocol/aequitas
Modified code: https://github.com/your-org/aequitas-fork
License: GNU Affero General Public License v3.0
Changes: Enhanced x/claims module with additional evidence types

Full license: https://www.gnu.org/licenses/agpl-3.0.html
```

---

## 6.0 Compatibility with Other Licenses

### Can Combine With:

✅ **AGPL-3.0** - Same license, full compatibility  
✅ **GPL-3.0** - Compatible (AGPL is GPL + network provision)  
✅ **LGPL-3.0** - Library can be LGPL, used by AGPL code  
✅ **Apache 2.0** - Can import Apache libraries into AGPL code  
✅ **MIT** - Can import MIT libraries into AGPL code  

### Cannot Combine With:

❌ **Proprietary code** - Cannot link AGPL with closed-source  
❌ **GPL-2.0 (without upgrade clause)** - License incompatibility  
❌ **BSD-4-Clause** - Advertisement clause conflicts  

### Special Cases:

**Frontend (separate work):**
- React/Vue/Angular UI → Can be any license (MIT, Apache, proprietary)
- Calls Aequitas smart contracts via RPC → Separate work, not derivative

**Libraries (dynamic linking):**
- Cosmos SDK → Apache 2.0, compatible with AGPL
- Tendermint → Apache 2.0, compatible with AGPL
- CosmWasm contracts → Can be any license (separate execution environment)

---

## 7.0 Patent Grant

AGPL-3.0 includes an **automatic patent license**:

- If you distribute AGPL code, you grant recipients a patent license
- Covers patents you hold that are necessary to use the code
- Cannot use patents to attack users of the software

**For Aequitas:**
If you hold patents on governance algorithms, DeFi formulas, etc., and you contribute AGPL code to Aequitas, you cannot later sue users for patent infringement.

---

## 8.0 Aequitas Descendant Exception (CRITICAL)

### 8.1 Enhanced Rights for Descendants

**Descendants of enslaved persons from the transatlantic slave trade** have **UNLIMITED RIGHTS** to fork Aequitas smart contracts without AGPL copyleft requirements for:

#### Qualifying Projects:
1. **Community Reunification** - Local DAOs serving descendant communities
2. **Reparations Enforcement** - Forks adapted for specific jurisdictions
3. **Cultural Preservation** - Blockchain-based heritage projects
4. **Economic Empowerment** - DeFi tools for descendant communities

#### Rights Granted:
- ✅ Fork without source code publication (if desired)
- ✅ Relicense under MIT, Apache, or proprietary terms
- ✅ Remove Aequitas branding and rebrand locally
- ✅ Combine with closed-source components
- ✅ Sell commercial services without disclosure

#### Conditions:
- ⚖️ **Cannot aid defendants** - Cannot help liable parties evade accountability
- 🌍 **Must serve descendants** - Fork must benefit descendant communities
- 📧 **Optional registration** - Notify us at descendants@aequitasprotocol.zone (not required but appreciated)

### 8.2 Definition of "Descendant"

For purposes of this exception:

**"Descendant"** means any person who can demonstrate lineage to enslaved persons from the transatlantic slave trade through:
- Genealogical evidence (family trees, vital records)
- DNA verification (genetic ancestry testing)
- Community recognition (verified by descendant organizations)
- Self-identification (pending verification)

**Verification not required upfront** - Honor system applies; Foundation may audit high-profile forks to prevent abuse.

### 8.3 Why This Exception?

**Problem:** AGPL could prevent descendants from building proprietary tools for their communities.

**Solution:** Unlimited license for descendants ensures technology serves the nation, not just open-source ideals.

**Precedent:** Indigenous data sovereignty frameworks (Local Contexts, OCAP) prioritize community control over openness.

---

## 9.0 Prohibited Uses (Strictly Enforced)

### For ALL Users (Including Descendants):

❌ **Obstruct Justice** - Cannot modify code to help defendants avoid accountability  
❌ **Attack Network** - Cannot use code to launch denial-of-service attacks  
❌ **Fraudulent Claims** - Cannot modify x/claims to file false arbitration demands  
❌ **Governance Manipulation** - Cannot exploit voting vulnerabilities  

### For Defendants Specifically:

❌ **No Fork Rights** - Defendants listed in x/defendant module cannot fork  
❌ **No Governance Participation** - Cannot deploy competing DAOs to dilute governance  
❌ **No Defensive Use** - Cannot use code to build "counter-blockchain"  

### Enforcement:

- **License termination** for violations
- **Legal action** for damages to network
- **Public disclosure** of violations
- **Enhanced penalties** in reparations proceedings

---

## 10.0 Warranty Disclaimer

**THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.**

The software is provided "AS IS" without warranty of any kind, including:
- **Merchantability** - No guarantee it works for your purpose
- **Fitness** - No guarantee of security or reliability
- **Non-Infringement** - No guarantee against third-party claims
- **Bug-Free Operation** - Smart contracts may contain vulnerabilities

**USE AT YOUR OWN RISK.**

---

## 11.0 Liability Limitation

**IN NO EVENT SHALL COPYRIGHT HOLDERS BE LIABLE FOR DAMAGES.**

This includes:
- Lost funds due to smart contract bugs
- Validator slashing from node failures
- Governance vote failures
- DAO treasury losses
- Network downtime

**Maximum liability:** $0

**Exception:** Intentional misconduct or gross negligence (as determined by court).

---

## 12.0 How to Apply AGPL to Your Fork

If you create a derivative and want to comply with AGPL:

### Step 1: Include License File

Add `LICENSE` file to repository root:

```
GNU AFFERO GENERAL PUBLIC LICENSE
Version 3, 19 November 2007

[Full AGPL-3.0 text from gnu.org/licenses/agpl-3.0.txt]
```

### Step 2: Add Copyright Notices

In each source file:

```go
// Copyright (C) 2025 Your Name/Organization
// Based on Aequitas Protocol (C) 2025 Aequitas Protocol Foundation
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Full license: https://www.gnu.org/licenses/agpl-3.0.html
```

### Step 3: Provide Source Access

In your deployment:

```
Source code for this deployment is available at:
https://github.com/your-org/aequitas-fork

Licensed under GNU Affero General Public License v3.0
```

---

## 13.0 Resources & Support

**AGPL-3.0 Full Text:** https://www.gnu.org/licenses/agpl-3.0.html  
**GNU FAQ:** https://www.gnu.org/licenses/gpl-faq.html  
**SPDX Identifier:** AGPL-3.0-only

**Aequitas-Specific:**
- **License Questions:** legal@aequitasprotocol.zone
- **Descendant Exception:** descendants@aequitasprotocol.zone
- **Fork Registration:** forks@aequitasprotocol.zone
- **Compliance Help:** compliance@aequitasprotocol.zone

---

## The Mission

**Copyleft protects. Descendants are unlimited.**

AGPL-3.0 ensures that:
- ✅ Defendants cannot close the system
- ✅ Community can always fork and improve
- ✅ Transparency is enforced at the code level
- ✅ Network services must publish modifications

**The Descendant Exception ensures:**
- 🌍 Communities control their own forks
- 🔓 No barriers to local adaptations
- 💪 Empowerment over ideological purity
- ⚖️ Justice served, not just open source

---

⚖️ **Aequitas Protocol Foundation**  
🔓 **Open Source with Descendant Sovereignty**  
⛓️ **Your code is your governance. Your fork is your nation.**

**The code is copyleft. The descendants are unlimited. The justice is transparent.**

---

**For the full legal code, visit:**  
https://www.gnu.org/licenses/agpl-3.0.html

**SPDX Identifier:** AGPL-3.0-only
