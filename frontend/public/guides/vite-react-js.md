# Vite + React + JavaScript Setup Guide

Set up a modern React application powered by Vite and JavaScript in just a few minutes.

## Prerequisites

Before starting, make sure Node.js and npm are installed on your machine.

Run the following commands in your terminal:

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

## Step 1: Create a New Vite Project

Run the following command:

```bash
npm create vite@latest
```

You will be prompted with a few options:

1. Enter your project name.
2. Select **React** as the framework.
3. Select **javaScript** as the variant.
4. Confirm dependency installation when prompted.

Alternatively, you can create the project directly with a single command:

```bash
npm create vite@latest my-app -- --template react
```

---

## Step 2: Navigate to the Project Directory

```bash
cd my-app
```

Replace `my-app` with your project name if you chose a different one.

---

## Step 3: Install Dependencies

If dependencies were not installed automatically, run:

```bash
npm install
```

---

## Step 4: Start the Development Server

```bash
npm run dev
```

You should see output similar to:

```bash
VITE v7.x.x ready in 300ms

➜  Local:   http://localhost:5173/
```

Open the displayed URL in your browser to view your React application.

---

## Project Structure

After setup, your project will look similar to:

```text
my-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

---

## Main Working Code

Most of your application development will happen inside the `src` folder:

```text
src/
├── assets/      # Images, icons, and static assets
├── App.jsx      # Main application component
├── main.jsx     # Application entry point
└── index.css    # Global styles
```