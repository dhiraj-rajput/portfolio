import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import styles from './ResearchSection.module.css';

export interface MinecraftParticle {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

export interface ParticleHandle {
  /** Add particles, keeping at most `keep` older ones. They remove themselves after 750ms. */
  add: (particles: MinecraftParticle[], keep: number) => void;
  clear: () => void;
}

/**
 * Owns the particle state so that spawning sparks re-renders ONLY this tiny
 * layer instead of the whole Research section (video, cards, SVG).
 */
export function ParticleLayer({ handleRef }: { handleRef: Ref<ParticleHandle> }) {
  const [particles, setParticles] = useState<MinecraftParticle[]>([]);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useImperativeHandle(handleRef, () => ({
    add(batch, keep) {
      setParticles((prev) => [...prev.slice(-keep), ...batch]);
      const t = setTimeout(() => {
        timers.current.delete(t);
        setParticles((prev) => prev.filter((p) => !batch.some((b) => b.id === p.id)));
      }, 750);
      timers.current.add(t);
    },
    clear() {
      setParticles([]);
    },
  }));

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.minecraftPixel}
          style={
            {
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--size': `${p.size}px`,
              '--color': p.color,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
