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
  { id: 'arceus', title: 'Arceus', caption: 'Pen, no eraser. Bold move for a legendary Pokémon, or for me.', year: '2018', file: 'arceus', width: 1280, height: 1280 },
  { id: 'darkrai', title: 'Darkrai', caption: 'Darkrai, minus the nightmares. Those teeth, though.', year: '2017', file: 'darkrai', width: 900, height: 1600 },
  { id: 'latias', title: 'Latias', caption: 'Monday, 14/8/17, dated on the page and everything. Better Latias than never.', year: '2017', file: 'latias', width: 900, height: 1600 },
  { id: 'moltres', title: 'Moltres', caption: 'Moltres in marker. Hot take: fire birds are easier to draw than they look.', year: '2017', file: 'moltres', width: 690, height: 768 },
  { id: 'sheet', title: 'Pokédex Sketch Sheet', caption: "Eight tiny Pokémon on one page. Gotta draw 'em all, but I ran out of boxes.", year: '2017', file: 'sheet', width: 900, height: 1600 },
  { id: 'trainer', title: 'The Trainer', caption: 'Just a trainer saying hi, in pencil. Hat stays on, wave stays up.', year: '2017', file: 'trainer', width: 720, height: 1280 },
];
