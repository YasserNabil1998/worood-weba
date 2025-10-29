"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BouquetItem } from "@/src/@types/bouquets/index.type";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { defaultBouquets } from "../content/featured-bouquets";
import { Heart, ArrowLeft } from "lucide-react";
import { useNotification } from "../providers/notification-provider";
import { useFavorites } from "../hooks/useFavorites";
import { addProductToCart } from "../lib/cartUtils";
import { storage } from "../lib/utils";
import { STORAGE_KEYS, APP_CONFIG } from "../constants";

type FeaturedBouquetsProps = {
  bouquets?: BouquetItem[];
  isLoading?: boolean;
};

const FeaturedBouquets = ({
  bouquets = defaultBouquets,
  isLoading = false,
}: FeaturedBouquetsProps) => {
  const { showNotification } = useNotification();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const toggleFavorite = useCallback(
    (e: React.MouseEvent, bouquet: BouquetItem) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const bouquetId =
          typeof bouquet.id === "number" ? bouquet.id : Number(bouquet.id);
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

  const handleAddToCart = useCallback(
    (bouquet: BouquetItem) => {
      try {
        const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);

        const productToAdd = {
          id: typeof bouquet.id === "number" ? bouquet.id : Number(bouquet.id),
          title: bouquet.title,
          price: bouquet.price,
          quantity: 1,
          image: bouquet.image,
          size: "default",
          addCard: false,
          addChocolate: false,
          giftWrap: false,
        };

        const { cart: updatedCart, isNew } = addProductToCart(
          cart,
          productToAdd
        );

        storage.set(STORAGE_KEYS.CART, updatedCart);
        window.dispatchEvent(new CustomEvent("cartUpdated"));

        const message = isNew
          ? "تم إضافة المنتج إلى السلة ✓"
          : "تم زيادة كمية المنتج في السلة";
        showNotification(message, "success");
      } catch (error) {
        console.error("خطأ في إضافة المنتج للسلة:", error);
        showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
      }
    },
    [showNotification]
  );

  return (
    <section className="py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
              الباقات الأكثر طلباً
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {isLoading && (
            <div
              className="col-span-full text-center text-gray-600"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              جاري التحميل...
            </div>
          )}
          {bouquets && bouquets.length > 0 ? (
            bouquets.slice(0, 3).map((bouquet) => {
              const bouquetId =
                typeof bouquet.id === "number"
                  ? bouquet.id
                  : Number(bouquet.id);
              const isBouquetFavorite = isFavorite(bouquetId);

              return (
                <Link
                  key={bouquet.id}
                  href={`/product/${bouquet.id}`}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                >
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden group">
                    <Image
                      src={bouquet.image}
                      alt={bouquet.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    {/* زر المفضلة */}
                    <div className="absolute top-2 left-2 z-10">
                      <button
                        onClick={(e) => toggleFavorite(e, bouquet)}
                        className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full backdrop-blur flex items-center justify-center shadow transition-all duration-300 hover:scale-110 cursor-pointer ${
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
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <div className="flex-1 mb-3 sm:mb-4">
                      <h3
                        className="font-bold text-gray-800 mb-2 line-clamp-1 text-sm sm:text-base"
                        style={{
                          fontFamily: "var(--font-almarai)",
                        }}
                        title={bouquet.title}
                      >
                        {bouquet.title}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-gray-600 line-clamp-2">
                        وصف مختصر للباقة يوضح نوع الورود والألوان المناسبة.
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm text-gray-600">
                          السعر:
                        </span>
                        <div className="font-bold text-base sm:text-lg text-[#5A5E4D]">
                          {bouquet.price}{" "}
                          {bouquet.currency || APP_CONFIG.CURRENCY}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(bouquet);
                        }}
                        className="w-full py-2 sm:py-2.5 rounded-md text-white font-semibold bg-[#5A5E4D] hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer relative z-10 text-sm sm:text-base"
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
            })
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
  );
};

export default FeaturedBouquets;
