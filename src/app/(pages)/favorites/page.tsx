"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X, ShoppingCart, Trash2, Sparkles, Pencil } from "lucide-react";

import FavoriteProductCard from "@/src/components/FavoriteProductCard";
import { CustomBouquet } from "@/src/@types/favorites/CustomBouquet.type";
import { useFavorites } from "@/src/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/src/hooks/useCustomBouquetFavorites";

export default function FavoritesPage() {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const {
    customBouquets,
    loading: customLoading,
    removeFromFavorites: removeCustomBouquet,
    addToCart: addCustomBouquetToCart,
    editCustomBouquet,
  } = useCustomBouquetFavorites();

  const [selectedBouquet, setSelectedBouquet] = useState<CustomBouquet | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const loading = favoritesLoading || customLoading;

  const openPreview = (bouquet: CustomBouquet) => {
    setSelectedBouquet(bouquet);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedBouquet(null);
  };

  const handleAddToCart = (bouquet: CustomBouquet) => {
    addCustomBouquetToCart(bouquet);
    closePreview();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5A5E4D] mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg" style={{ fontFamily: "var(--font-almarai)" }}>
              جاري التحميل...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf2]" dir="rtl">
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav
              className="flex items-center gap-2 text-[18px] text-[#a0a0a0] justify-start"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              <Link href="/" className="hover:text-[#5A5E4D] transition-colors">
                الرئيسية
              </Link>
              <span> / </span>
              <span className="text-[#5A5E4D]">المفضلة</span>
            </nav>
          </div>

          {/* Page Title */}
          <div className="mb-8 md:mb-12 flex justify-start">
            <h1
              className="text-[20px] font-bold text-[rgba(0,0,0,0.72)]"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              المنتجات التي أضفتها إلى قائمة المفضلة
            </h1>
          </div>

          {favorites.length === 0 && customBouquets.length === 0 ? (
            <div className="text-center py-20 md:py-28">
              <div className="max-w-md mx-auto">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  </div>
                  <Heart className="w-28 h-28 md:w-32 md:h-32 mx-auto text-gray-300 relative z-10 animate-pulse" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  لا توجد منتجات في المفضلة
                </h2>
                <p
                  className="text-gray-600 mb-8 text-[15px] md:text-[16px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  ابدأ بإضافة المنتجات المفضلة لديك لتسهيل الوصول إليها لاحقاً
                </p>
                <Link
                  href="/bouquets"
                  className="inline-flex items-center gap-2 bg-[#5f664f] hover:bg-[#4A4E3D] text-white px-8 py-3.5 rounded-[10px] font-bold text-[22px] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  تصفح الباقات
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* المنتجات العادية */}
              {favorites.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                      <FavoriteProductCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* التصاميم المخصصة */}
              {customBouquets.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customBouquets.map((bouquet) => (
                      <div
                        key={bouquet.id}
                        className="bg-white border border-[#eae9e9] rounded-[20px] h-[149px] flex overflow-hidden relative cursor-pointer w-full"
                        dir="rtl"
                        onClick={() => openPreview(bouquet)}
                      >
                        {/* Image Section */}
                        <div className="relative w-[140px] h-full shrink-0">
                          <Image
                            src="/assets/custom-bouquet/معاينة الباقة.png"
                            alt="باقة مخصصة"
                            fill
                            className="object-cover"
                            sizes="140px"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to saved bouquet image (from bouquetImage) if the preview image doesn't exist
                              const target = e.target as HTMLImageElement;
                              if (bouquet.image && target.src !== bouquet.image) {
                                target.src = bouquet.image;
                              }
                            }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomBouquet(bouquet.id);
                            }}
                            className="absolute top-2 left-2 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
                            dir="rtl"
                            aria-label="إزالة من المفضلة"
                          >
                            <div className="relative w-[42px] h-[42px]">
                              <div className="absolute inset-0 bg-white/80 rounded-full backdrop-blur-sm"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Heart
                                  className="w-[27px] h-[27px] text-red-800"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                          </button>
                        </div>
                        {/* Content Section */}
                        <div className="flex-1 flex flex-col justify-between p-4 pl-5">
                          <div className="flex items-start justify-start">
                            <h3
                              className="font-bold text-[16px] text-gray-800 text-right leading-[24px]"
                              style={{ fontFamily: "var(--font-almarai)" }}
                            >
                              باقة مخصصة - {bouquet.occasion}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between gap-3 mt-auto">
                            <span
                              className="text-[16px] font-bold text-[#3c3d39] text-right whitespace-nowrap"
                              style={{ fontFamily: "var(--font-almarai)" }}
                            >
                              {bouquet.total} ر.س
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  editCustomBouquet(bouquet);
                                }}
                                className="bg-[#5A5E4D]/10 text-[#5A5E4D] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#5A5E4D]/20 transition-all duration-300 cursor-pointer shrink-0"
                                aria-label="تعديل الباقة"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addCustomBouquetToCart(bouquet);
                                }}
                                className="bg-[#5f664f] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#4a4e3d] transition-all duration-300 cursor-pointer shrink-0"
                                aria-label="أضف إلى السلة"
                              >
                                <Image
                                  src="/assets/add-to-cart-icon.svg"
                                  alt="أضف إلى السلة"
                                  width={27}
                                  height={27}
                                  className="object-contain"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse Packages Button */}
              {(favorites.length > 0 || customBouquets.length > 0) && (
                <div className="flex justify-center mt-8">
                  <Link
                    href="/bouquets"
                    className="bg-[#5f664f] h-[70px] rounded-[10px] px-8 flex items-center justify-center hover:bg-[#4A4E3D] transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <span className="text-white font-bold text-[22px] text-right">
                      تصفح الباقات
                    </span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal معاينة الباقة المخصصة */}
      {showPreview && selectedBouquet && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] px-6 py-4 sticky top-0 z-10 flex items-center justify-between border-b border-[#5A5E4D]/20">
              <h2
                className="text-lg md:text-xl font-bold text-white flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              >
                <Sparkles className="w-5 h-5" />
                باقة مخصصة - {selectedBouquet.occasion}
              </h2>
              <button
                onClick={closePreview}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border border-gray-100">
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
                <div className="space-y-4">
                  {/* السعر */}
                  <div className="bg-gradient-to-br from-[#5A5E4D] to-[#4A4E3D] text-white p-5 rounded-xl text-center shadow-lg">
                    <p
                      className="text-sm mb-1 opacity-90"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                    >
                      السعر الإجمالي
                    </p>
                    <div
                      className="flex items-center justify-center gap-2 text-3xl font-bold text-[#5A5E4D]"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                    >
                      <span>{selectedBouquet.total}</span>
                      <span className="text-2xl">ر.س</span>
                    </div>
                  </div>

                  {/* الزهور */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4
                      className="font-bold text-base text-gray-800 mb-3 flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-[#5A5E4D]" />
                      الزهور ({selectedBouquet.flowers.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
                      {selectedBouquet.flowers.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-white p-3 rounded-lg text-sm shadow-sm border border-gray-100"
                        >
                          <span
                            className="font-semibold text-gray-800"
                            style={{
                              fontFamily: "var(--font-almarai)",
                            }}
                          >
                            {item.flower.name}
                          </span>
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full font-medium">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* الحجم والتغليف */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                        <p
                          className="text-xs text-gray-600 mb-1.5"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          الحجم
                        </p>
                        <p
                          className="font-bold text-sm text-gray-800"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {selectedBouquet.size === "small"
                            ? "صغير"
                            : selectedBouquet.size === "medium"
                              ? "متوسط"
                              : "كبير"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                        <p
                          className="text-xs text-gray-600 mb-1.5"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          التغليف
                        </p>
                        <p
                          className="font-bold text-sm text-gray-800"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {selectedBouquet.style === "classic"
                            ? "كلاسيكي"
                            : selectedBouquet.style === "premium"
                              ? "فاخر"
                              : selectedBouquet.style === "gift"
                                ? "هدية"
                                : "صديق للبيئة"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* البطاقة والملاحظات */}
                  {selectedBouquet.cardMessage && (
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-4 rounded-xl border border-pink-200/50">
                      <h5
                        className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        <Heart className="w-4 h-4 text-pink-500" />
                        رسالة البطاقة
                      </h5>
                      <p
                        className="text-gray-700 text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        {selectedBouquet.cardMessage}
                      </p>
                    </div>
                  )}

                  {selectedBouquet.notes && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                      <h5
                        className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        ملاحظات
                      </h5>
                      <p
                        className="text-gray-700 text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                      >
                        {selectedBouquet.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => handleAddToCart(selectedBouquet)}
                  className="flex items-center justify-center gap-2 bg-[#5A5E4D] text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  أضف إلى السلة
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      editCustomBouquet(selectedBouquet);
                      closePreview();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#5A5E4D]/10 text-[#5A5E4D] py-3 px-6 rounded-xl text-sm font-semibold hover:bg-[#5A5E4D]/20 transition-all duration-300 active:scale-95"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    تعديل
                  </button>
                  <button
                    onClick={() => {
                      removeCustomBouquet(selectedBouquet.id);
                      closePreview();
                    }}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-6 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 active:scale-95"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
