"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import type { Flower, Color, BouquetSize, Occasion } from "@/types/custom";

// Re-export Color type for convenience
export type { Color } from "@/types/custom";

// Types
export interface PackagingType {
  id: string | number;
  name: string;
  type: "paper" | "vase";
  price?: number;
  image?: string;
  description?: string;
}

export interface FlowerSelection {
  flowerId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  availableColors?: Color[];
}

export interface ColorSelection {
  flowerId: number;
  colorIds: number[];
  colors?: Array<{
    id: number;
    color: string;
    name: string;
  }>;
}

export interface CustomizationData {
  occasion?: string;
  cardMessage?: string;
  notes?: string;
  cardSuggestions?: Record<string, string[]>;
}

export interface DeliveryData {
  deliveryType: string;
  deliveryDate?: string;
  deliveryTime?: string;
}

export interface PreviewData {
  image: string;
  total: number;
  flowers: Array<{
    name: string;
    quantity: number;
    colors?: Array<{
      id: number;
      color: string;
      name: string;
    }>;
  }>;
  size?: string;
  style?: string;
  occasion?: string;
  cardMessage?: string;
  notes?: string;
  deliveryDate?: string;
  deliveryTime?: string;
}

interface CustomBouquetState {
  // Data
  flowers: Flower[];
  flowerColors: Record<number, Color[]>;
  sizes: BouquetSize[];
  packagingTypes: PackagingType[];
  occasions: Occasion[];
  cardSuggestions: Record<string, string[]>;
  previewImage: string | null;
  previewData: PreviewData | null;

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchFlowers: () => Promise<void>;
  fetchFlowerColors: (flowerId: number) => Promise<void>;
  fetchSizes: () => Promise<void>;
  fetchPackagingTypes: () => Promise<void>;
  fetchOccasions: () => Promise<void>;
  fetchCardSuggestions: () => Promise<void>;
  generateBouquetImage: (flowersData: FlowerSelection[]) => Promise<string | null>;
  updateBouquetColors: (colors: ColorSelection[]) => Promise<void>;
  updateCustomization: (data: CustomizationData) => Promise<void>;
  submitDeliveryInfo: (data: DeliveryData) => Promise<{ success: boolean; error?: string }>;
  fetchPreviewData: () => Promise<void>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useCustomBouquetStore = create<CustomBouquetState>()(
  persist(
    (set, get) => ({
      // Initial state
      flowers: [],
      flowerColors: {},
      sizes: [],
      packagingTypes: [],
      occasions: [],
      cardSuggestions: {},
      previewImage: null,
      previewData: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch flowers
      fetchFlowers: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch flower colors
      fetchFlowerColors: async (flowerId: number) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch sizes
      fetchSizes: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch packaging types
      fetchPackagingTypes: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch occasions
      fetchOccasions: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch card suggestions
      fetchCardSuggestions: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Generate bouquet image using AI
      generateBouquetImage: async (flowersData: FlowerSelection[]) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
        return null;
      },

      // Update bouquet colors
      updateBouquetColors: async (colors: ColorSelection[]) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Update customization
      updateCustomization: async (data: CustomizationData) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Submit delivery info
      submitDeliveryInfo: async (data: DeliveryData) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
        return { success: true };
      },

      // Fetch preview data
      fetchPreviewData: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },
    }),
    {
      name: STORAGE_KEYS.CUSTOM_BOUQUET_STORE || "customBouquetStore",
      partialize: (state) => ({
        flowers: state.flowers,
        flowerColors: state.flowerColors,
        sizes: state.sizes,
        packagingTypes: state.packagingTypes,
        occasions: state.occasions,
        cardSuggestions: state.cardSuggestions,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
