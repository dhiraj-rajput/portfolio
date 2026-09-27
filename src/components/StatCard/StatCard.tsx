import type { StatItem } from '../../types';
import styles from './StatCard.module.css';

interface StatCardProps {
  stat: StatItem;
  className?: string;
}

/** A single "+N metric" card used three times in the stats grid. */
export function StatCard({ stat, className }: StatCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.headline}>
        <p className={styles.value}>{stat.value}</p>
        <p className={styles.label}>{stat.label}</p>
      </div>
      <p className={styles.description}>{stat.description}</p>
    </div>
  );
}
