import type React from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import MainProvider from "./providers/main-provider/mainProvider";

export const metadata: Metadata = {
  title: "Alex Johnson - Frontend Developer Portfolio",
  description:
    "A personal portfolio showcasing the work and skills of Alex Johnson, a passionate frontend developer.",
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
