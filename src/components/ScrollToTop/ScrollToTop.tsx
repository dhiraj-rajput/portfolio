import { useState, useEffect } from 'react';
import { ArrowUpIcon } from '../icons';
import { flutterScrollTo } from '../../utils/flutterScroll';
import styles from './ScrollToTop.module.css';

/**
 * Floating Back-to-Top Action Button
 *
 * Uses a requestAnimationFrame-throttled passive scroll listener
 * to avoid redundant state updates during fast scrolling.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const shouldShow = window.scrollY > 320;
          setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    flutterScrollTo(0);
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      aria-label="Scroll back to top"
      title="Scroll to top"
    >
      <ArrowUpIcon width={18} height={18} aria-hidden="true" />
    </button>
  );
}
