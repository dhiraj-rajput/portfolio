import { useEffect } from 'react';
import type { Project, ProjectCategory } from '../../types';
import { CloseIcon, CodeIcon, LinkIcon, ShieldIcon, PulseIcon, CpuIcon, LayersIcon } from '../icons';
import { Button } from '../Button/Button';
import { assetUrl } from '../../utils/assets';
import styles from './ProjectModal.module.css';

const CATEGORY_BANNER: Record<ProjectCategory, { className: string; Icon: typeof ShieldIcon }> = {
  Cybersecurity: { className: styles.bannerCyber, Icon: ShieldIcon },
  'Data Engineering': { className: styles.bannerData, Icon: PulseIcon },
  'Full-Stack & AI': { className: styles.bannerAi, Icon: CpuIcon },
  'SaaS & Automation': { className: styles.bannerSaas, Icon: LayersIcon },
  'Computer Vision & LLMs': { className: styles.bannerAi, Icon: CpuIcon },
  'Edge AI & Privacy': { className: styles.bannerCyber, Icon: ShieldIcon },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close project details"
        >
          <CloseIcon width={20} height={20} />
        </button>

        <div className={styles.imageContainer}>
          {project.image ? (
            <img src={assetUrl(project.image)} alt={project.title} className={styles.bannerImg} />
          ) : (
            (() => {
              const { className, Icon } = CATEGORY_BANNER[project.category] ?? CATEGORY_BANNER['Full-Stack & AI'];
              return (
                <div className={`${styles.generatedBanner} ${className}`}>
                  <Icon className={styles.generatedBannerIcon} />
                </div>
              );
            })()
          )}
          <span className={styles.yearTag}>{project.year}</span>
        </div>

        <div className={styles.body}>
          <h2 id="modal-title" className={styles.title}>
            {project.title}
          </h2>

          <p className={styles.description}>{project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Key Highlights &amp; Architecture</h3>
              <ul className={styles.highlightsList}>
                {project.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.bullet}>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Technologies &amp; Tools</h3>
            <div className={styles.tagList}>
              {(project.toolsUsed || project.tags).map((tool) => (
                <span key={tool} className={styles.tag}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.actionLink}
              >
                <Button variant="primary" icon={<CodeIcon width={18} height={18} />}>
                  View Repository
                </Button>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.actionLink}
              >
                <Button variant="secondary" icon={<LinkIcon width={18} height={18} />}>
                  Live Demo
                </Button>
              </a>
            )}
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
