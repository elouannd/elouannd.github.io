import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Read index.html
const indexHtml = readFileSync(join(distPath, 'index.html'), 'utf-8');

// Create 404.html that's a copy of index.html with redirect script prepended
// This ensures Google can crawl the full app even on 404 routes
const html404 = indexHtml.replace(
  '<script>',
  `<script>
    // SPA redirect handler for GitHub Pages
    (function(){
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.pathname) {
        history.replaceState(null, null, redirect);
      }
      // Store current path for redirect
      sessionStorage.redirect = location.pathname + location.search + location.hash;
    })();
  </script>
  <script>`
);

// Write 404.html
writeFileSync(join(distPath, '404.html'), html404);

console.log('✅ Created 404.html with SPA redirect');
