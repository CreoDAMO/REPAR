# Aequitas Binary Directory

This directory contains the aequitasd blockchain binary.

## Binary Info
- **Expected Binary**: aequitasd
- **Source**: GitHub Actions Build
- **SHA256**: 3b3db469e1185d3be9cf63881e79500573a0a3e5983b715f6d66f4d8b027f0ce
- **Size**: 57.6 MB
- **Download**: https://github.com/CreoDAMO/REPAR/actions/runs/18846055981/artifacts/4383146372

## Upload Instructions
1. Download the aequitasd-latest.zip from GitHub Actions
2. Extract the binary: `unzip aequitasd-latest.zip`
3. Upload the binary to this bin/ folder
4. Make it executable: `chmod +x bin/aequitasd`
5. Verify checksum: `sha256sum bin/aequitasd`

## Verification
After upload, run:
```bash
chmod +x bin/aequitasd
sha256sum bin/aequitasd
# Should match: 3b3db469e1185d3be9cf63881e79500573a0a3e5983b715f6d66f4d8b027f0ce
```

## Alternative: Download Script
You can also use the download script:
```bash
bash scripts/download-binary.sh
```

