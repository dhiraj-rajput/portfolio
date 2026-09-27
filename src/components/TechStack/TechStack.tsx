import { MarqueeDemo } from './MarqueeDemo';
import styles from './TechStack.module.css';

/**
 * Technology stack marquee featuring all languages, frameworks,
 * and tools from Dhiraj Rajput's resume in a flowing infinite marquee.
 */
export function TechStack() {
  return (
    <section className={styles.section} aria-label="Technologies and Frameworks">
      <div className={styles.header}>
        <h2 className={styles.heading}>Technologies &amp; Tools</h2>
        <p className={styles.subheading}>
          Languages, frameworks, distributed systems, and tools powering projects
        </p>
      </div>

      <div className={styles.marqueeWrapper}>
        <MarqueeDemo />
      </div>
    </section>
  );
}
