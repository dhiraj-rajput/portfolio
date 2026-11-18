const CLIENT_ID_KEY = 'sketchbook_cid';

let cachedDeviceHashPromise: Promise<string> | null = null;

function fallbackClientId(): string {
  return `cid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Persistent anonymous browser ID stored in localStorage (SSG-safe).
 */
export function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return 'ssr-client';
  try {
    const existing = window.localStorage.getItem(CLIENT_ID_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) {
      return existing;
    }
    const created =
      typeof window.crypto?.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : fallbackClientId();
    window.localStorage.setItem(CLIENT_ID_KEY, created);
    return created;
  } catch {
    return fallbackClientId();
  }
}

function getCanvasSignature(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-2d';
    ctx.textBaseline = 'top';
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#f60';
    ctx.fillRect(10, 4, 60, 18);
    ctx.fillStyle = '#069';
    ctx.fillText('djphantom-sketch', 14, 8);
    return canvas.toDataURL().slice(-64);
  } catch {
    return 'canvas-blocked';
  }
}

function getWebGLSignature(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl || !(gl instanceof WebGLRenderingContext)) return 'no-gl';
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (!dbg) return String(gl.getParameter(gl.RENDERER) ?? 'gl');
    const vendor = gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL);
    return `${vendor ?? ''}|${renderer ?? ''}`;
  } catch {
    return 'gl-blocked';
  }
}

function fnv1aHex(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= c + i;
    h2 = Math.imul(h2, 0x01000193);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0).toString(16).padStart(8, '0')}`;
}

async function computeDeviceHash(): Promise<string> {
  if (typeof window === 'undefined') return '0000000000000000';

  const nav = window.navigator;
  const scr = window.screen;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
  const signals = [
    nav.platform || '',
    nav.language || '',
    (nav.languages || []).join(','),
    String(nav.hardwareConcurrency ?? ''),
    String((nav as Navigator & { deviceMemory?: number }).deviceMemory ?? ''),
    `${scr.width}x${scr.height}x${scr.colorDepth}`,
    String(window.devicePixelRatio || 1),
    tz,
    String(nav.maxTouchPoints ?? 0),
    getWebGLSignature(),
    getCanvasSignature(),
  ].join('||');

  try {
    if (window.crypto?.subtle) {
      const encoded = new TextEncoder().encode(signals);
      const digest = await window.crypto.subtle.digest('SHA-256', encoded);
      return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // Fallback below when crypto.subtle is unavailable
  }
  return fnv1aHex(signals);
}

/**
 * Deterministic per-browser/device SHA-256 signature used alongside clientId so clearing
 * localStorage or opening Incognito on the same browser preserves single-like enforcement.
 */
export function getDeviceHash(): Promise<string> {
  if (!cachedDeviceHashPromise) {
    cachedDeviceHashPromise = computeDeviceHash();
  }
  return cachedDeviceHashPromise;
}
