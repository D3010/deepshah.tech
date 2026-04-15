import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export function Card({ children, className, hoverGlow = true, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl glass shadow-inner-glow transition-all duration-500 ease-out-expo",
        hoverGlow && "hover:border-white/15 hover:shadow-glow",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
