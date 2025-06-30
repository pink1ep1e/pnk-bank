import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const gtEsti = localFont({
  src: [
    {
      path: './fonts/gteestiprodisplay_regular.otf',
      weight: '500',
      style: 'regular',
    },
    {
      path: './fonts/gteestiprodisplay_medium.otf',
      weight: '600',
      style: 'medium',
    },
    {
      path: './fonts/gteestiprodisplay_bold.otf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-gt-esti'
})

export const metadata: Metadata = {
  title: "pnk банк - Онлайн-банк, переводы алмазов без комиссий",
  description: "pnk банк — ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
  keywords: [
    "minecraft банк", 
    "оплата алмазами", 
    "переводы в minecraft", 
    "финансовые услуги в minecraft", 
    "pnk банк", 
    "пнк банк",
    "маинкрафт банк",
    "пнк банк маинкрафт",
    "pnk банк маинкрафт",
    "игровая валюта", 
    "алмазы в minecraft",
    "экономика minecraft", 
    "банк для minecraft", 
    "игровые финансы", 
    "алмазная валюта", 
    "внутриигровые переводы", 
    "безопасные платежи в minecraft", 
    "игровая экономика", 
    "minecraft алмазы", 
    "финансовые операции в minecraft", 
    "игровые транзакции", 
    "minecraft валюта", 
    "игровые банковские услуги", 
    "minecraft платежи"
  ],
  openGraph: {
    title: "pnk банк - Онлайн-банк, переводы алмазов без комиссий",
    description: "pnk банк — ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
    type: "website",
    url: "https://pnk-bank.com",
    images: [
      {
        url: "https://pnk-bank.com/og-image-minecraft.png",
        width: 1200,
        height: 630,
        alt: "pnk банк - Minecraft банк",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pnk банк - Minecraft банк, оплата алмазами",
    description: "pnk банк — ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
    images: ["https://pnk-bank.com/og-image-minecraft.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gtEsti.className}>
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}