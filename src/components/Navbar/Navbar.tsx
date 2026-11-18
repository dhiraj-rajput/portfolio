import { useState, useEffect, useRef, startTransition } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import { MenuIcon, CloseIcon } from '../icons';
import { navLinks } from '../../data/navLinks';
import { contactInfo } from '../../data/contact';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { flutterScrollTo } from '../../utils/flutterScroll';
import { assetUrl } from '../../utils/assets';
import { GithubIcon, LinkedinIcon, ResumeIcon, WhatsAppSvg } from './SocialIcons';
import styles from './Navbar.module.css';

const SECTION_IDS = [
  'contact',
  'art',
  'beyond',
  'leadership',
  'research',
  'projects',
  'expertise',
  'experience',
  'about',
];

/**
 * Responsive top navigation bar with RAF-throttled scroll spy,
 * desktop expandable socials, and accessible mobile drawer.
 */
export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Active section tracking: section offsets are cached (no layout reads while scrolling)
  useEffect(() => {
    let ticking = false;
    let tops: Array<{ id: string; top: number }> = [];

    const measure = () => {
      tops = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) tops.push({ id, top: el.getBoundingClientRect().top + window.scrollY });
      }
    };

    const evaluateActiveSection = () => {
      ticking = false;
      if (window.scrollY < 200) {
        startTransition(() => setActiveSection((prev) => (prev === 'home' ? prev : 'home')));
        return;
      }
      const triggerLine = window.scrollY + 160;
      for (const { id, top } of tops) {
        if (triggerLine >= top) {
          startTransition(() => setActiveSection((prev) => (prev === id ? prev : id)));
          return;
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluateActiveSection);
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(() => {
      measure();
      evaluateActiveSection();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', handleScroll, { passive: true });
    evaluateActiveSection();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // Lock page scroll while the mobile drawer is open
  useScrollLock(mobileMenuOpen);

  // Drawer: Escape closes, Tab is trapped inside, focus moves in on open and back to the toggle on close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const drawer = drawerRef.current;
    const toggle = hamburgerRef.current;
    const focusables = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      toggle?.focus();
    };
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
            aria-label="Dhiraj Rajput Home"
          >
            <img src={assetUrl('logo.svg')} alt="" aria-hidden="true" width={56} height={31} className={styles.logoImg} />
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
                  aria-current={isActive ? 'location' : undefined}
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
              rel="noopener noreferrer"
              className={styles.resumeButton}
              aria-label="Download Resume PDF"
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
                rel="noopener noreferrer"
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
                rel="noopener noreferrer"
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
                rel="noopener noreferrer"
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
              ref={hamburgerRef}
              className={styles.hamburgerBtn}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon width={20} height={20} aria-hidden="true" /> : <MenuIcon width={20} height={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileBackdrop} onClick={() => setMobileMenuOpen(false)}>
          <div
            ref={drawerRef}
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
                  rel="noopener noreferrer"
                  className={styles.mobileSocialCard}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </a>

                <a
                  href={contactInfo.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialCard}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.mobileSocialCard} ${styles.mobileWhatsappCard}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <WhatsAppSvg />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={assetUrl(contactInfo.resumeFile)}
                  target="_blank"
                  rel="noopener noreferrer"
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
