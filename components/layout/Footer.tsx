"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-background pt-16 pb-10">
      <div className="container-page grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Signature */}
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold tracking-tight text-fg">
            {SITE.name}
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Building the agentic web from {SITE.location.split(",")[0]}.
          </p>
        </div>

        {/* Sitemap */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Sitemap
          </p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                {l.href.startsWith("#") ? (
                  <a
                    href={l.href}
                    className="text-[var(--text-secondary)] transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="text-[var(--text-secondary)] transition-colors hover:text-fg"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Elsewhere
          </p>
          <ul className="flex items-center gap-2">
            <li>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-[var(--text-secondary)] transition-all duration-200 hover:border-white/[0.2] hover:text-fg"
              >
                <Github className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-[var(--text-secondary)] transition-all duration-200 hover:border-white/[0.2] hover:text-fg"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-[var(--text-secondary)] transition-all duration-200 hover:border-white/[0.2] hover:text-fg"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/[0.06] pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)] md:flex-row md:items-center">
        <p>© {year} {SITE.fullName}</p>
        <p>Built with Next.js &amp; Claude</p>
      </div>
    </footer>
  );
}
