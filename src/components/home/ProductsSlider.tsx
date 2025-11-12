"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/src/constants/routes";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  currency: string;
}

const ProductsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Get number of visible items based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 4; // desktop
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const products: Product[] = [
    {
      id: 1,
      title: "مزهرية زهور حمراء أنيقة",
      price: 490,
      image: "/images/Products/Products-5.jpg",
      currency: "ر.س",
    },
    {
      id: 2,
      title: "مزهرية الكمال الوردي",
      price: 665,
      image: "/images/Products/Products-6.jpg",
      currency: "ر.س",
    },
    {
      id: 3,
      title: "مزهرية زهور فاخرة",
      price: 585,
      image: "/images/Products/Products-4.jpg",
      currency: "ر.س",
    },
    {
      id: 4,
      title: "فازة حوري الجمال الدافئ | 30 زهرة",
      price: 429,
      image: "/images/Products/Products-3.jpg",
      currency: "ر.س",
    },
    {
      id: 5,
      title: "باقة الورد الأحمر الفاخرة",
      price: 550,
      image: "/images/Products/Products-1.jpg",
      currency: "ر.س",
    },
    {
      id: 6,
      title: "مزهرية الزهور المميزة",
      price: 720,
      image: "/images/Products/Products-2.jpg",
      currency: "ر.س",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= products.length - visibleCount ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - visibleCount : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            سعادة في مزهرية
          </h2>
          <Link
            href={ROUTES.BOUQUETS}
            className="text-sm text-[#5A5E4D] hover:text-[#4A4E3D] font-medium flex items-center gap-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span>اكتشف تشكيلتنا</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          {/* Products Container */}
          <div className="overflow-hidden">
            <div
              className={`grid gap-4 sm:gap-6 ${
                visibleCount === 1
                  ? "grid-cols-1"
                  : visibleCount === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {products
                .slice(currentIndex, currentIndex + visibleCount)
                .concat(
                  currentIndex + visibleCount > products.length
                    ? products.slice(0, currentIndex + visibleCount - products.length)
                    : []
                )
                .slice(0, visibleCount)
                .map((product, idx) => (
                  <Link
                    key={`${product.id}-${idx}`}
                    href={`/product/${product.id}`}
                    className="w-full block group cursor-pointer"
                  >
                    <div className="bg-[#F5F3ED] rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3 sm:p-4 text-right">
                        <div className="flex items-center justify-start gap-1.5 mb-2">
                          <span
                            className="text-xl sm:text-2xl font-bold text-[#5A5E4D]"
                            style={{
                              fontFamily: "var(--font-almarai)",
                            }}
                          >
                            {product.price}
                          </span>
                          <span
                            className="text-sm sm:text-base text-[#5A5E4D]"
                            style={{
                              fontFamily: "var(--font-almarai)",
                            }}
                          >
                            ر.س
                          </span>
                        </div>
                        <h3
                          className="text-xs sm:text-sm font-medium text-gray-700 text-right line-clamp-2"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {product.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Navigation Arrows - Inside the container */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-gray-50 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-gray-50 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;

