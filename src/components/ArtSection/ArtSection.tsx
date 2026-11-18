import { useEffect, useRef, useState } from 'react';
import { artPieces, type ArtPiece } from '../../data/art';
import { useScrollLock } from '../../hooks/useScrollLock';
import { CloseIcon } from '../icons';
import styles from './ArtSection.module.css';

const blockDefault = (e: React.SyntheticEvent) => e.preventDefault();

/**
 * Deterrents (nothing shown in a browser can be made truly undownloadable):
 * watermark baked into every image, reduced resolution, no originals shipped,
 * dragging / long-press / right-click disabled, and a transparent shield over each picture.
 */
function ArtImage({ piece, thumb }: { piece: ArtPiece; thumb?: boolean }) {
  return (
    <div className={styles.shielded} onContextMenu={blockDefault} onDragStart={blockDefault}>
      <img
        src={`/art/${piece.file}${thumb ? '-sm' : ''}.webp`}
        alt={`Hand-drawn ${piece.title} sketch by Dhiraj Rajput`}
        width={piece.width}
        height={piece.height}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span className={styles.shield} aria-hidden="true" />
    </div>
  );
}

export function ArtSection() {
  const [active, setActive] = useState<ArtPiece | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  useScrollLock(active !== null);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    const opener = openerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [active]);

  return (
    <section id="art" className={styles.section} aria-label="Sketchbook">
      <header className={styles.header}>
        <h2 className={styles.title}>Sketchbook</h2>
        <p className={styles.subtitle}>
          Hand-drawn Pokémon from my school years: pen, marker and pencil on paper.
        </p>
      </header>

      <ul className={styles.grid}>
        {artPieces.map((piece) => (
          <li key={piece.id} className={styles.item}>
            <button
              type="button"
              className={styles.card}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setActive(piece);
              }}
              aria-label={`Open ${piece.title}`}
            >
              <ArtImage piece={piece} thumb />
              <span className={styles.meta}>
                <span className={styles.name}>{piece.title}</span>
                <span className={styles.year}>{piece.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        &copy; Dhiraj Rajput. These drawings are my original work and are not licensed for reuse. Fan art of
        characters owned by Nintendo / Game Freak / The Pokémon Company.
      </p>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div className={styles.lightboxBody} onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <CloseIcon width={20} height={20} aria-hidden="true" />
            </button>
            <ArtImage piece={active} />
            <div className={styles.lightboxCaption}>
              <strong>{active.title}</strong>
              <span>{active.caption}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
