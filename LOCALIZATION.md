# Localization System Documentation

## Overview

This personal website now has a complete French/English localization system with:
- React Context-based language management
- localStorage persistence for language preference
- Glass morphism language toggle button
- All UI strings translated
- Default language: French (fr)

## Implementation Approach

**Chosen Approach: React Context + JSON files**

Why this approach?
- Simple and lightweight (no external dependencies)
- Easy to maintain and extend
- Type-safe with proper structure
- Follows React best practices
- Perfect for small to medium-sized applications

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.jsx       # Language provider and hook
├── locales/
│   ├── fr.json                   # French translations
│   └── en.json                   # English translations
├── components/
│   ├── LanguageToggle.jsx        # Language switcher component
│   └── LanguageToggle.css        # Styling for language toggle
└── App.jsx                       # Wrapped with LanguageProvider
```

## Files Created/Modified

### Created:
1. `/src/contexts/LanguageContext.jsx` - Context provider with translation function
2. `/src/locales/fr.json` - French translation strings
3. `/src/locales/en.json` - English translation strings
4. `/src/components/LanguageToggle.jsx` - Language toggle button component
5. `/src/components/LanguageToggle.css` - Styling for the toggle

### Modified:
1. `/src/App.jsx` - Wrapped with LanguageProvider, added LanguageToggle
2. `/src/components/HomePage.jsx` - Uses translations
3. `/src/components/UnlinkedPage.jsx` - Uses translations
4. `/src/components/NotFound.jsx` - Uses translations
5. `/src/components/Plugins.jsx` - Uses translations
6. `/src/components/Apps.jsx` - Uses translations
7. `/src/components/Autre.jsx` - Uses translations
8. `/src/components/Contact.jsx` - Uses translations

## How to Use the Translation System

### In a Component:

```jsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t, language, toggleLanguage, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('common.backToHome')}</p>

      {/* Access current language */}
      <p>Current: {language}</p>

      {/* Toggle between languages */}
      <button onClick={toggleLanguage}>Toggle</button>

      {/* Set specific language */}
      <button onClick={() => setLanguage('fr')}>Français</button>
    </div>
  );
}
```

### Using Dynamic Values:

For strings with placeholders (like `{{slug}}` or `{{version}}`), use `.replace()`:

```jsx
// Translation: "Page \"{{slug}}\" not found"
const message = t('unlinked.notFound.message').replace('{{slug}}', slug);

// Or for multiple placeholders:
let text = t('plugins.version'); // "v{{version}}"
text = text.replace('{{version}}', '3.0'); // "v3.0"
```

### Nested Translation Keys:

The translation function supports dot notation:

```jsx
t('common.backToHome')         // "Retour à l'accueil" (FR) / "Back to Home" (EN)
t('plugins.title')              // "Découvrez Mes Plugins" (FR) / "Discover My Plugins" (EN)
t('unlinked.error.title')       // "Erreur de chargement" (FR) / "Loading error" (EN)
```

## Translation Structure

Both `fr.json` and `en.json` follow this structure:

```json
{
  "common": {
    "backToHome": "...",
    "loading": "...",
    "contact": "..."
  },
  "home": {
    "title": "...",
    "contactBanner": "..."
  },
  "nav": {
    "plugins": "...",
    "apps": "...",
    "other": "...",
    "contact": "..."
  },
  "plugins": {
    "title": "...",
    "aaxNotice": "...",
    "version": "...",
    "download": "...",
    "os": { ... },
    "items": { ... }
  },
  "apps": { ... },
  "other": { ... },
  "contact": { ... },
  "unlinked": { ... },
  "notFound": { ... },
  "language": { ... }
}
```

## Adding New Translations

### Step 1: Add to Translation Files

Add the new key to both `/src/locales/fr.json` and `/src/locales/en.json`:

**fr.json:**
```json
{
  "mySection": {
    "newString": "Nouveau texte en français"
  }
}
```

**en.json:**
```json
{
  "mySection": {
    "newString": "New text in English"
  }
}
```

### Step 2: Use in Component

```jsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  return <p>{t('mySection.newString')}</p>;
}
```

### Step 3: Dynamic Content

For strings with variables:

**Translation files:**
```json
{
  "greeting": "Bonjour {{name}}, vous avez {{count}} messages"
}
```

**Component:**
```jsx
const message = t('greeting')
  .replace('{{name}}', userName)
  .replace('{{count}}', messageCount);
