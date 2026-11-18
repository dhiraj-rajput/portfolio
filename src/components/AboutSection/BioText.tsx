import { useMemo } from 'react';
import styles from './AboutSection.module.css';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Renders a paragraph and bolds any highlight keyword. The regex is built once per keyword list. */
export function BioText({ text, keywords }: { text: string; keywords?: string[] }) {
  const pattern = useMemo(() => {
    if (!keywords || keywords.length === 0) return null;
    const sorted = [...keywords].sort((a, b) => b.length - a.length);
    return new RegExp(`(${sorted.map(escapeRegExp).join('|')})`, 'g');
  }, [keywords]);

  if (!pattern || !keywords) return <>{text}</>;

  return (
    <>
      {text.split(pattern).map((part, index) =>
        keywords.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
          <strong key={index} className={styles.bioHighlight}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
