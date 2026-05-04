"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS, type Project } from "@/lib/constants";
import { ProjectVisualSvg } from "@/components/sections/ProjectVisuals";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 py-32 md:py-40"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <SectionLabel number="01" label="Selected Work" />
            <h2 id="work-heading" className="heading">
              Things I&apos;ve shipped.
            </h2>
          </motion.div>
          <motion.a
            href="/work"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="group inline-flex items-center gap-1.5 self-start text-sm text-[var(--text-secondary)] transition-colors hover:text-fg md:self-end"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        {/* Asymmetric 2-col grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              className={cn(i % 2 === 1 ? "md:mt-20" : undefined)}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href ?? "#"}
      className="group relative block"
      aria-label={`${project.title} — case study`}
    >
      {/* Visual frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-surface transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-white/[0.16]">
        {/* Themed animated SVG */}
        <ProjectVisualSvg variant={project.visual} />

        {/* Gentle vignette so the card edges feel grounded */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(8,8,10,0.55), transparent 65%)",
          }}
        />

        {/* Floating arrow chip */}
        <span
          aria-hidden
          className="absolute -right-3 -top-3 grid h-12 w-12 place-items-center rounded-full border border-white/[0.18] bg-background text-fg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      {/* Caption */}
      <div className="mt-5 flex flex-col gap-2.5">
        <h3 className="text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:bg-gradient-brand group-hover:bg-clip-text group-hover:text-transparent md:text-2xl">
          {project.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
