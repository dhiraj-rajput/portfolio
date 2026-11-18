import styles from './ProjectsSection.module.css';

interface ProjectDotsProps {
  projects: ReadonlyArray<{ id: string | number; title: string }>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

/** Step dots: real buttons with aria-current and a 44px touch target (see .stepDot::after). */
export function ProjectDots({ projects, currentIndex, onSelect }: ProjectDotsProps) {
  return (
    <div className={styles.stepDots} role="group" aria-label="Choose project">
      {projects.map((p, idx) => (
        <button
          key={p.id}
          type="button"
          aria-current={idx === currentIndex ? 'true' : undefined}
          aria-label={`Go to ${p.title}`}
          className={`${styles.stepDot} ${idx === currentIndex ? styles.stepDotActive : ''}`}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
  );
}
