import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const futura = localFont({
  src: [
    {
      path: "../../public/fonts/FuturaLightC.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FuturaBookC.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FuturaMediumC.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FuturaDemiC.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://business.libolibo.me"),
  title: "Либо/Либо — подкасты для брендов",
  description:
    "Реклама в подкастах студии Либо/Либо и продакшен подкастов: от идеи и концепции до публикации на платформах.",
  alternates: {
    canonical: "/",
    languages: {
      ru: "/",
      en: "/en",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Подкасты, которые работают на ваш бренд",
    description:
      "Реклама в подкастах Либо/Либо и продакшен: берём на себя всё от идеи и сценария до публикации.",
    siteName: "Либо/Либо",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Либо/Либо — подкасты для брендов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подкасты, которые работают на ваш бренд",
    description:
      "Реклама в подкастах Либо/Либо и продакшен: от задумки до публикации на платформах.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={futura.className}>
        {children}
      </body>
    </html>
  );
}
