import { ArrowUpRightIcon } from '../icons';
import { Button } from '../Button/Button';
import { flutterScrollTo } from '../../utils/flutterScroll';
import styles from './Hero.module.css';

/** Landing headline, supporting copy, and the two primary CTAs. */
export function Hero() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      flutterScrollTo(href.replace(/^#/, ''));
    }
  };

  return (
    <section id="home" className={styles.hero} aria-label="Introduction">
      <div className={styles.glow} aria-hidden="true" />
      <h1 className={styles.title}>
        Cybersecurity &amp; <span style={{ whiteSpace: 'nowrap' }}>Full-Stack</span> Engineer
      </h1>
      <div className={styles.copy}>
        <p id="hero-summary" className={styles.description}>
          Hi, I'm <strong>Dhiraj Rajput</strong> - a software engineer in Pune building distributed Go &amp; Python backends, real-time data pipelines, and modern React web applications.
        </p>
        <div className={styles.actions}>
          <Button
            href="#projects"
            variant="primary"
            icon={<ArrowUpRightIcon width={20} height={20} />}
            onClick={(e) => handleCtaClick(e, "#projects")}
          >
            Explore Projects
          </Button>
          <Button href="#contact" variant="secondary" onClick={(e) => handleCtaClick(e, "#contact")}>
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
