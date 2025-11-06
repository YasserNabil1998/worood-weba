"use client";

import { useMemo } from "react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/src/stores/cartStore";
import type { CartItem } from "@/src/@types/cart/CartItem.type";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart]
  );
}
