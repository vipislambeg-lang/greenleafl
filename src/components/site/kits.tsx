"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BASE } from "@/lib/basepath";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { ArrowRight, Check, MousePointer2 } from "lucide-react";
import { Reveal, revealItem } from "./reveal";
import { cn } from "@/lib/utils";

type Kit = {
  id: string;
  name: string;
  chip: string;
  tagline: string;
  story: string;
  items: string[];
  img: string;
  alt: string;
  accent: string;
  glow: string;
};

const KITS: Kit[] = [
  {
    id: "beige",
    name: "Набор «Бежевый»",
    chip: "Уход и дом",
    tagline: "Качественный уход и чистота дома.",
    story:
      "Базовый набор для тех, кто ценит качественный уход и чистоту дома. Подходит для старта и ежедневного использования.",
    items: [
      "Уход за лицом Sealuxe (4 предмета)",
      "Жидкое средство для стирки iLife, 1 кг",
      "Средство для мытья посуды iLife, 1 кг",
      "Бамбуковые салфетки для лица Carich",
      "Прокладки iLife, 10 шт.",
      "Зубная паста iLife с водорослями",
    ],
    img: BASE + "/images/kit-beige.jpg",
    alt: "Стартовый набор «Бежевый» — уход за лицом Sealuxe и средства для дома iLife",
    accent: "#b9964f",
    glow: "rgba(217,192,141,0.35)",
  },
  {
    id: "stakan",
    name: "Набор «Стакан»",
    chip: "Здоровье семьи",
    tagline: "Структурированная вода для всей семьи.",
    story:
      "Набор для здоровья и ежедневной гигиены всей семьи. В основе — стакан-ионизатор для структурированной воды.",
    items: [
      "Стакан-ионизатор Kardli (подарочная коробка)",
      "Три зубные щётки Carich",
      "Бумажные полотенца с сотовой текстурой",
      "Шампунь Greenleaf Refreshing Shampoo",
      "Зубная паста iLife (3 упаковки)",
      "Ночные прокладки iLife, 8 шт.",
    ],
    img: BASE + "/images/kit-stakan.jpg",
    alt: "Стартовый набор «Стакан» — стакан-ионизатор Kardli и средства гигиены для всей семьи",
    accent: "#5f9ea8",
    glow: "rgba(95,158,168,0.3)",
  },
  {
    id: "violet",
    name: "Набор «Фиолетовый»",
    chip: "Премиум-уход",
    tagline: "Антивозрастной уход премиум-класса.",
    story:
      "Премиальный антивозрастной набор на ферментированных дрожжах бифида + товары для дома.",
    items: [
      "Антивозрастной уход Bifida Yeast (4 флакона)",
      "Три крема и три тюбика (мини-формат)",
      "Бамбуковые салфетки для лица",
      "Зубная паста iLife с водорослями",
      "Прокладки iLife, 10 шт.",
      "Средства для стирки и посуды iLife",
    ],
    img: BASE + "/images/kit-violet.jpg",
    alt: "Стартовый набор «Фиолетовый» — антивозрастной уход Bifida Yeast и товары для дома",
    accent: "#9b7fc7",
    glow: "rgba(155,127,199,0.3)",
  },
];

export function Kits() {
  const reduce = useReducedMotion();
  return (
    <section id="kits" aria-label="Стартовые наборы" className="bg-cream">
      {reduce ? (
        <KitsStatic />
      ) : (
        <>
          {/* Мобильные: нативный слайдер со snap — один свап = один набор, нулевой JS-хиджекинг */}
          <div className="md:hidden">
            <KitsSwipe />
          </div>
          {/* Десктоп: закреплённая секция с прокруткой-историей */}
          <div className="hidden md:block">
            <KitsPinned />
          </div>
        </>
      )}
    </section>
  );}

/* ---------- Мобильный слайдер: нативный горизонтальный snap-скролл ---------- */
function KitsSwipe() {
  const trackRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el || el.clientWidth === 0) return;
      const i = Math.min(
        KITS.length - 1,
        Math.max(0, Math.round(el.scrollLeft / el.clientWidth))
      );
      setActive((prev) => (prev === i ? prev : i));
    });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-[100svh] flex-col justify-center pt-[4.5rem] pb-8">
      <div className="container-site flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-2.5">Стартовые наборы</p>
          <h2 className="font-display text-[1.45rem] font-bold leading-tight tracking-tight">
            Выберите свой первый шаг
          </h2>
        </div>
        <span className="shrink-0 font-display text-sm font-bold tabular-nums text-foreground/70">
          0{active + 1} <span className="text-muted-foreground">/ 0{KITS.length}</span>
        </span>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="snap-track no-scrollbar mt-4 flex overflow-x-auto"
        aria-label="Стартовые наборы — листайте в сторону"
      >
        {KITS.map((kit, i) => (
          <div
            key={kit.id}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${i + 1} из ${KITS.length}: ${kit.name}`}
            className="w-full shrink-0"
          >
            <SlideMobile kit={kit} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3" role="tablist" aria-label="Наборы">
        {KITS.map((kit, i) => (
          <button
            key={kit.id}
            role="tab"
            aria-selected={i === active}
            aria-label={kit.name}
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-10 bg-forest" : "w-2 bg-foreground/20"
            )}
            style={i === active ? { background: kit.accent } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function SlideMobile({ kit }: { kit: Kit }) {
  return (
    <article className="flex h-full flex-col px-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] shadow-[0_30px_50px_-30px_rgba(24,35,28,0.45)]">
        <Image
          src={kit.img}
          alt={kit.alt}
          fill
          loading="lazy"
          sizes="92vw"
          className="object-cover"
        />
      </div>

      <span
        className="mt-3.5 inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ borderColor: kit.accent, color: kit.accent }}
      >
        {kit.chip}
      </span>

      <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-foreground">
        {kit.name}
      </h3>
      <p className="mt-1 font-display text-sm font-semibold text-forest">{kit.tagline}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{kit.story}</p>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Состав набора
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {kit.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[12.5px] leading-snug text-foreground/85">
            <span
              className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${kit.accent}22`, color: kit.accent }}
            >
              <Check className="size-2.5" aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="btn-sheen mt-3.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-forest px-6 font-display text-sm font-bold text-cream hover:bg-primary"
      >
        Хочу этот набор
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  );
}

