import { techDomains } from '../../data/experience';
import styles from './TechExpertiseSection.module.css';

/**
 * Technical Expertise Section
 *
 * Domain-based grid showing technologies applied in real projects.
 */
export function TechExpertiseSection() {
  return (
    <section id="expertise" className={styles.section} aria-label="Technical Expertise">
      <header className={styles.header}>
        <h2 className={styles.title}>Technical Expertise</h2>
        <p className={styles.subtitle}>
          Technologies applied directly across projects, research publications, and security
          operations - mapped by domain.
        </p>
      </header>

      <div className={styles.grid}>
        {techDomains.map((domain) => (
          <article key={domain.id} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.domainTitle}>{domain.category}</h3>
              <span className={styles.stackBadge}>{domain.stack}</span>
            </div>
            <p className={styles.description}>{domain.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
