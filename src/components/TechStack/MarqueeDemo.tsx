import { Marquee } from '@/components/ui/marquee';
import { assetUrl } from '@/utils/assets';
import styles from './MarqueeDemo.module.css';

/**
 * Technology stack from Dhiraj Rajput's resume (Celery and Java removed as requested).
 * Renders PNG images from public/tech/{id}.png, with automatic fallback to public/tech/{id}.svg.
 * Dark monochrome logos (Next.js, GitHub, Flask, Express, Kafka, WordPress) are inverted to white in dark theme.
 * Wrapped in individual divs with prominent borders for clean visual definition.
 */
const TECH_STACK = [
  // Programming Languages
  { id: 'python', name: 'Python' },
  { id: 'golang', name: 'Go' },
  { id: 'cpp', name: 'C++' },
  { id: 'c', name: 'C' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'php', name: 'PHP' },

  // Frameworks & Libraries
  { id: 'react', name: 'React' },
  { id: 'nextjs', name: 'Next.js', darkInvert: true },
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'django', name: 'Django' },
  { id: 'flask', name: 'Flask', darkInvert: true },
  { id: 'express', name: 'Express.js', darkInvert: true },
  { id: 'spring', name: 'Spring Boot' },
  { id: 'angular', name: 'Angular' },
  { id: 'vue', name: 'Vue.js' },

  // Cloud & DevOps Tools
  { id: 'docker', name: 'Docker' },
  { id: 'aws', name: 'AWS' },
  { id: 'git', name: 'Git' },
  { id: 'github', name: 'GitHub', darkInvert: true },
  { id: 'figma', name: 'Figma' },
  { id: 'wordpress', name: 'WordPress', darkInvert: true },
  { id: 'redis', name: 'Redis' },

  // Databases & Big Data Infrastructure
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'mongodb', name: 'MongoDB' },
  { id: 'kafka', name: 'Apache Kafka', darkInvert: true },
  { id: 'spark', name: 'Apache Spark' },
  { id: 'cassandra', name: 'Cassandra' },
];

export function MarqueeDemo() {
  return (
    <div className={styles.marqueeContainer}>
      <Marquee repeat={3} pauseOnHover={false} duration="65s">
        {TECH_STACK.map((tech) => (
          <div key={tech.id} className={styles.itemWrapper}>
            <div className={styles.techCard}>
              <img
                src={assetUrl(`tech/${tech.id}.svg`)}
                alt={`${tech.name} logo`}
                className={`${styles.techLogo} ${tech.darkInvert ? styles.darkInvert : ''}`}
                width={28}
                height={28}
                loading="lazy"
              />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
