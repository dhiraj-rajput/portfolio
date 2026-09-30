import type { EngineerProfile } from '../types';

/**
 * About & Engineer Profile Data
 * 
 * Customize any information here to update your about section.
 * To use a photo, place an image file in the /public folder (e.g. /public/profile.jpg).
 */
export const engineerData: EngineerProfile = {
  title: 'About Me',
  subtitle: 'Background, engineering philosophy, and active focus areas.',

  profile: {
    name: 'Dhiraj Rajput',
    role: 'Cybersecurity & Full-Stack Developer',
    avatarUrl: '/profile.jpg',
    status: 'Available for work',
  },

  quickFacts: [
    { label: 'Institution', value: 'MIT-WPU Pune' },
    { label: 'Degree', value: 'B.Tech Computer Science' },
    { label: 'Specialization', value: 'Cybersecurity & Forensics' },
    { label: 'CGPA', value: '8.87 / 10.0', highlight: true },
    { label: 'Research Focus', value: 'Applied AI & Autonomous Systems' },
    { label: 'Active Domains', value: 'Full-Stack Dev, Forensics & Cloud' },
    { label: 'GitHub', value: 'github.com/dhiraj-rajput', href: 'https://github.com/dhiraj-rajput' },
    { label: 'Location', value: 'Pune, India' },
    { label: 'Status', value: 'Open for Roles', highlight: true },
  ],

  bioParagraphs: [
    'Building and securing modern distributed architectures at the intersection of offensive security, stream telemetry, and resilient web infrastructure is less about stitching libraries together and more about understanding system invariants and threat models. My journey began with low-level protocol inspection and binary reverse engineering, exploring how network packets traverse unverified boundaries.',
    'As a Computer Science candidate specializing in Cybersecurity and Forensics at MIT-WPU Pune, I engineer defensive loops and high-throughput data pipelines. From orchestrating distributed telemetry pipelines with Apache Kafka and TimescaleDB in Neo-Analytics, to architecting intelligent workflow automation and secure full-stack systems, my focus is always on deterministic reliability.',
    'Whether auditing zero-trust authentication barriers, sanitizing LLM execution paths with private model orchestration (Omniscient), or building low-latency reactive web frontends with React and Next.js, I bridge the gap between rigorous systems security and seamless digital performance.',
  ],

  bioHighlightKeywords: [
    'MIT-WPU Pune',
    'Cybersecurity and Forensics',
    'Apache Kafka',
    'TimescaleDB',
    'Neo-Analytics',
    'Omniscient',
    'React',
    'Next.js',
    'zero-trust authentication',
  ],

  education: [
    {
      institution: 'Dr. Vishwanath Karad MIT WPU',
      degree: 'B.Tech in Computer Science (Cybersecurity & Forensics)',
      period: 'Aug 2023 - Present',
      grade: 'CGPA: 8.87 / 10.0',
      location: 'Pune, India',
    },
    {
      institution: 'Smt. Chandibai Himathmal Mansukhani College',
      degree: 'Higher Secondary Certificate - Class XII (Maharashtra Board)',
      period: 'Jun 2021 - May 2023',
      grade: 'Score: 85.50%',
      location: 'Ulhasnagar, Maharashtra',
    },
    {
      institution: "RCT'S P.M.M. Rotary School",
      degree: 'Secondary School Certificate - Class X (SSC Board)',
      period: 'Jun 2020 - May 2021',
      grade: 'Score: 95.00%',
      location: 'Ambernath, Maharashtra',
    },
  ],

  principlesHeading: 'Core Engineering Principles',

  principles: [
    {
      id: 'p1',
      number: '01',
      title: 'Security by Design',
      statement: 'Security is a foundational architectural constraint, never an external wrapper added after the fact.',
    },
    {
      id: 'p2',
      number: '02',
      title: 'Low-Latency Determinism',
      statement: 'Low-latency streaming and deterministic event loops guarantee system resilience under peak concurrent load.',
    },
    {
      id: 'p3',
      number: '03',
      title: 'Empirical Verification',
      statement: 'Validate theoretical threat models through continuous telemetry feedback and structured penetration testing.',
    },
    {
      id: 'p4',
      number: '04',
      title: 'Graceful Degradation',
      statement: 'Design strict failure boundaries so isolated component anomalies never cascade into catastrophic service outages.',
    },
  ],
};

