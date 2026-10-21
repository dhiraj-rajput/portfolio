/**
 * Flutter-like Smooth Scroll Physics Engine
 *
 * Emulates Flutter's `Curves.fastOutSlowIn` (Cubic(0.4, 0.0, 0.2, 1.0))
 * for buttery-smooth inertial scrolling between navigation sections.
 *
 * Features:
 * - Dynamic duration scaling based on travel distance
 * - Exact pixel alignment with live target tracking during scroll
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
  /** Extra offset in pixels from the top of the viewport (defaults to 16px) */
  offset?: number;
  /** Callback fired when animation finishes smoothly */
  onComplete?: () => void;
}

function resolveTargetY(
  element: HTMLElement | null,
  numericTarget: number | null,
  verticalOffset: number
): number {
  const maxScroll = Math.max(
    0,
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
      window.innerHeight
  );

  if (element) {
    const currentScrollY = window.scrollY || window.pageYOffset;
    const rawY = element.getBoundingClientRect().top + currentScrollY - verticalOffset;
    return Math.max(0, Math.min(rawY, maxScroll));
  }

  return Math.max(0, Math.min(numericTarget ?? 0, maxScroll));
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

  let element: HTMLElement | null = null;
  let numericTarget: number | null = null;

  if (typeof target === 'number') {
    numericTarget = target;
  } else if (typeof target === 'string') {
    const cleanId = target.replace(/^#/, '').trim();
    if (cleanId === 'home' || cleanId === 'top' || cleanId === '') {
      numericTarget = 0;
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

  if (!element && numericTarget === null) {
    console.warn(`[flutterScroll] Target element not found:`, target);
    return;
  }

  // Tight top spacing (16px) so sections align right near the top without leaving a gap
  const verticalOffset = options?.offset ?? 16;
  const initialTargetY = resolveTargetY(element, numericTarget, verticalOffset);

  const startY = window.scrollY || window.pageYOffset;
  const initialDistance = initialTargetY - startY;

  // If already at destination, stop
  if (Math.abs(initialDistance) < 2) {
    options?.onComplete?.();
    return;
  }

  // Physics duration: scaled naturally by distance
  const travelTime =
    options?.duration ??
    Math.min(850, Math.max(480, Math.round(Math.abs(initialDistance) * 0.28 + 360)));

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / travelTime);
    const easedProgress = fastOutSlowIn(progress);

    // Re-evaluate live target position so any layout/image updates never cause an offset error
    const liveTargetY = resolveTargetY(element, numericTarget, verticalOffset);
    const nextPosition = startY + (liveTargetY - startY) * easedProgress;
    window.scrollTo(0, nextPosition);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, liveTargetY);
      activeAnimationId = null;
      options?.onComplete?.();
    }
  }

  activeAnimationId = requestAnimationFrame(step);
}
