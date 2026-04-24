"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { ParticleField } from "@/components/effects/ParticleField";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HERO } from "@/lib/constants";
import { fadeUp, staggerContainer, EASE_ANTIGRAV } from "@/lib/animations";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] snap-start flex-col items-stretch justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 35%, rgba(255,61,127,0.10), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,92,255,0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,107,74,0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10">
        <ParticleField />
      </div>
      <div className="noise-overlay -z-10" />

      <div className="container-page relative flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          variants={staggerContainer(0.14, 0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="display max-w-5xl text-balance"
          >
            <span className="block">
              {HERO.headline.line1Plain}{" "}
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: EASE_ANTIGRAV, delay: 0.35 }}
                className="text-gradient-strong inline-block"
              >
                {HERO.headline.line1Gradient}
              </motion.span>
            </span>
            <span className="block">{HERO.headline.line2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-balance text-base leading-relaxed text-fg/65 md:text-lg"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <MagneticButton
              as="a"
              href={HERO.primaryCta.href}
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId(HERO.primaryCta.href.replace("#", ""));
              }}
            >
              {HERO.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={HERO.secondaryCta.href}
              variant="outline"
              download
            >
              <Download className="h-4 w-4" />
              {HERO.secondaryCta.label}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="Scroll to about"
        onClick={() => scrollToId("about")}
        data-cursor="link"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-opacity hover:text-fg"
      >
        <span className="sr-only">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce-slow" />
      </button>
    </section>
  );
}
