# ELOUANN - The Launchpad

A neo-brutalism + glassmorphism hybrid portfolio built with Vite + React.

## Design Philosophy

This site combines the bold, unapologetic aesthetics of **neo-brutalism** with the elegant depth of **glassmorphism**. See [BRAND_GUIDE.md](./BRAND_GUIDE.md) for complete design specs.

## Tech Stack

- **Build Tool**: Vite 5
- **Framework**: React 18
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3
- **Deployment**: GitHub Pages

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### The "Hub & Spoke" Model

- **Root (`/`)**: The Launchpad - your main portal
- **Content Pages**: `/about`, `/contact`, `/apps`
- **App Routes**: Add new apps by updating `src/apps.json`

### Adding a New App

1. Edit `src/apps.json`:
```json
{
  "id": "my-new-app",
  "name": "My New App",
  "url": "/my-app",
  "description": "What this app does",
  "color": "orange"
}
```

2. Add route in `src/App.jsx`:
```jsx
<Route path="/my-app" element={<MyAppPage />} />
```

3. The app will automatically appear in the Apps directory!

## Core Components

- **BrandCard**: Glass card with neo-brutal borders and shadows
- **BrandButton**: Interactive button with press animations
- **MixedTypography**: Alternates sans-serif and serif fonts

## Design Tokens

- Primary: `#FFA666` (Orange)
- Accent: `#66F2E0` (Teal)
- Borders: `#000` (Black), 3-5px width
- Shadows: Hard offset, no blur
- Glass: `backdrop-filter: blur(12px)`

## Deployment

Site deploys to:
- https://elouannd.github.io
- https://elouann.me (custom domain)

GitHub Pages serves from the `gh-pages` branch. The `postbuild` script creates `404.html` for SPA routing support.

---

Built fresh on 2025-11-22
