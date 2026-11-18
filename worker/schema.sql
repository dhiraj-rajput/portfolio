CREATE TABLE IF NOT EXISTS art_counts (
  piece_id TEXT PRIMARY KEY,
  likes INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS art_votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  piece_id TEXT NOT NULL,
  client_id TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  ip_ua_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_piece_client
  ON art_votes (piece_id, client_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_piece_device
  ON art_votes (piece_id, device_hash);

CREATE INDEX IF NOT EXISTS idx_votes_piece_ip_ua
  ON art_votes (piece_id, ip_ua_hash);
