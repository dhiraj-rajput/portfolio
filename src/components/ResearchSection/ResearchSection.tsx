import { useEffect, useRef, useState } from 'react';
import { researchEntries } from '../../data/research';
import { assetUrl } from '../../utils/assets';
import styles from './ResearchSection.module.css';

interface MinecraftParticle {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

const LAVA_COLORS = ['#ffd700', '#ff6600', '#ff2200', '#ff8c00', '#ffffff', '#4a1103'];
const WATER_COLORS = ['#38bdf8', '#0284c7', '#bae6fd', '#0ea5e9', '#ffffff', '#7dd3fc'];

/**
 * Research & Innovation Section
 *
 * Professional 120fps GPU Fluid Timeline:
 * - 100% GPU-accelerated: Uses composite-only transforms (scaleY & translate3d) with ZERO layout reflow.
 * - Synchronous scroll sampling in requestAnimationFrame for fluid, frictionless motion.
 * - Dot Absorption / Merge: The droplet permanently swells and expands in size as it absorbs each milestone dot!
 * - Track extends all the way to the very bottom of the last card.
 * - One-way ratchet: Flows downward as you scroll, NEVER retracts or comes back up.
 * - Authentic Minecraft voxel particles popping out of the droplet.
 */
export function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const baseTrackRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);

  const currentProgressRef = useRef<number>(0);
  const maxTargetRef = useRef<number>(0);
  const spanRef = useRef<number>(100);
  const startOffsetRef = useRef<number>(28);
  const dotPositionsRef = useRef<number[]>([]);
  const absorbedCountRef = useRef<number>(0);

  // Direction & out-of-bounds tracking
  const wasInViewRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDirRef = useRef<'down' | 'up'>('down');
  const entryModeRef = useRef<'flow-with-scroll' | 'fall-to-last'>('flow-with-scroll');

  const [particles, setParticles] = useState<MinecraftParticle[]>([]);

  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.getAttribute('data-theme') === 'light';
  });

  // Track theme changes dynamically
  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') checkTheme();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Minecraft burst when merging with a dot
  const triggerMergeBurst = (dotIdx: number) => {
    const palette = isLightMode ? WATER_COLORS : LAVA_COLORS;
    let nextId = Date.now() + dotIdx * 100;
    const burst: MinecraftParticle[] = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const speed = Math.random() * 26 + 12;
      burst.push({
        id: ++nextId,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed - 10,
        size: Math.random() < 0.5 ? 4 : 5,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
    setParticles((prev) => [...prev.slice(-14), ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !burst.some((bp) => bp.id === p.id)));
    }, 750);
  };

  // 120fps GPU-Accelerated Viscous Fluid Engine
  useEffect(() => {
    let animId: number;

    const measureLayout = () => {
      const el = timelineRef.current;
      if (!el) return;

      const timelineRect = el.getBoundingClientRect();
      const spines = el.querySelectorAll<HTMLElement>(`.${styles.spine}`);
      if (spines.length === 0) return;

      const firstSpine = spines[0];
      const articles = el.querySelectorAll<HTMLElement>(`.${styles.entry}`);
      const lastEntry = articles[articles.length - 1];
      const lastCard = lastEntry?.querySelector<HTMLElement>(`.${styles.card}`);

      const firstSpineRect = firstSpine.getBoundingClientRect();
      // Center of dot is 29px from top of spine (22px padding + 7px half-dot)
      const startY = firstSpineRect.top + 29 - timelineRect.top;
      startOffsetRef.current = startY;

      // The true bottom of the last card or last entry
      const lastCardTarget = lastCard || lastEntry;
      const lastCardRect = lastCardTarget.getBoundingClientRect();
      const endY = lastCardRect.bottom - timelineRect.top;

      const span = Math.max(endY - startY, 150);
      spanRef.current = span;

      // Track absolute positions of all dots along the span
      const dotYs: number[] = [];
      spines.forEach((spine) => {
        const spineRect = spine.getBoundingClientRect();
        const dotCenter = spineRect.top + 29 - timelineRect.top;
        dotYs.push(dotCenter - startY);
      });
      dotPositionsRef.current = dotYs;

      // Position and dimension the continuous spine track
      if (trackRef.current) {
        trackRef.current.style.top = `${startY}px`;
        trackRef.current.style.height = `${span}px`;
      }
    };

    measureLayout();

    // ResizeObserver dynamically catches image/video loading & responsive height changes
    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    // Backup re-measures after media hydration
    const timer1 = setTimeout(measureLayout, 300);
    const timer2 = setTimeout(measureLayout, 900);
    const timer3 = setTimeout(measureLayout, 2000);

    const resetAnimation = (el: HTMLElement | null) => {
      maxTargetRef.current = 0;
      currentProgressRef.current = 0;
      absorbedCountRef.current = 0;
      if (streamRef.current) {
        streamRef.current.style.transform = 'scaleY(0)';
      }
      if (dropletRef.current) {
        dropletRef.current.style.transform = 'translate3d(-50%, 0, 0) scale(1)';
      }
      if (el) {
        const dots = el.querySelectorAll<HTMLElement>(`.${styles.spineDot}`);
        dots.forEach((dot) => {
          dot.classList.remove(styles.spineDotIgnited);
        });
      }
      setParticles([]);
    };

    const resetDots = (el: HTMLElement | null) => {
      if (el) {
        const dots = el.querySelectorAll<HTMLElement>(`.${styles.spineDot}`);
        dots.forEach((dot) => {
          dot.classList.remove(styles.spineDotIgnited);
        });
      }
    };

    // Continuous 120fps RAF loop: Synchronously samples scroll & computes viscous fluid LERP
    const fluidLoop = () => {
      const sectionEl = sectionRef.current;
      const el = timelineRef.current;
      const stream = streamRef.current;
      const droplet = dropletRef.current;

      if (sectionEl && el && stream && droplet && spanRef.current > 0) {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;
        if (scrollDelta > 2) {
          scrollDirRef.current = 'down';
        } else if (scrollDelta < -2) {
          scrollDirRef.current = 'up';
        }
        lastScrollYRef.current = currentScrollY;

        const sRect = sectionEl.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Check if section is currently within the viewport (with comfortable threshold)
        const isInView = sRect.bottom > 40 && sRect.top < windowH - 40;

        if (!isInView) {
          // Out of bounds! Reset everything once out of bounds so next entry starts afresh
          if (wasInViewRef.current) {
            wasInViewRef.current = false;
            resetAnimation(el);
          }
          animId = requestAnimationFrame(fluidLoop);
          return;
        }

        // Just entered view from out of bounds:
        if (!wasInViewRef.current) {
          wasInViewRef.current = true;
          currentProgressRef.current = 0;
          absorbedCountRef.current = 0;
          resetDots(el);

          // If coming from DOWN to UP (user scrolling UP or entered from below the section):
          if (scrollDirRef.current === 'up' || sRect.top < 0) {
            entryModeRef.current = 'fall-to-last';
            maxTargetRef.current = 1.0; // trigger fall to the bottom of the last card!
          } else {
            // Coming from TOP to DOWN (user scrolling DOWN):
            entryModeRef.current = 'flow-with-scroll';
            maxTargetRef.current = 0;
          }
        }

        const span = spanRef.current;
        const startY = startOffsetRef.current;
        const firstDotScreenY = el.getBoundingClientRect().top + startY;
        const viewportReadingY = windowH * 0.68;

        // Progress computation:
        if (entryModeRef.current === 'fall-to-last') {
          // Automatic viscous fluid falling animation down to the last card!
          const remaining = 1.0 - currentProgressRef.current;
          if (remaining > 0.0005) {
            // Silky fluid falling physics: viscous flow down the track
            const step = Math.max(remaining * 0.038, 0.0035);
            currentProgressRef.current = Math.min(currentProgressRef.current + step, 1.0);
          } else {
            currentProgressRef.current = 1.0;
            // Stays there until the entire component is scrolled up out of view
          }
        } else {
          // 'flow-with-scroll' mode (coming from top to down):
          const scrolled = viewportReadingY - firstDotScreenY;
          const rawProgress = Math.min(Math.max(scrolled / span, 0), 1);
          if (rawProgress > maxTargetRef.current) {
            maxTargetRef.current = rawProgress;
          }

          const target = maxTargetRef.current;
          const current = currentProgressRef.current;
          const diff = target - current;
          if (Math.abs(diff) > 0.0002) {
            currentProgressRef.current = current + diff * 0.18;
          } else {
            currentProgressRef.current = target;
          }
        }

        const progress = currentProgressRef.current;
        const currentDropY = progress * span;

        // 1. GPU Composite Transform for Stream (scaleY - zero layout reflow!)
        stream.style.transform = `scaleY(${progress})`;

        // 2. Calculate Dot Absorption & Droplet Merging Size
        const dotYs = dotPositionsRef.current;
        let absorbed = 0;
        let recentMergeBoost = 0;

        dotYs.forEach((dotY, idx) => {
          const distFromDot = Math.abs(currentDropY - dotY);
          if (currentDropY >= dotY - 6) {
            absorbed = idx + 1;
          }
          if (distFromDot < 35) {
            recentMergeBoost = Math.max(
              recentMergeBoost,
              Math.sin((1 - distFromDot / 35) * Math.PI) * 0.55
            );
          }
        });

        // Did we just absorb a new dot? Trigger Minecraft burst!
        if (absorbed > absorbedCountRef.current) {
          triggerMergeBurst(absorbed - 1);
        }
        absorbedCountRef.current = absorbed;

        const baseScale =
          1.0 + (absorbed === 1 ? 0.35 : absorbed === 2 ? 0.75 : absorbed >= 3 ? 1.2 : 0);
        const totalDropletScale = baseScale + recentMergeBoost;

        // 3. GPU Composite Transform for Droplet (translate3d + scale - 120fps smooth!)
        droplet.style.transform = `translate3d(-50%, ${currentDropY}px, 0) scale(${totalDropletScale})`;

        // 4. Mark absorbed / ignited dots
        const dots = el.querySelectorAll<HTMLElement>(`.${styles.spineDot}`);
        dots.forEach((dot, idx) => {
          const dotY = dotYs[idx] ?? 0;
          if (currentDropY >= dotY - 6) {
            dot.classList.add(styles.spineDotIgnited);
          }
        });
      }

      animId = requestAnimationFrame(fluidLoop);
    };

    window.addEventListener('resize', measureLayout);
    window.addEventListener('load', measureLayout);
    animId = requestAnimationFrame(fluidLoop);

    return () => {
      window.removeEventListener('resize', measureLayout);
      window.removeEventListener('load', measureLayout);
      resizeObserver.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Minecraft Particle Spawner (crisp pixel cubes popping out of the drop during descent)
  useEffect(() => {
    let nextId = 0;
    const interval = setInterval(() => {
      // Spawn particles when droplet has begun its descent
      if (currentProgressRef.current <= 0.01) return;

      const palette = isLightMode ? WATER_COLORS : LAVA_COLORS;
      // Emit more sparks when bigger (absorbed more dots)
      const count = 1 + (Math.random() < 0.25 + absorbedCountRef.current * 0.15 ? 1 : 0);

      const newParticles: MinecraftParticle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: ++nextId,
          dx: (Math.random() - 0.5) * (26 + absorbedCountRef.current * 6),
          dy: -(Math.random() * 22 + 8),
          size: Math.random() < 0.6 ? 4 : 5,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }

      setParticles((prev) => [...prev.slice(-10), ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 750);
    }, 280);

    return () => clearInterval(interval);
  }, [isLightMode]);

  return (
    <section id="research" ref={sectionRef} className={styles.section} aria-label="Research and Innovation">
      <header className={styles.header}>
        <h2 className={styles.title}>Research &amp; Innovation</h2>
        <p className={styles.subtitle}>
          Published work, applied research, and ongoing investigations at the intersection of
          security, AI, and distributed systems.
        </p>
      </header>

      <div ref={timelineRef} className={styles.timeline}>
        {/* Continuous Fluid Spine Track with Flowing Stream, Drop, and Minecraft Particles */}
        <div ref={trackRef} className={styles.spineTrack} aria-hidden="true">
          {/* Base Muted Track Line extending all the way to bottom of last card */}
          <div ref={baseTrackRef} className={styles.baseTrack} />

          {/* Liquid Stream filling downwards via GPU scaleY (zero layout reflow) */}
          <div ref={streamRef} className={styles.liquidStream} />

          {/* The Droplet moving via GPU translate3d and swelling upon merging with dots */}
          <div ref={dropletRef} className={styles.dropletWrapper}>
            <svg className={styles.dropletSvg} viewBox="0 0 20 28" fill="none">
              <defs>
                <filter id="lavaGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient
                  id="lavaDropGrad"
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="45%" stopColor="#ff8c00" />
                  <stop offset="85%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#fff7c2" />
                </linearGradient>
                <linearGradient
                  id="waterDropGrad"
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="55%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
              </defs>

              {/* Organic Teardrop contour */}
              <path
                d="M10 2 C10 2 17 12 17 19 C17 23.5 13.8 27 10 27 C6.2 27 3 23.5 3 19 C3 12 10 2 10 2 Z"
                fill={isLightMode ? 'url(#waterDropGrad)' : 'url(#lavaDropGrad)'}
                filter={isLightMode ? undefined : 'url(#lavaGlow)'}
              />

              {/* Inner Specular Core Glint */}
              <ellipse
                cx="8"
                cy="18"
                rx="1.8"
                ry="2.6"
                fill="#ffffff"
                opacity={isLightMode ? 0.85 : 0.75}
              />
            </svg>

            {/* Minecraft Voxel Particle Pop Spawner */}
            <div className={styles.particleEmitter}>
              {particles.map((p) => (
                <span
                  key={p.id}
                  className={styles.minecraftPixel}
                  style={
                    {
                      '--dx': `${p.dx}px`,
                      '--dy': `${p.dy}px`,
                      '--size': `${p.size}px`,
                      '--color': p.color,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Entries */}
        {researchEntries.map((entry) => (
          <article key={entry.id} className={styles.entry}>
            {/* Timeline Spine Dot Node */}
            <div className={styles.spine}>
              <div className={styles.spineDot} aria-hidden="true" />
            </div>

            {/* Entry Card */}
            <div className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.categoryBadge}>{entry.category}</span>
                <span className={styles.yearBadge}>{entry.year}</span>
              </div>

              <h3 className={styles.entryTitle}>{entry.title}</h3>
              <p className={styles.venue}>{entry.venue}</p>
              <p className={styles.description}>{entry.description}</p>

              {/* Media Preview: Video or Screenshot */}
              {entry.videoUrl ? (
                <div className={styles.mediaWrap}>
                  <video
                    src={assetUrl(entry.videoUrl)}
                    poster={entry.videoPoster ? assetUrl(entry.videoPoster) : undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className={styles.mediaVideo}
                  />
                  {entry.videoCaption && (
                    <span className={styles.mediaCaption}>{entry.videoCaption}</span>
                  )}
                </div>
              ) : entry.image ? (
                <div className={styles.mediaWrap}>
                  <img
                    src={assetUrl(entry.image)}
                    alt={`${entry.title} Preview`}
                    className={styles.mediaImg}
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className={styles.footer}>
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {entry.link && entry.link !== '#' && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.readLink}
                    aria-label={`${entry.actionLabel || 'View Project ↗'}: ${entry.title}`}
                  >
                    {entry.actionLabel || 'View Project ↗'}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
