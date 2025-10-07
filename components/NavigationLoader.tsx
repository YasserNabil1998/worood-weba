"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavigationLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("جاري التحميل...");
    const pathname = usePathname();

    useEffect(() => {
        // إظهار الـ loader عند تغيير المسار
        setIsLoading(true);

        // إخفاء الـ loader بعد تحميل الصفحة
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [pathname]);

    // إضافة مستمعي الأحداث للنقر على الروابط
    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a[href]");

            if (link && link.getAttribute("href")?.startsWith("/")) {
                setIsLoading(true);
                setLoadingText("جاري التحميل...");
            }
        };

        document.addEventListener("click", handleLinkClick);

        return () => {
            document.removeEventListener("click", handleLinkClick);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5A5E4D] mx-auto"></div>
                <p
                    className="mt-6 text-gray-600 text-lg"
                    style={{ fontFamily: "var(--font-almarai)" }}
                >
                    {loadingText}
                </p>
            </div>
        </div>
    );
};

export default NavigationLoader;
