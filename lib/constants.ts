/**
 * ============================================================
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================
 * Update this file to update the entire site. Every placeholder
 * below is flagged with "TODO: Replace with actual content" so
 * you can grep and fill them in.
 * ============================================================
 */

import type { IconType } from "react-icons";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiOpenai,
  SiLangchain,
  SiHuggingface,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiVercel,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiLinkedin,
  SiX,
  SiZapier,
  SiN8N,
} from "react-icons/si";

// ========== IDENTITY ==========
export const SITE = {
  name: "Deep Shah",
  handle: "@deepshah",
  title: "Deep Shah — AI Engineer & Automation Expert",
  description:
    "AI Engineer and Automation Expert building intelligent systems, LLM-powered products, and end-to-end automations that ship.",
  url: "https://deepshah.tech",
  domain: "deepshah.tech",
  locale: "en_US",
  // TODO: Replace with actual content
  email: "deep@deepshah.tech",
  // TODO: Replace with actual content
  location: "United States",
  // TODO: Replace with actual content
  resumeUrl: "/resume.pdf",
  // TODO: Replace with actual photo. Drop deep-shah.jpg into /public/images/
  // and change this to "/images/deep-shah.jpg".
  photoUrl: "/images/deep-shah.svg",
  ogImage: "/icons/og-image.svg",
};

// ========== NAVIGATION ==========
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ========== HERO ==========
export const HERO = {
  eyebrow: "AI Engineer · Automation Expert",
  name: "Deep Shah",
  // TODO: Replace with actual content
  bio: "I build AI-powered products and automation pipelines that turn messy, manual work into measurable outcomes — from LLM agents and RAG systems to end-to-end workflow orchestration.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Download Resume", href: "/resume.pdf" },
  stats: [
    // TODO: Replace with actual content
    { value: 50, suffix: "+", label: "Projects Shipped" },
    // TODO: Replace with actual content
    { value: 5, suffix: "+", label: "Years Building" },
    // TODO: Replace with actual content
    { value: 20, suffix: "+", label: "Happy Clients" },
  ],
};

// ========== ABOUT ==========
export const ABOUT = {
  heading: "About Me",
  // TODO: Replace with actual content
  paragraphs: [
    "I'm an AI engineer who cares about the unglamorous parts — evals that don't lie, pipelines that don't wake you up at 3 AM, and interfaces that make the model feel like a product. I work across the stack: from fine-tuning and retrieval to deploying and instrumenting systems in production.",
    "Before AI, I spent years automating operations for teams drowning in spreadsheets and ticket queues. That's still the lens I bring: find the workflow, find the bottleneck, and build the smallest thing that removes it. I enjoy partnering with founders and engineering teams who want to ship quickly without shipping slop.",
  ],
  highlights: [
    // TODO: Replace with actual content
    { title: "LLM Systems", value: "Production-ready", label: "RAG, agents, fine-tuning, evals" },
    // TODO: Replace with actual content
    { title: "Automation", value: "End-to-end", label: "n8n, Zapier, custom orchestration" },
    // TODO: Replace with actual content
    { title: "Shipping", value: "Fast & reliable", label: "From prototype to production" },
  ],
  availability: "Open to Opportunities",
};

// ========== SKILLS ==========
export type Skill = { name: string; Icon: IconType };
export type SkillCategory = { category: string; items: Skill[] };

export const SKILLS: SkillCategory[] = [
  // TODO: Replace with actual content
  {
    category: "AI / ML",
    items: [
      { name: "Python", Icon: SiPython },
      { name: "PyTorch", Icon: SiPytorch },
      { name: "TensorFlow", Icon: SiTensorflow },
      { name: "OpenAI", Icon: SiOpenai },
      { name: "LangChain", Icon: SiLangchain },
      { name: "Hugging Face", Icon: SiHuggingface },
    ],
  },
  // TODO: Replace with actual content
  {
    category: "Automation",
    items: [
      { name: "n8n", Icon: SiN8N },
      { name: "Zapier", Icon: SiZapier },
      { name: "Python Scripts", Icon: SiPython },
    ],
  },
  // TODO: Replace with actual content
  {
    category: "Backend",
    items: [
      { name: "FastAPI", Icon: SiFastapi },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
    ],
  },
  // TODO: Replace with actual content
  {
    category: "Frontend",
    items: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  // TODO: Replace with actual content
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", Icon: SiAmazonwebservices },
      { name: "Docker", Icon: SiDocker },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
  // TODO: Replace with actual content
  {
    category: "Tools",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
    ],
  },
];

