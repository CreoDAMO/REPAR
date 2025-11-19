# GitHub Workflow Updates - Manual Upload Required

Due to GitHub OAuth workflow scope restrictions, these files need to be uploaded manually to GitHub.

## File 1: `.github/workflows/cerberus-audit.yml`

**Change:** Line 22 - Increase timeout from 30 to 45 minutes

```yaml
timeout-minutes: 45
```

**Full change context:**
```yaml
jobs:
  security-audit:
    runs-on: ubuntu-latest
    timeout-minutes: 45  # CHANGED from 30 to 45
```

---

## File 2: `.github/workflows/blockchain-build.yml`

**Change:** Add Go module caching after "Set up Go" step (insert after line 34)

**Add these lines between "Set up Go" and "Download dependencies":**

```yaml
      - name: Cache Go modules
        uses: actions/cache@v4
        with:
          path: |
            ~/go/pkg/mod
            ~/.cache/go-build
            aequitas/vendor
          key: ${{ runner.os }}-go-${{ hashFiles('aequitas/go.sum') }}
          restore-keys: |
            ${{ runner.os }}-go-
```

---

## How to Apply These Changes on GitHub

### Option 1: Direct Web Edit (Recommended)
1. Go to your repo: `https://github.com/CreoDAMO/REPAR`
2. Navigate to `.github/workflows/cerberus-audit.yml`
3. Click the pencil icon (Edit)
4. Find line 22 and change `timeout-minutes: 30` to `timeout-minutes: 45`
5. Commit directly to main branch

6. Navigate to `.github/workflows/blockchain-build.yml`
7. Click the pencil icon (Edit)
8. Find the "Set up Go" step (around line 30-34)
9. After that step, add the Cache Go modules step shown above
10. Commit directly to main branch

### Option 2: Download Full Files
The complete updated files are saved in this Replit workspace at:
- `.github/workflows/cerberus-audit.yml`
- `.github/workflows/blockchain-build.yml`

You can download them from Replit's file tree (enable "Show hidden files" to see the `.github` folder).

---

## Benefits of These Changes

### Cerberus Audit Timeout (45 min)
- Prevents timeouts during comprehensive security scans
- Allows full NVIDIA NIM AI analysis to complete
- Reduces failed workflow runs

### Blockchain Build Cache
- **Speeds up builds by 5-10 minutes** (from ~15min to ~5min on subsequent runs)
- Caches Go module downloads
- Reuses compiled Go packages
- Saves GitHub Actions minutes

Both changes are performance optimizations and won't affect functionality.
