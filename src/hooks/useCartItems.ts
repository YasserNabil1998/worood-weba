/**
 * useCartItems Hook
 * Hook لإدارة عناصر السلة
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import {
  updateCartItemQuantity,
  removeCartItem,
  createCustomBouquetEditData,
  getItemId,
} from "@/src/lib/cartHelpers";
import { handleAndLogError } from "@/src/lib/errors";
import { ErrorCode } from "@/src/lib/errors/errorTypes";
import { CART_ROUTES } from "@/src/constants/cart";

interface UseCartItemsReturn {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
  updateItemQuantity: (itemId: string | number, newQuantity: number) => void;
  removeItem: (itemId: string | number) => void;
  editItem: (item: CartItem) => void;
  refreshCart: () => void;
}

/**
 * Hook لإدارة عناصر السلة
 */
export function useCartItems(): UseCartItemsReturn {
  const router = useRouter();
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
      const error = err instanceof Error ? err : new Error("Failed to load cart");
      setError(error);
      handleAndLogError(err, "Error loading cart", ErrorCode.CART_LOAD_ERROR);
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
      const error = err instanceof Error ? err : new Error("Failed to save cart");
      setError(error);
      handleAndLogError(err, "Error saving cart", ErrorCode.CART_SAVE_ERROR, {
        itemsCount: updatedItems.length,
      });
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
        const error = err instanceof Error ? err : new Error("Failed to update quantity");
        setError(error);
        handleAndLogError(err, "Error updating quantity", ErrorCode.CART_INVALID_QUANTITY, {
          itemId,
          newQuantity,
        });
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
        const error = err instanceof Error ? err : new Error("Failed to remove item");
        setError(error);
        handleAndLogError(err, "Error removing item", ErrorCode.CART_ITEM_NOT_FOUND, { itemId });
      }
    },
    [items, saveCart]
  );

  // تعديل باقة مخصصة
  const editItem = useCallback((item: CartItem) => {
    try {
      if (item.isCustom && item.customData) {
        storage.set(STORAGE_KEYS.EDIT_ITEM_ID, item.id.toString());

        const editData = createCustomBouquetEditData(item);
        const encodedData = encodeURIComponent(JSON.stringify(editData));
        router.push(`${CART_ROUTES.CUSTOM}?design=${encodedData}&edit=true`);
        return;
      }

      const itemIdentifier = (item.uniqueKey || item.id)?.toString();
      if (!itemIdentifier) {
        throw new Error("Item identifier is missing");
      }

      storage.set(STORAGE_KEYS.EDIT_ITEM_ID, itemIdentifier);
      storage.set(STORAGE_KEYS.EDIT_ITEM_DATA, {
        id: item.id,
        uniqueKey: item.uniqueKey,
        size: item.size,
        color: item.color,
        colorValue: item.colorValue,
        colorHex: item.color,
        colorLabel: item.colorLabel,
        addCard: item.addCard ?? false,
        cardMessage: item.cardMessage ?? "",
        addChocolate: item.addChocolate ?? false,
        giftWrap: item.giftWrap ?? false,
        quantity: item.quantity ?? 1,
      });

      router.push(`${CART_ROUTES.PRODUCT}/${item.id}?edit=true`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to edit item");
      setError(error);
      handleAndLogError(err, "Error editing item", ErrorCode.CART_ITEM_NOT_FOUND, {
        itemId: item.id,
        itemTitle: item.title,
      });
    }
  }, [router]);

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
    editItem,
    refreshCart,
  };
}
