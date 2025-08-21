import type React from "react";
import type { Metadata } from "next";
import { Work_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Weathering - Weather App",
  description:
    "Weather app showing day and night weather conditions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${openSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
