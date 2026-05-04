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
  title: "Deep Shah — AI Engineer & Agentic Systems",
  description:
    "I design and build production AI pipelines — browser agents, LLM orchestration, and end-to-end automation that runs without a human in the loop.",
  url: "https://deepshah.tech",
  domain: "deepshah.tech",
  locale: "en_US",
  email: "deep@deepsai.tech",
  location: "Jersey City, NJ",
  resumeUrl: "/resume.pdf",
  photoUrl: "/images/deep-shah.jpeg",
  ogImage: "/opengraph-image",
};

// ========== NAVIGATION ==========
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "#contact" },
] as const;

// ========== HERO ==========
export const HERO = {
  kicker: "AI ENGINEER · AGENTIC SYSTEMS · STEVENS '26",
  // Three lines, with `that ship` rendered in the brand gradient.
  headline: {
    line1: "Autonomous systems",
    line2Plain: "that",
    line2Gradient: "ship",
    line3: "themselves.",
  },
  sub:
    "I design and build production AI pipelines — browser agents, LLM orchestration, and end-to-end automation that runs without a human in the loop.",
  primaryCta: { label: "See my work", href: "#work" },
  secondaryCta: { label: "Download résumé", href: "/resume.pdf" },
};

// ========== ABOUT ==========
export const ABOUT = {
  kicker: "04 — ABOUT",
  heading:
    "I started writing scripts to skip my own homework. Now I do it for companies.",
  paragraphs: [
    "I'm Deep — a Stevens '26 AI engineer based in Jersey City. I came to AI through automation: every job I've had, I've ended up rebuilding the workflow into something that runs while I sleep.",
    "Now I help teams ship agentic systems that actually hold up in production — not the kind that demo well and break on Tuesday. If you've got a workflow that eats your team's week, I'd like to take a look at it.",
  ],
  stats: [
    { value: "12+", label: "production agents shipped" },
    { value: "200K+", label: "LLM calls per day handled" },
    { value: "94%", label: "avg. agent accuracy in prod" },
    { value: "<2 wks", label: "prototype to deployment" },
  ],
  ctaLabel: "Read the full story",
  ctaHref: "/about",
};

// ========== PROJECTS / FEATURED WORK ==========
export type ProjectAccent = "coral" | "pink" | "magenta" | "violet";

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  href?: string;
  /** Two-stop gradient placeholder when no image is provided. */
  accentFrom: ProjectAccent;
  accentTo: ProjectAccent;
};

export const PROJECTS: Project[] = [
  {
    slug: "browser-use-agent",
    title: "Browser-Use Agent for E-commerce QA",
    description:
      "Autonomous testing agent that crawls product pages, validates checkout flows, and files Linear tickets for regressions. Cut QA cycle from 3 days to 4 hours.",
    stack: ["Playwright", "LangGraph", "Anthropic"],
    accentFrom: "coral",
    accentTo: "pink",
  },
  {
    slug: "research-pipeline",
    title: "Multi-agent Research Pipeline",
    description:
      "Orchestrates 6 specialized LLM agents (search, summarize, fact-check, synthesize, cite, draft) to produce publication-ready research briefs.",
    stack: ["LangChain", "pgvector", "Next.js"],
    accentFrom: "pink",
    accentTo: "magenta",
  },
  {
    slug: "voice-to-workflow",
    title: "Voice-to-Workflow Automation",
    description:
      "Converts spoken meeting notes into structured Asana tasks with owners, deadlines, and Slack pings — all from a single 30-second recording.",
    stack: ["Whisper", "n8n", "OpenAI"],
    accentFrom: "magenta",
    accentTo: "violet",
  },
  {
    slug: "inbox-triage",
    title: "AI Inbox Triage System",
    description:
      "Reads, classifies, drafts, and schedules replies for 200+ daily emails. Hits 94% accuracy on category routing in production.",
    stack: ["Claude", "Gmail API", "FastAPI"],
    accentFrom: "violet",
    accentTo: "coral",
  },
];

