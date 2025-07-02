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
  description: "Ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/favicon-256x256.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/favicon/favicon.svg",
        color: "#5bbad5",
      },
    ],
  },
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
    description: "Ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
    type: "website",
    url: "https://pnk-bank.vercel.app/",
    images: [
      {
        url: "https://pnk-bank.vercel.app/twitter-icon.png",
        width: 1200,
        height: 630,
        alt: "pnk банк - Онлайн-банк, переводы алмазов без комиссий",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pnk банк - Онлайн-банк, переводы алмазов без комиссий",
    description: "Ваш надежный партнер в мире Minecraft. Удобные переводы, оплата алмазами и безопасные финансовые операции в игре.",
    images: ["https://pnk-bank.vercel.app/twitter-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Основная иконка --> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* <!-- Дополнительные форматы --> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        
        {/* <!-- Для Apple устройств --> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-pnk-bank-rounded.png"/>
        
        {/* <!-- Manifest --> */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={gtEsti.className} style={{ marginRight: "0px !important" }}>
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}