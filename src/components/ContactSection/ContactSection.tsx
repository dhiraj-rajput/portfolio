import { useState, useEffect, useRef } from 'react';
import { contactInfo, contactDetailsList } from '../../data/contact';
import styles from './ContactSection.module.css';

/**
 * Contact Section
 *
 * Short, simple, direct contact links with an enchanting interactive
 * hand cursor that guides and clicks through each contact channel one by one!
 */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const detailLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [activeTargetIdx, setActiveTargetIdx] = useState<number>(0);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [handPos, setHandPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  // Intersection Observer to run animation only when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update hand position to current target
  const updateHandToCurrentTarget = () => {
    const inner = innerRef.current;
    if (!inner) return;

    const targets = [ctaBtnRef.current, ...detailLinkRefs.current.filter(Boolean)].filter(
      Boolean
    ) as HTMLElement[];

    if (targets.length === 0) return;

    const currentEl = targets[activeTargetIdx % targets.length];
    if (!currentEl) return;

    const innerRect = inner.getBoundingClientRect();
    const elRect = currentEl.getBoundingClientRect();

    // Aim fingertip (at offset 13px, 2px) to the action area of the target
    const isCta = currentEl === ctaBtnRef.current;
    const targetX =
      elRect.left - innerRect.left + (isCta ? 38 : Math.min(elRect.width * 0.45, 60)) - 13;
    const targetY = elRect.top - innerRect.top + elRect.height / 2 - 4;

    setHandPos({
      x: targetX,
      y: targetY,
      visible: true,
    });
  };

  // Automated Tour Orchestration: Glides to each target and clicks one by one!
  useEffect(() => {
    if (!isInView || isUserHovering) {
      setHandPos((prev) => ({ ...prev, visible: false }));
      return;
    }

    // Step 1: Position hand to active target
    updateHandToCurrentTarget();

    // Step 2: After gliding over (650ms), perform the click down
    const clickTimer = setTimeout(() => {
      setIsClicking(true);
    }, 700);

    // Step 3: Release click after tactile depression (350ms)
    const releaseTimer = setTimeout(() => {
      setIsClicking(false);
    }, 1050);

    // Step 4: Advance to next target after brief hold (450ms)
    const nextTimer = setTimeout(() => {
      const targets = [ctaBtnRef.current, ...detailLinkRefs.current.filter(Boolean)].filter(
        Boolean
      );
      if (targets.length > 0) {
        setActiveTargetIdx((prev) => (prev + 1) % targets.length);
      }
    }, 1500);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(releaseTimer);
      clearTimeout(nextTimer);
    };
  }, [activeTargetIdx, isInView, isUserHovering]);

  // Keep hand aligned on window resize
  useEffect(() => {
    window.addEventListener('resize', updateHandToCurrentTarget);
    return () => window.removeEventListener('resize', updateHandToCurrentTarget);
  }, [activeTargetIdx]);

  return (
    <section id="contact" ref={sectionRef} className={styles.section} aria-label="Contact">
      <div
        ref={innerRef}
        className={styles.inner}
        onMouseEnter={() => setIsUserHovering(true)}
        onMouseLeave={() => setIsUserHovering(false)}
      >
        {/* Floating Smooth Pixel Hand Pointer */}
        <div
          className={styles.handWrapper}
          style={{
            transform: `translate3d(${handPos.x}px, ${handPos.y}px, 0)`,
            opacity: handPos.visible && !isUserHovering ? 1 : 0,
          }}
          aria-hidden="true"
        >
          {/* Pixel Click Sparks Burst */}
          {isClicking && (
            <div className={styles.pixelSparkCluster}>
              <span className={`${styles.pixelSpark} ${styles.sparkN}`} />
              <span className={`${styles.pixelSpark} ${styles.sparkE}`} />
              <span className={`${styles.pixelSpark} ${styles.sparkS}`} />
              <span className={`${styles.pixelSpark} ${styles.sparkW}`} />
              <span className={`${styles.pixelSpark} ${styles.sparkNE}`} />
              <span className={`${styles.pixelSpark} ${styles.sparkNW}`} />
            </div>
          )}

          {/* Crisp Retro Pixel Pointer Hand */}
          <svg
            viewBox="0 0 24 28"
            width="34"
            height="40"
            className={`${styles.pixelHandSvg} ${isClicking ? styles.pixelHandClicking : ''}`}
            fill="none"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {/* Pixel Drop Shadow */}
            <g opacity="0.32" transform="translate(1.5, 2)">
              <rect x="7" y="0" width="5" height="15" fill="#000000" />
              <rect x="5" y="14" width="16" height="12" fill="#000000" />
              <rect x="2" y="14" width="4" height="6" fill="#000000" />
            </g>

            {/* Black Pixel Art Outline */}
            <rect x="7" y="0" width="5" height="1" fill="#09090b" />
            <rect x="6" y="1" width="1" height="14" fill="#09090b" />
            <rect x="12" y="1" width="1" height="11" fill="#09090b" />

            <rect x="13" y="10" width="3" height="1" fill="#09090b" />
            <rect x="16" y="11" width="1" height="9" fill="#09090b" />

            <rect x="16" y="12" width="3" height="1" fill="#09090b" />
            <rect x="19" y="13" width="1" height="9" fill="#09090b" />

            <rect x="19" y="15" width="3" height="1" fill="#09090b" />
            <rect x="22" y="16" width="1" height="7" fill="#09090b" />

            <rect x="3" y="13" width="3" height="1" fill="#09090b" />
            <rect x="2" y="14" width="1" height="5" fill="#09090b" />
            <rect x="3" y="19" width="3" height="1" fill="#09090b" />

            <rect x="5" y="19" width="1" height="6" fill="#09090b" />
            <rect x="22" y="23" width="1" height="3" fill="#09090b" />
            <rect x="6" y="26" width="16" height="1" fill="#09090b" />

            {/* Pure White Pixel Fill (Glove) */}
            <rect x="7" y="1" width="5" height="13" fill="#ffffff" />
            <rect x="6" y="14" width="10" height="10" fill="#ffffff" />
            <rect x="3" y="14" width="3" height="5" fill="#ffffff" />
            <rect x="13" y="11" width="3" height="9" fill="#f8fafc" />
            <rect x="16" y="13" width="3" height="8" fill="#f1f5f9" />
            <rect x="19" y="16" width="3" height="7" fill="#e2e8f0" />

            {/* Pixel Knuckle Divider Lines */}
            <rect x="12" y="12" width="1" height="7" fill="#94a3b8" />
            <rect x="15" y="14" width="1" height="6" fill="#94a3b8" />
            <rect x="18" y="17" width="1" height="4" fill="#94a3b8" />

            {/* Pixel Accent Colored Wristband Cuff */}
            <rect x="6" y="24" width="16" height="2" fill="var(--color-accent)" />
          </svg>
        </div>

        <div className={styles.left}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Open to full-time roles, research collaborations, and interesting problems.
            <br />
            Reach out - I respond within 24 hours.
          </p>

          <a
            ref={ctaBtnRef}
            href={contactInfo.email.href}
            className={`${styles.ctaBtn} ${
              activeTargetIdx === 0 && isClicking ? styles.handClickedBtn : ''
            }`}
            aria-label="Send me an email"
          >
            Send me an Email →
          </a>
        </div>

        <div className={styles.right}>
          <ul className={styles.detailList} role="list">
            {contactDetailsList.map((d, index) => {
              const activeLinks = detailLinkRefs.current.filter(Boolean);
              const currentTargetLink =
                activeTargetIdx > 0 ? activeLinks[activeTargetIdx - 1] : null;
              const isTargeted =
                Boolean(d.href) &&
                Boolean(detailLinkRefs.current[index]) &&
                detailLinkRefs.current[index] === currentTargetLink;
              const isThisClicked = isTargeted && isClicking;

              return (
                <li
                  key={d.label}
                  className={`${styles.detailItem} ${
                    isTargeted ? styles.handTargetRow : ''
                  }`}
                >
                  <span className={styles.detailLabel}>{d.label}</span>
                  {d.href ? (
                    <a
                      ref={(el) => {
                        detailLinkRefs.current[index] = el;
                      }}
                      href={d.href}
                      target={d.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className={`${styles.detailLink} ${
                        isThisClicked ? styles.handClickedLink : ''
                      }`}
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className={styles.detailValue}>{d.value}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
