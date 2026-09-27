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
      'Published in Cureus Journal of Computer Science (Springer Nature). Designed and evaluated a wearable, hands-free assistive device powered by a Raspberry Pi edge computing architecture coupled with cloud-assisted LLM reasoning. Achieved 0.6s wake-word latency, 93% speech recognition in quiet conditions, and 88% object detection in typical lighting across empirical user evaluations.',
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
      'Architected a proactive privacy preservation framework that intercepts and sanitizes sensitive enterprise tokens and PII on the client edge before prompts dispatch to external LLM endpoints. Implements real-time token redaction, regex filters, and zero-leakage proxy routing for secure enterprise AI adoption.',
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
      'Designed a multi-agent orchestration pipeline that autonomously processes Request for Proposal (RFP) documents, extracts structured requirements, and generates contextually accurate, compliance-mapped proposal responses. Utilizes specialized agents for document parsing, classification, and final narrative synthesis.',
    tags: ['Multi-Agent', 'LLM', 'RFP Automation', 'Orchestration', 'Python', 'Document AI'],
    link: 'https://github.com/dhiraj-rajput/BidForge',
    actionLabel: 'View Project ↗',
    image: '/projects/bidforge.png',
  },
];
