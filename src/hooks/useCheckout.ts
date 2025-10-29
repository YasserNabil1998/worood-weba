import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS, APP_CONFIG } from "@/src/constants";
import { CartItem } from "@/src/@types/checkout/CartItem.type";
import { Order } from "@/src/@types/orders/order.type";
import { 
  Address, 
  CheckoutFormData, 
  CheckoutFormErrors,
  CheckoutTotals 
} from "@/src/@types/checkout/CheckoutForm.type";
import { validateCheckoutForm, isFormValid } from "@/src/validations/checkoutValidation";
import { createOrderFromCheckoutItems } from "@/src/lib/ordersHelpers";

/**
 * حساب سعر عنصر checkout
 */
function getCheckoutItemPrice(item: CartItem): number {
  if (item.isCustom) {
    return item.price ?? 0;
  }
  return item.total ?? item.price ?? 0;
}

export function useCheckout() {
  const [items, setItems] = useState<CartItem[]>([]);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      try {
        const checkoutItems = storage.get(STORAGE_KEYS.CHECKOUT_ITEMS, []);
        const safeItems = Array.isArray(checkoutItems) ? checkoutItems : [];

        // إزالة العناصر المكررة بناءً على id
        const uniqueItems = safeItems.filter((item: CartItem, index: number, self: CartItem[]) =>
          index === self.findIndex((t: CartItem) => t.id === item.id)
        ) as CartItem[];

        if (uniqueItems.length === 0) {
          router.push("/cart");
          setIsLoading(false);
          return;
        }

        setItems(uniqueItems);
      } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
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
      return sum + getCheckoutItemPrice(item);
    }, 0);
    const vat = Math.round(subtotal * APP_CONFIG.VAT_RATE);
    const grand = subtotal + vat;

    return { subtotal, vat, grand };
  }, [items]);

  const updateFormData = useCallback((updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    
    // مسح الأخطاء عند تحديث البيانات
    setErrors(prev => {
      if (Object.keys(prev.address).length > 0 || prev.general) {
        return { address: {} };
      }
      return prev;
    });
  }, []);

  const updateAddress = useCallback((addressUpdates: Partial<Address>) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, ...addressUpdates }
    }));
    
    // مسح أخطاء العنوان عند التحديث
    setErrors(prev => ({
      ...prev,
      address: {}
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
      // إنشاء الطلب باستخدام الدالة المساعدة
      const newOrder = createOrderFromCheckoutItems(items, formData, totals);

      // حفظ الطلب
      const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      const updatedOrders = [newOrder, ...existingOrders];
      storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

      // تنظيف السلة
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
      console.error("خطأ في تأكيد الطلب:", error);
      showNotification("حدث خطأ في تأكيد الطلب، يرجى المحاولة مرة أخرى", "error", 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    validateForm,
    items,
    formData,
    totals,
    showNotification,
    router,
  ]);

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
