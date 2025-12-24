"use client";

import { useShallow } from "zustand/react/shallow";
import type { BouquetItem } from "@/types/bouquets";
import { useFavoritesStore } from "@/stores";

export function useFavorites() {
  // useShallow يمنع re-renders غير ضرورية عند تحديث أجزاء أخرى من الـ store
  // بدونه، أي تغيير في الـ store سيؤدي لإعادة render كامل للـ component حتى لو لم تتغير القيم المطلوبة
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

  // نتحقق من window وhydration لتجنب hydration mismatch بين الخادم والعميل
  // Next.js يشتكي من اختلاف HTML بين SSR والـ client render، لذا نبدأ بنفس القيمة (false) دائماً
  const isFavorite = (id: number) => {
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
