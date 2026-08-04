# OpenSetup 🖥️

<!-- ===================== REPO STATS ===================== -->

![Repo Size](https://img.shields.io/github/repo-size/TonyStark-19/OpenSetup?color=yellow)
![Stars](https://img.shields.io/github/stars/TonyStark-19/OpenSetup?color=blue)
![Last Commit](https://img.shields.io/github/last-commit/TonyStark-19/OpenSetup?color=brightgreen)

<!-- ===================== TECH STACK ===================== -->

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)

<!-- ===================== PROJECT ===================== -->

![Community Platform](https://img.shields.io/badge/Type-Developer_Community-blue)
![Open Source](https://img.shields.io/badge/Open_Source-Friendly-success)
![Responsive](https://img.shields.io/badge/Mobile-Responsive-brightgreen)
![Dark Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-purple)
![Markdown](https://img.shields.io/badge/Markdown-Supported-informational)

---

# 🚀 What is OpenSetup?

**OpenSetup** is a community-driven platform where developers can discover, share, and request complete development environment setup guides.

Whether you're setting up Docker, configuring Linux, installing programming languages, preparing cloud environments, or documenting your own workflow, OpenSetup provides a centralized place to publish and explore high-quality setup guides written entirely in Markdown.

The platform is built with a focus on simplicity, clean UI, community contributions, and an organized approval workflow to ensure high-quality content.

---

# 📸 Preview

> 🌙 Dark Theme

![OpenSetup Dark Theme](/frontend/public/previews/Dark.png)

---

> ☀️ Light Theme

![OpenSetup Light Theme](/frontend/public/previews/Light.png)

---

# 🌐 Live Demo

The project is live and can be viewed here: [OpenSetup](https://open-setup.vercel.app)

---

# ✨ Why OpenSetup?

Setting up a development environment is often one of the biggest hurdles for developers.

Searching through outdated blogs, incomplete documentation, scattered YouTube tutorials, and inconsistent installation steps can make even simple setups frustrating.

OpenSetup aims to solve this by creating a centralized platform where developers can:

- Discover complete development setup guides.
- Share their own workflows with the community.
- Contribute guides written entirely in Markdown.
- Request guides that don't yet exist.
- Learn from verified community-approved content.
- Build a growing library of development resources for everyone.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| Browse Setup Guides | Explore community-created development setup guides with a clean reading experience, Markdown rendering, and syntax-highlighted code blocks. |
| Guide Details | View comprehensive setup guides along with metadata, categories, author information, views, and community engagement. |
| Markdown Support | Create and display guides using Markdown with support for headings, lists, tables, code blocks, and rich formatting. |
| Contribute Guides | Submit your own setup guides through a dedicated contribution workflow with Markdown file uploads and metadata. |
| Request Guides | Request setup guides that are not yet available, helping contributors identify valuable topics for the community. |
| Google OAuth | Sign in securely using your Google account for a seamless authentication experience. |
| Admin Dashboard | Manage community content through dedicated admin pages for reviewing guide submissions and user requests. |
| Guide Categories | Organize setup guides into categories for easier browsing and discovery. |
| Community Engagement | Upvote guides and track view counts to highlight valuable community contributions. |
| Responsive Design | Optimized interface that works seamlessly across desktops, tablets, and mobile devices. |
| Dark & Light Theme | Switch between beautifully designed dark and light themes for a comfortable reading experience. |
| Modern UI & Animations | Clean, responsive interface with smooth transitions and an intuitive user experience. |
---

# 🛠️ Complete Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Building the frontend user interface and application structure |
| TypeScript | Type-safe development across both frontend and backend |
| Tailwind CSS | Utility-first styling and responsive UI development |
| React Router DOM | Client-side routing and protected navigation |
| React Markdown | Rendering Markdown guides into rich HTML content |
| Remark GFM | GitHub Flavored Markdown support (tables, checklists, etc.) |
| React Syntax Highlighter | Syntax highlighting for code blocks within guides |
| React Hot Toast | Elegant toast notifications and user feedback |
| Lucide React | Modern icon library used throughout the application |
| React Icons | Additional icon support for UI customization |
| Vite | Frontend development server and production build tooling |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API development and routing |
| MongoDB Atlas | Cloud-hosted NoSQL database for application data |
| Mongoose | Object Data Modeling (ODM) for MongoDB |
| Passport.js | Authentication middleware |
| Passport Google OAuth 2.0 | Google OAuth authentication integration |
| JWT (jsonwebtoken) | Secure user authentication and authorization |
| Bcrypt | Password hashing and credential security |
| Cookie Session | Session management for OAuth authentication |
| Nodemailer | Sending transactional emails and notifications |
| AWS Lambda | Serverless functions for generating secure S3 upload URLs |
| Amazon S3 | Storage for contributed Markdown guide files |
| Render | Backend deployment and hosting |
| Vercel | Frontend deployment and hosting |
| Git & GitHub | Version control and source code management |

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/TonyStark-19/OpenSetup.git

cd OpenSetup
```

---

## 2️⃣ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## 3️⃣ Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure all required environment variables.

Start the backend server:

```bash
npx tsx index.ts
```

The backend API will run on the configured port (default: **5000**).

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend API | Render |
| File Upload Service | AWS Lambda |
| Markdown Storage | Amazon S3 |
| Database | MongoDB Atlas |

---

## 🤝 Contributing

Contributions are always welcome!

Whether you're fixing bugs, improving the platform, enhancing documentation, submitting new features, or sharing ideas, every contribution helps make **OpenSetup** a better resource for the developer community.

Please read our **[Contributing Guidelines](CONTRIBUTING.md)** before getting started. It covers the development workflow, coding standards, issue reporting, and pull request process.

| Action | Description |
|--------|-------------|
| 📖 Read the Contributing Guide | Follow the guidelines in **[CONTRIBUTING.md](CONTRIBUTING.md)** before making contributions. |
| ⭐ Star the Repository | Support the project by starring the repository. |
| 🍴 Fork the Repository | Create your own copy to start building improvements. |
| 🐛 Report an Issue | Found a bug? Open an issue with detailed reproduction steps. |
| 💡 Suggest a Feature | Share ideas or request new features to improve OpenSetup. |
| 🔧 Submit a Pull Request | Contribute bug fixes, new features, or improvements through pull requests. |
| 🤝 Connect With Me | Explore my portfolio and get in touch [here](https://aditya-devfolio-one.vercel.app). |

---

---

# 💡 Inspiration

OpenSetup was born from a common challenge every developer faces—setting up development environments.

Whether you're configuring Docker, installing programming languages, preparing cloud tooling, or setting up Linux, valuable setup information is often scattered across blogs, videos, and outdated documentation.

The goal of OpenSetup is to bring these resources together into a single community-driven platform where developers can discover, contribute, and share reliable setup guides in a structured and searchable format.

---

# 🙌 Acknowledgements

A huge thank you to:

- The open-source community for continuously sharing knowledge.
- Every contributor who helps improve OpenSetup.
- The creators and maintainers of the amazing technologies that power this project.
- Every developer who believes in learning through sharing knowledge.

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and contribute while respecting the license terms.

---

# 🙌 Thanks for Visiting

Thank you for checking out **OpenSetup**!

I hope this platform helps make your development setup journey easier, whether you're just getting started or you're an experienced developer looking to share your knowledge with the community.

If you found this project useful, consider giving it a ⭐ on GitHub—it helps support the project and encourages future development.

Happy Coding! 🚀
