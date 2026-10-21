<div align="center">

# Waylume Travel

### A modern, responsive travel website built with Next.js 16, React 19 and Tailwind CSS 4

<p>
  <a href="https://travel-website-nine-iota-14.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-Visit_Website-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/NSniha/travel-website-nextjs"><img src="https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" /></a>
</p>

<img src="https://skillicons.dev/icons?i=nextjs,react,js,tailwind,css,html,git,github,vercel,vscode&theme=dark" alt="Technologies used" />

</div>

---

## Preview
<img width="1280" height="800" alt="travel-preview" src="https://github.com/user-attachments/assets/e70842af-f0b5-4b37-a626-669970c13dd8" />


---

## Overview

**Waylume** is a front-end travel website designed to inspire visitors and help them
explore destinations and trip packages through a clean, mobile-first interface.
It is built on the latest **Next.js 16** and **React 19**, styled with
**Tailwind CSS 4**, and deployed on **Vercel**.

The goal of the project is to show how a polished travel-brand design can be turned
into a fast, accessible and maintainable codebase using modern tooling.

**Live website:** [travel-website-nine-iota-14.vercel.app](https://travel-website-nine-iota-14.vercel.app)

---

## Key Features

| Feature | Description |
|---|---|
| **Modern App Architecture** | Built with Next.js 16 and React 19 for fast rendering and a smooth user experience. |
| **Fully Responsive Layout** | Mobile-first design styled with Tailwind CSS 4 that adapts to phones, tablets and desktops. |
| **Light and Dark Theme** | Theme switching powered by `@wrksz/themes`, so visitors can browse in their preferred mode. |
| **Country Flag Icons** | Crisp, scalable country flags through the `flag-icons` library. |
| **Rich Icon Set** | Consistent, lightweight icons from `react-icons`. |
| **Fast Developer Tooling** | Linting with Oxlint and formatting with Oxfmt for quick, consistent code quality. |
| **Production Ready** | Optimised production build and hosting on Vercel. |

---

## Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,js,tailwind,css,html,git,github,vercel,vscode&theme=dark" alt="Technologies used" />

</div>

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) |
| **UI Library** | [React 19](https://react.dev) |
| **Language** | JavaScript (ES6+) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) with PostCSS and Turbopack integration |
| **Theming** | [@wrksz/themes](https://www.npmjs.com/package/@wrksz/themes) |
| **Icons** | [react-icons](https://react-icons.github.io/react-icons/) and [flag-icons](https://flagicons.lipis.dev) |
| **Linting** | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |
| **Formatting** | [Oxfmt](https://oxc.rs) |
| **Version Control** | Git and GitHub |
| **Hosting** | [Vercel](https://vercel.com) |

---

## Dependencies

**Runtime**

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.4.1 | React framework (routing, rendering, optimisation) |
| `react` / `react-dom` | 19.3.0 | UI library |
| `@wrksz/themes` | ^2.0.3 | Light and dark theme management |
| `react-icons` | ^5.7.0 | Icon components |
| `flag-icons` | ^7.6.0 | Country flag icons |

**Development**

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4.3.3 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4.3.3 | Tailwind PostCSS plugin |
| `@tailwindcss/turbopack` | ^4 | Tailwind support for Turbopack |
| `postcss` | ^8.5.30 | CSS processing |
| `oxlint` | ^1.88.0 | Fast JavaScript linter |
| `oxfmt` | ^0.73.0 | Fast code formatter |

---

## Project Structure

```bash
travel-website-nextjs/
├── public/                # Static assets (images, icons, favicon)
├── src/                   # Application source code (pages, components, styles)
├── .gitignore             # Files and folders ignored by Git
├── .oxfmtrc.json          # Oxfmt formatter configuration
├── .oxlintrc.json         # Oxlint linter configuration
├── jsconfig.json          # JavaScript project and path alias settings
├── next.config.mjs        # Next.js configuration
├── postcss.config.mjs     # PostCSS and Tailwind CSS configuration
├── package.json           # Dependencies and npm scripts
└── package-lock.json      # Locked dependency versions
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.9 or later (required by Next.js 16)
- **npm** (or yarn, pnpm, bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NSniha/travel-website-nextjs.git

# 2. Move into the project directory
cd travel-website-nextjs

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
The page reloads automatically as you edit files inside `src/`.

### Production build

```bash
npm run build
npm run start
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the `src` directory with Oxlint |
| `npm run lint:fix` | Lint and automatically fix issues |
| `npm run format` | Format the codebase with Oxfmt |
| `npm run format:check` | Check formatting without changing files |

---

## Code Quality

This project uses the Oxc toolchain to keep the codebase clean and consistent:

```bash
npm run lint          # find problems
npm run lint:fix      # fix what can be fixed automatically
npm run format        # format all files
npm run format:check  # verify formatting (useful in CI)
```

Rules are configured in `.oxlintrc.json` and `.oxfmtrc.json`.

---

## Deployment

The website is hosted on **Vercel**:
[travel-website-nine-iota-14.vercel.app](https://travel-website-nine-iota-14.vercel.app)

To deploy your own copy:

1. Fork or clone this repository.
2. Import the project on [Vercel](https://vercel.com/new).
3. Click **Deploy**. Vercel detects Next.js automatically, so no extra configuration is needed.

---

## Design Decisions

- **Mobile-first, utility-first styling:** Tailwind CSS keeps spacing, typography and colours consistent and avoids large custom stylesheets.
- **Theme support from the start:** a dedicated theme provider handles light and dark modes instead of ad-hoc CSS overrides.
- **Lightweight assets:** icon and flag libraries are used instead of heavy image files, which keeps pages fast.
- **Modern, fast tooling:** Oxlint and Oxfmt give near-instant feedback while developing.
- **Current framework versions:** Next.js 16 and React 19 keep the project aligned with the latest platform features.

---

## Roadmap

- [ ] Destination detail pages
- [ ] Search and filtering for trip packages
- [ ] Booking or enquiry form with validation
- [ ] Multi-language support
- [ ] Accessibility audit and Lighthouse performance tuning

---

## Contributing

Suggestions and improvements are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please run `npm run lint` and `npm run format:check` before submitting.

---

## Author

<div align="center">

**Nobonita Saha Niha**

<a href="https://www.linkedin.com/in/nobonita-saha-niha-04b501214/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://github.com/NSniha"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>

<br />
If you found this project useful, consider giving it a star.
</div>
