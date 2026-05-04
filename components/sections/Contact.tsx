"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { CONTACT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const ContactArt = dynamic(() => import("@/components/contact/ContactArt"), {
  ssr: false,
  loading: () => null,
});

export function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
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

        {/* Massive gradient headline */}
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

        {/* 3D contact art — replaces the email/github/linkedin link rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="relative h-[60vh] min-h-[420px] w-full"
        >
          <ContactArt />
          {/* Tagline overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 pb-2 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              Move your cursor
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              {CONTACT.rows[0]?.value}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
