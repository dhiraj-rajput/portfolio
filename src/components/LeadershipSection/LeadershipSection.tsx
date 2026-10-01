import { useState, useEffect, useRef } from 'react';
import { leadershipEntries } from '../../data/experience';
import styles from './LeadershipSection.module.css';

type AnimalType = 'cat' | 'dog' | 'panda' | 'fox' | 'bear' | 'bunny' | 'koala';

const ANIMAL_ORDER: AnimalType[] = ['cat', 'dog', 'panda', 'fox', 'bear', 'bunny', 'koala'];

/**
 * Adorable Vector Animal Ball component
 */
function AnimalBallSvg({ type }: { type: AnimalType }) {
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

type BirdPhase = 'hidden' | 'flyIn' | 'perched' | 'flyOut' | 'gone';

/** The sparrow artwork. Wings flap while flying and fold when perched. */
function BirdSvg({ isFlying, hasLanded }: { isFlying: boolean; hasLanded: boolean }) {
  return (
    <svg
        viewBox="0 0 38 34"
        width="40"
        height="36"
        className={styles.sparrowSvg}
        fill="none"
      >
        <defs>
          <linearGradient id="sparrowBodyGrad" x1="5" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="40%" stopColor="#9a3412" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <linearGradient id="sparrowChestGrad" x1="15" y1="12" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
        </defs>
  
        {/* Far Wing behind body (flaps synchronously, clearly visible!) */}
        <g className={isFlying ? styles.flappingWingFar : styles.foldedWingFar}>
          <path
            d="M13 10 C15 3 22 1 27 5 C24 11 18 17 12 15 Z"
            fill="#5c2605"
            stroke="#3b1704"
            strokeWidth="0.8"
          />
        </g>
  
        {/* Claws / Feet clutching the button rim */}
        <path
          d="M13 26 L13 31 M11 31 L15 31 M19 26 L19 31 M17 31 L21 31"
          stroke="#92400e"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={hasLanded ? styles.feetPerched : styles.feetTucked}
        />
  
        {/* Tail feathers */}
        <path
          d="M3 17 L-2 23 L2 25 L8 20 Z"
          fill="#5c2605"
          stroke="#451a03"
          strokeWidth="0.8"
        />
  
        {/* Plump Sparrow Body */}
        <path
          d="M8 17 C7 11 12 7 20 7 C26 7 29 10 29 15 C29 21 25 26 18 26 C11 26 8 22 8 17 Z"
          fill="url(#sparrowBodyGrad)"
        />
  
        {/* Soft Buff Chest */}
        <path
          d="M16 14 C16 11 21 10 25 13 C28 16 26 24 21 25 C17 25 16 19 16 14 Z"
          fill="url(#sparrowChestGrad)"
        />
  
        {/* Dark Throat Bib */}
        <path
          d="M23 14 C23 12 25 12 26 14 C26 17 24 18 23 17 Z"
          fill="#1e293b"
        />
  
        {/* Round Head & Crown */}
        <circle cx="23.5" cy="9.5" r="6.2" fill="#78350f" />
        <path d="M19 6.5 C21 5 26 5 28 6.5 C27 8.5 20 8.5 19 6.5 Z" fill="#451a03" />
  
        {/* White facial cheek patch */}
        <ellipse cx="23" cy="11" rx="2.5" ry="2" fill="#fef3c7" opacity="0.9" />
  
        {/* Eye streak & sharp pupil with sparkle */}
        <ellipse cx="24.5" cy="9" rx="2.5" ry="1.4" fill="#0f172a" />
        <circle cx="24.8" cy="8.8" r="1.3" fill="#0f172a" />
        <circle cx="25.2" cy="8.5" r="0.5" fill="#ffffff" />
  
        {/* Golden Conical Beak */}
        <polygon points="28.5,9 35,11 28.5,12.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />
  
        {/* Near Wing with feather bars (wide flapping arc up and down!) */}
        <g className={isFlying ? styles.flappingWingNear : styles.foldedWingNear}>
          <path
            d="M9 13 C11 5 19 3 24 7 C22 14 16 21 8 19 C7 17 8 15 9 13 Z"
            fill="#713f12"
            stroke="#451a03"
            strokeWidth="0.9"
          />
          <path d="M11 11 L18 9 M10 15 L17 13" stroke="#fef3c7" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
          <path d="M8 18 L15 16" stroke="#fed7aa" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
        </g>
      </svg>
  );
}

/**
 * Delightful Wild Sparrow component:
 * 1. Swoops in gracefully along an aerodynamic continuous curve from the upper-left sky
 * 2. Lands softly on the "View All Certificates" button rim and folds wings
 * 3. Sits and idles (cute hops, head tilts, joyful hover bounce) for ~3.2 seconds
 * 4. Pushes off and flies away climbing diagonally into the sky off-screen
 * 5. Replays when scrolled back into view or when clicked!
 */
function SparrowBird({ trigger }: { trigger: number }) {
  const [phase, setPhase] = useState<BirdPhase>('hidden');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (trigger > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase('flyIn');
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase('hidden');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trigger]);

  const handleFlyInEnd = () => {
    setPhase('perched');
    // Sits adorably on the button for 3.2 seconds, then cheerfully takes off into the sky!
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('flyOut');
    }, 3200);
  };

  const handleFlyOutEnd = () => {
    setPhase('gone');
  };

  const handleReplayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('hidden');
    requestAnimationFrame(() => {
      setPhase('flyIn');
    });
  };

  if (phase === 'hidden' || phase === 'gone') {
    return (
      <span
        className={styles.sparrowPerch}
        aria-hidden="true"
        onClick={handleReplayClick}
        title="Click me to see the sparrow fly!"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      />
    );
  }

  return (
    <span
      className={styles.sparrowPerch}
      aria-hidden="true"
      onClick={handleReplayClick}
      title="Click me to see the sparrow fly!"
      style={{ cursor: phase === 'perched' ? 'pointer' : 'default', pointerEvents: 'auto' }}
    >
      {phase === 'flyIn' && (
        <span
          className={styles.birdFlyIn}
          onAnimationEnd={handleFlyInEnd}
        >
          <BirdSvg isFlying hasLanded={false} />
        </span>
      )}

      {phase === 'perched' && (
        <span className={styles.perchedBird}>
          <span className={styles.perchedIdle}>
            <BirdSvg isFlying={false} hasLanded />
          </span>
        </span>
      )}

      {phase === 'flyOut' && (
        <span
          className={styles.birdFlyOut}
          onAnimationEnd={handleFlyOutEnd}
        >
          <BirdSvg isFlying hasLanded={false} />
        </span>
      )}
    </span>
  );
}

