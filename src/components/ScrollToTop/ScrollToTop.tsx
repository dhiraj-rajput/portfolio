import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
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
      <ArrowUp size={18} strokeWidth={2.4} />
    </button>
  );
}
