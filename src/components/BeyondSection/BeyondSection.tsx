import {
  Music2,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Plane,
  ChefHat,
  Clapperboard,
  Cpu,
  Shield,
  Volleyball,
  type LucideIcon,
} from 'lucide-react';
import { hobbies } from '../../data/hobbies';
import styles from './BeyondSection.module.css';

/** Map iconName strings to actual Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  Music2,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Plane,
  ChefHat,
  Clapperboard,
  Cpu,
  Shield,
  Volleyball,
};

/**
 * Beyond Engineering Section
 *
 * A human-first look at interests outside of code.
 * Uses Lucide icons for each hobby category.
 */
export function BeyondSection() {
  return (
    <section id="beyond" className={styles.section} aria-label="Beyond Engineering">
      <header className={styles.header}>
        <h2 className={styles.title}>Beyond Engineering</h2>
        <p className={styles.subtitle}>
          The things that fuel the work. Curiosity doesn't stop at the terminal.
        </p>
      </header>

      <div className={styles.grid}>
        {hobbies.map((hobby) => {
          const Icon = iconMap[hobby.iconName];
          return (
            <article key={hobby.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} aria-hidden="true">
                  {Icon && <Icon size={20} strokeWidth={1.75} />}
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
        })}
      </div>
    </section>
  );
}
