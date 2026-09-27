/**
 * Helper to resolve static assets from the `public/` directory cleanly
 * across both local development and GitHub Pages (which hosts under a subpath like `/portfolio/`).
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|\/\/)/i.test(path)) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';

  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
