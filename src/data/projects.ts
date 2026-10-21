import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'neo-analytics',
    title: 'Neo-Analytics',
    year: '2023 - Present',
    description:
      'Real-time streaming pipeline ingesting NASA near-Earth asteroid telemetry into live dashboards.',
    category: 'Data Engineering',
    tags: ['Apache Kafka', 'Spark', 'TimescaleDB', 'Grafana', 'NASA API'],
    toolsUsed: ['NASA NeoWs API', 'Apache Kafka', 'Apache Spark', 'TimescaleDB', 'Grafana'],
    highlights: [
      'Streams live NASA NeoWs asteroid telemetry through Apache Kafka and Spark.',
      'Stores partitioned time-series records in TimescaleDB hypertables for sub-second queries.',
      'Visualizes orbital proximity and velocity metrics on real-time Grafana dashboards.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/neo-project',
    liveUrl: '#',
  },
  {
    id: 'bidforge',
    title: 'BidForge',
    year: '2025 - Present',
    description:
      'Multi-agent LLM workflow that parses RFPs, maps compliance requirements, and drafts proposals.',
    category: 'SaaS & Automation',
    tags: ['Python', 'Multi-Agent', 'LLM', 'FastAPI', 'AWS S3'],
    toolsUsed: ['Python', 'FastAPI', 'Multi-Agent LLM', 'AWS S3', 'LangChain'],
    highlights: [
      'Parses complex RFP documents into structured compliance checklists using multi-agent workflows.',
      'Runs asynchronous FastAPI workers for requirement classification and section drafting.',
      'Stores proposal artifacts in AWS S3 with role-scoped access policies.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/BidForge',
    liveUrl: '#',
  },
  {
    id: 'blind-navigation-cv',
    title: 'Integrating Computer Vision & LLMs for Real-Time Blind Navigation',
    year: '2026',
    description:
      'Springer Nature published wearable combining Raspberry Pi edge vision and LLMs for obstacle navigation.',
    category: 'Computer Vision & LLMs',
    tags: ['Computer Vision', 'LLMs', 'Edge Computing', 'Raspberry Pi', 'Springer Nature', 'Assistive AI'],
    toolsUsed: ['Python', 'OpenCV', 'Raspberry Pi', 'Edge AI', 'Voice-Vision Multimodal', 'LLaMA'],
    highlights: [
      'Pairs Raspberry Pi camera feeds with multimodal voice guidance for hands-free navigation.',
      'Reached 0.6s wake-word latency, 93% speech recognition, and 88% obstacle detection accuracy.',
      'Published peer-reviewed findings in Cureus Journal of Computer Science (Springer Nature).',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput',
    liveUrl: 'https://doi.org/10.7759/s44389-026-00265-x',
  },
  {
    id: 'raksha-netra',
    title: 'RakshaNetra - Proactive Data Leakage Prevention for LLMs',
    year: '2026',
    description:
      'Client-edge privacy proxy that redacts credentials and PII before prompts reach external LLMs.',
    category: 'Edge AI & Privacy',
    tags: ['LLM Security', 'PII Redaction', 'Data Privacy', 'Python', 'FastAPI', 'Token Sanitization'],
    toolsUsed: ['Python', 'FastAPI', 'Regex Engine', 'Token Redaction', 'Edge Proxy', 'Zero-Trust'],
    highlights: [
      'Intercepts outbound LLM prompts to strip API keys, secrets, and personal identifiers.',
      'Applies sub-millisecond regex and token-redaction rules at the client edge.',
      'Records local audit logs so teams can verify compliance without exposing payloads.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rakshak-pii',
    liveUrl: '#',
  },
  {
    id: 'omniscient',
    title: 'Omniscient',
    year: '2023 - Present',
    description:
      'Collaborative task platform with local LLaMA triage, role-based access, and WebSocket sync.',
    category: 'Full-Stack & AI',
    tags: ['Django', 'React.js', 'LLaMA', 'WebSockets', 'MongoDB'],
    toolsUsed: ['Django', 'React.js', 'LLaMA', 'Python', 'Node.js', 'MongoDB', 'REST APIs', 'WebSockets'],
    highlights: [
      'Enforces role-based access control across team workspaces with JWT-authenticated WebSockets.',
      'Automates ticket triage and thread summaries using locally hosted LLaMA models.',
      'Cut API query latency by 40% through compound MongoDB indexing.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/Omniscient',
    liveUrl: '#',
  },
  {
    id: 'rift',
    title: 'RIFT - Remote Intrusion Framework',
    year: '2023 - Present',
    description:
      'Security testing and intrusion simulation platform built with Go agents, Django REST, and Redis.',
    category: 'Cybersecurity',
    tags: ['Go', 'MySQL', 'React', 'Django', 'Celery', 'Redis', 'RESTful'],
    toolsUsed: ['Go', 'MySQL', 'React', 'Django REST', 'Celery', 'Redis'],
    highlights: [
      'Coordinates simulated intrusion exercises using lightweight Go agents and a React dashboard.',
      'Dispatches asynchronous scan tasks through Celery workers and Redis queues.',
      'Logs auditable telemetry with idempotent REST endpoints and automatic retry circuits.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rift-agent',
    liveUrl: '#',
  },
];
