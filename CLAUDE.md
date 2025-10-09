# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern glassmorphism portfolio built with Vite + React 19. Features a unique "unlinked pages" system that allows raw HTML files to be accessible via clean URLs without appearing in navigation.

**Tech Stack:**
- Build: Vite 7
- Framework: React 19 + React Router v7
- Styling: CSS with design tokens (glassmorphism aesthetic)
- Deployment: GitHub Pages via `gh-pages` branch
- Custom domain: `elouann.me` (configured via `public/CNAME`)

## Essential Commands

### Development
```bash
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview prod build locally
npm test             # Run react-scripts test suite
```

### Deployment
```bash
npm run deploy       # Build and publish dist/ to gh-pages branch
```

The `postbuild` script automatically:
- Copies `dist/index.html` to `dist/404.html` (SPA fallback for GitHub Pages)
- Copies `public/CNAME` to `dist/CNAME` for custom domain

**Note:** The `npm start` command uses legacy react-scripts, but `npm run dev` (Vite) is the recommended dev server.

## Architecture

### Routing Strategy

The app uses React Router with a hybrid routing approach defined in `src/App.jsx`:

1. **Public routes** (production):
   - `/` - Homepage (glassmorphism landing)
   - `/u/:slug` - Unlinked page renderer
   - `*` - 404 NotFound

2. **Dev-only routes** (visible when `import.meta.env.DEV`):
   - `/plugins`, `/apps`, `/autre`, `/contact`
   - These routes are conditionally rendered and won't be included in production builds

### Unlinked Pages System

The core feature that differentiates this site. Allows HTML files to be served without navigation links.

**How it works:**
1. Place HTML file at `public/unlinked/your-slug.html`
2. Access via two methods:
   - SPA route: `/u/your-slug` (sanitized by `UnlinkedPage.jsx`)
   - Static file: `/unlinked/your-slug.html` (direct browser fetch)

**Implementation details** (`src/components/UnlinkedPage.jsx`):
- Fetches from `/unlinked/${slug}.html` using the slug from React Router params
- Sanitizes HTML with **DOMPurify** using `{ USE_PROFILES: { html: true } }` config
- Handles loading, 404, and error states
- Includes cleanup with cancellation token to prevent race conditions
- Uses `dangerouslySetInnerHTML` only after sanitization

**Security:** All unlinked page HTML is sanitized through DOMPurify before rendering. This protects against XSS while allowing rich HTML content.

### Design System (Glassmorphism)

Defined via CSS custom properties in `src/index.css`:

**Key tokens:**
- `--glass-bg`, `--glass-border`, `--glass-shadow` - Glass card styles
- `--blur`, `--radius` - Visual effects
- `--accent-1` (#5b7cff), `--accent-2` (#ff6ec7) - Gradient accents
- `--bg-1`, `--bg-2` - Background layers
- `--text`, `--muted` - Typography colors

**Color scheme:**
- Dark-first design with automatic light mode via `@media (prefers-color-scheme: light)`
- Ambient gradient background using `color-mix(in oklab, ...)` with accent colors
- Glass utility class (`.glass`) provides backdrop-filter blur + semi-transparent bg

**Typography:**
- Inter font loaded from Google Fonts (weights 300-900)
- Responsive type scale using `clamp()` for h1, h2
- Custom font stacks via `--font-sans` and `--font-mono`

### Build Configuration

**Vite setup** (`vite.config.js`):
- Uses `@vitejs/plugin-react` for Fast Refresh
- Base path: `/` (important for GitHub Pages with custom domain)

**Hybrid scripts warning:** `package.json` contains both react-scripts and Vite commands. The migration is complete, but legacy scripts remain for backwards compatibility. Always prefer:
- `npm run dev` over `npm start`
- `npm run build` (Vite) is already configured correctly

### GitHub Pages Deployment

Site is published from `gh-pages` branch to both:
- https://elouannd.github.io
- https://elouann.me (via CNAME)

**SPA routing on GitHub Pages:**
The `postbuild` script creates `dist/404.html` as a copy of `index.html`. This ensures that direct navigation to SPA routes (like `/u/example`) works correctly, as GitHub Pages serves 404.html when a file isn't found, which then loads the React app and router.

## File Structure Context

```
src/
├── main.jsx              # React entry, renders <App /> into #root
├── index.css             # Global styles + design tokens + glass utilities
├── App.jsx               # Router setup with conditional dev routes
├── App.css               # App-specific styles
└── components/
    ├── HomePage.jsx      # Landing page with glass card
    ├── UnlinkedPage.jsx  # Fetches and sanitizes /unlinked/*.html files
    ├── NotFound.jsx      # 404 page
    └── [Plugins|Apps|Autre|Contact].jsx  # Dev-only pages

public/
├── CNAME                 # Custom domain config for GitHub Pages
└── unlinked/             # Drop HTML files here for /u/:slug access
    └── example.html      # Sample unlinked page
```

## Development Workflow Notes

When adding new unlinked pages:
1. Create `public/unlinked/my-page.html`
2. Test locally with `npm run dev` at `/u/my-page`
3. Verify sanitization if including scripts (they will be stripped by DOMPurify)

When modifying design tokens:
- Update `src/index.css` `:root` and light mode `@media` block
- Changes apply globally via CSS variables

When adding new public routes:
- Add to the public routes section in `src/App.jsx`
- Ensure they work after deployment by testing with `npm run build && npm run preview`

When adding dev-only routes:
- Add within the `{import.meta.env.DEV && ...}` conditional in `src/App.jsx`