/* ---------- Полноэкранный слайдер с управлением скроллом ---------- */
function KitsPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Dwell-механика: слайд стоит для чтения, затем плавный переход к следующему
  const x = useTransform(
    p,
    [0.02, 0.3, 0.5, 0.78, 0.98],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6667%"]
  );
  const [active, setActive] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    const i = v < 0.4 ? 0 : v < 0.9 ? 1 : 2;
    setActive(i);
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop;
    const travel = el.offsetHeight - window.innerHeight;
    const pTarget = 0.02 + (i / (KITS.length - 1)) * 0.96;
    window.scrollTo({ top: top + pTarget * travel, behavior: "smooth" });
  };

  return (
    <>
      <div ref={ref} className="relative h-[320vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-cream">
          <div className="container-site flex h-full flex-col justify-center pt-20 pb-8 md:pt-24">
            {/* Заголовок секции */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">Стартовые наборы</p>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
                  Выберите свой первый шаг
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MousePointer2 className="size-4" aria-hidden="true" />
                <span className="hidden md:inline">Прокручивайте — наборы сменяют друг друга</span>
                <span className="font-display text-sm font-bold tabular-nums text-foreground">
                  0{active + 1} <span className="text-muted-foreground">/ 0{KITS.length}</span>
                </span>
              </div>
            </div>

            {/* Горизонтальный трек слайдов (в % от контейнера — без учёта скроллбара) */}
            <motion.div style={{ x }} className="mt-4 flex w-[300%] will-change-transform md:mt-10">
              {KITS.map((kit, i) => (
                <Slide key={kit.id} kit={kit} active={i === active} index={i} />
              ))}
            </motion.div>

            {/* Точки-навигация */}
            <div className="mt-8 flex items-center justify-center gap-3 md:mt-10" role="tablist" aria-label="Наборы">
              {KITS.map((kit, i) => (
                <button
                  key={kit.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={kit.name}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-10 bg-forest" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  )}
                  style={i === active ? { background: kit.accent } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const slideVariants: Variants = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  hide: { transition: { staggerChildren: 0, staggerDirection: -1 } },
};

const slideItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Slide({ kit, active, index }: { kit: Kit; active: boolean; index: number }) {
  return (
    <article className="flex w-[33.3334%] shrink-0 items-center justify-center px-5 md:px-10" aria-hidden={!active && undefined}>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={active ? "show" : "hide"}
        className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2 md:gap-14"
      >
        {/* Фото продукта */}
        <motion.div
          variants={slideItem}
          className={cn("relative order-1", index % 2 === 1 && "md:order-2")}
        >
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] blur-2xl"
            style={{ background: kit.glow }}
            aria-hidden="true"
          />
          <div className="micro-lift relative aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_40px_70px_-35px_rgba(24,35,28,0.45)] md:aspect-square md:rounded-[1.8rem]">
            <Image
              src={kit.img}
              alt={kit.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 92vw, 40rem"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Текст слайда */}
        <div className={cn("order-2", index % 2 === 1 && "md:order-1")}>
          <motion.span
            variants={slideItem}
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ borderColor: kit.accent, color: kit.accent }}
          >
            {kit.chip}
          </motion.span>

          <motion.h3
            variants={slideItem}
            className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.6rem] lg:leading-[1.1]"
          >
            {kit.name}
          </motion.h3>

          <motion.p variants={slideItem} className="mt-2 font-display text-base font-semibold text-forest md:mt-3 md:text-xl">
            {kit.tagline}
          </motion.p>
          <motion.p variants={slideItem} className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
            {kit.story}
          </motion.p>

          <motion.p
            variants={slideItem}
            className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Состав набора
          </motion.p>
          <motion.ul variants={slideItem} className="mt-2 space-y-2 md:space-y-2.5">
            {kit.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-foreground/85 md:text-sm">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${kit.accent}22`, color: kit.accent }}
                >
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.a
            variants={slideItem}
            href="#contact"
            className="btn-sheen mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-forest px-6 font-display text-sm font-bold text-cream hover:bg-primary md:mt-8 md:h-12 md:px-7"
          >
            Хочу этот набор
            <ArrowRight className="size-4" aria-hidden="true" />
          </motion.a>
        </div>
      </motion.div>
    </article>
  );
}

/* ---------- Статичная сетка (prefers-reduced-motion) ---------- */
function KitsStatic() {
  return (
    <div aria-label="Стартовые наборы" className="py-24">
      <div className="container-site">
        <p className="eyebrow mb-3">Стартовые наборы</p>
        <h2 className="display-2 max-w-2xl text-foreground">Выберите свой первый шаг</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {KITS.map((kit) => (
            <Reveal key={kit.id} className="flex">
              <div className="micro-lift flex flex-col rounded-2xl border border-border bg-ivory p-6">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-xl">
                  <Image src={kit.img} alt={kit.alt} fill loading="lazy" sizes="30rem" className="object-cover" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: kit.accent }}>
                  {kit.chip}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{kit.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{kit.story}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-cream"
                >
                  Хочу этот набор
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
