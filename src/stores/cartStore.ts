import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { addProductToCart } from "@/src/lib/cartUtils";
import { removeCartItem, updateCartItemQuantity, getItemId } from "@/src/lib/cartHelpers";
import { STORAGE_KEYS } from "@/src/constants";

function setToArray(set: Set<string | number>): (string | number)[] {
  return Array.from(set);
}

function arrayToSet(arr: (string | number)[]): Set<string | number> {
  return new Set(arr);
}

/**
 * تنظيف selectedItems لإزالة IDs غير موجودة في items
 * @param items - عناصر السلة الحالية
 * @param selectedItems - العناصر المحددة
 * @returns Set نظيف يحتوي فقط على IDs موجودة في items
 */
function cleanSelectedItems(
  items: CartItem[],
  selectedItems: Set<string | number>
): Set<string | number> {
  if (items.length === 0) {
    return new Set<string | number>();
  }

  if (selectedItems.size === 0) {
    return new Set<string | number>();
  }

  const itemIds = new Set(items.map((item) => getItemId(item)));

  let allExist = true;
  for (const selectedId of selectedItems) {
    if (!itemIds.has(selectedId)) {
      allExist = false;
      break;
    }
  }

  if (allExist) {
    return selectedItems;
  }

  const cleaned = new Set<string | number>();
  for (const selectedId of selectedItems) {
    if (itemIds.has(selectedId)) {
      cleaned.add(selectedId);
    }
  }

  return cleaned;
}

