"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 22, stiffness: 320, mass: 0.4 };
  const cx = useSpring(x, springConfig);
  const cy = useSpring(y, springConfig);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineHover || prefersReducedMotion()) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const out = () => setHidden(true);

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isLink = target.closest('[data-cursor="link"], a, button, input, textarea, select, label');
      setHovering(!!isLink);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", out);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ translateX: cx, translateY: cy }}
        animate={{
          scale: pressed ? 0.7 : hovering ? 2.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] -ml-2 -mt-2 h-4 w-4 rounded-full mix-blend-difference"
      >
        <div className="h-full w-full rounded-full bg-white" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        animate={{ opacity: hidden ? 0 : hovering ? 0 : 0.5 }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] -ml-4 -mt-4 h-8 w-8 rounded-full border border-white/40"
      />
    </>
  );
}