// ========== CAPABILITIES (BENTO) ==========
export type CapabilityVisual =
  | "nodes"
  | "browser"
  | "layers"
  | "gauge"
  | "globe"
  | "flow";

export type Capability = {
  title: string;
  body: string;
  /** Tailwind grid span classes — kept here so the section can stay declarative. */
  span: string;
  visual: CapabilityVisual;
};

export const CAPABILITIES: Capability[] = [
  {
    title: "Agentic systems",
    body:
      "Multi-step LLM workflows with memory, tool-use, and recovery. Built to run unsupervised in prod.",
    span: "md:col-span-2 md:row-span-2",
    visual: "nodes",
  },
  {
    title: "Browser automation",
    body:
      "Headless agents that navigate, fill, click, and extract — across auth walls, captchas, and dynamic SPAs.",
    span: "md:col-span-2",
    visual: "browser",
  },
  {
    title: "RAG at scale",
    body:
      "Vector pipelines that don't fall over at 10M docs. Hybrid search, reranking, and provenance baked in.",
    span: "md:col-span-2",
    visual: "layers",
  },
  {
    title: "LLM ops",
    body:
      "Prompt versioning, eval harnesses, latency budgets, and cost guardrails. The plumbing nobody loves.",
    span: "md:col-span-2",
    visual: "gauge",
  },
  {
    title: "Edge deployment",
    body:
      "Sub-200ms inference at the edge. Vercel, Cloudflare, and self-hosted options.",
    span: "md:col-span-2",
    visual: "globe",
  },
  {
    title: "Workflow design",
    body:
      'The 30-min audit that turns "we should automate this" into a shipped system in < 2 weeks.',
    span: "md:col-span-4",
    visual: "flow",
  },
];

// ========== PROCESS ==========
export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export const PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnose.",
    body:
      "A 30-min audit. We map the actual workflow, find where humans rubber-stamp, and identify the single highest-leverage thing to automate.",
  },
  {
    number: "02",
    title: "Prototype.",
    body:
      "Working agent in 5–7 days. Not a deck. Not a Loom. A real, runnable system you can break.",
  },
  {
    number: "03",
    title: "Harden.",
    body:
      "Eval suite, error recovery, observability, cost ceiling. The version that doesn't page you at 3am.",
  },
  {
    number: "04",
    title: "Ship & extend.",
    body:
      "Deploy to your stack, train your team, and design the next three workflows worth automating.",
  },
];

// ========== EXPERIENCE (kept for historical reference; not on landing page) ==========
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
];

// ========== WRITING ==========
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
  kicker: "05 — LET'S TALK",
  headline: "Let's build something that runs itself.",
  rows: [
    {
      label: "Email",
      value: "deep@deepsai.tech",
      href: "mailto:deep@deepsai.tech",
    },
    {
      label: "GitHub",
      value: "github.com/deepsai",
      href: "https://github.com/deepsai",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/deepamishshah",
      href: "https://linkedin.com/in/deepamishshah",
    },
  ],
};

// ========== TECH MARQUEE ==========
export const TECH_ROW_1 = [
  "Python",
  "TypeScript",
  "Next.js",
  "LangChain",
  "Anthropic",
  "OpenAI",
  "Playwright",
  "Browser-Use",
  "FastAPI",
  "Postgres",
  "Redis",
  "Docker",
  "AWS",
] as const;

export const TECH_ROW_2 = [
  "Vercel",
  "LangGraph",
  "pgvector",
  "Pinecone",
  "tRPC",
  "React",
  "Tailwind",
  "Framer Motion",
  "Three.js",
  "n8n",
  "Zapier",
  "GitHub Actions",
  "SES",
] as const;

// Legacy stack list — kept in case other routes still import it
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

// ========== CONTACT FORM ==========
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
