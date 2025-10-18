"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { addProductToCart } from "@/src/lib/cartUtils";
import { Heart } from "lucide-react";

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
        const favorites = storage.get<ProductItem[]>(
            STORAGE_KEYS.FAVORITES,
            []
        );
        const isInFavorites = favorites.some(
            (fav: ProductItem) => fav.id === item.id
        );
        setIsFavorite(isInFavorites);
    }, [item.id]);

    const toggleFavorite = () => {
        const favorites = storage.get<ProductItem[]>(
            STORAGE_KEYS.FAVORITES,
            []
        );

        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(
                (fav: ProductItem) => fav.id !== item.id
            );
            storage.set(STORAGE_KEYS.FAVORITES, updatedFavorites);
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
            storage.set(STORAGE_KEYS.FAVORITES, favorites);
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
        // Get existing cart
        const cart = storage.get<any[]>(STORAGE_KEYS.CART, []);

        // إنشاء منتج مع خصائص افتراضية
        const productToAdd = {
            ...item,
            quantity: 1,
            size: "default", // القيمة الافتراضية للمنتجات البسيطة
            addCard: false,
            addChocolate: false,
            giftWrap: false,
        };

        const { cart: updatedCart, isNew } = addProductToCart(
            cart,
            productToAdd
        );

        // Save updated cart
        storage.set(STORAGE_KEYS.CART, updatedCart);

        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event("cartUpdated"));

        // Show notification with different message based on whether it's new or existing
        const notification = document.createElement("div");
        notification.className =
            "fixed top-4 right-4 bg-[#5A5E4D] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
        notification.textContent = isNew
            ? "تم إضافة المنتج إلى السلة ✓"
            : "تم زيادة كمية المنتج في السلة ✓";
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
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        <Heart
                            className="w-4 h-4 transition-colors"
                            fill={isFavorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={2}
                        />
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