/**
 * Leadership & Recognition Section
 *
 * Each row is pushed into place like a brick by cute rolling animal balls:
 * - Alternating from left and right (Cat, Dog, Panda, Fox, Bear, Bunny, Koala).
 * - Outside the card: Animals roll in the outer gutters, NEVER overlapping or covering the text!
 * - When scrolled out of bounds: Animals roll back in, take the rows back, and reset!
 * - When scrolled into view: Animation automatically repeats afresh!
 * - A wild sparrow swoops in along a curve from the left, perches on the "View All Certificates"
 *   button, and flies off into the sky.
 */
export function LeadershipSection() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [birdTrigger, setBirdTrigger] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Settle delay of 250ms when the certificates button enters view, then swoop!
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              setBirdTrigger((prev) => prev + 1);
            }, 250);
          } else {
            if (timer) clearTimeout(timer);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
            setIsExiting(false);
            setIsTriggered(true);
          } else {
            // When scrolled out of bounds (above or below), animals take the rows back!
            setIsExiting(true);
            exitTimerRef.current = setTimeout(() => {
              setIsTriggered(false);
              setIsExiting(false);
            }, 1100);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className={styles.section}
      aria-label="Leadership and Recognition"
    >
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>Leadership &amp; Recognition</h2>
            <p className={styles.subtitle}>
              Hackathon wins, peer-reviewed publications, and industry certifications.
            </p>
          </div>

        </div>
      </header>

      <div className={styles.card}>
        <ul className={styles.list} role="list">
          {leadershipEntries.map((entry, index) => {
            const animalType = ANIMAL_ORDER[index % ANIMAL_ORDER.length];
            const isFromLeft = index % 2 === 0; // Even rows from left, odd rows from right
            const delayMs = index * 280;

            let rowClass = styles.initialHidden;
            if (isTriggered && !isExiting) {
              rowClass = isFromLeft ? styles.animateFromLeft : styles.animateFromRight;
            } else if (isExiting) {
              rowClass = isFromLeft ? styles.animateExitLeft : styles.animateExitRight;
            }

            return (
              <li
                key={entry.id}
                className={`${styles.itemWrapper} ${rowClass}`}
                style={{ '--anim-delay': `${delayMs}ms` } as React.CSSProperties}
              >
                {/* Rolling Animal Ball (Stationed in the outer gutter OUTSIDE the card, pushes from the outside!) */}
                <div
                  className={`${styles.animalRoller} ${
                    isFromLeft ? styles.rollerLeft : styles.rollerRight
                  }`}
                  aria-hidden="true"
                >
                  <AnimalBallSvg type={animalType} />
                </div>

                {/* The Certificate / Achievement Row Content (pushed into place like a brick) */}
                <div className={styles.itemContent}>
                  <span className={styles.category}>{entry.category}</span>
                  <span className={styles.entryTitle}>
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.entryLink}
                      >
                        {entry.title} ↗
                      </a>
                    ) : (
                      entry.title
                    )}
                  </span>
                  <span className={styles.year}>{entry.year}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Google Drive Repository Link for All Certificates with Perched Sparrow */}
        <div ref={footerRef} className={styles.driveFooter}>
          <a
            href="https://drive.google.com/drive/folders/1ugIqPA7SVXRZmXlh6HnrGdqVUFpoHeaw?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className={styles.driveButton}
          >
            {/* The Sparrow sits comfortably on top of the button */}
            <SparrowBird trigger={birdTrigger} />
            <span>View All Certificates &amp; Credentials</span>
            <span className={styles.driveArrow}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
