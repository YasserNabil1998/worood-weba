/**
 * useCartSelection Hook
 * Hook لإدارة اختيار المنتجات في السلة
 */

import { useState, useEffect, useCallback } from "react";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { removeSelectedItems, getItemId } from "@/src/lib/cartHelpers";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";

interface UseCartSelectionReturn {
  selectedItems: Set<string | number>;
  toggleSelectItem: (itemId: string | number) => void;
  toggleSelectAll: (items: CartItem[]) => void;
  removeSelected: (items: CartItem[]) => CartItem[];
  isAllSelected: (items: CartItem[]) => boolean;
  hasSelection: boolean;
}

/**
 * Hook لإدارة اختيار المنتجات في السلة
 */
export function useCartSelection(initialItems: CartItem[] = []): UseCartSelectionReturn {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());

  // تحديد جميع العناصر افتراضياً عند التحميل
  useEffect(() => {
    if (initialItems.length > 0 && selectedItems.size === 0) {
      setSelectedItems(new Set(initialItems.map((item) => getItemId(item))));
    }
  }, [initialItems.length]); // Only run when items length changes

  // تحديد/إلغاء تحديد عنصر واحد
  const toggleSelectItem = useCallback((itemId: string | number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // تحديد/إلغاء تحديد الكل
  const toggleSelectAll = useCallback((items: CartItem[]) => {
    setSelectedItems((prev) => {
      const allItemIds = new Set(items.map((item) => getItemId(item)));
      if (prev.size === items.length && items.every((item) => prev.has(getItemId(item)))) {
        // إلغاء تحديد الكل
        return new Set();
      } else {
        // تحديد الكل
        return allItemIds;
      }
    });
  }, []);

  // حذف العناصر المحددة
  const removeSelected = useCallback(
    (items: CartItem[]): CartItem[] => {
      const updatedItems = removeSelectedItems(items, selectedItems);
      setSelectedItems(new Set());

      // حفظ في localStorage
      storage.set(STORAGE_KEYS.CART, updatedItems);
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      return updatedItems;
    },
    [selectedItems]
  );

  // التحقق من تحديد الكل
  const isAllSelected = useCallback(
    (items: CartItem[]): boolean => {
      if (items.length === 0) return false;
      return items.every((item) => selectedItems.has(getItemId(item)));
    },
    [selectedItems]
  );

  // التحقق من وجود عناصر محددة
  const hasSelection = selectedItems.size > 0;

  return {
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    isAllSelected,
    hasSelection,
  };
}
