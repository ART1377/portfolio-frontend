import type React from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import MainProvider from "./providers/main-provider/mainProvider";

export const metadata: Metadata = {
  title: "Alireza Tahavori - Frontend Developer | Portfolio",
  description:
    "Explore Alireza Tahavori’s portfolio showcasing frontend development projects, React apps, and UI/UX design work.",
  openGraph: {
    title: "Alireza Tahavori - Frontend Developer Portfolio",
    description:
      "Explore React projects, frontend apps, and UI/UX case studies.",
    url: "https://portfolio-frontend-vert-gamma.vercel.app/",
    siteName: "Alireza Tahavori Portfolio",
    images: [
      {
        url: "https://portfolio-frontend-vert-gamma.vercel.app/preview.png",
        width: 1200,
        height: 630,
        alt: "Alireza Tahavori Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alireza Tahavori - Frontend Developer Portfolio",
    description:
      "Frontend development portfolio showcasing React, Next.js, and UI design work.",
    images: ["https://portfolio-frontend-vert-gamma.vercel.app/preview.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
