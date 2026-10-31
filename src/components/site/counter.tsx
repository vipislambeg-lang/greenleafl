"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Анимированный счётчик: стартует при попадании в область видимости. */
export function Counter({ to, suffix = "", duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const dur = reduce ? 0 : duration * 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const p = dur === 0 ? 1 : Math.min((now - start) / dur, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
