import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
  dotColor?: string;
}

export function Badge({
  children,
  className,
  pulse = false,
  dotColor = "#22c55e",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-fg/90 backdrop-blur-sm",
        className
      )}
    >
      {pulse && (
        <span className="relative inline-flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: dotColor }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        </span>
      )}
      {children}
    </span>
  );
}
