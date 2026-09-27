import { ArrowUpRightIcon } from '../icons';
import { Button } from '../Button/Button';
import { flutterScrollTo } from '../../utils/flutterScroll';
import styles from './Hero.module.css';

/** Landing headline, supporting copy, and the two primary CTAs. */
export function Hero() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      flutterScrollTo(href);
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <h1 className={styles.title}>
        Cybersecurity &amp; Full Stack Developer
      </h1>
      <div className={styles.copy}>
        <p className={styles.description}>
          Hi, I'm Dhiraj Rajput. Building secure, resilient web architectures, real-time data streaming pipelines, and high-performance digital experiences. Specializing in Go, Python, React, Next.js, and offensive/defensive cybersecurity tools.
        </p>
        <div className={styles.actions}>
          <a href="#projects" onClick={(e) => handleCtaClick(e, '#projects')}>
            <Button variant="primary" icon={<ArrowUpRightIcon width={20} height={20} />}>
              Explore Projects
            </Button>
          </a>
          <a href="#contact" onClick={(e) => handleCtaClick(e, '#contact')}>
            <Button variant="secondary">Get in touch</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
