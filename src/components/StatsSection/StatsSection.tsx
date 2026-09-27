import { stats } from '../../data/stats';
import { StatCard } from '../StatCard/StatCard';
import { ContactCard } from '../ContactCard/ContactCard';
import styles from './StatsSection.module.css';

/** "Experience / Projects / Certifications" panel with the contact card. */
export function StatsSection() {
  const [first, second, third] = stats;

  return (
    <section id="stats" className={styles.section} aria-label="Key Metrics & Contact">
      <div className={styles.left}>
        <div className={styles.topRow}>
          <StatCard stat={first} />
          <StatCard stat={second} />
        </div>
        <StatCard stat={third} className={styles.wide} />
      </div>
      <div className={styles.right}>
        <ContactCard />
      </div>
    </section>
  );
}
