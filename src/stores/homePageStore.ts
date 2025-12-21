"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import type { BouquetItem } from "@/types/bouquets";

// Types
export interface HeroSlide {
  image: string;
  title: string;
  description: string;
  buttons: Array<{
    text: string;
    href: string;
    type: "primary" | "secondary";
  }>;
}

export interface Occasion {
  id: string | number;
  title: string;
  image: string;
  href?: string;
}

// Re-export BouquetItem from types for API compatibility
export type { BouquetItem };

export interface VaseItem {
  id: string | number;
  title: string;
  image: string;
  price: number;
  currency?: string;
}

export interface Review {
  id: string | number;
  customerName: string;
  customerImage?: string | null;
  rating: number;
  comment?: string;
  date?: string;
  productName?: string;
}

interface HomePageState {
  // Data
  hero: HeroSlide[];
  occasions: Occasion[];
  featuredBouquets: BouquetItem[];
  vases: VaseItem[];
  reviews: Review[];

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchHomePageData: () => Promise<void>;
  subscribeToNewsletter: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useHomePageStore = create<HomePageState>()(
  persist(
    (set, get) => ({
      // Initial state
      hero: [],
      occasions: [],
      featuredBouquets: [],
      vases: [],
      reviews: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch all home page data
      fetchHomePageData: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Subscribe to newsletter
      subscribeToNewsletter: async (email: string) => {
        // TODO: Implement API call here
        return { success: true };
      },
    }),
    {
      name: STORAGE_KEYS.HOME_PAGE_STORE || "homePageStore",
      partialize: (state) => ({
        hero: state.hero,
        occasions: state.occasions,
        featuredBouquets: state.featuredBouquets,
        vases: state.vases,
        reviews: state.reviews,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
