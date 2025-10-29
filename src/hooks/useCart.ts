"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { addProductToCart } from "@/src/lib/cartUtils";
import { removeCartItem, updateCartItemQuantity } from "@/src/lib/cartHelpers";
import { CartItem } from "@/src/@types/cart/CartItem.type";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // دالة مساعدة للحصول على السلة بشكل آمن
  const getSafeCart = useCallback((): CartItem[] => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    return Array.isArray(cart) ? cart : [];
  }, []);

  // تحميل السلة
  const loadCart = useCallback(() => {
    const safeCart = getSafeCart();
    setItems(safeCart);
    
    const itemsCount = safeCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = safeCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    
    setTotalItems(itemsCount);
    setTotalPrice(price);
  }, [getSafeCart]);

  // تحميل عند التهيئة
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // الاستماع للتحديثات
  useEffect(() => {
    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);
    
    // storage event يعمل فقط من tabs أخرى، لذلك نستخدم custom event فقط
    // وإضافة listener للـ storage للـ tabs الأخرى
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

  // إضافة منتج
  const addItem = useCallback((item: CartItem) => {
    const safeCart = getSafeCart();
    const { cart: updatedCart } = addProductToCart(safeCart, item);
    
    storage.set(STORAGE_KEYS.CART, updatedCart);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [getSafeCart]);

  // حذف منتج
  const removeItem = useCallback((id: string | number) => {
    const safeCart = getSafeCart();
    const updated = removeCartItem(safeCart, id);
    
    storage.set(STORAGE_KEYS.CART, updated);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [getSafeCart]);

  // تحديث الكمية
  const updateQuantity = useCallback((id: string | number, quantity: number) => {
    const safeCart = getSafeCart();
    
    try {
      const updated = updateCartItemQuantity(safeCart, id, quantity);
      storage.set(STORAGE_KEYS.CART, updated);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      // معالجة الخطأ إذا كانت الكمية غير صالحة
      console.error("Error updating quantity:", error);
    }
  }, [getSafeCart]);

  // مسح السلة
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

