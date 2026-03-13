import type { Metadata } from "next";
import "@/config/styles/globals.css";
import { geistSans, geistMono } from "@/config/fonts/font";

export const metadata: Metadata = {
  title: "Pokemon Library",
  description: "Pokemon Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
