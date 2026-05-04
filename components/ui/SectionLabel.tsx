import { cn } from "@/lib/utils";

interface SectionLabelProps {
  /** e.g. "01" — rendered before the em-dash */
  number?: string;
  /** e.g. "SELECTED WORK" */
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-brand"
      />
      <span>
        {number ? `${number} — ` : null}
        {label}
      </span>
    </p>
  );
}
