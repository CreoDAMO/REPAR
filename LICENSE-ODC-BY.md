# Open Data Commons Attribution License v1.0 (ODC-By)

**Effective Date:** November 3, 2025  
**Applies To:** Forensic Audit Database, Genealogy Records, Descendant Verification Data, UCL Research Dataset

---

## Preamble

The Aequitas Protocol Foundation maintains comprehensive databases including:
- 📊 **Forensic Audit Data** - 205-page audit findings, evidence, liability calculations
- 🌳 **Genealogy Database** - Descendant verification records, family trees, lineage proofs
- 🧬 **DNA Verification Data** - Genetic evidence for descendant claims
- 📚 **UCL Legacy of British Slavery Database** - Historical ownership records
- ⚖️ **Defendant Tracking Database** - 200+ entities, payment obligations, accountability metrics

These databases represent **collective knowledge** that must be accessible while protecting **provenance and attribution**.

---

## License Summary (Plain English)

### You Are Free To:

✅ **Share** - Copy, distribute, and use the database  
✅ **Create** - Produce works (reports, charts, apps) from the database  
✅ **Adapt** - Modify, transform, and build upon the database  
✅ **Commercial Use** - Generate revenue from database-derived works

### Under These Conditions:

⚖️ **Attribution** - You must give appropriate credit, provide a link to the license, and indicate if changes were made

---

## Full License Terms

This database is made available under the **Open Data Commons Attribution License (ODC-By) v1.0**.

**Full legal code:** https://opendatacommons.org/licenses/by/1-0/

### 1.0 Definitions

**Database:** A collection of material (records, data, genealogy entries) arranged systematically and individually accessible by electronic or other means.

**Derivative Database:** A database based on the original but modified (e.g., enhanced with additional sources, corrected entries, merged datasets).

**Produced Work:** A work resulting from using all or a substantial part of the database contents (e.g., descendant verification report, family tree chart, research paper).

**Publicly Use:** Make the database or produced work available to persons other than yourself or your immediate family/organization.

---

## 2.0 Rights Granted

You are free to:

### 2.1 To Use the Database
- Extract and re-utilize contents
- Create produced works
- Copy and distribute the database
- Modify the database

### 2.2 To Create Derivative Databases
- Adapt, transform, and build upon the database
- Combine with other databases
- Correct errors and enhance with new information

### 2.3 Commercial Use
- Use database for commercial purposes
- Sell access to derivative databases
- Generate revenue from produced works

---

## 3.0 Attribution Requirement

When you **publicly use** the database or any produced work, you must:

### 3.1 Attribute the Database

Include a notice substantially in this form:

```
Contains information from [DATABASE NAME] by Aequitas Protocol Foundation,
available under the Open Data Commons Attribution License.

Database: https://aequitasprotocol.zone/data/[database-name]
License: https://opendatacommons.org/licenses/by/1.0/
```

### 3.2 Keep Existing Notices

Maintain any existing copyright, database right, or attribution notices in the database.

### 3.3 Make License Clear

Inform recipients that the database is available under ODC-By and provide the license text or a link.

---

## 4.0 Attribution Examples for Aequitas Databases

### Example 1: Descendant Verification Report

```
This descendant verification report is based on data from the
Aequitas Protocol Genealogy Database, made available under the
Open Data Commons Attribution License (ODC-By) v1.0.

Source: https://aequitasprotocol.zone/data/genealogy
License: https://opendatacommons.org/licenses/by/1.0/

Modifications: Added DNA verification results (2025-11-03)
```

### Example 2: Research Paper Using Forensic Audit Data

```
This research utilizes the Aequitas Protocol Forensic Audit Database
(Aequitas Protocol Foundation, 2025) licensed under ODC-By v1.0.
Available at: https://aequitasprotocol.zone/data/forensic-audit
```

### Example 3: Mobile App Using Descendant Records

```
About > Data Sources:

"This app uses data from:
- Aequitas Protocol Genealogy Database (ODC-By v1.0)
- UCL Legacies of British Slavery Database (ODC-By v1.0)

Full attribution: https://aequitasprotocol.zone/attribution"
```

---

## 5.0 Special Provisions for Aequitas

### 5.1 Descendant Community Enhanced Rights

Descendants of enslaved persons from the transatlantic slave trade have **enhanced rights**:

1. **Unlimited Use** - No restrictions on personal, community, or commercial use
2. **Simplified Attribution** - "Based on Aequitas data" is sufficient
3. **Priority Support** - Technical assistance for database queries
4. **Data Correction Rights** - Submit corrections to genealogy errors
5. **Privacy Controls** - Request removal of living persons' data (GDPR compliance)

### 5.2 Database-Specific Terms

#### Forensic Audit Database
- **Restrictions:** Cannot be used to aid defendants in evading accountability
- **Commercial Licensing:** Risk assessment firms require separate commercial agreement (see LICENSE-RESEARCH.md)
- **Academic Exception:** Free use for peer-reviewed research

#### Genealogy Database
- **Privacy:** Living persons' data protected under GDPR/CCPA
- **Verification:** DNA matches and genealogy proofs require consent for public sharing
- **Cultural Sensitivity:** Some family lines may have Traditional Knowledge restrictions (see LICENSE-TK.md)

