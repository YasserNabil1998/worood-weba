"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { ReviewItem } from "@/types";
import { Star } from "lucide-react";
import { logError } from "@/lib/logger";
import { INTERVALS, UI_TEXTS } from "@/constants";
import AOSWrapper from "@/components/common/AOSWrapper";
import { useHomePageStore, useReviewsStore } from "@/stores";

type CustomerReviewsSliderProps = {
  reviews?: ReviewItem[];
  isLoading?: boolean;
};

const CustomerReviewsSlider = ({
  reviews: propReviews,
  isLoading: propIsLoading,
}: CustomerReviewsSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  const storeReviews = useHomePageStore((state) => state.reviews);
  const storeIsLoading = useHomePageStore((state) => state.isLoading);
  const fetchHomePageData = useHomePageStore((state) => state.fetchHomePageData);
  const getAllReviews = useReviewsStore((state) => state.getAllReviews);

  useEffect(() => {
    setMounted(true);
    fetchHomePageData();
  }, [fetchHomePageData]);

  // Use prop reviews if provided, otherwise use store reviews, fallback to reviewsStore
  // Only compute reviews after component is mounted to avoid hydration mismatch
  const reviews = useMemo(() => {
    // Always use propReviews if provided (works during SSR)
    if (propReviews) return propReviews;

    // During SSR (before mount), return empty array to avoid hydration mismatch
    // This prevents calling getAllReviews() which uses localStorage
    if (!mounted) {
      return [];
    }

    // After mount, use store reviews if available
    if (storeReviews.length > 0) {
      return storeReviews.map((rev) => ({
        id: rev.id,
        customerName: rev.customerName,
        customerImage: rev.customerImage,
        rating: rev.rating,
        comment: rev.comment,
        date: rev.date || undefined,
        productName: rev.productName || undefined,
      }));
    }

    // Fallback to reviewsStore.getAllReviews() only after mount (client-side)
    return getAllReviews();
  }, [propReviews, storeReviews, mounted, getAllReviews]);

  const isLoading = propIsLoading !== undefined ? propIsLoading : storeIsLoading;

  // Get number of visible items based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    // من التابلت فأعلى نعرض 3 عناصر ليكون العنصر التالي في الوسط
    return 3; // tablet & desktop
  };

  // Initialize visibleCount to 1 for SSR consistency
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    // Only update visibleCount after mount to avoid hydration mismatch
    if (!mounted) return;

    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [mounted]);

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
            <div className="text-gray-600">
              {UI_TEXTS.LOADING}
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              آراء عملائنا
            </h2>
            <p className="text-gray-600">
              {UI_TEXTS.NO_REVIEWS_AVAILABLE}
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
          <h2 className="text-[28px] sm:text-[30px] font-bold text-black">
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
                <AOSWrapper key={review.id} animation="fade-up" delay={idx * 100} duration={600}>
                  <div
                    className={`bg-white rounded-[12px] p-6 pb-12 h-[160px] flex flex-col transition-all duration-300 ease-out shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)] ${
                      isCenter
                        ? "scale-105 md:scale-110 z-10 shadow-xl translate-y-0"
                        : "scale-95 opacity-90 shadow-lg translate-y-1 sm:translate-y-2"
                    }`}
                  >
                    <div className="flex items-center justify-start mb-4 shrink-0 gap-4">
                      {/* Avatar - matching Figma: 48px circle, bg-[rgba(227,230,216,0.9)] */}
                      <div className="w-12 h-12 bg-[rgba(227,230,216,0.9)] rounded-full flex items-center justify-center shrink-0">
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
                    {review.comment && (
                      <div className="flex-1 flex flex-col justify-center">
                        <p
                          className="text-gray-600 leading-[24px] text-[16px] overflow-hidden text-right"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {review.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </AOSWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSlider;
