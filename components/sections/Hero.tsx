"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CountUp } from "@/components/effects/CountUp";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { HERO, SITE } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-follow spotlight tracking
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
      className="relative isolate flex min-h-[100dvh] flex-col items-stretch justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ======= Background layers ======= */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-aurora animate-aurora" />
        <div className="bg-aurora animate-aurora-alt" />
      </div>
      <div className="bg-spotlight -z-10" />
      <div className="absolute inset-0 -z-10 bg-dots opacity-70" />
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>
      <div className="noise-overlay -z-10" />

      <div className="container-page relative grid w-full grid-cols-1 items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* ======= LEFT — copy ======= */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-7"
        >
          {/* Eyebrow chip */}
          <motion.div variants={fadeUp}>
            <span className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-secondary-400 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-secondary-400" />
              {HERO.eyebrow}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-[2.85rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="text-gradient-strong inline-block"
              >
                {HERO.name}
              </motion.span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-2 h-[6px] rounded-full bg-gradient-brand opacity-40 blur-md"
              />
            </span>
          </motion.h1>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {HERO.bio}
          </motion.p>

          {/* Trust tags */}
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            {HERO.trust.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                )}
                <span className="tracking-wide">{t}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA — single primary button, no secondary */}
          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <LinkButton href={HERO.primaryCta.href} size="lg" className="group">
              <span className="relative z-10">{HERO.primaryCta.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              >
                <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sheen" />
              </span>
            </LinkButton>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-6 grid max-w-lg grid-cols-3 gap-5 border-t border-white/[0.06] pt-7"
          >
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                  <span className="text-gradient-strong">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ======= RIGHT — avatar, tilting on mouse ======= */}
        <TiltAvatar />
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
 * Tilting avatar — follows mouse with spring + floats + orbits
 * ================================================================ */
function TiltAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(springX, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["35%", "65%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{ perspective: 1200 }}
      className="relative mx-auto aspect-square w-[280px] sm:w-[340px] lg:w-[440px]"
    >
      {/* Outer decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-18%] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-6%] rounded-full border border-white/[0.05]"
      />

      {/* Orbiting tech chips (stay flat relative to ring, not photo) */}
      <OrbitingIcons />

      {/* Tilting content */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Animated conic rim */}
        <div className="absolute inset-0 rounded-full p-[3px] animate-gradient-spin conic-rim">
          <div className="h-full w-full rounded-full bg-background" />
        </div>

        {/* Soft glow */}
        <div className="absolute -inset-10 -z-10 rounded-full bg-primary/25 blur-3xl" />

        {/* Photo */}
        <div className="absolute inset-2 overflow-hidden rounded-full animate-float-slow">
          <Image
            src={SITE.photoUrl}
            alt={`${SITE.name} portrait`}
            fill
            priority
            sizes="(max-width: 1024px) 340px, 440px"
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 -z-10 grid place-items-center bg-gradient-brand-soft font-heading text-6xl font-bold text-fg/40">
            DS
          </div>
          {/* Cursor-tracking highlight */}
          <motion.div
            aria-hidden
            style={{
              background: useTransform(
                [glowX, glowY] as MotionValue<string>[],
                ([x, y]) =>
                  `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 55%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay"
          />
          {/* Inner gloss */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent"
          />
        </div>

        {/* Floating metric cards (decorative) */}
        <FloatingMetric
          className="-left-8 top-12 lg:-left-16"
          label="Shipped"
          value="50+"
          delay={0.4}
        />
        <FloatingMetric
          className="-right-6 bottom-24 lg:-right-14"
          label="Uptime"
          value="99.9%"
          delay={0.6}
          tone="amber"
        />
        <FloatingMetric
          className="-right-2 top-4 lg:-right-8"
          label="P95"
          value="<300ms"
          delay={0.8}
          tone="cyan"
        />

        {/* Availability chip */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-surface/90 px-4 py-1.5 text-xs font-medium shadow-glow backdrop-blur-md">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400 align-middle" />
          Available for new projects
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingMetric({
  label,
  value,
  className,
  delay = 0,
  tone = "violet",
}: {
  label: string;
  value: string;
  className?: string;
  delay?: number;
  tone?: "violet" | "cyan" | "amber";
}) {
  const toneDot =
    tone === "cyan"
      ? "bg-secondary-400"
      : tone === "amber"
      ? "bg-accent-400"
      : "bg-primary-400";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 animate-float rounded-2xl border border-white/10 bg-surface/80 px-3.5 py-2 shadow-glow backdrop-blur-md ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${toneDot}`} />
        <span className="text-[10px] uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
      <div className="font-heading text-lg font-bold leading-none tracking-tight text-fg">
        {value}
      </div>
    </motion.div>
  );
}

/* ================================================================
 * Orbiting tech icon chips (lg+ only)
 * ================================================================ */
function OrbitingIcons() {
  const icons = HERO.orbitIcons;
  const inner = icons.slice(0, 3);
  const outer = icons.slice(3, 6);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {/* Inner ring — counter-clockwise */}
      <div className="absolute inset-0">
        {inner.map((ic, i) => (
          <span
            key={`in-${ic.name}`}
            className="absolute left-1/2 top-1/2 -ml-6 -mt-6 animate-orbit-reverse"
            style={{
              // @ts-expect-error custom prop
              "--r": "235px",
              animationDelay: `${-i * (34 / inner.length)}s`,
              animationDuration: "34s",
            }}
          >
            <IconChip name={ic.name} Icon={ic.Icon} />
          </span>
        ))}
      </div>
      {/* Outer ring — clockwise */}
      <div className="absolute inset-0">
        {outer.map((ic, i) => (
          <span
            key={`out-${ic.name}`}
            className="absolute left-1/2 top-1/2 -ml-6 -mt-6 animate-orbit"
            style={{
              // @ts-expect-error custom prop
              "--r": "278px",
              animationDelay: `${-i * (40 / outer.length)}s`,
              animationDuration: "40s",
            }}
          >
            <IconChip name={ic.name} Icon={ic.Icon} />
          </span>
        ))}
      </div>
    </div>
  );
}

function IconChip({
  name,
  Icon,
}: {
  name: string;
  Icon: (typeof HERO.orbitIcons)[number]["Icon"];
}) {
  return (
    <span
      title={name}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-surface/85 shadow-glow backdrop-blur-md"
    >
      <Icon className="h-5 w-5 text-fg/85" />
    </span>
  );
}

/* ================================================================
 * Marquee strip of real tech logos
 * ================================================================ */
function MarqueeStrip() {
  const items = HERO.marqueeIcons;
  const row = [...items, ...items];

  return (
    <div className="relative mt-auto w-full pb-6 pt-2">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 py-3 will-change-transform">
          {row.map((it, i) => (
            <span
              key={`${it.name}-${i}`}
              className="group flex items-center gap-2.5 whitespace-nowrap text-sm text-muted transition-colors hover:text-fg"
            >
              <it.Icon className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100" />
              <span className="font-medium tracking-wide">{it.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
