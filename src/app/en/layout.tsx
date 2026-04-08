import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libo/Libo - Podcasts that work for your brand",
  description:
    "Advertising in Libo/Libo podcasts and podcast production services - from idea and concept to launch on all major platforms.",
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    title: "Podcasts that work for your brand",
    description:
      "Advertising in Libo/Libo studio podcasts and podcast production - from idea to launch.",
    siteName: "Libo/Libo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/en/opengraph-image",
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
    images: ["/en/opengraph-image"],
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
