import { useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useNotification } from "@/providers/notification-provider";
import { STORAGE_KEYS, APP_CONFIG } from "@/constants";
import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/orders";
import type { CheckoutTotals } from "@/types/checkout";
import { validateCheckoutForm, isFormValid } from "@/validations/checkoutValidation";
import { createOrderFromCheckoutItems } from "@/lib/utils/orders";
import { handleAndLogError } from "@/lib/errors";
import { ErrorCode } from "@/lib/errors/errorTypes";
import { getItemPrice } from "@/lib/utils/cart";
import { storage } from "@/lib/utils";
import { useCartStore, useCheckoutStore } from "@/stores";

export function useCheckout() {
  const { showNotification } = useNotification();
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const setCartItems = useCartStore((state) => state.setItems);

  // Checkout store - using single selector with useShallow to avoid multiple subscriptions and unnecessary re-renders
  const {
    checkoutItems,
    formData,
    errors,
    isLoading,
    isSubmitting,
    setCheckoutItems,
    updateFormData,
    updateAddress,
    setErrors,
    setIsLoading,
    setIsSubmitting,
    initializeCheckout,
    clearCheckout,
  } = useCheckoutStore(
    useShallow((state) => ({
      checkoutItems: state.checkoutItems,
      formData: state.formData,
      errors: state.errors,
      isLoading: state.isLoading,
      isSubmitting: state.isSubmitting,
      setCheckoutItems: state.setCheckoutItems,
      updateFormData: state.updateFormData,
      updateAddress: state.updateAddress,
      setErrors: state.setErrors,
      setIsLoading: state.setIsLoading,
      setIsSubmitting: state.setIsSubmitting,
      initializeCheckout: state.initializeCheckout,
      clearCheckout: state.clearCheckout,
    }))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

      setIsLoading(true);
    initializeCheckout();

    if (checkoutItems.length === 0) {
          router.push("/cart");
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
  }, [router, initializeCheckout, checkoutItems.length]);

  const totals = useMemo((): CheckoutTotals => {
    const subtotal = checkoutItems.reduce((sum, item) => {
      return sum + getItemPrice(item);
    }, 0);
    const vat = Math.round(subtotal * APP_CONFIG.VAT_RATE);
    const grand = subtotal + vat;

    return { subtotal, vat, grand };
  }, [checkoutItems]);

  const validateForm = useCallback((): boolean => {
    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);
    return isFormValid(validationErrors);
  }, [formData, setErrors]);

  const placeOrder = useCallback(async () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      showNotification("يرجى تصحيح الأخطاء في النموذج", "error", 4000);
      return;
    }

    if (checkoutItems.length === 0) {
      showNotification("السلة فارغة، يرجى إضافة منتجات", "error", 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrder = createOrderFromCheckoutItems(checkoutItems, formData, totals);

      const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      const updatedOrders = [newOrder, ...existingOrders];
      storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

      const itemIdsToRemove = checkoutItems.map((item) => item.id);
      const updatedCart = cartItems.filter(
        (cartItem: CartItem) => !itemIdsToRemove.includes(cartItem.id)
      );
      setCartItems(updatedCart);

      clearCheckout();

      showNotification("تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا", "success", 4000);

      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } catch (error) {
      handleAndLogError(error, "خطأ في تأكيد الطلب", ErrorCode.CHECKOUT_SUBMIT_ERROR, {
        itemsCount: checkoutItems.length,
        totals,
      });
      showNotification("حدث خطأ في تأكيد الطلب، يرجى المحاولة مرة أخرى", "error", 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    validateForm,
    checkoutItems,
    formData,
    totals,
    showNotification,
    router,
    cartItems,
    setCartItems,
    clearCheckout,
    setIsSubmitting,
  ]);

  return {
    // State
    items: checkoutItems,
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
