## Prerequisites

Before starting, make sure you already have a React project created using Vite.

If you don't have one, you can create it using:

```bash
npm create vite@latest my-app -- --template react-ts
```

Then navigate into the project:

```bash
cd my-app
```

---

## Step 1: Install React Router DOM

Install `react-router-dom` using npm:

```bash
npm install react-router-dom
```

Once installed, you can start setting up routing in your application.

---

## Step 2: Import BrowserRouter in `main.tsx`

Open:

```text
src/main.tsx
```

Import `BrowserRouter` from `react-router-dom`:

```tsx
import { BrowserRouter } from "react-router-dom";
```

Then wrap your `<App />` component with `<BrowserRouter>`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

`BrowserRouter` enables client-side routing throughout your React application.

---

## Step 3: Set Up Routes in `App.tsx`

Open:

```text
src/App.tsx
```

Import `Routes` and `Route`:

```tsx
import { Routes, Route } from "react-router-dom";
```

Then define your application routes:

```tsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
  );
}

export default App;
```

Your routes will now be:

```text
/          → Home
/about     → About
/contact   → Contact
```

---

## Step 4: Create Page Components

Instead of writing the page content directly inside the `Route`, you can create separate components for each page.

A simple project structure could look like:

```text
src/
├── components/
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## Step 5: Use Page Components in `App.tsx`

Import your page components and use them inside the routes:

```tsx
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
```

---

## Step 6: Add Navigation

To navigate between routes without reloading the page, use the `Link` component from `react-router-dom`.

Create a navigation component:

```text
src/
└── components/
    └── Navbar.tsx
```

### `Navbar.tsx`

```tsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
```

Then add the navbar to `App.tsx`:

```tsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
```

Now clicking a navigation link changes the URL and renders the corresponding page without a full browser reload.

---

## Final Project Structure

After completing the setup, your project can look like:

```text
my-app/
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Routing Flow

The basic React Router setup follows this structure:

```text
main.tsx
    │
    ▼
BrowserRouter
    │
    ▼
   App.tsx
    │
    ▼
  Routes
    │
    ├── /          → Home
    ├── /about     → About
    └── /contact   → Contact
```

### The important imports

**`main.tsx`**

```tsx
import { BrowserRouter } from "react-router-dom";
```

**`App.tsx`**

```tsx
import { Routes, Route } from "react-router-dom";
```

**Navigation components**

```tsx
import { Link } from "react-router-dom";
```

---

## Useful React Router DOM Components

| Component       | Purpose                                       |
| --------------- | --------------------------------------------- |
| `BrowserRouter` | Enables routing in the application            |
| `Routes`        | Container for your route definitions          |
| `Route`         | Defines an individual route                   |
| `Link`          | Navigates between routes without page reload  |
| `NavLink`       | Like `Link`, but provides active-link styling |
| `Navigate`      | Redirects users to another route              |
| `Outlet`        | Renders nested child routes                   |

---

## You're Ready!

React Router DOM is now configured in your React application.

The basic pattern to remember is:

```text
BrowserRouter
      ↓
    Routes
      ↓
    Route
      ↓
   Component
```

You can now build additional routes and expand your application with nested routes, dynamic routes, protected routes, layouts, and navigation.