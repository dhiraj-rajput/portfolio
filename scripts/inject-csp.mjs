// Post-build step: adds a Content-Security-Policy <meta> to dist/index.html.
// Inline scripts are allowed by SHA-256 hash (computed here), so no 'unsafe-inline' for scripts.
// GitHub Pages cannot send HTTP headers, so a meta tag is the strongest option without a CDN.
// Behind Cloudflare, send the same policy (plus frame-ancestors) as a real header - see docs/SECURITY.md.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../dist/index.html', import.meta.url);
let html = readFileSync(file, 'utf8');

const hashes = [];
for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/g)) {
  hashes.push(`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${hashes.join(' ')}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\s*/g, '');
html = html.replace('<head>', `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`);
writeFileSync(file, html);
console.log(`CSP injected (${hashes.length} inline script hash${hashes.length === 1 ? '' : 'es'})`);
