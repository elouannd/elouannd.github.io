# Elouann's Personal Website

Modern glassmorphism portfolio built with Vite + React, with an "unlinked pages" system so you can drop raw HTML files that are accessible without being linked in the navigation.

## Tech Stack

- Build tool: Vite 7.1 (migrated from Create React App)
- Framework: React 19
- Router: React Router v7
- Styling: CSS with glassmorphism & design tokens
- Testing: React Testing Library & Jest (configuration needs updating for Vite compatibility)
- Deployment: GitHub Pages (gh-pages branch via `gh-pages` npm package)
- Custom domain: `elouann.me` (via `public/CNAME`)

## Local Development

Prerequisites:
- Node.js v16+ and npm

Install and run:

```bash
git clone https://github.com/elouannd/elouannd.github.io.git
cd elouannd.github.io
npm install
npm run dev
```

Vite dev server: http://localhost:5173

### Development vs Production
- **Development**: Navigation links (`/plugins`, `/apps`, `/autre`, `/contact`) are visible only in dev mode
- **Production**: Only the homepage (`/`) and unlinked pages (`/u/:slug`) are accessible

## Scripts

- `npm run dev` - Start Vite dev server (development)
- `npm start` - Alternative development server (using react-scripts)
- `npm run build` - Production build to `dist/` (using Vite)
- `npm run preview` - Preview the prod build locally
- `npm test` - Run tests with Jest (*Note: Currently has compatibility issues with Vite's import.meta*)
- `npm run deploy` - Build and publish `dist/` to `gh-pages` branch

Notes:
- Postbuild script copies `dist/index.html` to `dist/404.html` for SPA route-refresh on GitHub Pages
- `public/CNAME` is included so GitHub Pages serves the site at `https://elouann.me` in addition to `https://elouannd.github.io`
- The project is transitioning from Create React App to Vite, some test configurations may need updates

## Project Structure

```
elouannd.github.io/
├─ public/
│  ├─ CNAME                 # custom domain
│  └─ unlinked/             # standalone HTML pages (see below)
├─ src/
│  ├─ components/
│  │  ├─ NotFound.jsx
│  │  └─ UnlinkedPage.jsx   # renders /u/:slug using DOMPurify
│  ├─ App.css
│  ├─ App.jsx               # routes and layout
│  ├─ index.css             # global styles + design tokens
│  └─ main.jsx              # React entry
├─ index.html               # Vite HTML entry
└─ vite.config.js
```

## Unlinked Pages System

You can add pages that are not linked in the navigation and are easy to share.

Create a page:
- Add a file at `public/unlinked/your-slug.html`

Access it in two ways:
- SPA route (sanitized via DOMPurify): `/u/your-slug`
- Static file directly: `/unlinked/your-slug.html`

Example included:
- `public/unlinked/example.html` &rarr; `/u/example`

The SPA renderer is implemented in `src/components/UnlinkedPage.jsx` and uses DOMPurify with a safe HTML profile before injecting content.

## Routes

- `/` - Homepage (glassmorphism)
- `/u/:slug` - Unlinked page renderer
- Dev-only helpers (visible when `import.meta.env.DEV`):
  - `/plugins`, `/apps`, `/autre`, `/contact`
- Catch-all `*` &rarr; NotFound

## Design System (Glassmorphism)

Defined via CSS custom properties in `src/index.css`:
- Gradient ambient background using `--accent-1` / `--accent-2`
- Glass cards: `--glass-bg`, `--glass-border`, `--blur`, `--radius`
- Dark-first with light-mode adjustments via `prefers-color-scheme: light`
- Inter font is loaded in `index.html` for clean, modern type

Example tokens (see file for full list):

```css
:root {
  --bg-1: #0b0b0f;
  --bg-2: #0f1116;
  --accent-1: #5b7cff;
  --accent-2: #ff6ec7;

  --text: #e8eaed;
  --muted: #aeb4be;

  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);
  --blur: 12px;
  --radius: 14px;
}
```

## Deployment (GitHub Pages)

The site is published from the `gh-pages` branch using the `gh-pages` npm package.

Deploy:

```bash
npm run deploy
```

What it does:
1) `npm run build` creates `dist/`
2) Copies `dist/index.html` to `dist/404.html` (SPA fallback)
3) Copies `public/CNAME` to `dist/CNAME` if present
4) Publishes `dist` to the `gh-pages` branch

Make sure your repository settings are:
- Pages Source: `gh-pages` branch
- Custom domain: `elouann.me`

Live URLs (after Pages updates/DNS propagation):
- https://elouannd.github.io
- https://elouann.me

## Contributing Workflow

1. Create a branch from `main`
2. Implement changes, verify with `npm run dev`
3. Build and preview: `npm run build && npm run preview`
4. Commit + push and open a PR to `main`
5. After merge, run `npm run deploy` (or use Actions if you add CI)

## Known Issues

- Jest tests currently fail due to `import.meta` compatibility issues between react-scripts and Vite
- The project is in transition from Create React App to Vite, some configurations may need updates
- Consider migrating to Vitest for better Vite integration

## License

Private repository — all rights reserved.
