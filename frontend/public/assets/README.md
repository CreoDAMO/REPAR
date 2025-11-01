# Aequitas Protocol Assets

## $REPAR Logo

### Available Formats

- **SVG:** `repar-logo.svg` ✅ (Created)
- **PNG:** `repar-logo.png` ⚠️ (Needs generation)

### Generate PNG from SVG

Before submitting to Keplr Chain Registry, generate the PNG version:

#### Option 1: Using Inkscape (Recommended)
```bash
inkscape repar-logo.svg \
  --export-type=png \
  --export-filename=repar-logo.png \
  --export-width=512 \
  --export-height=512
```

#### Option 2: Using ImageMagick
```bash
convert -background none \
  -resize 512x512 \
  repar-logo.svg \
  repar-logo.png
```

#### Option 3: Online Tool
1. Go to: https://svgtopng.com/
2. Upload: `repar-logo.svg`
3. Set dimensions: 512x512 pixels
4. Download and save as: `repar-logo.png`

### Specifications

- **Size:** 512x512 pixels
- **Format:** PNG with transparent background
- **Color Space:** sRGB
- **Usage:** 
  - Keplr Wallet icon
  - MetaMask network icon
  - Block explorer favicon
  - Social media previews

### Update After PNG Generation

Once PNG is generated, update these locations:

1. Keplr chain registry: `keplr-chain-registry/aequitas.json`
2. Keplr asset list: `keplr-chain-registry/assetlist.json`
3. Frontend metadata: `frontend/index.html` (favicon)
4. README badges and images

---

**⚖️ The Justice Machine - $REPAR Native Coin**
