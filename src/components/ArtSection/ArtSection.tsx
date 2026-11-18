import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { artPieces, type ArtPiece } from '../../data/art';
import { useScrollLock } from '../../hooks/useScrollLock';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../icons';
import styles from './ArtSection.module.css';

const blockDefault = (e: React.SyntheticEvent) => e.preventDefault();

/**
 * Casual-copy deterrents only (nothing shown in a browser can be made undownloadable):
 * the image ignores pointer events, cannot be dragged or long-pressed, and carries an
 * invisible watermark plus copyright metadata inside the file itself.
 */
function ArtImage({ piece, thumb, eager }: { piece: ArtPiece; thumb?: boolean; eager?: boolean }) {
  return (
    <span className={styles.shielded} onContextMenu={blockDefault} onDragStart={blockDefault}>
      <img
        src={`/art/${piece.file}${thumb ? '-sm' : ''}.webp`}
        alt={`Hand-drawn ${piece.title} by Dhiraj Rajput`}
        width={thumb ? 720 : piece.width}
        height={thumb ? 900 : piece.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  useScrollLock(open);

  const toggle = useCallback(() => {
    setMounted(true);
    setExpanded((v) => !v);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i === null ? i : (i + dir + artPieces.length) % artPieces.length));
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const opener = openerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open, step]);

  const active = index !== null ? artPieces[index] : null;

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
                      onClick={(e) => {
                        openerRef.current = e.currentTarget;
                        setIndex(i);
                      }}
                      aria-label={`View ${piece.title}, ${piece.year}`}
                    >
                      <ArtImage piece={piece} thumb />
                      <span className={styles.overlay}>
                        <span className={styles.name}>{piece.title}</span>
                        <span className={styles.year}>{piece.year}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <p className={styles.note}>
                &copy; Dhiraj Rajput. These drawings are my original work and are not licensed for reuse. The
                characters belong to Nintendo, Game Freak and The Pokémon Company.
              </p>
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
            onClick={() => setIndex(null)}
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
            <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
              <ArtImage key={active.id} piece={active} eager />
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
                setIndex(null);
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
