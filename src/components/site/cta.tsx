"use client";

import { useRef } from "react";
import Image from "next/image";
import { BASE } from "@/lib/basepath";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";
import { WhatsAppIcon } from "./whatsapp-icon";
import { TelegramIcon } from "./telegram-icon";
import { InstagramIcon } from "./instagram-icon";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-28 text-cream md:py-40"
      aria-label="Контакты и призыв к действию"
    >
      {/* Фон: листья с золотым светом, лёгкий параллакс */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-14%] will-change-transform">
        <Image
          src={BASE + "/images/leaves.jpg"}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest-deep/80" aria-hidden="true" />

      <div className="container-site relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow !text-gold-soft mb-6">Первый шаг</p>
        </Reveal>

        <h2 className="display-1 max-w-4xl">
          <SplitText text="Готовы начать?" />
        </h2>

        <Reveal className="mt-8" y={20}>
          <p className="lead mx-auto max-w-2xl text-cream/85">
            Напишите мне — отвечу на вопросы о продукции и сотрудничестве,
            расскажу, с чего начать.
          </p>
        </Reveal>

        <Reveal
          className="mt-12 flex flex-col flex-wrap items-center justify-center gap-5 sm:flex-row"
          y={20}
        >
          <a
            href="https://wa.me/message/655DK7EF4KWRD1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex h-14 items-center gap-3 rounded-full bg-gold px-9 font-display text-base font-bold text-forest-deep shadow-[0_14px_40px_-12px_rgba(185,150,79,0.8)] hover:shadow-[0_20px_50px_-14px_rgba(185,150,79,0.95)]"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
          <a
            href="https://t.me/+yD0sFVNgJpozNTcy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center gap-2.5 rounded-full border border-cream/30 px-8 font-display text-sm font-semibold text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
          >
            <TelegramIcon className="size-5" />
            Telegram
          </a>
          <a
            href={"https://www.instagram.com/muhammadbeg11?srtk=MWM3end1cnR4dHJ5MA%3D%3D&utm_source=qr"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center gap-2.5 rounded-full border border-cream/30 px-8 font-display text-sm font-semibold text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
          >
            <InstagramIcon className="size-5" />
            Instagram
          </a>
        </Reveal>

        <Reveal className="mt-10" y={16}>
          <p className="whitespace-nowrap text-[min(11.5px,3.1vw)] text-cream/55 sm:text-sm">
            Сервисный центр: Махачкала, ул. Имама Шамиля, 86 А.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
