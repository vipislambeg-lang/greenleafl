# GreenLeaf — сайт официального партнёра (Махачкала)

Одностраничный сайт партнёра GreenLeaf — Магомедбега Хирамагомедова.
Дизайн: «гиперинтерактивный минимализм» в стиле Apple с тёплой натуральной палитрой
(тёмная зелень `#24382c` · золото `#b9964f` · кремовый `#faf7f1`).

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — дизайн-токены в `src/app/globals.css`
- **framer-motion** — все анимации (пин-скролл, параллакс, reveal)
- **shadcn/ui** — UI-компоненты (`src/components/ui/`)
- **Prisma + SQLite** — заготовка БД (сайтом не используется)
- Сайт собирается в **статический экспорт** (папка `out/`) — работает на GitHub Pages и Netlify (`netlify.toml` настроен)

## Структура сайта

| Секция | Файл |
|---|---|
| Шапка (меню, прогресс-бар) | `src/components/site/navbar.tsx` |
| Первый экран | `src/components/site/hero.tsx` |
| О партнёре | `src/components/site/about.tsx` |
| О компании (экосистема) | `src/components/site/company.tsx` |
| Стартовые наборы | `src/components/site/kits.tsx` |
| Преимущества | `src/components/site/benefits.tsx` |
| Контакты (WhatsApp/Telegram/Instagram) | `src/components/site/cta.tsx` |
| Подвал | `src/components/site/footer.tsx` |
| SEO-метаданные | `src/app/layout.tsx` |

## Запуск локально

```bash
bun install
bun run dev        # http://localhost:3000
```

## Деплой на GitHub Pages (через GitHub Desktop)

1. Распаковать архив проекта в любую папку на компьютере
2. GitHub Desktop → File → **Add local repository** → выбрать папку
   (если папка ещё не репозиторий — нажать **Create a Repository** и задать имя, например `green12`)
3. Нажать **Publish repository** (галочку «Keep this code private» можно снять — иначе Pages на бесплатном тарифе не включится)
4. Открыть репозиторий на github.com → **Settings → Pages → Build and deployment → Source: GitHub Actions**
5. Подождать 1–2 минуты: вкладка **Actions** покажет зелёную галочку
6. Сайт откроется по адресу `https://<логин>.github.io/<имя-репозитория>/`

При каждом новом push в `main` сайт пересобирается и обновляется автоматически
(workflow `.github/workflows/deploy.yml`).

Базовый путь сайта подставляется **автоматически из имени репозитория** —
при переименовании или создании репо с другим именем ничего менять не нужно.

## Контакты на сайте

- WhatsApp: `https://wa.me/message/655DK7EF4KWRD1`
- Telegram: `https://t.me/+yD0sFVNgJpozNTcy`
- Instagram: `instagram.com/muhammadbeg11`
- Сервисный центр: Махачкала, ул. Имама Шамиля, 86 А.
