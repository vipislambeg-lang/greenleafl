"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Сдвиг по вертикали в px до появления */
  y?: number;
  /** Последовательное появление детей (staggered reveal) */
  staggerChildren?: number;
  once?: boolean;
  amount?: number;
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Обёртка для плавного появления контента при попадании в область видимости
 * (Intersection Observer под капотом framer-motion).
 * Если staggerChildren > 0 — дети с variants="item" появляются последовательно.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  staggerChildren = 0,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const parent: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (staggerChildren > 0) {
    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export { item as revealItem };
