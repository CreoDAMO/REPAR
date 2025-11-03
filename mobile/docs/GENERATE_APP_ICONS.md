# Generate App Icons from $REPAR Logo

## ✅ LOGO ALREADY EXISTS!

We're using the **existing $REPAR coin logo** with scales of justice design:
- **Source SVG:** `mobile/assets/icon.svg`
- **Source PNG:** `mobile/assets/icon-source.png`

## Quick Setup (5 minutes)

### Option 1: Online Icon Generator (Easiest)

1. **Go to:** https://icon.kitchen or https://easyappicon.com

2. **Upload:** `mobile/assets/icon.svg` (or `icon-source.png`)

3. **Configure:**
   - Platform: iOS + Android
   - Background: Use existing background (already has gradient)
   - Padding: 10% (safe area)

4. **Download** and extract to `mobile/assets/`

5. **Expected files:**
   ```
   mobile/assets/
   ├── icon.png (1024x1024)
   ├── adaptive-icon.png (1024x1024 - Android)
   ├── splash-icon.png (1284x2778 - iOS)
   └── favicon.png (48x48 - Web)
   ```

### Option 2: Using ImageMagick (Command Line)

```bash
cd mobile/assets

# Install ImageMagick (if needed)
# macOS: brew install imagemagick
# Linux: sudo apt install imagemagick

# Generate 1024x1024 icon
convert icon.svg -resize 1024x1024 icon.png

# Generate adaptive icon (Android)
convert icon.svg -resize 1024x1024 adaptive-icon.png

# Generate splash screen
convert icon.svg -resize 1284x2778 -gravity center -background "#0F172A" -extent 1284x2778 splash-icon.png

# Generate favicon
convert icon.svg -resize 48x48 favicon.png
```

### Option 3: Using Expo Asset Generator (Built-in)

```bash
cd mobile

# This auto-generates all required sizes from icon.png
npx expo prebuild --clean

# Or use eas-cli
eas build:configure
```

## What the Logo Looks Like

**Design Elements:**
- ⚖️ **Scales of Justice** (gold)
- 🎨 **Gradient Background** (purple → pink)
- 💰 **$REPAR Text** (gold)
- 💫 **Professional finish** (already production-quality)

**Colors:**
- Background: Purple (#4F46E5) → Pink (#DB2777) gradient
- Scales: Gold (#FFD700 → #F59E0B)
- Border: Gold ring (#FFD700)

## Required Sizes

### iOS App Store
- ✅ **App Icon:** 1024x1024px PNG (no alpha)
- ✅ **App Store Icon:** Same as above
- Optional: Multiple sizes (handled by Expo automatically)

### Android Play Store
- ✅ **Adaptive Icon:** 1024x1024px PNG (foreground)
- ✅ **Legacy Icon:** 512x512px PNG
- Background: #0F172A (dark navy)

### Both Platforms
- ✅ **Splash Screen:** 1284x2778px (iPhone) / 1920x1080px (Android)
- ✅ **Favicon:** 48x48px (for PWA)

## Verification

After generating, check that:

```bash
cd mobile/assets

# Check icon exists and is 1024x1024
file icon.png
# Should show: PNG image data, 1024 x 1024

# Check file size (should be 50-500KB)
ls -lh icon.png adaptive-icon.png

# Test in app.json
grep "icon.png" ../app.json
```

## Update app.json

The icons are already configured in `mobile/app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "backgroundColor": "#0F172A"
    },
    "ios": {
      "icon": "./assets/icon.png"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0F172A"
      }
    }
  }
}
```

## Test Icons

```bash
cd mobile

# Start Expo
npx expo start

# View on device/simulator
# Icons should appear in:
# - App launcher
# - Recent apps
# - Settings
```

## App Store Screenshots

Once icons are working, capture screenshots:

1. Run app on iPhone 16 Pro Max simulator
2. Navigate to each screen (Dashboard, Wallet, Governance, Node, Claims)
3. Press `Cmd + S` to save screenshots
4. Upload to App Store Connect

## Time Estimate

- **Option 1 (Online):** 5 minutes
- **Option 2 (ImageMagick):** 10 minutes  
- **Option 3 (Expo/EAS):** Automatic

**Recommendation:** Use **Option 1** (online generator) for fastest results with perfect sizing.

---

## 🎉 RESULT

Instead of designing from scratch, we're using the **existing professional $REPAR logo** that's already:
- ✅ Designed with scales of justice
- ✅ Matches sovereignty theme
- ✅ Production-quality graphics
- ✅ Consistent with web app branding

**Total time: 5 minutes** (instead of 2 hours) 🚀
