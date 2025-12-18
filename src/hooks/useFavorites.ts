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
  const isFavorite = (id: number) => isBouquetFavorite(id);

  return {
    favorites: bouquets,
    loading: !hydrated,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}
