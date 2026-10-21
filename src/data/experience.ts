import type { ExperienceEntry, TechDomain, LeadershipEntry } from '../types';

export type { ExperienceEntry, TechDomain, LeadershipEntry };

export const experiences: ExperienceEntry[] = [
  {
    id: 'orbitavanya-intern',
    role: 'Software Engineer Intern',
    company: 'OrbitAvanya Tech LLP',
    website: 'https://orbitavanyatech.com/',
    location: 'Pune, India',
    period: 'Jul 2025 - Dec 2025',
    type: 'Internship',
    responsibilities: [
      {
        heading: 'Winbidai - AI Tender Discovery & Proposal Engine',
        detail:
          'Built a multi-tenant SaaS platform that indexes public tenders, extracts compliance requirements, and drafts structured RFP responses.',
      },
      {
        heading: 'Leadorbit - Self-Hosted B2B Outreach Automation',
        detail:
          'Developed a self-hosted outreach service automating multi-step email and LinkedIn sequences with deliverability tracking.',
      },
      {
        heading: 'Mind Elevate - Enterprise Wellbeing Platform',
        detail:
          'Implemented backend APIs, role-based access control, and analytics dashboards for a corporate coaching platform.',
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
      'Endpoint hardening, intrusion simulation frameworks (RIFT), and client-side LLM PII redaction proxies (RakshaNetra).',
  },
  {
    id: 'ai-ml',
    category: 'Artificial Intelligence',
    stack: 'Multi-Agent LLMs / Computer Vision / Edge NLP',
    description:
      'Edge computer vision and LLM pipelines for assistive navigation and automated RFP compliance extraction.',
  },
  {
    id: 'iot',
    category: 'IoT & Embedded Systems',
    stack: 'Raspberry Pi / Sensor Fusion / Microcontrollers',
    description:
      'Camera and audio sensor pipelines on Raspberry Pi for real-time assistive navigation (0.6s latency).',
  },
  {
    id: 'programming',
    category: 'Programming',
    stack: 'Python / C++ / TypeScript / Go',
    description:
      'Backend services in Python and Go, systems tooling in C++, and type-safe web interfaces in TypeScript.',
  },
  {
    id: 'cloud',
    category: 'Cloud & Big Data',
    stack: 'Kafka / TimescaleDB / Oracle OCI / Redis / AWS S3',
    description:
      'Event streaming with Apache Kafka and Spark, time-series indexing in TimescaleDB, and cloud deployments.',
  },
  {
    id: 'stacks',
    category: 'Stacks & Tools',
    stack: 'FastAPI / Django REST / React / Docker / Linux',
    description:
      'REST and WebSocket APIs with FastAPI and Django, React frontends, and containerized Linux deployments.',
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
