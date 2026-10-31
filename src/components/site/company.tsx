"use client";

import { useRef } from "react";
import Image from "next/image";
import { BASE } from "@/lib/basepath";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Factory, Store, Headset } from "lucide-react";
import { Reveal, revealItem } from "./reveal";
import { Counter } from "./counter";
import { VideoSection } from "./video-section";

const LAYERS = [
  {
    n: "01",
    icon: Factory,
    title: "Производство",
    short: "Собственные линии и строгий контроль качества",
    text: "Здесь рождается каждый продукт: собственные линии, натуральное сырьё и многоступенчатый контроль качества.",
  },
  {
    n: "02",
    icon: Store,
    title: "Фирменные магазины",
    short: "Продукция всегда рядом, цены честные",
    text: "Сеть фирменных магазинов и пунктов выдачи — продукция всегда рядом, а цены честные и прозрачные.",
  },
  {
    n: "03",
    icon: Headset,
    title: "Сервис и поддержка",
    short: "Наставник, обучение и комьюнити",
    text: "Здесь вы найдёте поддержку: наставник, обучение в личном кабинете и комьюнити, которое двигается вместе с вами.",
  },
];

type Stat = { to: number; suffix: string; label: string; plain?: boolean };

const STATS: Stat[] = [
  { to: 5000, suffix: "+", label: "товаров в каталоге" },
  { to: 30, suffix: "+", label: "стран мира" },
  { to: 25, suffix: "+", label: "лет опыта компании" },
  // Год основания — статичное значение без разделителя тысяч и без счётчика
  { to: 1998, suffix: "", label: "Год основания", plain: true },
];

/** Компактная карточка для мобильного ряда: появляется один раз через Reveal,
    без привязки к прогрессу скролла — прокрутка остаётся свободной */
function MobileCard({ L }: { L: (typeof LAYERS)[number] }) {
  return (
    <motion.article
      variants={revealItem}
      className="rounded-2xl border border-cream/12 bg-[#22352a]/95 p-2.5"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-7 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
          <L.icon className="size-3.5" aria-hidden="true" />
        </span>
        <span className="font-display text-[9px] font-bold tracking-[0.18em] text-gold-soft/70">
          {L.n}
        </span>
      </div>
      <h3 className="mt-2 font-display text-[11px] font-bold leading-tight text-cream">{L.title}</h3>
      <p className="mt-1 text-[9.5px] leading-snug text-cream/65">{L.short}</p>
    </motion.article>
  );
}

/** Активная подсветка слоя по диапазону прогресса (только без reduced-motion) */
function useLayerActive(p: MotionValue<number>, start: number, end: number) {
  const mid = (start + end) / 2;
  const opacity = useTransform(p, [start - 0.06, mid], [0.12, 1]);
  const y = useTransform(p, [start - 0.06, mid], [26, 0]);
  const scale = useTransform(p, [start - 0.06, mid], [0.96, 1]);
  return { opacity, y, scale };
}

export function Company() {
  const reduce = useReducedMotion();

  if (reduce) return <CompanyStatic />;

  return (
    <section id="company" aria-label="О компании">
      {/* Мобильные: свободный поток без пина — никаких фиксаций и рывков */}
      <div className="md:hidden">
        <CompanyMobile />
      </div>
      {/* Десктоп: закреплённая версия с exploded view (как в первой версии) */}
      <div className="hidden md:block">
        <CompanyPinned />
      </div>
      <CompanyStats />
      {/* Видео о компании — сразу под блоком цифр */}
      <VideoSection />
    </section>
  );
}

