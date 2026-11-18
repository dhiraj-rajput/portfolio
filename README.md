# Dhiraj Rajput - Portfolio

Personal portfolio of **Dhiraj Rajput**, Cybersecurity & Full-Stack Engineer and published researcher from Pune, India.

🌐 **Live:** [djphantom.tech](https://djphantom.tech/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | CSS Modules + CSS Custom Properties (Design Tokens) |
| Package manager | Bun |
| Deployment | GitHub Pages via GitHub Actions |
| Linting | oxlint |

---

## Project Structure

```
src/
├── components/       # Component folders with colocated CSS Modules
│   ├── Navbar/
│   ├── Hero/
│   ├── TechStack/
│   ├── AboutSection/
│   ├── ExperienceSection/
│   ├── TechExpertiseSection/
│   ├── ProjectsSection/
│   ├── ResearchSection/
│   ├── LeadershipSection/
│   ├── BeyondSection/
│   ├── ContactSection/
│   ├── MeteorShower/
│   ├── Footer/
│   ├── ScrollToTop/
│   ├── ThemeToggle/
│   └── ui/             # Shared primitives (Marquee)
├── data/             # All content as typed TS data files
│   ├── about.ts
│   ├── experience.ts
│   ├── hobbies.ts
│   ├── navLinks.ts
│   ├── projects.ts
│   └── research.ts
├── utils/            # Utilities (flutterScroll, assets)
└── types.ts          # Centralized TypeScript interfaces
```

---

## Getting Started

```bash
# Install dependencies (requires Bun)
bun install

# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint
bun run lint
```

> **Note:** This project uses [Bun](https://bun.sh) as the package manager (`bun.lock` is authoritative). Avoid `npm install` to prevent lockfile conflicts.

---

## Key Features

- 🌙 **Dark / Light Theme**: Zero flash-of-unstyled-theme on load (inline theme initialization script)
- 🎯 **Smooth Physics Scrolling**: Custom bezier easing emulating Flutter's `Curves.fastOutSlowIn`
- ♿ **Accessible**: WCAG 2.3.3 reduced-motion support, semantic HTML landmarks, ARIA labeling
- 📱 **Responsive**: Mobile-first layout with custom CSS modules
- 🚀 **Performance**: Preconnected typography, lazy-loaded media, zero unnecessary heavy libraries
- 🔍 **SEO**: Complete Open Graph, Twitter Cards, JSON-LD (`ProfilePage`, `Person`, `Article`, `SoftwareSourceCode`), `robots.txt`, and XML sitemap

---

## License

© 2026 Dhiraj Rajput. All rights reserved.

## License

This repository is **dual-licensed**:

- **Code & template structure: MIT.** Fork it and use it as the starting point for your own portfolio.
- **Personal content: All Rights Reserved.** My text, photos, logo, resume, video and identity (`src/data/`, `public/`, `index.html` copy) may not be copied or reused. Replace them with your own.

See [LICENSE](./LICENSE) for the full terms.

### Using it as a template

```bash
bun install
bun run dev      # local dev server
bun run build    # prerendered production build in dist/
```

Edit `src/data/*` for content, swap `public/logo.svg`, `public/profile.webp`, `public/og.png`, update `index.html` meta/JSON-LD, `public/CNAME`, `robots.txt` and `sitemap.xml` with your own domain.
