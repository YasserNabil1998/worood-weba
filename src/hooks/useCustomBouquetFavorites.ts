"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CustomBouquet } from "@/types/favorites";
import { useCartStore, useFavoritesStore } from "@/stores";
import { useNotification } from "@/providers/notification-provider";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { CART_ROUTES } from "@/constants/cart";
import { logError } from "@/lib/logger";

export function useCustomBouquetFavorites() {
  const router = useRouter();
  // استخدام selectors منفصلة لتجنب إنشاء كائن جديد في كل رندر
  const customBouquets = useFavoritesStore((state) => state.customBouquets);
  const hydrated = useFavoritesStore((state) => state.hydrated);
  const addCustomBouquet = useFavoritesStore((state) => state.addCustomBouquet);
  const removeCustomBouquet = useFavoritesStore((state) => state.removeCustomBouquet);
  const isCustomBouquetFavorite = useFavoritesStore((state) => state.isCustomBouquetFavorite);

  const addItem = useCartStore((state) => state.addItem);
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();

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

      const added = addCustomBouquet(bouquet);

      if (added) {
        // تم الإضافة بنجاح
        showNotification("تم حفظ التصميم في المفضلة بنجاح!", "success");
      } else {
        // التصميم موجود مسبقاً في المفضلة
        showNotification("هذا التصميم موجود في المفضلة مسبقاً.", "info");
      }

      return added;
    },
    [requireAuth, addCustomBouquet, showNotification]
  );

  const removeFromFavorites = useCallback(
    (id: number) => {
      removeCustomBouquet(id);
      showNotification("تم إزالة الباقة من المفضلة", "info");
    },
    [removeCustomBouquet, showNotification]
  );

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
      return isCustomBouquetFavorite(id);
    },
    [isCustomBouquetFavorite]
  );

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
    loading: !hydrated,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    isFavorite,
    editCustomBouquet,
  };
}
