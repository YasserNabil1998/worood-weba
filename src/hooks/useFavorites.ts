"use client";

import type { BouquetItem } from "@/types/bouquets";
import { useFavoritesStore } from "@/stores";

export function useFavorites() {
  // استخدام selectors منفصلة لتجنب إنشاء كائن جديد في كل رندر
  const bouquets = useFavoritesStore((state) => state.bouquets);
  const hydrated = useFavoritesStore((state) => state.hydrated);
  const addBouquet = useFavoritesStore((state) => state.addBouquet);
  const removeBouquet = useFavoritesStore((state) => state.removeBouquet);
  const isBouquetFavorite = useFavoritesStore((state) => state.isBouquetFavorite);

  const addToFavorites = (item: BouquetItem) => addBouquet(item);
  const removeFromFavorites = (id: number) => removeBouquet(id);

  // دالة آمنة للتحقق من المفضلة - تعيد false على الخادم أو قبل hydration
  // هذا يضمن أن الخادم والعميل يبدآن بنفس القيمة (false) لتجنب hydration mismatch
  const isFavorite = (id: number) => {
    // على الخادم أو قبل hydration، نعيد false دائماً
    if (typeof window === "undefined" || !hydrated) {
      return false;
    }
    return isBouquetFavorite(id);
  };

  return {
    favorites: bouquets,
    loading: !hydrated,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}
