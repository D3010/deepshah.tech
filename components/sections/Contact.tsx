"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, CheckCircle2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Spinner } from "@/components/ui/Spinner";
import { CONTACT_SUBJECTS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { SectionHeader } from "./Skills";
import { fadeUp, slideInLeft, slideInRight, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.enum(CONTACT_SUBJECTS, {
    errorMap: () => ({ message: "Pick a subject" }),
  }),
  message: z.string().min(10, "At least 10 characters please"),
});

type FormValues = z.infer<typeof FormSchema>;

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { subject: CONTACT_SUBJECTS[0] },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Failed to send. Try again.");
      setStatus({ kind: "success" });
      reset({ subject: CONTACT_SUBJECTS[0] } as FormValues);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setStatus({ kind: "error", message });
    }
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 py-28 md:py-36"
    >
      <div className="container-page">
        <SectionHeader
          id="contact-heading"
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s Build <span className="text-gradient-strong">Something</span>
            </>
          }
          description="Have an idea, a role, or a half-baked thought? Drop a note — I respond fast."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <motion.form
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl glass p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Name"
                placeholder="Your name"
                autoComplete="name"
                {...register("name")}
                error={errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-fg/90">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  {...register("subject")}
                  className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 pr-10 text-sm text-fg outline-none transition-all duration-200 hover:border-white/20 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-glow"
                >
                  {CONTACT_SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-surface text-fg">
                      {s}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
              </div>
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div className="mt-5">
              <Textarea
                label="Message"
                placeholder="Tell me what you're working on…"
                rows={6}
                {...register("message")}
                error={errors.message?.message}
              />
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="link"
                className={cn(
                  "relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-brand bg-[length:200%_100%] px-6 text-sm font-medium text-white shadow-glow transition-all duration-300",
                  "hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed",
                  !isSubmitting && "animate-gradient-x"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Spinner /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {status.kind === "success" && (
                <span className="inline-flex items-center gap-2 text-sm text-primary-400">
                  <CheckCircle2 className="h-4 w-4" /> Sent — I&apos;ll be in touch.
                </span>
              )}
              {status.kind === "error" && (
                <span className="inline-flex items-center gap-2 text-sm text-red-400">
                  <AlertTriangle className="h-4 w-4" /> {status.message}
                </span>
              )}
            </div>
          </motion.form>

          {/* Side info */}
          <motion.aside
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl glass p-6">
              <h3 className="font-heading text-lg font-semibold">Direct line</h3>
              <p className="mt-1 text-sm text-muted">Prefer skipping the form?</p>

              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="link"
                    className="group flex items-center gap-3 text-sm"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition group-hover:text-secondary-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">Email</span>
                      <span className="text-fg">{SITE.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">Location</span>
                    <span className="text-fg">{SITE.location}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl glass p-6">
              <h3 className="font-heading text-lg font-semibold">Find me online</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-fg/90 transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-glow"
                    >
                      <Icon className="h-4 w-4 text-muted" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl gradient-border p-6">
              <p className="text-sm text-fg/90">
                <span className="font-semibold">Currently open</span> to consulting
                engagements and full-time roles building production AI products.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
