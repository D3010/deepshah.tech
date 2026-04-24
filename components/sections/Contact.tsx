"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CONTACT } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[100svh] snap-start scroll-mt-24 items-center py-28 md:py-36"
    >
      <div className="container-page w-full">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-12 lg:gap-16"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            id="contact-heading"
            variants={fadeUp}
            className="display max-w-5xl text-balance"
          >
            <span className="text-gradient-strong">{CONTACT.headline}</span>
          </motion.h2>

          <motion.ul
            variants={fadeUp}
            className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]"
          >
            {CONTACT.rows.map((row) => (
              <ContactRow key={row.label} {...row} />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    if (Math.abs(dx) > 240) {
      x.set(0);
      return;
    }
    x.set(dx * 0.06);
  };

  const isExternal = href.startsWith("http");

  return (
    <li>
      <motion.a
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        data-cursor="link"
        onMouseMove={handleMove}
        onMouseLeave={() => x.set(0)}
        className="group flex flex-col items-start justify-between gap-3 py-7 transition-colors hover:text-fg sm:flex-row sm:items-center sm:py-9"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:w-32">
          {label}
        </span>

        <motion.span
          style={{ x: sx }}
          className="flex flex-1 items-center gap-4 text-2xl font-medium tracking-tight text-fg/90 transition-colors group-hover:text-fg sm:text-3xl md:text-4xl"
        >
          {value}
          <ArrowUpRight className="h-6 w-6 flex-none text-fg/50 transition-all duration-500 group-hover:translate-x-2 group-hover:text-fg md:h-7 md:w-7" />
        </motion.span>
      </motion.a>
    </li>
  );
}
