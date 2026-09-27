import { experiences } from '../../data/experience';
import styles from './ExperienceSection.module.css';

/**
 * Professional Experience Section
 *
 * Clean card timeline showing internship and work history.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className={styles.section} aria-label="Professional Experience">
      <header className={styles.header}>
        <h2 className={styles.title}>Professional Experience</h2>
        <p className={styles.subtitle}>
          Engineering assignments, internships, and operational deployments.
        </p>
      </header>

      <div className={styles.list}>
        {experiences.map((exp) => (
          <article key={exp.id} className={styles.card}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.typeBadge}>{exp.type}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <p className={styles.company}>
                  {exp.website ? (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.companyLink}
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}
                  &nbsp;&middot;&nbsp; {exp.location}
                </p>
              </div>
              <span className={styles.period}>{exp.period}</span>
            </div>

            <div className={styles.divider} />

            {/* Responsibilities */}
            <div className={styles.responsibilities}>
              {exp.responsibilities.map((r) => (
                <div key={r.heading} className={styles.responsibility}>
                  <h4 className={styles.respHeading}>{r.heading}</h4>
                  <p className={styles.respDetail}>{r.detail}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
