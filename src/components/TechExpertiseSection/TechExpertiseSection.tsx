import { useState, useEffect, useRef } from 'react';
import { techDomains } from '../../data/experience';
import styles from './TechExpertiseSection.module.css';

const cardSuits = ['♠', '♦', '♣', '♥', '★', '⚡'];

/**
 * Technical Expertise Section
 *
 * Playing card deck spread animation:
 * Cards remain stacked in the center until the user actually scrolls the deck
 * into full view. Then, they deal out one by one smoothly and slowly.
 */
export function TechExpertiseSection() {
  const [isSpread, setIsSpread] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger spread reliably on all device heights & aspect ratios as soon as deck enters
          if (entry.isIntersecting) {
            setIsSpread(true);
          } else {
            // Re-stack when out of view so it animates again when scrolled back
            setIsSpread(false);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '60px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" className={styles.section} aria-label="Technical Expertise">
      <span id="tech" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Technical Expertise</h2>
          <p className={styles.subtitle}>
            Core technical stack and domains applied across projects and production systems.
          </p>
        </div>
      </header>

      {/* Attach ref to the deck stage itself so it only spreads when cards are directly in view */}
      <div
        ref={deckRef}
        className={`${styles.deckStage} ${isSpread ? styles.isSpread : styles.isStacked}`}
      >
        <div className={styles.grid}>
          {techDomains.map((domain, index) => (
            <article
              key={domain.id}
              className={`${styles.card} ${styles[`card${index}`]}`}
              style={{ '--card-idx': index } as React.CSSProperties}
            >
              <div className={styles.cardGlow} aria-hidden="true" />

              <div className={styles.cardHeader}>
                <span className={styles.cardIndexBadge}>0{index + 1}</span>
                <span className={styles.cardSuit} aria-hidden="true">
                  {cardSuits[index % cardSuits.length]}
                </span>
              </div>

              <div className={styles.cardTop}>
                <h3 className={styles.domainTitle}>{domain.category}</h3>
                <span className={styles.stackBadge}>{domain.stack}</span>
              </div>

              <p className={styles.description}>{domain.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
