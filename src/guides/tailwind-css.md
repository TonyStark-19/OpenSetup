# Tailwind CSS Setup Guide for Vite + React + TypeScript

This guide will help you add Tailwind CSS to an existing Vite + React + TypeScript project.

## Prerequisites

Make sure you have already created a Vite + React + TypeScript project.

If you haven't done that yet, follow the **Vite + React + TypeScript Setup Guide** first.

---

## Step 1: Install Tailwind CSS

Navigate to your project directory and run:

```bash
npm install tailwindcss @tailwindcss/vite
```

This installs Tailwind CSS along with the official Vite plugin.

---

## Step 2: Configure Vite

Open the `vite.config.ts` file.

### Import the Tailwind Vite Plugin

Add the following import:

```ts
import tailwindcss from "@tailwindcss/vite";
```

### Add the Plugin

Update the `plugins` array:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

---

## Step 3: Import Tailwind CSS

Open the `src/index.css` file and replace its contents with:

```css
@import "tailwindcss";
```

This imports all of Tailwind's utility classes into your project.

---

## Step 4: Remove Unused Styles

Vite creates an `App.css` file by default.

Since Tailwind will handle your styling, you can safely delete:

```text
src/App.css
```

Also remove its import from `App.tsx` if it exists:

```tsx
import "./App.css";
```

---

## Step 5: Test Tailwind CSS

Update your `App.tsx` file:

```tsx
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-white">
        Tailwind CSS is working! 🚀
      </h1>
    </div>
  );
}

export default App;
```

Start the development server:

```bash
npm run dev
```

If you see the styled heading, Tailwind CSS has been configured successfully.

---

## Project Structure

After setup, your project should look similar to:

```text
src/
├── assets/
├── App.tsx
├── index.css
└── main.tsx
```
---