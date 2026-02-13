/**
 * Post-build script: generates sub-route index.html files 
 * with per-page SEO meta tags for static hosting.
 * 
 * Run after `vite build` via `npm run build`.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

// Read base template
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// Route-specific SEO data
const routes = [
  {
    path: 'mkly',
    title: 'mkly — HubDev AI',
    description: 'mkly is a zero-config, type-safe markup language with Zod schema validation that compiles to clean, semantic HTML5. Built for AI-human collaboration.',
  },
  {
    path: 'untrusted',
    title: 'Untrusted<T> — HubDev AI',
    description: 'Untrusted<T> is a backend-focused security primitive enforcing security-by-construction through taint tracking, sec4Audit compiler, and policy-as-code.',
  },
];

const baseUrl = 'https://hubdev.ai';
const defaultTitle = 'HubDev AI — Next-Gen Developer Tools & Security Primitives';
const defaultDesc = "Explore HubDev AI's cutting-edge developer tools: mkly, a human-readable markup language that compiles to HTML5, and Untrusted<T>, a backend security primitive enforcing security-by-construction.";

for (const route of routes) {
  let html = template;

  // Title tag
  html = html.replace(`<title>${defaultTitle}</title>`, `<title>${route.title}</title>`);

  // Meta title
  html = html.replace(
    `<meta name="title" content="${defaultTitle}" />`,
    `<meta name="title" content="${route.title}" />`
  );

  // Meta description
  html = html.replace(
    `<meta name="description" content="${defaultDesc}" />`,
    `<meta name="description" content="${route.description}" />`
  );

  // Canonical
  html = html.replace(
    `<link rel="canonical" href="${baseUrl}/" />`,
    `<link rel="canonical" href="${baseUrl}/${route.path}" />`
  );

  // OG tags
  html = html.replace(
    `<meta property="og:url" content="${baseUrl}/" />`,
    `<meta property="og:url" content="${baseUrl}/${route.path}" />`
  );
  html = html.replace(
    `<meta property="og:title" content="${defaultTitle}" />`,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    new RegExp(`<meta property="og:description" content="[^"]*" />`),
    `<meta property="og:description" content="${route.description}" />`
  );

  // Twitter tags
  html = html.replace(
    `<meta property="twitter:url" content="${baseUrl}/" />`,
    `<meta property="twitter:url" content="${baseUrl}/${route.path}" />`
  );
  html = html.replace(
    `<meta property="twitter:title" content="${defaultTitle}" />`,
    `<meta property="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    new RegExp(`<meta property="twitter:description" content="[^"]*" />`),
    `<meta property="twitter:description" content="${route.description}" />`
  );

  // Write to dist/{route}/index.html
  const routeDir = resolve(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(resolve(routeDir, 'index.html'), html);

  console.log(`✓ Generated dist/${route.path}/index.html`);
}

console.log('Pre-rendering complete.');
