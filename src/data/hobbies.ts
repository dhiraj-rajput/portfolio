/**
 * Beyond Engineering - Hobbies & Interests
 * iconName must be a valid Lucide icon name (PascalCase).
 */
export interface HobbyItem {
  id: string;
  iconName: string;
  category: string;
  title: string;
  description: string;
  tags?: string[];
}

export const hobbies: HobbyItem[] = [
  {
    id: 'h1',
    iconName: 'Clapperboard',
    category: 'Cinema & Anime',
    title: 'Cinephile & Anime Lover',
    description:
      'Huge fan of world cinema and anime—especially psychological thrillers, cyberpunk lore, and rich visual storytelling.',
    tags: ['Anime', 'World Cinema', 'Psychological Thrillers', 'Storytelling'],
  },
  {
    id: 'h2',
    iconName: 'Cpu',
    category: 'Tech Exploration',
    title: 'Exploring New Technologies',
    description:
      'Tinkering with emerging tech, inspecting network protocols, reading engineering papers, and building hands-on prototypes.',
    tags: ['Open Source', 'Research', 'Low-Level Tools', 'Experimentation'],
  },
  {
    id: 'h3',
    iconName: 'BookOpen',
    category: 'Reading',
    title: 'Reading & Systems Thinking',
    description:
      'Reading about distributed systems design, offensive security, and mental models that explain how complex systems behave under stress.',
    tags: ['Non-fiction', 'Systems Thinking', 'Philosophy', 'Security'],
  },
  {
    id: 'h4',
    iconName: 'Gamepad2',
    category: 'Gaming',
    title: 'MOBA & Video Games',
    description:
      'Competitive gaming in MOBAs and tactical strategy games that demand fast micro-mechanics, map awareness, and team coordination.',
    tags: ['MOBA', 'Macro Strategy', 'Team Coordination', 'Competitive'],
  },
  {
    id: 'h5',
    iconName: 'Volleyball',
    category: 'Sports',
    title: 'Volleyball',
    description:
      'Playing volleyball regularly—love the fast pace, court communication, and reflex-heavy rallies.',
    tags: ['Team Sport', 'Athletic Conditioning', 'Coordination'],
  },
  {
    id: 'h6',
    iconName: 'Medal',
    category: 'Martial Arts',
    title: 'Karate Kid & Junior Black Belt',
    description:
      'Trained in traditional Karate and earned a Junior Black Belt, building long-term discipline, focus, and quick reflexes.',
    tags: ['Junior Black Belt', 'Karate', 'Discipline', 'Kumite', 'Reflexes'],
  },
];
