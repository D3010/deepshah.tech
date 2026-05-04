"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { RevealText } from "@/components/ui/RevealText";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HERO } from "@/lib/constants";
import { scrollToId } from "@/lib/utils";

// R3F canvas is client-only — never SSR.
const ParticleOrb = dynamic(() => import("@/components/hero/ParticleOrb"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100dvh] flex-col items-stretch justify-center overflow-hidden"
    >
      <HeroBackground />

      {/* Orb canvas — sits between background glows and the headline */}
      <div className="absolute inset-0 -z-[5]">
        <ParticleOrb />
      </div>

      <div className="container-page relative z-10 flex flex-1 flex-col items-center justify-center pt-[var(--nav-h)] text-center">
        {/* Mono kicker */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-10 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-brand"
          />
          {HERO.kicker}
        </motion.p>

        {/* Headline — three lines, word-by-word reveal */}
        <h1 className="display max-w-[16ch] text-balance">
          <span className="block">
            <RevealText delay={0.25}>{HERO.headline.line1}</RevealText>
          </span>
          <span className="block">
            <RevealText delay={0.5}>
              {HERO.headline.line2Plain}{" "}
              <span className="text-gradient-strong">
                {HERO.headline.line2Gradient}
              </span>
            </RevealText>
          </span>
          <span className="block">
            <RevealText delay={0.75}>{HERO.headline.line3}</RevealText>
          </span>
        </h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0.001 : 0.9,
            delay: reduce ? 0 : 1.55,
            ease: EASE,
          }}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
        >
          {HERO.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0.001 : 0.9,
            delay: reduce ? 0 : 1.75,
            ease: EASE,
          }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GradientButton
            as="a"
            href={HERO.primaryCta.href}
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              scrollToId(HERO.primaryCta.href.replace("#", ""));
            }}
          >
            {HERO.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </GradientButton>
        </motion.div>
      </div>

      {/* Scroll cue — vertical line + dot animation + "SCROLL" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease: EASE }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <div className="relative h-8 w-px overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 h-2 w-px bg-gradient-brand animate-scroll-cue" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
