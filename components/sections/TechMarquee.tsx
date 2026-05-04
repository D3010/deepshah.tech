"use client";

import { TECH_ROW_1, TECH_ROW_2 } from "@/lib/constants";

function Pill({ name }: { name: string }) {
  return (
    <span className="group inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-white/[0.08] px-[18px] py-2 font-mono text-[14px] text-[var(--text-tertiary)] transition-all duration-200 hover:scale-[1.05] hover:border-white/[0.2] hover:text-fg">
      {name}
    </span>
  );
}

export function TechMarquee() {
  // Duplicate items so the -50% translate produces a seamless loop
  const row1 = [...TECH_ROW_1, ...TECH_ROW_1];
  const row2 = [...TECH_ROW_2, ...TECH_ROW_2];

  return (
    <section
      aria-label="Tools and technologies I use"
      className="relative py-16"
    >
      <div className="mask-fade-x flex flex-col gap-4 overflow-hidden">
        <div className="pause-on-hover">
          <div className="flex w-max animate-marquee gap-3 will-change-transform">
            {row1.map((t, i) => (
              <Pill key={`r1-${t}-${i}`} name={t} />
            ))}
          </div>
        </div>

        <div className="pause-on-hover">
          <div className="flex w-max animate-marquee-reverse gap-3 will-change-transform">
            {row2.map((t, i) => (
              <Pill key={`r2-${t}-${i}`} name={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
