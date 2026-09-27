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
      'Deep appreciation for compelling narratives across world cinema and thought-provoking anime. From intricate cyberpunk lore and psychological thrillers to cinematic masterpieces - fascinated by layered character arcs, philosophy, and visual world-building.',
    tags: ['Anime', 'World Cinema', 'Psychological Thrillers', 'Storytelling'],
  },
  {
    id: 'h2',
    iconName: 'Cpu',
    category: 'Tech Exploration',
    title: 'Exploring New Technologies',
    description:
      'Constantly staying at the frontier - experimenting with bleeding-edge frameworks, inspecting low-level protocols, reading papers, and building side projects. If an architectural pattern seems intriguing, it gets dissected.',
    tags: ['Open Source', 'Research', 'Low-Level Tools', 'Experimentation'],
  },
  {
    id: 'h3',
    iconName: 'BookOpen',
    category: 'Reading',
    title: 'Reading & Systems Thinking',
    description:
      'Reading books on distributed systems design, offensive security principles, behavioral economics, and philosophy. Always seeking mental models that explain how complex systems actually behave under stress.',
    tags: ['Non-fiction', 'Systems Thinking', 'Philosophy', 'Security'],
  },
  {
    id: 'h4',
    iconName: 'Gamepad2',
    category: 'Gaming',
    title: 'MOBA & Video Games',
    description:
      'Playing MOBAs and competitive strategy games where micro-mechanics, map awareness, and split-second tactical decisions determine the outcome. High-stakes team coordination mirrors real-world engineering teamwork.',
    tags: ['MOBA', 'Macro Strategy', 'Team Coordination', 'Competitive'],
  },
  {
    id: 'h5',
    iconName: 'Volleyball',
    category: 'Sports',
    title: 'Volleyball',
    description:
      'Playing volleyball regularly - a fast-paced sport rewarding rapid anticipation, defensive positioning, and team synchronization. Rallies demand intense situational awareness and physical agility.',
    tags: ['Team Sport', 'Athletic Conditioning', 'Coordination'],
  },
  {
    id: 'h6',
    iconName: 'Shield',
    category: 'Sports',
    title: 'Football - Goalkeeper',
    description:
      'Playing as a goalkeeper - the critical defensive anchor with complete visibility over the entire pitch. Reading opposition play patterns, commanding the backline, and reacting in milliseconds is second nature.',
    tags: ['Goalkeeper', 'Defensive Anchor', 'Reflexes', 'Leadership'],
  },
];
