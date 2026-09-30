export interface NavLink {
  label: string;
  href: string;
}

export interface TechItem {
  name: string;
  icon: string;
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
  image?: string;
  videoUrl?: string;
  highlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  toolsUsed?: string[];
  mediaPlaceholder?: boolean;
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
  focusHeading?: string;
  focusAreas?: ResearchObservation[];
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
  videoCaption?: string;
  videoPoster?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  website?: string;
  location: string;
  period: string;
  type: string;
  responsibilities: Array<{
    heading: string;
    detail: string;
  }>;
}

export interface TechDomain {
  id: string;
  category: string;
  stack: string;
  description: string;
}

export interface LeadershipEntry {
  id: string;
  category: string;
  title: string;
  year: string;
  link?: string;
}
