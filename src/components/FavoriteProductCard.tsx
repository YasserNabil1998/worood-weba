"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Heart } from "lucide-react";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { QuickAddModal } from "@/src/components/product";
import { useFavorites } from "@/src/hooks/useFavorites";
import { useNotification } from "@/src/providers/notification-provider";
import { fontStyle } from "@/src/lib/styles";

interface FavoriteProductCardProps {
  item: BouquetItem;
}

export default function FavoriteProductCard({ item }: FavoriteProductCardProps) {
  const [isQuickAddOpen, setQuickAddOpen] = useState(false);
  const { removeFromFavorites } = useFavorites();
  const { showNotification } = useNotification();

  const openQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddOpen(true);
  }, []);

  const closeQuickAdd = useCallback(() => {
    setQuickAddOpen(false);
  }, []);

  const handleRemoveFromFavorites = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const itemId = typeof item.id === "number" ? item.id : Number(item.id);
      removeFromFavorites(itemId);
      showNotification("تم إزالة المنتج من المفضلة", "info");
    },
    [item.id, removeFromFavorites, showNotification]
  );

  return (
    <>
      <div
        className="bg-white border border-[#eae9e9] rounded-[20px] h-[149px] flex overflow-hidden relative w-full"
        dir="rtl"
      >
        {/* Image Section (Right side in RTL) */}
        <div className="relative w-[140px] h-full shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="140px"
            loading="lazy"
          />
          {/* Heart Icon Overlay */}
          <button
            onClick={handleRemoveFromFavorites}
            className="absolute top-2 left-2 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
            dir="rtl"
            aria-label="إزالة من المفضلة"
          >
            <div className="relative w-8 h-8 rounded-full shadow-lg">
              <div className="absolute inset-0 bg-white/80 rounded-full backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-5 h-5" fill="currentColor" style={{ color: "#9F0712" }} />
              </div>
            </div>
          </button>
        </div>

        {/* Content Section (Left side in RTL) */}
        <div className="flex-1 flex flex-col justify-between p-4 pl-5">
          {/* Product Name */}
          <div className="flex items-start justify-start">
            <h3 className="font-bold text-[16px] text-gray-800 text-right leading-[24px]" style={fontStyle}>
              {item.title}
            </h3>
          </div>

          {/* Price and Add to Cart Button */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <span className="text-[16px] font-bold text-[#3c3d39] text-right whitespace-nowrap" style={fontStyle}>
              {item.price} ر.س
            </span>
            <button
              onClick={openQuickAdd}
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
      <QuickAddModal bouquet={item} isOpen={isQuickAddOpen} onClose={closeQuickAdd} />
    </>
  );
}
