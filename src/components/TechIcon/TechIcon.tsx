import { GenericTechGlyph } from '../icons';
import type { TechItem } from '../../types';
import { assetUrl } from '../../utils/assets';
import styles from './TechIcon.module.css';

interface TechIconProps {
  item: TechItem;
}

/**
 * Renders one tool logo. Drop a real image into `src/assets/images/tech/`
 * and pass its path as `item.icon` to replace the generic glyph + label.
 */
export function TechIcon({ item }: TechIconProps) {
  return (
    <div className={styles.wrapper} title={item.name}>
      {item.icon ? (
        <img src={assetUrl(item.icon)} alt={item.name} className={styles.image} />
      ) : (
        <GenericTechGlyph className={styles.glyph} />
      )}
      <span className={styles.label}>{item.name}</span>
    </div>
  );
}
