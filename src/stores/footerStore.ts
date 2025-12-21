"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

// Types
export interface FooterData {
  links: Array<{
    title: string;
    items: Array<{
      label: string;
      href: string;
    }>;
  }>;
  socialMedia: Array<{
    name: string;
    icon: string;
    href: string;
  }>;
  contactInfo: {
    address?: string;
    phone?: string;
    email?: string;
    workingHours?: string;
  };
  copyright?: string;
}

interface FooterState {
  // Data
  footerData: FooterData | null;
  
  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  
  // Actions
  fetchFooterData: () => Promise<void>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useFooterStore = create<FooterState>()(
  persist(
    (set, get) => ({
      // Initial state
      footerData: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch footer data
      fetchFooterData: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },
    }),
    {
      name: STORAGE_KEYS.FOOTER_STORE || "footerStore",
      partialize: (state) => ({
        footerData: state.footerData,
        lastFetched: state.lastFetched,
      }),
    }
  )
);

