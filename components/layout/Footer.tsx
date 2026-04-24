"use client";

import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-black/[0.08] bg-background pt-20">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            About
          </p>
          <p className="text-sm leading-relaxed text-fg/65">
            AI Engineer based in {SITE.location.split(",")[0]}. Building agents,
            automation, and the unsexy infrastructure that lets them actually
            ship.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Links
          </p>
          <ul className="grid grid-cols-2 gap-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="link"
                  className="text-fg/75 transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={SITE.resumeUrl}
                data-cursor="link"
                className="text-fg/75 transition-colors hover:text-fg"
                download
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Elsewhere
          </p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="text-fg/75 transition-colors hover:text-fg"
                >
                  {name}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="link"
                className="text-fg/75 transition-colors hover:text-fg"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-20 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-8 text-xs text-muted md:flex-row md:items-center">
        <p>
          © {year} {SITE.fullName}.
        </p>
        <p className="font-mono uppercase tracking-[0.16em]">
          {SITE.domain}
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mt-8 select-none overflow-hidden"
      >
        <p
          className="-mb-[0.18em] whitespace-nowrap text-center font-medium leading-[0.85] tracking-[-0.05em]"
          style={{
            color: "rgba(10,10,10,0.06)",
            fontSize: "clamp(5rem, 18vw, 14rem)",
          }}
        >
          DEEP SHAH
        </p>
      </div>
    </footer>
  );
}
