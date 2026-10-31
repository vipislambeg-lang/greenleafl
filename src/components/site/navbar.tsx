"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "О партнёре" },
  { href: "#company", label: "Компания" },
  { href: "#kits", label: "Наборы" },
  { href: "#benefits", label: "Преимущества" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav border-b border-border/70 py-3 shadow-[0_8px_30px_-18px_rgba(36,56,44,0.35)]" : "bg-transparent py-5"
      )}
    >
      <div className="container-site flex items-center justify-between">
        <a href="#" className="group flex items-center gap-2.5" aria-label="GreenLeaf — на главную">
          <span className="flex size-9 items-center justify-center rounded-full bg-forest text-cream transition-transform duration-200 group-hover:scale-105">
            <Leaf className="size-4.5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            GreenLeaf
            <span className="ml-2 hidden rounded-full border border-gold/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold sm:inline">
              партнёр
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm font-semibold text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-sheen inline-flex h-10 items-center rounded-full bg-forest px-5 font-display text-sm font-bold text-cream hover:bg-primary"
          >
            Связаться
          </a>
        </nav>

        <button
          className="flex size-10 items-center justify-center rounded-full border border-border bg-ivory/70 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Тонкий золотой прогресс-бар */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold to-gold-soft"
        aria-hidden="true"
      />

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav absolute inset-x-0 top-full border-b border-border/70 md:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-display text-base font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-cream"
              >
                Связаться
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
