import type { NextConfig } from "next";

// Netlify сам выставляет переменную NETLIFY=true при сборке.
const ON_NETLIFY = process.env.NETLIFY === "true";

// Базовый путь сайта:
//  - на Netlify сайт живёт в корне домена → пустая строка;
//  - на GitHub Pages сайт живёт в подпапке /имя-репозитория.
// Имя репозитория подставляет GitHub Actions через NEXT_PUBLIC_BASE_PATH,
// поэтому при смене имени репозитория ничего править не нужно.
const BASE = ON_NETLIFY ? "" : process.env.NEXT_PUBLIC_BASE_PATH || "/green12";

const nextConfig: NextConfig = {
  // Статический экспорт — хостинг отдаёт готовые HTML/CSS/JS файлы
  output: "export",
  // Подпапка GitHub Pages строится автоматически (на Netlify — пусто)
  basePath: BASE,
  // Нет сервера оптимизации картинок — отдаём оригиналы как есть
  images: { unoptimized: true },
  // Прокидываем итоговый путь в клиентский код (src/lib/basepath.ts)
  env: { NEXT_PUBLIC_BASE_PATH: BASE },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
