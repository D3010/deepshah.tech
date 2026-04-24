"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
      setScrolled(y > 24);
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 120);
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
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-background/65 backdrop-blur-xl"
            : "bg-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            data-cursor="link"
            className="text-base font-semibold tracking-tight text-fg"
            aria-label={`${SITE.name} — home`}
          >
            {SITE.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    data-cursor="link"
                    className="rounded-full px-4 py-2 text-sm text-fg/65 transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <MagneticButton
                as="button"
                variant="primary"
                size="md"
                onClick={() => handleNav("#contact")}
              >
                Let&apos;s talk
              </MagneticButton>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg md:hidden"
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
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="text-3xl font-medium tracking-tight text-fg"
                    >
                      {link.label}
                    </button>
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
                <MagneticButton
                  as="button"
                  variant="primary"
                  onClick={() => handleNav("#contact")}
                >
                  Let&apos;s talk
                </MagneticButton>
              </motion.div>
              <p className="absolute bottom-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {SITE.email}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
