/**
 * Sketchbook gallery. Files in /public/art are downscaled copies of my original photos
 * (upright, natural colour) carrying an invisible watermark and copyright metadata.
 * The full-resolution originals are NOT stored in this repository.
 */
export interface ArtPiece {
  id: string;
  title: string;
  caption: string;
  year: string;
  /** file name without extension inside /public/art ("<file>.webp" full, "<file>-sm.webp" 4:5 tile) */
  file: string;
  /** natural size of the full image (prevents layout shift in the lightbox) */
  width: number;
  height: number;
}

export const artPieces: ArtPiece[] = [
  { id: 'arceus', title: 'Arceus', caption: 'Arceus-ly? Yes, I drew a god, and all it took was one pen.', year: '2018', file: 'arceus', width: 1280, height: 1280 },
  { id: 'darkrai', title: 'Darkrai', caption: 'Darkrai-ding the night shift: zero nightmares, just clean lines.', year: '2017', file: 'darkrai', width: 900, height: 1600 },
  { id: 'latias', title: 'Latias', caption: 'Latias than never: caught mid-flight on a Monday.', year: '2017', file: 'latias', width: 900, height: 1600 },
  { id: 'moltres', title: 'Moltres', caption: 'Moltres than meets the eye: one fire bird, zero smoke alarms harmed.', year: '2017', file: 'moltres', width: 690, height: 768 },
  { id: 'sheet', title: 'Pokédex Sketch Sheet', caption: "Gotta draw 'em all? Eight down, only a few hundred to go.", year: '2017', file: 'sheet', width: 900, height: 1600 },
  { id: 'trainer', title: 'The Trainer', caption: "Hat's off to this trainer: gotta catch 'em all, starting with your attention.", year: '2017', file: 'trainer', width: 720, height: 1280 },
];
