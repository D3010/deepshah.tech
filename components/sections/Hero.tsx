"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CountUp } from "@/components/effects/CountUp";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { HERO } from "@/lib/constants";
import { fadeUp, staggerContainer, EASE_ANTIGRAV } from "@/lib/animations";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      className="relative isolate flex min-h-[100dvh] flex-col items-stretch justify-between overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ======= Antigravity background stack ======= */}
      {/* Deep vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 38%, rgba(232,181,90,0.22), transparent 70%)",
        }}
      />

      {/* THE orb — centered, massive, the focal point */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, ease: EASE_ANTIGRAV, delay: 0.1 }}
        className="pointer-events-none absolute left-1/2 top-[46%] -z-10 w-[min(110vmin,1100px)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="antigravity-orb animate-orb-breathe w-full" />
      </motion.div>

      {/* Soft secondary auroras */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-aurora animate-aurora" />
        <div className="bg-aurora animate-aurora-alt" />
      </div>

      <div className="bg-spotlight -z-10" />
      <div className="absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>

      {/* Horizon bloom at the bottom — Antigravity sunrise */}
      <div aria-hidden className="bg-horizon -z-10" />
      <div className="noise-overlay -z-10" />

      {/* ======= Content ======= */}
      <div className="container-page relative flex flex-1 flex-col items-center justify-center pt-10 text-center">
        <motion.div
          variants={staggerContainer(0.14, 0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow chip */}
          <motion.div variants={fadeUp}>
            <span className="group inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/40 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary-400" />
              {HERO.eyebrow}
            </span>
          </motion.div>

          {/* Heading — huge, centered, Antigravity-scale */}
          <motion.h1
            variants={fadeUp}
            className="font-heading font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,10vw,8.5rem)]"
          >
            <span className="block text-fg/90">Hi, I&apos;m</span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE_ANTIGRAV, delay: 0.35 }}
              className="text-gradient-strong mt-1 block"
            >
              {HERO.name}
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-balance text-base leading-relaxed text-muted md:text-lg"
          >
            {HERO.bio}
          </motion.p>

          {/* Single CTA */}
          <motion.div variants={fadeUp} className="mt-2">
            <LinkButton href={HERO.primaryCta.href} size="lg" className="group">
              <span className="relative z-10">{HERO.primaryCta.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              >
                <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sheen" />
              </span>
            </LinkButton>
          </motion.div>

          {/* Availability pill */}
          <motion.div variants={fadeUp} className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/10 bg-surface/70 px-4 py-1.5 text-xs text-fg/80 backdrop-blur-md">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Trust / stats row */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-accent/[0.08] pt-8"
          >
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                  <span className="text-gradient-strong">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ======= Marquee of real tech logos ======= */}
      <MarqueeStrip />

      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => scrollToId("about")}
        data-cursor="link"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-fg"
      >
        <ChevronDown className="h-6 w-6 animate-bounce-slow" />
      </button>
    </section>
  );
}

/* ================================================================
 * Marquee strip of real tech logos
 * ================================================================ */
function MarqueeStrip() {
  const items = HERO.marqueeIcons;
  const row = [...items, ...items];

  return (
    <div className="relative w-full pb-6 pt-2">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 py-3 will-change-transform">
          {row.map((it, i) => (
            <span
              key={`${it.name}-${i}`}
              className="group flex items-center gap-2.5 whitespace-nowrap text-sm text-muted transition-colors hover:text-fg"
            >
              <it.Icon className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="font-medium tracking-wide">{it.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
