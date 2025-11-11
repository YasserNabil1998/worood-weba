"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BouquetItem } from "@/src/@types/bouquets/index.type";
import { defaultBouquets } from "../content/featured-bouquets";
import { Heart, ArrowLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNotification } from "../providers/notification-provider";
import { useFavorites } from "../hooks/useFavorites";
import { APP_CONFIG } from "../constants";
import { BEST_SELLER_BADGE } from "../constants/bouquets";
import { QuickAddModal } from "./product";

const normalizeText = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/\s+/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ًٌٍَُِّْ]/g, "")
    .toLowerCase();
};

const getBouquetKey = (bouquet: BouquetItem) => {
  const id = typeof bouquet.id === "number" ? bouquet.id : Number(bouquet.id);
  return String(id);
};

const getBouquetId = (bouquet: BouquetItem) =>
  typeof bouquet.id === "number" ? bouquet.id : Number(bouquet.id);

const getGridColumnsClass = (count: number) => {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
};

type FeaturedBouquetsProps = {
  bouquets?: BouquetItem[];
  isLoading?: boolean;
};

const FeaturedBouquets = ({
  bouquets = defaultBouquets,
  isLoading = false,
}: FeaturedBouquetsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isQuickAddOpen, setQuickAddOpen] = useState(false);
  const [selectedBouquet, setSelectedBouquet] = useState<BouquetItem | null>(null);
  const { showNotification } = useNotification();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const combinedBouquets = useMemo(() => {
    const source = Array.isArray(bouquets) && bouquets.length > 0 ? bouquets : defaultBouquets;
    const map = new Map<string, BouquetItem>();

    source.forEach((bouquet) => {
      const key = getBouquetKey(bouquet);
      if (!map.has(key)) map.set(key, bouquet);
    });

    return Array.from(map.values());
  }, [bouquets]);

  const filteredBouquets = useMemo(() => {
    const target = normalizeText(BEST_SELLER_BADGE);
    return combinedBouquets.filter((bouquet) => {
      const category = normalizeText(bouquet.category);
      const badge = normalizeText(bouquet.badge);
      return category === target || badge === target;
    });
  }, [combinedBouquets]);

  const sliderBouquets = filteredBouquets.length > 0 ? filteredBouquets : combinedBouquets;
  const totalItems = sliderBouquets.length;
  const shouldShowControls = totalItems > visibleCount;

  const computeVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 4;
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(computeVisibleCount());

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [computeVisibleCount]);

  const nextSlide = useCallback(() => {
    if (!shouldShowControls) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [shouldShowControls, totalItems]);

  const prevSlide = useCallback(() => {
    if (!shouldShowControls) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [shouldShowControls, totalItems]);

  useEffect(() => {
    if (!shouldShowControls) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, shouldShowControls]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [visibleCount, totalItems]);

  const displayedBouquets = useMemo(() => {
    if (totalItems === 0) return [];

    const count = Math.min(visibleCount, totalItems);
    return Array.from({ length: count }, (_, idx) => {
      const current = (currentIndex + idx) % totalItems;
      return sliderBouquets[current];
    });
  }, [currentIndex, sliderBouquets, totalItems, visibleCount]);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent, bouquet: BouquetItem) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const bouquetId = getBouquetId(bouquet);
        const isCurrentlyFavorite = isFavorite(bouquetId);

        if (isCurrentlyFavorite) {
          removeFromFavorites(bouquetId);
          showNotification("تم إزالة المنتج من المفضلة", "info");
        } else {
          // تحويل bouquet إلى النوع الصحيح المتوقع من useFavorites
          const favoriteItem = {
            id: bouquetId,
            title: bouquet.title,
            image: bouquet.image,
            price: bouquet.price,
            currency: bouquet.currency,
          };
          addToFavorites(favoriteItem);
          showNotification("تم إضافة المنتج إلى المفضلة ❤️", "success");
        }
      } catch (error) {
        console.error("خطأ في تبديل المفضلة:", error);
        showNotification("حدث خطأ في تحديث المفضلة", "error");
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites, showNotification]
  );

  const openQuickAdd = useCallback((bouquet: BouquetItem) => {
    setSelectedBouquet(bouquet);
    setQuickAddOpen(true);
  }, []);

  const closeQuickAdd = useCallback(() => {
    setQuickAddOpen(false);
    setSelectedBouquet(null);
  }, []);

  const gridColumnsClass = getGridColumnsClass(visibleCount);

  return (
    <>
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3319] mb-2">
                الباقات الأكثر طلباً
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-normal text-[#5A5E4D]">
                الباقات الأكثر طلباً من عملائنا الكرام
              </p>
            </div>
            <Link
              href="/bouquets"
              className="text-[#5A5E4D] hover:underline text-sm font-semibold cursor-pointer"
            >
              عرض الكل <ArrowLeft className="w-4 h-4 inline mr-1" />
            </Link>
          </div>

          <div className="relative">
            {isLoading ? (
              <div
                className="col-span-full text-center text-gray-600"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                جاري التحميل...
              </div>
            ) : totalItems > 0 ? (
              <>
                <div className="overflow-hidden">
                  <div
                    className={`grid ${gridColumnsClass} gap-3 sm:gap-4 lg:gap-6 justify-items-center`}
                  >
                    {displayedBouquets.map((bouquet) => {
                      const bouquetId = getBouquetId(bouquet);
                      const isBouquetFavorite = isFavorite(bouquetId);

                      return (
                        <Link
                          key={getBouquetKey(bouquet)}
                          href={`/product/${getBouquetId(bouquet)}`}
                          className="group bg-[#F5F3ED] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer max-w-[260px] sm:max-w-[270px] md:max-w-[280px] w-full"
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={bouquet.image}
                              alt={bouquet.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              loading="lazy"
                            />
                            {/* زر المفضلة */}
                            <div className="absolute top-3 left-3 z-10">
                              <button
                                onClick={(e) => toggleFavorite(e, bouquet)}
                                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full backdrop-blur flex items-center justify-center shadow transition-all duration-300 hover:scale-110 cursor-pointer ${
                                  isBouquetFavorite
                                    ? "bg-[#5A5E4D] text-white"
                                    : "bg-white/90 text-gray-700 hover:bg-[#5A5E4D] hover:text-white"
                                }`}
                              >
                                <Heart
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    isBouquetFavorite ? "text-white" : "text-gray-700"
                                  }`}
                                />
                              </button>
                            </div>

                            {bouquet.badge && (
                              <span
                                className="absolute top-3 right-3 bg-white/90 text-[#2D3319] text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow"
                                style={{ fontFamily: "var(--font-almarai)" }}
                              >
                                {bouquet.badge}
                              </span>
                            )}
                          </div>
                          <div className="p-3 sm:p-4 flex flex-col flex-1">
                            <div className="flex items-center justify-start gap-1.5 mb-2">
                              <span
                                className="text-xl sm:text-2xl font-bold text-[#5A5E4D]"
                                style={{
                                  fontFamily: "var(--font-almarai)",
                                }}
                              >
                                {bouquet.price}
                              </span>
                              <span
                                className="text-sm sm:text-base text-[#5A5E4D]"
                                style={{
                                  fontFamily: "var(--font-almarai)",
                                }}
                              >
                                ر.س
                              </span>
                            </div>
                            <div className="flex-1 mb-3 sm:mb-4">
                              <h3
                                className="font-bold text-[#2D3319] mb-2 line-clamp-1 text-sm sm:text-base text-right"
                                style={{
                                  fontFamily: "var(--font-almarai)",
                                }}
                                title={bouquet.title}
                              >
                                {bouquet.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 text-right">
                                وصف مختصر للباقة يوضح نوع الورود والألوان المناسبة.
                              </p>
                            </div>
                            <div className="mt-auto">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openQuickAdd(bouquet);
                                }}
                                className="w-full py-2 sm:py-2.5 rounded-xl text-white font-semibold bg-[#5A5E4D] hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer relative z-10 text-xs sm:text-sm"
                                style={{
                                  fontFamily: "var(--font-almarai)",
                                }}
                              >
                                أضف إلى السلة
                              </button>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {shouldShowControls && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                      aria-label="Previous bouquet"
                    >
                      <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                      aria-label="Next bouquet"
                    >
                      <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div
                className="col-span-full text-center text-gray-600 py-8"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                لا توجد باقات متاحة حالياً
              </div>
            )}
          </div>
        </div>
      </section>

      <QuickAddModal bouquet={selectedBouquet} isOpen={isQuickAddOpen} onClose={closeQuickAdd} />
    </>
  );
};

export default FeaturedBouquets;
