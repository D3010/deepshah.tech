"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeader } from "./Skills";

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = (card?.clientWidth ?? 360) + 24;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="testimonials-heading"
            eyebrow="Kind Words"
            title={
              <>
                What People <span className="text-gradient-strong">Say</span>
              </>
            }
          />
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous testimonial"
              data-cursor="link"
              onClick={() => scrollBy(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition hover:border-white/20 hover:text-fg hover:shadow-glow"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              data-cursor="link"
              onClick={() => scrollBy(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition hover:border-white/20 hover:text-fg hover:shadow-glow"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scroll-padding:1.5rem]"
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="group relative w-[88vw] flex-none snap-start rounded-2xl glass p-7 transition-all duration-300 hover:border-white/15 hover:shadow-glow sm:w-[420px]"
            >
              <Quote className="mb-4 h-7 w-7 text-primary/70" />
              <p className="text-base leading-relaxed text-fg/90">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-brand-soft text-sm font-bold text-fg/60">
                  {/* TODO: Replace with avatar in lib/constants.ts */}
                  {t.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
