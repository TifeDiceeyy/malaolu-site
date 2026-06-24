# CLAUDE.md

Guidance for **Claude Code** working in this repository. Read this fully before coding.
This file replaces the generic scaffold template — every placeholder below is filled with
real project values. It is the single source of truth.

## Project Overview

**Malaolu Site** — the personal portfolio site of **Malaolu Abdulrazak**
(*Abdulrazak Olaide Malaolu*), Creative Director • Art Director • Stylist, and founder of
the fashion label **Suavee Studios**.

**Vision:** "An image-first, editorial portfolio that lets the work speak — a quiet,
gallery-like site where Malaolu's fashion, styling, and art direction lead and the UI
disappears."

**Current State:** Greenfield build. Scaffolding/workflow files exist under `.claude/`.
No application source yet — start at Phase 1 (see **Build Order**).

**Layout reference (structure only):** `byseanbrown.com` — a WordPress/Salient editorial
"scrapbook feed." We reuse its *structure and interactions* (long justified image feed,
off-canvas fullscreen menu, search overlay, ambient-audio toggle, overlay-style About).
We copy **none** of its text, images, or branding.

### Target Users

- **Primary:** fashion/creative industry contacts — brands, collaborators, clients, press
  evaluating Malaolu's work and Suavee.
- **Secondary:** recruiters and prospective partners reaching him for art direction/styling.

**Why this matters:**
- Visual quality and load performance are the product — imagery must look great and load fast.
- The "Work" portfolio (PDF) and the Suavee link are the two key conversion paths.
- Mobile-first: most visitors arrive from Instagram/links on phones.

---

## Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS + CSS variables (design tokens)
- **Routing:** React Router v6
- **State:** React Context (menu / search / audio) — no external store
- **Content:** typed local files in `src/data/` (no CMS in v1)
- **Testing:** Vitest + React Testing Library (component/interaction tests)
- **Deploy:** static host (Vercel / Netlify / Cloudflare Pages)

## Development Commands

```bash
npm install           # install deps
npm run dev           # local dev server
npm run typecheck     # tsc --noEmit  — run before every build
npm run lint          # eslint
npm run test          # vitest
npm run build         # production build
npm run preview       # serve the build locally
```
Ensure `package.json` scripts include `"typecheck": "tsc --noEmit"`.

---

## ⚠️ Read before coding

- This is a small, content-driven SPA — prefer **plain, surgical implementation** over the
  heavyweight `/implement` user-story ceremony for routine UI work. Use the `.claude/`
  workflow only if a task is genuinely multi-step.
- **Pre-flight read** any file before editing it. Re-read this CLAUDE.md before each phase.
- **Typecheck + build must stay green.** Run `npm run typecheck` then `npm run build` after
  each phase; fix errors before moving on.
- Use `TODO(owner):` for missing assets/handles and keep going — never block the build.

---

## Project Structure (create the `src/` tree)

```
Malaolu Site/
├── CLAUDE.md                     # this file
├── .claude/                      # scaffold: settings, commands, skills, project tracking
├── public/
│   ├── assets/Abdulrazak_Portfolio.pdf   # the "Work" PDF (copy from ./assets, underscore name)
│   └── audio/ambient.mp3                 # TODO(owner): background track
└── src/
    ├── main.tsx
    ├── App.tsx                   # Router + UI providers + Layout
    ├── index.css                 # Tailwind directives + :root tokens
    ├── data/
    │   ├── site.ts               # identity, nav, socials, copyright
    │   ├── feed.ts               # FeedBlock[] for the home feed
    │   └── quotes.ts             # rotating one-liners
    ├── context/UIContext.tsx     # menu/search/audio open + mute state
    ├── components/
    │   ├── Layout.tsx  TopBar.tsx  SlideMenu.tsx  SearchOverlay.tsx
    │   ├── AudioToggle.tsx  Footer.tsx  QuoteRotator.tsx
    │   └── feed/ FeedGrid.tsx  LazyImage.tsx
    │       └── blocks/ ImageBlock.tsx  YouTubeBlock.tsx  SpotifyBlock.tsx
    │                   SoundCloudBlock.tsx  QuoteBlock.tsx
    └── pages/ Home.tsx  About.tsx  Post.tsx
```

