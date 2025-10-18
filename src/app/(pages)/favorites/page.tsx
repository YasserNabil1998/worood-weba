"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import ProductCard, { ProductItem } from "@/src/components/ProductCard";
import Link from "next/link";
import { CustomBouquet } from "@/src/@types/favorites/CustomBouquet.type";
import { Heart, X } from "lucide-react";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<ProductItem[]>([]);
    const [customBouquets, setCustomBouquets] = useState<CustomBouquet[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBouquet, setSelectedBouquet] =
        useState<CustomBouquet | null>(null);
    const [showPreview, setShowPreview] = useState(false);

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
        try {
            // تحميل المنتجات العادية
            const storedFavorites = localStorage.getItem("favorites");
            if (storedFavorites) {
                const parsed = JSON.parse(storedFavorites);
                setFavorites(Array.isArray(parsed) ? parsed : []);
            }

            // تحميل التصاميم المخصصة
            const storedCustomBouquets =
                localStorage.getItem("bouquetFavorites");
            if (storedCustomBouquets) {
                const parsed = JSON.parse(storedCustomBouquets);
                setCustomBouquets(Array.isArray(parsed) ? parsed : []);
            }
        } catch (error) {
            console.error("خطأ في تحميل المفضلة:", error);
            localStorage.setItem("favorites", "[]");
            localStorage.setItem("bouquetFavorites", "[]");
            setFavorites([]);
            setCustomBouquets([]);
        }

        setLoading(false);
    };

    const removeCustomBouquet = (id: number) => {
        const updatedBouquets = customBouquets.filter((b) => b.id !== id);
        setCustomBouquets(updatedBouquets);
        localStorage.setItem(
            "bouquetFavorites",
            JSON.stringify(updatedBouquets)
        );
    };

    const openPreview = (bouquet: CustomBouquet) => {
        setSelectedBouquet(bouquet);
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
        setSelectedBouquet(null);
    };

    const addCustomBouquetToCart = (bouquet: CustomBouquet) => {
        try {
            const cartItem = {
                id: Date.now(),
                type: "custom",
                title: `باقة مخصصة - ${bouquet.occasion}`,
                flowers: bouquet.flowers,
                colors: bouquet.colors,
                size: bouquet.size,
                style: bouquet.style,
                occasion: bouquet.occasion,
                cardMessage: bouquet.cardMessage,
                notes: bouquet.notes,
                total: bouquet.total,
                image: bouquet.image,
                quantity: 1,
            };

            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const safeCart = Array.isArray(cart) ? cart : [];
            safeCart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(safeCart));
            window.dispatchEvent(new CustomEvent("cartUpdated"));

            // إشعار جانبي
            const notification = document.createElement("div");
            notification.textContent = "تم إضافة الباقة إلى السلة!";
            notification.className =
                "fixed top-4 right-4 px-6 py-3 rounded-lg z-50 text-white shadow-lg";
            notification.style.backgroundColor = "#5A5E4D";
            notification.style.fontFamily = "var(--font-almarai)";
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);

            // إغلاق المعاينة إذا كانت مفتوحة
            closePreview();
        } catch (error) {
            console.error("خطأ في إضافة الباقة للسلة:", error);
            localStorage.setItem("cart", "[]");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD] flex flex-col">
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
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
            dir="rtl"
        >
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

                    {favorites.length === 0 && customBouquets.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
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
                            {/* التصاميم المخصصة */}
                            {customBouquets.length > 0 && (
                                <div className="mb-10">
                                    <h2
                                        className="text-2xl font-bold text-gray-800 mb-4"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        التصاميم المخصصة (
                                        {customBouquets.length})
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {customBouquets.map((bouquet) => (
                                            <div
                                                key={bouquet.id}
                                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                                onClick={() =>
                                                    openPreview(bouquet)
                                                }
                                            >
                                                <div className="relative h-64 bg-gradient-to-br from-pink-100 to-purple-100">
                                                    <Image
                                                        src={bouquet.image}
                                                        alt="باقة مخصصة"
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute top-2 right-2 bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                        مخصصة
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3
                                                        className="text-lg font-bold text-gray-800 mb-2"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        باقة مخصصة -{" "}
                                                        {bouquet.occasion}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {bouquet.flowers.length}{" "}
                                                        نوع من الزهور
                                                    </p>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-xl font-bold text-[#5A5E4D]">
                                                            {bouquet.total} ر.س
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addCustomBouquetToCart(
                                                                    bouquet
                                                                );
                                                            }}
                                                            className="flex-1 bg-[#5A5E4D] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#4A4E3D] transition-colors"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            أضف إلى السلة
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeCustomBouquet(
                                                                    bouquet.id
                                                                );
                                                            }}
                                                            className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            حذف
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* المنتجات العادية */}
                            {favorites.length > 0 && (
                                <div>
                                    <h2
                                        className="text-2xl font-bold text-gray-800 mb-4"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        المنتجات ({favorites.length})
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {favorites.map((item) => (
                                            <ProductCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Modal معاينة الباقة المخصصة */}
            {showPreview && selectedBouquet && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    onClick={closePreview}
                >
                    <div
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto scrollbar-hide shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                        dir="rtl"
                    >
                        {/* Header */}
                        <div className="bg-[#5A5E4D] px-4 py-3 sticky top-0 z-10 flex items-center justify-between">
                            <h2
                                className="text-lg font-bold text-white"
                                style={{
                                    fontFamily: "var(--font-almarai)",
                                }}
                            >
                                باقة مخصصة - {selectedBouquet.occasion}
                            </h2>
                            <button
                                onClick={closePreview}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Image */}
                                <div className="relative h-48 md:h-56 rounded-lg overflow-hidden">
                                    <Image
                                        src={selectedBouquet.image}
                                        alt="باقة مخصصة"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Details */}
                                <div className="space-y-3">
                                    {/* السعر */}
                                    <div className="bg-[#5A5E4D] text-white p-3 rounded-lg text-center">
                                        <p className="text-xs mb-0.5">
                                            السعر الإجمالي
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {selectedBouquet.total} ر.س
                                        </p>
                                    </div>

                                    {/* الزهور */}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <h4
                                            className="font-bold text-sm text-gray-800 mb-2"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            الزهور (
                                            {selectedBouquet.flowers.length})
                                        </h4>
                                        <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-hide">
                                            {selectedBouquet.flowers.map(
                                                (item: any, idx: number) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between bg-white p-2 rounded text-sm"
                                                    >
                                                        <span
                                                            className="font-semibold"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            {item.flower.name}
                                                        </span>
                                                        <span className="text-xs text-gray-600">
                                                            x{item.quantity}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* الحجم والتغليف */}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            <div>
                                                <p className="text-xs text-gray-600 mb-0.5">
                                                    الحجم
                                                </p>
                                                <p
                                                    className="font-bold text-sm text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {selectedBouquet.size ===
                                                    "small"
                                                        ? "صغير"
                                                        : selectedBouquet.size ===
                                                          "medium"
                                                        ? "متوسط"
                                                        : "كبير"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-0.5">
                                                    التغليف
                                                </p>
                                                <p
                                                    className="font-bold text-sm text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {selectedBouquet.style ===
                                                    "classic"
                                                        ? "كلاسيكي"
                                                        : selectedBouquet.style ===
                                                          "premium"
                                                        ? "فاخر"
                                                        : selectedBouquet.style ===
                                                          "gift"
                                                        ? "هدية"
                                                        : "صديق للبيئة"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* البطاقة والملاحظات */}
                                    {selectedBouquet.cardMessage && (
                                        <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                                            <h5
                                                className="font-bold text-sm text-gray-800 mb-1"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                رسالة البطاقة
                                            </h5>
                                            <p
                                                className="text-gray-700 text-xs"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {selectedBouquet.cardMessage}
                                            </p>
                                        </div>
                                    )}

                                    {selectedBouquet.notes && (
                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                            <h5
                                                className="font-bold text-sm text-gray-800 mb-1"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                ملاحظات
                                            </h5>
                                            <p
                                                className="text-gray-700 text-xs"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {selectedBouquet.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 pt-3">
                                <button
                                    onClick={() =>
                                        addCustomBouquetToCart(selectedBouquet)
                                    }
                                    className="flex-1 bg-[#5A5E4D] text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-[#4A4E3D] transition-colors"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    أضف إلى السلة
                                </button>
                                <button
                                    onClick={() => {
                                        removeCustomBouquet(selectedBouquet.id);
                                        closePreview();
                                    }}
                                    className="bg-red-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
