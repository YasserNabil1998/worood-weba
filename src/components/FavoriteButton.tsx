"use client";

import { useNotification } from "../providers/notification-provider";
import { useFavorites } from "../hooks/useFavorites";
import { Heart } from "lucide-react";
import { BouquetItem } from "@/@types/bouquets/index.type";
import { logError } from "../lib/logger";

interface FavoriteButtonProps {
  productId: string;
  product?: BouquetItem;
}

export default function FavoriteButton({ productId, product }: FavoriteButtonProps) {
  const { showNotification } = useNotification();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const productIdNum = typeof productId === "string" ? Number(productId) : productId;
  const isFavorited = isFavorite(productIdNum);

  const handleToggleFavorite = () => {
    try {
      if (isFavorited) {
        removeFromFavorites(productIdNum);
        showNotification("تم إزالة المنتج من المفضلة", "info");
      } else {
        if (product) {
          const favoriteItem: BouquetItem = {
            ...product,
            id: productIdNum,
          };
          addToFavorites(favoriteItem);
          showNotification("تم إضافة المنتج إلى المفضلة ❤️", "success");
        } else {
          showNotification("يرجى استخدام زر المفضلة في صفحة المنتج", "info");
        }
      }
    } catch (error) {
      logError("خطأ في تحديث المفضلة", error, { productId: productIdNum });
      showNotification("حدث خطأ في تحديث المفضلة", "error");
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        isFavorited ? "" : "text-gray-400"
      }`}
      style={isFavorited ? { color: "#9F0712" } : {}}
      onMouseEnter={(e) => {
        if (!isFavorited) {
          e.currentTarget.style.color = "#9F0712";
        }
      }}
      onMouseLeave={(e) => {
        if (!isFavorited) {
          e.currentTarget.style.color = "";
        }
      }}
      aria-label={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      title={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      <Heart
        className="w-6 h-6"
        fill={isFavorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      />
    </button>
  );
}
