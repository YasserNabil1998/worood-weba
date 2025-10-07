"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/images/hero/DIV-12.png",
            title: "لأجمل لحظات الحياة",
            buttons: [
                {
                    text: "تنسيق باقة خاصة",
                    href: "/custom",
                    type: "secondary", // أبيض
                },
                {
                    text: "تصفح الباقات",
                    href: "/bouquets",
                    type: "primary", // أخضر
                },
            ],
        },
        {
            image: "/images/hero/DIV-13.png",
            title: "زهور تفوق الخيال",
            buttons: [
                {
                    text: "تنسيق باقة خاصة",
                    href: "/custom",
                    type: "secondary",
                },
                {
                    text: "تصفح الباقات",
                    href: "/bouquets",
                    type: "primary",
                },
            ],
        },
        {
            image: "/images/hero/DIV-14.png",
            title: "يوم القهوة... يوم البهجة",
            buttons: [
                {
                    text: "اطلب الآن",
                    href: "/occasions/coffee-day",
                    type: "secondary",
                },
                {
                    text: "شاهد العروض",
                    href: "/bouquets?category=coffee",
                    type: "primary",
                },
            ],
        },
        {
            image: "/images/hero/DIV-15.png",
            title: "للحبايب في يوم زفافهم",
            buttons: [
                {
                    text: "باقات الزفاف",
                    href: "/occasions/wedding",
                    type: "secondary",
                },
                {
                    text: "تنسيق خاص",
                    href: "/custom?occasion=wedding",
                    type: "primary",
                },
            ],
        },
    ];

    // Auto slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="">
            <div className="w-full">
                <div className="relative h-[400px] sm:h-[450px] md:h-[520px] lg:h-[560px] xl:h-[600px] overflow-hidden">
                    {/* Slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                index === currentSlide
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            {/* Background Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/25 to-transparent"></div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                                    <div className="mr-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                                        <h1
                                            className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] xl:text-[70px] font-bold text-white mb-4 sm:mb-5 leading-[1.1] sm:leading-[1.2] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-right"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {slide.title}
                                        </h1>
                                        <div className="flex flex-col sm:flex-row justify-start gap-2 sm:gap-3">
                                            {slide.buttons
                                                .sort((a, b) => {
                                                    // ترتيب الأزرار: primary أولاً (على اليمين)
                                                    if (
                                                        a.type === "primary" &&
                                                        b.type === "secondary"
                                                    )
                                                        return -1;
                                                    if (
                                                        a.type ===
                                                            "secondary" &&
                                                        b.type === "primary"
                                                    )
                                                        return 1;
                                                    return 0;
                                                })
                                                .map((button, buttonIndex) => (
                                                    <Link
                                                        key={buttonIndex}
                                                        href={button.href}
                                                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-[12px] sm:text-[13px] md:text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl min-w-[120px] sm:min-w-[140px] text-center ${
                                                            button.type ===
                                                            "primary"
                                                                ? "bg-[#5A5E4D] text-white hover:bg-[#4b5244]"
                                                                : "bg-white text-gray-800 hover:bg-gray-100"
                                                        }`}
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        {button.text}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Dots Navigation */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                                    index === currentSlide
                                        ? "bg-white w-6 sm:w-8"
                                        : "bg-white/60 w-1.5 sm:w-2 hover:bg-white/80"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows - Hidden on mobile */}
                    <button
                        onClick={() =>
                            setCurrentSlide(
                                (prev) =>
                                    (prev - 1 + slides.length) % slides.length
                            )
                        }
                        className="hidden sm:block absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300"
                        aria-label="Previous slide"
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
                        onClick={() =>
                            setCurrentSlide(
                                (prev) => (prev + 1) % slides.length
                            )
                        }
                        className="hidden sm:block absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300"
                        aria-label="Next slide"
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

export default HeroSection;
