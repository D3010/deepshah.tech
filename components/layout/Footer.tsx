"use client";

import { ArrowUp, Heart } from "lucide-react";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-surface/30 mt-32">
      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="container-page py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-heading text-sm font-bold">
              <span className="text-gradient-strong">DS</span>
            </span>
            <div className="text-sm">
              <p className="text-fg font-medium">{SITE.name}</p>
              <p className="text-muted text-xs">AI Engineer · Automation Expert</p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="link"
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  data-cursor="link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-fg hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-6 md:flex-row">
          <p className="text-xs text-muted">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted">
            Designed & built by {SITE.name} with{" "}
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" />
          </p>
          <button
            type="button"
            onClick={toTop}
            data-cursor="link"
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-fg hover:shadow-glow"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
