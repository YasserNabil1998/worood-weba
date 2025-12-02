"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { addProductToCart } from "@/src/lib/cartUtils";
import { removeCartItem, updateCartItemQuantity } from "@/src/lib/cartHelpers";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { logError } from "@/src/lib/logger";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getSafeCart = useCallback((): CartItem[] => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    return Array.isArray(cart) ? cart : [];
  }, []);

  const loadCart = useCallback(() => {
    const safeCart = getSafeCart();
    setItems(safeCart);

    const { itemsCount, price } = safeCart.reduce(
      (acc, item) => ({
        itemsCount: acc.itemsCount + (item.quantity || 1),
        price: acc.price + (item.price || 0) * (item.quantity || 1),
      }),
      { itemsCount: 0, price: 0 }
    );

    setTotalItems(itemsCount);
    setTotalPrice(price);
  }, [getSafeCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.CART) {
        loadCart();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadCart]);

  const addItem = useCallback(
    (item: CartItem) => {
      const safeCart = getSafeCart();
      const { cart: updatedCart } = addProductToCart(safeCart, item);

      storage.set(STORAGE_KEYS.CART, updatedCart);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    },
    [getSafeCart]
  );

  const removeItem = useCallback(
    (id: string | number) => {
      const safeCart = getSafeCart();
      const updated = removeCartItem(safeCart, id);

      storage.set(STORAGE_KEYS.CART, updated);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    },
    [getSafeCart]
  );

  const updateQuantity = useCallback(
    (id: string | number, quantity: number) => {
      const safeCart = getSafeCart();

      try {
        const updated = updateCartItemQuantity(safeCart, id, quantity);
        storage.set(STORAGE_KEYS.CART, updated);
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      } catch (error) {
        logError("Error updating quantity", error, { id, quantity });
      }
    },
    [getSafeCart]
  );

  const clearCart = useCallback(() => {
    storage.set(STORAGE_KEYS.CART, []);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, []);

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
