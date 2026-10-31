"use client";

import { useRef } from "react";
import Image from "next/image";
import { BASE } from "@/lib/basepath";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, HeartHandshake } from "lucide-react";
import { Reveal, revealItem } from "./reveal";
import { SplitText } from "./split-text";

const CHIPS = [
  { icon: ShieldCheck, label: "Официальный партнёр GreenLeaf" },
  { icon: MapPin, label: "Махачкала · работа по всей России" },
  { icon: HeartHandshake, label: "Личное сопровождение каждого" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Image Magnification on Scroll: фото растёт из лёгкого уменьшения в 1:1
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.14, 1]);
  const frameScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 md:py-36" aria-label="О партнёре">
      {/* Мягкое золотое свечение фона (на мобильных скрыто — дорогой blur) */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] hidden size-[34rem] rounded-full opacity-40 blur-3xl md:block"
        style={{ background: "radial-gradient(circle, rgba(217,192,141,0.35), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Текст: staggered reveal построчно */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">О партнёре</p>
          </Reveal>

          <h2 className="display-2 text-foreground">
            <SplitText text="Я начинал с нуля." />
          </h2>

          <Reveal className="mt-8 space-y-6" staggerChildren={0.12}>
            <motion.p variants={revealItem} className="lead max-w-xl">
              Сегодня я не просто партнёр — я ваш проводник. Моя миссия —
              помочь вам поверить в себя и в свои возможности.
            </motion.p>
            <motion.p variants={revealItem} className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Я знаю, что такое начинать без опыта, связей и стартового капитала.
              Поэтому не предлагаю «волшебных таблеток» — я рядом на каждом шаге:
              помогу выбрать стартовый набор, разобраться в продукции и сделать
              первые заказы. Вы получаете готовую систему, которая уже работает.
            </motion.p>
            <motion.p variants={revealItem} className="max-w-xl text-base leading-relaxed text-muted-foreground">
              GreenLeaf — это не про «продажи любой ценой». Это про заботу:
              о здоровье, о доме, о бюджете вашей семьи. Именно поэтому здесь
              люди остаются на годы.
            </motion.p>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3" staggerChildren={0.08}>
            {CHIPS.map((c) => (
              <motion.span
                key={c.label}
                variants={revealItem}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-ivory px-4 py-2 text-sm font-medium text-foreground/80"
              >
                <c.icon className="size-4 text-gold" aria-hidden="true" />
                {c.label}
              </motion.span>
            ))}
          </Reveal>
        </div>

        {/* Портрет с увеличением при скролле */}
        <motion.div
          style={{ scale: frameScale }}
          className="relative mx-auto w-full max-w-md will-change-transform lg:max-w-none"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(24,35,28,0.5)]">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 will-change-transform">
              <Image
                src={BASE + "/images/partner.jpg"}
                alt="Магомедбег Хирамагомедов — официальный партнёр GreenLeaf"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/35 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 rounded-full bg-cream/90 px-4 py-2 backdrop-blur-sm">
              <p className="font-display text-sm font-bold text-forest">Магомедбег</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
