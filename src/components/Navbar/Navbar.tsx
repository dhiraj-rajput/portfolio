import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { contactInfo } from '../../data/contact';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { flutterScrollTo } from '../../utils/flutterScroll';
import { assetUrl } from '../../utils/assets';
import styles from './Navbar.module.css';

const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={styles.actionIcon}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={styles.actionIcon}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const ResumeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={styles.actionIcon}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="12" y2="18" />
    <line x1="15" y1="15" x2="12" y2="18" />
  </svg>
);

const WhatsAppSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true"
    className={styles.actionIcon}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * Responsive top navigation bar with:
 * - Desktop: horizontal links + expandable action buttons + theme toggle
 * - Mobile / Tablet: clean single-row header + modern slide-down drawer with full tap targets
 */
export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active section tracking on scroll
  useEffect(() => {
    const sectionIds = [
      'contact',
      'beyond',
      'leadership',
      'research',
      'projects',
      'expertise',
      'experience',
      'about',
    ];

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // Use getBoundingClientRect() + window.scrollY for document-relative
      // position — el.offsetTop is relative to offsetParent (<main>) and
      // will always be exceeded once user scrolls past the hero zone.
      const triggerLine = window.scrollY + 160;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (triggerLine >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      setActiveSection(targetId);
      setMobileMenuOpen(false);

      if (targetId === 'home') {
        flutterScrollTo(0);
        return;
      }
      flutterScrollTo(targetId);
    }
  };

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.inner}>
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={styles.logo}
            aria-label="Home"
          >
            <img src={assetUrl('logo.svg')} alt="DJ Logo" className={styles.logoImg} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => {
              const targetId = link.href.replace(/^#/, '');
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={isActive ? styles.linkActive : styles.link}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className={styles.rightActions}>
            {/* Resume Button */}
            <a
              href={assetUrl(contactInfo.resumeFile)}
              target="_blank"
              rel="noreferrer"
              className={styles.resumeButton}
              aria-label="Download Resume"
              title="Download Resume PDF"
            >
              <ResumeIcon />
              <span className={styles.resumeText}>Resume</span>
            </a>

            {/* Desktop-only expandable social icons */}
            <div className={styles.desktopSocials}>
              {/* GitHub */}
              <a
                href={contactInfo.github.url}
                target="_blank"
                rel="noreferrer"
                className={styles.expandableButton}
                aria-label="GitHub Profile"
                title="View GitHub Profile"
              >
                <GithubIcon />
                <span className={styles.expandLabel}>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={contactInfo.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className={styles.expandableButton}
                aria-label="LinkedIn Profile"
                title="Connect on LinkedIn"
              >
                <LinkedinIcon />
                <span className={styles.expandLabel}>LinkedIn</span>
              </a>

              {/* WhatsApp */}
              <a
                href={contactInfo.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className={`${styles.expandableButton} ${styles.whatsappExpandable}`}
                aria-label="Contact on WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppSvg />
                <span className={styles.expandLabel}>WhatsApp</span>
              </a>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileBackdrop} onClick={() => setMobileMenuOpen(false)}>
          <div
            className={styles.mobileDrawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Mobile Nav Links */}
            <nav className={styles.mobileNavList}>
              {navLinks.map((link) => {
                const targetId = link.href.replace(/^#/, '');
                const isActive = activeSection === targetId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className={styles.activeDot} />}
                  </a>
                );
              })}
            </nav>

            <div className={styles.mobileDivider} />

            {/* Mobile Quick Social & Contact Cards */}
            <div className={styles.mobileDrawerFooter}>
              <p className={styles.mobileDrawerTitle}>Get In Touch</p>
              <div className={styles.mobileSocialGrid}>
                <a
                  href={contactInfo.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mobileSocialCard}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </a>

                <a
                  href={contactInfo.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mobileSocialCard}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.mobileSocialCard} ${styles.mobileWhatsappCard}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <WhatsAppSvg />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={assetUrl(contactInfo.resumeFile)}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mobileSocialCard}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ResumeIcon />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
