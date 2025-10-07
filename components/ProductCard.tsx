"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export type ProductItem = {
    id: number;
    title: string;
    image: string;
    price: number;
    badge?: string;
    isPopular?: boolean;
};

export default function ProductCard({ item }: { item: ProductItem }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if item is in favorites
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isInFavorites = favorites.some(
            (fav: ProductItem) => fav.id === item.id
        );
        setIsFavorite(isInFavorites);
    }, [item.id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(
                (fav: ProductItem) => fav.id !== item.id
            );
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(false);

            // Show notification
            const notification = document.createElement("div");
            notification.className =
                "fixed top-4 right-4 bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
            notification.textContent = "تم إزالة المنتج من المفضلة";
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        } else {
            // Add to favorites
            favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);

            // Show notification
            const notification = document.createElement("div");
            notification.className =
                "fixed top-4 right-4 bg-[#5A5E4D] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
            notification.textContent = "تم إضافة المنتج إلى المفضلة ❤️";
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }

        // Dispatch event for other components to update
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    const handleAddToCart = () => {
        // Get existing cart from localStorage
        const existingCart = localStorage.getItem("cart");
        const cart = existingCart ? JSON.parse(existingCart) : [];

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(
            (cartItem: any) => cartItem.id === item.id
        );

        if (existingItemIndex > -1) {
            // Increment quantity if item exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.push({ ...item, quantity: 1 });
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event("cartUpdated"));

        // Show notification
        const notification = document.createElement("div");
        notification.className =
            "fixed top-4 right-4 bg-[#5A5E4D] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
        notification.textContent = "تم إضافة المنتج إلى السلة ✓";
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    };

    return (
        <Link
            href={`/product/${item.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
            dir="rtl"
            data-product-card
        >
            <div className="relative h-80 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite();
                        }}
                        className={`h-8 w-8 rounded-full backdrop-blur flex items-center justify-center shadow transition-all duration-300 hover:scale-110 ${
                            isFavorite
                                ? "bg-[#5A5E4D] text-white"
                                : "bg-white/90 text-gray-700 hover:bg-[#5A5E4D] hover:text-white"
                        }`}
                    >
                        <svg
                            className="w-4 h-4 transition-colors"
                            fill={isFavorite ? "currentColor" : "none"}
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
                {item.badge && (
                    <span className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur text-[11px] px-2 py-1 shadow text-gray-700">
                        {item.badge}
                    </span>
                )}
                {item.isPopular && (
                    <span className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur text-[11px] px-2 py-1 shadow text-gray-700">
                        الأكثر شهرة
                    </span>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex-1 mb-4">
                    <h3
                        className="font-bold text-gray-800 mb-2 line-clamp-1"
                        style={{ fontFamily: "var(--font-almarai)" }}
                        title={item.title}
                        data-product-title
                    >
                        {item.title}
                    </h3>
                    <p className="text-[12px] text-gray-600 line-clamp-2">
                        وصف مختصر للباقة يوضح نوع الورود والألوان المناسبة.
                    </p>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">السعر:</span>
                        <div className="font-bold text-lg text-[#5A5E4D]">
                            {item.price} ريال
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart();
                        }}
                        className="w-full py-2 rounded-md text-white font-semibold bg-[#5A5E4D] hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer relative z-10"
                    >
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        </Link>
    );
}
