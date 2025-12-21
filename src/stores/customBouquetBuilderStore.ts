"use client";

import { create } from "zustand";
import type { PackagingType } from "@/types/custom";
import { CUSTOM_BOUQUET_PREVIEW_IMAGE } from "@/constants";

type BouquetSize = "small" | "medium" | "large" | "custom";
type BouquetStyle = "classic" | "premium" | "gift" | "eco";
type DeliveryType = "today" | "scheduled";

interface NotificationState {
  message: string;
  visible: boolean;
}

interface CustomBouquetBuilderState {
  // Flowers and colors
  selectedFlowers: Record<number, number>;
  selectedColors: { [flowerId: string]: number[] };
  expandedFlower: string | null;

  // Size and packaging
  customFlowerCount: number;
  packagingType: PackagingType;
  selectedVase: string;
  size: BouquetSize;
  style: BouquetStyle;

  // Step and customization
  step: 1 | 2 | 3 | 4;
  occasion: string;
  cardMessage: string;
  includeCard: boolean;
  showSuggestions: boolean;
  notes: string;

  // Delivery
  deliveryType: DeliveryType;
  deliveryDate: string;
  deliveryTime: string;

  // UI state
  bouquetImage: string;
  searchQuery: string;
  isAddingToCart: boolean;

  // Notification
  notification: NotificationState;

  // Actions - flowers and colors
  setSelectedFlowers: (
    value: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)
  ) => void;
  setSelectedColors: (
    value:
      | { [flowerId: string]: number[] }
      | ((prev: { [flowerId: string]: number[] }) => { [flowerId: string]: number[] })
  ) => void;
  setExpandedFlower: (value: string | null) => void;

  // Actions - size and packaging
  setCustomFlowerCount: (value: number) => void;
  setPackagingType: (value: PackagingType) => void;
  setSelectedVase: (value: string) => void;
  setSize: (value: BouquetSize) => void;
  setStyle: (value: BouquetStyle) => void;

  // Actions - step and customization
  setStep: (value: 1 | 2 | 3 | 4) => void;
  setOccasion: (value: string) => void;
  setCardMessage: (value: string) => void;
  setIncludeCard: (value: boolean) => void;
  setShowSuggestions: (value: boolean) => void;
  setNotes: (value: string) => void;

  // Actions - delivery
  setDeliveryType: (value: DeliveryType) => void;
  setDeliveryDate: (value: string) => void;
  setDeliveryTime: (value: string) => void;

  // Actions - UI state
  setBouquetImage: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setIsAddingToCart: (value: boolean) => void;

  // Actions - notification
  setNotification: (value: NotificationState) => void;
  showNotification: (message: string) => void;
  reset: () => void;
}

export const useCustomBouquetBuilderStore = create<CustomBouquetBuilderState>()((set) => ({
  // Flowers and colors
  selectedFlowers: {},
  selectedColors: {},
  expandedFlower: null,

  // Size and packaging
  customFlowerCount: 12,
  packagingType: "paper",
  selectedVase: "",
  size: "medium",
  style: "classic",

  // Step and customization
  step: 1,
  occasion: "",
  cardMessage: "",
  includeCard: false,
  showSuggestions: false,
  notes: "",

  // Delivery
  deliveryType: "today",
  deliveryDate: "",
  deliveryTime: "",

  // UI state
  bouquetImage: CUSTOM_BOUQUET_PREVIEW_IMAGE,
  searchQuery: "",
  isAddingToCart: false,

  // Notification
  notification: {
    message: "",
    visible: false,
  },

  // Actions - flowers and colors
  setSelectedFlowers: (value) =>
    set((prev) => ({
      selectedFlowers: typeof value === "function" ? value(prev.selectedFlowers) : value,
    })),
  setSelectedColors: (value) =>
    set((prev) => ({
      selectedColors: typeof value === "function" ? value(prev.selectedColors) : value,
    })),
  setExpandedFlower: (value) => set({ expandedFlower: value }),

  // Actions - size and packaging
  setCustomFlowerCount: (value) => set({ customFlowerCount: value }),
  setPackagingType: (value) => set({ packagingType: value }),
  setSelectedVase: (value) => set({ selectedVase: value }),
  setSize: (value) => set({ size: value }),
  setStyle: (value) => set({ style: value }),

  // Actions - step and customization
  setStep: (value) => set({ step: value }),
  setOccasion: (value) => set({ occasion: value }),
  setCardMessage: (value) => set({ cardMessage: value }),
  setIncludeCard: (value) => set({ includeCard: value }),
  setShowSuggestions: (value) => set({ showSuggestions: value }),
  setNotes: (value) => set({ notes: value }),

  // Actions - delivery
  setDeliveryType: (value) => set({ deliveryType: value }),
  setDeliveryDate: (value) => set({ deliveryDate: value }),
  setDeliveryTime: (value) => set({ deliveryTime: value }),

  // Actions - UI state
  setBouquetImage: (value) => set({ bouquetImage: value }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setIsAddingToCart: (value) => set({ isAddingToCart: value }),

  // Actions - notification
  setNotification: (value) => set({ notification: value }),
  showNotification: (message: string) => {
    set({ notification: { message, visible: true } });
    setTimeout(() => {
      set({ notification: { message: "", visible: false } });
    }, 3000);
  },
  reset: () =>
    set({
      selectedFlowers: {},
      selectedColors: {},
      expandedFlower: null,
      customFlowerCount: 12,
      packagingType: "paper",
      selectedVase: "",
      size: "medium",
      style: "classic",
      step: 1,
      occasion: "",
      cardMessage: "",
      includeCard: false,
      showSuggestions: false,
      notes: "",
      deliveryType: "today",
      deliveryDate: "",
      deliveryTime: "",
      bouquetImage: CUSTOM_BOUQUET_PREVIEW_IMAGE,
      searchQuery: "",
      isAddingToCart: false,
      notification: {
        message: "",
        visible: false,
      },
    }),
}));
