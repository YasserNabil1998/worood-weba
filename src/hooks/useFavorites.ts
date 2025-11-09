"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { BouquetItem } from "@/src/@types/bouquets/index.type";

export function useFavorites() {
  const [favorites, setFavorites] = useState<BouquetItem[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل المفضلة
  const loadFavorites = useCallback(() => {
    try {
      const stored = storage.get<BouquetItem[]>(STORAGE_KEYS.FAVORITES, []);
      setFavorites(stored);
    } catch (error) {
      console.error("خطأ في تحميل المفضلة:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // الاستماع للتحديثات
  useEffect(() => {
    const handleUpdate = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleUpdate);
  }, [loadFavorites]);

  const addToFavorites = useCallback((item: BouquetItem) => {
    const current = storage.get<BouquetItem[]>(STORAGE_KEYS.FAVORITES, []);
    const exists = current.some((fav) => fav.id === item.id);

    if (!exists) {
      const updated = [...current, item];
      storage.set(STORAGE_KEYS.FAVORITES, updated);
      window.dispatchEvent(new CustomEvent("favoritesUpdated"));
      return true;
    }
    return false;
  }, []);

  const removeFromFavorites = useCallback((id: number) => {
    const current = storage.get<BouquetItem[]>(STORAGE_KEYS.FAVORITES, []);
    const updated = current.filter((item) => item.id !== id);

    storage.set(STORAGE_KEYS.FAVORITES, updated);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  }, []);

  const isFavorite = useCallback(
    (id: number): boolean => {
      return favorites.some((item) => item.id === id);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    storage.set(STORAGE_KEYS.FAVORITES, []);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  }, []);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };
}
