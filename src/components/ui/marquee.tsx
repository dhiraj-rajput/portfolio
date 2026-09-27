import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './marquee.module.css';

export interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to repeat in the marquee
   */
  children: ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * The number of times to repeat the children
   * @default 4
   */
  repeat?: number;
  /**
   * Animation duration (e.g. '65s' for relaxed smooth movement)
   * @default '65s'
   */
  duration?: string;
}

export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = '65s',
  style,
  ...props
}: MarqueeProps) {
  const containerClasses = [
    styles.marquee,
    vertical ? styles.vertical : styles.horizontal,
    pauseOnHover ? styles.pauseOnHover : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [
    styles.marqueeContent,
    vertical ? styles.verticalContent : styles.horizontalContent,
    reverse ? styles.reverse : '',
  ]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = {
    ...style,
    ['--duration' as string]: duration,
  };

  return (
    <div {...props} style={combinedStyle} className={containerClasses}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} className={contentClasses} aria-hidden={i > 0}>
          {children}
        </div>
      ))}
    </div>
  );
}
