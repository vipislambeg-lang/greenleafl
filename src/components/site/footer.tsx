import { Leaf } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { TelegramIcon } from "./telegram-icon";
import { InstagramIcon } from "./instagram-icon";

const NAV = [
  { href: "#about", label: "О партнёре" },
  { href: "#company", label: "Компания" },
  { href: "#kits", label: "Наборы" },
  { href: "#benefits", label: "Преимущества" },
  { href: "#contact", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cream/10 bg-forest-deep py-10 text-cream/70">
      <div className="container-site flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-cream/10 text-gold-soft">
            <Leaf className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-base font-bold text-cream">GreenLeaf</p>
            <p className="text-xs text-cream/55">Магомедбег Хирамагомедов · Махачкала</p>
          </div>
        </div>

        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm transition-colors duration-200 hover:text-gold-soft"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/message/655DK7EF4KWRD1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-cream/25 px-6 font-display text-sm font-semibold text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
          <a
            href="https://t.me/+yD0sFVNgJpozNTcy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
          >
            <TelegramIcon className="size-4.5" />
          </a>
          <a
            href={"https://www.instagram.com/muhammadbeg11?srtk=MWM3end1cnR4dHJ5MA%3D%3D&utm_source=qr"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-200 hover:border-cream/60 hover:bg-cream/10"
          >
            <InstagramIcon className="size-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
