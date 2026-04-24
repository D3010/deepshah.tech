"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { PROJECTS, type Project } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const ACCENT_GRADIENT: Record<NonNullable<Project["accent"]>, string> = {
  coral:
    "radial-gradient(ellipse 80% 70% at 30% 30%, rgba(255,107,74,0.55), transparent 65%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(255,61,127,0.35), transparent 70%)",
  magenta:
    "radial-gradient(ellipse 80% 70% at 30% 30%, rgba(255,61,127,0.55), transparent 65%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(124,92,255,0.4), transparent 70%)",
  violet:
    "radial-gradient(ellipse 80% 70% at 30% 30%, rgba(124,92,255,0.55), transparent 65%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(255,61,127,0.32), transparent 70%)",
  amber:
    "radial-gradient(ellipse 80% 70% at 30% 30%, rgba(255,180,90,0.45), transparent 65%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(255,107,74,0.4), transparent 70%)",
};

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = (card?.clientWidth ?? 600) + 24;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative snap-start scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page mb-12 flex items-end justify-between gap-6">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex max-w-2xl flex-col gap-5"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Selected Work</Eyebrow>
          </motion.div>
          <motion.h2
            id="projects-heading"
            variants={fadeUp}
            className="heading"
          >
            Things I&apos;ve shipped.
          </motion.h2>
        </motion.div>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous project"
            data-cursor="link"
            onClick={() => scrollBy(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/[0.14] bg-transparent text-fg/60 transition hover:border-black/[0.28] hover:text-fg"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            data-cursor="link"
            onClick={() => scrollBy(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/[0.14] bg-transparent text-fg/60 transition hover:border-black/[0.28] hover:text-fg"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scroll-padding-left:24px] md:[scroll-padding-left:40px]"
      >
        <div className="shrink-0 basis-6 md:basis-10" aria-hidden />
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 snap-start"
            style={{ width: "min(80vw, 760px)" }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
        <div className="shrink-0 basis-6 md:basis-10" aria-hidden />
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent ?? "magenta";
  return (
    <article className="group relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-surface transition-colors duration-500 hover:border-black/[0.16]">
      <div
        aria-hidden
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{ background: ACCENT_GRADIENT[accent] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute right-5 top-5">
          <Chip>{`0${PROJECTS.findIndex((p) => p.slug === project.slug) + 1}`}</Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-7 md:p-9">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        <h3 className="font-sans text-2xl font-medium tracking-tight text-fg md:text-[28px]">
          {project.title}
        </h3>
        <p className="text-base leading-relaxed text-fg/65">
          {project.description}
        </p>

        <div className="mt-auto pt-4">
          <a
            href={project.href ?? "#"}
            data-cursor="link"
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors"
          >
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
