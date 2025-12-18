"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BouquetItem } from "@/types/bouquets";
import type { CustomBouquet } from "@/types/favorites";
import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/lib/utils";
import { logError } from "@/lib/logger";

interface FavoritesStore {
  // Ready-made bouquets favorites
  bouquets: BouquetItem[];

  // Custom bouquets favorites
  customBouquets: CustomBouquet[];

  // Hydration state (for loading indicators)
  hydrated: boolean;

  // Actions - bouquets
  setBouquets: (items: BouquetItem[]) => void;
  addBouquet: (item: BouquetItem) => boolean;
  removeBouquet: (id: number) => void;
  isBouquetFavorite: (id: number) => boolean;

  // Actions - custom bouquets
  setCustomBouquets: (items: CustomBouquet[]) => void;
  addCustomBouquet: (item: CustomBouquet) => boolean;
  removeCustomBouquet: (id: number) => void;
  isCustomBouquetFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      bouquets: [],
      customBouquets: [],
      hydrated: false,

      // Ready-made bouquets
      setBouquets: (items) => set({ bouquets: items }),

      addBouquet: (item) => {
        const { bouquets } = get();
        const exists = bouquets.some((fav) => fav.id === item.id);
        if (exists) return false;

        set({ bouquets: [...bouquets, item] });
        return true;
      },

      removeBouquet: (id) => {
        const { bouquets } = get();
        set({ bouquets: bouquets.filter((item) => item.id !== id) });
      },

      isBouquetFavorite: (id) => {
        const { bouquets } = get();
        return bouquets.some((item) => item.id === id);
      },

      // Custom bouquets
      setCustomBouquets: (items) => set({ customBouquets: items }),

      addCustomBouquet: (item) => {
        const { customBouquets } = get();
        // نمنع تكرار نفس التصميم حتى لو اختلف الـ id
        const exists = customBouquets.some((fav) => {
          const sameFlowers =
            Array.isArray(fav.flowers) &&
            Array.isArray(item.flowers) &&
            fav.flowers.length === item.flowers.length &&
            fav.flowers.every(
              (f, index) =>
                f.flower.id === item.flowers[index].flower.id &&
                f.quantity === item.flowers[index].quantity
            );

          const sameColors =
            Array.isArray(fav.colors) &&
            Array.isArray(item.colors) &&
            fav.colors.length === item.colors.length &&
            fav.colors.every((c, index) => c === item.colors[index]);

          return (
            sameFlowers &&
            sameColors &&
            fav.size === item.size &&
            fav.style === item.style &&
            fav.occasion === item.occasion &&
            (fav.cardMessage || "") === (item.cardMessage || "") &&
            (fav.notes || "") === (item.notes || "") &&
            fav.total === item.total
          );
        });
        if (exists) return false;

        set({ customBouquets: [...customBouquets, item] });
        return true;
      },

      removeCustomBouquet: (id) => {
        const { customBouquets } = get();
        set({ customBouquets: customBouquets.filter((item) => item.id !== id) });
      },

      isCustomBouquetFavorite: (id) => {
        const { customBouquets } = get();
        return customBouquets.some((item) => item.id === id);
      },
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
      // استيراد البيانات القديمة من localStorage إذا لم يكن هناك بيانات مخزنة في Zustand
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          logError("Error rehydrating favorites store", error);
        }

        try {
          if (typeof window !== "undefined" && state) {
            const hasAnyPersisted =
              Array.isArray(state.bouquets) && state.bouquets.length > 0
                ? true
                : Array.isArray(state.customBouquets) && state.customBouquets.length > 0;

            if (!hasAnyPersisted) {
              const legacyBouquets = storage.get<BouquetItem[]>(STORAGE_KEYS.FAVORITES, []);
              const legacyCustom = storage.get<CustomBouquet[]>(STORAGE_KEYS.BOUQUET_FAVORITES, []);

              if (legacyBouquets.length > 0 || legacyCustom.length > 0) {
                // نكتبهم إلى Zustand (سيتم حفظهم بالمفتاح الجديد)
                useFavoritesStore.setState({
                  bouquets: legacyBouquets,
                  customBouquets: legacyCustom,
                  hydrated: true,
                });
                return;
              }
            }
            
            // تعيين hydrated إلى true بعد انتهاء التحميل في جميع الحالات
            state.hydrated = true;
          }
        } catch (e) {
          logError("Error migrating legacy favorites data", e);
          // حتى في حالة الخطأ، نعيين hydrated إلى true لتجنب البقاء في حالة التحميل للأبد
          if (state) {
            state.hydrated = true;
          }
        }
      },
    }
  )
);
