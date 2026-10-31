import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenLeaf — Магомедбег Хирамагомедов | Официальный партнёр в Махачкале",
  description:
    "Природа. Технологии. Жизнь. Официальный партнёр GreenLeaf в Махачкале: стартовые наборы, личное сопровождение, скидка 50%.",
  keywords: [
    "GreenLeaf",
    "Гринлиф",
    "Махачкала",
    "партнёр",
    "стартовые наборы",
    "натуральная продукция",
    "бизнес",
  ],
  authors: [{ name: "Магомедбег Хирамагомедов" }],
  openGraph: {
    title: "GreenLeaf — начните своё дело с официальным партнёром",
    description:
      "Экосистема здоровья: производство, магазины и личное сопровождение. Ваш первый шаг к новому уровню жизни.",
    siteName: "GreenLeaf · Махачкала",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#24382c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
