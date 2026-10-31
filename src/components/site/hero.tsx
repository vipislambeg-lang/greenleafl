"use client";

import { useRef } from "react";
import Image from "next/image";
import { BASE } from "@/lib/basepath";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SplitText } from "./split-text";
import { WhatsAppIcon } from "./whatsapp-icon";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Zoom Scrolling: фон плавно масштабируется при прокрутке
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.02, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse-Follow Parallax: слои реагируют на движение курсора
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.6 });
  const bgX = useTransform(sx, (v) => (reduce ? 0 : v * -14));
  const bgY = useTransform(sy, (v) => (reduce ? 0 : v * -10));
  const fgX = useTransform(sx, (v) => (reduce ? 0 : v * 10));
  const fgY = useTransform(sy, (v) => (reduce ? 0 : v * 7));

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest"
      aria-label="Главный экран"
    >
      {/* Фон: продукт на каменной поверхности, zoom + параллакс */}
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-3%] will-change-transform">
          <Image
            src={BASE + "/images/hero.jpg"}
            alt="Натуральная продукция GreenLeaf на травертиновой поверхности в утреннем свете"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Тёплый градиент для читаемости */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/40 to-forest-deep/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(24,35,28,0.45)_100%)]" />

      {/* Контент */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative z-10 flex flex-col items-center pt-24 pb-28 text-center text-cream"
      >
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="flex flex-col items-center will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow !text-gold-soft mb-7 whitespace-nowrap max-md:!text-[8.5px] max-md:!tracking-[0.05em]"
          >
            GreenLeaf · Официальный партнёр · Махачкала
          </motion.p>

          <h1 className="display-1 max-w-5xl">
            <SplitText text="Природа." mode="mount" delay={0.35} />
            <br />
            <SplitText text="Технологии." mode="mount" delay={0.7} />
            <br />
            <span className="text-gold-soft">
              <SplitText text="Жизнь." mode="mount" delay={1.05} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#about"
              className="btn-sheen inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-gold px-8 font-display text-sm font-bold tracking-wide text-forest-deep shadow-[0_10px_30px_-10px_rgba(185,150,79,0.7)] hover:shadow-[0_16px_38px_-12px_rgba(185,150,79,0.85)]"
            >
              Хочу узнать больше
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cream/30 px-8 font-display text-sm font-semibold tracking-wide text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Индикатор прокрутки */}
      <motion.a
        href="#about"
        aria-label="Прокрутите вниз"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/70 transition-colors hover:text-cream"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em]">
            Листайте
          </span>
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
