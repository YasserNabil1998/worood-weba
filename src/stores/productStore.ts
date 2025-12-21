"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

// Types
export interface ProductData {
  id: string;
  title: string;
  description?: string;
  images: string[];
  price: number;
  currency?: string;
}

export interface Size {
  id: string | number;
  name: string;
  price: number;
  available?: boolean;
}

export interface Color {
  id: string | number;
  name: string;
  hex: string;
  available?: boolean;
}

export interface Addon {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  available?: boolean;
}

// Edit Item Data Type
// Note: Addons should come from API via fetchProductOptions and be stored in addons array
// selectedAddonIds contains the IDs of selected addons from the API
export interface EditItemData {
  id: number;
  uniqueKey?: string;
  size?: string;
  color?: string;
  colorValue?: string;
  colorHex?: string;
  colorLabel?: string;
  // Selected addon IDs from API (e.g., ["card", "chocolate", "giftWrap"])
  selectedAddonIds?: (string | number)[];
  // Additional data for addons (e.g., cardMessage for card addon)
  addonData?: {
    cardMessage?: string;
    [key: string]: unknown; // Allow other addon-specific data
  };
  quantity?: number;
  // Legacy fields - kept for backward compatibility, will be removed when API is fully integrated
  /** @deprecated Use selectedAddonIds instead */
  addCard?: boolean;
  /** @deprecated Use addonData.cardMessage instead */
  cardMessage?: string;
  /** @deprecated Use selectedAddonIds instead */
  addChocolate?: boolean;
  /** @deprecated Use selectedAddonIds instead */
  giftWrap?: boolean;
}

interface ProductState {
  // Data
  productData: ProductData | null;
  sizes: Size[];
  colors: Color[];
  addons: Addon[];

  // Edit Item State
  editItemId: string | null;
  editItemData: EditItemData | null;

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchProduct: (productId: string) => Promise<void>;
  fetchProductOptions: (productId: string) => Promise<void>;
  setEditItem: (id: string | null, data: EditItemData | null) => void;
  clearEditItem: () => void;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      // Initial state
      productData: null,
      sizes: [],
      colors: [],
      addons: [],
      editItemId: null,
      editItemData: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch product data
      fetchProduct: async (productId: string) => {
        const { lastFetched, isLoading } = get();

        // Check cache - but also check if it's the same product
        const cachedProduct = get().productData;
        if (
          lastFetched &&
          Date.now() - lastFetched < CACHE_DURATION &&
          cachedProduct &&
          cachedProduct.id === productId
        ) {
          return; // Use cached data
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch product options (sizes, colors, addons)
      fetchProductOptions: async (productId: string) => {
        if (get().sizes.length > 0 && get().colors.length > 0 && get().addons.length > 0) {
          // Check if options are for the same product
          const cachedProduct = get().productData;
          if (cachedProduct && cachedProduct.id === productId) {
            return; // Already loaded for this product
          }
        }

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Set edit item
      setEditItem: (id: string | null, data: EditItemData | null) => {
        set({ editItemId: id, editItemData: data });
      },

      // Clear edit item
      clearEditItem: () => {
        set({ editItemId: null, editItemData: null });
      },
    }),
    {
      name: STORAGE_KEYS.PRODUCT_STORE || "productStore",
      partialize: (state) => ({
        productData: state.productData,
        sizes: state.sizes,
        colors: state.colors,
        addons: state.addons,
        editItemId: state.editItemId,
        editItemData: state.editItemData,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
