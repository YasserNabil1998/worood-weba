"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  password?: string;
  address: {
    city: string;
    district: string;
    street: string;
    landmark?: string;
  };
  address2?: string;
}

export interface SupportData {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface UserOccasion {
  id: string;
  name: string;
  type: string;
  date: string;
  reminder?: boolean;
}

export interface OccasionData {
  name: string;
  type: string;
  date: string;
  reminder?: boolean;
}

export interface OccasionType {
  id: string;
  name: string;
  icon?: string;
}

interface ProfileState {
  // Data
  userData: UserProfile | null;
  supportData: SupportData | null;
  userOccasions: UserOccasion[];
  occasionTypes: OccasionType[];

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchUserData: () => Promise<void>;
  updateUserData: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  fetchSupportData: () => Promise<void>;
  fetchUserOccasions: () => Promise<void>;
  fetchOccasionTypes: () => Promise<void>;
  addOccasion: (occasionData: OccasionData) => Promise<{ success: boolean; error?: string }>;
  editOccasion: (
    occasionId: string,
    occasionData: OccasionData
  ) => Promise<{ success: boolean; error?: string }>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Initial state
      userData: null,
      supportData: null,
      userOccasions: [],
      occasionTypes: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch user data
      fetchUserData: async () => {
        const { lastFetched, isLoading } = get();

        // Check cache
        if (lastFetched && Date.now() - lastFetched < CACHE_DURATION && get().userData) {
          return; // Use cached data
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Update user data
      updateUserData: async (data: Partial<UserProfile>) => {
        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // Update local state
        set({
          userData: { ...get().userData, ...data } as UserProfile | null,
          isLoading: false,
          error: null,
        });

        return { success: true };
      },

      // Fetch support data
      fetchSupportData: async () => {
        const { lastFetched, isLoading } = get();

        // Check cache
        if (lastFetched && Date.now() - lastFetched < CACHE_DURATION && get().supportData) {
          return; // Use cached data
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch user occasions
      fetchUserOccasions: async () => {
        if (get().userOccasions.length > 0) return; // Already loaded

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // import { fetchUserOccasions } from '@/lib/api/profile';
        // const occasions = await fetchUserOccasions();
        // set({ userOccasions: occasions, isLoading: false, error: null });

        set({ isLoading: false, error: null });
      },

      // Fetch occasion types
      fetchOccasionTypes: async () => {
        if (get().occasionTypes.length > 0) return; // Already loaded

        set({ isLoading: true, error: null });

        try {
          // TODO: Implement API call here
          // import { fetchOccasionTypes } from '@/lib/api/profile';
          // const types = await fetchOccasionTypes();
          // set({ occasionTypes: types, isLoading: false, error: null });

          // For now, use API function
          const { fetchOccasionTypes } = await import("@/lib/api/profile");
          const types = await fetchOccasionTypes();
          set({ occasionTypes: types, isLoading: false, error: null });
        } catch (error) {
          logError("Error fetching occasion types", error);
          set({ isLoading: false, error: "فشل جلب أنواع المناسبات" });
        }
      },

      // Add occasion
      addOccasion: async (occasionData: OccasionData) => {
        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // Update local state
        const newOccasion: UserOccasion = {
          id: Date.now().toString(),
          ...occasionData,
        };
        set((state) => ({
          userOccasions: [...state.userOccasions, newOccasion],
          isLoading: false,
          error: null,
        }));

        return { success: true };
      },

      // Edit occasion
      editOccasion: async (occasionId: string, occasionData: OccasionData) => {
        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // Update local state
        set((state) => ({
          userOccasions: state.userOccasions.map((occ) =>
            occ.id === occasionId ? { ...occ, ...occasionData } : occ
          ),
          isLoading: false,
          error: null,
        }));

        return { success: true };
      },
    }),
    {
      name: STORAGE_KEYS.PROFILE_STORE || "profileStore",
      partialize: (state) => ({
        userData: state.userData,
        supportData: state.supportData,
        userOccasions: state.userOccasions,
        occasionTypes: state.occasionTypes,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
