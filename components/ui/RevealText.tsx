"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, isValidElement, cloneElement } from "react";

type Variant = "fade-up" | "fade-in";

interface RevealTextProps {
  /** Plain string (will be split into words) or arbitrary children that get a single fade. */
  children: React.ReactNode;
  className?: string;
  /** Stagger between words, in seconds. Default 0.04. */
  stagger?: number;
  /** Delay before the first word, in seconds. Default 0. */
  delay?: number;
  /** Animation variant. Default "fade-up". */
  variant?: Variant;
  /** If false, animates on scroll into view. Default false (i.e. animate-on-mount). */
  whileInView?: boolean;
  /** Once-only. Default true. */
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word reveal. Wraps each word in a clip container so the rise looks clean.
 * If children isn't a plain string, falls back to a single fade on the whole node.
 */
export function RevealText({
  children,
  className,
  stagger = 0.04,
  delay = 0,
  variant = "fade-up",
  whileInView = false,
  once = true,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const word: Variants =
    variant === "fade-up"
      ? {
          hidden: { y: "110%", opacity: 0 },
          show: {
            y: "0%",
            opacity: 1,
            transition: { duration: reduceMotion ? 0.001 : 0.7, ease: EASE },
          },
        }
      : {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: reduceMotion ? 0.001 : 0.7, ease: EASE },
          },
        };

  // Plain string → split into words
  if (typeof children === "string") {
    const words = children.split(/(\s+)/); // keeps spaces
    return (
      <motion.span
        className={className}
        variants={container}
        initial="hidden"
        {...(whileInView
          ? { whileInView: "show", viewport: { once, amount: 0.4 } }
          : { animate: "show" })}
      >
        {words.map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={`s-${i}`}>{w}</span>
          ) : (
            <span key={`w-${i}`} className="reveal-word-clip">
              <motion.span variants={word} className="reveal-word-inner">
                {w}
              </motion.span>
            </span>
          ),
        )}
      </motion.span>
    );
  }

  // Mixed children — each child gets its own clip+rise (for inline gradient spans, etc.)
  const items = Children.toArray(children);
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(whileInView
        ? { whileInView: "show", viewport: { once, amount: 0.4 } }
        : { animate: "show" })}
    >
      {items.map((child, i) => {
        if (typeof child === "string") {
          const words = child.split(/(\s+)/);
          return (
            <span key={`mix-s-${i}`}>
              {words.map((w, j) =>
                /^\s+$/.test(w) ? (
                  <span key={`s-${i}-${j}`}>{w}</span>
                ) : (
                  <span key={`w-${i}-${j}`} className="reveal-word-clip">
                    <motion.span variants={word} className="reveal-word-inner">
                      {w}
                    </motion.span>
                  </span>
                ),
              )}
            </span>
          );
        }
        if (isValidElement(child)) {
          return (
            <span key={`mix-c-${i}`} className="reveal-word-clip">
              <motion.span variants={word} className="reveal-word-inner">
                {cloneElement(child)}
              </motion.span>
            </span>
          );
        }
        return null;
      })}
    </motion.span>
  );
}
