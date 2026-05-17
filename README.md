# dbcli-landing

[![Vite](https://img.shields.io/badge/vite-5.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.4-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.0-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

The marketing site for the [**DB Backup CLI**](https://github.com/jircik/DB-Backup-CLI) — a Spring Shell tool that runs production-grade PostgreSQL backups via a 5-step Spring Batch pipeline.

Static single-page site. Dark, terminal-inspired design. No framework, no SSR, no JavaScript bundle beyond a few KB.

> Live at [**dbcli.jircik.dev**](http://dbcli.jircik.dev).

---

## Stack

| | |
|---|---|
| Build tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Deploy target | Static host (Cloudflare Pages) |

---

## Local development

**Requires Node.js 18+**

```bash
npm install
npm run dev
```

Opens `http://localhost:5173` with HMR.

### Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Type-check and build static output to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
dbcli-landing/
├── public/
│   └── favicon.svg              # static assets — copied as-is
├── src/
│   ├── main.ts                  # entry — imports styles + wires up tabs + copy buttons
│   └── styles.css               # Tailwind import + @theme tokens + custom CSS
├── index.html                   # the page itself
├── vite.config.ts               # @tailwindcss/vite plugin
└── tsconfig.json
```

Tailwind v4 has no `tailwind.config.ts` and no `postcss.config.js` — the theme is declared inside `src/styles.css` via the `@theme` directive, and the Vite plugin handles the rest.

---

## How interactivity works

The page is mostly static HTML. One small TypeScript module handles the dynamic bits — see `src/main.ts`.

### Install-method + OS tabs

The Install section has two tab groups: the install **method** (native binary / .jar / Actions / source) and, inside the binary panel, the target **OS** (Linux / Windows). Both groups share the same `activate()` helper driven by `data-*` attributes — no per-tab wiring.

```html
<button data-method-tab="binary" aria-controls="panel-binary">Native binary</button>
<div data-method-panel="binary">…</div>
```

Cross-section nudges (e.g. "On macOS? Use the .jar") use `data-method-tab-link` to switch the active tab and smooth-scroll to `#install`.

### Copy-to-clipboard

Any `.copy-btn` with a `data-copy="<element-id>"` attribute copies that element's text content and flashes **"Copied ✓"** for 1.4s. A visually-hidden `aria-live` region announces the action to screen readers.

```html
<button class="copy-btn" data-copy="cmd-linux">Copy</button>
<pre id="cmd-linux">curl -LO https://github.com/jircik/DB-Backup-CLI/releases/...</pre>
```

---

## Design system

Theme tokens live in `src/styles.css` under `@theme` — Tailwind v4 generates the utility classes from these CSS variables automatically.

| Token | Purpose |
|---|---|
| `bg-ink-{600-950}` | Dark backgrounds, surfaces, borders |
| `text-accent` / `bg-accent` / `bg-accent-soft` | Mint-green accent (CTAs, highlights, glows) |
| `text-cyan2` | Cyan prompt color in terminal mocks |
| `border-line` | Hairline borders across cards and panels |
| `font-sans` → Inter | Body text and headings |
| `font-mono` → JetBrains Mono | Code, terminal output, metadata |

Custom CSS components in `src/styles.css`:

| Class | What it does |
|---|---|
| `.grid-bg` | Radial mint glow + faint 32px grid (hero background) |
| `.term-shadow` | Soft drop shadow + inner ring for terminal windows |
| `.chip` | Bordered pill for tech-stack badges |
| `.tab-active` | Active state for method/OS tabs |
| `.blink` | Hero terminal cursor (respects `prefers-reduced-motion`) |
| `.skip-link` | Visually-hidden "Skip to content" link, visible on focus |

---

## Deploy

### Cloudflare Pages

| Setting | Value |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output | `dist` |
| Node version | `20` (set `NODE_VERSION=20` env var) |

Connect the GitHub repo in **Workers & Pages → Create → Pages → Connect to Git**. Every push to `main` deploys to production; PRs get preview URLs.

### Direct upload

```bash
npm run build
npx wrangler pages deploy dist --project-name=dbcli-landing
```

### Anywhere else

The `dist/` output is fully static — drop it on any host (GitHub Pages, Vercel, Netlify, S3 + CloudFront, ...).

For project-page deploys served from a subpath (e.g. `user.github.io/dbcli-landing/`), add `base: './'` in `vite.config.ts`.

---

## Sections

The page is a single `index.html` divided into these sections:

| Anchor | Content |
|---|---|
| Hero | Tech-stack chips, headline, CTAs, animated terminal preview |
| `#features` | 6-card grid: Spring Batch pipeline, gzip, profiles, JSON logs, job history, Postgres support |
| `#install` | Four install methods (native binary, .jar, GitHub Actions artifact, source) with copy buttons |
| `#quickstart` | 3-step walkthrough: define profile → test connection → run backup |
| CTA | Final download block |
| Footer | Brand · MIT license · GitHub · Issues · Releases |

---

## License

MIT
