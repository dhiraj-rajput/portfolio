import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'neo-analytics',
    title: 'Neo-Analytics',
    year: '2023 - Present',
    description:
      'Real-time streaming pipeline processing NASA near-Earth astronomical telemetry with live dashboards.',
    category: 'Data Engineering',
    tags: ['Apache Kafka', 'Spark', 'TimescaleDB', 'Grafana', 'NASA API'],
    toolsUsed: ['NASA NeoWs API', 'Apache Kafka', 'Apache Spark', 'TimescaleDB', 'Grafana'],
    highlights: [
      'Ingests live NASA NeoWs astronomical telemetry event streams.',
      'Event-driven processing pipeline using Apache Kafka for messaging and Apache Spark for streaming analytics.',
      'Partitioned time-series records in TimescaleDB hypertables for sub-second analytical querying.',
      'Built real-time Grafana telemetry dashboards with custom alerting thresholds.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/neo-project',
    liveUrl: '#',
  },
  {
    id: 'bidforge',
    title: 'BidForge',
    year: '2025 - Present',
    description:
      'Enterprise proposal engine using multi-agent LLMs to parse RFPs, map requirements, and draft responses.',
    category: 'SaaS & Automation',
    tags: ['Python', 'Multi-Agent', 'LLM', 'FastAPI', 'AWS S3'],
    toolsUsed: ['Python', 'FastAPI', 'Multi-Agent LLM', 'AWS S3', 'LangChain'],
    highlights: [
      'Multi-agent pipeline that parses complex RFP documents and extracts structured compliance matrices.',
      'Asynchronous agents for requirement classification and narrative proposal drafting.',
      'Secure AWS S3 storage with strict IAM access policies for enterprise proposal assets.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/BidForge',
    liveUrl: '#',
  },
  {
    id: 'blind-navigation-cv',
    title: 'Integrating Computer Vision & LLMs for Real-Time Blind Navigation',
    year: '2026',
    description:
      'Published in Springer Nature (Cureus). Assistive wearable running edge computer vision and LLM reasoning for real-time obstacle navigation.',
    category: 'Computer Vision & LLMs',
    tags: ['Computer Vision', 'LLMs', 'Edge Computing', 'Raspberry Pi', 'Springer Nature', 'Assistive AI'],
    toolsUsed: ['Python', 'OpenCV', 'Raspberry Pi', 'Edge AI', 'Voice-Vision Multimodal', 'LLaMA'],
    highlights: [
      'Hands-free wearable assistive device combining edge vision with multimodal voice interaction.',
      'Achieved 0.6s wake-word latency and 93% speech recognition in quiet environments.',
      'Delivered 88% real-time obstacle detection accuracy across empirical user trials.',
      'Published peer-reviewed research in Cureus Journal of Computer Science (Springer Nature).',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput',
    liveUrl: 'https://doi.org/10.7759/s44389-026-00265-x',
  },
  {
    id: 'raksha-netra',
    title: 'RakshaNetra - Proactive Data Leakage Prevention for LLMs',
    year: '2026',
    description:
      'Edge privacy proxy that intercepts and sanitizes sensitive credentials and PII before prompts reach third-party LLMs.',
    category: 'Edge AI & Privacy',
    tags: ['LLM Security', 'PII Redaction', 'Data Privacy', 'Python', 'FastAPI', 'Token Sanitization'],
    toolsUsed: ['Python', 'FastAPI', 'Regex Engine', 'Token Redaction', 'Edge Proxy', 'Zero-Trust'],
    highlights: [
      'Client-edge proxy preventing credentials and PII from leaking to external LLM endpoints.',
      'Sub-millisecond token sanitization and pattern-matching regex filter engine.',
      'Configurable enterprise compliance rules with local prompt audit logging.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rakshak-pii',
    liveUrl: '#',
  },
  {
    id: 'omniscient',
    title: 'Omniscient',
    year: '2023 - Present',
    description:
      'Task and workflow platform featuring local LLaMA integration, role-based access, and real-time WebSockets.',
    category: 'Full-Stack & AI',
    tags: ['Django', 'React.js', 'LLaMA', 'WebSockets', 'MongoDB'],
    toolsUsed: ['Django', 'React.js', 'LLaMA', 'Python', 'Node.js', 'MongoDB', 'REST APIs', 'WebSockets'],
    highlights: [
      'Full REST task management with role-based access control (RBAC) across team projects.',
      'Automated ticket triage and contextual summaries using integrated LLaMA models.',
      'Real-time bidirectional updates via WebSockets with JWT authentication.',
      'Optimized backend queries and compound indexes, cutting response latency by 40%.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/Omniscient',
    liveUrl: '#',
  },
  {
    id: 'rift',
    title: 'RIFT - Remote Intrusion Framework',
    year: '2023 - Present',
    description:
      'Security operations and simulated intrusion platform built with Go, Django REST, and Redis queues.',
    category: 'Cybersecurity',
    tags: ['Go', 'MySQL', 'React', 'Django', 'Celery', 'Redis', 'RESTful'],
    toolsUsed: ['Go', 'MySQL', 'React', 'Django REST', 'Celery', 'Redis'],
    highlights: [
      'Modular intrusion simulation and security testing framework with real-time scoring.',
      'Asynchronous task execution using Celery workers and Redis message queues.',
      'Authenticated REST APIs with strict role controls and idempotent operations.',
      'Structured audit logging and automatic retry circuits for resilient remote operations.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rift-agent',
    liveUrl: '#',
  },
];