> **Asset note:** the PDF must be named `Abdulrazak_Portfolio.pdf` (underscore) and live at
> `public/assets/`. If it's currently `assets/Abdulrazak Portfolio.pdf` (space), rename it:
> `mv "assets/Abdulrazak Portfolio.pdf" public/assets/Abdulrazak_Portfolio.pdf`.
> Do **not** parse the PDF — it is a download asset only, not a spec.

---

## Design language & tokens

Minimal, editorial, gallery-first. Near-monochrome, generous whitespace, almost no chrome.
Home is one long **justified/masonry feed** of media blocks with short captions. Motion is
subtle (image fade-in, menu slide); autoplay video is muted + looped; honor
`prefers-reduced-motion`.

`:root` tokens in `index.css` (tune freely; defaults are a dark editorial palette):
```css
:root{
  --bg:#0a0a0a; --fg:#f5f5f5; --muted:#9a9a9a; --line:#1e1e1e; --accent:#f5f5f5;
  --maxw:1400px; --gap:clamp(8px,1.4vw,20px);
  --font-ui:"Inter",system-ui,sans-serif;        /* TODO(owner): confirm faces */
  --font-display:"Inter Tight",var(--font-ui);
}
```

---

## Content data (use exactly)

### `src/data/site.ts`
```ts
export const site = {
  name: "Malaolu Abdulrazak",
  fullName: "Abdulrazak Olaide Malaolu",
  role: "Creative Director • Art Director • Stylist",
  email: "olaideabdulrazak5@gmail.com",
  copyright: "© 2026 Abdulrazak Olaide Malaolu. All Rights Reserved.",
  nav: [
    { label: "Home",   to: "/" },
    { label: "Work",   href: "/assets/Abdulrazak_Portfolio.pdf", external: true },
    { label: "Suavee", href: "https://www.suaveestudios.com/", external: true },
    { label: "About",  to: "/about" },
  ],
  socials: [
    { label: "Email",     href: "mailto:olaideabdulrazak5@gmail.com" },
    { label: "Instagram", href: "" }, // TODO(owner): handle
    { label: "X",         href: "" }, // TODO(owner): handle
    { label: "TikTok",    href: "" }, // TODO(owner): handle
  ],
} as const;
```

### About copy (`pages/About.tsx`)
Heading: **Malaolu Abdulrazak** — *Creative Director • Art Director • Stylist*

Bio (render as 4 paragraphs):

> Abdulrazak Olaide Malaolu is a multidisciplinary creative director whose work spans
> fashion, styling, art direction, and visual storytelling. His creative foundation is
> rooted in craftsmanship: his journey began early through fashion design, embellishment,
> and dressmaking — skills learned from his mother. That early exposure to garment
> construction and detail cultivated a deep appreciation for design and shaped his
> evolving career.
>
> In 2023, while studying in Cyprus, he founded **Suavee**, a contemporary fashion label
> focused on elevated streetwear and minimalist design. Built to merge modern culture with
> refined aesthetics, Suavee became the platform through which he explores fashion,
> storytelling, and creative expression. As Founder and Creative Director, he leads the
> conceptualization and execution of collections, brand campaigns, visual identity, and
> creative strategy — ensuring a cohesive narrative across the brand.
>
> In 2024 he expanded into styling, deepening his interest in the relationship between
> garments, people, environments, and storytelling, and has since overseen the styling and
> creative direction of Suavee's editorials, campaigns, and lookbooks. He also leads
> Suavee's art direction across photography, campaign development, concept creation, mood
> boards, casting, and set design — driven by the belief that strong creative work is built
> through consistency, clarity, and intentional storytelling.
>
> In October 2025, he joined **Fisco**, an e-commerce company, where he serves in an Art
> Direction role — broadening his understanding of brand communication, consumer
> engagement, and visual strategy in a fast-paced commercial environment.

Closing pull-quote (large, `--font-display`):

> "I believe inspiration exists everywhere — from everyday interactions and environments to
> music, architecture, fashion, and human experiences. My process is rooted in observation
> and curiosity, allowing me to discover inspiration in places others may overlook, and to
> translate it into meaningful creative outcomes." — Malaolu Abdulrazak

