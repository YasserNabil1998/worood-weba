"use client";

import React from "react";

interface DataLoaderProps {
    isLoading: boolean;
    loadingText?: string;
    children: React.ReactNode;
}

const DataLoader = ({
    isLoading,
    loadingText = "جاري التحميل...",
    children,
}: DataLoaderProps) => {
    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
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
                            {loadingText}
                        </p>
                        <p
                            className="text-gray-500 text-sm mt-1"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            يرجى الانتظار
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataLoader;
