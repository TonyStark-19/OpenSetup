## Prerequisites

Before starting, make sure **Node.js** and **npm** are installed on your machine.

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

## Step 1: Create a New Next.js Project

Run the following command:

```bash
npx create-next-app@latest
```

You will be prompted with a few options:

1. Enter your project name.
2. Choose whether to use **TypeScript**.
3. Choose whether to use **ESLint**.
4. Choose whether to use **Tailwind CSS**.
5. Choose whether to use a `src/` directory.
6. Choose whether to use **App Router**.
7. Choose whether to customize the import alias.

For a simple starter project, you can use:

```text
Would you like to use TypeScript? → Yes
Would you like to use ESLint? → Yes
Would you like to use Tailwind CSS? → Yes
Would you like your code inside a `src/` directory? → Yes
Would you like to use App Router? → Yes
Would you like to customize the import alias? → No
```

Alternatively, you can create the project directly with a single command:

```bash
npx create-next-app@latest my-app
```

Replace `my-app` with your preferred project name.

---

## Step 2: Navigate to the Project Directory

```bash
cd my-app
```

Replace `my-app` with your project name if you chose a different one.

---

## Step 3: Install Dependencies

If dependencies were not installed automatically during project creation, run:

```bash
npm install
```

---

## Step 4: Start the Development Server

Run:

```bash
npm run dev
```

You should see output similar to:

```bash
▲ Next.js 15.x.x
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 1.5s
```

Open the displayed URL in your browser:

```text
http://localhost:3000
```

You should now see your Next.js application.

---

## Project Structure

After setup, your project will look similar to:

```text
my-app/
├── public/
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

> The exact files may vary depending on the options you selected while creating the project.

---

## Main Working Code

With the **App Router**, most of your application development will happen inside the `src/app` folder:

```text
src/
└── app/
    ├── layout.tsx       # Root layout of the application
    ├── page.tsx         # Home page
    └── globals.css      # Global styles
```

### `page.tsx`

The `page.tsx` file represents a page in your application.

For example:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Hello, Next.js!</h1>
    </main>
  );
}
```

### `layout.tsx`

The `layout.tsx` file defines the shared layout around your pages.

It is commonly used for:

* Global page structure
* Navigation bars
* Footers
* Metadata
* Global providers

Example:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `globals.css`

The `globals.css` file contains styles that can be applied throughout your application.

```css
@import "tailwindcss";
```

If you selected Tailwind CSS during setup, you can use Tailwind utility classes directly inside your components.

---

## Creating Additional Pages

With the Next.js App Router, you can create routes by adding folders inside the `app` directory.

For example:

```text
src/
└── app/
    ├── page.tsx
    ├── about/
    │   └── page.tsx
    └── contact/
        └── page.tsx
```

This creates the following routes:

```text
/          → Home page
/about     → About page
/contact   → Contact page
```

For example, `src/app/about/page.tsx`:

```tsx
export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the About page.</p>
    </main>
  );
}
```

---

## Useful Commands

### Start development server

```bash
npm run dev
```

### Build the application

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Run ESLint

```bash
npm run lint
```

---

## You're Ready!

Your Next.js starter project is now set up.

You can start building your application by working primarily inside:

```text
src/app/
```

From here, you can add pages, components, layouts, API routes, authentication, databases, and other features as your project grows.