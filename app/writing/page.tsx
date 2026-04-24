import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building agents, automation, and AI systems that ship.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative pt-[calc(var(--nav-h)+4rem)]">
        <div className="container-page flex flex-col gap-16 py-16">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back home
            </Link>
            <Eyebrow>Notes</Eyebrow>
            <h1 className="display max-w-3xl text-balance">Writing.</h1>
            <p className="max-w-2xl text-base text-fg/65 md:text-lg">
              Posts coming soon. The drafts below are placeholders while I get
              the publishing pipeline finished.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <article className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div className="flex flex-col gap-1.5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {formatDate(a.date)} · {a.readingMinutes} min
                    </p>
                    <h2 className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
                      {a.title}
                    </h2>
                    <p className="text-sm text-fg/65 sm:max-w-xl">{a.excerpt}</p>
                  </div>
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
                  >
                    Soon <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
