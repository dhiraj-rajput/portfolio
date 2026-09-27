import { researchEntries } from '../../data/research';
import styles from './ResearchSection.module.css';

/**
 * Research & Innovation Section
 *
 * Timeline-style display of published research papers and research projects.
 * Design: clean vertical timeline, consistent with site tokens.
 */
export function ResearchSection() {
  return (
    <section id="research" className={styles.section} aria-label="Research and Innovation">
      <header className={styles.header}>
        <h2 className={styles.title}>Research &amp; Innovation</h2>
        <p className={styles.subtitle}>
          Published work, applied research, and ongoing investigations at the intersection of
          security, AI, and distributed systems.
        </p>
      </header>

      <div className={styles.timeline}>
        {researchEntries.map((entry, index) => (
          <article key={entry.id} className={styles.entry}>
            {/* Timeline spine connector */}
            <div className={styles.spine} aria-hidden="true">
              <div className={styles.spineDot} />
              {index < researchEntries.length - 1 && <div className={styles.spineLine} />}
            </div>

            {/* Entry Card */}
            <div className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.categoryBadge}>{entry.category}</span>
                <span className={styles.yearBadge}>{entry.year}</span>
              </div>

              <h3 className={styles.entryTitle}>{entry.title}</h3>
              <p className={styles.venue}>{entry.venue}</p>
              <p className={styles.description}>{entry.description}</p>

              {/* Media Preview: Video or Screenshot */}
              {entry.videoUrl ? (
                <div className={styles.mediaWrap}>
                  <video
                    src={entry.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className={styles.mediaVideo}
                  />
                  <span className={styles.mediaCaption}>Live Demonstration Video: Assistive Blind Navigation</span>
                </div>
              ) : entry.image ? (
                <div className={styles.mediaWrap}>
                  <img
                    src={entry.image}
                    alt={`${entry.title} Preview`}
                    className={styles.mediaImg}
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className={styles.footer}>
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {entry.link && entry.link !== '#' && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.readLink}
                    aria-label={`${entry.actionLabel || 'View Project ↗'}: ${entry.title}`}
                  >
                    {entry.actionLabel || 'View Project ↗'}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
