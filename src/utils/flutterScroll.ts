/**
 * Flutter-like Smooth Scroll Physics Engine
 *
 * Emulates Flutter's `Curves.fastOutSlowIn` (Cubic(0.4, 0.0, 0.2, 1.0))
 * for buttery-smooth inertial scrolling between navigation sections.
 *
 * Features:
 * - Dynamic duration scaling based on travel distance
 * - Exact pixel alignment accounting for sticky header height
 * - Non-blocking: cancels immediately if the user touches, wheels, or presses keys
 * - 0 external dependencies, pure 60/120fps requestAnimationFrame
 */

let activeAnimationId: number | null = null;

/**
 * Flutter Curves.fastOutSlowIn cubic bezier solver:
 * Standard Flutter & Material curve: Cubic(0.4, 0.0, 0.2, 1.0)
 */
function fastOutSlowIn(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  const p1x = 0.4;
  const p1y = 0.0;
  const p2x = 0.2;
  const p2y = 1.0;

  // Newton-Raphson solver for parameter s where x(s) = t
  let s = t;
  for (let i = 0; i < 8; i++) {
    const s2 = s * s;
    const s3 = s2 * s;
    const oneMinusS = 1 - s;
    const oneMinusS2 = oneMinusS * oneMinusS;

    const currentX = 3 * oneMinusS2 * s * p1x + 3 * oneMinusS * s2 * p2x + s3;
    const dx = 3 * oneMinusS2 * p1x + 6 * oneMinusS * s * (p2x - p1x) + 3 * s2 * (1 - p2x);

    if (Math.abs(currentX - t) < 1e-5 || Math.abs(dx) < 1e-6) break;
    s -= (currentX - t) / dx;
  }

  s = Math.max(0, Math.min(1, s));
  const s2 = s * s;
  const s3 = s2 * s;
  const oneMinusS = 1 - s;
  const oneMinusS2 = oneMinusS * oneMinusS;

  return 3 * oneMinusS2 * s * p1y + 3 * oneMinusS * s2 * p2y + s3;
}

/**
 * Cancels any active smooth scroll animation.
 */
export function cancelFlutterScroll(): void {
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }
}

// Attach passive event listeners to cancel programmatic scroll on user intervention
if (typeof window !== 'undefined') {
  const cancelEvents = ['wheel', 'touchmove', 'touchstart', 'pointerdown'];
  cancelEvents.forEach((eventType) => {
    window.addEventListener(eventType, cancelFlutterScroll, { passive: true });
  });

  window.addEventListener(
    'keydown',
    (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
        cancelFlutterScroll();
      }
    },
    { passive: true }
  );
}

export interface FlutterScrollOptions {
  /** Custom duration in milliseconds (if omitted, calculated dynamically from distance) */
  duration?: number;
  /** Extra offset in pixels from the top of the viewport (defaults to header height + 16px) */
  offset?: number;
  /** Callback fired when animation finishes smoothly */
  onComplete?: () => void;
}

/**
 * Smoothly scrolls to a numeric Y offset, an HTML element, or a selector/id string
 * using Flutter's `Curves.fastOutSlowIn` curve.
 */
export function flutterScrollTo(
  target: string | number | HTMLElement,
  options?: FlutterScrollOptions
): void {
  if (typeof window === 'undefined') return;

  cancelFlutterScroll();

  let targetY: number;

  if (typeof target === 'number') {
    targetY = target;
  } else {
    let element: HTMLElement | null = null;

    if (typeof target === 'string') {
      const cleanId = target.replace(/^#/, '').trim();
      if (cleanId === 'home' || cleanId === 'top' || cleanId === '') {
        targetY = 0;
      } else {
        element = document.getElementById(cleanId);
        if (!element) {
          try {
            element = document.querySelector(target);
          } catch {
            // invalid selector fallback
          }
        }
      }
    } else if (target instanceof HTMLElement) {
      element = target;
    }

    if (element) {
      // Find actual sticky navbar height dynamically
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 70;

      // Desired spacing below the navbar: 16px
      const verticalOffset = options?.offset ?? (navbarHeight + 16);
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.scrollY || window.pageYOffset;

      targetY = elementRect.top + currentScrollY - verticalOffset;
    } else if (typeof target === 'string' && (target === '#home' || target === 'home')) {
      targetY = 0;
    } else {
      console.warn(`[flutterScroll] Target element not found:`, target);
      return;
    }
  }

  // Clamp within page boundaries
  const maxScroll = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  ) - window.innerHeight;
  targetY = Math.max(0, Math.min(targetY, Math.max(0, maxScroll)));

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;

  // If already at destination, stop
  if (Math.abs(distance) < 2) {
    options?.onComplete?.();
    return;
  }

  // Physics duration: scaled naturally by distance
  // Short jump: ~480ms
  // Mid jump: ~680ms
  // Full page jump: max 850ms
  const travelTime =
    options?.duration ??
    Math.min(850, Math.max(480, Math.round(Math.abs(distance) * 0.28 + 360)));

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / travelTime);
    const easedProgress = fastOutSlowIn(progress);

    const nextPosition = startY + distance * easedProgress;
    window.scrollTo(0, nextPosition);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      activeAnimationId = null;
      options?.onComplete?.();
    }
  }

  activeAnimationId = requestAnimationFrame(step);
}
