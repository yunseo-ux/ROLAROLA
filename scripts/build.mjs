import { cp, mkdir } from 'node:fs/promises';

// Copy the same static files used when opening index.html directly.
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src/main.js', 'dist/src/main.js', { recursive: true });
await cp('src/styles', 'dist/src/styles', { recursive: true });
await cp('src/assets', 'dist/src/assets', { recursive: true });
console.log('Static HTML, CSS and JavaScript copied to dist.');
