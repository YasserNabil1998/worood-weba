import { useCallback, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS, NAVIGATION_DELAY } from "@/src/constants";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { generateProductKey } from "@/src/lib/cartUtils";
import { useCartStore } from "@/src/stores/cartStore";
import {
  buildCustomData,
  validateAndNormalizePrices,
  type CustomBouquetInput,
  type BouquetDataSources,
} from "@/src/lib/customBouquetBuilders";
import {
  Flower,
  BouquetSize,
  BouquetStyle,
  Vase,
  Occasion,
  DeliveryTime,
  PaymentMethod,
  Config,
  PackagingType,
} from "@/src/@types/custom/index.type";

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
  paymentMethods: PaymentMethod[];
  config: Config;
}

function validateInput(
  totalFlowersCount: number,
  isAddingToCart: boolean
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
    image: input.bouquetImage,
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

function saveAndNavigate(): ReturnType<typeof setTimeout> {
  return setTimeout(() => {
    window.location.href = "/cart";
  }, NAVIGATION_DELAY.CART_REDIRECT);
}

export function useCartOperations(props: UseCartOperationsProps) {
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItem = useCartStore((state) => state.updateItem);

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

    const validation = validateInput(props.totalFlowersCount, props.isAddingToCart);
    if (!validation.isValid) {
      if (validation.message) {
        props.showNotification(validation.message);
      }
      return;
    }

    props.setIsAddingToCart(true);

    try {
      const itemData = buildCartItem(inputData, dataSources);
      const tempItemForKey = { ...itemData, id: 0 };
      const itemWithKey: CartItem = {
        ...itemData,
        id: 0,
        uniqueKey: generateProductKey(tempItemForKey),
      };

      const editItemId = storage.get<string | null>(STORAGE_KEYS.EDIT_ITEM_ID, null);
      const isEditMode = searchParams.get("edit") === "true" && editItemId;

      let message: string;

      if (isEditMode && editItemId) {
        const itemIdToUpdate = typeof editItemId === "string" 
          ? (isNaN(Number(editItemId)) ? editItemId : Number(editItemId))
          : editItemId;
        
        updateItem(itemIdToUpdate, itemWithKey);
        message = "تم تحديث الباقة بنجاح!";
        storage.remove(STORAGE_KEYS.EDIT_ITEM_ID);
      } else {
        addItem(itemWithKey);
        message = "تمت إضافة الباقة إلى السلة بنجاح!";
      }

      timeoutRef.current = saveAndNavigate();

      props.showNotification(message);
      props.saveToHistory();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "حدث خطأ أثناء إضافة الباقة إلى السلة";
      props.showNotification(errorMessage);
      props.setIsAddingToCart(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [
    props.isAddingToCart,
    props.totalFlowersCount,
    props.setIsAddingToCart,
    props.showNotification,
    props.saveToHistory,
    inputData,
    dataSources,
    searchParams,
    addItem,
    removeItem,
    updateItem,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { addToCart };
}
