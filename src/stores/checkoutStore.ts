"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import type { CartItem } from "@/types/cart";
import type { Address, CheckoutFormData, CheckoutFormErrors } from "@/types/checkout";
import { storage } from "@/lib/utils";

interface CheckoutState {
  // Data
  checkoutItems: CartItem[];
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;

  // Loading & Submitting
  isLoading: boolean;
  isSubmitting: boolean;

  // Actions
  setCheckoutItems: (items: CartItem[]) => void;
  updateFormData: (updates: Partial<CheckoutFormData>) => void;
  updateAddress: (addressUpdates: Partial<Address>) => void;
  setErrors: (errors: CheckoutFormErrors) => void;
  clearErrors: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  clearCheckout: () => void;
  initializeCheckout: () => void;
}

const defaultFormData: CheckoutFormData = {
  address: {
    recipientName: "",
    city: "",
    district: "",
    street: "",
    landmark: "",
    phone: "",
  },
  notes: "",
  paymentMethod: "mada",
};

const defaultErrors: CheckoutFormErrors = {
  address: {},
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => {
      // Migration: قراءة checkoutItems القديمة من localStorage إذا كانت موجودة
      let initialCheckoutItems: CartItem[] = [];
      if (typeof window !== "undefined") {
        try {
          const oldCheckoutItems = storage.get<CartItem[]>(STORAGE_KEYS.CHECKOUT_ITEMS, []);
          if (oldCheckoutItems.length > 0) {
            initialCheckoutItems = oldCheckoutItems;
          }
        } catch (error) {
          logError("Error migrating old checkout items", error);
        }
      }

      return {
        // Initial state
        checkoutItems: initialCheckoutItems,
        formData: defaultFormData,
        errors: defaultErrors,
        isLoading: false,
        isSubmitting: false,

        // Set checkout items
        setCheckoutItems: (items: CartItem[]) => {
          set({ checkoutItems: items });
        },

        // Update form data
        updateFormData: (updates: Partial<CheckoutFormData>) => {
          set((state) => ({
            formData: { ...state.formData, ...updates },
            errors: {
              address: {},
              general: undefined,
            },
          }));
        },

        // Update address
        updateAddress: (addressUpdates: Partial<Address>) => {
          set((state) => ({
            formData: {
              ...state.formData,
              address: { ...state.formData.address, ...addressUpdates },
            },
            errors: {
              ...state.errors,
              address: {},
            },
          }));
        },

        // Set errors
        setErrors: (errors: CheckoutFormErrors) => {
          set({ errors });
        },

        // Clear errors
        clearErrors: () => {
          set({ errors: defaultErrors });
        },

        // Set loading state
        setIsLoading: (isLoading: boolean) => {
          set({ isLoading });
        },

        // Set submitting state
        setIsSubmitting: (isSubmitting: boolean) => {
          set({ isSubmitting });
        },

        // Clear checkout (reset to initial state)
        clearCheckout: () => {
          set({
            checkoutItems: [],
            formData: defaultFormData,
            errors: defaultErrors,
            isLoading: false,
            isSubmitting: false,
          });
        },

        // Initialize checkout (load from localStorage if needed)
        initializeCheckout: () => {
          if (typeof window === "undefined") return;

          const { checkoutItems } = get();
          if (checkoutItems.length > 0) return; // Already initialized

          try {
            const storedItems = storage.get<CartItem[]>(STORAGE_KEYS.CHECKOUT_ITEMS, []);
            const safeItems = Array.isArray(storedItems) ? storedItems : [];

            const uniqueItems = safeItems.filter(
              (item: CartItem, index: number, self: CartItem[]) =>
                index === self.findIndex((t: CartItem) => t.id === item.id)
            ) as CartItem[];

            if (uniqueItems.length > 0) {
              set({ checkoutItems: uniqueItems });
            }
          } catch (error) {
            logError("Error initializing checkout", error);
          }
        },
      };
    },
    {
      name: STORAGE_KEYS.CHECKOUT_STORE || "checkoutStore",
      partialize: (state) => ({
        checkoutItems: state.checkoutItems,
        formData: state.formData,
        // لا نحفظ errors, isLoading, isSubmitting لأنها حالة مؤقتة
      }),
    }
  )
);
