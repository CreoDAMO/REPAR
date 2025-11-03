# Logo Requirements for Keplr Chain Registry

## Requirements

**For Keplr submission, you need:**

- **Format**: PNG only (no SVG, no JPG)
- **Dimensions**: Exactly 256×256 pixels
- **File size**: Under 1MB (preferably under 500KB)
- **File location**: `images/aequitas/chain.png`
- **Design note**: Will be auto-cropped to circle by Keplr

---

## Current Status

We have an SVG logo at:
```
frontend/public/assets/repar-logo.svg
```

**TODO**: Convert to 256×256 PNG for Keplr submission

---

## How to Generate PNG from SVG

### Option 1: Using ImageMagick (Command Line)

```bash
# Install ImageMagick if needed
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Convert SVG to 256x256 PNG
convert -background none \
        -density 1200 \
        -resize 256x256 \
        frontend/public/assets/repar-logo.svg \
        keplr-chain-registry/images/aequitas/chain.png
```

### Option 2: Using Inkscape (Command Line)

```bash
# Install Inkscape if needed
# Ubuntu/Debian: sudo apt-get install inkscape
# macOS: brew install inkscape

# Convert with Inkscape
inkscape frontend/public/assets/repar-logo.svg \
         --export-filename=keplr-chain-registry/images/aequitas/chain.png \
         --export-width=256 \
         --export-height=256
```

### Option 3: Online Converter

1. Go to https://cloudconvert.com/svg-to-png
2. Upload: `frontend/public/assets/repar-logo.svg`
3. Set dimensions: 256×256
4. Download PNG
5. Save to: `keplr-chain-registry/images/aequitas/chain.png`

### Option 4: Figma/Design Tool

1. Open SVG in Figma
2. Export as PNG
3. Set export size: 256×256
4. Download and save

---

## Verification

After generating, verify the PNG:

```bash
# Check dimensions
file keplr-chain-registry/images/aequitas/chain.png
# Should show: PNG image data, 256 x 256

# Check file size
ls -lh keplr-chain-registry/images/aequitas/chain.png
# Should be < 1MB (ideally < 500KB)
```

---

## Preview as Circle

Remember: Keplr will crop this to a circle automatically, so make sure your logo looks good when circular.

**Test preview**: Most image viewers let you preview with circular crop/mask.

---

**Once PNG is generated, you're ready for Keplr submission!**
