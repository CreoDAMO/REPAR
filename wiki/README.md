# 📚 Aequitas Protocol Wiki

This directory contains the complete wiki documentation for the Aequitas Protocol.

---

## 🎯 Purpose

The wiki provides comprehensive documentation for:
- **Users:** How to use the mobile app and web platform
- **Developers:** Technical architecture, API reference, development guides
- **Contributors:** How to contribute to the project
- **Validators:** How to run nodes (mobile, home, cloud)
- **Legal:** Complete licensing framework (10 licenses)

---

## 📁 Wiki Structure

### Core Pages
- **[Home.md](./Home.md)** - Main wiki landing page
- **[Quick-Start.md](./Quick-Start.md)** - Get started in 5 minutes
- **[Architecture.md](./Architecture.md)** - Complete system architecture
- **[Blockchain-Modules.md](./Blockchain-Modules.md)** - All 12 custom modules
- **[Licensing-Framework.md](./Licensing-Framework.md)** - 10 comprehensive licenses

### Auto-Generated Pages
- **Statistics.md** - Project statistics (auto-generated)
- **Module-Index.md** - Blockchain module index (auto-generated)
- **Frontend-Pages.md** - Frontend page list (auto-generated)

---

## 🔄 Auto-Generation

### Generate Wiki Pages

```bash
# Run the auto-generation script
./wiki/generate-wiki.sh
```

This script automatically:
- ✅ Counts frontend pages, mobile components, blockchain modules
- ✅ Generates statistics (Statistics.md)
- ✅ Creates module index (Module-Index.md)
- ✅ Lists frontend pages (Frontend-Pages.md)
- ✅ Updates timestamps on all wiki pages

### Manual Updates

To manually update wiki pages:

1. **Edit markdown files** in `wiki/` directory
2. **Update Last Updated date** at bottom of each file
3. **Commit changes** to repository

---

## 📤 Publishing to GitHub Wiki

### Option 1: Manual Copy

```bash
# 1. Clone the wiki repository
git clone https://github.com/CreoDAMO/REPAR.wiki.git

# 2. Copy wiki files
cp wiki/*.md REPAR.wiki/

# 3. Commit and push
cd REPAR.wiki
git add .
git commit -m "Update wiki documentation"
git push
```

### Option 2: Automated Script (Recommended)

```bash
# Run the generation + publishing script
./wiki/publish-wiki.sh
```

---

## 📝 Wiki Pages Overview

| Page | Purpose | Auto-Generated |
|------|---------|----------------|
| **Home.md** | Main landing page | ❌ Manual |
| **Quick-Start.md** | Getting started guide | ❌ Manual |
| **Architecture.md** | System architecture | ❌ Manual |
| **Blockchain-Modules.md** | Module documentation | ❌ Manual |
| **Licensing-Framework.md** | License documentation | ❌ Manual |
| **Statistics.md** | Project statistics | ✅ Auto |
| **Module-Index.md** | Module index | ✅ Auto |
| **Frontend-Pages.md** | Page index | ✅ Auto |

---

## 🛠️ Maintenance

### Adding New Pages

1. Create new markdown file in `wiki/` directory
2. Follow naming convention: `Title-With-Hyphens.md`
3. Include these sections at bottom:
   ```markdown
   ---
   **Last Updated:** November 04, 2025
   **Version:** 1.0  
   **Next:** [Related-Page](./Related-Page.md)
   ```
4. Update `Home.md` navigation links
5. Run `./wiki/generate-wiki.sh` to update statistics

### Updating Existing Pages

1. Edit the markdown file
2. Update "Last Updated" date
3. Increment version if major changes
4. Commit changes

### Auto-Generation Schedule

Recommended auto-generation schedule:
- **Daily:** Statistics.md (if CI/CD is set up)
- **Weekly:** Module-Index.md, Frontend-Pages.md
- **On Release:** All pages

---

## 🎨 Markdown Formatting Guidelines

### Headers
```markdown
# Page Title (H1 - only one per page)
## Section (H2)
### Subsection (H3)
#### Detail (H4)
```

### Code Blocks
````markdown
```bash
# Bash commands
npm install
```

```javascript
// JavaScript code
const example = "code";
```
````

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### Links
```markdown
[Internal Link](./Other-Page.md)
[External Link](https://example.com)
```

### Emojis
Use emojis sparingly for visual hierarchy:
- 🎯 Goals/Objectives
- ✅ Completed items
- ⚠️ Warnings
- 📱 Mobile-related
- ⛓️ Blockchain-related
- ⚖️ Legal/Justice-related

---

## 📊 Statistics

- **Total Wiki Pages:** 8+ (and growing)
- **Total Documentation:** ~50KB+ markdown
- **Languages Supported:** English (more planned)
- **Auto-Generated Content:** 3 pages

---

## 🤝 Contributing to Wiki

### Guidelines

1. **Accuracy:** Ensure all information is current and correct
2. **Clarity:** Write for both technical and non-technical audiences
3. **Examples:** Include code examples and screenshots where helpful
4. **Links:** Cross-reference related pages
5. **Formatting:** Follow markdown guidelines above

### Review Process

1. Submit changes via pull request
2. Documentation team reviews for accuracy
3. Technical team verifies code examples
4. Changes merged and wiki published

---

## 🔗 External Resources

- **GitHub Repository:** [CreoDAMO/REPAR](https://github.com/CreoDAMO/REPAR)
- **GitHub Wiki:** [REPAR Wiki](https://github.com/CreoDAMO/REPAR/wiki)
- **Main Documentation:** `/docs` directory
- **Mobile App Docs:** `/mobile/docs`
- **Blockchain Docs:** `/aequitas/docs`

---

## 📧 Contact

**Questions about wiki?**
- Email: docs@aequitasprotocol.zone
- GitHub Issues: [Report Documentation Issues](https://github.com/CreoDAMO/REPAR/issues/new?labels=documentation)

---

**Last Updated:** November 04, 2025
**Version:** 1.0  
**Maintainer:** Aequitas Protocol Foundation
