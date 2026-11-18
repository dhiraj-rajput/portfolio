import { useEffect } from 'react';

/**
 * Performance guard: pauses CSS animations of anything that is far off screen
 * and resumes them just before it scrolls back into view. Nothing that is
 * visible is ever paused, and the OS "reduce motion" setting is NOT consulted.
 *
 * Every <section>, <header id> and <footer> is observed with ONE shared
 * IntersectionObserver; the matching CSS lives in index.css
 * (`[data-offscreen="true"] * { animation-play-state: paused }`).
 */
export function useOffscreenPause(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const targets = document.querySelectorAll<HTMLElement>(
      'main section, section[id], header[id], footer, [data-pause-offscreen]',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.offscreen = entry.isIntersecting ? 'false' : 'true';
        }
      },
      { rootMargin: '300px 0px 300px 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
