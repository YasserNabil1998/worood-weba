"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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

  const products: Product[] = [
    {
      id: 1,
      title: "مزهرية زهور فاخرة",
      price: 350,
      image: "/assets/home/happiness-in-vase/Luxury-flower-vase.png",
      currency: "ر.س",
    },
    {
      id: 2,
      title: "مزهرية الورود الهادئة",
      price: 350,
      image: "/assets/home/happiness-in-vase/vase-of-beauty.png",
      currency: "ر.س",
    },
    {
      id: 3,
      title: "مزهرية الجمال",
      price: 350,
      image: "/assets/home/happiness-in-vase/Vase-of-Life.png",
      currency: "ر.س",
    },
    {
      id: 4,
      title: "مزهرية الحياة",
      price: 350,
      image: "/assets/home/happiness-in-vase/calm-floral-pattern.png",
      currency: "ر.س",
    },
  ];

  // Get number of visible items based on screen size
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 4; // desktop
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [getVisibleCount]);

  const totalItems = products.length;
  const shouldShowControls = totalItems > visibleCount;

  const getGridColumnsClass = useCallback((count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }, []);

  const gridColumnsClass = useMemo(() => getGridColumnsClass(visibleCount), [visibleCount, getGridColumnsClass]);

  const nextSlide = useCallback(() => {
    if (!shouldShowControls) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [shouldShowControls, totalItems]);

  const prevSlide = useCallback(() => {
    if (!shouldShowControls) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [shouldShowControls, totalItems]);

  // Reset index when visible count changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [visibleCount]);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!shouldShowControls) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, shouldShowControls]);

  // Calculate displayed products with circular logic
  const displayedProducts = useMemo(() => {
    if (totalItems === 0) return [];

    const count = Math.min(visibleCount, totalItems);
    return Array.from({ length: count }, (_, idx) => {
      const current = (currentIndex + idx) % totalItems;
      return products[current];
    });
  }, [currentIndex, products, totalItems, visibleCount]);

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-right">
            {/* Title - matching Figma: 30px, Almarai Bold */}
            <h2
              className="text-[28px] sm:text-[30px] font-bold text-black mb-2"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              سعادة في مزهرية
            </h2>
            {/* Description - matching Figma: 25px, Almarai Regular, black */}
            <p
              className="text-[20px] sm:text-[23px] md:text-[25px] font-normal text-black"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              اختر باقتك المفضلة لتضفي لمسة جمال على يومك
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Products Container */}
          {totalItems > 0 ? (
            <>
              <div className="overflow-hidden">
                <div
                  className={`grid ${gridColumnsClass} gap-3 sm:gap-4 lg:gap-6 justify-items-center`}
                >
                  {displayedProducts.map((product, idx) => (
                    <div
                      key={`${product.id}-${currentIndex}-${idx}`}
                      className="group border border-[#a1a1a1] border-solid rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer max-w-[294px] w-full bg-white"
                    >
                      {/* Image Section - matching Figma: 222px height */}
                      <Link
                        href={`/product/${product.id}`}
                        className="relative aspect-[294/222] overflow-hidden"
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-tl-[20px] rounded-tr-[20px]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                        />
                      </Link>
                      
                      {/* Content Section - matching Figma: white bg, border, rounded bottom */}
                      <div className="bg-white border-t border-[#e0dede] border-solid flex flex-col flex-1 rounded-bl-[20px] rounded-br-[20px] p-4 min-h-[147px]">
                        {/* Title - matching Figma: 18px, Almarai Bold, gray-800 */}
                        <Link
                          href={`/product/${product.id}`}
                          className="mb-3"
                        >
                          <h3
                            className="font-bold text-[18px] text-gray-800 text-right line-clamp-1 leading-[28px]"
                            style={{
                              fontFamily: "var(--font-almarai)",
                            }}
                            title={product.title}
                          >
                            {product.title}
                          </h3>
                        </Link>
                        
                        {/* Price and Add to Cart Button */}
                        <div className="flex items-center justify-between mt-auto">
                          {/* Price - matching Figma: 16px, Almarai Bold, #5a5e4d */}
                          <div className="flex items-center gap-1">
                            <span
                              className="text-[16px] font-bold text-[#5a5e4d] leading-[24px]"
                              style={{
                                fontFamily: "var(--font-almarai)",
                              }}
                            >
                              {product.price} ر.س
                            </span>
                          </div>
                          
                          {/* Add to Cart Button - matching Figma: #5f664f bg, rounded-[4px], icon centered */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // يمكن إضافة وظيفة إضافة للسلة هنا
                            }}
                            className="bg-[#5f664f] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#4a4e3d] transition-all duration-300 cursor-pointer shrink-0"
                            aria-label="أضف إلى السلة"
                          >
                            <Image
                              src="/assets/add-to-cart-icon.svg"
                              alt="أضف إلى السلة"
                              width={27}
                              height={27}
                              className="object-contain"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Responsive positioning */}
              {shouldShowControls && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                    aria-label="Previous product"
                  >
                    <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                    aria-label="Next product"
                  >
                    <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div
              className="text-center text-gray-600 py-8"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              لا توجد منتجات متاحة حالياً
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;

