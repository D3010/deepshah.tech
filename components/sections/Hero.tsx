"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CountUp } from "@/components/effects/CountUp";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { HERO, SITE } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100dvh] flex-col items-stretch justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>
      <div className="noise-overlay -z-10" />

      <div className="container-page relative grid w-full grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-400"
          >
            <span className="h-px w-8 bg-secondary-400/70" />
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient-strong">{HERO.name}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {HERO.bio}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-2 flex flex-wrap items-center gap-3">
            <LinkButton href={HERO.primaryCta.href} size="lg">
              {HERO.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href={HERO.secondaryCta.href}
              variant="ghost"
              size="lg"
              download
              aria-label="Download resume"
            >
              <Download className="h-4 w-4" />
              {HERO.secondaryCta.label}
            </LinkButton>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-8 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.06] pt-8"
          >
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                  {/* TODO: Replace stat values in lib/constants.ts */}
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto aspect-square w-[260px] sm:w-[320px] lg:w-[420px]"
        >
          {/* Animated gradient ring */}
          <div className="absolute inset-0 rounded-full p-[3px] animate-gradient-spin [background:conic-gradient(from_0deg,#6366f1,#06b6d4,#818cf8,#6366f1)]">
            <div className="h-full w-full rounded-full bg-background" />
          </div>

          {/* Soft glow */}
          <div className="absolute -inset-6 -z-10 rounded-full bg-primary/20 blur-3xl" />

          {/* Photo */}
          <div className="absolute inset-2 overflow-hidden rounded-full animate-float">
            {/* TODO: Replace with actual photo at /public/images/deep-shah.jpg */}
            <Image
              src={SITE.photoUrl}
              alt={`${SITE.name} portrait`}
              fill
              priority
              sizes="(max-width: 1024px) 320px, 420px"
              className="object-cover"
              onError={(e) => {
                // Graceful fallback if photo missing — let CSS gradient show through
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Gradient placeholder shown if photo missing */}
            <div className="absolute inset-0 -z-10 grid place-items-center bg-gradient-brand-soft text-6xl font-heading font-bold text-fg/40">
              DS
            </div>
          </div>

          {/* Floating chip */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-surface/90 px-4 py-1.5 text-xs font-medium backdrop-blur-md shadow-glow">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400 align-middle" />
            Available now
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => scrollToId("about")}
        data-cursor="link"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-fg transition-colors"
      >
        <ChevronDown className="h-6 w-6 animate-bounce-slow" />
      </button>
    </section>
  );
}
