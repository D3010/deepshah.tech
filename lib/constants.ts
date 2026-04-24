/**
 * Single source of truth for all site content.
 * Edit values here to update the site.
 */

import type { IconType } from "react-icons";
import {
  SiPython,
  SiOpenai,
  SiLangchain,
  SiAnthropic,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiVercel,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiGithub,
  SiLinkedin,
  SiX,
} from "react-icons/si";

// ========== IDENTITY ==========
export const SITE = {
  name: "Deep Shah",
  fullName: "Deep Amish Shah",
  handle: "@deepsai",
  title: "Deep Shah — AI Engineer building agentic systems",
  description:
    "Deep Shah — AI Engineer at Stevens '26. I design autonomous AI pipelines that handle real workflows end-to-end: browser automation, LLM orchestration, production deployment.",
  url: "https://deepsai.tech",
  domain: "deepsai.tech",
  locale: "en_US",
  email: "deep@deepsai.tech",
  location: "Jersey City, NJ",
  resumeUrl: "/resume.pdf",
  photoUrl: "/images/deep-shah.jpeg",
  ogImage: "/opengraph-image",
};

// ========== NAVIGATION ==========
export const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

// ========== HERO ==========
export const HERO = {
  eyebrow: "AI Engineer · Stevens '26",
  headline: {
    line1Plain: "I build",
    line1Gradient: "agentic systems",
    line2: "that ship.",
  },
  sub: "Building autonomous AI pipelines that handle real workflows end-to-end — from browser automation to LLM orchestration to production deployment.",
  primaryCta: { label: "See my work", href: "#projects" },
  secondaryCta: { label: "Download résumé", href: "/resume.pdf" },
};

// ========== ABOUT ==========
export const ABOUT = {
  eyebrow: "About",
  heading: "Currently shipping.",
  paragraphs: [
    "I'm Deep — a senior at Stevens Institute of Technology focused on AI engineering and agentic systems. I design pipelines where LLMs do real work: reading websites, writing emails, calling APIs, making decisions.",
    "My current obsession is building end-to-end automation that removes the human-in-the-middle from repetitive knowledge work — outreach, research, scraping, triage. I want AI agents to actually ship outcomes, not just generate text.",
    "Based in Jersey City. Open to AI Engineer, Applied Scientist, and Agentic AI roles.",
  ],
  stats: [
    { value: "15+", label: "Projects shipped" },
    { value: "6", label: "Production pipelines" },
    { value: "∞", label: "LeetCodes grinded" },
  ],
};

// ========== PROJECTS ==========
export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  href?: string;
  accent?: "coral" | "magenta" | "violet" | "amber";
};

export const PROJECTS: Project[] = [
  {
    slug: "outreach-engine",
    title: "Outreach Engine",
    description:
      "End-to-end job outreach pipeline: scrapes ATS platforms, extracts contacts via Stevens SSO + CareerShift, verifies emails, drafts personalized pitches with GPT-4o, sends via SMTP with résumé attached.",
    stack: ["Python", "Playwright", "OpenAI", "Gmail API"],
    accent: "magenta",
  },
  {
    slug: "voice-agent-pharmacy",
    title: "Voice AI Agent for Pharmacy",
    description:
      "Autonomous voice agent that handles inbound pharmacy calls — intake, prescription lookups, refill status, escalation routing. Built for real-time latency under 500ms.",
    stack: ["LiveKit", "OpenAI Realtime", "FastAPI"],
    accent: "violet",
  },
  {
    slug: "email-automation",
    title: "Email Automation Pipeline",
    description:
      "Triages inbound pharmacy email, classifies intent, drafts responses with PHI redaction, and routes edge cases to humans. Processes 1000+ emails/day in production.",
    stack: ["Python", "Claude", "Gmail API", "Postgres"],
    accent: "coral",
  },
  {
    slug: "ats-scraper",
    title: "ATS Job Scraper",
    description:
      "Unified scraper across Ashby, Greenhouse, Workday, and Amazon Jobs. Filters by role family (AI Engineer, Applied Scientist, New Grad SWE). No Easy-Apply noise.",
    stack: ["Playwright", "Next.js", "Supabase"],
    accent: "amber",
  },
  {
    slug: "pharmacy-marketplace",
    title: "Pharmacy M&A Marketplace",
    description:
      "Two-sided marketplace for pharmacy acquisitions. Map-based deal discovery, Sanity CMS for listings, auth and deal rooms.",
    stack: ["Next.js", "FastAPI", "Supabase", "Mapbox"],
    accent: "violet",
  },
];

