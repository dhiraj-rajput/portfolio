import type { FAQ } from '../types';

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What are your primary areas of specialization?',
    answer:
      'I specialize in Cybersecurity (intrusion analysis tools, threat surface mapping, secure API design) and Full Stack Development using Go, Python, React, Next.js, Django, and cloud streaming architectures.',
  },
  {
    id: 'faq-2',
    question: 'How do you integrate security into full stack development?',
    answer:
      'I follow secure-by-design principles: strict role-based access controls (RBAC), tamper-proof JWT sessions, rate limiting, parameterized queries, and idempotent backend task workers with Celery and Redis.',
  },
  {
    id: 'faq-3',
    question: 'What kinds of projects have you engineered?',
    answer:
      'My work spans real-time intrusion evaluation frameworks (RIFT), distributed streaming pipelines (Neo-Analytics with Kafka & Spark), AI-assisted platforms (Omniscient with LLaMA), and interactive web apps.',
  },
  {
    id: 'faq-4',
    question: 'Where are you located and what opportunities are you open to?',
    answer:
      'I am based in Pune, India, currently pursuing my BTech in CSE (Cybersecurity & Forensics) at MIT-WPU with an 8.89 CGPA. I am actively open to Full Stack Developer, Software Engineer, and Cybersecurity roles.',
  },
];
