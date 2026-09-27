import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'neo-analytics',
    title: 'Neo-Analytics',
    year: '2023 - Present',
    description:
      'Real-time data streaming and distributed analytics platform processing near-Earth astronomical telemetry with live dashboarding.',
    category: 'Data Engineering',
    tags: ['Apache Kafka', 'Spark', 'TimescaleDB', 'Grafana', 'NASA API'],
    toolsUsed: ['NASA NeoWs API', 'Apache Kafka', 'Apache Spark', 'TimescaleDB', 'Grafana'],
    highlights: [
      'Ingested real-time near-Earth astronomical event streams via NASA NeoWs API endpoints.',
      'Built a fault-tolerant stream processing pipeline leveraging Apache Kafka for event bus messaging and Apache Spark for analytics.',
      'Stored time-series observations inside TimescaleDB with hypertable partitioning for optimal aggregation query performance.',
      'Designed visual live telemetry dashboards in Grafana with proactive alert thresholds and historical trend tracking.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/neo-project',
    liveUrl: '#',
  },
  {
    id: 'bidforge',
    title: 'BidForge',
    year: '2025 - Present',
    description:
      'Enterprise proposal engine and tender response pipeline utilizing multi-agent orchestration for automated RFP parsing, requirement mapping, and synthesis.',
    category: 'SaaS & Automation',
    tags: ['Python', 'Multi-Agent', 'LLM', 'FastAPI', 'AWS S3'],
    toolsUsed: ['Python', 'FastAPI', 'Multi-Agent LLM', 'AWS S3', 'LangChain'],
    highlights: [
      'Designed a multi-agent orchestration pipeline that autonomously processes RFP documents and extracts structured compliance matrices.',
      'Engineered asynchronous agents for document parsing, requirements classification, and narrative draft synthesis.',
      'Integrated AWS S3 storage buckets with strict access policies for enterprise proposal assets.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/BidForge',
    liveUrl: '#',
  },
  {
    id: 'blind-navigation-cv',
    title: 'Integrating Computer Vision & LLMs for Real-Time Blind Navigation',
    year: '2026',
    description:
      'Published in Cureus Journal of Computer Science (Springer Nature). Hands-free assistive wearable device powered by a Raspberry Pi edge computing architecture coupled with cloud-assisted LLM reasoning for real-time obstacle annotation and navigation.',
    category: 'Computer Vision & LLMs',
    tags: ['Computer Vision', 'LLMs', 'Edge Computing', 'Raspberry Pi', 'Springer Nature', 'Assistive AI'],
    toolsUsed: ['Python', 'OpenCV', 'Raspberry Pi', 'Edge AI', 'Voice-Vision Multimodal', 'LLaMA'],
    highlights: [
      'Designed and evaluated a wearable, hands-free assistive device combining edge computer vision with multimodal voice interaction.',
      'Achieved 0.6s wake-word latency and 93% speech recognition in quiet environments for autonomous voice prompts.',
      'Demonstrated 88% real-time obstacle detection accuracy in typical lighting conditions across empirical user trials.',
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
      'Proactive privacy preservation framework that intercepts and sanitizes sensitive enterprise tokens and PII on the client edge before prompts dispatch to external LLM endpoints.',
    category: 'Edge AI & Privacy',
    tags: ['LLM Security', 'PII Redaction', 'Data Privacy', 'Python', 'FastAPI', 'Token Sanitization'],
    toolsUsed: ['Python', 'FastAPI', 'Regex Engine', 'Token Redaction', 'Edge Proxy', 'Zero-Trust'],
    highlights: [
      'Engineered client-edge interceptor proxy ensuring zero private data or credentials escape to public LLM endpoints.',
      'Constructed real-time token sanitization and pattern-matching filters with negligible sub-millisecond overhead.',
      'Implemented configurable enterprise policy compliance rules and audit logging for sensitive prompts.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rakshak-pii',
    liveUrl: '#',
  },
  {
    id: 'omniscient',
    title: 'Omniscient',
    year: '2023 - Present',
    description:
      'AI-powered task and workflow orchestration platform with LLaMA LLM integration, role-based access control, and real-time WebSockets.',
    category: 'Full-Stack & AI',
    tags: ['Django', 'React.js', 'LLaMA', 'WebSockets', 'MongoDB'],
    toolsUsed: ['Django', 'React.js', 'LLaMA', 'Python', 'Node.js', 'MongoDB', 'REST APIs', 'WebSockets'],
    highlights: [
      'Built a full REST-based task management system with role-based access control (RBAC), enabling teams to track work across complex projects.',
      'Engineered intelligent triage and contextual summarization features powered by LLaMA model integration.',
      'Used Django REST Framework for robust backend APIs; created a clean, responsive UI with React and Tailwind CSS.',
      'Implemented JWT authentication, server-side pagination, advanced filtering, and instant bidirectional updates over WebSockets.',
      'Optimized database endpoints using query tuning, compound indexes, and lean serializers, reducing average response latency by 40%.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/Omniscient',
    liveUrl: '#',
  },
  {
    id: 'rift',
    title: 'RIFT - Remote Intrusion Framework',
    year: '2023 - Present',
    description:
      'Security operations and remote intrusion framework engineered in Go and Django REST with asynchronous execution loops, Celery worker nodes, and Redis queues.',
    category: 'Cybersecurity',
    tags: ['Go', 'MySQL', 'React', 'Django', 'Celery', 'Redis', 'RESTful'],
    toolsUsed: ['Go', 'MySQL', 'React', 'Django REST', 'Celery', 'Redis'],
    highlights: [
      'Engineered modular intrusion simulation and contest infrastructure with real-time scoring.',
      'Implemented background asynchronous execution loops using Celery and Redis to decouple ingestion from compute.',
      'Designed authenticated REST APIs with strict role-based controls and idempotency guarantees.',
      'Implemented structured logging and automatic retry circuits for resilient remote operations.',
    ],
    githubUrl: 'https://github.com/dhiraj-rajput/rift-agent',
    liveUrl: '#',
  },
];
