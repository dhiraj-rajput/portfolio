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
    "I'm a Computer Science student at MIT-WPU Pune specializing in Cybersecurity and Forensics. I like building from both sides of the stack: designing clean, responsive web applications with React and Next.js, while digging into network protocols, binary analysis, and security fundamentals to make sure systems hold up under real-world conditions.",
    "Much of my work revolves around real-time data pipelines and applied security. Whether that's streaming astronomical telemetry with Apache Kafka and TimescaleDB in Neo-Analytics, building lightweight token filters to prevent data leakage in LLMs (RakshaNetra), or publishing assistive computer vision research with Springer Nature, I focus on building reliable software that solves tangible problems.",
  ],

  bioHighlightKeywords: [
    'MIT-WPU Pune',
    'Cybersecurity and Forensics',
    'React',
    'Next.js',
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
      statement: 'Security is a core constraint from day one, not a patch applied at the end.',
    },
    {
      id: 'p2',
      number: '02',
      title: 'Predictable Performance',
      statement: 'Keep systems fast, measurable, and reliable under high concurrent load.',
    },
    {
      id: 'p3',
      number: '03',
      title: 'Test Real Scenarios',
      statement: "Validate assumptions against live telemetry, messy edge cases, and actual threat models.",
    },
    {
      id: 'p4',
      number: '04',
      title: 'Fail Gracefully',
      statement: 'Set strict failure boundaries so one breaking service never brings down the whole system.',
    },
  ],
};

