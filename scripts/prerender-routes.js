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
    ogImage: 'og-mkly.svg',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "mkly",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform",
      "description": "A human-readable, AI-friendly markup language that compiles to semantic HTML5. Zero-config, type-safe with Zod schema validation.",
      "url": "https://hubdev.ai/mkly",
      "author": {
        "@type": "Organization",
        "name": "HubDev AI",
        "url": "https://hubdev.ai"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "softwareVersion": "1.0.4",
      "keywords": "markup language, HTML5 compiler, type-safe, Zod, AI developer tools"
    },
    noscript: `
      <h1>mkly — HubDev AI</h1>
      <p><strong>mkly</strong> is a human-readable, AI-friendly markup language that compiles to semantic HTML5. It features zero-configuration setup, type-safe schema validation via Zod, and generates clean, accessible HTML5 structures.</p>
      <h2>Features</h2>
      <ul>
        <li><strong>Zero-Config</strong>: Works out of the box with standard tooling.</li>
        <li><strong>Type-Safe</strong>: Schema validation via Zod intercepts errors pre-compile.</li>
        <li><strong>Semantic Output</strong>: Generates clean, accessible HTML5.</li>
      </ul>
      <h2>Quick Start</h2>
      <pre><code>npm install @milkly/mkly</code></pre>
      <p><a href="https://github.com/HubDev-AI/mkly">View on GitHub</a> | <a href="/">Back to HubDev AI</a></p>
    `,
  },
  {
    path: 'untrusted',
    title: 'Untrusted<T> — HubDev AI',
    description: 'Untrusted<T> is a backend-focused security primitive enforcing security-by-construction through taint tracking, sec4Audit compiler, and policy-as-code.',
    ogImage: 'og_untrusted_v2_1770999778032.png',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Untrusted<T>",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform",
      "description": "A backend-focused, AI-operable programming language primitive that enforces security by construction. Wraps tainted data types to prevent accidental usage in sensitive sinks.",
      "url": "https://hubdev.ai/untrusted",
      "author": {
        "@type": "Organization",
        "name": "HubDev AI",
        "url": "https://hubdev.ai"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "softwareVersion": "2.1",
      "keywords": "security, taint tracking, policy-as-code, sec4Audit, backend security"
    },
    noscript: `
      <h1>Untrusted&lt;T&gt; — HubDev AI</h1>
      <p><strong>Untrusted&lt;T&gt;</strong> is a backend-focused, AI-operable programming language primitive that enforces "Security by Construction". It wraps tainted data types to prevent accidental usage in sensitive sinks.</p>
      <h2>Security Features</h2>
      <ul>
        <li><strong>Taint Tracking</strong>: Wraps all external inputs in <code>Untrusted&lt;T&gt;</code>.</li>
        <li><strong>sec4Audit Compiler</strong>: Enforces policy-as-code before build.</li>
        <li><strong>Explicit Declassification</strong>: Requires intentional developer override for critical operations.</li>
      </ul>
      <pre><code>git clone https://github.com/HubDev-AI/untrusted-compiler</code></pre>
      <p><a href="https://github.com/HubDev-AI/untrusted-compiler">View on GitHub</a> | <a href="/">Back to HubDev AI</a></p>
    `,
  },
];

const baseUrl = 'https://hubdev.ai';
const defaultTitle = 'HubDev AI — Next-Gen Developer Tools & Security Primitives';
const defaultDesc = "Explore HubDev AI's cutting-edge developer tools: mkly, a human-readable markup language that compiles to HTML5, and Untrusted<T>, a backend security primitive enforcing security-by-construction.";
const defaultOgImage = 'og-image.png';

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
  // OG image — per-project
  html = html.replace(
    `<meta property="og:image" content="${baseUrl}/${defaultOgImage}" />`,
    `<meta property="og:image" content="${baseUrl}/${route.ogImage}" />`
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
  // Twitter image — per-project
  html = html.replace(
    `<meta property="twitter:image" content="${baseUrl}/${defaultOgImage}" />`,
    `<meta property="twitter:image" content="${baseUrl}/${route.ogImage}" />`
  );

  // JSON-LD — replace Organization schema with per-route SoftwareApplication schema
  const orgSchemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  const routeJsonLd = `<script type="application/ld+json">\n    ${JSON.stringify(route.jsonLd, null, 2).replace(/\n/g, '\n    ')}\n    </script>`;
  html = html.replace(orgSchemaRegex, routeJsonLd);

  // Noscript — replace generic content with per-route content
  const noscriptRegex = /<noscript>[\s\S]*?<\/noscript>/;
  html = html.replace(noscriptRegex, `<noscript>${route.noscript}\n    </noscript>`);

  // Write to dist/{route}/index.html
  const routeDir = resolve(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(resolve(routeDir, 'index.html'), html);

  console.log(`✓ Generated dist/${route.path}/index.html`);
}

console.log('Pre-rendering complete.');
