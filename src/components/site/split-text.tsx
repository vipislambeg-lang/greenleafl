"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "mount" | "inview";
  once?: boolean;
};

/**
 * Побуквенная анимация заголовка ("text choreography" в стиле Apple).
 * Слова не разрываются при переносе: буквы группируются по словам.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.028,
  mode = "inview",
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const char: Variants = {
    hidden: { opacity: 0, y: "0.65em", rotateX: -55 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline-block [perspective:600px]", className)}
      variants={container}
      initial="hidden"
      {...(mode === "inview"
        ? { whileInView: "show", viewport: { once, amount: 0.6 } }
        : { animate: "show" })}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={`w-${wi}`}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split("").map((ch, ci) => (
            <motion.span key={`c-${wi}-${ci}`} variants={char} className="inline-block will-change-transform">
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
