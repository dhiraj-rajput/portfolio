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
      'Exploring world cinema and anime, especially psychological thrillers and sci-fi storytelling.',
    tags: ['Anime', 'World Cinema', 'Psychological Thrillers', 'Storytelling'],
  },
  {
    id: 'h2',
    iconName: 'Cpu',
    category: 'Tech Exploration',
    title: 'Exploring New Technologies',
    description:
      'Inspecting network protocols, reading systems papers, and testing new open-source tools.',
    tags: ['Open Source', 'Research', 'Low-Level Tools', 'Experimentation'],
  },
  {
    id: 'h3',
    iconName: 'BookOpen',
    category: 'Reading',
    title: 'Reading & Systems Thinking',
    description:
      'Reading books on distributed architecture, security engineering, and decision-making under pressure.',
    tags: ['Non-fiction', 'Systems Thinking', 'Philosophy', 'Security'],
  },
  {
    id: 'h4',
    iconName: 'Gamepad2',
    category: 'Gaming',
    title: 'MOBA & Video Games',
    description:
      'Playing competitive MOBAs and strategy games focused on map awareness and team coordination.',
    tags: ['MOBA', 'Macro Strategy', 'Team Coordination', 'Competitive'],
  },
  {
    id: 'h5',
    iconName: 'Volleyball',
    category: 'Sports',
    title: 'Volleyball',
    description:
      'Regular court sessions focused on fast rallies, positioning, and team communication.',
    tags: ['Team Sport', 'Athletic Conditioning', 'Coordination'],
  },
  {
    id: 'h6',
    iconName: 'Medal',
    category: 'Martial Arts',
    title: 'Karate Kid & Junior Black Belt',
    description:
      'Trained in traditional Karate (Junior Black Belt), building discipline, balance, and quick reflexes.',
    tags: ['Junior Black Belt', 'Karate', 'Discipline', 'Kumite', 'Reflexes'],
  },
];
