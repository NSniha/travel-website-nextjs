<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=34&duration=3000&pause=1000&color=0EA5E9&center=true&vCenter=true&width=700&lines=Wanderly+%E2%9C%88%EF%B8%8F;Plan+Less.+Explore+More.;A+Modern+Travel+Website+Built+with+Next.js" alt="Typing SVG" />

<p>
A fast, fully responsive travel website that helps visitors discover destinations,
browse curated trip packages and start planning their next getaway, all in a clean,
modern and mobile-first interface.
</p>

<p>
  <a href="https://travel-website-nine-iota-14.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-Visit_Site-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/NSniha/travel-website-nextjs"><img src="https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Responsive-Mobile_First-10B981?style=flat-square" alt="Responsive" />
</p>

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Preview](#-preview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Design Decisions](#-design-decisions)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🌍 Overview

**Wanderly** is a modern travel website built to turn browsing into booking inspiration.
Visitors can explore popular destinations, discover curated travel packages, read what
other travellers say and jump straight into planning, without friction on any device.

The project was built as a **design-to-code** exercise: a polished travel-brand UI translated
into clean, reusable Next.js components with a strong focus on performance, accessibility
and responsive behaviour.

> **Why this project?** Travel sites live or die by first impressions. The goal was to
> combine striking visuals with a lightweight, fast-loading codebase so the experience feels
> as smooth as the trip itself.

---

## 🖼️ Preview

<div align="center">

<img width="1280" height="800" alt="travel-preview" src="https://github.com/user-attachments/assets/4fb48671-b3f6-498d-8dcc-d33143e0a767" />


<br />

**[👉 Open the live website](https://travel-website-nine-iota-14.vercel.app)**

</div>

---

## ✨ Key Features

| | Feature | Description |
|---|---|---|
| 🏝️ | **Destination Showcase** | Visually rich cards highlighting popular places with imagery and quick details. |
| 🧳 | **Curated Trip Packages** | Clearly presented packages so visitors can compare options at a glance. |
| 🔎 | **Intuitive Navigation** | Sticky header and smooth in-page navigation for effortless browsing. |
| 💬 | **Traveller Testimonials** | Social proof section that builds trust with real-feeling reviews. |
| 📬 | **Call-to-Action Sections** | Strategically placed CTAs that guide visitors toward planning a trip. |
| 📱 | **Fully Responsive** | Pixel-tuned layouts for mobile, tablet and desktop screens. |
| ⚡ | **Optimised Performance** | Next.js image and font optimisation for fast loads and smooth scrolling. |
| 🎨 | **Clean, Modern UI** | Consistent spacing, typography and colour system built with Tailwind CSS. |

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,js,tailwind,css,html,git,github,vercel,vscode&theme=dark" alt="Tech stack icons" />

</div>

| Category | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org) (App Router) |
| **UI Library** | [React](https://react.dev) |
| **Language** | JavaScript (ES6+) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) via PostCSS |
| **Linting & Formatting** | [Oxlint](https://oxc.rs) and Oxfmt |
| **Version Control** | Git and GitHub |
| **Hosting** | [Vercel](https://vercel.com) |

---

## 📂 Project Structure

```bash
travel-website-nextjs/
├── public/                # Static assets (images, icons, favicon)
├── src/
│   ├── app/               # App Router: layout, pages, global styles
│   └── components/        # Reusable UI sections and components
├── .oxlintrc.json         # Oxlint configuration
├── .oxfmtrc.json          # Oxfmt (formatter) configuration
├── jsconfig.json          # Path aliases and editor settings
├── next.config.mjs        # Next.js configuration
├── postcss.config.mjs     # PostCSS / Tailwind configuration
└── package.json           # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm**, **yarn**, **pnpm** or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NSniha/travel-website-nextjs.git

# 2. Move into the project folder
cd travel-website-nextjs

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Now open **[http://localhost:3000](http://localhost:3000)** in your browser and you are good to go. 🎉

The page hot-reloads as you edit files inside `src/`.

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimised production build |
| `npm run start` | Runs the production build locally |

---

## ☁️ Deployment

The project is deployed on **Vercel** with automatic deployments on every push to `main`.

To deploy your own copy:

1. Fork or clone this repository.
2. Import it into [Vercel](https://vercel.com/new).
3. Click **Deploy**. No extra configuration is required.

**Live URL:** https://travel-website-nine-iota-14.vercel.app

---

## 🧠 Design Decisions

- **Component-based architecture:** each section is an isolated, reusable component, which keeps the codebase easy to read, extend and maintain.
- **Mobile-first styling:** layouts are designed for small screens first, then enhanced for larger breakpoints.
- **Utility-first CSS:** Tailwind keeps styles consistent and avoids bloated custom stylesheets.
- **Performance by default:** Next.js image and font optimisation keep the site quick without extra tooling.
- **Fast tooling:** Oxlint and Oxfmt keep linting and formatting quick and consistent.

---

## 🗺️ Roadmap

- [ ] Destination detail pages
- [ ] Search and filter for packages
- [ ] Booking / inquiry form with validation
- [ ] Dark mode
- [ ] Multi-language support

---

## 👩‍💻 Author

<div align="center">

**Nobonita Saha Niha**
Front-End Developer | Design-to-Code Specialist | Creative Coder

<a href="https://www.linkedin.com/in/nobonita-saha-niha-04b501214/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://github.com/NSniha"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>

<br /><br />

⭐ If you like this project, consider giving it a star. It really motivates me!

</div>
