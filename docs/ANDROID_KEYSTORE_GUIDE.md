# Android Keystore Guide for APK Signing

## Overview

This guide explains how to create and configure the Android signing credentials required for building signed APK releases of the Aequitas Zone mobile app. Signed APKs are required for production sovereign distribution.

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded Android release keystore (.jks file) |
| `KEYSTORE_PASSWORD` | Password for the keystore file |
| `KEY_ALIAS` | Alias name for the signing key within the keystore |
| `KEY_PASSWORD` | Password for the specific key alias |

---

## Step 1: Generate a New Android Keystore

### Option A: Using Command Line (Recommended)

Open a terminal and run the following command:

```bash
keytool -genkeypair -v \
  -storetype JKS \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -keystore aequitas-release.keystore \
  -alias aequitas-release \
  -storepass YOUR_SECURE_STORE_PASSWORD \
  -keypass YOUR_SECURE_KEY_PASSWORD \
  -dname "CN=Aequitas Protocol, OU=Mobile Development, O=Aequitas Foundation, L=New York, ST=New York, C=US"
```

**Parameter Explanation:**
- `-storetype JKS` - Java KeyStore format
- `-keyalg RSA` - RSA encryption algorithm
- `-keysize 2048` - 2048-bit key (minimum recommended)
- `-validity 10000` - Valid for ~27 years
- `-keystore` - Output filename for the keystore
- `-alias` - Name to reference this key
- `-storepass` - Password to access the keystore file
- `-keypass` - Password for this specific key
- `-dname` - Distinguished Name (organization details)

### Option B: Using Android Studio

1. Open Android Studio
2. Go to **Build > Generate Signed Bundle / APK**
3. Select **APK** and click Next
4. Click **Create new...** under Key store path
5. Fill in the form:
   - **Key store path**: Choose location and name (e.g., `aequitas-release.keystore`)
   - **Password**: Create a strong password
   - **Alias**: `aequitas-release`
   - **Key password**: Create a strong password (can be same as store password)
   - **Validity**: 25+ years
   - **Certificate**: Fill in organization details
6. Click **OK** to generate

---

## Step 2: Convert Keystore to Base64

The keystore file must be converted to Base64 to store it as a GitHub Secret.

### On macOS/Linux:

```bash
base64 -i aequitas-release.keystore -o keystore_base64.txt
```

### On Windows (PowerShell):

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("aequitas-release.keystore")) | Out-File keystore_base64.txt
```

### On Windows (Command Prompt):

```cmd
certutil -encode aequitas-release.keystore keystore_base64.txt
```

**Note:** If using `certutil`, remove the header and footer lines (`-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`) from the output.

---

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click **New repository secret** for each:

| Secret Name | Value |
|-------------|-------|
| `ANDROID_KEYSTORE_BASE64` | Contents of `keystore_base64.txt` (the entire Base64 string) |
| `KEYSTORE_PASSWORD` | The store password you used when creating the keystore |
| `KEY_ALIAS` | `aequitas-release` (or whatever alias you chose) |
| `KEY_PASSWORD` | The key password you used when creating the keystore |

---

## Step 4: Verify Configuration

After adding the secrets, you can trigger the APEX Autonomous Deployment workflow. The `build-mobile-apk` job will:

1. Decode the Base64 keystore
2. Sign the APK with your credentials
3. Verify the signature
4. Report signing status in the workflow summary

Check the workflow logs for:
```
APK signed and verified successfully
signed=true
```

---

## Security Best Practices

### DO:
- Use strong, unique passwords (16+ characters with mixed case, numbers, symbols)
- Store a backup of the keystore file in a secure, offline location
- Use a password manager for credential storage
- Set validity to 25+ years (you cannot update apps with a different key)

### DON'T:
- Commit the keystore file to version control
- Share keystore passwords in plain text
- Use the same keystore for multiple unrelated apps
- Lose the keystore file (you cannot update the app without it)

---

## Keystore Recovery

**WARNING:** If you lose your keystore or forget the passwords, you CANNOT:
- Update the existing app on any app store
- Maintain the same package signature

You would need to publish as a completely new app with a new package name.

**Recommendation:** Store multiple encrypted backups of your keystore file in secure locations (encrypted USB drive, secure cloud storage, safety deposit box).

---

## Unsigned APK (Development/Testing)

If the Android signing secrets are not configured, the workflow will still build the APK but it will be unsigned. Unsigned APKs:
- Can be installed manually for testing (requires enabling "Install from unknown sources")
- Cannot be uploaded to Google Play Store
- Will show security warnings during installation
- Are suitable for development and testing only

---

## Troubleshooting

### Error: "jarsigner: command not found"
- Ensure Java JDK is installed and `JAVA_HOME` is set

### Error: "keystore was tampered with, or password was incorrect"
- Verify the Base64 encoding is correct (no extra whitespace or line breaks)
- Confirm the `KEYSTORE_PASSWORD` matches exactly

### Error: "Alias does not exist"
- Verify the `KEY_ALIAS` matches the alias used when creating the keystore
- List aliases: `keytool -list -keystore aequitas-release.keystore`

### Error: "Cannot recover key"
- Verify the `KEY_PASSWORD` is correct
- Note: Key password can be different from store password

---

## Additional Resources

- [Android Developer: Sign your app](https://developer.android.com/studio/publish/app-signing)
- [keytool Documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## Summary

1. **Generate keystore**: `keytool -genkeypair ...`
2. **Convert to Base64**: `base64 -i keystore.jks -o keystore_base64.txt`
3. **Add GitHub Secrets**: `ANDROID_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`
4. **Run deployment**: APEX workflow will automatically sign the APK

Your sovereign mobile distribution is now configured with cryptographic signing verification.
