import { useState, useEffect, useRef } from 'react';
import { leadershipEntries } from '../../data/experience';
import { AnimalBallSvg } from './AnimalBallSvg';
import { ANIMAL_ORDER } from './animals';
import { SparrowBird } from './SparrowBird';
import styles from './LeadershipSection.module.css';

/**
 * Leadership & Recognition Section
 *
 * Each row is pushed into place like a brick by cute rolling animal balls:
 * - Alternating from left and right (Cat, Dog, Panda, Fox, Bear, Bunny, Koala).
 * - Outside the card: Animals roll in the outer gutters, NEVER overlapping or covering the text!
 * - When scrolled out of bounds: Animals roll back in, take the rows back, and reset!
 * - When scrolled into view: Animation automatically repeats afresh!
 * - A wild sparrow swoops in along a curve from the left, perches on the "View All Certificates"
 *   button, and flies off into the sky repeatedly.
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
                        rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
