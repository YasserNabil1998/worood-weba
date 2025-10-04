"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    currency: string;
}

const ProductsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        setCurrentIndex((prev) => (prev >= products.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? products.length - 1 : prev - 1
        );
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section className="py-12">
            <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
                <div className="flex justify-between items-center mb-8">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-800"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        سعادة في مزهرية
                    </h2>
                    <Link
                        href="/bouquets"
                        className="text-sm text-[#5A5E4D] hover:text-[#4A4E3D] font-medium flex items-center gap-2"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        <span>اكتشف تشكيلتنا</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="relative">
                    {/* Products Container */}
                    <div className="overflow-hidden px-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products
                                .slice(currentIndex, currentIndex + 4)
                                .concat(
                                    currentIndex + 4 > products.length
                                        ? products.slice(
                                              0,
                                              currentIndex + 4 - products.length
                                          )
                                        : []
                                )
                                .slice(0, 4)
                                .map((product, idx) => (
                                    <Link
                                        key={`${product.id}-${idx}`}
                                        href={`/product/${product.id}`}
                                        className="w-full block group cursor-pointer"
                                    >
                                        <div className="bg-[#F5F3ED] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 mb-2">
                                                    <span
                                                        className="text-xs text-gray-600"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        {product.currency}
                                                    </span>
                                                    <span
                                                        className="text-xl font-bold text-gray-800"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        {product.price}
                                                    </span>
                                                </div>
                                                <h3
                                                    className="text-sm font-medium text-gray-700 text-right"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
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

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                        aria-label="Previous"
                    >
                        <svg
                            className="w-5 h-5"
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
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                        aria-label="Next"
                    >
                        <svg
                            className="w-5 h-5"
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

export default ProductsSlider;
