import { useState, useEffect, useRef } from 'react';
import { engineerData } from '../../data/about';
import { assetUrl } from '../../utils/assets';
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
  const principlesRef = useRef<HTMLElement>(null);
  const [isTideFlowing, setIsTideFlowing] = useState(false);

  useEffect(() => {
    const el = principlesRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTideFlowing(true);
          } else {
            setIsTideFlowing(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
                    <div key={`${item.institution}-${item.period}`} className={styles.eduItem}>
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
                  src={assetUrl(profile.avatarUrl)}
                  alt="Dhiraj Rajput — Cybersecurity and Full-Stack Engineer"
                  className={styles.avatarImage}
                  width={280}
                  height={280}
                  loading="lazy"
                  decoding="async"
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
              {quickFacts.map((fact) => (
                <div key={fact.label} className={styles.specRow}>
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

        {/* Row 2: Core Engineering Principles with Tidal Water Wave Animation */}
        <section
          ref={principlesRef}
          className={`${styles.principlesSection} ${isTideFlowing ? styles.tideActive : ''}`}
          aria-label="Core Engineering Principles"
        >
          {/* Luminous Ocean Tide Water Wave Surge Background */}
          <div className={styles.tideContainer} aria-hidden="true">
            <div className={styles.tideSurge}>
              {/* Deep Ocean Wave */}
              <svg className={`${styles.tideSvg} ${styles.backWave}`} viewBox="0 0 1440 96" preserveAspectRatio="none">
                <path d="M0,32 C240,64 480,8 720,40 C960,72 1200,16 1440,48 L1440,96 L0,96 Z" />
              </svg>
              {/* Mid Turquoise Wave */}
              <svg className={`${styles.tideSvg} ${styles.midWave}`} viewBox="0 0 1440 96" preserveAspectRatio="none">
                <path d="M0,48 C200,16 440,68 680,36 C920,4 1160,56 1440,28 L1440,96 L0,96 Z" />
              </svg>
              {/* Surface Foam Crest */}
              <svg className={`${styles.tideSvg} ${styles.foamWave}`} viewBox="0 0 1440 96" preserveAspectRatio="none">
                <path d="M0,56 C160,32 360,72 560,44 C760,16 1000,64 1200,36 C1320,20 1380,48 1440,40 L1440,96 L0,96 Z" />
              </svg>
            </div>
          </div>

          <h3 className={styles.sectionBlockTitle}>{principlesHeading}</h3>

          <div className={styles.principlesGrid}>
            {principles.map((p, idx) => {
              const delayMs = idx * 160;
              return (
                <div
                  key={p.id}
                  className={`${styles.principleCard} ${
                    isTideFlowing ? styles.cardCarried : styles.cardSubmerged
                  }`}
                  style={{ '--card-tide-delay': `${delayMs}ms` } as React.CSSProperties}
                >
                  <span className={styles.principleNumber}>{p.number}</span>
                  <h4 className={styles.principleTitle}>{p.title}</h4>
                  <p className={styles.principleText}>{p.statement}</p>

                  {/* Water Bed at the base of the card */}
                  <div className={styles.cardWaterBed} aria-hidden="true">
                    <svg className={styles.cardWaveSvg} viewBox="0 0 400 24" preserveAspectRatio="none">
                      <path d="M0,8 C80,18 160,-2 240,10 C320,22 360,4 400,12 L400,24 L0,24 Z" />
                    </svg>
                    <svg className={`${styles.cardWaveSvg} ${styles.cardWaveSecondary}`} viewBox="0 0 400 24" preserveAspectRatio="none">
                      <path d="M0,12 C100,2 200,18 300,6 C350,0 380,14 400,8 L400,24 L0,24 Z" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

