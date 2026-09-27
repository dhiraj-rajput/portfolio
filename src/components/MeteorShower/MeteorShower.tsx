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

function generateMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Spread start positions across the full vertical and horizontal span
    top: Math.random() * 92 - 2,    // -2% to 90% (covers whole scroll height)
    left: Math.random() * 110 - 10,  // -10% to 100%
    duration: 2.0 + Math.random() * 2.8,
    delay: Math.random() * 14,
    length: 90 + Math.random() * 110,
    // 35-48 degrees = falls diagonally top-left to bottom-right
    angle: 35 + Math.random() * 13,
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
