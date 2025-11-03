# Aequitas Protocol Mobile App - Deployment Guide

## Prerequisites

1. **Expo Account**: Create at https://expo.dev
2. **Apple Developer Account**: $99/year (for iOS)
3. **Google Play Developer Account**: $25 one-time (for Android)
4. **EAS CLI**: `npm install -g eas-cli`

## Quick Start

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Login to Expo
eas login

# Configure project
eas build:configure

# Create development build
eas build --profile development --platform all

# Create production build
eas build --profile production --platform all
```

## Detailed Setup

### 1. Initialize EAS Project

```bash
cd mobile
eas init

# This will create:
# - EAS project ID in app.json
# - eas.json configuration file
```

### 2. Configure App Store Connect (iOS)

**Apple Developer Portal:**
1. Go to https://developer.apple.com
2. Create App ID: `zone.aequitas.mobile`
3. Enable capabilities:
   - Push Notifications
   - Background Modes
   - Biometric Authentication
4. Create provisioning profiles (Development, Ad Hoc, App Store)

**App Store Connect:**
1. Go to https://appstoreconnect.apple.com
2. Create new app
3. Bundle ID: `zone.aequitas.mobile`
4. Name: "Aequitas Protocol"
5. Category: Finance
6. Upload screenshots (see APP_STORE_ASSETS.md)

### 3. Configure Google Play Console (Android)

**Google Play Console:**
1. Go to https://play.google.com/console
2. Create new app
3. Package name: `zone.aequitas.mobile`
4. App name: "Aequitas Protocol"
5. Category: Finance
6. Content rating: Complete questionnaire
7. Upload store listing assets

**Service Account for Submissions:**
```bash
# Generate service account JSON from Google Cloud Console
# Place in: mobile/google-services.json (gitignored)
```

### 4. Build for Development

```bash
# iOS Simulator build
eas build --platform ios --profile development

# Android APK build
eas build --platform android --profile development

# Install on device
eas build:run --platform ios
eas build:run --platform android
```

### 5. Build for Internal Testing

```bash
# Preview builds (Ad Hoc/APK)
eas build --profile preview --platform all

# Distribute to TestFlight (iOS)
eas submit --platform ios --profile preview

# Distribute to Internal Testing (Android)
eas submit --platform android --profile preview --track internal
```

### 6. Production Build & Submission

```bash
# Build production apps
eas build --profile production --platform all

# Submit to App Store
eas submit --platform ios --profile production

# Submit to Google Play
eas submit --platform android --profile production
```

## App Store Submission Checklist

### iOS (App Store)

- [ ] App icon (1024x1024px)
- [ ] Screenshots (iPhone 6.9", 6.7", iPad Pro 13")
- [ ] App preview video (optional)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] Age rating completed
- [ ] Export compliance declaration
- [ ] TestFlight beta testing completed
- [ ] App Review Information filled
- [ ] Pricing & Availability set

### Android (Google Play)

- [ ] App icon (512x512px)
- [ ] Feature graphic (1024x500px)
- [ ] Screenshots (7" & 10" tablets, phones)
- [ ] Privacy policy URL
- [ ] Content rating completed
- [ ] Target audience selected
- [ ] App category selected
- [ ] Store listing complete
- [ ] Internal testing completed

## Environment Variables

The app uses these environment variables (configure in EAS Secrets):

```bash
# Blockchain RPC endpoint
EXPO_PUBLIC_RPC_ENDPOINT=https://rpc.aequitasprotocol.zone

# Chain ID
EXPO_PUBLIC_CHAIN_ID=aequitas-1

# Optional: Analytics
EXPO_PUBLIC_ANALYTICS_ID=your-analytics-id
```

Configure secrets:
```bash
eas secret:create --name EXPO_PUBLIC_RPC_ENDPOINT --value https://rpc.aequitasprotocol.zone
eas secret:create --name EXPO_PUBLIC_CHAIN_ID --value aequitas-1
```

## Update & Versioning

### Semantic Versioning

- **Major (1.0.0)**: Breaking changes
- **Minor (1.1.0)**: New features, backwards compatible
- **Patch (1.0.1)**: Bug fixes

### Update Process

1. **Update version in app.json:**
   ```json
   {
     "expo": {
       "version": "1.1.0",
       "ios": {
         "buildNumber": "2"
       },
       "android": {
         "versionCode": 2
       }
     }
   }
   ```

2. **Build new version:**
   ```bash
   eas build --profile production --platform all
   ```

3. **Submit update:**
   ```bash
   eas submit --platform all
   ```

## Over-the-Air (OTA) Updates

For non-native code updates (JavaScript, assets):

```bash
# Publish update to production channel
eas update --branch production --message "Fix governance voting UI"

