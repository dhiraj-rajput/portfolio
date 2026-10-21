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
      'Wearable Raspberry Pi assistive system combining OpenCV object detection with LLM voice guidance, achieving 0.6s wake-word latency, 93% speech accuracy, and 88% obstacle detection in user trials.',
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
      'Client-edge FastAPI proxy that detects and redacts API keys, credentials, and PII in sub-millisecond latency before prompts leave the local network.',
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
      'Multi-agent Python workflow that decomposes enterprise RFP PDFs, maps mandatory compliance clauses, and drafts technical responses with source citations.',
    tags: ['Multi-Agent', 'LLM', 'RFP Automation', 'Orchestration', 'Python', 'Document AI'],
    link: 'https://github.com/dhiraj-rajput/BidForge',
    actionLabel: 'View Project ↗',
    image: '/projects/bidforge.png',
  },
];
