import { useCallback, useEffect, useRef, useState } from 'react';
import { getDeviceHash, getOrCreateClientId } from '../utils/deviceFingerprint';

const LIKED_STORAGE_KEY = 'sketchbook_liked';
const COUNTS_STORAGE_KEY = 'sketchbook_counts';

const rawApiBase = (import.meta.env.VITE_LIKES_API_URL as string | undefined)?.trim() ?? '';
const API_BASE = rawApiBase.replace(/\/+$/, '');

type BoolMap = Record<string, boolean>;
type CountMap = Record<string, number>;

function readStorageMap<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorageMap(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export interface ArtLikesState {
  counts: CountMap;
  liked: BoolMap;
  pending: BoolMap;
  toggleLike: (pieceId: string) => void;
}

export function useArtLikes(enabled: boolean): ArtLikesState {
  const [counts, setCounts] = useState<CountMap>({});
  const [liked, setLiked] = useState<BoolMap>({});
  const [pending, setPending] = useState<BoolMap>({});

  const likedRef = useRef(liked);
  const countsRef = useRef(counts);
  const pendingRef = useRef(pending);

  useEffect(() => {
    likedRef.current = liked;
  }, [liked]);

  useEffect(() => {
    countsRef.current = counts;
  }, [counts]);

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;

    async function syncLikes() {
      const localLiked = readStorageMap<BoolMap>(LIKED_STORAGE_KEY) ?? {};
      const localCounts = readStorageMap<CountMap>(COUNTS_STORAGE_KEY) ?? {};
      if (!alive) return;

      setLiked(localLiked);
      if (!API_BASE) {
        setCounts(localCounts);
        return;
      }

      try {
        const clientId = getOrCreateClientId();
        const deviceHash = await getDeviceHash();
        const res = await fetch(
          `${API_BASE}/likes?cid=${encodeURIComponent(clientId)}&did=${encodeURIComponent(deviceHash)}`,
          { method: 'GET', cache: 'no-store' },
        );
        if (!res.ok || !alive) return;
        const data = (await res.json()) as { counts?: CountMap; liked?: BoolMap };
        if (!alive) return;

        if (data.counts) {
          setCounts(data.counts);
          writeStorageMap(COUNTS_STORAGE_KEY, data.counts);
        }
        if (data.liked) {
          setLiked(data.liked);
          writeStorageMap(LIKED_STORAGE_KEY, data.liked);
        }
      } catch {
        // Keep locally cached state if offline or API temporarily unreachable
      }
    }

    void syncLikes();
    return () => {
      alive = false;
    };
  }, [enabled]);

  const toggleLike = useCallback((pieceId: string) => {
    if (pendingRef.current[pieceId]) return;

    const prevLiked = Boolean(likedRef.current[pieceId]);
    const prevCount = countsRef.current[pieceId] ?? 0;
    const nextLiked = !prevLiked;
    const optimisticCount = Math.max(0, prevCount + (nextLiked ? 1 : -1));

    const nextLikedMap: BoolMap = { ...likedRef.current, [pieceId]: nextLiked };
    if (!nextLiked) delete nextLikedMap[pieceId];
    const nextCountsMap: CountMap = { ...countsRef.current, [pieceId]: optimisticCount };

    likedRef.current = nextLikedMap;
    countsRef.current = nextCountsMap;
    pendingRef.current = { ...pendingRef.current, [pieceId]: true };

    setLiked(nextLikedMap);
    setCounts(nextCountsMap);
    setPending((p) => ({ ...p, [pieceId]: true }));
    writeStorageMap(LIKED_STORAGE_KEY, nextLikedMap);

    if (!API_BASE) {
      writeStorageMap(COUNTS_STORAGE_KEY, nextCountsMap);
      pendingRef.current = { ...pendingRef.current, [pieceId]: false };
      setPending((p) => ({ ...p, [pieceId]: false }));
      return;
    }

    void (async () => {
      try {
        const clientId = getOrCreateClientId();
        const deviceHash = await getDeviceHash();
        const res = await fetch(`${API_BASE}/likes/${encodeURIComponent(pieceId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: nextLiked ? 'like' : 'unlike',
            clientId,
            deviceHash,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = (await res.json()) as { count?: number; liked?: boolean };
        const authoritativeLiked = typeof data.liked === 'boolean' ? data.liked : nextLiked;
        const authoritativeCount =
          typeof data.count === 'number' ? Math.max(0, data.count) : optimisticCount;

        setLiked((prev) => {
          const updated = { ...prev, [pieceId]: authoritativeLiked };
          if (!authoritativeLiked) delete updated[pieceId];
          writeStorageMap(LIKED_STORAGE_KEY, updated);
          return updated;
        });
        setCounts((prev) => {
          const updated = { ...prev, [pieceId]: authoritativeCount };
          writeStorageMap(COUNTS_STORAGE_KEY, updated);
          return updated;
        });
      } catch {
        // Rollback optimistic update on failure
        setLiked((prev) => {
          const restored = { ...prev, [pieceId]: prevLiked };
          if (!prevLiked) delete restored[pieceId];
          writeStorageMap(LIKED_STORAGE_KEY, restored);
          return restored;
        });
        setCounts((prev) => ({ ...prev, [pieceId]: prevCount }));
      } finally {
        pendingRef.current = { ...pendingRef.current, [pieceId]: false };
        setPending((p) => ({ ...p, [pieceId]: false }));
      }
    })();
  }, []);

  return { counts, liked, pending, toggleLike };
}
