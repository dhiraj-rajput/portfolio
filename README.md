# Gustavo Gantois — Portfolio (React + TypeScript)

A component-based rebuild of the Figma design ("Website - Potfolio - V2"),
converted from the design's absolute-positioned layout into a responsive,
reusable component structure.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/        one folder per component (Component.tsx + Component.module.css)
    Navbar/           logo, nav links, WhatsApp CTA
    Hero/             headline, description, CTA buttons
    TechStack/        "Tecnologias que utilizo" icon row
    TechIcon/         single reusable tool badge
    StatCard/         reusable "+N metric" card (used 3x)
    ContactCard/      "Vamos desenvolver juntos" photo + CTA panel
    StatsSection/      combines StatCard x3 + ContactCard
    ProjectCard/      reusable case-study card (used 6x, data-driven)
    ProjectsSection/  "Projetos" heading + ProjectCard grid
    TestimonialCard/  reusable quote card (used 3x, data-driven)
    TestimonialsSection/
    FAQItem/          reusable accordion row (used 4x)
    FAQSection/
    CTASection/       "Vamos conversar? / ENTRE EM CONTATO" banner
    Footer/
    Button/           shared primary/secondary/outline button
    icons/            hand-drawn inline SVG icons (arrow, plus, link, quote, etc.)
  data/               typed content arrays (projects, testimonials, faqs, techStack, navLinks, stats)
  types.ts            shared TypeScript interfaces for the data above
```

Every repeated design element (project cards, testimonial cards, FAQ rows,
stat cards, tech badges) is a single reusable component driven by a typed
array in `src/data/`, so adding a 7th project or a 5th testimonial is a
one-line data change — no JSX duplication.

## About the images and icons

This build was generated in an environment that could not reach Figma's
asset-hosting domain, so it ships with **placeholder visuals** instead of
the original photos and brand logos:

- Project screenshots and the profile photo render as labeled gradient
  placeholders (see `ProjectCard`, `ContactCard`).
- Tool logos (HTML/CSS/JS/TS/React/VS Code/Figma/Git) render as a generic
  glyph + text label (see `TechIcon`).
- Testimonial avatars fall back to initials (see `TestimonialCard`).
- Small interface icons (arrow, plus/close, link, code, quote) were
  hand-recreated as inline SVGs in `src/components/icons/` rather than
  copied from the file, since exact icon assets weren't retrievable either.

**To swap in the real assets:**

1. Export the images/logos from Figma (or re-run the Figma MCP tools from an
   environment with network access to `figma.com`).
2. Drop them into `src/assets/images/` (a `tech/` subfolder is suggested for
   the tool logos).
3. Point to them from `src/data/projects.ts`, `src/data/testimonials.ts`,
   and `src/data/techStack.ts` (each `image`/`icon`/`authorPhoto` field is a
   plain string path — imported files or `/public` paths both work).
4. For the profile photo in `ContactCard.tsx`, replace the placeholder
   `<div className={styles.photo} />` with an `<img>`.

No other code changes are needed — every component already renders the
image when a path is supplied and falls back to its placeholder when it's
empty.

## Design tokens

Colors and fonts (Syne + Plus Jakarta Sans via Google Fonts) live in
`src/index.css` as CSS custom properties, matching the palette exported
from the Figma file:

| Token | Hex |
|---|---|
| `--color-orange-500` | `#FF6600` |
| `--color-orange-50` | `#FFF0E6` |
| `--color-grey-100` | `#C1C1C1` |
| `--color-grey-200` | `#A3A3A3` |
| `--color-grey-300` | `#7A7A7A` |
| `--color-grey-400` | `#606060` |
| `--color-black-900` | `#000000` |
| `--color-black-400` | `#333333` |
| `--color-black-200` | `#8E8E8E` |
| `--color-black-100` | `#B3B3B3` |
| `--color-black-50` | `#E7E7E7` |
