"use client";

import { TECH_STACK } from "@/lib/constants";

export function TechMarquee() {
  const row = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-label="Tools and technologies I use"
      className="relative border-y border-white/[0.05] bg-white/[0.01] py-10"
    >
      <div className="mask-fade-x overflow-hidden">
        <div className="pause-on-hover flex w-max items-center gap-12 will-change-transform">
          <div className="flex w-max animate-marquee items-center gap-12 px-6">
            {row.map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="group inline-flex items-center gap-2.5 whitespace-nowrap text-sm text-muted transition-colors hover:text-fg"
              >
                <t.Icon className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="font-medium tracking-wide">{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
