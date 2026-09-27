import { testimonials } from '../../data/testimonials';
import { TestimonialCard } from '../TestimonialCard/TestimonialCard';
import styles from './TestimonialsSection.module.css';

/** Testimonials section heading and client review cards. */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Testimonials</h2>
        <p className={styles.subheading}>
          Feedback from clients, partners, and collaborators who have worked with me along my journey.
        </p>
      </div>
      <div className={styles.row}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
