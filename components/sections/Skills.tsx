"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <SectionHeader
          id="skills-heading"
          eyebrow="Expertise"
          title={
            <>
              Tech Stack & <span className="text-gradient-strong">Expertise</span>
            </>
          }
          description="The tools and platforms I use to ship intelligent products end-to-end."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 space-y-10"
        >
          {SKILLS.map((group) => (
            <motion.div key={group.category} variants={fadeUp}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  {group.category}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
              </div>
              <motion.ul
                variants={staggerContainer(0.04)}
                className="flex flex-wrap gap-3"
              >
                {group.items.map(({ name, Icon }) => (
                  <motion.li
                    key={name}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg/90 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-secondary-400" />
                    {name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex max-w-3xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : ""}`}
    >
      <motion.p
        variants={fadeUp}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-400"
      >
        <span className="h-px w-8 bg-secondary-400/70" />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        id={id}
        className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="text-base text-muted md:text-lg">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
