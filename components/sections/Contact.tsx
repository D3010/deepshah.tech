"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { CONTACT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    // TODO: wire to NEXT_PUBLIC_CONTACT_ENDPOINT (Resend/Formspree/Loops). For
    // now we no-op and report success — the legacy /api/contact endpoint is
    // still available for the longer form on /contact (if/when added).
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } else {
        // eslint-disable-next-line no-console
        console.info("Contact submit (no endpoint configured):", email);
      }
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 py-32 md:py-40"
    >
      {/* Ambient bloom behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/3 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-page flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <SectionLabel number="05" label="Let's Talk" />
        </motion.div>

        {/* Massive gradient headline — fills width */}
        <h2
          id="contact-heading"
          className="text-balance font-semibold tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
        >
          <RevealText
            whileInView
            stagger={0.05}
            className="text-gradient-strong"
          >
            {CONTACT.headline}
          </RevealText>
        </h2>

        {/* Email form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="contact-email" className="sr-only">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-white/[0.08] bg-surface px-5 py-3.5 text-[15px] text-fg placeholder:text-[var(--text-tertiary)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "ok" ? "Sent" : "Send"}
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.form>

        {/* Contact rows */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]"
        >
          {CONTACT.rows.map((row, i) => (
            <ContactRow key={row.label} {...row} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  index,
}: {
  label: string;
  value: string;
  href: string;
  index: number;
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
    x.set(dx * 0.05);
  };

  const isExternal = href.startsWith("http");

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
    >
      <motion.a
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={() => x.set(0)}
        className="group relative flex flex-col items-start gap-3 py-7 transition-colors sm:flex-row sm:items-center sm:gap-8 sm:py-8"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)] sm:w-32">
          {label}
        </span>
        <motion.span
          style={{ x: sx }}
          className="relative flex flex-1 items-center gap-3 text-2xl font-semibold tracking-tight text-fg/90 transition-all duration-300 group-hover:bg-gradient-brand group-hover:bg-clip-text group-hover:text-transparent sm:text-3xl md:text-4xl"
        >
          {value}
          <ArrowUpRight className="h-6 w-6 flex-none text-[var(--text-tertiary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg md:h-7 md:w-7" />
        </motion.span>
        {/* Animated underline */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100"
        />
      </motion.a>
    </motion.li>
  );
}
