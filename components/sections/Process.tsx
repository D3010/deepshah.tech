"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROCESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Map [0,1] across the 4 cards
    const idx = Math.min(
      PROCESS.length - 1,
      Math.max(0, Math.floor(v * PROCESS.length)),
    );
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative scroll-mt-24"
    >
      <div ref={sectionRef} className="container-page relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — pinned */}
          <div className="md:sticky md:top-32 md:self-start md:py-20">
            <div className="flex flex-col gap-6">
              <SectionLabel number="03" label="How I Work" />
              <h2 id="process-heading" className="heading">
                From &ldquo;what if&rdquo; to &ldquo;in production&rdquo; — in
                four moves.
              </h2>
              <div className="mt-4 flex items-baseline gap-3 font-mono text-sm text-[var(--text-tertiary)]">
                <span className="text-gradient-strong text-3xl font-semibold tabular-nums">
                  {PROCESS[active]?.number ?? "01"}
                </span>
                <span>/ 0{PROCESS.length}</span>
              </div>
              {/* Step list — left rail */}
              <ul className="mt-6 hidden flex-col gap-3 md:flex">
                {PROCESS.map((s, i) => (
                  <li key={s.number}>
                    <button
                      type="button"
                      onClick={() => {
                        const target = sectionRef.current?.querySelector(
                          `[data-process-card="${i}"]`,
                        ) as HTMLElement | null;
                        target?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={cn(
                        "group flex items-center gap-3 text-left transition-colors duration-300",
                        i === active
                          ? "text-fg"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]",
                      )}
                    >
                      <span className="font-mono text-xs tabular-nums">
                        {s.number}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "h-px w-8 transition-all duration-500",
                          i === active
                            ? "w-12 bg-gradient-brand"
                            : "bg-white/[0.16]",
                        )}
                      />
                      <span className="text-[15px] font-medium">{s.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — scrolling cards */}
          <div className="flex flex-col gap-8 py-20 md:gap-16 md:py-32">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.number}
                data-process-card={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
                className={cn(
                  "relative rounded-3xl border border-white/[0.08] bg-surface p-8 transition-all duration-500 md:p-12",
                  i === active ? "opacity-100" : "md:opacity-40",
                )}
              >
                <span className="font-mono text-[64px] font-semibold leading-none text-[var(--text-tertiary)] md:text-[96px]">
                  {step.number}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {step.body}
                </p>
                {/* Active gradient hairline */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-8 bottom-6 h-px origin-left bg-gradient-brand transition-transform duration-700 md:inset-x-12",
                    i === active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
