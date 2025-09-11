import type { Metadata } from "next";
import { Geist, Geist_Mono, Almarai } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "زهور الشمس - أجمل الباقات لأجمل المناسبات",
  description: "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات. خدمة تنسيق الزهور بأعلى جودة وأفضل الأسعار.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${almarai.variable} antialiased rtl`}
      >
        {children}
      </body>
    </html>
  );
}
