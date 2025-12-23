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

      // طباعة تفاصيل الطلب في console
      console.log("========== تفاصيل الطلب ==========");
      console.log("رقم الطلب:", newOrder.orderNumber);
      console.log("التاريخ:", newOrder.date);
      console.log("المجموع الكلي:", newOrder.totalAmount);
      console.log("عنوان التسليم:", newOrder.deliveryAddress);
      console.log("رقم الهاتف:", newOrder.phoneNumber);
      console.log("طريقة الدفع:", newOrder.paymentMethod);
      console.log("\n========== تفاصيل المنتجات ==========");
      newOrder.items.forEach((item, index) => {
        console.log(`\n--- المنتج ${index + 1} ---`);
        console.log("الاسم:", item.name);
        console.log("السعر:", item.price);
        console.log("الكمية:", item.quantity);
        console.log("الصورة:", item.image);
        if (item.bouquetType) console.log("نوع الباقة:", item.bouquetType);
        
        // بيانات الباقة المخصصة
        if (item.customData) {
          console.log("\n📦 بيانات الباقة المخصصة:");
          console.log("  - الزهور:", item.customData.flowers);
          
          // طباعة الألوان بشكل مفصل مع أسماء الألوان
          if (item.customData.colors) {
            console.log("  - الألوان المختارة:");
            
            // خريطة ألوان (من bouquets.json)
            const colorMap: Record<number, { name: string; hex: string }> = {
              1: { name: "أحمر", hex: "#EF4444" },
              2: { name: "برتقالي", hex: "#F97316" },
              3: { name: "أصفر", hex: "#F59E0B" },
              4: { name: "أخضر", hex: "#22C55E" },
              5: { name: "أزرق", hex: "#3B82F6" },
              6: { name: "بنفسجي", hex: "#8B5CF6" },
              7: { name: "وردي", hex: "#EC4899" },
              8: { name: "بيضاء", hex: "#ffffff" },
            };
            
            if (typeof item.customData.colors === 'object' && !Array.isArray(item.customData.colors)) {
              // إذا كانت الألوان object { [flowerId]: colorIds[] }
              Object.entries(item.customData.colors).forEach(([flowerId, colorIds]) => {
                const flower = item.customData?.flowers?.find(f => f.id === Number(flowerId));
                const flowerName = flower?.name || `زهرة ${flowerId}`;
                
                if (Array.isArray(colorIds) && colorIds.length > 0) {
                  const colorNames = colorIds.map((id: number) => {
                    const colorInfo = colorMap[id];
                    return colorInfo ? `${colorInfo.name} (${id})` : `ID: ${id}`;
                  }).join(", ");
                  console.log(`    • ${flowerName} (ID: ${flowerId}):`, colorNames);
                  console.log(`      الألوان: [${colorIds.join(", ")}]`);
                } else {
                  console.log(`    • ${flowerName} (ID: ${flowerId}):`, colorIds);
                }
              });
            } else {
              // إذا كانت array
              console.log("    ", item.customData.colors);
            }
          } else {
            console.log("  - الألوان: غير محدد");
          }
          
          console.log("  - الحجم:", item.customData.size);
          
          // طباعة التغليف بشكل مفصل
          if (item.customData.packaging) {
            console.log("  - التغليف:");
            console.log("    النوع:", item.customData.packaging.type);
            if (item.customData.packaging.style) {
              console.log("    النمط:", item.customData.packaging.style);
            }
            if (item.customData.packaging.vase) {
              console.log("    المزهرية:", item.customData.packaging.vase);
            }
          } else {
            console.log("  - التغليف: غير محدد");
          }
          console.log("  - المناسبة:", item.customData.occasion);
          console.log("  - رسالة البطاقة:", item.customData.cardMessage);
          console.log("  - الملاحظات:", item.customData.notes);
          console.log("  - معلومات التوصيل:", item.customData.deliveryInfo);
        }
        
        // خيارات المنتج العادي
        if (item.size) console.log("الحجم:", item.size);
        if (item.style) console.log("النمط:", item.style);
        if (item.color) console.log("اللون:", item.color, item.colorLabel);
        
        // الإضافات (البنية المرنة)
        if (item.selectedAddonIds && item.selectedAddonIds.length > 0) {
          console.log("الإضافات المختارة (IDs):", item.selectedAddonIds);
        }
        if (item.addonData) {
          console.log("بيانات الإضافات:", item.addonData);
        }
        
        // الحقول القديمة (للتوافق)
        if (item.addCard) console.log("✅ إضافة بطاقة");
        if (item.cardMessage) console.log("  رسالة البطاقة:", item.cardMessage);
        if (item.addChocolate) console.log("✅ إضافة شوكولاتة");
        if (item.giftWrap) console.log("✅ تغليف هدية");
      });
      console.log("\n========== نهاية تفاصيل الطلب ==========\n");

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
