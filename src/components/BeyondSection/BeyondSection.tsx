import { useState, useRef, useEffect } from 'react';
import { hobbies, type HobbyItem } from '../../data/hobbies';
import styles from './BeyondSection.module.css';

/**
 * 1. Cinema Clapperboard: Clapper opens wide and snaps shut with a crisp mechanical clap!
 */
function CinemaIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.cinemaIconWrap} ${isHovered ? styles.cinemaClapping : ''}`}>
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none" className={styles.cinemaSvg}>
        {/* Bottom Slate */}
        <g className={styles.cinemaSlate}>
          <rect x="2" y="10" width="24" height="15" rx="3" fill="currentColor" opacity="0.16" />
          <rect x="2" y="10" width="24" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
          <line x1="2" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
          <line x1="8" y1="16" x2="8" y2="25" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
          <line x1="16" y1="16" x2="16" y2="25" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
        </g>

        {/* Top Clapper Stick (hinged at left (2, 10)) */}
        <g className={styles.clapperStick}>
          <rect x="2" y="4" width="24" height="6.5" rx="2" fill="currentColor" opacity="0.25" />
          <rect x="2" y="4" width="24" height="6.5" rx="2" stroke="currentColor" strokeWidth="2" />
          <line x1="7" y1="4" x2="5" y2="10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="4" x2="11" y2="10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="4" x2="17" y2="10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="4" x2="23" y2="10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Impact shockwave bursts when clapped shut */}
        <g className={styles.clapImpact}>
          <path d="M-1 2 L3 5 M29 2 L25 5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="14" cy="2" r="1.5" fill="var(--color-accent)" />
          <path d="M14 0 L14 -3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Technology CPU: Circuit wires grow dynamically outwards around the icon with neon energy pulses!
 */
function TechCpuIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.techIconWrap} ${isHovered ? styles.techActive : ''}`}>
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" className={styles.techSvg}>
        {/* Growing Circuit Wires with glowing current */}
        <g className={styles.circuitWires}>
          <path d="M12 9 L12 2 M12 2 L9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M20 9 L20 2 M20 2 L23 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M12 23 L12 30 M12 30 L9 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M20 23 L20 30 M20 30 L23 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M9 12 L2 12 M2 12 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M9 20 L2 20 M2 20 0 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M23 12 L30 12 M30 12 32 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />
          <path d="M23 20 L30 20 M30 20 32 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={styles.wirePath} />

          <circle cx="9" cy="0" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="23" cy="0" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="9" cy="32" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="23" cy="32" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="0" cy="9" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="0" cy="23" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="32" cy="9" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
          <circle cx="32" cy="23" r="1.6" fill="var(--color-accent)" className={styles.wireNode} />
        </g>

        {/* Central Chip Body */}
        <rect x="8" y="8" width="16" height="16" rx="3" fill="currentColor" opacity="0.22" />
        <rect x="8" y="8" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        
        {/* Core processor die */}
        <rect x="12" y="12" width="8" height="8" rx="1.5" fill="var(--color-accent)" opacity="0.75" className={styles.chipCore} />
        <line x1="14" y1="12" x2="14" y2="20" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <line x1="18" y1="12" x2="18" y2="20" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <line x1="12" y1="16" x2="20" y2="16" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 3. Reading Book: Authentic 3D HTML flipping pages that turn smoothly across the spine!
 */
function BookPagesIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.bookIconWrap} ${isHovered ? styles.bookActive : ''}`}>
      <div className={styles.book3DContainer} aria-hidden="true">
        {/* Left Hardcover & Page Stack */}
        <div className={styles.pageBaseLeft}>
          <div className={styles.pageTextLine} />
          <div className={styles.pageTextLine} />
          <div className={styles.pageTextShort} />
        </div>

        {/* Center Spine Ridge */}
        <div className={styles.bookSpineBar} />

        {/* Right Hardcover & Page Stack */}
        <div className={styles.pageBaseRight}>
          <div className={styles.pageTextLine} />
          <div className={styles.pageTextLine} />
          <div className={styles.pageTextShort} />
        </div>

        {/* Dynamic 3D Flipping Leaf 1 (Turns 180° across spine in true GPU 3D) */}
        <div className={styles.flipLeafOne}>
          <div className={styles.leafSideFront}>
            <div className={styles.pageTextLine} />
            <div className={styles.pageTextLine} />
          </div>
          <div className={styles.leafSideBack}>
            <div className={styles.pageTextLine} />
            <div className={styles.pageTextLine} />
          </div>
        </div>

        {/* Dynamic 3D Flipping Leaf 2 (Follows closely behind for multi-page flurry) */}
        <div className={styles.flipLeafTwo}>
          <div className={styles.leafSideFront}>
            <div className={styles.pageTextLine} />
            <div className={styles.pageTextLine} />
          </div>
          <div className={styles.leafSideBack}>
            <div className={styles.pageTextLine} />
            <div className={styles.pageTextLine} />
          </div>
        </div>

        {/* Wind Breeze Streaks */}
        <div className={styles.bookWindTrails}>
          <span className={styles.windStreakOne} />
          <span className={styles.windStreakTwo} />
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Video Games: Active combo mashing, analog stick maneuver, and haptic rumble!
 */
function GamepadIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.gamepadIconWrap} ${isHovered ? styles.gamepadActive : ''}`}>
      <svg viewBox="0 0 32 26" width="32" height="26" fill="none" className={styles.gamepadSvg}>
        {/* Haptic Rumble Pulse Waves */}
        <g className={styles.rumbleWaves}>
          <path d="M1 9 C-1 11 -1 15 1 17" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" className={styles.rumbleLeft} />
          <path d="M31 9 C33 11 33 15 31 17" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" className={styles.rumbleRight} />
        </g>

        {/* Top Trigger Bumpers */}
        <path d="M6 6 Q9 3 13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 6 Q23 3 19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Gamepad Main Body Shell */}
        <path
          d="M6 7 Q16 5 26 7 Q31 9 30 18 Q29 24 24 23 Q20 22 18 19 L14 19 Q12 22 8 23 Q3 24 2 18 Q1 9 6 7 Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M6 7 Q16 5 26 7 Q31 9 30 18 Q29 24 24 23 Q20 22 18 19 L14 19 Q12 22 8 23 Q3 24 2 18 Q1 9 6 7 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Directional D-Pad (Left) */}
        <g className={styles.dpadGroup}>
          <rect x="7" y="10" width="6" height="2.2" rx="0.6" fill="currentColor" />
          <rect x="8.9" y="8.1" width="2.2" height="6" rx="0.6" fill="currentColor" />
          <circle cx="10" cy="11.1" r="0.7" fill="var(--bg-surface)" />
        </g>

        {/* Left Thumbstick with dynamic gaming motion */}
        <g className={styles.leftStick}>
          <circle cx="12.5" cy="16" r="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.4" />
          <circle cx="12.5" cy="16" r="1.2" fill="#ffffff" />
        </g>

        {/* Right Thumbstick with dynamic gaming motion */}
        <g className={styles.rightStick}>
          <circle cx="19.5" cy="16" r="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.4" />
          <circle cx="19.5" cy="16" r="1.2" fill="#ffffff" />
        </g>

        {/* 4 Colored Diamond Action Buttons (Right) */}
        <g className={styles.actionButtons}>
          {/* Y Button (Yellow) */}
          <circle cx="23" cy="8.5" r="1.5" fill="#eab308" className={styles.btnY} />
          {/* X Button (Blue) */}
          <circle cx="20.5" cy="11" r="1.5" fill="#38bdf8" className={styles.btnX} />
          {/* B Button (Red) */}
          <circle cx="25.5" cy="11" r="1.5" fill="#ef4444" className={styles.btnB} />
          {/* A Button (Green) */}
          <circle cx="23" cy="13.5" r="1.5" fill="#22c55e" className={styles.btnA} />
        </g>
      </svg>
    </div>
  );
}

/**
 * 5. Football / Volleyball: Ball hops up and down elastically!
 */
function BallIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.ballIconWrap} ${isHovered ? styles.ballActive : ''}`}>
      <svg viewBox="0 0 28 34" width="28" height="34" fill="none" className={styles.ballSvg}>
        {/* Dynamic Floor Shadow */}
        <ellipse cx="14" cy="31" rx="8" ry="2.2" fill="currentColor" opacity="0.3" className={styles.ballShadow} />

        {/* Bouncing Volleyball / Sports Ball */}
        <g className={styles.ballSphere}>
          <circle cx="14" cy="13" r="11" fill="currentColor" opacity="0.18" />
          <circle cx="14" cy="13" r="11" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2 C14 8 9 12 3 13" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 24 C14 18 19 14 25 13" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 7 C11 11 15 15 17 24" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 6. Karate Medal: Clean minimalist outline vector drawing!
 * Draped ribbon and embossed medallion with an elegant outline karate/star crest.
 */
function MedalIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.medalIconWrap} ${isHovered ? styles.medalActive : ''}`}>
      <svg viewBox="0 0 30 34" width="30" height="34" fill="none" className={styles.medalSvg}>
        {/* Clean Outline Ribbon Draped from Neck */}
        <g className={styles.ribbonBand}>
          <path
            d="M5 2 L11 15 L15 13 L19 15 L25 2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Ribbon Accent Line */}
          <path
            d="M8 2 L12 13 M22 2 L18 13"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Suspension Ring */}
          <circle cx="15" cy="14" r="2" stroke="currentColor" strokeWidth="1.8" />
        </g>

        {/* Clean Outline Medallion */}
        <g className={styles.goldMedallionBody}>
          {/* Outer Medal Circle with Subtle Depth Fill */}
          <circle
            cx="15"
            cy="23"
            r="9.5"
            fill="currentColor"
            opacity="0.16"
          />
          <circle
            cx="15"
            cy="23"
            r="9.5"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Inner Inset Rim Outline */}
          <circle
            cx="15"
            cy="23"
            r="7"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Martial Arts Star / Black Belt Emblem Outline */}
          <polygon
            points="15,18 16.3,21 19.5,21.3 17,23.4 17.8,26.5 15,24.8 12.2,26.5 13,23.4 10.5,21.3 13.7,21"
            stroke="var(--color-accent)"
            strokeWidth="1.4"
            fill="var(--color-accent-subtle)"
            strokeLinejoin="round"
          />
        </g>

        {/* Outline Aura Pulse Ring when worn! */}
        <g className={styles.outlineAura}>
          <circle
            cx="15"
            cy="23"
            r="12"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            className={styles.auraRing}
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Interactive 3D Tilt Card with dynamic cursor spotlight & lively repeating micro-interactions
 */
function InteractiveHobbyCard({ hobby }: { hobby: HobbyItem }) {
  const cardRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '20px 0px -20px 0px',
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    setIsHovered(true);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate rotation angles from cursor position (-8° to +8°)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    setTilt({
      rx: -normY * 8,
      ry: normX * 8,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords(null);
    setTilt({ rx: 0, ry: 0 });
  };

  // On mobile/touch: scrolling the card into view activates the animations automatically!
  const isActive = isHovered || isInView;

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${isInView ? styles.cardInView : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          transform: coords
            ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px) scale(1.03)`
            : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',
          '--mouse-x': coords ? `${coords.x}px` : '50%',
          '--mouse-y': coords ? `${coords.y}px` : '50%',
        } as React.CSSProperties
      }
    >
      <div className={styles.cardSpotlight} aria-hidden="true" />

      <div className={styles.cardTop}>
        <div className={styles.iconWrap} aria-hidden="true">
          {hobby.id === 'h1' && <CinemaIcon isHovered={isActive} />}
          {hobby.id === 'h2' && <TechCpuIcon isHovered={isActive} />}
          {hobby.id === 'h3' && <BookPagesIcon isHovered={isActive} />}
          {hobby.id === 'h4' && <GamepadIcon isHovered={isActive} />}
          {hobby.id === 'h5' && <BallIcon isHovered={isActive} />}
          {hobby.id === 'h6' && <MedalIcon isHovered={isActive} />}
        </div>
        <span className={styles.category}>{hobby.category}</span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.hobbyTitle}>{hobby.title}</h3>
        <p className={styles.hobbyDesc}>{hobby.description}</p>
      </div>

      {hobby.tags && hobby.tags.length > 0 && (
        <div className={styles.tags}>
          {hobby.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/**
 * Beyond Engineering Section
 *
 * Innovative 3D magnetic tilt cards with dynamic cursor spotlight,
 * reflecting personal disciplines and passions outside of pure code.
 */
export function BeyondSection() {
  return (
    <section id="beyond" className={styles.section} aria-label="Beyond Engineering">
      <header className={styles.header}>
        <h2 className={styles.title}>Beyond Engineering</h2>
        <p className={styles.subtitle}>
          Curiosity and discipline outside the terminal.
        </p>
      </header>

      <div className={styles.grid}>
        {hobbies.map((hobby) => (
          <InteractiveHobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </section>
  );
}
