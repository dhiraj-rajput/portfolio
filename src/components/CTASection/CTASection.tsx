import styles from './CTASection.module.css';

/** Bottom-of-page "Vamos conversar? / ENTRE EM CONTATO" banner. */
export function CTASection() {
  return (
    <section id="contact" className={styles.section}>
      <p className={styles.eyebrow}>Ready to collaborate?</p>
      <a href="mailto:rajputdhiraj1010@gmail.com" className={styles.title}>
        GET IN TOUCH
      </a>
    </section>
  );
}
