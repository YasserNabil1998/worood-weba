'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/hero/DIV-12.png',
      title: 'لأجمل لحظات الحياة',
      buttonText: 'اضغط الآن',
    },
    {
      image: '/images/hero/DIV-13.png',
      title: 'زهور تفوق الخيال',
      buttonText: 'اضغط الآن',
    },
    {
      image: '/images/hero/DIV-14.png',
      title: 'يوم القهوة... يوم البهجة',
      buttonText: 'اختر الآن',
    },
    {
      image: '/images/hero/DIV-15.png',
      title: 'للحبايب في يوم زفافهم',
      buttonText: 'اضغط الآن',
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
        <div className="relative h-[520px] md:h-[560px] overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
                  <div className="mr-auto max-w-2xl">
                    <h1 className="text-[40px] sm:text-[50px] md:text-[70px] font-bold text-white mb-5 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-right" style={{ fontFamily: 'var(--font-almarai)' }}>
                      {slide.title}
                    </h1>
                    <div className="flex justify-end"></div>
                    <Link
                      href="/bouquets"
                      className="bg-white text-gray-800 hover:bg-gray-100 px-10 py-3.5 rounded-full font-semibold text-[15px] md:text-[17px] transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{ fontFamily: 'var(--font-almarai)' }}
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/60 w-2 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-[5] bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
