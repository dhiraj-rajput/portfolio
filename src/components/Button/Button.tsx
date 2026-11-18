import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'outline';

interface BaseProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Shared CTA. Renders a real `<a>` when `href` is given (so links are never
 * wrapped around buttons), otherwise a `<button type="button">`.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', icon, children, className } = props;
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _v, icon: _i, children: _c, className: _cn, ...anchorRest } = props;
    return (
      <a className={classNames} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { variant: _v, icon: _i, children: _c, className: _cn, type = 'button', ...buttonRest } = props;
  return (
    <button className={classNames} type={type} {...buttonRest}>
      {content}
    </button>
  );
}
