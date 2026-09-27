import styles from './ContactSection.module.css';

const contactDetails = [
  {
    label: 'Email',
    value: 'rajputdhiraj1010@gmail.com',
    href: 'mailto:rajputdhiraj1010@gmail.com',
  },
  {
    label: 'WhatsApp',
    value: '+91 79727 42879',
    href: 'https://wa.me/917972742879',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/dhiraj-rajput-',
    href: 'https://linkedin.com/in/dhiraj-rajput-',
  },
  {
    label: 'GitHub',
    value: 'github.com/dhiraj-rajput',
    href: 'https://github.com/dhiraj-rajput',
  },
  {
    label: 'Location',
    value: 'Pune, India',
    href: null,
  },
];

/**
 * Contact Section
 *
 * Short, simple, direct contact links.
 */
export function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Open to full-time roles, research collaborations, and interesting problems.
            <br />
            Reach out - I respond within 24 hours.
          </p>

          <a
            href="mailto:rajputdhiraj1010@gmail.com"
            className={styles.ctaBtn}
            aria-label="Send me an email"
          >
            Send me an Email →
          </a>
        </div>

        <div className={styles.right}>
          <ul className={styles.detailList} role="list">
            {contactDetails.map((d) => (
              <li key={d.label} className={styles.detailItem}>
                <span className={styles.detailLabel}>{d.label}</span>
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className={styles.detailLink}
                  >
                    {d.value}
                  </a>
                ) : (
                  <span className={styles.detailValue}>{d.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
