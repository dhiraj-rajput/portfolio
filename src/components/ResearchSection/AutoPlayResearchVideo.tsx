import { useEffect, useRef } from 'react';
import styles from './ResearchSection.module.css';

/**
 * Auto-playing Video with Intersection Observer:
 * Automatically plays muted when scrolled into view, pauses when out of view,
 * with full controls available for unmute/scrubbing.
 */
export function AutoPlayResearchVideo({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.mediaWrap} onContextMenu={(e) => e.preventDefault()}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        preload="metadata"
        className={styles.mediaVideo}
      />
      {caption && <span className={styles.mediaCaption}>{caption}</span>}
    </div>
  );
}
