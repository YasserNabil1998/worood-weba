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
            category: "get-well",
        },
        {
            id: 3,
            title: "ألف مبروك",
            image: "/images/OccasionsSlider/OccasionsSlider-3.png",
            category: "congratulations",
        },
        {
            id: 4,
            title: "أحبك",
            image: "/images/OccasionsSlider/OccasionsSlider-4.png",
            category: "love",
        },
        {
            id: 5,
            title: "تهنئة بالمولود",
            image: "/images/OccasionsSlider/OccasionsSlider-6.png",
            category: "new-baby",
        },
        {
            id: 6,
            title: "عيد ميلاد سعيد",
            image: "/images/OccasionsSlider/OccasionsSlider-6.png",
            category: "birthday",
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev >= occasions.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? occasions.length - 1 : prev - 1
        );
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    // Get visible occasions (6 items for desktop, loop around)
    const getVisibleOccasions = () => {
        const visible = [];
        for (let i = 0; i < 6; i++) {
            const index = (currentIndex + i) % occasions.length;
            visible.push(occasions[index]);
        }
        return visible;
    };

    return (
        <section className="py-12">
            <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
                <div className="text-right mb-8">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#1B5B52]"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        هدايا لكل لحظة
                    </h2>
                </div>

                <div className="relative">
                    {/* Occasions Container */}
                    <div className="overflow-hidden px-12">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                            {getVisibleOccasions().map((occasion, idx) => (
                                <Link
                                    key={`${occasion.id}-${idx}`}
                                    href={`/occasions/${occasion.category}`}
                                    className="w-full block group cursor-pointer"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-full aspect-square bg-[#F5F1E8] rounded-full overflow-hidden hover:shadow-lg transition-all duration-300 mb-3">
                                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                                <img
                                                    src={occasion.image}
                                                    alt={occasion.title}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>
                                        <h3
                                            className="text-sm md:text-base font-medium text-gray-800 text-center"
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                        aria-label="Previous"
                    >
                        <svg
                            className="w-5 h-5"
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
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                        aria-label="Next"
                    >
                        <svg
                            className="w-5 h-5"
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
