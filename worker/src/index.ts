export interface Env {
  DB: D1Database;
  ALLOWED_ORIGIN?: string;
  IP_SALT?: string;
}

const VALID_PIECES = new Set(['arceus', 'darkrai', 'latias', 'moltres', 'sheet', 'trainer']);
const MAX_VOTES_PER_IP_UA_PER_PIECE = 8;

type ToggleAction = 'like' | 'unlike';

interface ToggleBody {
  action?: unknown;
  clientId?: unknown;
  deviceHash?: unknown;
}

function resolveCorsOrigin(request: Request, env: Env): string | null {
  const origin = request.headers.get('Origin');
  if (!origin) return null;

  const allowed = new Set<string>([
    'https://djphantom.tech',
    'https://www.djphantom.tech',
  ]);
  if (env.ALLOWED_ORIGIN) {
    for (const item of env.ALLOWED_ORIGIN.split(',')) {
      const trimmed = item.trim();
      if (trimmed) allowed.add(trimmed);
    }
  }

  if (allowed.has(origin)) return origin;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return origin;
  return null;
}

function buildHeaders(corsOrigin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };
  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

function jsonResponse(data: unknown, status: number, corsOrigin: string | null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: buildHeaders(corsOrigin),
  });
}

function isSafeToken(value: unknown, minLen: number, maxLen: number): value is string {
  return (
    typeof value === 'string' &&
    value.length >= minLen &&
    value.length <= maxLen &&
    /^[a-zA-Z0-9_-]+$/.test(value)
  );
}

