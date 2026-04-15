"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Workflow, Rocket } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ABOUT, SITE } from "@/lib/constants";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/lib/animations";

const HIGHLIGHT_ICONS = [Sparkles, Workflow, Rocket];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Headshot column */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={SITE.photoUrl}
              alt={`${SITE.name} working`}
              fill
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-brand-soft" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* Decorative corner brackets */}
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />
        </motion.div>

        {/* Content column */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp}>
            <Badge pulse className="mb-5">
              {ABOUT.availability}
            </Badge>
            <h2
              id="about-heading"
              className="font-heading text-4xl font-bold tracking-tight md:text-5xl"
            >
              <span className="relative inline-block">
                {ABOUT.heading}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-brand"
                />
              </span>
            </h2>
          </motion.div>

          <motion.div variants={slideInRight} className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {/* TODO: Replace bio paragraphs in lib/constants.ts */}
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
            {ABOUT.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Sparkles;
              return (
                <Card key={h.title} className="p-5">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft">
                    <Icon className="h-5 w-5 text-secondary-400" />
                  </div>
                  <p className="font-heading text-lg font-semibold">{h.value}</p>
                  <p className="text-sm text-fg/80">{h.title}</p>
                  <p className="mt-1 text-xs text-muted">{h.label}</p>
                </Card>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<typeof position, string> = {
    tl: "-top-2 -left-2 border-t-2 border-l-2 rounded-tl-md",
    tr: "-top-2 -right-2 border-t-2 border-r-2 rounded-tr-md",
    bl: "-bottom-2 -left-2 border-b-2 border-l-2 rounded-bl-md",
    br: "-bottom-2 -right-2 border-b-2 border-r-2 rounded-br-md",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-6 w-6 border-secondary-400/70 ${map[position]}`}
    />
  );
}
