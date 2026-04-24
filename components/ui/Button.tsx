"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out-expo focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 select-none";

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-background shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98]",
  ghost:
    "glass text-fg hover:bg-accent/[0.06] hover:border-accent/20 hover:shadow-glow",
  outline:
    "gradient-border bg-transparent text-fg hover:bg-accent/[0.04]",
};

export interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: never;
}

export interface LinkButtonProps extends BaseProps {
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      data-cursor="link"
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  download,
  target,
  rel,
  ...rest
}: LinkButtonProps) {
  const isExternal = /^https?:\/\//i.test(href) || download !== undefined;
  const computedRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={computedRel}
        download={download}
        data-cursor="link"
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      data-cursor="link"
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
