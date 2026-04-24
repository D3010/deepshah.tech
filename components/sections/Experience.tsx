"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EXPERIENCE } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative snap-start scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-16 flex max-w-2xl flex-col gap-5"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Timeline</Eyebrow>
          </motion.div>
          <motion.h2
            id="experience-heading"
            variants={fadeUp}
            className="heading"
          >
            Where I&apos;ve been.
          </motion.h2>
        </motion.div>

        <ol className="relative mx-auto max-w-4xl border-l border-white/[0.08] pl-8 md:pl-12">
          {EXPERIENCE.map((entry, i) => (
            <motion.li
              key={`${entry.company}-${entry.start}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-14 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[37px] top-1.5 grid h-3 w-3 place-items-center rounded-full md:-left-[49px]"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </span>

              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {entry.start} — {entry.end}
              </p>
              <h3 className="text-2xl font-medium tracking-tight text-fg md:text-[26px]">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm text-fg/60">{entry.company}</p>

              <ul className="mt-5 space-y-2.5">
                {entry.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-fg/75">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 flex-none"
                      style={{ background: "var(--accent-gradient)" }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
