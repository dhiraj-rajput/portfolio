import { useState } from 'react';
import type { FAQ } from '../../types';
import { PlusIcon } from '../icons';
import styles from './FAQItem.module.css';

interface FAQItemProps {
  faq: FAQ;
  /** Optional answer text; the source design only supplied questions. */
  answer?: string;
}

/** One expandable question row in the FAQ accordion. */
export function FAQItem({ faq, answer = faq.answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.question}>{faq.question}</span>
        <PlusIcon className={open ? styles.iconOpen : styles.icon} />
      </button>
      {open && answer && <p className={styles.answer}>{answer}</p>}
    </div>
  );
}
