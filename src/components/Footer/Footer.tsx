import { navLinks } from '../../data/navLinks';
import { flutterScrollTo } from '../../utils/flutterScroll';
import { assetUrl } from '../../utils/assets';
import styles from './Footer.module.css';

const ArrowUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    flutterScrollTo(0);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      if (targetId === 'home') {
        flutterScrollTo(0);
        return;
      }
      flutterScrollTo(targetId);
    }
  };

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.topDivider} />

      <div className={styles.container}>
        {/* Brand & Bio Column */}
        <div className={styles.brandCol}>
          <div className={styles.brandHeader}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={styles.logoLink}
              aria-label="Scroll to home"
            >
              <img src={assetUrl('logo.svg')} alt="DJ Logo" className={styles.logoImg} />
            </a>
            <div className={styles.brandText}>
              <h3 className={styles.brandName}>Dhiraj Rajput</h3>
              <p className={styles.brandRole}>Cybersecurity &amp; Full-Stack Engineer</p>
            </div>
          </div>

          <p className={styles.brandDesc}>
            Architecting defensive loops, stream telemetry pipelines, and resilient distributed
            systems. Grounded in deterministic reliability over convenient abstractions.
          </p>

          <div className={styles.statusPill}>
            <span className={styles.pulseDot} />
            <span>Available for New Roles &amp; Research</span>
          </div>
        </div>

        {/* Quick Navigation Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linkList} role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={styles.footerLink}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Works & Research Column */}
        <div className={styles.worksCol}>
          <h4 className={styles.colTitle}>Featured Research</h4>
          <ul className={styles.linkList} role="list">
            <li>
              <a
                href="https://doi.org/10.7759/s44389-026-00265-x"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Springer Nature Publication ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhiraj-rajput/rakshak-pii"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                RakshaNetra (LLM Privacy) ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhiraj-rajput/neo-project"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Neo-Analytics (Kafka &amp; Spark) ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhiraj-rajput/rift-agent"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                RIFT Intrusion Framework ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhiraj-rajput/BidForge"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                BidForge (Multi-Agent RFP) ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div className={styles.connectCol}>
          <h4 className={styles.colTitle}>Connect</h4>
          <ul className={styles.linkList} role="list">
            <li>
              <a
                href="mailto:rajputdhiraj1010@gmail.com"
                className={styles.footerLink}
              >
                rajputdhiraj1010@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/917972742879"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                WhatsApp (+91 79727 42879) ↗
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/dhiraj-rajput-"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhiraj-rajput"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={assetUrl('Dhiraj_Rajput_Resume.pdf')}
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Resume PDF ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Dhiraj Rajput. Built with React &amp; TypeScript.
          </p>

          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
