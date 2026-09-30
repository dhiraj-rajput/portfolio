import { useState, useRef } from 'react';
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
 * 3. Reading Book: Pages genuinely flip across the center spine in 3D as wind blows through!
 */
function BookPagesIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.bookIconWrap} ${isHovered ? styles.bookActive : ''}`}>
      <svg viewBox="0 0 32 28" width="30" height="28" fill="none" className={styles.bookSvg}>
        {/* Book Covers & Base Left/Right Spreads */}
        <path
          d="M3 6 C7 4.5 11 4.5 16 6.8 L16 23 C11 20.8 7 20.8 3 22 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          opacity="0.18"
          className={styles.leftPageBase}
        />
        <path
          d="M29 6 C25 4.5 21 4.5 16 6.8 L16 23 C21 20.8 25 20.8 29 22 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          opacity="0.18"
          className={styles.rightPageBase}
        />

        {/* Left page text lines */}
        <line x1="6" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <line x1="6" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <line x1="6" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

        {/* Right page text lines */}
        <line x1="19" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <line x1="19" y1="13" x2="26" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <line x1="19" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

        {/* Animated 3D Turning Pages (Cascade from right to left like a real book) */}
        <g className={styles.turningPage1}>
          <path
            d="M16 6.8 C21 4.5 25 4.5 29 6 L29 22 C25 20.8 21 20.8 16 23 Z"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            fill="var(--color-accent-subtle)"
          />
        </g>
        <g className={styles.turningPage2}>
          <path
            d="M16 6.8 C21 4.5 25 4.5 29 6 L29 22 C25 20.8 21 20.8 16 23 Z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="currentColor"
            opacity="0.3"
          />
        </g>

        {/* Center Spine Ridge */}
        <line x1="16" y1="6" x2="16" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

        {/* Wind Gust breeze lines passing over */}
        <g className={styles.windBreeze}>
          <path d="M0 4 Q5 2 10 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 25 Q7 23 12 25" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. Video Games: Gamepad controller actively tilts left and right!
 */
function GamepadIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.gamepadIconWrap} ${isHovered ? styles.gamepadActive : ''}`}>
      <svg viewBox="0 0 30 26" width="30" height="26" fill="none" className={styles.gamepadSvg}>
        {/* Controller body */}
        <rect x="2" y="6" width="26" height="15" rx="7.5" fill="currentColor" opacity="0.2" />
        <rect x="2" y="6" width="26" height="15" rx="7.5" stroke="currentColor" strokeWidth="2" />

        {/* D-Pad on left */}
        <g className={styles.dpad}>
          <path d="M7 11.5 L11 11.5 M9 9.5 L9 13.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* Action Buttons on right */}
        <g className={styles.actionBtns}>
          <circle cx="21" cy="11.5" r="1.3" fill="var(--color-accent)" className={styles.btnA} />
          <circle cx="23" cy="13.5" r="1.3" fill="var(--color-accent)" className={styles.btnB} />
          <circle cx="19" cy="13.5" r="1.3" fill="var(--color-accent)" className={styles.btnX} />
          <circle cx="21" cy="15.5" r="1.3" fill="var(--color-accent)" className={styles.btnY} />
        </g>

        {/* Dual analog thumbsticks */}
        <circle cx="11" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.4" className={styles.stickLeft} />
        <circle cx="17" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.4" className={styles.stickRight} />
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
 * 6. Karate Medal: Junior Black Belt gold medal with authentic black-and-red ribbon,
 * prestigious specular shine sweep, and natural pendulum swing!
 */
function MedalIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`${styles.medalIconWrap} ${isHovered ? styles.medalActive : ''}`}>
      <svg viewBox="0 0 32 38" width="30" height="36" fill="none" className={styles.medalSvg}>
        <defs>
          <linearGradient id="goldMedalGrad" x1="8" y1="14" x2="24" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <clipPath id="medalClip">
            <circle cx="16" cy="24" r="10" />
          </clipPath>
        </defs>

        {/* Junior Black Belt V-Neck Ribbon: Solid Black with bold Red center stripe */}
        <g className={styles.ribbonGroup}>
          {/* Black outer ribbon bands */}
          <path d="M6 1 L13 16 L16 14 L19 16 L26 1" stroke="#18181b" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Red center junior black belt stripe */}
          <path d="M6 1 L13 16 L16 14 L19 16 L26 1" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Metallic suspension loop holding medal */}
          <circle cx="16" cy="15" r="2.2" stroke="#d97706" strokeWidth="1.6" fill="#fef08a" />
        </g>

        {/* The Golden Champion Medal */}
        <g className={styles.goldenMedallion}>
          {/* Outer glowing halo */}
          <circle cx="16" cy="24" r="11" fill="#f59e0b" opacity="0.35" className={styles.medalAura} />

          {/* Heavy Gold Medallion Base */}
          <circle cx="16" cy="24" r="10.5" fill="url(#goldMedalGrad)" stroke="#ffd700" strokeWidth="1.8" />

          {/* Rim Detail with Embossed Inset */}
          <circle cx="16" cy="24" r="8" stroke="#92400e" strokeWidth="0.8" opacity="0.6" />

          {/* Junior Black Belt Martial Arts Star Emblem */}
          <polygon
            points="16,19 17.5,22.2 21,22.4 18.2,24.5 19.1,28 16,26.1 12.9,28 13.8,24.5 11,22.4 14.5,22.2"
            fill="#ffd700"
            stroke="#78350f"
            strokeWidth="0.7"
          />

          {/* Diagonal Specular Shimmer Beam */}
          <g clipPath="url(#medalClip)">
            <rect
              x="-15"
              y="12"
              width="6"
              height="25"
              fill="#ffffff"
              opacity="0.85"
              transform="rotate(30 16 24)"
              className={styles.medalShimmerBar}
            />
          </g>
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

  return (
    <article
      ref={cardRef}
      className={styles.card}
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
          {hobby.id === 'h1' && <CinemaIcon isHovered={isHovered} />}
          {hobby.id === 'h2' && <TechCpuIcon isHovered={isHovered} />}
          {hobby.id === 'h3' && <BookPagesIcon isHovered={isHovered} />}
          {hobby.id === 'h4' && <GamepadIcon isHovered={isHovered} />}
          {hobby.id === 'h5' && <BallIcon isHovered={isHovered} />}
          {hobby.id === 'h6' && <MedalIcon isHovered={isHovered} />}
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
          The things that fuel the work. Curiosity and discipline don't stop at the terminal.
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
