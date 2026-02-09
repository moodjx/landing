/**
 * Application-wide constants
 * 
 * This file contains all static data used throughout the portfolio.
 * Keeping data separate from components makes it easier to update content
 * without touching component logic.
 */

// ============================================================================
// NAVIGATION SECTIONS
// ============================================================================

/**
 * Navigation sections configuration
 * Each section represents a scrollable area on the home page
 * Note: Contact is now a separate page, not a section on home
 *
 * @property {string} id - HTML id attribute for the section (used for scrolling)
 * @property {string} label - Display text in navigation
 */
export const NAV_SECTIONS = [
  { id: 'hero', label: 'HOME' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'blog', label: 'BLOG' }
];

// ============================================================================
// TECHNOLOGIES
// ============================================================================

/**
 * Technologies and tools used
 * Displayed in the Tech Stack section
 *
 * @property {string} name - Technology name
 * @property {string} category - Category for grouping/filtering
 */
export const TECHNOLOGIES = [
  // Programming Languages
  { name: 'Python', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'C/C++', category: 'Language' },

  // Frameworks & Libraries
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Vert.x', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'FastMCP', category: 'Backend' },
  { name: 'Angular', category: 'Frontend' },

  // Cloud & IoT
  { name: 'Google Cloud Platform', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'ClearBlade', category: 'IoT' },

  // DevOps & Tools
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Ansible', category: 'DevOps' },
  { name: 'Prometheus', category: 'DevOps' },
  { name: 'Grafana', category: 'DevOps' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'GitLab', category: 'Tools' },

  // Message Brokers
  { name: 'RabbitMQ', category: 'Message Broker' },
  { name: 'Mosquitto', category: 'Message Broker' },

  // Databases
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },

  // IoT & Protocols
  { name: 'MQTT', category: 'IoT' },
  { name: 'AMQP', category: 'IoT' },
  { name: 'BLE', category: 'IoT' },
  { name: 'RFID', category: 'IoT' },
  { name: 'Raspberry Pi', category: 'IoT' },
  { name: 'Arduino', category: 'IoT' },

  // AI & LLMs
  { name: 'LLM APIs', category: 'AI' },
  { name: 'PydanticAI', category: 'AI' },
  { name: 'MCP', category: 'AI' },
  { name: 'RAG', category: 'AI' },
];

// ============================================================================
// WORK EXPERIENCE
// ============================================================================

/**
 * Professional work experience
 * Displayed in chronological order (most recent first)
 *
 * @property {string} title - Job title
 * @property {string} company - Company name
 * @property {string} period - Employment period
 * @property {string} description - Brief description of role and achievements
 * @property {string[]} technologies - Technologies used in this role
 */
export const EXPERIENCES = [
  {
    title: 'Lead Software Engineer',
    company: 'Livello GmbH',
    period: '11/2023 - 08/2024',
    description: 'Led a team of 5 developers in developing and modernizing a full-stack (Python, Java, JS/TS), cloud-to-edge product. Drove key initiatives that expanded market presence and solidified technical foundation. Managed agile process, led BDD adoption, modernized legacy systems, achieved international payment gateway certification, and engineered RFID Electronic Shelf Label system. Slashed technical debt by 90% and automated infrastructure with CI/CD pipelines.',
    technologies: ['Python', 'Java', 'TypeScript', 'Docker', 'Kubernetes', 'Ansible', 'BDD', 'CI/CD', 'RFID', 'IoT']
  },
  {
    title: 'Software Engineer - IoT',
    company: 'Livello GmbH',
    period: '04/2022 - 10/2023',
    description: 'Engineered and modernized a cloud-edge platform with scalable architecture and high-reliability systems for secure IoT data. Designed event-driven architecture using async Python and Vert.x. Orchestrated full migration from Google IoT Core to ClearBlade with zero downtime. Built automated device provisioning system using Ansible. Implemented ZVT and MDB payment protocols. Deployed comprehensive monitoring stack using Prometheus and Grafana.',
    technologies: ['Python', 'Java', 'JavaScript', 'Vert.x', 'Ansible', 'GCP', 'ClearBlade', 'Prometheus', 'Grafana', 'MQTT', 'IoT']
  }
];

// ============================================================================
// FEATURED PROJECTS
// ============================================================================

/**
 * Featured projects to showcase
 * 
 * @property {string} title - Project name
 * @property {string} description - Brief project description
 * @property {string[]} technologies - Technologies used
 * @property {string} github - GitHub repository URL
 * @property {string} demo - Live demo URL
 */
export const PROJECTS = [
  {
    title: 'MCP Calendar Server',
    description: 'An MCP server for Google Calendar featuring event management, availability checking, and secure authentication.',
    technologies: ['Python', 'FastMCP', 'Pydantic', 'Google Calendar API'],
    github: 'https://github.com/moodjx/mcp-gcalendar',
    demo: ''
  },
  {
    title: 'OctoPlan',
    description: 'Natural language calendar management through Telegram, powered by Google Gemini AI with Google Calendar integration.',
    technologies: ['Python', 'Gemini API', 'MCP', 'MongoDB', 'FastAPI'],
    github: 'https://github.com/moodjx/octoplan',
    demo: ''
  },
  {
    title: 'EasyApply',
    description: 'A Firefox browser extension that generates tailored CVs and cover letters using AI, built with modern web technologies.',
    technologies: ['React', 'TypeScript', 'Plasmo', 'Tailwind CSS', 'Google Gemini'],
    github: 'https://github.com/moodjx/easyapply',
    demo: ''
  }
];

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================

/**
 * Personal interests and hobbies
 * Displayed as tags in the About section
 */
export const INTERESTS = [
  'Technical Reading',
  'Non-Technical Reading',
  'Cooking',
  'Calisthenics',
  'AI & LLMs',
  'IoT Projects'
];

/**
 * Social media links
 * Update these with your actual social media profiles
 */
export const SOCIAL_LINKS = {
  github: 'https://github.com/moodjx',
  linkedin: 'https://linkedin.com/in/medjridi',
  x: 'https://x.com/mooditch', // Placeholder based on username
  upwork: 'https://www.upwork.com/freelancers/~019215513e3274a1b6', // TODO: Update with your actual Upwork profile URL
  freelancer: 'https://www.freelancer.com/u/medjridi' // Placeholder based on username
};



