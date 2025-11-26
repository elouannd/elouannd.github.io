import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Read index.html
const indexHtml = readFileSync(join(distPath, 'index.html'), 'utf-8');

// All SPA routes that need static HTML files
const routes = [
  'apps',
  'eq-trainer', 
  'audio-calculator',
  'about',
  'contact',
  'experiment-z'
];

// Create a directory and index.html for each route
routes.forEach(route => {
  const routeDir = join(distPath, route);
  
  // Create directory if it doesn't exist
  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }
  
  // Write index.html (same as main index.html)
  writeFileSync(join(routeDir, 'index.html'), indexHtml);
});

// Also create 404.html as a copy of index.html (fallback for unknown routes)
writeFileSync(join(distPath, '404.html'), indexHtml);

console.log(`✅ Created static HTML for ${routes.length} routes + 404.html`);
