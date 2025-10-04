"use client";

import Link from "next/link";
import { useState } from "react";

export type ProductItem = {
    id: number;
    title: string;
    image: string;
    price: number;
    badge?: string;
    isPopular?: boolean;
};

export default function ProductCard({ item }: { item: ProductItem }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);

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
            setIsAdding(false);
        }, 3000);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            dir="rtl"
        >
            <div className="relative h-80 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute top-2 left-2 flex items-center gap-2">
                    <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:bg-[#5A5E4D] hover:text-white transition-all duration-300 hover:scale-110">
                        <svg
                            className="w-4 h-4 transition-colors"
                            fill="none"
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
            <div className="p-4">
                <h3
                    className="font-bold text-gray-800 mb-1"
                    style={{ fontFamily: "var(--font-almarai)" }}
                >
                    {item.title}
                </h3>
                <p className="text-[12px] text-gray-600 mb-2">
                    وصف مختصر للباقة يوضح نوع الورود والألوان المناسبة.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <Link
                        href={`/product/${item.id}`}
                        className="hover:underline hover:text-[#5A5E4D] transition-colors"
                    >
                        عرض التفاصيل
                    </Link>
                    <div className="font-bold text-gray-800">
                        {item.price} ريال
                    </div>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full py-2 rounded-md text-white font-semibold bg-[#5A5E4D] hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isAdding ? "جاري الإضافة..." : "أضف إلى السلة"}
                </button>
            </div>
        </div>
    );
}
