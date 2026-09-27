import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Shared CTA button. `variant="primary"` renders the orange gradient pill,
 * `secondary` renders the bordered dark pill, `outline` renders the faint
 * translucent pill used inside the "let's build together" card.
 */
export function Button({ variant = 'primary', icon, children, className, ...rest }: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <button className={classNames} {...rest}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
