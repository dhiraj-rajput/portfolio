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
  { id: 'arceus', title: 'Arceus', caption: 'The Alpha Pokémon, drawn in pen.', year: '2018', file: 'arceus', width: 1280, height: 1280 },
  { id: 'darkrai', title: 'Darkrai', caption: 'The Nightmare Pokémon, sketchbook page.', year: '2017', file: 'darkrai', width: 900, height: 1600 },
  { id: 'latias', title: 'Latias', caption: 'The Eon Pokémon, sketchbook page dated 14 Aug 2017.', year: '2017', file: 'latias', width: 900, height: 1600 },
  { id: 'moltres', title: 'Moltres', caption: 'The Flame Pokémon in marker outline.', year: '2017', file: 'moltres', width: 690, height: 768 },
  { id: 'sheet', title: 'Pokédex Sketch Sheet', caption: 'Eight quick studies on a single page.', year: '2017', file: 'sheet', width: 900, height: 1600 },
  { id: 'trainer', title: 'The Trainer', caption: 'Anime-style trainer study in pencil.', year: '2017', file: 'trainer', width: 720, height: 1280 },
];
