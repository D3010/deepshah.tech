import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

export function Eyebrow({ children, className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
