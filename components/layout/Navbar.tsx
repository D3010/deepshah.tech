"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn, scrollToId } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 160);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      scrollToId(href.slice(1));
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-6 z-50 px-4 md:px-6"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 w-full max-w-[680px] items-center justify-between gap-4 rounded-full border border-white/[0.08] px-3 pl-5 transition-all duration-500",
            scrolled
              ? "bg-[rgba(20,20,24,0.7)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
              : "bg-[rgba(20,20,24,0.3)] backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-fg"
            aria-label={`${SITE.name} — home`}
          >
            <span
              aria-hidden
              className="inline-block h-[6px] w-[6px] rounded-full bg-gradient-brand"
            />
            {SITE.name}
          </Link>

          {/* Links — desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="group relative rounded-full px-3 py-1.5 text-[14px] text-[var(--text-secondary)] transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="group relative rounded-full px-3 py-1.5 text-[14px] text-[var(--text-secondary)] transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <GradientButton
                as="button"
                size="sm"
                onClick={() => handleNav("#contact")}
              >
                Let&apos;s talk
              </GradientButton>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-fg md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
            <nav
              aria-label="Mobile"
              className="relative flex h-full flex-col items-center justify-center gap-6 px-8"
            >
              <ul className="flex flex-col items-center gap-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {link.href.startsWith("#") ? (
                      <button
                        type="button"
                        onClick={() => handleNav(link.href)}
                        className="text-3xl font-medium tracking-tight text-fg"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-3xl font-medium tracking-tight text-fg"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + NAV_LINKS.length * 0.07,
                  duration: 0.5,
                }}
              >
                <GradientButton
                  as="button"
                  onClick={() => handleNav("#contact")}
                >
                  Let&apos;s talk
                </GradientButton>
              </motion.div>
              <p className="absolute bottom-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                {SITE.email}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
