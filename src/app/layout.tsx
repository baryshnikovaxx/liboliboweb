import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
  metadataBase: new URL(siteUrl),
  title: "Реклама в подкастах Либо/Либо и продакшен",
  description: "Подкасты, которые работают на ваш бренд",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Реклама в подкастах Либо/Либо и продакшен",
    description: "Подкасты, которые работают на ваш бренд",
    siteName: "Либо/Либо",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Реклама в подкастах Либо/Либо и продакшен",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Реклама в подкастах Либо/Либо и продакшен",
    description: "Подкасты, которые работают на ваш бренд",
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
