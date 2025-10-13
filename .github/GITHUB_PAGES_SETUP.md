# GitHub Pages Deployment Setup

## Current Status

The **Build Frontend** workflow successfully builds the frontend and creates artifacts, but GitHub Pages deployment is currently disabled because Pages is not enabled in the repository settings.

## How to Enable GitHub Pages Deployment

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar under "Code and automation")
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 2: The Workflow Will Automatically Deploy

Once GitHub Pages is enabled, the `Build Frontend` workflow will automatically:
- Build the React frontend
- Create deployment artifacts
- Deploy to GitHub Pages
- Provide a live URL

## Current Build Status

✅ **Frontend builds successfully** - artifacts are created and stored  
⚠️ **Deployment skipped** - waiting for GitHub Pages to be enabled in settings

## What Happens When You Enable Pages

- Every push to the `main` branch that affects the `frontend/` directory will trigger a new deployment
- The site will be available at: `https://<username>.github.io/<repository-name>/`
- You can also set up a custom domain if needed

## Alternative: Manual Deployment

If you prefer not to use GitHub Pages, you can:

1. Download the build artifacts from the Actions tab
2. Deploy the `dist` folder to any static hosting service:
   - Netlify
   - Vercel  
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - Any other static site host

## Files Involved

- `.github/workflows/deploy-frontend.yml` - Build workflow (currently builds only, can deploy when Pages is enabled)
- `frontend/dist/` - Build output directory (not committed to git)

---

**Note**: The workflow has been configured to handle both scenarios gracefully - it will build artifacts either way, and only deploy when Pages is properly configured.
