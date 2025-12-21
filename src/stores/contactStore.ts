"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

// Types
export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  socialMedia?: Array<{
    name: string;
    icon: string;
    href: string;
  }>;
}

export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
}

export interface MessageData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface ContactState {
  // Data
  contactInfo: ContactInfo | null;
  faqs: FAQ[];

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchContactInfo: () => Promise<void>;
  fetchFAQs: () => Promise<void>;
  sendMessage: (messageData: MessageData) => Promise<{ success: boolean; error?: string }>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      // Initial state
      contactInfo: null,
      faqs: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      // Fetch contact info
      fetchContactInfo: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Fetch FAQs
      fetchFAQs: async () => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
      },

      // Send message
      sendMessage: async (messageData: MessageData) => {
        // TODO: Implement API call here
        set({ isLoading: false, error: null });
        return { success: true };
      },
    }),
    {
      name: STORAGE_KEYS.CONTACT_STORE || "contactStore",
      partialize: (state) => ({
        contactInfo: state.contactInfo,
        faqs: state.faqs,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
