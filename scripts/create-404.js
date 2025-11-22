import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Read index.html
const indexHtml = readFileSync(join(distPath, 'index.html'), 'utf-8');

// Create 404.html with redirect script
const html404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Store the current path for SPA redirect
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'" />
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

// Write 404.html
writeFileSync(join(distPath, '404.html'), html404);

console.log('✅ Created 404.html with SPA redirect');
