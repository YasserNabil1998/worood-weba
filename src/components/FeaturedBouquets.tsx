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
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    if (!shouldShowControls || isTransitioning) return;
    setIsTransitioning(true);
    // بدء fade out تدريجي
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // الانتقال باقة باقة - تأكد من عدم تجاوز الحد الأقصى
        if (next + visibleCount > totalItems) {
          return 0; // العودة للبداية
        }
        return next;
      });
      // بدء fade in بعد تغيير الصورة
      setTimeout(() => setIsTransitioning(false), 80);
    }, 300); // نصف مدة الانتقال (600ms / 2)
  }, [shouldShowControls, totalItems, visibleCount, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!shouldShowControls || isTransitioning) return;
    setIsTransitioning(true);
    // بدء fade out تدريجي
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const prevIndex = prev - 1;
        // الانتقال باقة باقة - إذا وصلنا للبداية، اذهب للنهاية
        if (prevIndex < 0) {
          return Math.max(0, totalItems - visibleCount);
        }
        return prevIndex;
      });
      // بدء fade in بعد تغيير الصورة
      setTimeout(() => setIsTransitioning(false), 80);
    }, 300); // نصف مدة الانتقال (600ms / 2)
  }, [shouldShowControls, totalItems, visibleCount, isTransitioning]);

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
          const favoriteItem: BouquetItem = {
            ...bouquet,
            id: bouquetId,
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
      <section className="py-6 sm:py-8 md:py-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div className="text-right">
              {/* Title - matching Figma: 30px, Almarai Bold */}
              <div className="text-right">
                <h2 
                  className="text-[28px] sm:text-[30px] font-bold text-black mb-2"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  الباقات الأكثر طلباً
                </h2>
                <p
                  className="text-[20px] sm:text-[23px] md:text-[25px] font-normal text-black"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  الباقات الأكثر طلباً من عملائنا الكرام
                </p>
              </div>
            </div>
            <Link
              href="/bouquets"
              className="text-[#5a5e4d] hover:underline text-[16px] font-normal cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-4 h-4" />
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
                    className={`grid ${gridColumnsClass} gap-3 sm:gap-4 lg:gap-6 justify-items-center transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                      isTransitioning ? "opacity-60" : "opacity-100"
                    }`}
                  >
                    {displayedBouquets.map((bouquet, idx) => {
                      const bouquetId = getBouquetId(bouquet);
                      const isBouquetFavorite = isFavorite(bouquetId);

                      return (
                        <div
                          key={`${getBouquetKey(bouquet)}-${currentIndex}`}
                          className={`group border border-[#a1a1a1] rounded-[20px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-xl flex flex-col cursor-pointer max-w-[294px] w-full bg-white ${
                            !isTransitioning ? "animate-fadeInSlide" : ""
                          }`}
                        >
                          {/* Image Section - matching Figma: 294x222 */}
                          <Link
                            href={`/product/${getBouquetId(bouquet)}`}
                            className="relative aspect-[294/222] overflow-hidden"
                          >
                            <Image
                              src={bouquet.image}
                              alt={bouquet.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-tl-[20px] rounded-tr-[20px]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              loading="lazy"
                            />
                            {/* Favorite Button */}
                            <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleFavorite(e, bouquet);
                                }}
                                className={`h-8 w-8 rounded-full backdrop-blur flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                                  isBouquetFavorite
                                    ? "bg-white/90"
                                    : "bg-white/90 text-gray-700"
                                }`}
                                style={isBouquetFavorite ? { color: "#9F0712" } : {}}
                                onMouseEnter={(e) => {
                                  if (!isBouquetFavorite) {
                                    e.currentTarget.style.color = "#9F0712";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isBouquetFavorite) {
                                    e.currentTarget.style.color = "";
                                  }
                                }}
                                title={isBouquetFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                              >
                                <Heart
                                  className="w-4 h-4 transition-colors"
                                  fill={isBouquetFavorite ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth={2}
                                />
                              </button>
                            </div>
                          </Link>
                          
                          {/* Content Section - matching Figma: white bg, border, rounded bottom */}
                          <div className="bg-white border-t border-[#e0dede] p-4 flex flex-col flex-1 rounded-bl-[20px] rounded-br-[20px]">
                            {/* Title - matching Figma: 18px, Almarai Bold, gray-800 */}
                            <Link
                              href={`/product/${getBouquetId(bouquet)}`}
                              className="mb-3"
                            >
                              <h3
                                className="font-bold text-[18px] text-gray-800 text-right line-clamp-1 mb-3"
                                style={{
                                  fontFamily: "var(--font-almarai)",
                                }}
                                title={bouquet.title}
                              >
                                {bouquet.title}
                              </h3>
                            </Link>
                            
                            {/* Price and Add to Cart Button */}
                            <div className="flex items-center justify-between mt-auto">
                              {/* Price - matching Figma: 16px, Almarai Bold, #5a5e4d */}
                              <div className="flex items-center gap-1">
                                <span
                                  className="text-[16px] font-bold text-[#5a5e4d]"
                                  style={{
                                    fontFamily: "var(--font-almarai)",
                                  }}
                                >
                                  {bouquet.price} ر.س
                                </span>
                              </div>
                              
                              {/* Add to Cart Button - matching Figma: #5f664f bg, rounded-[4px], icon centered */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openQuickAdd(bouquet);
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
                      );
                    })}
                  </div>
                </div>

                {shouldShowControls && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute -left-2 md:-left-6 lg:-left-12 lg:hidden top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                      aria-label="Previous bouquet"
                    >
                      <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute -right-2 md:-right-6 lg:-right-12 lg:hidden top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#2D3319] p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
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