interface CartState {
  items: CartItem[];
  selectedItems: Set<string | number>;
  checkoutItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  updateItem: (id: string | number, updatedItem: Partial<CartItem>) => void;
  clearCart: () => void;
  toggleSelect: (id: string | number) => void;
  toggleSelectAll: (items: CartItem[]) => void;
  removeSelected: () => void;
  setCheckoutItems: (items: CartItem[]) => void;
  clearCheckoutItems: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

type CartStore = CartState & CartActions;

export const selectTotalItems = (state: CartStore): number => {
  if (state.items.length === 0) {
    return 0;
  }
  return state.items.reduce((total, item) => total + (item.quantity || 1), 0);
};

export const selectTotalPrice = (state: CartStore): number => {
  if (state.items.length === 0) {
    return 0;
  }
  return state.items.reduce((total, item) => {
    const price = item.total || item.price || 0;
    return total + price * (item.quantity || 1);
  }, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedItems: new Set<string | number>(),
      checkoutItems: [],
      isLoading: false,
      error: null,

      addItem: (item) => {
        try {
          if (!item) {
            throw new Error("Invalid item: item is required");
          }
          if (item.id === undefined || item.id === null) {
            throw new Error("Invalid item: item must have an id");
          }

          const currentItems = get().items;
          const currentSelected = get().selectedItems;
          const { cart: updatedCart } = addProductToCart(currentItems, item);
          const cleanedSelected = cleanSelectedItems(updatedCart, currentSelected);

          set((state) => ({
            ...state,
            items: updatedCart,
            selectedItems: cleanedSelected,
            error: null,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to add item to cart";
          set((state) => ({
            ...state,
            error: new Error(errorMessage),
          }));
        }
      },

      removeItem: (id) => {
        try {
          if (id === undefined || id === null) {
            throw new Error("Invalid item id");
          }

          const currentItems = get().items;
          const updatedItems = removeCartItem(currentItems, id);
          const currentSelected = get().selectedItems;
          const updatedSelected = new Set(currentSelected);
          updatedSelected.delete(id);

          set((state) => ({
            ...state,
            items: updatedItems,
            selectedItems: updatedSelected,
            error: null,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to remove item from cart";
          set((state) => ({
            ...state,
            error: new Error(errorMessage),
          }));
        }
      },

      updateQuantity: (id, quantity) => {
        try {
          if (id === undefined || id === null) {
            throw new Error("Invalid item id");
          }
          if (quantity < 1) {
            throw new Error("Quantity must be at least 1");
          }
          if (!Number.isInteger(quantity)) {
            throw new Error("Quantity must be an integer");
          }

          const currentItems = get().items;
          const currentSelected = get().selectedItems;
          const updatedItems = updateCartItemQuantity(currentItems, id, quantity);
          const cleanedSelected = cleanSelectedItems(updatedItems, currentSelected);

          set((state) => ({
            ...state,
            items: updatedItems,
            selectedItems: cleanedSelected,
            error: null,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to update item quantity";
          set((state) => ({
            ...state,
            error: new Error(errorMessage),
          }));
        }
      },

      updateItem: (id, updatedItem) => {
        try {
          if (id === undefined || id === null) {
            throw new Error("Invalid item id");
          }
          if (!updatedItem || typeof updatedItem !== "object") {
            throw new Error("Invalid updated item: must be an object");
          }

          const currentItems = get().items;
          const itemIndex = currentItems.findIndex((item) => {
            const itemId = getItemId(item);
            return itemId === id || itemId.toString() === id.toString();
          });

          if (itemIndex === -1) {
            throw new Error("Item not found in cart");
          }

          const originalItem = currentItems[itemIndex];
          const updatedItems = [...currentItems];
          
          updatedItems[itemIndex] = {
            ...originalItem,
            ...updatedItem,
            id: originalItem.id,
            uniqueKey: originalItem.uniqueKey || updatedItem.uniqueKey,
            customData: updatedItem.customData 
              ? { ...originalItem.customData, ...updatedItem.customData }
              : originalItem.customData,
          };

          const currentSelected = get().selectedItems;
          const cleanedSelected = cleanSelectedItems(updatedItems, currentSelected);

          set((state) => ({
            ...state,
            items: updatedItems,
            selectedItems: cleanedSelected,
            error: null,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to update item";
          set((state) => ({
            ...state,
            error: new Error(errorMessage),
          }));
        }
      },

      clearCart: () => {
        set((state) => ({
          ...state,
          items: [],
          selectedItems: new Set(),
          error: null,
        }));
      },

      toggleSelect: (id) => {
        const currentSelected = get().selectedItems;
        const updatedSelected = new Set(currentSelected);

        if (updatedSelected.has(id)) {
          updatedSelected.delete(id);
        } else {
          updatedSelected.add(id);
        }

        set((state) => ({
          ...state,
          selectedItems: updatedSelected,
        }));
      },

      toggleSelectAll: (items) => {
        if (!items || items.length === 0) {
          set((state) => ({
            ...state,
            selectedItems: new Set<string | number>(),
          }));
          return;
        }

        const currentSelected = get().selectedItems;
        
        const allSelected = items.every((item) => {
          const itemId = getItemId(item);
          return currentSelected.has(itemId);
        });

        const updatedSelected = allSelected
          ? new Set<string | number>()
          : new Set(items.map((item) => getItemId(item)));

        set((state) => ({
          ...state,
          selectedItems: updatedSelected,
        }));
      },

      removeSelected: () => {
        try {
          const currentItems = get().items;
          const currentSelected = get().selectedItems;

          const updatedItems = currentItems.filter((item) => {
            const itemId = getItemId(item);
            return !currentSelected.has(itemId);
          });

          set((state) => ({
            ...state,
            items: updatedItems,
            selectedItems: new Set(),
            error: null,
          }));
        } catch (error) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error("Failed to remove selected items"),
          }));
        }
      },

      setLoading: (loading) => {
        set((state) => ({
          ...state,
          isLoading: loading,
        }));
      },

      setCheckoutItems: (items) => {
        if (!Array.isArray(items)) {
          set((state) => ({
            ...state,
            error: new Error("Invalid checkout items: must be an array"),
          }));
          return;
        }

        set((state) => ({
          ...state,
          checkoutItems: items,
          error: null,
        }));
      },

      clearCheckoutItems: () => {
        set((state) => ({
          ...state,
          checkoutItems: [],
        }));
      },

      setError: (error) => {
        set((state) => ({
          ...state,
          error,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items || [],
        selectedItems: state.selectedItems instanceof Set ? setToArray(state.selectedItems) : [],
        checkoutItems: state.checkoutItems || [],
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          if (state) {
            state.items = [];
            state.selectedItems = new Set<string | number>();
            state.checkoutItems = [];
            state.isLoading = false;
            state.error = error instanceof Error ? error : new Error("Rehydration failed");
          }
          return;
        }

        if (!state) return;

        if (Array.isArray(state.selectedItems)) {
          state.selectedItems = arrayToSet(state.selectedItems);
        } else if (!(state.selectedItems instanceof Set)) {
          state.selectedItems = new Set<string | number>();
        }

        if (!Array.isArray(state.items)) {
          state.items = [];
        }

        if (!Array.isArray(state.checkoutItems)) {
          state.checkoutItems = [];
        }

        state.selectedItems = cleanSelectedItems(state.items, state.selectedItems);
        state.error = null;
        state.isLoading = false;
      },
    }
  )
);
