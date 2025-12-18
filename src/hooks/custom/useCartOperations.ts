import { useCallback, useMemo, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS, NAVIGATION_DELAY, CUSTOM_BOUQUET_PREVIEW_IMAGE } from "@/constants";
import type { CartItem } from "@/types/cart";
import { generateProductKey } from "@/lib/utils/cart";
import { useCartStore, useCustomBouquetBuilderStore } from "@/stores";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  buildCustomData,
  validateAndNormalizePrices,
  type CustomBouquetInput,
  type BouquetDataSources,
} from "@/lib/customBouquetBuilders";
import { logError } from "@/lib/logger";
import type {
  Flower,
  BouquetSize,
  BouquetStyle,
  Vase,
  Occasion,
  DeliveryTime,
  CustomPaymentMethod,
  Config,
  PackagingType,
} from "@/types/custom";

interface UseCartOperationsProps {
  selectedFlowers: Record<number, number>;
  selectedColors: { [flowerId: string]: number[] };
  size: "small" | "medium" | "large" | "custom";
  style: "classic" | "premium" | "gift" | "eco";
  packagingType: PackagingType;
  selectedVase: string;
  occasion: string;
  cardMessage: string;
  includeCard: boolean;
  notes: string;
  deliveryType: "today" | "scheduled";
  deliveryDate: string;
  deliveryTime: string;
  city: string;
  district: string;
  street: string;
  landmark: string;
  phone: string;
  payMethod: string;
  bouquetImage: string;
  totalFlowersCount: number;
  subtotal: number;
  vat: number;
  total: number;
  isAddingToCart: boolean;
  setIsAddingToCart: (value: boolean) => void;
  showNotification: (message: string) => void;
  saveToHistory: () => void;
  flowers: Flower[];
  bouquetSizes: BouquetSize[];
  bouquetStyles: BouquetStyle[];
  vases: Vase[];
  occasions: Occasion[];
  deliveryTimes: DeliveryTime[];
  paymentMethods: CustomPaymentMethod[];
  config: Config;
}

function validateInput(
  totalFlowersCount: number,
  isAddingToCart: boolean,
  deliveryType: "today" | "scheduled",
  deliveryDate: string,
  deliveryTime: string
): {
  isValid: boolean;
  message?: string;
} {
  if (isAddingToCart) {
    return { isValid: false };
  }

  if (totalFlowersCount === 0) {
    return { isValid: false, message: "يرجى اختيار الزهور أولاً" };
  }

  // التحقق من إدخال معلومات التوصيل حسب نوع التوصيل
  if (deliveryType === "today") {
    // توصيل اليوم: يشترط فقط وقت التوصيل
    if (!deliveryTime) {
      return { isValid: false, message: "يرجى اختيار وقت التوصيل" };
    }
  } else if (deliveryType === "scheduled") {
    // حجز مسبق: يشترط وقت وتاريخ معًا
    if (!deliveryTime || !deliveryDate) {
      return {
        isValid: false,
        message: "يرجى اختيار وقت وتاريخ التوصيل للحجز المسبق",
      };
    }
  }

  return { isValid: true };
}

function buildCartItem(
  input: CustomBouquetInput,
  sources: BouquetDataSources
): Omit<CartItem, "id" | "uniqueKey"> {
  const { subtotal, vat, total } = validateAndNormalizePrices(
    input.subtotal,
    input.vat,
    input.total
  );

  const customData = buildCustomData(input, sources);

  return {
    title: "باقة مخصصة",
    price: total,
    subtotal,
    vat,
    quantity: 1,
    image: input.bouquetImage || CUSTOM_BOUQUET_PREVIEW_IMAGE,
    isCustom: true,
    customData,
  };
}

function handleEditMode(
  cart: CartItem[],
  itemWithKey: CartItem,
  editItemId: string | null
): { cart: CartItem[]; success: boolean; message: string } {
  if (!editItemId) {
    return {
      cart: [...cart, { ...itemWithKey, id: Date.now() }],
      success: true,
      message: "تمت إضافة الباقة إلى السلة بنجاح!",
    };
  }

  const itemIdToEdit = Number(editItemId);
  const itemIndex = cart.findIndex(
    (item) => Number(item.id) === itemIdToEdit || item.id.toString() === editItemId
  );

  if (itemIndex === -1) {
    return {
      cart: [...cart, { ...itemWithKey, id: Date.now() }],
      success: true,
      message: "تمت إضافة الباقة إلى السلة بنجاح!",
    };
  }

  const originalItem = cart[itemIndex];
  const updatedCart = [...cart];
  updatedCart[itemIndex] = {
    ...itemWithKey,
    id: originalItem.id,
    uniqueKey: originalItem.uniqueKey || itemWithKey.uniqueKey,
  };

  return {
    cart: updatedCart,
    success: true,
    message: "تم تحديث الباقة بنجاح!",
  };
}

function handleAddMode(
  cart: CartItem[],
  itemWithKey: CartItem
): { cart: CartItem[]; message: string } {
  const newCart = [...cart, { ...itemWithKey, id: Date.now() }];
  return {
    cart: newCart,
    message: "تمت إضافة الباقة إلى السلة بنجاح!",
  };
}

