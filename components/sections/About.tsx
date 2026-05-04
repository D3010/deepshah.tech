"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT, SITE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 py-32 md:py-40"
    >
      <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,61,138,0.25) 0%, transparent 70%)",
            }}
          />
          <div className="gradient-border is-active relative aspect-square overflow-hidden rounded-3xl border border-white/[0.08] bg-surface transition-transform duration-500 hover:rotate-[2deg] hover:shadow-glow">
            <Image
              src={SITE.photoUrl}
              alt={`${SITE.fullName} headshot`}
              width={640}
              height={640}
              priority={false}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right — bio + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <SectionLabel number="04" label="About" />
          <h2 id="about-heading" className="heading">
            {ABOUT.heading}
          </h2>
          <div className="flex flex-col gap-4">
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-relaxed text-[var(--text-secondary)] md:text-base"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats grid */}
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {ABOUT.stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-surface p-5"
              >
                <span className="font-mono text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                  {s.value}
                </span>
                <span className="text-[12px] text-[var(--text-tertiary)]">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={ABOUT.ctaHref}
            className="group mt-3 inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg/90 transition-colors hover:text-fg"
          >
            {ABOUT.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
