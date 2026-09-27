export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export type ProjectCategory =
  | 'Cybersecurity'
  | 'Data Engineering'
  | 'Full-Stack & AI'
  | 'SaaS & Automation'
  | 'Computer Vision & LLMs'
  | 'Edge AI & Privacy';

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  /** Optional hand-made cover image. When omitted, ProjectCard renders a
   *  generated cover from `category` so new projects never need custom art. */
  image?: string;
  videoUrl?: string;
  highlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  toolsUsed?: string[];
  /** Optional placeholder for upcoming project media (image or video) */
  mediaPlaceholder?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer?: string;
}

export interface QuickFact {
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
}

export interface OperationalPrinciple {
  id: string;
  number: string;
  title: string;
  statement: string;
}

export interface ResearchObservation {
  id: string;
  category: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface EducationMilestone {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location?: string;
}

export interface EngineerProfile {
  title: string;
  subtitle: string;
  profile: {
    name: string;
    role: string;
    avatarUrl?: string;
    status: string;
  };
  quickFacts: QuickFact[];
  bioParagraphs: string[];
  bioHighlightKeywords: string[];
  education?: EducationMilestone[];
  principlesHeading: string;
  principles: OperationalPrinciple[];
  focusHeading: string;
  focusAreas: ResearchObservation[];
}

export interface ResearchEntry {
  id: string;
  year: string;
  category: string;
  title: string;
  venue: string;
  description: string;
  tags: string[];
  link?: string;
  actionLabel?: string;
  image?: string;
  videoUrl?: string;
}

