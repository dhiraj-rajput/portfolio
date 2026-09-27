import type { Project, ProjectCategory } from '../../types';
import { LinkIcon, CodeIcon, ShieldIcon, PulseIcon, CpuIcon, LayersIcon } from '../icons';
import { assetUrl } from '../../utils/assets';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const CATEGORY_COVER: Record<ProjectCategory, { className: string; Icon: typeof ShieldIcon }> = {
  Cybersecurity: { className: styles.coverCyber, Icon: ShieldIcon },
  'Data Engineering': { className: styles.coverData, Icon: PulseIcon },
  'Full-Stack & AI': { className: styles.coverAi, Icon: CpuIcon },
  'SaaS & Automation': { className: styles.coverSaas, Icon: LayersIcon },
  'Computer Vision & LLMs': { className: styles.coverAi, Icon: CpuIcon },
  'Edge AI & Privacy': { className: styles.coverCyber, Icon: ShieldIcon },
};

/**
 * Generated cover for projects with no hand-made artwork: a category-tinted
 * gradient, icon, and the project's own title/tags rendered live from data,
 * so a new project never needs a matching SVG asset.
 */
function GeneratedCover({ project }: { project: Project }) {
  const { className, Icon } = CATEGORY_COVER[project.category] ?? CATEGORY_COVER['Full-Stack & AI'];
  return (
    <div className={`${styles.generatedCover} ${className}`}>
      <Icon className={styles.generatedIcon} />
      <h3 className={styles.generatedTitle}>{project.title}</h3>
      <p className={styles.generatedTags}>{project.tags.slice(0, 4).join(' • ')}</p>
      <span className={styles.generatedBadge}>{project.category}</span>
    </div>
  );
}

/** One case-study card: cover image, title/year, blurb, tags, and links. */
export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.cover}>
        {project.image ? (
          <img src={assetUrl(project.image)} alt={project.title} className={styles.coverImage} />
        ) : (
          <GeneratedCover project={project} />
        )}
        <div className={styles.overlayHint}>Click to view details ↗</div>
      </div>

      <div className={styles.body}>
        <div className={styles.headline}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            <span className={styles.year}>{project.year}</span>
          </div>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.footer}>
          <ul className={styles.tags}>
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View code for ${project.title}`}
                className={styles.iconLink}
                onClick={(e) => e.stopPropagation()}
              >
                <CodeIcon width={17} height={18} />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
                className={styles.iconLink}
                onClick={(e) => e.stopPropagation()}
              >
                <LinkIcon width={17} height={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
