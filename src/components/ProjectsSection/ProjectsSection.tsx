import { useState, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { CodeIcon, LinkIcon } from '../icons';
import styles from './ProjectsSection.module.css';

/**
 * Single Project Showcase Section
 * 
 * Displays one project at a time with in-depth architecture and details.
 * Navigable via next/prev buttons, step dots, and keyboard arrow keys.
 * No pop-up modal required.
 */
export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = projects.length;
  const currentProject = projects[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation with ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!currentProject) return null;

  return (
    <section id="projects" className={styles.section} aria-label="Projects">
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2 className={styles.heading}>Projects</h2>
          <p className={styles.subheading}>
            Architectures, frameworks, and applications I've engineered
          </p>
        </div>

        {/* Counter and Header Navigation */}
        <div className={styles.navControls}>
          <span className={styles.counter}>
            <span className={styles.counterActive}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(total).padStart(2, '0')}
          </span>

          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              aria-label="Previous project"
              title="Previous project (←)"
            >
              ← Prev
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNext}
              aria-label="Next project"
              title="Next project (→)"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Single Project Showcase Card */}
      <article className={styles.showcaseCard}>
        <div className={styles.cardGlow} aria-hidden="true" />

        {/* Card Header (Category, Year, and Step Dots) */}
        <div className={styles.cardHeader}>
          <div className={styles.metaGroup}>
            <span className={styles.categoryBadge}>{currentProject.category}</span>
            <span className={styles.yearBadge}>{currentProject.year}</span>
          </div>

          <div className={styles.stepDots} role="tablist" aria-label="Projects navigation dots">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to ${p.title}`}
                className={`${styles.stepDot} ${idx === currentIndex ? styles.stepDotActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          <div className={styles.titleSection}>
            <h3 className={styles.projectTitle}>{currentProject.title}</h3>
            <p className={styles.projectDescription}>{currentProject.description}</p>
          </div>

          {/* Key Architecture Highlights */}
          {currentProject.highlights && currentProject.highlights.length > 0 && (
            <div className={styles.highlightsSection}>
              <h4 className={styles.highlightsHeading}>Architecture &amp; Key Highlights</h4>
              <ul className={styles.highlightsList}>
                {currentProject.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.highlightBullet}>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies & Tools */}
          <div className={styles.toolsSection}>
            <span className={styles.toolsLabel}>Technologies &amp; Tools</span>
            <div className={styles.toolsList}>
              {(currentProject.toolsUsed || currentProject.tags).map((tool) => (
                <span key={tool} className={styles.toolTag}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer (Repository & Live Links + Next/Prev Navigation) */}
        <div className={styles.cardFooter}>
          <div className={styles.linksGroup}>
            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                aria-label={`View repository for ${currentProject.title}`}
              >
                <CodeIcon width={17} height={17} />
                <span>View Repository</span>
              </a>
            )}
            {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                aria-label={`View live demo for ${currentProject.title}`}
              >
                <LinkIcon width={17} height={17} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <div className={styles.cardNavGroup}>
            <button
              type="button"
              className={styles.bottomNavBtn}
              onClick={handlePrev}
              aria-label="Previous project"
            >
              ← Previous
            </button>
            <button
              type="button"
              className={styles.bottomNavBtn}
              onClick={handleNext}
              aria-label="Next project"
            >
              Next →
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
