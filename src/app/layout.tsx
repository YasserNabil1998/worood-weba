import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/providers/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import SplashScreen from "@/components/shared/SplashScreen";
import AOSProvider from "@/components/common/AOSProvider";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structuredData";
import { generateHomeMetadata } from "@/lib/seo/generateMetadata";

export const metadata: Metadata = generateHomeMetadata();

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
        <Script id="organization-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationSchema)}
        </Script>
        {/* Website Structured Data */}
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
      </head>
      <body className="antialiased rtl" suppressHydrationWarning>
        <SplashScreen />
        <AOSProvider />
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
