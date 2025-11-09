"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { CustomBouquet } from "@/src/@types/favorites/CustomBouquet.type";
import { useCart } from "./useCart";
import { useNotification } from "@/src/providers/notification-provider";
import { CART_ROUTES } from "@/src/constants/cart";

export function useCustomBouquetFavorites() {
  const [customBouquets, setCustomBouquets] = useState<CustomBouquet[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  // تحميل التصاميم المخصصة
  const loadCustomBouquets = useCallback(() => {
    try {
      const stored = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);
      setCustomBouquets(stored);
    } catch (error) {
      setCustomBouquets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomBouquets();
  }, [loadCustomBouquets]);

  // الاستماع للتحديثات
  useEffect(() => {
    const handleUpdate = () => loadCustomBouquets();
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleUpdate);
  }, [loadCustomBouquets]);

  const addToFavorites = useCallback((bouquet: CustomBouquet) => {
    const current = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);
    const exists = current.some((b) => b.id === bouquet.id);

    if (!exists) {
      const updated = [...current, bouquet];
      storage.set(STORAGE_KEYS.BOUQUET_FAVORITES, updated);
      window.dispatchEvent(new CustomEvent("favoritesUpdated"));
      return true;
    }
    return false;
  }, []);

  const removeFromFavorites = useCallback((id: number) => {
    const current = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);
    const updated = current.filter((b) => b.id !== id);

    storage.set(STORAGE_KEYS.BOUQUET_FAVORITES, updated);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  }, []);

  const addToCart = useCallback(
    (bouquet: CustomBouquet) => {
      try {
        const cartItem = {
          id: Date.now(),
          type: "custom",
          title: `باقة مخصصة - ${bouquet.occasion}`,
          flowers: bouquet.flowers,
          colors: bouquet.colors,
          size: bouquet.size,
          style: bouquet.style,
          occasion: bouquet.occasion,
          cardMessage: bouquet.cardMessage,
          notes: bouquet.notes,
          price: bouquet.total,
          total: bouquet.total,
          image: bouquet.image,
          quantity: 1,
        };

        addItem(cartItem);
        showNotification("تم إضافة الباقة إلى السلة!", "success");
        return true;
      } catch (error) {
        showNotification("حدث خطأ في إضافة الباقة إلى السلة", "error");
        return false;
      }
    },
    [addItem, showNotification]
  );

  const isFavorite = useCallback(
    (id: number): boolean => {
      return customBouquets.some((b) => b.id === id);
    },
    [customBouquets]
  );

  const clearFavorites = useCallback(() => {
    storage.set(STORAGE_KEYS.BOUQUET_FAVORITES, []);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  }, []);

  const editCustomBouquet = useCallback(
    (bouquet: CustomBouquet) => {
      try {
        // إنشاء البيانات للتعديل من الباقة المخصصة في المفضلة
        const editData = {
          flowers:
            bouquet.flowers?.reduce(
              (acc, f) => {
                acc[f.flower.id] = f.quantity;
                return acc;
              },
              {} as Record<string | number, number>
            ) || {},
          colors: bouquet.colors || [],
          size: bouquet.size || "medium",
          style: bouquet.style || "classic",
          occasion: bouquet.occasion || "",
          cardMessage: bouquet.cardMessage || "",
          notes: bouquet.notes || "",
          image: bouquet.image,
        };

        // الانتقال إلى صفحة التنسيق الخاص مع البيانات
        const encodedData = encodeURIComponent(JSON.stringify(editData));
        window.location.href = `${CART_ROUTES.CUSTOM}?design=${encodedData}&editFromFavorites=true&favoriteId=${bouquet.id}`;
      } catch (error) {
        showNotification("حدث خطأ في تعديل الباقة", "error");
      }
    },
    [showNotification]
  );

  return {
    customBouquets,
    loading,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    isFavorite,
    clearFavorites,
    editCustomBouquet,
  };
}
