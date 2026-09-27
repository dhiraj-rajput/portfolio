import { useState } from 'react';
import { engineerData } from '../../data/about';
import styles from './AboutSection.module.css';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Modern Developer Bento About Section
 * Inspired by high-end portfolio bento layouts, completely free of artificial boxes/stamps.
 */
export function AboutSection() {
  const [imgError, setImgError] = useState(false);
  const {
    title,
    subtitle,
    profile,
    quickFacts,
    bioParagraphs,
    bioHighlightKeywords,
    education,
    principlesHeading,
    principles,
    focusHeading,
    focusAreas,
  } = engineerData;

  /**
   * Seamlessly renders keywords as bold text without awkward boxes or backgrounds.
   */
  const renderBioText = (text: string) => {
    if (!bioHighlightKeywords || bioHighlightKeywords.length === 0) {
      return text;
    }

    const sortedKeywords = [...bioHighlightKeywords].sort(
      (a, b) => b.length - a.length
    );
    const pattern = new RegExp(
      `(${sortedKeywords.map(escapeRegExp).join('|')})`,
      'g'
    );
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const isMatch = bioHighlightKeywords.some(
        (kw) => kw.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <strong key={index} className={styles.bioHighlight}>
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="about" className={styles.section} aria-label="About Me">
      {/* Section Header */}
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Row 1: Story Narrative + Profile Card */}
        <div className={styles.heroRow}>
          {/* Narrative Story Card */}
          <article className={styles.storyCard}>
            <div className={styles.storyHeader}>
              <span className={styles.storyBadge}>Background &amp; Ethos</span>
            </div>

            <div className={styles.storyContent}>
              {bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className={styles.paragraph}>
                  {renderBioText(paragraph)}
                </p>
              ))}
            </div>

            {/* Education Journey Timeline */}
            {education && education.length > 0 && (
              <div className={styles.educationBlock}>
                <div className={styles.educationHeader}>
                  <span className={styles.educationBadge}>Education Journey</span>
                </div>
                <div className={styles.educationTimeline}>
                  {education.map((item, idx) => (
                    <div key={idx} className={styles.eduItem}>
                      <div className={styles.eduGutter}>
                        <div className={styles.eduDot} />
                        {idx < education.length - 1 && <div className={styles.eduLine} />}
                      </div>
                      <div className={styles.eduContent}>
                        <div className={styles.eduRowTop}>
                          <h4 className={styles.eduInstitution}>{item.institution}</h4>
                          <span className={styles.eduPeriod}>{item.period}</span>
                        </div>
                        <p className={styles.eduDegree}>{item.degree}</p>
                        <div className={styles.eduMeta}>
                          <span className={styles.eduGrade}>{item.grade}</span>
                          {item.location && (
                            <span className={styles.eduLocation}>• {item.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Profile & Identity Card */}
          <aside className={styles.profileCard}>
            <div className={styles.profileTop}>
              <span className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                {profile.status}
              </span>
            </div>

            <div className={styles.photoStage}>
              {profile.avatarUrl && !imgError ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className={styles.avatarImage}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.fallbackAvatar}>
                  <div className={styles.fallbackRing}>
                    <span className={styles.fallbackMonogram}>DR</span>
                  </div>
                  <span className={styles.fallbackNameTag}>{profile.name}</span>
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <h3 className={styles.name}>{profile.name}</h3>
              <p className={styles.role}>{profile.role}</p>
            </div>

            <div className={styles.quickSpecsList}>
              {quickFacts.map((fact, index) => (
                <div key={index} className={styles.specRow}>
                  <span className={styles.specLabel}>{fact.label}</span>
                  <span
                    className={`${styles.specValue} ${
                      fact.highlight ? styles.specAccent : ''
                    }`}
                  >
                    {fact.href ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.specLink}
                      >
                        {fact.value} ↗
                      </a>
                    ) : (
                      fact.value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Row 2: Core Engineering Principles */}
        <section className={styles.principlesSection} aria-label="Core Engineering Principles">
          <h3 className={styles.sectionBlockTitle}>{principlesHeading}</h3>
          <div className={styles.principlesGrid}>
            {principles.map((p) => (
              <div key={p.id} className={styles.principleCard}>
                <span className={styles.principleNumber}>{p.number}</span>
                <h4 className={styles.principleTitle}>{p.title}</h4>
                <p className={styles.principleText}>{p.statement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Row 3: Focus & Research Grid */}
        <section className={styles.focusSection} aria-label="Areas of Focus and Research">
          <h3 className={styles.sectionBlockTitle}>{focusHeading}</h3>
          <div className={styles.focusGrid}>
            {focusAreas.map((area) => (
              <article key={area.id} className={styles.focusCard}>
                <div className={styles.focusTop}>
                  <span className={styles.focusCategory}>{area.category}</span>
                  <h4 className={styles.focusHeading}>{area.title}</h4>
                  <p className={styles.focusDesc}>{area.description}</p>
                </div>

                {area.tags && area.tags.length > 0 && (
                  <div className={styles.focusTags}>
                    {area.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
