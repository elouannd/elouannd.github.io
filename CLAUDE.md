# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Vite + React 19, featuring a glassmorphism design system and a unique "unlinked pages" system for sharing standalone HTML pages without navigation.

**Deployment**: GitHub Pages (gh-pages branch) with custom domain `elouann.me`

## Development Commands

### Local Development
```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm test             # Run tests with react-scripts
npm run deploy       # Build and deploy to gh-pages branch
```

### Build Process Details
- `npm run build` triggers Vite build to `dist/`
- Post-build script automatically:
  - Copies `dist/index.html` → `dist/404.html` (SPA fallback for GitHub Pages)
  - Copies `public/CNAME` → `dist/CNAME` (custom domain configuration)

## Architecture

### Tech Stack
- **Build**: Vite 7
- **Framework**: React 19 with React Router v7
- **Styling**: CSS custom properties with glassmorphism design system
- **Security**: DOMPurify for HTML sanitization
- **Deployment**: gh-pages npm package

### Application Structure

**Entry Point**: `src/main.jsx` → `src/App.jsx`

**Routing** (in `src/App.jsx`):
- `/` - Homepage with glassmorphism design
- `/u/:slug` - Unlinked page renderer (see below)
- Dev-only routes (only rendered when `import.meta.env.DEV`):
  - `/plugins`, `/apps`, `/autre`, `/contact`
- `*` - NotFound fallback

### Unlinked Pages System

A unique feature allowing standalone HTML files to be shared without navigation links.

**How it works**:
1. Place HTML file at `public/unlinked/your-slug.html`
2. Access via SPA route: `/u/your-slug` (sanitized by DOMPurify)
3. Direct static access: `/unlinked/your-slug.html` (bypasses React)

**Implementation** (`src/components/UnlinkedPage.jsx`):
- Fetches from `/unlinked/${slug}.html`
- Sanitizes with DOMPurify using safe HTML profile
- Handles loading/error/404 states
- Back button to homepage

**Security**: All content is sanitized via DOMPurify before injection to prevent XSS.

### Design System (Glassmorphism)

Defined in `src/index.css` via CSS custom properties:

**Core Tokens**:
```css
--bg-1, --bg-2          /* Background gradients */
--accent-1, --accent-2  /* Accent colors for gradients */
--text, --muted         /* Text colors */
--glass-bg              /* Semi-transparent glass background */
--glass-border          /* Glass border color */
--glass-shadow          /* Layered shadow for depth */
--radius, --blur        /* Glass effects */
```

**Dark/Light Mode**: Automatic switching via `@media (prefers-color-scheme: light)`

**Utilities**:
- `.glass` - Applies glassmorphism effect (background, border, backdrop-filter, shadow)
- `.container` - Responsive max-width container with padding
- Type scale utilities (h1, h2, p) with responsive clamp sizing

**Background**: Multi-layer radial gradients using `color-mix()` with accent colors over base gradients

### Component Organization

```
src/
├── App.jsx                    # Router + route definitions
├── main.jsx                   # React entry point
├── index.css                  # Design system tokens
├── App.css                    # App-specific styles
└── components/
    ├── HomePage.jsx           # Glassmorphism homepage
    ├── UnlinkedPage.jsx       # Unlinked pages loader
    ├── NotFound.jsx           # 404 page
    └── [Plugins, Apps, etc]   # Dev-only pages
```

## Key Development Patterns

### Adding a New Route
1. Create component in `src/components/`
2. Import in `src/App.jsx`
3. Add `<Route>` - wrap in `{import.meta.env.DEV && ...}` if dev-only

### Adding Unlinked Pages
- No code changes needed
- Drop HTML file in `public/unlinked/slug.html`
- Accessible at `/u/slug` (sanitized) or `/unlinked/slug.html` (static)

### Styling with Glassmorphism
- Use `.glass` utility class for card effects
- Reference design tokens (`var(--token-name)`) for consistency
- Test in both dark and light modes

### Dev vs Production Routes
Routes inside `{import.meta.env.DEV && ...}` blocks are excluded from production builds. This allows development/testing pages without deploying them.

## Deployment

**Target**: GitHub Pages (gh-pages branch)

**Process**:
```bash
npm run deploy
```

**What happens**:
1. Runs production build (Vite)
2. Creates SPA fallback (`dist/404.html`)
3. Copies CNAME for custom domain
4. Pushes `dist/` to `gh-pages` branch via gh-pages package

**Repository Settings** (already configured):
- Pages source: `gh-pages` branch
- Custom domain: `elouann.me` (via `public/CNAME`)

**Live URLs**:
- https://elouannd.github.io
- https://elouann.me

## Important Notes

- **SPA Routing on GitHub Pages**: The postbuild script copies `index.html` to `404.html` so that client-side routes work when refreshing pages directly
- **Custom Domain**: `public/CNAME` file ensures GitHub Pages serves at the custom domain
- **Base Path**: Vite config uses `base: '/'` (root deployment)
- **Font Loading**: Inter font loaded in `index.html` for glassmorphism design
