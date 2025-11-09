"use client";

import { useState } from "react";
import { useNotification } from "../providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  productId: string;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { showNotification } = useNotification();

  const handleToggleFavorite = () => {
    try {
      const favorites = storage.get<string[]>(STORAGE_KEYS.FAVORITES, []);

      if (isFavorited) {
        const updatedFavorites = favorites.filter((id: string) => id !== productId);
        storage.set(STORAGE_KEYS.FAVORITES, updatedFavorites);
      } else {
        favorites.push(productId);
        storage.set(STORAGE_KEYS.FAVORITES, favorites);
      }

      setIsFavorited(!isFavorited);

      // إشعار موحد
      showNotification(
        isFavorited ? "تم إزالة المنتج من المفضلة" : "تم إضافة المنتج إلى المفضلة",
        isFavorited ? "info" : "success"
      );
    } catch (error) {
      console.error("خطأ في تحديث المفضلة:", error);
      showNotification("حدث خطأ في تحديث المفضلة", "error");
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        isFavorited ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"
      }`}
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
