import { useEffect, useState } from 'react';
import { assetUrl } from '../../utils/assets';
import styles from './LoadingScreen.module.css';

/**
 * Animated Logo Loading Screen
 *
 * Uses the actual portfolio logo (`/logo.svg`) with:
 * - 3D levitating emblem entrance
 * - Sweeping metallic/amber light shimmer across the logo
 * - Dual counter-rotating precision orbital rings & glowing aura
 * - Smooth curtain reveal on every page load
 */
export function LoadingScreen() {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const logoSrc = assetUrl('logo.svg');

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    let unmountTimer: ReturnType<typeof setTimeout> | null = null;

    const minDisplayPromise = new Promise<void>((resolve) => {
      exitTimer = setTimeout(resolve, 1450);
    });

    const fontsReadyPromise =
      typeof document !== 'undefined' && 'fonts' in document
        ? Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 1500)),
          ])
        : Promise.resolve();

    Promise.all([minDisplayPromise, fontsReadyPromise]).then(() => {
      setIsExiting(true);
      unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 520);
    });

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.overlayExiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Dhiraj Rajput Portfolio"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.stage}>
        {/* Visual Emblem & Orbital Stage */}
        <div className={styles.emblemStage}>
          <div className={styles.orbitalOuter} aria-hidden="true" />
          <div className={styles.orbitalMiddle} aria-hidden="true" />
          <div className={styles.orbitalInner} aria-hidden="true" />
          <div className={styles.pulseRing} aria-hidden="true" />

          {/* Actual Portfolio Logo with Animated Glow & Shimmer */}
          <div className={styles.logoCard}>
            <div className={styles.logoShimmerMask} aria-hidden="true" />
            <img
              src={logoSrc}
              alt="Dhiraj Rajput Logo"
              className={styles.logoImage}
              width={156}
              height={96}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Brand Identity & Animated Loading Bar */}
        <div className={styles.metaWrap}>
          <span className={styles.brandName}>DHIRAJ RAJPUT</span>
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressBar} />
          </div>
        </div>
      </div>
    </div>
  );
}
