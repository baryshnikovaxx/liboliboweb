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
  title: "Libo/Libo - Podcasts that work for your brand",
  description:
    "Advertising in Libo/Libo podcasts and podcast production services - from idea and concept to launch on all major platforms.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Podcasts that work for your brand",
    description:
      "Advertising in Libo/Libo studio podcasts and podcast production - from idea to launch.",
    siteName: "Либо/Либо",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Libo/Libo - Podcasts that work for your brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcasts that work for your brand",
    description:
      "Advertising in Libo/Libo podcasts and podcast production - from idea to launch.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={futura.className}>
        {children}
      </body>
    </html>
  );
}
