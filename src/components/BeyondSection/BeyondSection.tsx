import { useRef, useEffect } from 'react';
import { hobbies, type HobbyItem } from '../../data/hobbies';
import { CinemaIcon, TechCpuIcon, BookPagesIcon, GamepadIcon, BallIcon, MedalIcon } from './HobbyIcons';
import styles from './BeyondSection.module.css';

/**
 * Interactive 3D Tilt Card with zero-rerender 120fps direct DOM cursor spotlight & hover micro-interactions
 */
function InteractiveHobbyCard({ hobby }: { hobby: HobbyItem }) {
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;
      const rx = (-normY * 6.5).toFixed(2);
      const ry = (normX * 6.5).toFixed(2);

      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    }
  };

  const isActive = true;

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardSpotlight} aria-hidden="true" />

      <div className={styles.cardTop}>
        <div className={styles.iconWrap} aria-hidden="true">
          {hobby.id === 'h1' && <CinemaIcon isHovered={isActive} />}
          {hobby.id === 'h2' && <TechCpuIcon isHovered={isActive} />}
          {hobby.id === 'h3' && <BookPagesIcon isHovered={isActive} />}
          {hobby.id === 'h4' && <GamepadIcon isHovered={isActive} />}
          {hobby.id === 'h5' && <BallIcon isHovered={isActive} />}
          {hobby.id === 'h6' && <MedalIcon isHovered={isActive} />}
        </div>
        <span className={styles.category}>{hobby.category}</span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.hobbyTitle}>{hobby.title}</h3>
        <p className={styles.hobbyDesc}>{hobby.description}</p>
      </div>

      {hobby.tags && hobby.tags.length > 0 && (
        <div className={styles.tags}>
          {hobby.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/**
 * Beyond Engineering Section
 *
 * 120fps GPU-accelerated tilt cards with dynamic cursor spotlight,
 * reflecting personal disciplines and passions outside of pure code.
 */
export function BeyondSection() {
  return (
    <section id="beyond" className={styles.section} aria-label="Beyond Engineering">
      <header className={styles.header}>
        <h2 className={styles.title}>Beyond Engineering</h2>
        <p className={styles.subtitle}>
          Curiosity and discipline outside the terminal.
        </p>
      </header>

      <div className={styles.grid}>
        {hobbies.map((hobby) => (
          <InteractiveHobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </section>
  );
}
