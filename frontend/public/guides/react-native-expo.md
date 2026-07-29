## Prerequisites

Before starting, make sure you have:

- Node.js installed
- npm installed
- A code editor (VS Code recommended)
- Expo Go installed on your mobile device

Verify Node.js and npm:

```bash
node -v
npm -v
```

Example output:

```bash
v22.16.0
10.9.2
```

If both commands return version numbers, you're ready to continue.

---

## Step 1: Create a New Expo Project

Run:

```bash
npx create-expo-app@latest my-app
```

You will be prompted for:

1. Project name
2. Template selection

For beginners, choose the default template.

---

## Step 2: Navigate to the Project Directory

```bash
cd my-app
```

Replace `my-app` with your project name if you chose a different one.

---

## Step 3: Start the Development Server

Run:

```bash
npx expo start -c
```

This starts the Expo development server and clears any cached data.

---

## Step 4: Open the App on Your Device

A QR code will appear in your terminal.

### Android

1. Install Expo Go from the Play Store.
2. Open Expo Go.
3. Scan the QR code.

### iPhone (iOS)

1. Install Expo Go from the App Store.
2. Open the Camera app.
3. Scan the QR code.
4. Tap the Expo Go prompt.

> Your computer and mobile device must be connected to the same Wi-Fi network.

---

## Step 5: Test Hot Reloading

Open:

```text
app/(tabs)/index.tsx
```

Modify any text and save the file.

The app should update automatically without restarting.

---

## Project Structure

A new Expo project will look similar to:

```text
my-app/
├── app/
├── assets/
├── components/
├── constants/
├── hooks/
├── app.json
├── package.json
└── tsconfig.json
```

## Installation Complete

Your React Native application is now running with Expo.

You can now start building:

- Mobile applications
- Forms and dashboards
- API integrations
- Authentication systems
- AI-powered mobile apps
- Cross-platform Android and iOS applications