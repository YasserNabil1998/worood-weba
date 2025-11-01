"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ReviewItem } from "@/types";
import { getAllReviews } from "@/src/actions/reviews-manager";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type CustomerReviewsSliderProps = {
  reviews?: ReviewItem[];
  isLoading?: boolean;
};

const CustomerReviewsSlider = ({
  reviews: propReviews,
  isLoading: propIsLoading,
}: CustomerReviewsSliderProps) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (propReviews) {
      setReviews(propReviews);
      return;
    }

    setIsLoading(true);
    try {
      const allReviews = getAllReviews();
      setReviews(allReviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [propReviews]);

  // Get number of visible items based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    // من التابلت فأعلى نعرض 3 عناصر ليكون العنصر التالي في الوسط
    return 3; // tablet & desktop
  };

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= visibleCount) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % (reviews.length - visibleCount + 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length, visibleCount]);

  const finalIsLoading = propIsLoading || isLoading;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (reviews.length - visibleCount + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (reviews.length - visibleCount + 1)) %
        (reviews.length - visibleCount + 1)
    );
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
      />
    ));
  };

  if (finalIsLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className="text-gray-600"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              جاري التحميل...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              آراء عملائنا
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              لا توجد تقييمات متاحة حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show reviews based on screen size
  const visibleReviews = reviews.slice(
    currentSlide,
    currentSlide + visibleCount
  );
  // Determine which item is the visual center
  const centerIndex = Math.floor(visibleCount / 2);
  const showNavigation = reviews.length > visibleCount;

  return (
    <section className="py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-right mb-8 sm:mb-10 md:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            آراء عملائنا
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons - Inside the container */}
          {showNavigation && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-6 md:-translate-x-10 lg:-translate-x-16 bg-white hover:bg-gray-50 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-20 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-6 md:translate-x-10 lg:translate-x-16 bg-white hover:bg-gray-50 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-20 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Reviews Grid */}
          <div
            className={`grid gap-4 sm:gap-6 ${
              visibleCount === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
            }`}
          >
            {visibleReviews.map((review, idx) => {
              const isCenter = visibleCount === 1 ? true : idx === centerIndex;
              return (
                <div
                  key={review.id}
                  className={`bg-white rounded-xl p-4 sm:p-6 h-56 sm:h-64 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 ${
                    isCenter
                      ? "scale-105 md:scale-110 z-10 shadow-xl translate-y-0"
                      : "scale-95 opacity-90 shadow-lg translate-y-1 sm:translate-y-2"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4 flex-shrink-0">
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold text-gray-800 mb-2"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        {review.customerName}
                      </h3>
                      {review.productName && (
                        <p
                          className="text-sm text-gray-600 mb-2"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          طلب: {review.productName}
                        </p>
                      )}
                      <div className="flex items-center mb-3">
                        {renderStars(review.rating)}
                      </div>
                      {review.date && (
                        <p
                          className="text-xs text-gray-500"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {review.date}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {review.customerImage ? (
                        <Image
                          src={review.customerImage}
                          alt={review.customerName}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span
                          className="text-green-600 font-bold text-lg"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {review.customerName.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p
                      className="text-gray-700 leading-relaxed text-sm overflow-hidden"
                      style={{
                        fontFamily: "var(--font-almarai)",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          {showNavigation && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {Array.from(
                { length: reviews.length - visibleCount + 1 },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-[#5A5E4D] scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSlider;
