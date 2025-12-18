"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import { STORAGE_KEYS } from "@/constants";
import {
  addProductToCart,
  removeCartItem,
  updateCartItemQuantity,
  removeSelectedItems,
  getItemId,
} from "@/lib/utils/cart";
import { logError } from "@/lib/logger";

interface CartStore {
  // State
  items: CartItem[];
  selectedItems: Set<string | number>;
  totalItems: number;
  totalPrice: number;

  // Actions - Cart Items
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
  setItems: (items: CartItem[]) => void;

  // Actions - Selection
  toggleSelectItem: (id: string | number) => void;
  toggleSelectAll: () => void;
  removeSelected: () => void;

  // Computed values
  isAllSelected: () => boolean;
  hasSelection: boolean;
}

// Helper function to calculate totals
function calculateTotals(items: CartItem[]) {
  return items.reduce(
    (acc, item) => ({
      itemsCount: acc.itemsCount + (item.quantity || 1),
      price: acc.price + (item.price || 0) * (item.quantity || 1),
    }),
    { itemsCount: 0, price: 0 }
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      selectedItems: new Set(),
      totalItems: 0,
      totalPrice: 0,

      // Add item to cart
      addItem: (item) => {
        const { items } = get();
        const { cart: updatedCart } = addProductToCart(items, item);
        const { itemsCount, price } = calculateTotals(updatedCart);

        set({
          items: updatedCart,
          totalItems: itemsCount,
          totalPrice: price,
        });
      },

      // Remove item from cart
      removeItem: (id) => {
        const { items, selectedItems } = get();
        const updated = removeCartItem(items, id);
        const { itemsCount, price } = calculateTotals(updated);

        // Remove from selection if selected
        const newSelectedItems = new Set(selectedItems);
        newSelectedItems.delete(id);

        set({
          items: updated,
          selectedItems: newSelectedItems,
          totalItems: itemsCount,
          totalPrice: price,
          hasSelection: newSelectedItems.size > 0,
        });
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        const { items } = get();
        try {
          const updated = updateCartItemQuantity(items, id, quantity);
          const { itemsCount, price } = calculateTotals(updated);

          set({
            items: updated,
            totalItems: itemsCount,
            totalPrice: price,
          });
        } catch (error) {
          logError("Error updating quantity", error, { id, quantity });
        }
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          selectedItems: new Set(),
          totalItems: 0,
          totalPrice: 0,
          hasSelection: false,
        });
      },

      // Refresh cart (recalculate totals)
      refreshCart: () => {
        const { items } = get();
        const { itemsCount, price } = calculateTotals(items);
        set({
          totalItems: itemsCount,
          totalPrice: price,
        });
      },

      // Replace entire items array (used by complex cart operations)
      setItems: (items) => {
        const { itemsCount, price } = calculateTotals(items);
        set({
          items,
          selectedItems: new Set(),
          totalItems: itemsCount,
          totalPrice: price,
          hasSelection: false,
        });
      },

      // Toggle selection of single item
      toggleSelectItem: (id) => {
        const { selectedItems } = get();
        const newSet = new Set(selectedItems);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        set({
          selectedItems: newSet,
          hasSelection: newSet.size > 0,
        });
      },

      // Toggle select all items
      toggleSelectAll: () => {
        const { items, selectedItems } = get();
        const allItemIds = new Set(items.map((item) => getItemId(item)));
        const isAllSelected =
          items.length > 0 && items.every((item) => selectedItems.has(getItemId(item)));

        set({
          selectedItems: isAllSelected ? new Set() : allItemIds,
          hasSelection: !isAllSelected && items.length > 0,
        });
      },

      // Remove selected items
      removeSelected: () => {
        const { items, selectedItems } = get();
        const updated = removeSelectedItems(items, selectedItems);
        const { itemsCount, price } = calculateTotals(updated);

        set({
          items: updated,
          selectedItems: new Set(),
          totalItems: itemsCount,
          totalPrice: price,
          hasSelection: false,
        });
      },

      // Check if all items are selected
      isAllSelected: () => {
        const { items, selectedItems } = get();
        if (items.length === 0) return false;
        return items.every((item) => selectedItems.has(getItemId(item)));
      },

      // Check if any items are selected
      hasSelection: false,
    }),
    {
      name: STORAGE_KEYS.CART,
      // Persist items + computed totals (لا نحتاج selectedItems)
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
      // Custom storage to handle Set serialization وإعادة حساب الإجماليات عند الحاجة
      storage: {
        getItem: (name: string) => {
          if (typeof window === "undefined") return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const parsed = JSON.parse(str);
            const persisted = parsed.state || {};

            // حماية في حال كان التنسيق القديم لا يحوي totals
            const items = Array.isArray(persisted.items) ? persisted.items : [];
            const totals = calculateTotals(items);
            const totalItems =
              typeof persisted.totalItems === "number" ? persisted.totalItems : totals.itemsCount;
            const totalPrice =
              typeof persisted.totalPrice === "number" ? persisted.totalPrice : totals.price;

            return {
              state: {
                ...persisted,
                items,
                totalItems,
                totalPrice,
                selectedItems: new Set(),
                hasSelection: false,
              },
              version: parsed.version,
            };
          } catch {
            return null;
          }
        },
        setItem: (name: string, value: any) => {
          if (typeof window === "undefined") return;
          try {
            const toStore = {
              ...value,
              state: {
                ...value.state,
                selectedItems: [], // لا نُخزن الـ Set
              },
            };
            localStorage.setItem(name, JSON.stringify(toStore));
          } catch (error) {
            logError("Error saving cart to localStorage", error, { name });
          }
        },
        removeItem: (name: string) => {
          if (typeof window === "undefined") return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);