// ========== EXPERIENCE ==========
export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  logo?: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  // TODO: Replace with actual content
  {
    company: "Company Name",
    role: "AI Engineer",
    start: "Jan 2024",
    end: "Present",
    logo: "/images/logos/company-1.svg",
    bullets: [
      "Shipped an LLM-powered retrieval system handling 10k+ queries/day with sub-300ms P95 latency.",
      "Reduced manual ops work by 80% by replacing a human-in-the-loop pipeline with an autonomous agent.",
      "Owned evals and observability — built internal tooling adopted by the rest of the AI team.",
    ],
  },
  // TODO: Replace with actual content
  {
    company: "Previous Company",
    role: "Automation Engineer",
    start: "Mar 2022",
    end: "Dec 2023",
    logo: "/images/logos/company-2.svg",
    bullets: [
      "Built end-to-end automations across Slack, HubSpot, and Notion that saved 200+ hours/month.",
      "Led the migration from Zapier to self-hosted n8n, cutting recurring cost by 70%.",
      "Partnered with the ops team to roadmap automation initiatives across the company.",
    ],
  },
  // TODO: Replace with actual content
  {
    company: "Earlier Company",
    role: "Software Engineer",
    start: "Jun 2020",
    end: "Feb 2022",
    logo: "/images/logos/company-3.svg",
    bullets: [
      "Built full-stack features for an internal B2B platform (Next.js, FastAPI, Postgres).",
      "Introduced CI/CD that took deploys from a 30-minute manual process to sub-5-minute automated pipeline.",
      "Mentored two junior engineers through their first year.",
    ],
  },
];

// ========== PROJECTS ==========
export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  // TODO: Replace with actual content
  {
    title: "Flagship Project",
    description:
      "A short punchy sentence describing what this does and why it matters.",
    longDescription:
      "Two-to-three sentences with more detail. Call out scale, impact, or a clever technical choice. Keep it concrete.",
    stack: ["Next.js", "FastAPI", "OpenAI", "Postgres", "Redis"],
    github: "https://github.com/username/repo",
    demo: "https://example.com",
    image: "/images/projects/project-1.png",
    featured: true,
  },
  // TODO: Replace with actual content
  {
    title: "RAG Search System",
    description:
      "Semantic search over 100k+ docs with hybrid retrieval and re-ranking.",
    stack: ["Python", "LangChain", "Pinecone", "FastAPI"],
    github: "https://github.com/username/repo",
    demo: "https://example.com",
    image: "/images/projects/project-2.png",
  },
  // TODO: Replace with actual content
  {
    title: "Autonomous Agent",
    description:
      "Multi-step agent that handles customer support triage end-to-end.",
    stack: ["Python", "OpenAI", "Temporal"],
    github: "https://github.com/username/repo",
    demo: "https://example.com",
    image: "/images/projects/project-3.png",
  },
  // TODO: Replace with actual content
  {
    title: "Automation Suite",
    description:
      "n8n workflows replacing 12 manual ops processes across sales and finance.",
    stack: ["n8n", "Python", "Postgres"],
    github: "https://github.com/username/repo",
    image: "/images/projects/project-4.png",
  },
];

// ========== TESTIMONIALS ==========
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  // TODO: Replace with actual content
  {
    quote:
      "Deep delivered a production LLM system in half the time I'd expect — and more importantly, it actually worked. Rare combination.",
    name: "Jane Doe",
    title: "CTO",
    company: "Acme Co",
    avatar: "/images/testimonials/jane.png",
  },
  // TODO: Replace with actual content
  {
    quote:
      "Our ops team got their lives back. The automations Deep shipped cut busy-work by more than half in the first month.",
    name: "John Smith",
    title: "Head of Operations",
    company: "Widget Inc",
    avatar: "/images/testimonials/john.png",
  },
  // TODO: Replace with actual content
  {
    quote:
      "Clear communication, fast execution, and the final work was genuinely great. Would hire again without hesitation.",
    name: "Alex Chen",
    title: "Founder",
    company: "Startup XYZ",
    avatar: "/images/testimonials/alex.png",
  },
];

// ========== CONTACT ==========
export const CONTACT_SUBJECTS = [
  "New Project / Consulting",
  "Full-Time Role",
  "Collaboration",
  "Speaking / Podcast",
  "Just Saying Hi",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

// ========== SOCIAL ==========
export const SOCIAL = {
  // TODO: Replace with actual content
  github: "https://github.com/deepshah",
  // TODO: Replace with actual content
  linkedin: "https://linkedin.com/in/deepshah",
  // TODO: Replace with actual content
  twitter: "https://twitter.com/deepshah",
  email: `mailto:${SITE.email}`,
};

export const SOCIAL_LINKS = [
  { name: "GitHub", href: SOCIAL.github, icon: SiGithub },
  { name: "LinkedIn", href: SOCIAL.linkedin, icon: SiLinkedin },
  { name: "Twitter / X", href: SOCIAL.twitter, icon: SiX },
] as const;
