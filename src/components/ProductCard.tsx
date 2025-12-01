"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Heart } from "lucide-react";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { useNotification } from "@/src/providers/notification-provider";
import { useFavorites } from "@/src/hooks/useFavorites";
import { QuickAddModal } from "@/src/components/product";

// Keep ProductItem for backward compatibility
export type ProductItem = BouquetItem;

export default function ProductCard({ item }: { item: BouquetItem }) {
  const { showNotification } = useNotification();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isQuickAddOpen, setQuickAddOpen] = useState(false);

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

  const openQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddOpen(true);
  }, []);

  const closeQuickAdd = useCallback(() => {
    setQuickAddOpen(false);
  }, []);

  return (
    <>
      <Link
        href={`/product/${item.id}`}
        className="bg-white border border-[#a1a1a1] rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full cursor-pointer"
        dir="rtl"
        data-product-card
      >
        <div className="relative h-[222px] overflow-hidden bg-gray-100 rounded-tl-[20px] rounded-tr-[20px]">
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
              className={`h-8 w-8 rounded-full backdrop-blur flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                isCurrentlyFavorite
                  ? "bg-white/90"
                  : "bg-white/90 text-gray-700"
              }`}
              style={isCurrentlyFavorite ? { color: "#9F0712" } : {}}
              onMouseEnter={(e) => {
                if (!isCurrentlyFavorite) {
                  e.currentTarget.style.color = "#9F0712";
                }
              }}
              onMouseLeave={(e) => {
                if (!isCurrentlyFavorite) {
                  e.currentTarget.style.color = "";
                }
              }}
              aria-label={isCurrentlyFavorite ? `إزالة ${item.title} من المفضلة` : `إضافة ${item.title} إلى المفضلة`}
            >
              <Heart
                className="w-4 h-4 transition-colors"
                fill={isCurrentlyFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
        <div className="bg-white border-t border-[#e0dede] rounded-bl-[20px] rounded-br-[20px] p-4 flex flex-col flex-1 h-[134px]">
          <div className="flex-1 mb-3">
            <h3
              className="font-bold text-responsive-lg text-gray-800 mb-2 line-clamp-1 text-right"
              style={{ fontFamily: "var(--font-almarai)" }}
              title={item.title}
              data-product-title
            >
              {item.title}
            </h3>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center justify-end gap-1.5">
              <span
                className="text-responsive-base font-bold text-[#5a5e4d]"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {item.price} ر.س
              </span>
            </div>
            <button
              onClick={openQuickAdd}
              className="bg-[#5f664f] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#4a4e3d] transition-all duration-300 cursor-pointer shrink-0 relative z-10"
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
      </Link>
      <QuickAddModal bouquet={item} isOpen={isQuickAddOpen} onClose={closeQuickAdd} />
    </>
  );
}
