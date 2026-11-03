// ── Central card configuration ────────────────────────────────────────────────
export interface PortfolioCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  /** Path relative to /public — '' uses auto-generated gradient */
  image: string;
  /** '#sectionId' for same-page scroll */
  destination: string;
  /** 'scroll' = scroll to section, 'assistant' = open AI assistant */
  action: 'scroll' | 'assistant';
  accent: string;
  accentAlt: string;
}

export const portfolioCards: PortfolioCard[] = [
  {
    id: 1,
    title: 'Alfred Ofori',
    subtitle: 'Data Scientist · Developer',
    description: 'Building intelligent systems where data meets design.',
    image: '/Alfred.png',
    destination: '#about',
    action: 'scroll',
    accent: '#3b82f6',
    accentAlt: '#a855f7',
  },
  {
    id: 2,
    title: 'Featured Projects',
    subtitle: 'Selected Work',
    description: 'From SaaS dashboards to luxury e-commerce — projects that push engineering forward.',
    image: '/09_intelligent_smart_city.png',
    destination: '#portfolio',
    action: 'scroll',
    accent: '#06b6d4',
    accentAlt: '#3b82f6',
  },
  {
    id: 3,
    title: 'Data Science',
    subtitle: 'Analytics · ML · Insight',
    description: 'Python, Pandas, SQL, and machine learning pipelines that turn messy data into decisions.',
    image: '/download (13).jpg',
    destination: '#portfolio',
    action: 'scroll',
    accent: '#8b5cf6',
    accentAlt: '#06b6d4',
  },
  {
    id: 4,
    title: 'Development',
    subtitle: 'Next.js · React · Node',
    description: 'Full-stack web applications built for performance and real-world scale.',
    image: '/08_technology_stack.png',
    destination: '#skills',
    action: 'scroll',
    accent: '#3b82f6',
    accentAlt: '#16a34a',
  },
  {
    id: 5,
    title: 'My Process',
    subtitle: 'Discover → Design → Launch',
    description: 'A proven four-step framework: Discover, Strategy, Design & Build, Launch.',
    image: '/05_development_process.png',
    destination: '#process',
    action: 'scroll',
    accent: '#a855f7',
    accentAlt: '#3b82f6',
  },
  {
    id: 6,
    title: 'Contact',
    subtitle: "Let's Build Together",
    description: 'Open to freelance, collaborations, and full-time opportunities.',
    image: '/download (14).jpg',
    destination: '#contact',
    action: 'scroll',
    accent: '#f59e0b',
    accentAlt: '#ef4444',
  },
  {
    id: 7,
    title: 'NEXUS AI',
    subtitle: 'AI Portfolio Assistant',
    description: 'Ask NEXUS anything about my work, skills, or process.',
    image: '/AI Chatbot Cheat Sheet_ Comparing ChatGPT, Gemini,___.jpg',
    destination: '#',
    action: 'assistant',
    accent: '#06b6d4',
    accentAlt: '#a855f7',
  },
];
