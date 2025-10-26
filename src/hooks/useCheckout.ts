import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS, APP_CONFIG, ARABIC_MONTHS, PAYMENT_METHOD_LABELS } from "@/src/constants";
import { CartItem } from "@/src/@types/checkout/CartItem.type";
import { Order } from "@/src/@types/orders/order.type";
import { 
  Address, 
  PaymentMethod, 
  CheckoutFormData, 
  CheckoutFormErrors,
  CheckoutTotals 
} from "@/src/@types/checkout/CheckoutForm.type";
import { validateCheckoutForm, isFormValid } from "@/src/validations/checkoutValidation";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const checkoutItems = storage.get(STORAGE_KEYS.CHECKOUT_ITEMS, []);
        const safeItems = Array.isArray(checkoutItems) ? checkoutItems : [];

        if (safeItems.length === 0) {
          router.push("/cart");
          return;
        }

        setItems(safeItems);
      } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
        showNotification("خطأ في تحميل المنتجات", "error", 4000);
        router.push("/cart");
      }
    }
  }, [router, showNotification]);

  const totals = useMemo((): CheckoutTotals => {
    const subtotal = items.reduce((s, i) => {
      const itemPrice = i.isCustom ? i.price ?? 0 : i.total ?? i.price ?? 0;
      return s + itemPrice;
    }, 0);
    const vat = Math.round(subtotal * APP_CONFIG.VAT_RATE);
    const grand = subtotal + vat;

    return { subtotal, vat, grand };
  }, [items]);

  const generateOrderNumber = useCallback((): string => {
    const year = new Date().getFullYear();
    const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
    const orderCount = existingOrders.length + 1;
    return `ORD-${year}-${String(orderCount).padStart(3, "0")}`;
  }, []);

  const getArabicDate = useCallback((): string => {
    const date = new Date();
    return `${date.getDate()} ${ARABIC_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }, []);

  const updateFormData = useCallback((updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    
    if (Object.keys(errors).length > 0) {
      setErrors({ address: {} });
    }
  }, [errors]);

  const updateAddress = useCallback((addressUpdates: Partial<Address>) => {
    updateFormData({
      address: { ...formData.address, ...addressUpdates }
    });
  }, [formData.address, updateFormData]);

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
      const orderId = Date.now().toString();
      const orderNumber = generateOrderNumber();
      const orderDate = getArabicDate();
      
      const newOrder: Order = {
        id: orderId,
        orderNumber: orderNumber,
        status: "قيد المعالجة",
        statusColor: "bg-orange-100 text-orange-800",
        date: orderDate,
        totalAmount: totals.grand,
        items: items.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          image: item.image || "/images/bouquets/IMG-196.png",
          price: item.total,
          quantity: 1,
          bouquetType: `${item.size} - ${item.style}`,
        })),
        deliveryAddress: `${formData.address.city}، ${formData.address.district}، ${
          formData.address.street
        }${formData.address.landmark ? `، ${formData.address.landmark}` : ""}`,
        phoneNumber: formData.address.phone,
        paymentMethod: PAYMENT_METHOD_LABELS[formData.paymentMethod],
        notes: formData.notes || undefined,
      };

      // حفظ الطلب
      const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      const updatedOrders = [newOrder, ...existingOrders];
      storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

      // تنظيف السلة
      const fullCart = storage.get(STORAGE_KEYS.CART, []);
      const itemIdsToRemove = items.map((item) => item.id);
      const updatedCart = fullCart.filter(
        (cartItem: any) => !itemIdsToRemove.includes(cartItem.id)
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
    totals.grand,
    generateOrderNumber,
    getArabicDate,
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
