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
  title: "Либо/Либо — подкасты для брендов",
  description:
    "Реклама в подкастах студии Либо/Либо и продакшен подкастов: от идеи и концепции до публикации на платформах.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
