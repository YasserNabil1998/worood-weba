"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Occasion {
    id: number;
    title: string;
    image: string;
    category: string;
}

const OccasionsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(2);

    // Get number of visible items based on screen size
    const getVisibleCount = () => {
        if (typeof window === "undefined") return 2;
        const width = window.innerWidth;
        if (width < 640) return 2; // mobile
        if (width < 1024) return 3; // tablet
        return 6; // desktop
    };

    useEffect(() => {
        const updateVisibleCount = () => {
            setVisibleCount(getVisibleCount());
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const occasions: Occasion[] = [
        {
            id: 1,
            title: "مبروك التخرج",
            image: "/images/OccasionsSlider/OccasionsSlider-1.png",
            category: "graduation",
        },
        {
            id: 2,
            title: "تمنيات بالشفاء",
            image: "/images/OccasionsSlider/OccasionsSlider-2.png",
            category: "getwell",
        },
        {
            id: 3,
            title: "باقات الزفاف",
            image: "/images/OccasionsSlider/OccasionsSlider-3.png",
            category: "wedding",
        },
        {
            id: 4,
            title: "خطوبة",
            image: "/images/OccasionsSlider/OccasionsSlider-4.png",
            category: "engagement",
        },
        {
            id: 5,
            title: "تهنئة بالمولود",
            image: "/images/OccasionsSlider/OccasionsSlider-6.png",
            category: "newborn",
        },
        {
            id: 6,
            title: "ذكرى سنوية",
            image: "/images/OccasionsSlider/OccasionsSlider-6.png",
            category: "anniversary",
        },
        {
            id: 7,
            title: "شكر وتقدير",
            image: "/images/OccasionsSlider/OccasionsSlider-1.png",
            category: "thanks",
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev >= occasions.length - visibleCount ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? occasions.length - visibleCount : prev - 1
        );
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    // Get visible occasions based on screen size
    const getVisibleOccasions = () => {
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % occasions.length;
            visible.push(occasions[index]);
        }
        return visible;
    };

    return (
        <section className="py-10 sm:py-12">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1B5B52]"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        هدايا لكل لحظة
                    </h2>
                    <Link
                        href="/occasions"
                        className="text-sm text-[#5A5E4D] hover:text-[#4A4E3D] font-medium flex items-center gap-2"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        <span>عرض الكل</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="relative">
                    {/* Occasions Container */}
                    <div className="overflow-hidden px-4 sm:px-8 md:px-12">
                        <div
                            className={`grid gap-3 sm:gap-4 md:gap-6 ${
                                visibleCount === 2
                                    ? "grid-cols-2"
                                    : visibleCount === 3
                                    ? "grid-cols-2 sm:grid-cols-3"
                                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                            }`}
                        >
                            {getVisibleOccasions().map((occasion, idx) => (
                                <Link
                                    key={`${occasion.id}-${idx}`}
                                    href={`/occasions/${occasion.category}`}
                                    className="w-full block group cursor-pointer"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-full aspect-square bg-[#F5F1E8] rounded-full overflow-hidden hover:shadow-lg hover:shadow-[#5A5E4D]/20 transition-all duration-300 mb-3 group-hover:bg-[#F0EDE5]">
                                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                                <img
                                                    src={occasion.image}
                                                    alt={occasion.title}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-[#5A5E4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                                        </div>
                                        <h3
                                            className="text-sm md:text-base font-medium text-gray-800 text-center group-hover:text-[#5A5E4D] transition-colors duration-200"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {occasion.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white hover:bg-[#5A5E4D] text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                        aria-label="Previous"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white hover:bg-[#5A5E4D] text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                        aria-label="Next"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                                
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OccasionsSlider;
