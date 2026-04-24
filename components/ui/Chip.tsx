import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-black/[0.03] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
