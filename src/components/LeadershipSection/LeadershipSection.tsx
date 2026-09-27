import { leadershipEntries } from '../../data/experience';
import styles from './LeadershipSection.module.css';

/**
 * Leadership & Recognition Section
 *
 * Table-style list of awards, publications, certifications.
 * RenAIssance 2025 and Patent ID entry are intentionally excluded.
 */
export function LeadershipSection() {
  return (
    <section id="leadership" className={styles.section} aria-label="Leadership and Recognition">
      <header className={styles.header}>
        <h2 className={styles.title}>Leadership &amp; Recognition</h2>
        <p className={styles.subtitle}>
          Milestones across academic competitions, certifications, and industry recognitions.
        </p>
      </header>

      <div className={styles.card}>
        <ul className={styles.list} role="list">
          {leadershipEntries.map((entry) => (
            <li key={entry.id} className={styles.item}>
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
            </li>
          ))}
        </ul>

        {/* Google Drive Repository Link for All Certificates */}
        <div className={styles.driveFooter}>
          <a
            href="https://drive.google.com/drive/folders/1ugIqPA7SVXRZmXlh6HnrGdqVUFpoHeaw?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className={styles.driveButton}
          >
            <span>View All Certificates &amp; Credentials</span>
            <span className={styles.driveArrow}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
