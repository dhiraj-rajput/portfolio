import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { flutterScrollTo } from '../../utils/flutterScroll';
import styles from './ScrollToTop.module.css';

/**
 * Floating Back-to-Top Action Button
 *
 * Positioned fixed at the bottom-right of the viewport.
 * Smoothly fades in when user scrolls down > 300px.
 * Smoothly scrolls user back to the top of the page when clicked.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
