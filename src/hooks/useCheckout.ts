import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/providers/notification-provider";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS, APP_CONFIG } from "@/constants";
import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/orders";
import type {
  Address,
  CheckoutFormData,
  CheckoutFormErrors,
  CheckoutTotals,
} from "@/types/checkout";
import { validateCheckoutForm, isFormValid } from "@/validations/checkoutValidation";
import { createOrderFromCheckoutItems } from "@/lib/utils/orders";
import { handleAndLogError } from "@/lib/errors";
import { ErrorCode } from "@/lib/errors/errorTypes";
import { getItemPrice } from "@/lib/utils/cart";

export function useCheckout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<CheckoutFormData>({
    address: {
      recipientName: "",
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      try {
        const checkoutItems = storage.get(STORAGE_KEYS.CHECKOUT_ITEMS, []);
        const safeItems = Array.isArray(checkoutItems) ? checkoutItems : [];

        const uniqueItems = safeItems.filter(
          (item: CartItem, index: number, self: CartItem[]) =>
            index === self.findIndex((t: CartItem) => t.id === item.id)
        ) as CartItem[];

        if (uniqueItems.length === 0) {
          router.push("/cart");
          setIsLoading(false);
          return;
        }

        setItems(uniqueItems);
      } catch (error) {
        const checkoutItems = storage.get(STORAGE_KEYS.CHECKOUT_ITEMS, []);
        const safeItems = Array.isArray(checkoutItems) ? checkoutItems : [];
        handleAndLogError(error, "خطأ في تحميل المنتجات", ErrorCode.CHECKOUT_VALIDATION_ERROR, {
          checkoutItemsCount: safeItems.length,
        });
        showNotification("خطأ في تحميل المنتجات", "error", 4000);
        router.push("/cart");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [router, showNotification]);

  const totals = useMemo((): CheckoutTotals => {
    const subtotal = items.reduce((sum, item) => {
      return sum + getItemPrice(item);
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
      const updatedOrders = [newOrder, ...existingOrders];
      storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

      const fullCart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
      const itemIdsToRemove = items.map((item) => item.id);
      const updatedCart = fullCart.filter(
        (cartItem: CartItem) => !itemIdsToRemove.includes(cartItem.id)
      );
      storage.set(STORAGE_KEYS.CART, updatedCart);

      storage.remove(STORAGE_KEYS.CHECKOUT_ITEMS);

      window.dispatchEvent(new CustomEvent("cartUpdated"));

      showNotification("تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا", "success", 4000);

      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } catch (error) {
      handleAndLogError(error, "خطأ في تأكيد الطلب", ErrorCode.CHECKOUT_SUBMIT_ERROR, {
        itemsCount: items.length,
        totals,
      });
      showNotification("حدث خطأ في تأكيد الطلب، يرجى المحاولة مرة أخرى", "error", 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, validateForm, items, formData, totals, showNotification, router]);

  return {
    // State
    items,
    formData,
    errors,
    isLoading,
    isSubmitting,
    totals,

    // Actions
    updateFormData,
    updateAddress,
    placeOrder,
    validateForm,
  };
}
