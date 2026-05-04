"use client";

import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 select-none";

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "text-white shadow-glow hover:shadow-glow-lg [background:var(--gradient-brand)] [background-size:200%_100%] hover:[background-position:100%_50%]",
  outline:
    "border border-white/[0.16] bg-transparent text-fg hover:border-primary-500 hover:bg-white/[0.03]",
  ghost: "text-fg/80 hover:text-fg",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Magnetic pull radius in px. Default 90. */
  radius?: number;
  /** Magnetic pull strength 0–1. Default 0.35. */
  strength?: number;
}

type AnchorOnly = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | "children"
  | "className"
  | "href"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

type ButtonOnly = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "children"
  | "className"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

type ButtonAsButton = SharedProps & { as?: "button" } & ButtonOnly;
type ButtonAsAnchor = SharedProps & {
  as: "a";
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
} & AnchorOnly;

type Props = ButtonAsButton | ButtonAsAnchor;

export function MagneticButton(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    radius = 90,
    strength = 0.35,
  } = props;
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (props.as === "a") {
    const { as: _a, href, download, target, rel, variant: _v, size: _s, className: _c, children: _ch, radius: _r, strength: _st, ...rest } = props;
    const motionProps: HTMLMotionProps<"a"> = {
      ...(rest as HTMLMotionProps<"a">),
      href,
      download,
      target,
      rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
      style: { x: sx, y: sy },
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
      className: cls,
    };
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        data-cursor="link"
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  const { as: _a, variant: _v, size: _s, className: _c, children: _ch, radius: _r, strength: _st, ...rest } = props as ButtonAsButton;
  const motionProps: HTMLMotionProps<"button"> = {
    ...(rest as HTMLMotionProps<"button">),
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: cls,
  };
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      data-cursor="link"
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
