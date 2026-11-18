import { useSyncExternalStore } from 'react';
import styles from './Footer.module.css';

/**
 * Optional in-site "calm the page" switch. Animations are ON by default for
 * everyone; this only acts when a visitor explicitly turns motion off.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.getAttribute('data-motion') === 'reduced';
const getServerSnapshot = () => false;

export function MotionToggle() {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !reduced;
    if (next) document.documentElement.setAttribute('data-motion', 'reduced');
    else document.documentElement.removeAttribute('data-motion');
    try {
      localStorage.setItem('motion', next ? 'reduced' : 'full');
    } catch {
      // storage may be unavailable
    }
  };

  return (
    <button type="button" className={styles.backToTop} onClick={toggle} aria-pressed={reduced}>
      <span>{reduced ? 'Animations: off' : 'Animations: on'}</span>
    </button>
  );
}
