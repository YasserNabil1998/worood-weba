"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { BouquetItem } from "../types";

type FeaturedBouquetsProps = {
    bouquets?: BouquetItem[];
    isLoading?: boolean;
};

const defaultBouquets: BouquetItem[] = [
    {
        id: 1,
        title: "باقة النجاح",
        price: 400,
        image: "/images/bouquets/DIV-237.png",
        currency: "ر.س",
    },
    {
        id: 2,
        title: "باقة السعادة",
        price: 320,
        image: "/images/bouquets/IMG-196.png",
        currency: "ر.س",
    },
    {
        id: 3,
        title: "باقة الفرح",
        price: 280,
        image: "/images/bouquets/IMG-210.png",
        currency: "ر.س",
    },
];

const FeaturedBouquets = ({
    bouquets = defaultBouquets,
    isLoading = false,
}: FeaturedBouquetsProps) => {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // Load favorites from localStorage
    useEffect(() => {
        const loadFavorites = () => {
            if (typeof window !== "undefined") {
                const savedFavorites = JSON.parse(
                    localStorage.getItem("favorites") || "[]"
                );
                const favoriteIds = savedFavorites.map(
                    (fav: BouquetItem) => fav.id
                );
                setFavorites(new Set(favoriteIds));
            }
        };

        loadFavorites();

        // Listen for favorites updates
        window.addEventListener("favoritesUpdated", loadFavorites);
        return () =>
            window.removeEventListener("favoritesUpdated", loadFavorites);
    }, []);

    const toggleFavorite = (e: React.MouseEvent, bouquet: BouquetItem) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isCurrentlyFavorite = favorites.some(
            (fav: BouquetItem) => fav.id === bouquet.id
        );

        if (isCurrentlyFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(
                (fav: BouquetItem) => fav.id !== bouquet.id
            );
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setFavorites((prev) => {
                const newSet = new Set(prev);
                newSet.delete(bouquet.id);
                return newSet;
            });

            // Show notification
            const notification = document.createElement("div");
            notification.className =
                "fixed top-4 right-4 bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
            notification.textContent = "تم إزالة المنتج من المفضلة";
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        } else {
            // Add to favorites
            favorites.push(bouquet);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setFavorites((prev) => new Set(prev).add(bouquet.id));

            // Show notification
            const notification = document.createElement("div");
            notification.className =
                "fixed top-4 right-4 bg-[#5A5E4D] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
            notification.textContent = "تم إضافة المنتج إلى المفضلة ❤️";
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }

        // Dispatch event
        window.dispatchEvent(new Event("favoritesUpdated"));
    };
    const addToCart = (bouquet: BouquetItem) => {
        if (typeof window !== "undefined") {
            try {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingItem = cart.find(
                    (item: any) => item.id === bouquet.id
                );

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: bouquet.id,
                        title: bouquet.title,
                        price: bouquet.price,
                        quantity: 1,
                        image: bouquet.image,
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                window.dispatchEvent(new CustomEvent("cartUpdated"));

                // إشعار
                const notification = document.createElement("div");
                notification.textContent = "تم إضافة المنتج إلى السلة ✓";
                notification.className =
                    "fixed top-4 right-4 bg-[#5A5E4D] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
                notification.style.fontFamily = "var(--font-almarai)";
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
            } catch (error) {
                console.error("خطأ في إضافة المنتج للسلة:", error);
            }
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-gray-800 mb-1"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            باقات مقترحة
                        </h2>
                        <p className="text-gray-600 text-sm">
                            تصاميم منسقة قد تعجبك
                        </p>
                    </div>
                    <Link
                        href="/bouquets"
                        className="text-[#5A5E4D] hover:underline text-sm font-semibold cursor-pointer"
                    >
                        عرض الكل ←
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading && (
                        <div
                            className="col-span-full text-center text-gray-600"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جاري التحميل...
                        </div>
                    )}
                    {bouquets.slice(0, 3).map((bouquet) => (
                        <Link
                            key={bouquet.id}
                            href={`/product/${bouquet.id}`}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                        >
                            <div className="relative h-80 overflow-hidden group">
                                <img
                                    src={bouquet.image}
                                    alt={bouquet.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* زر المفضلة */}
                                <div className="absolute top-2 left-2 z-10">
                                    <button
                                        onClick={(e) =>
                                            toggleFavorite(e, bouquet)
                                        }
                                        className={`h-8 w-8 rounded-full backdrop-blur flex items-center justify-center shadow transition-all duration-300 hover:scale-110 cursor-pointer ${
                                            favorites.has(bouquet.id)
                                                ? "bg-[#5A5E4D] text-white"
                                                : "bg-white/90 text-gray-700 hover:bg-[#5A5E4D] hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            className="w-4 h-4 transition-colors"
                                            fill={
                                                favorites.has(bouquet.id)
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex-1 mb-4">
                                    <h3
                                        className="font-bold text-gray-800 mb-2 line-clamp-1"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                        title={bouquet.title}
                                    >
                                        {bouquet.title}
                                    </h3>
                                    <p className="text-[12px] text-gray-600 line-clamp-2">
                                        وصف مختصر للباقة يوضح نوع الورود
                                        والألوان المناسبة.
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-gray-600">
                                            السعر:
                                        </span>
                                        <div className="font-bold text-lg text-[#5A5E4D]">
                                            {bouquet.price} {bouquet.currency}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(bouquet);
                                        }}
                                        className="w-full py-2 rounded-md text-white font-semibold bg-[#5A5E4D] hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer relative z-10"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        أضف إلى السلة
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBouquets;
