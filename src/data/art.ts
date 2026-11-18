/**
 * Sketchbook gallery. Images are pre-processed (cleaned, downscaled, watermarked
 * with "(c) Dhiraj Rajput - djphantom.tech") so no original high-resolution
 * file is ever published. Original photos are NOT stored in this repository.
 */
export interface ArtPiece {
  id: string;
  title: string;
  caption: string;
  year: string;
  /** file name without extension inside /public/art (full + "-sm" thumbnail) */
  file: string;
  width: number;
  height: number;
}

export const artPieces: ArtPiece[] = [
  { id: 'arceus', title: 'Arceus', caption: 'The Alpha Pokémon, pen on paper.', year: '2018', file: 'arceus', width: 1100, height: 1100 },
  { id: 'darkrai', title: 'Darkrai', caption: 'Nightmare Pokémon, inked in one sitting.', year: '2017', file: 'darkrai', width: 881, height: 1100 },
  { id: 'latias', title: 'Latias', caption: 'Eon Pokémon, sketchbook page, 14 Aug 2017.', year: '2017', file: 'latias', width: 822, height: 1100 },
  { id: 'moltres', title: 'Moltres', caption: 'Legendary flame bird, marker outline.', year: '2017', file: 'moltres', width: 690, height: 768 },
  { id: 'sheet', title: 'Pokédex Sketch Sheet', caption: 'Eight quick character studies on one page.', year: '2017', file: 'sheet', width: 642, height: 1100 },
  { id: 'trainer', title: 'The Trainer', caption: 'Anime-style trainer study, pencil.', year: '2017', file: 'trainer', width: 649, height: 1100 },
];
