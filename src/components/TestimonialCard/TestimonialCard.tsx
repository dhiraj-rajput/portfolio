import type { Testimonial } from '../../types';
import { QuoteIcon } from '../icons';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** One client/colleague quote card used in the testimonials carousel row. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.authorName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <blockquote className={styles.card}>
      <QuoteIcon className={styles.quoteIcon} />
      <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
      <div className={styles.divider} />
      <footer className={styles.author}>
        {testimonial.authorPhoto ? (
          <img src={testimonial.authorPhoto} alt={testimonial.authorName} className={styles.avatar} />
        ) : (
          <span className={styles.avatarFallback}>{initials}</span>
        )}
        <div className={styles.authorText}>
          <cite className={styles.authorName}>{testimonial.authorName}</cite>
          <span className={styles.authorRole}>{testimonial.authorRole}</span>
        </div>
      </footer>
    </blockquote>
  );
}
