"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { addProductToCart } from "@/src/lib/cartUtils";
import { Heart } from "lucide-react";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { useNotification } from "@/src/providers/notification-provider";
import { useFavorites } from "@/src/hooks/useFavorites";
import { CartItem } from "@/src/@types/cart/CartItem.type";

// Keep ProductItem for backward compatibility
export type ProductItem = BouquetItem;

export default function ProductCard({ item }: { item: BouquetItem }) {
  const { showNotification } = useNotification();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const itemId = typeof item.id === "number" ? item.id : Number(item.id);
  const isCurrentlyFavorite = isFavorite(itemId);

  const toggleFavorite = useCallback(() => {
    try {
      const currentlyFavorite = isFavorite(itemId);
      if (currentlyFavorite) {
        removeFromFavorites(itemId);
        showNotification("تم إزالة المنتج من المفضلة", "info");
      } else {
        // تحويل item إلى النوع الصحيح المتوقع من useFavorites
        const favoriteItem: BouquetItem = {
          ...item,
          id: itemId, // تأكد من أن id هو number
        };
        addToFavorites(favoriteItem);
        showNotification("تم إضافة المنتج إلى المفضلة ❤️", "success");
      }
    } catch (error) {
      console.error("خطأ في تبديل المفضلة:", error);
      showNotification("حدث خطأ في تحديث المفضلة", "error");
    }
  }, [itemId, item, isFavorite, addToFavorites, removeFromFavorites, showNotification]);

  const handleAddToCart = useCallback(() => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);

    // إنشاء منتج مع خصائص افتراضية
    const productToAdd = {
      ...item,
      quantity: 1,
      size: "default", // القيمة الافتراضية للمنتجات البسيطة
      addCard: false,
      addChocolate: false,
      giftWrap: false,
    };

    const { cart: updatedCart, isNew } = addProductToCart(cart, productToAdd);

    storage.set(STORAGE_KEYS.CART, updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));

    const message = isNew ? "تم إضافة المنتج إلى السلة ✓" : "تم زيادة كمية المنتج في السلة ✓";
    showNotification(message, "success");
  }, [item, showNotification]);

  return (
    <Link
      href={`/product/${item.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
      dir="rtl"
      data-product-card
    >
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        />
        <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
            className={`h-8 w-8 rounded-full backdrop-blur flex items-center justify-center shadow transition-all duration-300 hover:scale-110 ${
              isCurrentlyFavorite
                ? "bg-[#5A5E4D] text-white"
                : "bg-white/90 text-gray-700 hover:bg-[#5A5E4D] hover:text-white"
            }`}
          >
            <Heart
              className="w-4 h-4 transition-colors"
              fill={isCurrentlyFavorite ? "currentColor" : "none"}
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
          <div className="flex items-center justify-start mb-3">
            <div className="font-bold text-lg text-[#5A5E4D]">{item.price} ر.س</div>
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
