"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn, scrollToId } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 24));
  }, [scrollY]);

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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "border-b border-accent/[0.06] glass-strong backdrop-saturate-150"
            : "bg-transparent"
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-page flex h-full items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    data-cursor="link"
                    className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-500 hover:text-fg"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNav("#contact")}
              data-cursor="link"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-fg gradient-border transition-all duration-500 hover:bg-accent/[0.05] hover:shadow-glow"
            >
              Hire Me
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/10 bg-accent/[0.04] text-fg md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
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
            <motion.nav
              aria-label="Mobile"
              className="relative flex h-full flex-col items-center justify-center gap-2 px-8"
            >
              <ul className="flex flex-col items-center gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="text-3xl font-semibold tracking-tight text-fg transition-colors hover:text-gradient"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.07, duration: 0.5 }}
                  className="mt-4"
                >
                  <button
                    type="button"
                    onClick={() => handleNav("#contact")}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-glow"
                  >
                    Hire Me <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.li>
              </ul>
              <p className="absolute bottom-8 text-xs text-muted">{SITE.email}</p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      data-cursor="link"
      className="group flex items-center gap-2.5"
      aria-label="Deep Shah — home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-heading text-sm font-bold">
        <span className="text-gradient-strong">DS</span>
        <span className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(135deg,rgba(16,185,129,0.45),rgba(244,63,94,0.45))] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-px" />
      </span>
      <span className="hidden text-sm font-medium text-fg sm:inline">
        {SITE.name}
      </span>
    </Link>
  );
}
