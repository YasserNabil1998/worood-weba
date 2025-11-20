"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ROUTES } from "@/src/constants/routes";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/home/hero-home/hero-home.png",
      title: "لأجمل لحظات الحياة",
      description: "باقات مميزة صممت بعناية لتناسب جميع الأذواق والمناسبات الخاصة",
      buttons: [
        {
          text: "تصفح الباقات",
          href: ROUTES.BOUQUETS,
          type: "primary", // أخضر
        },
        {
          text: "تنسيق باقة خاصة",
          href: ROUTES.CUSTOM,
          type: "secondary", // أبيض
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
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative">
      <div className="w-full">
        <div className="relative h-[566px] overflow-hidden rounded-[20px]">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-[20px]"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="100vw"
              />

              {/* Dark Overlay - matching Figma rgba(35,35,35,0.4) */}
              <div className="absolute inset-0 bg-[rgba(35,35,35,0.4)] rounded-[20px]"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
                  <div className="ml-auto max-w-[576px] text-right px-8">
                    {/* Title - matching Figma: 48px, Almarai Bold, white */}
                    <h1
                      className="text-[36px] sm:text-[42px] md:text-[48px] font-bold text-white mb-6 leading-[48px] text-right "
                      style={{
                        fontFamily: "var(--font-almarai)",
                        textShadow:
                          "3px 3px 12px rgba(0, 0, 0, 0.9), 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Description - matching Figma: 20px, Almarai Regular, white */}
                    <p
                      className="text-[18px] sm:text-[20px] text-white mb-8 leading-[28px] text-right"
                      style={{
                        fontFamily: "var(--font-almarai)",
                        textShadow:
                          "2px 2px 10px rgba(0, 0, 0, 0.9), 1px 1px 6px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-row-reverse justify-end gap-4 ">
                      {slide.buttons.map((button, buttonIndex) => (
                        <Link
                          key={buttonIndex}
                          href={button.href}
                          className={`h-[59px] px-8 py-3 rounded-[4px] font-bold text-[16px] transition-all duration-300 flex items-center justify-center ${
                            button.type === "primary"
                              ? "bg-[#5f664f] text-white hover:bg-[#4b5244] w-[160px]"
                              : "bg-white text-black hover:bg-gray-100 w-[187px]"
                          }`}
                          style={{
                            fontFamily: "var(--font-almarai)",
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

          {/* Dots Navigation - matching Figma style */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-[30px] transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white h-[8px] w-[35px]"
                    : "bg-white h-[8px] w-[8px] hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
