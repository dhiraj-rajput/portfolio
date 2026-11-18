import { useEffect, useRef, useState } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import { assetUrl } from '../../utils/assets';
import styles from './LoadingScreen.module.css';

type Phase = 'flip' | 'grow' | 'done';

/** Time the logo spends flipping before it starts to grow (ms). */
const FLIP_MS = 1500;
/** Time the logo/disc takes to fill the screen (ms) - keep in sync with CSS. */
const GROW_MS = 800;
/** Final overlay fade after the screen is flooded - keep in sync with CSS. */
const FADE_MS = 300;
/** Safety cap so a slow font request can never block the page. */
const FONT_WAIT_MAX_MS = 2500;

/**
 * Logo intro:
 *  1. the logo flips around its own vertical axis (3D, transform-only)
 *  2. it scales up until it fills the whole viewport
 *  3. the overlay fades away and the portfolio is revealed
 *
 * Only `transform` and `opacity` are animated, so everything runs on the
 * compositor and never triggers layout or paint.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('flip');
  const [ready, setReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Start the flip only after the logo is loaded + decoded (no first-frame stutter).
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let alive = true;
    const go = () => alive && setReady(true);
    if (img.complete) {
      img.decode().then(go, go);
    } else {
      img.addEventListener('load', () => img.decode().then(go, go), { once: true });
      img.addEventListener('error', go, { once: true });
    }
    return () => {
      alive = false;
    };
  }, []);

  // Page animations behind the overlay stay paused until the reveal (keeps the intro smooth).
  useEffect(() => {
    if (phase === 'done') document.documentElement.removeAttribute('data-loading');
  }, [phase]);
  useEffect(() => () => document.documentElement.removeAttribute('data-loading'), []);

  useEffect(() => {
    if (!ready) return;
    const flipMs = FLIP_MS;
    const growMs = GROW_MS;

    const fontsReady =
      'fonts' in document
        ? Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MAX_MS)),
          ])
        : Promise.resolve();

    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const minFlip = new Promise<void>((resolve) => setTimeout(resolve, flipMs));

    void Promise.all([minFlip, fontsReady]).then(() => {
      if (cancelled) return;
      setPhase('grow');
      doneTimer = setTimeout(() => setPhase('done'), growMs + FADE_MS);
    });

    return () => {
      cancelled = true;
      clearTimeout(doneTimer);
    };
  }, [ready]);

  // Lock page scroll while the intro is on screen.
  useScrollLock(phase !== 'done');

  if (phase === 'done') return null;

  return (
    <div
      className={`${styles.overlay} ${ready ? styles.ready : ''} ${phase === 'grow' ? styles.growing : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Dhiraj Rajput portfolio"
    >
      <div className={styles.disc} aria-hidden="true" />
      <div className={styles.logoScale}>
        <div className={styles.logoFlip}>
          <img
            ref={imgRef}
            src={assetUrl('logo.svg')}
            alt=""
            className={styles.logo}
            width={196}
            height={109}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
