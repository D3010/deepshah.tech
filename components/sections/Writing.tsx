"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ARTICLES } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
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
            <Eyebrow>Notes</Eyebrow>
          </motion.div>
          <motion.h2
            id="writing-heading"
            variants={fadeUp}
            className="heading"
          >
            Things I&apos;ve written.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {ARTICLES.map((a) => (
            <motion.article
              key={a.slug}
              variants={fadeUp}
              className="group relative flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-surface p-7 transition-colors duration-500 hover:border-black/[0.18]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {formatDate(a.date)} · {a.readingMinutes} min read
              </p>
              <h3 className="text-lg font-medium leading-snug tracking-tight text-fg">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-fg/65">{a.excerpt}</p>
              <Link
                href={`/writing/${a.slug}`}
                data-cursor="link"
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-fg/85 transition-colors hover:text-fg"
                aria-label={`Read ${a.title}`}
              >
                Read
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
