"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import type { BouquetItem } from "@/types/bouquets";
import { defaultBouquets } from "@/content/featured-bouquets";

// Types
export interface FilterOptions {
  types: Array<{ key: string; label: string }>;
  priceRanges: Array<{ key: string; label: string; min?: number; max?: number }>;
  occasions: Array<{ key: string; label: string }>;
  colors: Array<{ key: string; label: string; hex: string }>;
}

export interface FilterCriteria {
  type?: string;
  priceRange?: string;
  occasion?: string;
  color?: string;
}

interface BouquetsState {
  // Data
  bouquets: BouquetItem[];
  filters: FilterOptions | null;
  filteredBouquets: BouquetItem[];

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchBouquets: () => Promise<void>;
  fetchFilters: () => Promise<void>;
  fetchFilteredBouquets: (filters: FilterCriteria) => Promise<void>;
  resetFilters: () => Promise<void>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useBouquetsStore = create<BouquetsState>()(
  persist(
    (set, get) => ({
      // Initial state - use default bouquets data
      bouquets: defaultBouquets,
      filters: null,
      filteredBouquets: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch all bouquets
      fetchBouquets: async () => {
        // TODO: Implement API call here
        // For now, use default bouquets if store is empty
        if (get().bouquets.length === 0) {
          set({ bouquets: defaultBouquets, isLoading: false, error: null });
        } else {
          set({ isLoading: false, error: null });
        }
      },

      // Fetch filter options
      fetchFilters: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch filtered bouquets
      fetchFilteredBouquets: async (filters: FilterCriteria) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Reset filters and fetch all bouquets
      resetFilters: async () => {
        set({ filteredBouquets: [] });
        await get().fetchBouquets();
      },
    }),
    {
      name: STORAGE_KEYS.BOUQUETS_STORE || "bouquetsStore",
      partialize: (state) => ({
        bouquets: state.bouquets,
        filters: state.filters,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
