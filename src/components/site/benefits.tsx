"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BadgePercent, GraduationCap, Users, ArrowUpRight } from "lucide-react";
import { Reveal, revealItem } from "./reveal";
import { SplitText } from "./split-text";

const BENEFITS = [
  {
    icon: LayoutDashboard,
    title: "Личный кабинет",
    lead: "Ваш личный офис — всегда под рукой.",
    text: "Заказы, доходы, обучение и аналитика в одном месте. Управляйте бизнесом с телефона — из дома, кафе или дороги.",
  },
  {
    icon: BadgePercent,
    title: "Скидка 50%",
    lead: "Это ваша забота о доме и бюджете.",
    text: "Вся продукция — по партнёрской цене. Экономия с первой покупки.",
  },
  {
    icon: GraduationCap,
    title: "Обучение",
    lead: "Личное сопровождение на пути к новой жизни.",
    text: "Пошагово и без воды.",
  },
  {
    icon: Users,
    title: "Сообщество",
    lead: "Команда, которая всегда рядом.",
    text: "Опыт, поддержка и общие цели.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-24 md:py-36" aria-label="Преимущества">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">Преимущества</p>
          </Reveal>
          <h2 className="display-2 text-foreground">
            <SplitText text="Система, которая работает на вас" />
          </h2>
          <Reveal className="mt-6">
            <p className="lead">
              Всё продумано до мелочей, чтобы ваш старт был спокойным,
              понятным и выгодным — с первого дня.
            </p>
          </Reveal>
        </div>

        <Reveal
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          staggerChildren={0.1}
        >
          {BENEFITS.map((b) => (
            <motion.article
              key={b.title}
              variants={revealItem}
              className="micro-lift group flex flex-col rounded-2xl border border-border bg-ivory p-6 md:p-7"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary text-forest transition-colors duration-300 group-hover:bg-gold group-hover:text-forest-deep">
                <b.icon className="size-5.5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">{b.title}</h3>
              <p className="mt-1.5 font-display text-sm font-semibold text-gold">{b.lead}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-forest transition-colors hover:text-gold"
              >
                Подробнее
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
