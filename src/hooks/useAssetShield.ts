import { useEffect } from 'react';

/**
 * Light deterrents for casual copying of images and the video: no right-click menu,
 * no drag-out, no long-press save sheet. This does NOT stop someone using DevTools,
 * the network tab or a screenshot - nothing a browser can display can be made
 * undownloadable. The real protection is baked-in watermarks, reduced resolution
 * and not publishing originals (see docs/SECURITY.md).
 */
export function useAssetShield(): void {
  useEffect(() => {
    const isMedia = (t: EventTarget | null) =>
      t instanceof HTMLImageElement || t instanceof HTMLVideoElement || t instanceof HTMLCanvasElement;
    const block = (e: Event) => {
      if (isMedia(e.target) || (e.target instanceof Element && e.target.closest('[data-shield]'))) e.preventDefault();
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('dragstart', block);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('dragstart', block);
    };
  }, []);
}
