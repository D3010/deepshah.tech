"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ABOUT } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative flex min-h-[100svh] snap-start scroll-mt-24 items-center py-28 md:py-36"
    >
      <div className="container-page grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-5"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2 id="about-heading" variants={fadeUp} className="heading">
            {ABOUT.heading}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-6">
            {ABOUT.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-lg leading-relaxed text-fg/75"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-3"
          >
            {ABOUT.stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col gap-1.5 bg-background p-6"
              >
                <span className="font-mono text-3xl font-medium tracking-tight text-fg md:text-4xl">
                  {s.value}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-muted">
                  {s.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
