import type { ResearchEntry } from '../types';

/**
 * Research & Innovation Entries
 *
 * Peer-reviewed publications and novel research frameworks.
 */
export const researchEntries: ResearchEntry[] = [
  {
    id: 'blind-navigation-paper',
    year: '2026',
    category: 'Computer Vision & LLMs',
    title: 'Integrating Computer Vision and Large Language Models for Real-Time Blind Navigation',
    venue: 'Cureus Journal of Computer Science - Springer Nature',
    description:
      'A wearable, hands-free assistive device combining Raspberry Pi edge vision with LLM reasoning. Evaluated empirically with 0.6s wake-word latency, 93% speech accuracy, and 88% real-time obstacle detection.',
    tags: ['Computer Vision', 'LLMs', 'Edge Computing', 'Raspberry Pi', 'Springer Nature', 'Assistive AI'],
    link: 'https://doi.org/10.7759/s44389-026-00265-x',
    actionLabel: 'Read Paper ↗',
    videoUrl: '/vacars.mp4',
    videoCaption: 'Live Demonstration Video: Assistive Blind Navigation',
  },
  {
    id: 'rakshanetra',
    year: '2026',
    category: 'Edge AI & Privacy',
    title: 'RakshaNetra - Proactive Data Leakage Prevention for LLMs',
    venue: 'Applied Research & Open Source',
    description:
      'Client-edge privacy proxy that intercepts and sanitizes sensitive tokens and PII before prompts reach third-party LLMs. Features sub-millisecond pattern filtering and zero-leakage routing.',
    tags: ['LLM Security', 'PII Redaction', 'Data Privacy', 'Python', 'FastAPI', 'Token Sanitization'],
    link: 'https://github.com/dhiraj-rajput/rakshak-pii',
    actionLabel: 'View Project ↗',
    image: '/projects/rakshanetra.png',
  },
  {
    id: 'bidforge',
    year: '2025',
    category: 'Multi-Agent Systems',
    title: 'BidForge - Automated RFP Multi-Agent Response Pipeline',
    venue: 'Applied Research',
    description:
      'Multi-agent pipeline that parses RFP documents, extracts requirements, and generates compliance-mapped proposals using specialized parsing and synthesis agents.',
    tags: ['Multi-Agent', 'LLM', 'RFP Automation', 'Orchestration', 'Python', 'Document AI'],
    link: 'https://github.com/dhiraj-rajput/BidForge',
    actionLabel: 'View Project ↗',
    image: '/projects/bidforge.png',
  },
];
