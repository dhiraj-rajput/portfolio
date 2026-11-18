import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { artPieces, type ArtPiece } from '../../data/art';
import { useScrollLock } from '../../hooks/useScrollLock';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../icons';
import styles from './ArtSection.module.css';

const blockDefault = (e: React.SyntheticEvent) => e.preventDefault();

/** Time the one-line caption is held on screen before the drawing smoothly unfolds (ms). */
const LINE_HOLD_MS = 1100;

/** Track full-resolution lightbox images already fetched & decoded in the background. */
const preloadedFull = new Set<string>();
const inFlightFull = new Map<string, Promise<void>>();

function preloadFullArt(file: string): Promise<void> {
  if (typeof window === 'undefined' || preloadedFull.has(file)) return Promise.resolve();
  const existing = inFlightFull.get(file);
  if (existing) return existing;

  const task = new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = 'async';
    const done = () => {
      preloadedFull.add(file);
      inFlightFull.delete(file);
      resolve();
    };
    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(done, done);
      } else {
        done();
      }
    };
    img.onerror = done;
    img.src = `/art/${file}.webp`;
  });

  inFlightFull.set(file, task);
  return task;
}

/**
 * Casual-copy deterrents only (nothing shown in a browser can be made undownloadable):
 * the image ignores pointer events, cannot be dragged or long-pressed, and carries an
 * invisible watermark plus copyright metadata inside the file itself.
 */
function ArtImage({
  piece,
  thumb,
  eager,
  highPriority,
  onReady,
}: {
  piece: ArtPiece;
  thumb?: boolean;
  eager?: boolean;
  highPriority?: boolean;
  onReady?: (id: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const onReadyRef = useRef(onReady);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let alive = true;
    const markReady = () => {
      if (!alive) return;
      setLoaded(true);
      onReadyRef.current?.(piece.id);
    };
    const handleLoad = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(markReady, markReady);
      } else {
        markReady();
      }
    };
    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad, { once: true });
      img.addEventListener('error', markReady, { once: true });
    }
    return () => {
      alive = false;
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', markReady);
    };
  }, [piece.id, piece.file, thumb]);

  return (
    <span
      className={`${styles.shielded} ${loaded ? styles.shieldedLoaded : ''}`}
      onContextMenu={blockDefault}
      onDragStart={blockDefault}
    >
      <img
        ref={imgRef}
        src={`/art/${piece.file}${thumb ? '-sm' : ''}.webp`}
        alt={`Hand-drawn ${piece.title} by Dhiraj Rajput`}
        width={thumb ? 720 : piece.width}
        height={thumb ? 900 : piece.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={highPriority ? 'high' : undefined}
        draggable={false}
      />
      <span className={styles.shield} aria-hidden="true" />
    </span>
  );
}

export function ArtSection() {
  const [index, setIndex] = useState<number | null>(null);
  // Collapsed by default: no artwork is downloaded until the visitor opens the sketchbook
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [readyId, setReadyId] = useState<string | null>(null);
  const [holdDoneId, setHoldDoneId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  useScrollLock(open);

  const closeLightbox = useCallback(() => {
    setIndex(null);
    setReadyId(null);
    setHoldDoneId(null);
  }, []);

  const openPiece = useCallback((i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setReadyId(null);
    setHoldDoneId(null);
    setIndex(i);
  }, []);

  const toggle = useCallback(() => {
    setMounted(true);
    setExpanded((v) => !v);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setReadyId(null);
    setHoldDoneId(null);
    setIndex((i) => (i === null ? i : (i + dir + artPieces.length) % artPieces.length));
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const opener = openerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open, step, closeLightbox]);

  const active = index !== null ? artPieces[index] : null;

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    // Wait briefly so visible thumbnails get network & main-thread priority while the panel opens,
    // then gently preload & decode the full-resolution lightbox images (2 at a time).
    const startTimer = setTimeout(() => {
      const queue = artPieces.map((p) => p.file);
      const worker = async () => {
        while (!cancelled && queue.length > 0) {
          const next = queue.shift();
          if (next) await preloadFullArt(next);
        }
      };
      void Promise.all([worker(), worker()]);
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [mounted]);

  useEffect(() => {
    if (!active) return;
    const id = active.id;
    const timer = setTimeout(() => {
      setHoldDoneId(id);
    }, LINE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [active]);

  const handleLightboxImageReady = useCallback((id: string) => {
    setReadyId(id);
  }, []);

  const revealed = Boolean(active && readyId === active.id && holdDoneId === active.id);

  return (
    <section id="art" className={styles.section} aria-label="Sketchbook">
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.kicker}>{artPieces.length} drawings</p>
          <h2 className={styles.title}>Sketchbook</h2>
          <p className={styles.subtitle}>
            Hand-drawn Pokémon from my school years, done in pen, marker and pencil. Totally optional: open it if you
            like, or skip it.
          </p>
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls="art-panel"
        >
          <span>{expanded ? 'Hide sketchbook' : 'Open sketchbook'}</span>
          <ChevronRightIcon
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
            width={18}
            height={18}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="art-panel"
        className={`${styles.panel} ${expanded ? styles.panelOpen : ''}`}
        inert={!expanded}
        aria-hidden={!expanded}
      >
        <div className={styles.panelInner}>
          {mounted && (
            <>
              <ul className={styles.grid}>
                {artPieces.map((piece, i) => (
                  <li key={piece.id} className={styles.item}>
                    <button
                      type="button"
                      className={styles.card}
                      onMouseEnter={() => {
                        void preloadFullArt(piece.file);
                      }}
                      onFocus={() => {
                        void preloadFullArt(piece.file);
                      }}
                      onClick={(e) => openPiece(i, e.currentTarget)}
                      aria-label={`View ${piece.title}, ${piece.year}`}
                    >
                      <ArtImage piece={piece} thumb eager />
                      <span className={styles.overlay}>
                        <span className={styles.nameBlock}>
                          <span className={styles.name}>{piece.title}</span>
                          <span className={styles.tagline}>{piece.caption}</span>
                        </span>
                        <span className={styles.year}>{piece.year}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {active &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} (${(index ?? 0) + 1} of ${artPieces.length})`}
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <div key={active.id} className={styles.stage} onClick={(e) => e.stopPropagation()}>
              <div className={`${styles.stageMedia} ${revealed ? styles.stageMediaOpen : ''}`}>
                <div className={styles.stageMediaInner}>
                  <ArtImage piece={active} eager highPriority onReady={handleLightboxImageReady} />
                </div>
              </div>
              <span
                className={`${styles.stageLine} ${revealed ? styles.stageLineOpen : ''}`}
                aria-hidden="true"
              >
                <span className={styles.stageLineBar} />
              </span>
              <div className={styles.caption}>
                <strong>{active.title}</strong>
                <span>{active.caption}</span>
                <span className={styles.counter}>
                  {(index ?? 0) + 1} / {artPieces.length}
                </span>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              className={`${styles.ctrl} ${styles.close}`}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
            >
              <CloseIcon width={20} height={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.ctrl} ${styles.prev}`}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous drawing"
            >
              <ChevronLeftIcon width={22} height={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.ctrl} ${styles.next}`}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next drawing"
            >
              <ChevronRightIcon width={22} height={22} aria-hidden="true" />
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
