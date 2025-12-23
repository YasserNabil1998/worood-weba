"use client";

import { useShallow } from "zustand/react/shallow";
import type { BouquetItem } from "@/types/bouquets";
import { useFavoritesStore } from "@/stores";

export function useFavorites() {
  // استخدام useShallow لتقليل الاشتراكات وتحسين الأداء
  const { bouquets, hydrated, addBouquet, removeBouquet, isBouquetFavorite } = useFavoritesStore(
    useShallow((state) => ({
      bouquets: state.bouquets,
      hydrated: state.hydrated,
      addBouquet: state.addBouquet,
      removeBouquet: state.removeBouquet,
      isBouquetFavorite: state.isBouquetFavorite,
    }))
  );

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
