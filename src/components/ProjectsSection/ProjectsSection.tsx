import { useState, useEffect, useCallback, useRef } from 'react';
import { projects } from '../../data/projects';
import { CodeIcon, LinkIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
import styles from './ProjectsSection.module.css';

/**
 * Projects Section with Ultra-Smooth GPU Drag & Throw Physics
 *
 * Direct DOM transforms running at 120fps with zero React re-render overhead during drag.
 * Cards fling and throw left or right to switch projects with elastic spring mechanics.
 */
export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardRef = useRef<HTMLElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentDxRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const total = projects.length;
  const currentProject = projects[currentIndex];

  /**
   * Smoothly throw the current card and bring in the target project card
   */
  const throwCard = useCallback(
    (direction: 'left' | 'right', target: 'next' | 'prev' = 'next') => {
      const card = cardRef.current;
      if (!card || isAnimating) return;

      setIsAnimating(true);
      const throwOutX = direction === 'left' ? -window.innerWidth * 0.9 : window.innerWidth * 0.9;
      const throwRotate = direction === 'left' ? -22 : 22;

      // 1. Throw current card off-screen in the drag direction
      card.style.transition = 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.28s ease';
      card.style.transform = `translate3d(${throwOutX}px, 0, 0) rotate(${throwRotate}deg)`;
      card.style.opacity = '0';

      // 2. Change project index and slide in from opposite edge
      setTimeout(() => {
        if (target === 'next') {
          setCurrentIndex((prev) => (prev + 1) % total);
        } else {
          setCurrentIndex((prev) => (prev - 1 + total) % total);
        }

        const enterFromX = direction === 'left' ? 120 : -120;
        const enterRotate = direction === 'left' ? 8 : -8;

        // Position incoming card off-center
        card.style.transition = 'none';
        card.style.transform = `translate3d(${enterFromX}px, 0, 0) rotate(${enterRotate}deg) scale(0.94)`;
        card.style.opacity = '0';

        // Force browser reflow to register position
        void card.offsetHeight;

        // Glide smoothly into center position
        requestAnimationFrame(() => {
          card.style.transition =
            'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease';
          card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
          card.style.opacity = '1';

          setTimeout(() => {
            setIsAnimating(false);
            currentDxRef.current = 0;
          }, 420);
        });
      }, 300);
    },
    [isAnimating, total]
  );

  const handleNext = useCallback(() => {
    throwCard('left', 'next');
  }, [throwCard]);

  const handlePrev = useCallback(() => {
    throwCard('right', 'prev');
  }, [throwCard]);

  // Pointer drag events - Direct 120fps GPU updates with RAF
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (isAnimating) return;

    // Prevent drag when clicking on interactive links, buttons, or dots
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, [role="tab"]')) {
      return;
    }

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    currentDxRef.current = 0;

    const card = cardRef.current;
    if (card) {
      card.style.transition = 'none';
      card.style.cursor = 'grabbing';
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || isAnimating) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // Only engage horizontal drag if horizontal motion exceeds vertical
    if (Math.abs(dx) > Math.abs(dy) || Math.abs(dx) > 8) {
      currentDxRef.current = dx;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;

        const rotation = (dx / 320) * 14;
        card.style.transform = `translate3d(${dx}px, 0, 0) rotate(${rotation}deg) scale(0.99)`;
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const card = cardRef.current;
    if (card) {
      card.style.cursor = 'grab';
    }

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignored
    }

    const dx = currentDxRef.current;
    const throwThreshold = 75; // Velocity / distance threshold to fling

    if (dx < -throwThreshold) {
      // Dragged left -> throws left and advances to next project
      throwCard('left', 'next');
    } else if (dx > throwThreshold) {
      // Dragged right -> throws right and ALSO advances to next project
      throwCard('right', 'next');
    } else {
      // Elastic spring back to center
      if (card) {
        card.style.transition =
          'transform 0.48s cubic-bezier(0.175, 0.885, 0.32, 1.25), opacity 0.3s ease';
        card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
        card.style.opacity = '1';
      }
      currentDxRef.current = 0;
    }
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    const card = cardRef.current;
    if (card) {
      card.style.cursor = 'grab';
      card.style.transition =
        'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25), opacity 0.3s ease';
      card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
      card.style.opacity = '1';
    }
    currentDxRef.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      const sectionEl = document.getElementById('projects');
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }
      }

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

        {/* Counter and Drag Cue in Header */}
        <div className={styles.counterBlock}>
          <span className={styles.counter}>
            <span className={styles.counterActive}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(total).padStart(2, '0')}
          </span>
          <div className={styles.dragHintBadge} aria-hidden="true">
            <span>⇄ Flick or drag card</span>
          </div>
        </div>
      </div>

      {/* Showcase Stage with Left and Right Nav Buttons */}
      <div className={styles.stage}>
        {/* Left Side Navigation Arrow */}
        <button
          type="button"
          className={`${styles.sideNavBtn} ${styles.sideNavLeft}`}
          onClick={handlePrev}
          aria-label="Previous project"
          title="Previous project (←)"
        >
          <ChevronLeftIcon width={22} height={22} />
        </button>

        {/* Draggable & Throw Card Track */}
        <div className={styles.cardTrack}>
          <article
            ref={cardRef}
            className={styles.showcaseCard}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
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
                    className={`${styles.stepDot} ${
                      idx === currentIndex ? styles.stepDotActive : ''
                    }`}
                    onClick={() => {
                      if (idx > currentIndex) throwCard('left', 'next');
                      else if (idx < currentIndex) throwCard('right', 'prev');
                    }}
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
                    {currentProject.highlights.map((item) => (
                      <li key={item} className={styles.highlightItem}>
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

            {/* Card Footer (Repository & Live Links) */}
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

              <div className={styles.cardBottomHint}>
                <span>Swipe left / right to flick card</span>
              </div>
            </div>
          </article>
        </div>

        {/* Right Side Navigation Arrow */}
        <button
          type="button"
          className={`${styles.sideNavBtn} ${styles.sideNavRight}`}
          onClick={handleNext}
          aria-label="Next project"
          title="Next project (→)"
        >
          <ChevronRightIcon width={22} height={22} />
        </button>
      </div>
    </section>
  );
}
