"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { addProductToCart, findProductInCart } from "@/src/lib/cartUtils";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  [key: string]: any;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // تحميل السلة
  const loadCart = useCallback(() => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    // التأكد من أن cart هو مصفوفة
    const safeCart = Array.isArray(cart) ? cart : [];
    setItems(safeCart);
    
    const itemsCount = safeCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = safeCart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    
    setTotalItems(itemsCount);
    setTotalPrice(price);
  }, []);

  // تحميل عند التهيئة
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // الاستماع للتحديثات
  useEffect(() => {
    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    
    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadCart]);

  // إضافة منتج
  const addItem = useCallback((item: CartItem) => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    const safeCart = Array.isArray(cart) ? cart : [];
    
    const { cart: updatedCart } = addProductToCart(safeCart, item);
    
    storage.set(STORAGE_KEYS.CART, updatedCart);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, []);

  // حذف منتج
  const removeItem = useCallback((id: string | number) => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    const safeCart = Array.isArray(cart) ? cart : [];
    
    // البحث عن المنتج باستخدام uniqueKey إذا كان متوفراً، أو id إذا لم يكن
    const updated = safeCart.filter((item) => {
      if (item.uniqueKey) {
        return item.uniqueKey !== id;
      }
      return item.id !== id;
    });
    
    storage.set(STORAGE_KEYS.CART, updated);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, []);

  // تحديث الكمية
  const updateQuantity = useCallback((id: string | number, quantity: number) => {
    const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    const safeCart = Array.isArray(cart) ? cart : [];
    
    // البحث عن المنتج باستخدام uniqueKey أو id
    const item = safeCart.find((i) => {
      if (i.uniqueKey) {
        return i.uniqueKey === id;
      }
      return i.id === id;
    });
    
    if (item) {
      item.quantity = quantity;
      storage.set(STORAGE_KEYS.CART, safeCart);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    }
  }, []);

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