```

## Language Toggle Component

The language toggle appears in the top-right corner of every page. It:
- Shows "FR | EN" with the active language highlighted
- Persists selection in localStorage
- Matches the analog glass morphism design aesthetic
- Is fully responsive
- Includes proper ARIA labels for accessibility

## Features

### localStorage Persistence
Language preference is saved automatically:
```javascript
// Saved to: localStorage.getItem('language')
// Values: 'fr' or 'en'
// Default: 'fr'
```

### Automatic Fallback
If a translation key is missing, the system returns the key itself:
```javascript
t('nonexistent.key') // Returns: "nonexistent.key"
```

### Type Safety
The context provides proper TypeScript-ready structure with:
- `language`: Current language code ('fr' | 'en')
- `setLanguage`: Function to set specific language
- `toggleLanguage`: Function to toggle between languages
- `t`: Translation function

## Translated Strings Summary

**Total strings translated: 40+**

Categories:
- Common UI (3): Back to home, loading, contact
- Home page (2): Title, contact banner
- Navigation (4): Plugins, apps, other, contact
- Plugins page (6+): Title, notice, version, download, OS labels, descriptions
- Apps page (2): Title, empty state
- Other page (2): Title, empty state
- Contact page (2): Title, empty state
- Unlinked page (5): Loading, not found title/message, error title/message
- 404 page (2): Title, message
- Language toggle (3): FR, EN, toggle label

## Translation Guidelines Used

### French Translations
- Natural, idiomatic French (France variant)
- Informal "tu" form where appropriate for a personal site
- Proper accents: é, è, ê, à, ç
- Ellipsis character (…) for loading states
- Correct gender agreement
- No anglicisms where French equivalents exist

### English Translations
- Clear, natural English
- Friendly, casual tone matching French
- Consistent terminology
- Proper capitalization for titles and buttons

## Browser Compatibility

The system works with:
- All modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support (all modern browsers)
- CSS backdrop-filter support (with fallbacks)

## Performance

- Zero runtime overhead (no external i18n library)
- JSON files loaded once at app start
- No network requests for translations
- Instant language switching
- Small bundle size impact (~2KB total for translations)

## Accessibility

- Proper ARIA labels on language toggle
- Keyboard navigation support
- Screen reader friendly
- Focus visible states
- Semantic HTML

## Future Enhancements

To add more languages in the future:

1. Create new translation file (e.g., `/src/locales/es.json`)
2. Import in `LanguageContext.jsx`:
   ```javascript
   import es from '../locales/es.json';
   const translations = { fr, en, es };
   ```
3. Update language toggle to include new language
4. Update localStorage validation to accept new language code

## Testing the System

1. Visit the site - should load in French by default
2. Click FR | EN toggle in top-right
3. All text should switch to English
4. Refresh page - language preference should persist
5. Try all pages (/plugins, /apps, etc.) - all should be translated
6. Check unlinked pages (/u/example) - error states should be translated
7. Check localStorage in DevTools - should see `language: "fr"` or `"en"`

## Troubleshooting

**Problem: Translations not showing**
- Check that component imports `useLanguage` hook
- Verify translation keys exist in both JSON files
- Check browser console for errors

**Problem: Language not persisting**
- Check if localStorage is enabled in browser
- Verify no browser extensions blocking localStorage
- Check for any console errors

**Problem: Toggle not appearing**
- Verify App.jsx wraps with LanguageProvider
- Check that LanguageToggle.css is imported
- Verify z-index isn't being overridden

## Notes

- Unlinked pages (`/u/:slug`) load raw HTML and don't use translations
- Dev-only routes (plugins, apps, etc.) only appear in development mode
- The language toggle is always visible on all pages
- Language preference is per-browser (not per-account)