// ========== EXPERIENCE ==========
export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Stealth Pharmacy AI",
    role: "Founding AI Engineer",
    start: "2025",
    end: "Present",
    bullets: [
      "Designed and shipped a voice + email automation stack handling production pharmacy operations.",
      "Built PHI-aware LLM pipelines with Claude and GPT-4o for triage, response drafting, and routing.",
      "Owned eval harness and observability — prompt regressions caught before deploy.",
    ],
  },
  {
    company: "Stevens Institute of Technology",
    role: "BS Computer Science",
    start: "2022",
    end: "2026",
    bullets: [
      "Concentration in AI/ML and distributed systems.",
      "TA for systems programming; co-founded campus AI builders' group.",
      "Independent research on agent frameworks and tool-use evaluation.",
    ],
  },
  {
    company: "Independent Projects",
    role: "Builder",
    start: "2020",
    end: "Present",
    bullets: [
      "15+ shipped projects spanning automation, scraping, agents, and full-stack products.",
      "Each project starts from a real workflow, not a tutorial.",
    ],
  },
];

// ========== WRITING (stub) ==========
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
};

export const ARTICLES: Article[] = [
  {
    slug: "agents-that-ship",
    title: "Agents that ship, not agents that demo",
    excerpt:
      "Why most agent demos fall apart in production — and the three constraints I now design around from day one.",
    date: "2026-03-12",
    readingMinutes: 7,
  },
  {
    slug: "playwright-vs-llm",
    title: "When to use Playwright vs. when to ask the LLM",
    excerpt:
      "A pragmatic split for browser automation: deterministic where you can, model-driven where you must.",
    date: "2026-02-04",
    readingMinutes: 5,
  },
  {
    slug: "evals-that-dont-lie",
    title: "Evals that don't lie to you",
    excerpt:
      "The eval setup I wish I'd built six months earlier. Cheap to run, hard to game, easy to read.",
    date: "2026-01-19",
    readingMinutes: 6,
  },
];

// ========== CONTACT ==========
export const CONTACT = {
  eyebrow: "Contact",
  headline: "Let's build something.",
  rows: [
    { label: "Email", value: "deep@deepsai.tech", href: "mailto:deep@deepsai.tech" },
    { label: "GitHub", value: "github.com/deepsai", href: "https://github.com/deepsai" },
    { label: "LinkedIn", value: "linkedin.com/in/deepamishshah", href: "https://linkedin.com/in/deepamishshah" },
  ],
};

// ========== TECH MARQUEE ==========
export type Tech = { name: string; Icon: IconType };

export const TECH_STACK: Tech[] = [
  { name: "Python", Icon: SiPython },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "LangChain", Icon: SiLangchain },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "Claude", Icon: SiAnthropic },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Postgres", Icon: SiPostgresql },
  { name: "Supabase", Icon: SiSupabase },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Docker", Icon: SiDocker },
  { name: "Vercel", Icon: SiVercel },
];

// ========== CONTACT FORM (legacy — kept for /api/contact) ==========
export const CONTACT_SUBJECTS = [
  "AI Engineer Role",
  "Applied Scientist Role",
  "Project / Consulting",
  "Collaboration",
  "Just Saying Hi",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

// ========== SOCIAL ==========
export const SOCIAL = {
  github: "https://github.com/deepsai",
  linkedin: "https://linkedin.com/in/deepamishshah",
  twitter: "https://twitter.com/deepsai",
  email: `mailto:${SITE.email}`,
};

export const SOCIAL_LINKS = [
  { name: "GitHub", href: SOCIAL.github, icon: SiGithub },
  { name: "LinkedIn", href: SOCIAL.linkedin, icon: SiLinkedin },
  { name: "Twitter / X", href: SOCIAL.twitter, icon: SiX },
] as const;
