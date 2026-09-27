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
          'Engineered an AI-powered SaaS platform for tender discovery, company intelligence, and automated proposal generation. Implemented multi-tenant architectural isolation, integrated CRM workflows, and deployed autonomous research agents to aggregate tender data and generate compliant proposals.',
      },
      {
        heading: 'Leadorbit - Self-Hosted AI SDR for B2B Outreach',
        detail:
          'Developed a self-hosted AI Sales Development Representative (SDR) platform for B2B outreach automation. Orchestrated automated LinkedIn connection sequences and cold email campaigns with full private data sovereignty, deliverability tracking, and integrated newsletter management.',
      },
      {
        heading: 'Mind Elevate - Corporate Mental Performance Platform',
        detail:
          'Engineered an organizational mental performance platform delivering monthly focus themes, confidential executive coaching modules, and privacy-preserving aggregated wellbeing analytics for enterprise administrators.',
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
      'Applied endpoint security architectures, reverse-engineered credential harvesting endpoints, simulated intrusion frameworks (RIFT), and engineered zero-leakage PII sanitizers (RakshaNetra).',
  },
  {
    id: 'ai-ml',
    category: 'Artificial Intelligence',
    stack: 'Multi-Agent LLMs / Computer Vision / Edge NLP',
    description:
      'Engineered edge computer vision and LLM reasoning for blind navigation (Springer Nature), built client-edge PII redaction proxies, and orchestrated multi-agent proposal synthesis engines.',
  },
  {
    id: 'iot',
    category: 'IoT & Embedded Systems',
    stack: 'Raspberry Pi / Sensor Fusion / Microcontrollers',
    description:
      'Integrated camera and speech sensor loops on Raspberry Pi edge devices for real-time assistive navigation with 0.6s wake-word latency and 88% object detection.',
  },
  {
    id: 'programming',
    category: 'Programming',
    stack: 'Rust / Go / Python / C++ / TypeScript',
    description:
      'Engineered high-performance low-level systems in Rust (Arc), asynchronous distributed frameworks in Go (RIFT), AI pipeline automation in Python, and reactive web applications in TypeScript.',
  },
  {
    id: 'cloud',
    category: 'Cloud & Big Data',
    stack: 'Kafka / TimescaleDB / Oracle OCI / Redis / AWS S3',
    description:
      'Configured high-throughput event buses with Kafka and Spark in Neo-Analytics, structured time-series data in TimescaleDB, and configured certified Oracle OCI architectures.',
  },
  {
    id: 'stacks',
    category: 'Stacks & Tools',
    stack: 'FastAPI / Django REST / React / Docker / Linux',
    description:
      'Built multi-tenant enterprise platforms at OrbitAvanya Tech, containerized microservices with Docker, and developed low-latency full-stack portals with React and Django.',
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
