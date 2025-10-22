"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ReviewItem } from "../../../types";
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
        if (width < 1024) return 2; // tablet
        return 3; // desktop
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
        setCurrentSlide(
            (prev) => (prev + 1) % (reviews.length - visibleCount + 1)
        );
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
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200/50"
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200/50"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                        </>
                    )}

                    {/* Reviews Grid */}
                    <div
                        className={`grid gap-4 sm:gap-6 ${
                            visibleCount === 1
                                ? "grid-cols-1"
                                : visibleCount === 2
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                    >
                        {visibleReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-56 sm:h-64 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4 flex-shrink-0">
                                    <div className="flex-1">
                                        <h3
                                            className="text-lg font-bold text-gray-800 mb-2"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {review.customerName}
                                        </h3>
                                        {review.productName && (
                                            <p
                                                className="text-sm text-gray-600 mb-2"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
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
                                                    fontFamily:
                                                        "var(--font-almarai)",
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
                                                    fontFamily:
                                                        "var(--font-almarai)",
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
                        ))}
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
