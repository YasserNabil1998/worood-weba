/**
 * useCartItems Hook
 * Hook لإدارة عناصر السلة
 */

import { useState, useEffect, useCallback } from "react";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import {
  updateCartItemQuantity,
  removeCartItem,
  createCustomBouquetEditData,
  getItemId,
} from "@/src/lib/cartHelpers";
import { CART_ROUTES } from "@/src/constants/cart";

interface UseCartItemsReturn {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
  updateItemQuantity: (itemId: string | number, newQuantity: number) => void;
  removeItem: (itemId: string | number) => void;
  editCustomItem: (item: CartItem) => void;
  refreshCart: () => void;
}

/**
 * Hook لإدارة عناصر السلة
 */
export function useCartItems(): UseCartItemsReturn {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // تحميل السلة من localStorage
  const loadCart = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);
      const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
      setItems(cart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load cart"));
      console.error("Error loading cart:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // تحميل السلة عند التثبيت
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // الاستماع لتحديثات السلة
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [loadCart]);

  // حفظ السلة في localStorage
  const saveCart = useCallback((updatedItems: CartItem[]) => {
    try {
      storage.set(STORAGE_KEYS.CART, updatedItems);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to save cart"));
      console.error("Error saving cart:", err);
    }
  }, []);

  // تحديث الكمية
  const updateItemQuantity = useCallback(
    (itemId: string | number, newQuantity: number) => {
      try {
        const updatedItems = updateCartItemQuantity(items, itemId, newQuantity);
        setItems(updatedItems);
        saveCart(updatedItems);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update quantity"));
        console.error("Error updating quantity:", err);
      }
    },
    [items, saveCart]
  );

  // حذف عنصر
  const removeItem = useCallback(
    (itemId: string | number) => {
      try {
        const updatedItems = removeCartItem(items, itemId);
        setItems(updatedItems);
        saveCart(updatedItems);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to remove item"));
        console.error("Error removing item:", err);
      }
    },
    [items, saveCart]
  );

  // تعديل باقة مخصصة
  const editCustomItem = useCallback((item: CartItem) => {
    try {
      if (!item.isCustom || !item.customData) {
        throw new Error("Item is not a custom bouquet");
      }

      // حفظ معرف العنصر المراد تعديله
      storage.set(STORAGE_KEYS.EDIT_ITEM_ID, item.id.toString());

      // إنشاء البيانات للتعديل
      const editData = createCustomBouquetEditData(item);

      // الانتقال إلى صفحة التنسيق الخاص مع البيانات
      const encodedData = encodeURIComponent(JSON.stringify(editData));
      window.location.href = `${CART_ROUTES.CUSTOM}?design=${encodedData}&edit=true`;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to edit item"));
      console.error("Error editing item:", err);
    }
  }, []);

  // إعادة تحميل السلة
  const refreshCart = useCallback(() => {
    loadCart();
  }, [loadCart]);

  return {
    items,
    isLoading,
    error,
    updateItemQuantity,
    removeItem,
    editCustomItem,
    refreshCart,
  };
}
