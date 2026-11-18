import { useMemo } from 'react';
import styles from './MeteorShower.module.css';

interface Meteor {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  length: number;
  angle: number;
}

/** Small seeded PRNG so server-rendered and client markup are identical. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateMeteors(count: number): Meteor[] {
  const random = mulberry32(20261118);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Spread start positions across the full vertical and horizontal span
    top: random() * 92 - 2,    // -2% to 90% (covers whole scroll height)
    left: random() * 110 - 10,  // -10% to 100%
    duration: 2.0 + random() * 2.8,
    delay: random() * 14,
    length: 90 + random() * 110,
    // 35-48 degrees = falls diagonally top-left to bottom-right
    angle: 35 + random() * 13,
  }));
}

/**
 * MeteorShower
 *
 * Animated meteor shower background - rendered BEHIND all content via z-index.
 * Meteors fall diagonally top-left → bottom-right.
 */
export function MeteorShower({ count = 20 }: { count?: number }) {
  const meteors = useMemo(() => generateMeteors(count), [count]);

  return (
    <div className={styles.canvas} aria-hidden="true">
      {meteors.map((m) => (
        <span
          key={m.id}
          className={styles.meteor}
          style={
            {
              '--top': `${m.top}%`,
              '--left': `${m.left}%`,
              '--duration': `${m.duration}s`,
              '--delay': `${m.delay}s`,
              '--length': `${m.length}px`,
              '--angle': `${m.angle}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
