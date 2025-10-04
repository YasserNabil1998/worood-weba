"use client";

import { useState } from "react";
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
        title: "باقة السعادة ",
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
    {
        id: 4,
        title: "باقة الحب الأبدي",
        price: 350,
        image: "/images/bouquets/IMG-224.png",
        currency: "ر.س",
    },
];

const FeaturedBouquets = ({
    bouquets = defaultBouquets,
    isLoading = false,
}: FeaturedBouquetsProps) => {
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

                // إشعار بسيط
                const notification = document.createElement("div");
                notification.textContent = "تم إضافة المنتج إلى السلة";
                notification.className =
                    "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50";
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
                <div className="flex justify-between items-center mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-gray-800"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        باقات مميزة
                    </h2>
                    <Link
                        href="/bouquets"
                        className="flex items-center text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                    >
                        عرض الكل
                        <svg
                            className="w-4 h-4 mr-2"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading && (
                        <div
                            className="col-span-full text-center text-gray-600"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جاري التحميل...
                        </div>
                    )}
                    {bouquets.map((bouquet) => (
                        <Link
                            key={bouquet.id}
                            href={`/product/${bouquet.id}`}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden group">
                                <img
                                    src={bouquet.image}
                                    alt={bouquet.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3
                                    className="text-lg font-bold text-gray-800 mb-2 flex-1 line-clamp-2 overflow-hidden text-ellipsis"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {bouquet.title}
                                </h3>
                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-xl font-bold text-gray-800">
                                        {bouquet.price} {bouquet.currency}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(bouquet);
                                        }}
                                        className="text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:opacity-90 cursor-pointer relative z-10"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                            backgroundColor: "#5A5E4D",
                                        }}
                                    >
                                        أضف للسلة
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
