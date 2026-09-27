import { useEffect, useRef, useState } from 'react';
import styles from './RobotAvatar.module.css';

/**
 * Interactive Robotic Avatar that follows the user's cursor
 * with smooth 3D head tilt, eye-tracking optics, and idle animations.
 * Pure React implementation with zero WebGPU warnings or bundle bloat.
 */
export function RobotAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance relative to window
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp between -1 and 1
      targetX = Math.max(-1, Math.min(1, dx));
      targetY = Math.max(-1, Math.min(1, dy));
    };

    const animate = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--look-x', currentX.toFixed(3));
        containerRef.current.style.setProperty('--look-y', currentY.toFixed(3));
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    // Periodic blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.avatarContainer}
      aria-label="Interactive cybersecurity robot mascot following your cursor"
      role="img"
    >
      <div className={styles.headTiltWrapper}>
        {/* Antenna */}
        <div className={styles.antenna}>
          <div className={styles.antennaStem} />
          <div className={styles.antennaTip} />
        </div>

        {/* Head Chassis */}
        <div className={styles.head}>
          {/* Ear nodes */}
          <div className={`${styles.ear} ${styles.earLeft}`} />
          <div className={`${styles.ear} ${styles.earRight}`} />

          {/* Visor Area */}
          <div className={styles.visor}>
            {/* HUD scanline reflection */}
            <div className={styles.scanline} />

            {/* Interactive Eye Tracking Optics */}
            <div
              className={`${styles.eyesGroup} ${isBlinking ? styles.blinking : ''}`}
            >
              <div className={styles.eye}>
                <div className={styles.pupil}>
                  <div className={styles.pupilGlint} />
                  <div className={styles.pupilCrosshair} />
                </div>
              </div>
              <div className={styles.eye}>
                <div className={styles.pupil}>
                  <div className={styles.pupilGlint} />
                  <div className={styles.pupilCrosshair} />
                </div>
              </div>
            </div>

            {/* Cyber HUD line */}
            <div className={styles.hudBar} />
          </div>

          {/* Mouth Speaker / Grille */}
          <div className={styles.mouthGrille}>
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Neck / Base connection */}
        <div className={styles.neck}>
          <div className={styles.neckJoint} />
        </div>
      </div>
    </div>
  );
}
