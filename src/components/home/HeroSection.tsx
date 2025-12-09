"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INTERVALS } from "@/constants";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slides = [
    {
      image: "/assets/home/hero-home/hero-home.png",
      title: "لأجمل لحظات الحياة",
      description: "باقات مميزة صممت بعناية لتناسب جميع الأذواق والمناسبات الخاصة",
      buttons: [
        {
          text: "تنسيق باقة خاصة",
          href: ROUTES.CUSTOM,
          type: "secondary", // أبيض
        },
        {
          text: "تصفح الباقات",
          href: ROUTES.BOUQUETS,
          type: "primary", // أخضر
        },
      ],
    },
    {
      image: "/images/hero/DIV-12.png",
      title: "لأجمل لحظات الحياة",
      description: "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات",
      buttons: [
        {
          text: "اطلب الآن",
          href: ROUTES.CUSTOM,
          type: "secondary",
        },
        {
          text: "شاهد العروض",
          href: ROUTES.BOUQUETS,
          type: "primary",
        },
      ],
    },
    {
      image: "/images/hero/DIV-13.png",
      title: "زهور تفوق الخيال",
      description: "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات",
      buttons: [
        {
          text: "تنسيق باقة خاصة",
          href: ROUTES.CUSTOM,
          type: "secondary",
        },
        {
          text: "تصفح الباقات",
          href: ROUTES.BOUQUETS,
          type: "primary",
        },
      ],
    },
    {
      image: "/images/hero/DIV-14.png",
      title: "يوم القهوة... يوم البهجة",
      description: "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات",
      buttons: [
        {
          text: "تنسيق باقة خاصة",
          href: ROUTES.CUSTOM,
          type: "secondary",
        },
        {
          text: "تصفح الباقات",
          href: ROUTES.BOUQUETS,
          type: "primary",
        },
      ],
    },
  ];

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, INTERVALS.HERO_SLIDER);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Swipe gestures for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="relative">
      <div className="w-full">
        <div
          className="relative overflow-hidden h-[400px] sm:h-[500px] md:h-[566px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[1200ms] sm:duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={`object-cover transition-transform duration-[10000ms] sm:duration-[8000ms] ease-out ${
                  index === currentSlide ? "scale-110" : "scale-100"
                }`}
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={85}
              />

              {/* Dark Overlay - matching Figma rgba(35,35,35,0.4) */}
              <div className="absolute inset-0 bg-[rgba(35,35,35,0.4)]"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                  <div
                    className={`ml-auto max-w-full sm:max-w-[500px] md:max-w-[576px] text-right px-4 sm:px-6 md:px-8 transition-all duration-[1200ms] sm:duration-700 ease-out ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    {/* Title - matching Figma: 48px, Almarai Bold, white */}
                    <h1
                      className={`text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight sm:leading-[42px] md:leading-[48px] text-right transition-all duration-[1200ms] sm:duration-700 ease-out delay-100 ${
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{
                        fontFamily: "var(--font-almarai)",
                        textShadow:
                          "2px 2px 8px rgba(0, 0, 0, 0.5), 1px 1px 4px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Description - matching Figma: 20px, Almarai Regular, white */}
                    <p
                      className={`text-[16px] sm:text-[18px] md:text-[20px] text-white mb-6 sm:mb-7 md:mb-8 leading-relaxed sm:leading-[26px] md:leading-[28px] text-right transition-all duration-[1200ms] sm:duration-700 ease-out delay-200 ${
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{
                        fontFamily: "var(--font-almarai)",
                        textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div
                      className={`flex flex-row-reverse justify-end gap-3 sm:gap-4 transition-all duration-[1200ms] sm:duration-700 ease-out delay-300 ${
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {slide.buttons.map((button, buttonIndex) => (
                        <Link
                          key={buttonIndex}
                          href={button.href}
                          className={`h-[50px] sm:h-[55px] md:h-[59px] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-[4px] font-bold text-[14px] sm:text-[15px] md:text-[16px] transition-all duration-300 flex items-center justify-center flex-1 sm:flex-none sm:w-[160px] md:w-[187px] min-w-0 ${
                            button.type === "primary"
                              ? "bg-[#5f664f] text-white hover:bg-[#4b5244] active:bg-[#3d4235]"
                              : "bg-white text-black hover:bg-gray-100 active:bg-gray-200"
                          }`}
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          <span className="truncate">{button.text}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Navigation - matching Figma style */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-[30px] transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white h-[6px] sm:h-[8px] w-[28px] sm:w-[35px]"
                    : "bg-white/80 h-[6px] sm:h-[8px] w-[6px] sm:w-[8px] hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 active:bg-white/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 active:bg-white/40"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