/* ---------- Мобильная версия: свободный поток, без закрепления ---------- */
function CompanyMobile() {
  return (
    <div className="bg-forest-deep py-20 text-cream">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-3 text-center !text-gold-soft">О компании</p>
          <h2 className="mx-auto max-w-md text-center font-display text-[clamp(1.15rem,6vw,1.55rem)] font-bold leading-tight tracking-tight">
            <span className="block">Это не просто компания.</span>
            <span className="block whitespace-nowrap text-gold-soft">Это наша экосистема.</span>
          </h2>
        </Reveal>

        <Reveal
          className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
          y={36}
        >
          <Image
            src={BASE + "/images/company.jpg"}
            alt="Производство GreenLeaf — современные линии и натуральные ингредиенты"
            fill
            loading="lazy"
            sizes="92vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent"
            aria-hidden="true"
          />
        </Reveal>

        {/* Три карточки экосистемы — в ряд, появляются один раз при подходе к ним */}
        <Reveal className="mt-7 grid grid-cols-3 gap-2" staggerChildren={0.1} y={24}>
          {LAYERS.map((L) => (
            <MobileCard key={L.n} L={L} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}

/** Цифры компании — общий блок для мобильной и десктопной версий */
function CompanyStats() {
  return (
    <div className="bg-forest py-16 text-cream md:py-20">
      <div className="container-site">
        <Reveal
          className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-4"
          staggerChildren={0.12}
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={revealItem}>
              {s.plain ? (
                <span className="font-display text-4xl font-extrabold tracking-tight text-gold-soft md:text-5xl">
                  {s.to}
                </span>
              ) : (
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  className="font-display text-4xl font-extrabold tracking-tight text-gold-soft md:text-5xl"
                />
              )}
              <p className="mt-2 text-sm text-cream/65">{s.label}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- Закреплённая версия с Exploded View ---------- */
function CompanyPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Центральный визуальный «продукт»
  const visScale = useTransform(p, [0, 0.25], [0.82, 1]);
  const visOpacity = useTransform(p, [0, 0.12, 0.92, 1], [0, 1, 1, 0.35]);
  // Расходящиеся кольца «взрыва»
  const ring1 = useTransform(p, [0.05, 0.55], [0.5, 1.35]);
  const ring1o = useTransform(p, [0.05, 0.55], [0.5, 0]);
  const ring2 = useTransform(p, [0.2, 0.75], [0.55, 1.4]);
  const ring2o = useTransform(p, [0.2, 0.75], [0.45, 0]);
  const ring3 = useTransform(p, [0.35, 0.95], [0.6, 1.45]);
  const ring3o = useTransform(p, [0.35, 0.95], [0.4, 0]);

  // Слои экосистемы раскрываются последовательно
  const l1 = useLayerActive(p, 0.2, 0.42);
  const l2 = useLayerActive(p, 0.44, 0.66);
  const l3 = useLayerActive(p, 0.68, 0.9);

  // Мобильные карточки появляются по очереди и остаются — в конце ряд из трёх

  // Вертикальный прогресс-рейл
  const railFill = useTransform(p, [0.08, 0.92], [0, 1]);

  return (
    <>
      <div ref={ref} className="relative h-[340vh] bg-forest-deep text-cream">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          {/* Фоновое свечение (на мобильных скрыто — дорогой blur) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 hidden size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl md:block"
            style={{ background: "radial-gradient(circle, rgba(143,174,148,0.4), transparent 65%)" }}
            aria-hidden="true"
          />

          <div className="container-site relative z-10 pt-16 md:pt-28">
            <p className="eyebrow mb-2 text-center !text-gold-soft md:mb-4">О компании</p>
            <h2 className="mx-auto max-w-3xl text-center font-display text-[1.4rem] font-bold leading-tight tracking-tight md:text-4xl">
              Это не просто компания.
              <span className="block text-gold-soft">Это наша экосистема.</span>
            </h2>
          </div>

          {/* Центральный визуал + кольца */}
          <div className="relative z-10 mt-2 flex flex-1 items-center justify-center md:mt-10">
            <motion.div
              style={{ scale: ring1, opacity: ring1o }}
              className="absolute hidden size-[19rem] rounded-full border border-gold/40 md:block md:size-[26rem]"
              aria-hidden="true"
            />
            <motion.div
              style={{ scale: ring2, opacity: ring2o }}
              className="absolute hidden size-[19rem] rounded-full border border-sage/30 md:block md:size-[26rem]"
              aria-hidden="true"
            />
            <motion.div
              style={{ scale: ring3, opacity: ring3o }}
              className="absolute hidden size-[19rem] rounded-full border border-cream/15 md:block md:size-[26rem]"
              aria-hidden="true"
            />
            <motion.div
              style={{ scale: visScale, opacity: visOpacity }}
              className="relative h-[19vh] w-[min(88vw,34rem)] overflow-hidden rounded-[1.4rem] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] will-change-transform md:h-[34vh] md:w-[min(60vw,44rem)] md:rounded-[1.6rem]"
            >
              <Image
                src={BASE + "/images/company.jpg"}
                alt="Производство GreenLeaf — современные линии и натуральные ингредиенты"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 88vw, 44rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Слои экосистемы: десктоп — ряд с подсветкой активного */}
          <div className="container-site relative z-10 hidden pb-10 md:block md:pb-14">
            <div className="grid gap-3 md:grid-cols-3 md:gap-6">
              {[
                { ...LAYERS[0], m: l1 },
                { ...LAYERS[1], m: l2 },
                { ...LAYERS[2], m: l3 },
              ].map((L) => (
                <motion.div
                  key={L.n}
                  style={{ opacity: L.m.opacity, y: L.m.y, scale: L.m.scale }}
                  className="rounded-2xl border border-cream/12 bg-cream/[0.045] p-6 backdrop-blur-sm will-change-transform"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                      <L.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-gold-soft/70">
                      {L.n}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold md:text-xl">{L.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{L.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Вертикальный прогресс-рейл */}
          <div className="absolute right-6 top-1/2 z-10 hidden h-40 -translate-y-1/2 lg:block" aria-hidden="true">
            <div className="relative h-full w-[2px] overflow-hidden rounded-full bg-cream/10">
              <motion.div
                style={{ scaleY: railFill }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-gold to-gold-soft"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Статичная версия (prefers-reduced-motion) ---------- */
function CompanyStatic() {
  return (
    <section id="company" aria-label="О компании">
      <div className="bg-forest-deep py-24 text-cream">
        <div className="container-site">
          <p className="eyebrow !text-gold-soft mb-4 text-center">О компании</p>
          <h2 className="display-2 mx-auto max-w-3xl text-center">
            Это не просто компания.{" "}
            <span className="text-gold-soft">Это наша экосистема.</span>
          </h2>
          <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-[1.6rem]">
            <Image
              src={BASE + "/images/company.jpg"}
              alt="Производство GreenLeaf"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 90vw, 48rem"
              className="object-cover"
            />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LAYERS.map((L) => (
              <div key={L.n} className="rounded-2xl border border-cream/12 bg-cream/[0.045] p-6">
                <L.icon className="size-6 text-gold-soft" aria-hidden="true" />
                <h3 className="mt-3 font-display text-xl font-bold">{L.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{L.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-forest py-16 text-cream">
        <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="font-display text-4xl font-extrabold text-gold-soft md:text-5xl">
                {s.plain ? s.to : `${s.to.toLocaleString("ru-RU")}${s.suffix}`}
              </span>
              <p className="mt-2 text-sm text-cream/65">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
