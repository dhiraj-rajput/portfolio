import styles from './LeadershipSection.module.css';

export type AnimalType = 'cat' | 'dog' | 'panda' | 'fox' | 'bear' | 'bunny' | 'koala';

/**
 * Adorable Vector Animal Ball component
 */
export function AnimalBallSvg({ type }: { type: AnimalType }) {
  switch (type) {
    case 'cat':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <polygon points="6,12 11,2 16,11" fill="#f97316" />
          <polygon points="8,11 11,5 14,10" fill="#fbcfe8" />
          <polygon points="20,11 25,2 30,12" fill="#f97316" />
          <polygon points="22,10 25,5 28,11" fill="#fbcfe8" />
          <circle cx="18" cy="20" r="13" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
          <circle cx="13" cy="19" r="2.2" fill="#1e293b" />
          <circle cx="13.7" cy="18.3" r="0.8" fill="#ffffff" />
          <circle cx="23" cy="19" r="2.2" fill="#1e293b" />
          <circle cx="23.7" cy="18.3" r="0.8" fill="#ffffff" />
          <polygon points="18,22.5 16.5,21 19.5,21" fill="#f43f5e" />
          <path d="M16 23.5 Q18 25 20 23.5" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
          <line x1="5" y1="20" x2="11" y2="21" stroke="#9a3412" strokeWidth="1" />
          <line x1="5" y1="23" x2="11" y2="23" stroke="#9a3412" strokeWidth="1" />
          <line x1="25" y1="21" x2="31" y2="20" stroke="#9a3412" strokeWidth="1" />
          <line x1="25" y1="23" x2="31" y2="23" stroke="#9a3412" strokeWidth="1" />
        </svg>
      );
    case 'dog':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <ellipse cx="6" cy="19" rx="4" ry="7" fill="#b45309" transform="rotate(-15 6 19)" />
          <ellipse cx="30" cy="19" rx="4" ry="7" fill="#b45309" transform="rotate(15 30 19)" />
          <circle cx="18" cy="19" r="13" fill="#fcd34d" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="13" cy="17" r="2.2" fill="#1e293b" />
          <circle cx="13.7" cy="16.3" r="0.8" fill="#ffffff" />
          <circle cx="23" cy="17" r="2.2" fill="#1e293b" />
          <circle cx="23.7" cy="16.3" r="0.8" fill="#ffffff" />
          <ellipse cx="18" cy="22" rx="4.5" ry="3.5" fill="#fef3c7" />
          <ellipse cx="18" cy="20.5" rx="2.2" ry="1.5" fill="#1e293b" />
          <path d="M17 24 Q18 28 19 24" fill="#f43f5e" />
        </svg>
      );
    case 'panda':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <circle cx="8" cy="9" r="4.5" fill="#1e293b" />
          <circle cx="28" cy="9" r="4.5" fill="#1e293b" />
          <circle cx="18" cy="19" r="13" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="12.5" cy="17.5" rx="3.5" ry="4" fill="#1e293b" transform="rotate(-15 12.5 17.5)" />
          <ellipse cx="23.5" cy="17.5" rx="3.5" ry="4" fill="#1e293b" transform="rotate(15 23.5 17.5)" />
          <circle cx="12.8" cy="17.2" r="1.3" fill="#ffffff" />
          <circle cx="23.2" cy="17.2" r="1.3" fill="#ffffff" />
          <ellipse cx="18" cy="22" rx="2" ry="1.4" fill="#1e293b" />
          <path d="M16.5 24 Q18 25.5 19.5 24" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'fox':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <polygon points="6,12 11,1 17,10" fill="#ea580c" />
          <polygon points="8,10 11,4 14,9" fill="#1e293b" />
          <polygon points="19,10 25,1 30,12" fill="#ea580c" />
          <polygon points="22,9 25,4 28,10" fill="#1e293b" />
          <circle cx="18" cy="19" r="13" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M7 23 C11 26 15 24 18 27 C21 24 25 26 29 23 C29 29 23 31 18 31 C13 31 7 29 7 23 Z" fill="#ffffff" />
          <circle cx="13" cy="17" r="2" fill="#1e293b" />
          <circle cx="23" cy="17" r="2" fill="#1e293b" />
          <circle cx="18" cy="26" r="1.8" fill="#1e293b" />
        </svg>
      );
    case 'bear':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <circle cx="8" cy="9" r="4.2" fill="#78350f" />
          <circle cx="8" cy="9" r="2.2" fill="#d97706" />
          <circle cx="28" cy="9" r="4.2" fill="#78350f" />
          <circle cx="28" cy="9" r="2.2" fill="#d97706" />
          <circle cx="18" cy="19" r="13" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
          <ellipse cx="18" cy="22.5" rx="5" ry="4" fill="#fde68a" />
          <ellipse cx="18" cy="21" rx="2.5" ry="1.7" fill="#1e293b" />
          <circle cx="12.5" cy="16.5" r="2" fill="#1e293b" />
          <circle cx="23.5" cy="16.5" r="2" fill="#1e293b" />
        </svg>
      );
    case 'bunny':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <ellipse cx="12" cy="7" rx="3" ry="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <ellipse cx="12" cy="7" rx="1.8" ry="5" fill="#f472b6" />
          <ellipse cx="24" cy="7" rx="3" ry="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <ellipse cx="24" cy="7" rx="1.8" ry="5" fill="#f472b6" />
          <circle cx="18" cy="21" r="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="13" cy="20" r="2" fill="#1e293b" />
          <circle cx="23" cy="20" r="2" fill="#1e293b" />
          <polygon points="18,24 16.8,22.5 19.2,22.5" fill="#f43f5e" />
          <circle cx="10" cy="23" r="2" fill="#fbcfe8" opacity="0.8" />
          <circle cx="26" cy="23" r="2" fill="#fbcfe8" opacity="0.8" />
        </svg>
      );
    case 'koala':
      return (
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className={styles.animalSvg}>
          <circle cx="7" cy="11" r="5" fill="#94a3b8" />
          <circle cx="7" cy="11" r="3" fill="#f1f5f9" />
          <circle cx="29" cy="11" r="5" fill="#94a3b8" />
          <circle cx="29" cy="11" r="3" fill="#f1f5f9" />
          <circle cx="18" cy="20" r="13" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          <ellipse cx="18" cy="22" rx="3.5" ry="5" fill="#1e293b" />
          <circle cx="11.5" cy="18" r="1.8" fill="#1e293b" />
          <circle cx="24.5" cy="18" r="1.8" fill="#1e293b" />
        </svg>
      );
  }
}
