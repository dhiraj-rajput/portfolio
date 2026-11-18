import { useEffect } from 'react';

let lockCount = 0;
let previousOverflow = '';

/** Ref-counted page scroll lock: several components can lock at once without clobbering each other. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    if (lockCount === 0) previousOverflow = html.style.overflow;
    lockCount += 1;
    html.style.overflow = 'hidden';
    return () => {
      lockCount -= 1;
      if (lockCount === 0) html.style.overflow = previousOverflow;
    };
  }, [locked]);
}
