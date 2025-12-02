"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ReviewItem } from "@/types";
import { getAllReviews } from "@/src/actions/reviews-manager";
import { Star } from "lucide-react";
import { logError } from "@/src/lib/logger";
import { fontStyle } from "@/src/lib/styles";
import { INTERVALS } from "@/src/constants";

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
      logError("Error loading reviews", error);
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
      setCurrentSlide((prev) => (prev + 1) % (reviews.length - visibleCount + 1));
    }, INTERVALS.REVIEWS_SLIDER);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length, visibleCount]);

  const finalIsLoading = propIsLoading || isLoading;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
      />
    ));
  };

  if (finalIsLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-600" style={fontStyle}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={fontStyle}>
              آراء عملائنا
            </h2>
            <p className="text-gray-600" style={fontStyle}>
              لا توجد تقييمات متاحة حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show reviews based on screen size
  const visibleReviews = reviews.slice(currentSlide, currentSlide + visibleCount);
  // Determine which item is the visual center
  const centerIndex = Math.floor(visibleCount / 2);

  return (
    <section className="py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - matching Figma: 30px, Almarai Bold */}
        <div className="text-right mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[28px] sm:text-[30px] font-bold text-black" style={fontStyle}>
            أراء عملائنا
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
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
                  className={`bg-white rounded-[12px] p-6 pb-12 h-[160px] flex flex-col transition-all duration-300 ease-out shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)] ${
                    isCenter
                      ? "scale-105 md:scale-110 z-10 shadow-xl translate-y-0"
                      : "scale-95 opacity-90 shadow-lg translate-y-1 sm:translate-y-2"
                  }`}
                >
                  <div className="flex items-center justify-start mb-4 flex-shrink-0 gap-4">
                    {/* Avatar - matching Figma: 48px circle, bg-[rgba(227,230,216,0.9)] */}
                    <div className="w-12 h-12 bg-[rgba(227,230,216,0.9)] rounded-full flex items-center justify-center flex-shrink-0">
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
                          className="text-gray-600 font-bold text-lg"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {review.customerName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="text-right mt-2">
                      {/* Name - matching Figma: 16px, Almarai Bold, gray-800 */}
                      <h3
                        className="text-[16px] font-bold text-gray-800 mb-2"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        {review.customerName}
                      </h3>
                      {/* Stars - matching Figma */}
                      <div className="flex items-center justify-end gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  {/* Comment - matching Figma: 16px, Almarai Regular, gray-600 */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p
                      className="text-gray-600 leading-[24px] text-[16px] overflow-hidden text-right"
                      style={{
                        fontFamily: "var(--font-almarai)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {review.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSlider;
