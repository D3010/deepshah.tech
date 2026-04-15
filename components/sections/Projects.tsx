"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/constants";
import { SectionHeader } from "./Skills";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <SectionHeader
          id="projects-heading"
          eyebrow="Selected Work"
          title={
            <>
              Featured <span className="text-gradient-strong">Projects</span>
            </>
          }
          description="A few things I've shipped recently — across LLM systems, automations, and full-stack products."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {featured && (
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <ProjectCard project={featured} featured />
            </motion.div>
          )}
          {rest.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl glass transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/15 hover:shadow-glow ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      {/* Top gradient border */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"
      />

      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-video lg:aspect-auto lg:min-h-[320px]" : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        {/* Fallback gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-brand-soft" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-medium text-white shadow-glow transition-transform duration-500 group-hover:translate-y-0"
            >
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-3 p-6 ${featured ? "lg:p-10" : ""}`}>
        <h3 className={`font-heading font-semibold tracking-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className={`text-muted ${featured ? "text-base" : "text-sm"}`}>
          {project.description}
        </p>
        {featured && project.longDescription && (
          <p className="text-sm text-fg/70">{project.longDescription}</p>
        )}

        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — source code`}
              data-cursor="link"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-fg hover:shadow-glow"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — live demo`}
              data-cursor="link"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-fg hover:shadow-glow"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
