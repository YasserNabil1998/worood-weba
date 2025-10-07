"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Loader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        // إضافة مستمعي الأحداث للتنقل
        window.addEventListener("beforeunload", handleStart);

        // إخفاء الـ loader بعد تحميل الصفحة
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            window.removeEventListener("beforeunload", handleStart);
            clearTimeout(timer);
        };
    }, [pathname]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner Animation */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[#5A5E4D]"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-[#5A5E4D] opacity-20"></div>
                </div>

                {/* Loading Text */}
                <div className="text-center">
                    <p
                        className="text-[#5A5E4D] font-medium text-lg"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        جاري التحميل...
                    </p>
                    <p
                        className="text-gray-500 text-sm mt-1"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        يرجى الانتظار
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#5A5E4D] to-[#8B9A7A] rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
