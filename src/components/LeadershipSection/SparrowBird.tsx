import { useState, useEffect, useRef } from 'react';
import styles from './LeadershipSection.module.css';

type BirdPhase = 'hidden' | 'flyIn' | 'perched' | 'flyOut' | 'gone';

/** The sparrow artwork. Wings flap while flying and fold when perched. */
function BirdSvg({ isFlying, hasLanded }: { isFlying: boolean; hasLanded: boolean }) {
  return (
    <svg
      viewBox="0 0 38 34"
      width="40"
      height="36"
      className={styles.sparrowSvg}
      fill="none"
    >
      <defs>
        <linearGradient id="sparrowBodyGrad" x1="5" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="40%" stopColor="#9a3412" />
          <stop offset="80%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="sparrowChestGrad" x1="15" y1="12" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>

      {/* Far Wing behind body (flaps synchronously, clearly visible!) */}
      <g className={isFlying ? styles.flappingWingFar : styles.foldedWingFar}>
        <path
          d="M13 10 C15 3 22 1 27 5 C24 11 18 17 12 15 Z"
          fill="#5c2605"
          stroke="#3b1704"
          strokeWidth="0.8"
        />
      </g>

      {/* Claws / Feet clutching the button rim */}
      <path
        d="M13 26 L13 31 M11 31 L15 31 M19 26 L19 31 M17 31 L21 31"
        stroke="#92400e"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={hasLanded ? styles.feetPerched : styles.feetTucked}
      />

      {/* Tail feathers */}
      <path
        d="M3 17 L-2 23 L2 25 L8 20 Z"
        fill="#5c2605"
        stroke="#451a03"
        strokeWidth="0.8"
      />

      {/* Plump Sparrow Body */}
      <path
        d="M8 17 C7 11 12 7 20 7 C26 7 29 10 29 15 C29 21 25 26 18 26 C11 26 8 22 8 17 Z"
        fill="url(#sparrowBodyGrad)"
      />

      {/* Soft Buff Chest */}
      <path
        d="M16 14 C16 11 21 10 25 13 C28 16 26 24 21 25 C17 25 16 19 16 14 Z"
        fill="url(#sparrowChestGrad)"
      />

      {/* Dark Throat Bib */}
      <path
        d="M23 14 C23 12 25 12 26 14 C26 17 24 18 23 17 Z"
        fill="#1e293b"
      />

      {/* Round Head & Crown */}
      <circle cx="23.5" cy="9.5" r="6.2" fill="#78350f" />
      <path d="M19 6.5 C21 5 26 5 28 6.5 C27 8.5 20 8.5 19 6.5 Z" fill="#451a03" />

      {/* White facial cheek patch */}
      <ellipse cx="23" cy="11" rx="2.5" ry="2" fill="#fef3c7" opacity="0.9" />

      {/* Eye streak & sharp pupil with sparkle */}
      <ellipse cx="24.5" cy="9" rx="2.5" ry="1.4" fill="#0f172a" />
      <circle cx="24.8" cy="8.8" r="1.3" fill="#0f172a" />
      <circle cx="25.2" cy="8.5" r="0.5" fill="#ffffff" />

      {/* Golden Conical Beak */}
      <polygon points="28.5,9 35,11 28.5,12.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />

      {/* Near Wing with feather bars (wide flapping arc up and down!) */}
      <g className={isFlying ? styles.flappingWingNear : styles.foldedWingNear}>
        <path
          d="M9 13 C11 5 19 3 24 7 C22 14 16 21 8 19 C7 17 8 15 9 13 Z"
          fill="#713f12"
          stroke="#451a03"
          strokeWidth="0.9"
        />
        <path d="M11 11 L18 9 M10 15 L17 13" stroke="#fef3c7" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M8 18 L15 16" stroke="#fed7aa" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
      </g>
    </svg>
  );
}

/**
 * Delightful Wild Sparrow component:
 * 1. Swoops in gracefully along an aerodynamic continuous curve from the upper-left sky
 * 2. Lands softly on the "View All Certificates" button rim and folds wings
 * 3. Sits and idles (cute hops, head tilts, joyful hover bounce) for ~3.2 seconds
 * 4. Pushes off and flies away climbing diagonally into the sky off-screen
 * 5. Automatically loops back after 2.5 seconds and can also be replayed on click!
 */
export function SparrowBird({ trigger }: { trigger: number }) {
  const [phase, setPhase] = useState<BirdPhase>('hidden');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase(trigger > 0 ? 'flyIn' : 'hidden');
    }, 0);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trigger]);

  const handleFlyInEnd = () => {
    setPhase('perched');
    // Sits adorably on the button for 3.2 seconds, then cheerfully takes off into the sky!
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('flyOut');
    }, 3200);
  };

  const handleFlyOutEnd = () => {
    setPhase('gone');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('flyIn');
    }, 2500);
  };

  const handleReplayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('hidden');
    requestAnimationFrame(() => {
      setPhase('flyIn');
    });
  };

  if (phase === 'hidden' || phase === 'gone') {
    return (
      <span
        className={styles.sparrowPerch}
        aria-hidden="true"
        onClick={handleReplayClick}
        title="Click me to see the sparrow fly!"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      />
    );
  }

  return (
    <span
      className={styles.sparrowPerch}
      aria-hidden="true"
      onClick={handleReplayClick}
      title="Click me to see the sparrow fly!"
      style={{ cursor: phase === 'perched' ? 'pointer' : 'default', pointerEvents: 'auto' }}
    >
      {phase === 'flyIn' && (
        <span
          className={styles.birdFlyIn}
          onAnimationEnd={handleFlyInEnd}
        >
          <BirdSvg isFlying hasLanded={false} />
        </span>
      )}

      {phase === 'perched' && (
        <span className={styles.perchedBird}>
          <span className={styles.perchedIdle}>
            <BirdSvg isFlying={false} hasLanded />
          </span>
        </span>
      )}

      {phase === 'flyOut' && (
        <span
          className={styles.birdFlyOut}
          onAnimationEnd={handleFlyOutEnd}
        >
          <BirdSvg isFlying hasLanded={false} />
        </span>
      )}
    </span>
  );
}