# Publish to staging first
eas update --branch staging --message "Test new features"

# Rollback if needed
eas update --branch production --message "Rollback" --republish
```

## Monitoring & Analytics

### Expo Insights

```bash
# View build analytics
eas build:list --platform all --limit 20

# View update analytics
eas update:list --branch production
```

### Crash Reporting

The app uses Expo's built-in crash reporting. View crashes at:
https://expo.dev/accounts/[account]/projects/aequitas-mobile/insights

## TestFlight Beta Testing (iOS)

1. **Internal Testing:**
   ```bash
   eas submit --platform ios --profile preview
   ```
   - Available immediately to team
   - Up to 100 internal testers
   - No App Review required

2. **External Testing:**
   - Submit for TestFlight App Review
   - Up to 10,000 external testers
   - Public link distribution

3. **Invite testers:**
   - Email invitations from App Store Connect
   - Public TestFlight link

## Google Play Internal Testing

1. **Create internal testing track:**
   - Go to Google Play Console
   - Release → Testing → Internal testing
   - Create release from EAS build

2. **Add testers:**
   - Create tester list (email addresses)
   - Share opt-in link

3. **Promote to production:**
   - After testing complete
   - Promote release to production track

## Common Issues & Solutions

### Build Failures

**Issue: "Provisioning profile doesn't include signing certificate"**
```bash
# Solution: Clear credentials and regenerate
eas credentials --platform ios
# Select "Remove all credentials for this project"
# Then rebuild
```

**Issue: "Android keystore not found"**
```bash
# Solution: Generate new keystore
eas credentials --platform android
# Select "Generate new Android Keystore"
```

### Submission Failures

**Issue: "Missing compliance information"**
- Go to App Store Connect → Your App → App Information
- Select "No" for Export Compliance (using standard encryption)

**Issue: "Privacy policy URL required"**
- Add to app.json and App Store Connect
- Must be publicly accessible HTTPS URL

## Production Deployment Timeline

### Week 1: Preparation
- [ ] Complete app development
- [ ] Generate all App Store assets
- [ ] Write privacy policy
- [ ] Complete content ratings
- [ ] Set up analytics

### Week 2: Internal Testing
- [ ] Build preview versions
- [ ] Distribute to internal testers (10-20 people)
- [ ] Fix critical bugs
- [ ] Validate blockchain connectivity

### Week 3: Beta Testing
- [ ] Submit to TestFlight (iOS)
- [ ] Release to Google Play Internal Testing
- [ ] Expand to 100-200 testers
- [ ] Collect feedback
- [ ] Monitor battery usage and crashes

### Week 4: Production Launch
- [ ] Build production versions
- [ ] Submit to App Store for Review
- [ ] Submit to Google Play for Review
- [ ] Wait for approval (1-3 days iOS, 1-7 days Android)
- [ ] Launch! 🚀

## Post-Launch

### Day 1-7:
- Monitor crash reports every 2 hours
- Respond to user reviews within 24 hours
- Track download metrics
- Monitor server load

### Week 2-4:
- Release bug fix updates as needed
- Analyze user behavior
- Plan feature updates
- Scale infrastructure if needed

### Month 2+:
- Regular feature releases (every 2-4 weeks)
- Community feedback incorporation
- Performance optimizations
- Guardian Program expansion

## Support Contacts

**Expo Support:** https://expo.dev/support
**Apple Developer Support:** https://developer.apple.com/support
**Google Play Support:** https://support.google.com/googleplay/android-developer

## CI/CD Integration (Future)

```yaml
# .github/workflows/mobile-deploy.yml
name: Mobile App Deployment

on:
  push:
    branches: [main]
    paths: ['mobile/**']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: cd mobile && eas build --profile production --platform all --non-interactive
```

---

**Ready to ship!** Follow this guide for successful deployment to 300M descendants worldwide.
