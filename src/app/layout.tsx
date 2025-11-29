import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "../providers/providers";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ErrorBoundary from "../components/common/ErrorBoundary";
import SplashScreen from "../components/SplashScreen";
import { generateOrganizationSchema, generateWebsiteSchema } from "../lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "زهور الشمس - أجمل الباقات لأجمل المناسبات",
  description:
    "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات. خدمة تنسيق الزهور بأعلى جودة وأفضل الأسعار.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Organization Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        {/* Website Structured Data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased rtl`}
        suppressHydrationWarning
      >
      <SplashScreen />
        <ErrorBoundary>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