function saveAndNavigate(router: ReturnType<typeof useRouter>): ReturnType<typeof setTimeout> {
  // Cart is already saved via useCartStore, no need to save again
  return setTimeout(() => {
    router.push("/cart");
  }, NAVIGATION_DELAY.CART_REDIRECT);
}

export function useCartOperations(props: UseCartOperationsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { requireAuth } = useRequireAuth();
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const resetBuilder = useCustomBouquetBuilderStore((state) => state.reset);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dataSources = useMemo<BouquetDataSources>(
    () => ({
      flowers: props.flowers,
      bouquetSizes: props.bouquetSizes,
      bouquetStyles: props.bouquetStyles,
      vases: props.vases,
      occasions: props.occasions,
      deliveryTimes: props.deliveryTimes,
      paymentMethods: props.paymentMethods,
      config: props.config,
    }),
    [
      props.flowers,
      props.bouquetSizes,
      props.bouquetStyles,
      props.vases,
      props.occasions,
      props.deliveryTimes,
      props.paymentMethods,
      props.config,
    ]
  );

  const inputData = useMemo<CustomBouquetInput>(
    () => ({
      selectedFlowers: props.selectedFlowers,
      selectedColors: props.selectedColors,
      size: props.size,
      style: props.style,
      packagingType: props.packagingType,
      selectedVase: props.selectedVase,
      occasion: props.occasion,
      cardMessage: props.cardMessage,
      includeCard: props.includeCard,
      notes: props.notes,
      deliveryDate: props.deliveryDate,
      deliveryTime: props.deliveryTime,
      city: props.city,
      district: props.district,
      street: props.street,
      landmark: props.landmark,
      phone: props.phone,
      payMethod: props.payMethod,
      bouquetImage: props.bouquetImage,
      totalFlowersCount: props.totalFlowersCount,
      subtotal: props.subtotal,
      vat: props.vat,
      total: props.total,
    }),
    [
      props.selectedFlowers,
      props.selectedColors,
      props.size,
      props.style,
      props.packagingType,
      props.selectedVase,
      props.occasion,
      props.cardMessage,
      props.includeCard,
      props.notes,
      props.deliveryDate,
      props.deliveryTime,
      props.city,
      props.district,
      props.street,
      props.landmark,
      props.phone,
      props.payMethod,
      props.bouquetImage,
      props.totalFlowersCount,
      props.subtotal,
      props.vat,
      props.total,
    ]
  );

  const addToCart = useCallback(() => {
    if (typeof window === "undefined") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const validation = validateInput(
      props.totalFlowersCount,
      props.isAddingToCart,
      props.deliveryType,
      props.deliveryDate,
      props.deliveryTime
    );
    if (!validation.isValid) {
      if (validation.message) {
        props.showNotification(validation.message);
      }
      return;
    }

    props.setIsAddingToCart(true);

    try {
      const itemData = buildCartItem(inputData, dataSources);
      // إنشاء كائن مؤقت يحتوي على id لاستخدامه في generateProductKey
      const tempItemForKey = { ...itemData, id: 0 };
      const itemWithKey: CartItem = {
        ...itemData,
        id: 0,
        uniqueKey: generateProductKey(tempItemForKey),
      };

      // التحقق من تسجيل الدخول قبل إضافة الباقة للسلة
      if (
        !requireAuth(
          "addCustomBouquetToCart",
          itemWithKey,
          "يجب تسجيل الدخول لإضافة الباقة إلى السلة"
        )
      ) {
        props.setIsAddingToCart(false);
        return;
      }

      const editItemId = storage.get<string | null>(STORAGE_KEYS.EDIT_ITEM_ID, null);
      const isEditMode = searchParams.get("edit") === "true" && editItemId;

      let updatedCart: CartItem[];
      let message: string;

      if (isEditMode) {
        const editResult = handleEditMode(items, itemWithKey, editItemId);
        updatedCart = editResult.cart;
        message = editResult.message;
        storage.remove(STORAGE_KEYS.EDIT_ITEM_ID);
      } else {
        const addResult = handleAddMode(items, itemWithKey);
        updatedCart = addResult.cart;
        message = addResult.message;
      }

      setItems(updatedCart);

      // تفريغ حالة البنّاء بعد الإضافة أو التعديل
      resetBuilder();

      timeoutRef.current = saveAndNavigate(router);

      props.showNotification(message);
      props.saveToHistory();
    } catch (error) {
      logError("Error adding to cart", error, { totalFlowersCount: props.totalFlowersCount });
      props.showNotification("حدث خطأ أثناء إضافة الباقة إلى السلة");
      props.setIsAddingToCart(false);
    }
  }, [
    props.isAddingToCart,
    props.totalFlowersCount,
    props.setIsAddingToCart,
    props.showNotification,
    props.saveToHistory,
    requireAuth,
    inputData,
    dataSources,
    searchParams,
    router,
    items,
    setItems,
    resetBuilder,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // إعادة ضبط حالة التحميل عند مغادرة الصفحة
      props.setIsAddingToCart(false);
    };
  }, []);

  return { addToCart };
}