#### Defendant Tracking Database
- **Public Interest:** Defendant payment records are public information
- **Real-Time Updates:** Live data feed available via API (attribution required)
- **Corrections:** Defendant corrections require evidence submission

---

## 6.0 What This License Does NOT Cover

### Individual Contents May Have Separate Rights

While the **database structure and collection** is licensed under ODC-By, individual records may have additional protections:

- **Photos/Images:** May have separate copyright (check individual records)
- **Documents:** Original documents may be copyrighted separately
- **DNA Data:** Subject to privacy laws (GDPR, CCPA, genetic privacy acts)
- **Personal Information:** Living persons have privacy rights

### Rights NOT Granted by This License

- **Trademarks:** "Aequitas Protocol," "REPAR" logos remain protected
- **Privacy Rights:** Consent required for personal data processing
- **Patents:** If database includes patented processes
- **Moral Rights:** Attribution cannot be waived in some jurisdictions

---

## 7.0 Use Cases & Examples

### ✅ **Permitted Uses (With Attribution):**

1. **Academic Research:** Publish peer-reviewed papers citing Aequitas databases
2. **Genealogy Services:** Offer paid descendant verification using our genealogy data
3. **Mobile Apps:** Build apps that query Aequitas databases (with attribution in UI)
4. **Legal Proceedings:** Submit database records as evidence in reparations cases
5. **Journalism:** Investigate defendants using our tracking database
6. **Data Analytics:** Create visualizations, charts, dashboards from our data
7. **Education:** Use in university courses, community workshops

### ❌ **Prohibited Uses:**

1. **No Attribution:** Using database publicly without proper credit
2. **Aiding Defendants:** Using forensic data to help defendants evade accountability
3. **Privacy Violations:** Publishing living persons' data without consent
4. **Misrepresentation:** Claiming database as your original work
5. **Removing Notices:** Stripping attribution from derivative databases

---

## 8.0 Technical Implementation

### API Attribution Requirements

If you provide API access to Aequitas database content:

```json
{
  "data": { ... },
  "attribution": {
    "source": "Aequitas Protocol Genealogy Database",
    "license": "ODC-By-1.0",
    "url": "https://aequitasprotocol.zone/data/genealogy",
    "modifications": "Filtered for public records only"
  }
}
```

### Database Exports

Include `LICENSE.txt` in exported data packages:

```
This database export contains information from:
Aequitas Protocol Foundation Databases

Licensed under: Open Data Commons Attribution License v1.0
Full license: https://opendatacommons.org/licenses/by/1.0/

Source databases:
- Forensic Audit Database
- Genealogy Records Database
- Defendant Tracking Database

Export date: 2025-11-03
Modifications: None (original data)
```

---

## 9.0 Warranty Disclaimer

**THE DATABASE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.**

We do not warrant:
- **Accuracy** - Genealogy records may contain errors
- **Completeness** - Database is continuously updated
- **Fitness** - Suitability for your particular purpose
- **Non-Infringement** - Third-party rights in individual records

**Use at your own risk.** Verify critical information independently.

---

## 10.0 Liability Limitation

In no event shall the Aequitas Protocol Foundation be liable for:
- Errors or omissions in database content
- Damages arising from database use
- Third-party claims based on your use
- Privacy violations in your derivative works

**Maximum liability:** $0 (database provided free of charge)

---

## 11.0 Updates & Versioning

### Database Versioning

Aequitas databases use semantic versioning:
- **v1.0.0** - Initial release (Nov 2025)
- **v1.1.0** - New records added
- **v2.0.0** - Major schema changes

Check database version before using for critical applications.

### License Updates

This database uses **ODC-By v1.0** (frozen version). Future database releases may use updated license versions with backwards compatibility.

---

## 12.0 Contacts & Support

**Database Access:** data@aequitasprotocol.zone  
**Attribution Questions:** legal@aequitasprotocol.zone  
**Data Corrections:** corrections@aequitasprotocol.zone  
**Commercial Licensing:** commercial@aequitasprotocol.zone  
**Descendant Verification:** descendants@aequitasprotocol.zone  
**API Support:** api@aequitasprotocol.zone

---

## The Mission

**Data reunifies. Attribution honors.**

These databases represent decades of forensic research, genealogical investigation, and historical truth-telling. They document:
- 12-15 million enslaved persons
- 300 million descendants
- $131 trillion in unpaid debts
- 200+ defendants liable for payment

By releasing under ODC-By, we ensure:
✅ **Knowledge is accessible** (free use)  
✅ **Provenance is protected** (attribution required)  
✅ **Community is empowered** (enhanced descendant rights)  
✅ **Truth is preserved** (immutable blockchain records)

---

⚖️ **Aequitas Protocol Foundation**  
📊 **Open Data for 300 Million Descendants**  
🌳 **Your ancestry is your evidence. Your data is your nation.**

**The data is open. The attribution is required. The justice is mathematical.**

---

**For the full legal code, visit:**  
https://opendatacommons.org/licenses/by/1-0/

**SPDX Identifier:** ODC-By-1.0
