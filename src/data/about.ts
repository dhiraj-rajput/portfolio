import type { EngineerProfile } from '../types';

/**
 * About & Engineer Profile Data
 * 
 * Customize any information here to update your about section.
 * To use a photo, place an image file in the /public folder (e.g. /public/profile.jpg).
 */
export const engineerData: EngineerProfile = {
  title: 'About Me',
  subtitle: 'A quick look at my background, what I build, and how I work.',

  profile: {
    name: 'Dhiraj Rajput',
    role: 'Cybersecurity & Full-Stack Developer',
    avatarUrl: '/profile.jpg',
    status: 'Available for work',
  },

  quickFacts: [
    { label: 'Location', value: 'Pune, India' },
    { label: 'Specialization', value: 'Cybersecurity & Forensics' },
    { label: 'CGPA', value: '8.87 / 10.0', highlight: true },
    { label: 'Publication', value: 'Springer Nature (2026)', href: 'https://doi.org/10.7759/s44389-026-00265-x' },
    { label: 'GitHub', value: 'github.com/dhiraj-rajput', href: 'https://github.com/dhiraj-rajput' },
    { label: 'Status', value: 'Open for Roles', highlight: true },
  ],

  bioParagraphs: [
    "I'm a Computer Science undergraduate at MIT-WPU Pune specializing in Cybersecurity and Forensics (8.87 CGPA). I work across the stack - building responsive React and TypeScript interfaces alongside Go and Python backend services designed for security and reliability.",
    "My recent work focuses on real-time data pipelines and applied AI security: streaming NASA telemetry with Apache Kafka and TimescaleDB (Neo-Analytics), filtering sensitive PII before prompts reach external LLMs (RakshaNetra), and publishing peer-reviewed assistive computer vision research in Springer Nature.",
  ],

  bioHighlightKeywords: [
    'MIT-WPU Pune',
    'Cybersecurity and Forensics',
    'React',
    'TypeScript',
    'Apache Kafka',
    'TimescaleDB',
    'Neo-Analytics',
    'RakshaNetra',
    'Springer Nature',
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
      statement: 'Build authentication, input validation, and least-privilege access from day one.',
    },
    {
      id: 'p2',
      number: '02',
      title: 'Predictable Performance',
      statement: 'Measure latency and keep services responsive under concurrent load.',
    },
    {
      id: 'p3',
      number: '03',
      title: 'Test Real Scenarios',
      statement: 'Verify systems against live telemetry, edge cases, and practical threat models.',
    },
    {
      id: 'p4',
      number: '04',
      title: 'Fail Gracefully',
      statement: 'Isolate service failures so a single broken component never crashes the pipeline.',
    },
  ],
};
