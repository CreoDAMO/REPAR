# Create GitHub Release with Blockchain Binary

## Option 1: Using the Script (Easiest)

Run:
```bash
./upload-binary-manual.sh YOUR_GITHUB_TOKEN
```

## Option 2: Using GitHub Web UI

1. Go to https://github.com/CreoDAMO/REPAR/releases/new
2. Tag: `v1.0.0-blockchain`
3. Title: `Aequitas Blockchain v1.0.0`
4. Upload file: `bin/aequitasd-v1.0.0-linux-amd64.gz`
5. Click "Publish release"

## Then on Your Droplet:

```bash
cd /tmp
wget https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0-blockchain/aequitasd-v1.0.0-linux-amd64.gz
gunzip aequitasd-v1.0.0-linux-amd64.gz
chmod +x aequitasd-v1.0.0-linux-amd64
sudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd
aequitasd version
```
