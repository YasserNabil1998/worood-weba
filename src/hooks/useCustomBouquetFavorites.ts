"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";
import type { CustomBouquet } from "@/types/favorites";
import { useCart } from "./useCart";
import { useNotification } from "@/providers/notification-provider";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { CART_ROUTES } from "@/constants/cart";
import { logError } from "@/lib/logger";

export function useCustomBouquetFavorites() {
  const router = useRouter();
  const [customBouquets, setCustomBouquets] = useState<CustomBouquet[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();

  // تحميل التصاميم المخصصة
  const loadCustomBouquets = useCallback(() => {
    try {
      const stored = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);
      setCustomBouquets(stored);
    } catch (error) {
      logError("خطأ في تحميل التصاميم المخصصة", error);
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

  const addToFavorites = useCallback(
    (bouquet: CustomBouquet) => {
      // التحقق من تسجيل الدخول قبل إضافة للمفضلة
      if (
        !requireAuth(
          "addCustomBouquetToFavorites",
          bouquet,
          "يجب تسجيل الدخول لإضافة الباقة إلى المفضلة"
        )
      ) {
        return false;
      }

      const current = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);
      const exists = current.some((b) => b.id === bouquet.id);

      if (!exists) {
        const updated = [...current, bouquet];
        storage.set(STORAGE_KEYS.BOUQUET_FAVORITES, updated);
        window.dispatchEvent(new CustomEvent("favoritesUpdated"));
        return true;
      }
      return false;
    },
    [requireAuth]
  );

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

        // التحقق من تسجيل الدخول قبل إضافة للسلة
        if (
          !requireAuth(
            "addCustomBouquetToCart",
            cartItem,
            "يجب تسجيل الدخول لإضافة الباقة إلى السلة"
          )
        ) {
          return false;
        }

        addItem(cartItem);
        showNotification("تم إضافة الباقة إلى السلة!", "success");
        return true;
      } catch (error) {
        logError("خطأ في إضافة الباقة للسلة", error, { bouquetId: bouquet.id });
        showNotification("حدث خطأ في إضافة الباقة إلى السلة", "error");
        return false;
      }
    },
    [addItem, showNotification, requireAuth]
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
        router.push(
          `${CART_ROUTES.CUSTOM}?design=${encodedData}&editFromFavorites=true&favoriteId=${bouquet.id}`
        );
      } catch (error) {
        logError("خطأ في تعديل الباقة", error, { bouquetId: bouquet.id });
        showNotification("حدث خطأ في تعديل الباقة", "error");
      }
    },
    [router, showNotification]
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
