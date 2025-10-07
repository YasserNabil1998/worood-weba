import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "../components/NotificationSystem";
import NavigationWrapper from "../components/NavigationWrapper";

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
    return (
        <html lang="ar" dir="rtl">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased rtl`}
                suppressHydrationWarning
            >
                <NotificationProvider>
                    <NavigationWrapper>{children}</NavigationWrapper>
                </NotificationProvider>
            </body>
        </html>
    );
}
