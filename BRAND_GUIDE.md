# Brand Guide: Neo-Brutalism + Glassmorphism Hybrid

## Design Philosophy

This design system merges the bold, unapologetic aesthetics of **neo-brutalism** with the elegant depth of **glassmorphism**, creating a unique visual language that is both striking and refined.

## Color Palette

### Primary Colors
- **Orange**: `#FFA666` - Warm, energetic, confident
- **Teal**: `#66F2E0` - Cool, modern, tech-forward

### Neutrals
- **Black**: `#000000` - All borders and text
- **White**: `#FFFFFF` - Glass overlays and accents
- **Dark Gray**: `#1a1a1a` - Background base

## Typography

### Font Families
- **Sans Serif (Bold)**: Inter (weights: 300, 400, 700, 900)
  - Used for: Headlines, UI elements, navigation
- **Serif (Italic)**: Merriweather (weights: 400, 700, italic)
  - Used for: Emphasis, quotes, artistic touches

### Mixed Typography Component
For maximum impact, combine both typefaces in a single headline:
```
"ELOUANN" → 50% Bold Sans, 50% Italic Serif
```

## Glass Effect (Glassmorphism)

### Properties
```css
background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%
);
backdrop-filter: blur(12px);
```

### Noise Texture
Apply a subtle 2% opacity noise overlay for tactile feel:
```css
background-image: url('noise.svg');
opacity: 0.02;
```

## Borders (Neo-Brutalism)

### Standard Border
- **Width**: 3px - 5px
- **Color**: Black (`#000`)
- **Style**: Solid

### Rules
- Every card, button, and container MUST have a hard black border
- No rounded corners on outer containers (sharp 0px radius)
- Inner elements can have slight rounding (4px - 8px) for contrast

## Shadows (Hard Offset)

### Primary Shadow
```css
box-shadow: 6px 6px 0px 0px #000;
```

### Small Elements
```css
box-shadow: 3px 3px 0px 0px #000;
```

### Pressed State
```css
box-shadow: 2px 2px 0px 0px #000;
transform: translate(4px, 4px);
```

**Key Principle**: Shadows are solid blocks, not blurred. They offset in a single direction (typically bottom-right).

## Button States

### Default
- Border: 4px solid black
- Shadow: `6px 6px 0px #000`
- Background: Glass effect + brand color tint

### Hover
- Border: 4px solid black
- Shadow: `8px 8px 0px #000`
- Transform: `translate(-2px, -2px)`

### Active/Pressed
- Border: 4px solid black
- Shadow: `2px 2px 0px #000`
- Transform: `translate(4px, 4px)`

## Component Specifications

### BrandCard
```jsx
<div className="glass glass-noise border-4 border-black shadow-brutal rounded-none p-6">
  {children}
</div>
```

### BrandButton
```jsx
<button className="glass border-4 border-black shadow-brutal px-6 py-3
  font-bold uppercase tracking-wide transition-all
  hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5
  active:shadow-brutal-pressed active:translate-x-1 active:translate-y-1">
  {label}
</button>
```

### MixedTypography
Alternates between sans-serif bold and serif italic on a per-character or per-word basis.

## Layout Principles

1. **Confident Spacing**: Use generous padding (24px - 48px) inside cards
2. **Grid System**: Use CSS Grid with hard gaps (16px - 32px)
3. **Asymmetry**: Cards can be different sizes, creating visual interest
4. **Z-Axis Layering**: Stack cards with increasing shadow offsets for depth

## Animation Guidelines

- **Duration**: 150ms - 300ms (fast and snappy)
- **Easing**: `ease-out` for entrances, `ease-in-out` for state changes
- **Transform**: Prefer `translate` over `margin` for performance
- **Hover Effects**: Immediate and obvious (no subtle changes)

## Accessibility

- **Contrast**: All text must be pure black (#000) on glass backgrounds
- **Focus States**: Add a 3px outline offset by 2px in brand-orange
- **Touch Targets**: Minimum 44px × 44px for buttons
- **Motion**: Respect `prefers-reduced-motion` media query

## Usage Examples

### Hero Section
```jsx
<div className="min-h-screen flex items-center justify-center p-8">
  <h1 className="text-9xl font-black uppercase">
    <span className="font-sans">ELO</span>
    <span className="font-serif italic">UANN</span>
  </h1>
</div>
```

### Portal Card (Navigation)
```jsx
<div className="glass glass-noise border-5 border-black shadow-brutal p-8
  hover:shadow-brutal-lg transition-all cursor-pointer
  bg-gradient-to-br from-brand-orange/10 to-transparent">
  <h2 className="text-2xl font-black uppercase mb-2">Projects</h2>
  <p className="font-serif italic">See what I've built</p>
</div>
```

## Do's and Don'ts

### Do:
✓ Use hard black borders on everything
✓ Apply glass effects to containers
✓ Use bold, uppercase sans-serif for headings
✓ Add noise texture for tactile feel
✓ Create obvious hover states

### Don't:
✗ Use soft shadows or blur on borders
✗ Round corners on primary containers
✗ Use low-contrast color combinations
✗ Hide interactive states
✗ Overuse animations

---

**Version**: 1.0
**Last Updated**: 2025-11-22