async function hmacSha256Hex(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function getPieceCount(db: D1Database, pieceId: string): Promise<number> {
  const row = await db
    .prepare('SELECT likes FROM art_counts WHERE piece_id = ?')
    .bind(pieceId)
    .first<{ likes: number }>();
  return row ? Math.max(0, Number(row.likes) || 0) : 0;
}

async function handleGetLikes(
  request: Request,
  env: Env,
  corsOrigin: string | null,
): Promise<Response> {
  const url = new URL(request.url);
  const cid = url.searchParams.get('cid');
  const did = url.searchParams.get('did');

  const counts: Record<string, number> = {};
  for (const id of VALID_PIECES) counts[id] = 0;

  const { results: countRows } = await env.DB.prepare(
    'SELECT piece_id, likes FROM art_counts',
  ).all<{ piece_id: string; likes: number }>();

  for (const row of countRows) {
    if (VALID_PIECES.has(row.piece_id)) {
      counts[row.piece_id] = Math.max(0, Number(row.likes) || 0);
    }
  }

  const liked: Record<string, boolean> = {};
  const validCid = isSafeToken(cid, 8, 64) ? cid : null;
  const validDid = isSafeToken(did, 16, 128) ? did : null;

  if (validCid && validDid) {
    const { results: voteRows } = await env.DB.prepare(
      'SELECT DISTINCT piece_id FROM art_votes WHERE client_id = ? OR device_hash = ?',
    )
      .bind(validCid, validDid)
      .all<{ piece_id: string }>();
    for (const row of voteRows) {
      if (VALID_PIECES.has(row.piece_id)) liked[row.piece_id] = true;
    }
  } else if (validCid || validDid) {
    const col = validCid ? 'client_id' : 'device_hash';
    const val = (validCid ?? validDid) as string;
    const { results: voteRows } = await env.DB.prepare(
      `SELECT DISTINCT piece_id FROM art_votes WHERE ${col} = ?`,
    )
      .bind(val)
      .all<{ piece_id: string }>();
    for (const row of voteRows) {
      if (VALID_PIECES.has(row.piece_id)) liked[row.piece_id] = true;
    }
  }

  return jsonResponse({ counts, liked }, 200, corsOrigin);
}

async function handleToggleLike(
  request: Request,
  env: Env,
  pieceId: string,
  corsOrigin: string | null,
): Promise<Response> {
  if (!VALID_PIECES.has(pieceId)) {
    return jsonResponse({ error: 'Unknown artwork id' }, 404, corsOrigin);
  }

  let body: ToggleBody;
  try {
    body = (await request.json()) as ToggleBody;
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400, corsOrigin);
  }

  const action: ToggleAction | null =
    body.action === 'like' || body.action === 'unlike' ? body.action : null;
  if (!action) {
    return jsonResponse({ error: 'Invalid action' }, 400, corsOrigin);
  }

  if (!isSafeToken(body.clientId, 8, 64) || !isSafeToken(body.deviceHash, 16, 128)) {
    return jsonResponse({ error: 'Invalid client identifiers' }, 400, corsOrigin);
  }

  const clientId = body.clientId;
  const deviceHash = body.deviceHash;

  if (action === 'unlike') {
    const delResult = await env.DB.prepare(
      'DELETE FROM art_votes WHERE piece_id = ? AND (client_id = ? OR device_hash = ?)',
    )
      .bind(pieceId, clientId, deviceHash)
      .run();

    if ((delResult.meta.changes ?? 0) > 0) {
      await env.DB.prepare(
        'UPDATE art_counts SET likes = MAX(0, likes - 1) WHERE piece_id = ?',
      )
        .bind(pieceId)
        .run();
    }

    const count = await getPieceCount(env.DB, pieceId);
    return jsonResponse({ pieceId, count, liked: false }, 200, corsOrigin);
  }

  // action === 'like': check if this client/device already holds an active like
  const existing = await env.DB.prepare(
    'SELECT id FROM art_votes WHERE piece_id = ? AND (client_id = ? OR device_hash = ?) LIMIT 1',
  )
    .bind(pieceId, clientId, deviceHash)
    .first<{ id: number }>();

  if (existing) {
    const count = await getPieceCount(env.DB, pieceId);
    return jsonResponse({ pieceId, count, liked: true, alreadyLiked: true }, 200, corsOrigin);
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
  const ua = request.headers.get('User-Agent') ?? '';
  const ipUaHash = await hmacSha256Hex(`${ip}|${ua}`, env.IP_SALT ?? 'local-dev-salt');

  const networkCountRow = await env.DB.prepare(
    'SELECT COUNT(*) AS total FROM art_votes WHERE piece_id = ? AND ip_ua_hash = ?',
  )
    .bind(pieceId, ipUaHash)
    .first<{ total: number }>();

  if ((networkCountRow?.total ?? 0) >= MAX_VOTES_PER_IP_UA_PER_PIECE) {
    return jsonResponse(
      { error: 'Too many likes from this network signature' },
      429,
      corsOrigin,
    );
  }

  // INSERT OR IGNORE protects against concurrent double-click race conditions via UNIQUE indexes
  const insertResult = await env.DB.prepare(
    'INSERT OR IGNORE INTO art_votes (piece_id, client_id, device_hash, ip_ua_hash) VALUES (?, ?, ?, ?)',
  )
    .bind(pieceId, clientId, deviceHash, ipUaHash)
    .run();

  if ((insertResult.meta.changes ?? 0) > 0) {
    await env.DB.prepare(
      'INSERT INTO art_counts (piece_id, likes) VALUES (?, 1) ON CONFLICT(piece_id) DO UPDATE SET likes = likes + 1',
    )
      .bind(pieceId)
      .run();
  }

  const count = await getPieceCount(env.DB, pieceId);
  return jsonResponse({ pieceId, count, liked: true }, 200, corsOrigin);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsOrigin = resolveCorsOrigin(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: buildHeaders(corsOrigin) });
    }

    // Reject cross-origin requests from unauthorized origins in browsers
    if (request.headers.get('Origin') && !corsOrigin) {
      return jsonResponse({ error: 'Origin not allowed' }, 403, null);
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    try {
      if (request.method === 'GET' && path === '/likes') {
        return await handleGetLikes(request, env, corsOrigin);
      }

      if (request.method === 'POST' && path.startsWith('/likes/')) {
        const pieceId = decodeURIComponent(path.slice('/likes/'.length));
        return await handleToggleLike(request, env, pieceId, corsOrigin);
      }

      return jsonResponse({ error: 'Not found' }, 404, corsOrigin);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      return jsonResponse({ error: message }, 500, corsOrigin);
    }
  },
};
