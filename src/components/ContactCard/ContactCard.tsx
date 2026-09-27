import { Button } from '../Button/Button';
import { RobotAvatar } from '../RobotAvatar/RobotAvatar';
import styles from './ContactCard.module.css';

/**
 * Dhiraj Rajput profile card.
 * Features an aligned 3D interactive cursor-tracking avatar stage,
 * credentials, direct social links, and contact CTA.
 */
export function ContactCard() {
  return (
    <div className={styles.card}>
      {/* 3D Avatar Showcase Stage (Properly centered & aligned) */}
      <div className={styles.avatarStage} role="img" aria-label="Interactive 3D robot avatar following your cursor">
        <RobotAvatar />
      </div>

      <div className={styles.text}>
        <h3 className={styles.title}>Dhiraj Rajput</h3>
        <p className={styles.role}>Cybersecurity &amp; Full Stack Developer</p>
        <p className={styles.education}>BTech CSE (Cybersecurity &amp; Forensics) • MIT WPU, Pune</p>
      </div>

      <div className={styles.linksRow}>
        <a
          href="https://github.com/dhiraj-rajput"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/dhiraj-rajput-"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          LinkedIn
        </a>
        <a
          href="mailto:rajputdhiraj1010@gmail.com"
          className={styles.socialLink}
        >
          Email
        </a>
      </div>

      <a href="mailto:rajputdhiraj1010@gmail.com" className={styles.ctaLink}>
        <Button variant="outline">Let's build together →</Button>
      </a>
    </div>
  );
}
