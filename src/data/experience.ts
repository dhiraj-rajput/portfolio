import type { ExperienceEntry, TechDomain, LeadershipEntry } from '../types';

export type { ExperienceEntry, TechDomain, LeadershipEntry };

export const experiences: ExperienceEntry[] = [
  {
    id: 'orbitavanya-intern',
    role: 'Software Engineer Intern',
    company: 'OrbitAvanya Tech',
    website: 'https://orbitavanyatech.com/',
    location: 'Pune, India',
    period: 'Jul 2025 - Oct 2025',
    type: 'Internship',
    responsibilities: [
      {
        heading: 'Winbidai - AI Tender Discovery & Proposal Engine',
        detail:
          'Built a multi-tenant AI SaaS for tender discovery and automated proposal drafting with CRM workflows and autonomous research agents.',
      },
      {
        heading: 'Leadorbit - Self-Hosted AI SDR for B2B Outreach',
        detail:
          'Engineered a self-hosted AI SDR platform automating LinkedIn sequences and cold email campaigns with deliverability tracking and private data control.',
      },
      {
        heading: 'Mind Elevate - Corporate Mental Performance Platform',
        detail:
          'Developed an enterprise mental performance platform featuring executive coaching modules and privacy-first wellbeing analytics.',
      },
    ],
  },
];

/** Technical Expertise domains */
export const techDomains: TechDomain[] = [
  {
    id: 'cybersecurity',
    category: 'Cybersecurity',
    stack: 'Endpoint Security / Forensics / RBAC / Intrusion Detection',
    description:
      'Applied endpoint defenses, simulated intrusion frameworks (RIFT), and engineered zero-leakage PII sanitizers (RakshaNetra).',
  },
  {
    id: 'ai-ml',
    category: 'Artificial Intelligence',
    stack: 'Multi-Agent LLMs / Computer Vision / Edge NLP',
    description:
      'Engineered edge vision and LLM reasoning for blind navigation (Springer Nature) and built client-side PII redaction proxies.',
  },
  {
    id: 'iot',
    category: 'IoT & Embedded Systems',
    stack: 'Raspberry Pi / Sensor Fusion / Microcontrollers',
    description:
      'Integrated camera and audio sensor loops on Raspberry Pi edge devices for assistive navigation with 0.6s wake-word latency.',
  },
  {
    id: 'programming',
    category: 'Programming',
    stack: 'Rust / Go / Python / C++ / TypeScript',
    description:
      'Systems programming in Rust and C++, distributed services in Go and Python, and responsive web apps in TypeScript.',
  },
  {
    id: 'cloud',
    category: 'Cloud & Big Data',
    stack: 'Kafka / TimescaleDB / Oracle OCI / Redis / AWS S3',
    description:
      'High-throughput event streaming with Kafka and Spark, partitioned time-series storage in TimescaleDB, and cloud deployments.',
  },
  {
    id: 'stacks',
    category: 'Stacks & Tools',
    stack: 'FastAPI / Django REST / React / Docker / Linux',
    description:
      'Built multi-tenant enterprise backends with FastAPI and Django REST, modern UIs with React, and containerized deployments with Docker.',
  },
];

/**
 * Leadership & Recognition entries (excluding RenAIssance 2025 and Patent ID entry)
 */
export const leadershipEntries: LeadershipEntry[] = [
  {
    id: 'springer-nature-pub',
    category: 'Cureus Publication',
    title: 'Springer Nature Journal - Integrating CV & LLMs for Real-Time Blind Navigation',
    year: '2026',
    link: 'https://doi.org/10.7759/s44389-026-00265-x',
  },
  {
    id: 'ignisia',
    category: 'Ignisia Hackathon',
    title: 'Ignisia 2026 - 2nd Place',
    year: '2026',
    link: 'https://www.linkedin.com/posts/dhiraj-rajput-_hackathon-ai-startup-activity-7447565949110775808-DFpy',
  },
  {
    id: 'ciphathon',
    category: 'Ciphathon Hackathon',
    title: 'Ciphathon 2026 - 5th Place',
    year: '2026',
    link: 'https://www.linkedin.com/posts/dhiraj-rajput-_cybersecurity-privacy-hackathon-activity-7444235427437469696-JXPn',
  },
  {
    id: 'oracle-oci',
    category: 'Oracle Cloud',
    title: 'Oracle Cloud Foundations Associate',
    year: '2026',
    link: 'https://drive.google.com/file/d/1iMo8Pg5Aw9Vze6fBK8ZHcLm4erDISKGm/view?usp=sharing',
  },
  {
    id: 'cisco-endpoint',
    category: 'Cisco Networking',
    title: 'Cisco Endpoint Security',
    year: '2026',
    link: 'https://www.credly.com/badges/b68dcf4e-f7c0-4b3a-8999-e3fa70538595',
  },
  {
    id: 'cisco-analyst',
    category: 'Cisco Networking',
    title: 'Junior Cybersecurity Analyst Career Path',
    year: '2026',
    link: 'https://www.credly.com/badges/56d94fe5-e7d4-4162-bec1-68694a50dd12',
  },
  {
    id: 'devconf',
    category: 'DevConf 2025 Speaker',
    title: 'DevConf 2025 - Speaker',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=rSsRnHpn0qo',
  },
];
