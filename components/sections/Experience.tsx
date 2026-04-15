"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";
import { SectionHeader } from "./Skills";
import { fadeUp, slideInLeft, slideInRight, viewportOnce } from "@/lib/animations";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <SectionHeader
          id="experience-heading"
          eyebrow="Career"
          title={
            <>
              Work <span className="text-gradient-strong">Experience</span>
            </>
          }
          description="A timeline of teams I've built with and problems I've solved."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Vertical gradient line */}
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          </div>

          <ol className="space-y-12">
            {EXPERIENCE.map((entry, i) => {
              const isRight = i % 2 === 0;
              return (
                <li key={`${entry.company}-${entry.start}`} className="relative">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-4 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand shadow-glow md:left-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-background" />
                  </span>

                  <motion.article
                    variants={isRight ? slideInRight : slideInLeft}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isRight ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"
                    }`}
                  >
                    <div className="rounded-2xl glass p-6 transition-all duration-300 hover:border-white/15 hover:shadow-glow">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft">
                          {/* TODO: Replace with actual logo at /public/images/logos/ */}
                          <Briefcase className="h-4 w-4 text-secondary-400" />
                        </span>
                        <div>
                          <p className="font-heading text-lg font-semibold leading-tight">
                            {entry.role}
                          </p>
                          <p className="text-sm text-muted">{entry.company}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-xs uppercase tracking-wider text-secondary-400">
                        {entry.start} — {entry.end}
                      </p>
                      <ul className="space-y-2 text-sm leading-relaxed text-fg/85">
                        {entry.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
