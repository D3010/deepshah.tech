"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUp}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h2 variants={fadeUp} id={id} className="heading">
        {title}
      </motion.h2>
      {description && (
        <motion.div variants={fadeUp} className="text-base text-fg/65 md:text-lg">
          {description}
        </motion.div>
      )}
    </motion.div>
  );
}
