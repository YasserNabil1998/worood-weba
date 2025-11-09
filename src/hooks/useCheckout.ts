import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS, APP_CONFIG } from "@/src/constants";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { Order } from "@/src/@types/orders/order.type";
import { useCartStore } from "@/src/stores/cartStore";
import { getItemId } from "@/src/lib/cartHelpers";
import {
  Address,
  CheckoutFormData,
  CheckoutFormErrors,
  CheckoutTotals,
} from "@/src/@types/checkout/CheckoutForm.type";
import { validateCheckoutForm, isFormValid } from "@/src/validations/checkoutValidation";
import { createOrderFromCheckoutItems } from "@/src/lib/ordersHelpers";

function getCheckoutItemPrice(item: CartItem): number {
  if (item.isCustom) {
    return item.price ?? 0;
  }
  return item.total ?? item.price ?? 0;
}

export function useCheckout() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    address: {
      city: "",
      district: "",
      street: "",
      landmark: "",
      phone: "",
    },
    notes: "",
    paymentMethod: "mada",
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({
    address: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useNotification();
  const router = useRouter();

  const checkoutItems = useCartStore((state) => state.checkoutItems);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCheckoutItems = useCartStore((state) => state.clearCheckoutItems);

  const items = useMemo(() => {
    if (!Array.isArray(checkoutItems) || checkoutItems.length === 0) {
      return [];
    }

    const uniqueItemsMap = new Map<string | number, CartItem>();
    for (const item of checkoutItems) {
      const itemId = getItemId(item);
      if (!uniqueItemsMap.has(itemId)) {
        uniqueItemsMap.set(itemId, item);
      }
    }

    return Array.from(uniqueItemsMap.values());
  }, [checkoutItems]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      if (items.length === 0) {
        router.push("/cart");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "خطأ في تحميل المنتجات";
      showNotification(errorMessage, "error", 4000);
      router.push("/cart");
      setIsLoading(false);
    }
  }, [items.length, router, showNotification]);

  const totals = useMemo((): CheckoutTotals => {
    const subtotal = items.reduce((sum, item) => {
      return sum + getCheckoutItemPrice(item);
    }, 0);
    const vat = Math.round(subtotal * APP_CONFIG.VAT_RATE);
    const grand = subtotal + vat;

    return { subtotal, vat, grand };
  }, [items]);

  const updateFormData = useCallback((updates: Partial<CheckoutFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      if (Object.keys(prev.address).length > 0 || prev.general) {
        return { address: {} };
      }
      return prev;
    });
  }, []);

  const updateAddress = useCallback((addressUpdates: Partial<Address>) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, ...addressUpdates },
    }));
    setErrors((prev) => ({
      ...prev,
      address: {},
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);
    return isFormValid(validationErrors);
  }, [formData]);

  const placeOrder = useCallback(async () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      showNotification("يرجى تصحيح الأخطاء في النموذج", "error", 4000);
      return;
    }

    if (items.length === 0) {
      showNotification("السلة فارغة، يرجى إضافة منتجات", "error", 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrder = createOrderFromCheckoutItems(items, formData, totals);
      
      const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      if (!Array.isArray(existingOrders)) {
        throw new Error("Invalid orders data in storage");
      }
      const updatedOrders = [newOrder, ...existingOrders];
      storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

      const itemIdsToRemove = items.map((item) => getItemId(item));
      for (const itemId of itemIdsToRemove) {
        removeItem(itemId);
      }

      clearCheckoutItems();

      showNotification("تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا", "success", 4000);

      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "حدث خطأ في تأكيد الطلب، يرجى المحاولة مرة أخرى";
      showNotification(errorMessage, "error", 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, validateForm, items, formData, totals, showNotification, router, removeItem, clearCheckoutItems]);

  return {
    items,
    formData,
    errors,
    isLoading,
    isSubmitting,
    totals,
    updateFormData,
    updateAddress,
    placeOrder,
    validateForm,
  };
}
