"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { ProductItem } from "@/components/ProductCard";
import Link from "next/link";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();

        // Listen for favorites updates
        const handleFavoritesUpdate = () => {
            loadFavorites();
        };

        window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

        return () => {
            window.removeEventListener(
                "favoritesUpdated",
                handleFavoritesUpdate
            );
        };
    }, []);

    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD] flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5A5E4D] mx-auto"></div>
                        <p
                            className="mt-6 text-gray-600 text-lg"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جاري التحميل...
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
            dir="rtl"
        >
            <Header />
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            المفضلة
                        </h1>
                        <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
                            المنتجات التي أضفتها إلى قائمة المفضلة
                        </p>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <svg
                                    className="w-24 h-24 mx-auto text-gray-300 mb-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                    />
                                </svg>
                                <h2
                                    className="text-2xl font-bold text-gray-800 mb-3"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    لا توجد منتجات في المفضلة
                                </h2>
                                <p
                                    className="text-gray-600 mb-6"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    ابدأ بإضافة المنتجات المفضلة لديك لتسهيل
                                    الوصول إليها لاحقاً
                                </p>
                                <Link
                                    href="/bouquets"
                                    className="inline-block bg-[#5A5E4D] hover:bg-[#4A4E3D] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    تصفح الباقات
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <p className="text-gray-600">
                                    لديك {favorites.length}{" "}
                                    {favorites.length === 1 ? "منتج" : "منتجات"}{" "}
                                    في المفضلة
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {favorites.map((item) => (
                                    <ProductCard key={item.id} item={item} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
