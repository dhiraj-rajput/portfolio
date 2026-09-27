import { faqs } from '../../data/faqs';
import { FAQItem } from '../FAQItem/FAQItem';
import styles from './FAQSection.module.css';

/** "Perguntas Frequentes" heading plus the accordion list. */
export function FAQSection() {
  return (
    <section id="faq" className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <div className={styles.list}>
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </section>
  );
}
