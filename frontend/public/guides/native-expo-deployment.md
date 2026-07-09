# React Native Android Deployment Guide with Expo EAS

Deploy your React Native application as an installable Android APK using Expo Application Services (EAS).

## Prerequisites

Before starting, make sure you have:

- A React Native project created with Expo
- An Expo account
- Node.js installed
- npm installed

Verify Node.js and npm:

```bash
node -v
npm -v
```

If both commands return version numbers, you're ready to continue.

---

## Step 1: Configure Your App

Open the `app.json` file and update your application details:

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "android": {
      "package": "com.yourcompany.myapp"
    }
  }
}
```

### Important Fields

| Field | Description |
|---------|-------------|
| `name` | Application name displayed on the device |
| `slug` | Project identifier used by Expo |
| `version` | Current application version |
| `icon` | Application icon |
| `android.package` | Unique Android package name |

---

## Step 2: Install EAS CLI

Install Expo Application Services (EAS) globally:

```bash
npm install -g eas-cli
```

Verify installation:

```bash
eas --version
```

---

## Step 3: Login to Expo

Create a free Expo account if you do not already have one.

Then log in:

```bash
eas login
```

Enter your Expo account credentials when prompted.

---

## Step 4: Configure EAS Build

Navigate to your project folder and run:

```bash
eas build:configure
```

When prompted, select:

```text
Android
```

or

```text
All
```

This generates an `eas.json` file in your project.

---

## Step 5: Configure APK Builds

Open `eas.json` and ensure the preview profile contains:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

This tells Expo to generate an APK that can be installed directly on Android devices.

---

## Step 6: Generate an APK

Run:

```bash
eas build --platform android --profile preview
```

Expo will:

1. Upload your project.
2. Start a cloud build.
3. Compile your Android application.
4. Generate an installable APK.

The build process may take several minutes.

---

## Step 7: Download and Install the APK

Once the build is complete:

1. Open the build link provided in the terminal.
2. Download the generated APK.
3. Transfer it to your Android device if necessary.
4. Install the APK.

You may need to allow installations from unknown sources when installing manually.

---

## APK vs AAB

| Format | Use Case |
|----------|----------|
| APK | Install directly on Android devices |
| AAB | Upload to Google Play Store |

For testing and sharing with friends, use APK.

For publishing to the Play Store, use AAB.

---

## Production Builds

To generate a production-ready Android build, run:

```bash
eas build --platform android --profile production
```

Production builds are typically used for app store releases.

---

## Deployment Complete

Your React Native application has been successfully deployed using Expo EAS.

You can now:

- Install the app on Android devices
- Share APKs with testers
- Create production builds
- Publish to the Google Play Store