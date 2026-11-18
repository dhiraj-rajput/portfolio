import { useEffect, useSyncExternalStore } from 'react';

/**
 * Adaptive quality. Every animation keeps running; "low" only trims decorative
 * extras (fewer meteors, static hero glow, slower particle spawn) so low-end
 * laptops and phones stay smooth. The tier is decided from device hints first,
 * then confirmed by measuring real frame times after the intro, and remembered.
 */
export type PerfTier = 'high' | 'low';

const KEY = 'perf-tier';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-perf'] });
  return () => observer.disconnect();
}

const getSnapshot = (): PerfTier =>
  document.documentElement.getAttribute('data-perf') === 'low' ? 'low' : 'high';
const getServerSnapshot = (): PerfTier => 'high';

export function usePerfTier(): PerfTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function setTier(tier: PerfTier) {
  if (tier === 'low') document.documentElement.setAttribute('data-perf', 'low');
  else document.documentElement.removeAttribute('data-perf');
}

/** Run once from <App>: picks the tier from hardware hints, then verifies with a frame-time probe. */
export function useAutoPerformanceTier(): void {
  useEffect(() => {
    let remembered: string | null = null;
    try {
      remembered = localStorage.getItem(KEY);
    } catch {
      // storage unavailable
    }
    if (remembered === 'low') setTier('low');

    const nav = navigator as Navigator & { deviceMemory?: number };
    const weakHardware =
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
    if (weakHardware && remembered !== 'high') setTier('low');

    // Probe real smoothness shortly after the intro has finished.
    let raf = 0;
    let cancelled = false;
    const probe = window.setTimeout(() => {
      const frames: number[] = [];
      let last = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        if (!document.hidden) frames.push(now - last);
        last = now;
        if (frames.length < 90) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const sorted = [...frames].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const p90 = sorted[Math.floor(sorted.length * 0.9)];
        const struggling = median > 24 || p90 > 45;
        const tier: PerfTier = struggling ? 'low' : weakHardware && remembered !== 'high' ? 'low' : 'high';
        // A capable machine with weak hardware hints proves itself: promote back to high.
        const final: PerfTier = !struggling && median < 18 ? 'high' : tier;
        setTier(final);
        try {
          localStorage.setItem(KEY, final);
        } catch {
          // ignore
        }
      };
      raf = requestAnimationFrame(tick);
    }, 3600);

    return () => {
      cancelled = true;
      window.clearTimeout(probe);
      cancelAnimationFrame(raf);
    };
  }, []);
}