Layout: bio over a full-bleed portrait/studio image (overlay panel), then the pull-quote,
then the footer + contact line (email · Suavee link).

### `src/data/feed.ts`
```ts
export type FeedBlock =
  | { type:"images"; items:{src:string;alt:string;w:number;h:number}[]; caption?:string; href?:string }
  | { type:"youtube"; id:string; loop?:boolean; caption?:string }
  | { type:"spotify"; playlistId:string; caption?:string }
  | { type:"soundcloud"; trackUrl:string; caption?:string }
  | { type:"quote"; text:string };

export const feed: FeedBlock[] = [
  // TODO(owner): real Suavee imagery (Petalos cards, editorials, beanies, caps, etc.)
  // { type:"images", items:[{src:"/img/petalos.jpg",alt:"Petalos Playing Cards",w:1000,h:1400}],
  //   caption:"Petalos Playing Cards — Suavee Studios, S/S 2025." },
];
```

### `src/data/quotes.ts`
Rotating one-liners (TODO(owner): supply 6–12). Seed with the About pull-quote until provided.

---

## Component behavior

- **TopBar** — sticky, transparent over content. Left wordmark → `/`. Right "Menu" button
  (`aria-expanded`) toggles SlideMenu.
- **SlideMenu** — off-canvas fullscreen panel rendering `site.nav` then `site.socials`.
  External items get `target="_blank" rel="noopener"`. ESC + close button dismiss; trap
  focus; lock body scroll while open.
- **SearchOverlay** — fullscreen input, helper "Type to search or ESC to close". v1 = client
  filter over feed captions. Focus input on open; ESC closes.
- **AudioToggle** — mute/unmute for `/audio/ambient.mp3`, default muted (no autoplay sound),
  persist choice in `sessionStorage`; real `<button>` with `aria-pressed`.
- **FeedGrid + LazyImage** — responsive justified/masonry columns. Every image reserves space
  from `w`/`h` (aspect-ratio box) → **zero layout shift**; fade in on load. An item with
  `href` is clickable.
- **Embeds** — YouTube `autoplay=1&mute=1&loop=1&playlist=<id>` no chrome; Spotify playlist
  iframe; SoundCloud visual player. Lazy-mount near viewport.

---

## Accessibility & performance

- Meaningful `alt` on every image (decorative → `alt=""`).
- Menu / search / audio are keyboard-operable buttons with correct aria state.
- Honor `prefers-reduced-motion`. Responsive images (`srcset`/`sizes`) + WebP/AVIF for real assets.
- Targets: Lighthouse Perf ≥ 90, A11y ≥ 95, CLS < 0.05, LCP < 2.5s.

---

## Build Order (phased) — start here

1. Scaffold Vite+React+TS; add Tailwind + React Router + Vitest; add `typecheck` script; set tokens in `index.css`.
2. `data/site.ts`, `data/quotes.ts`, empty `data/feed.ts`; place `Abdulrazak_Portfolio.pdf` in `public/assets/`.
3. `UIContext` + `Layout` shell: TopBar, SlideMenu, Footer (wire nav/socials/copyright).
4. SearchOverlay + AudioToggle.
5. Home: QuoteRotator + FeedGrid + LazyImage + block components (render from `feed`).
6. About page (bio + pull-quote + overlay layout + contact line).
7. Optional `/work/:slug` detail route (`Post.tsx`).
8. Accessibility + reduced-motion pass; component tests.
9. Responsive QA, `npm run build`, Lighthouse, deploy config.

**Acceptance:** typecheck + build clean; nav works (Work opens the PDF, Suavee opens
external); About shows the real bio + pull-quote; feed lazy-loads with no layout shift;
menu/search/audio fully keyboard-accessible; responsive mobile → desktop.

Run each phase, then `npm run typecheck && npm run build`, summarize before/after, and pause
for approval before the next phase.

---

## Git Workflow

- Branches: `feature/<description>`.
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- One concern per commit.

## Boundaries

- `byseanbrown.com` = structure/interaction reference only; never copy its content/branding.
- All owner content (bio, portfolio PDF, Suavee, quote, email) is the owner's own — use freely.
- `TODO(owner):` = waiting on real assets/handles; never block on them.
