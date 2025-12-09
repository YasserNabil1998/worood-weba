import type { CartItem, CartTotals } from "@/types/cart";
import type { CustomBouquetData } from "@/types/custom";
import { hasUniqueKey, isCustomBouquet } from "@/types/cart";
import { APP_CONFIG } from "@/constants";

export function getItemId(item: CartItem): string | number {
  return hasUniqueKey(item) ? item.uniqueKey : item.id;
}

export function getItemPrice(item: CartItem): number {
  if (isCustomBouquet(item)) {
    return item.price || 0;
  }
  return item.total || item.price || 0;
}

export function getItemTotal(item: CartItem): number {
  const price = getItemPrice(item);
  const quantity = item.quantity || 1;
  return price * quantity;
}

export function calculateCartTotals(
  items: CartItem[],
  selectedItemIds: Set<string | number>
): CartTotals {
  const selectedItems = items.filter((item) => {
    const itemId = getItemId(item);
    return selectedItemIds.has(itemId);
  });

  const { subtotal, totalItemsCount } = selectedItems.reduce(
    (acc, item) => ({
      subtotal: acc.subtotal + getItemTotal(item),
      totalItemsCount: acc.totalItemsCount + (item.quantity || 1),
    }),
    { subtotal: 0, totalItemsCount: 0 }
  );

  const vat = subtotal * APP_CONFIG.VAT_RATE;
  const total = subtotal + vat;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemsCount: selectedItems.length,
    totalItemsCount,
  };
}

/**
 * تحديث كمية عنصر في السلة
 * Update item quantity in cart
 * @throws {Error} إذا كانت الكمية أقل من 1
 */
export function updateCartItemQuantity(
  items: CartItem[],
  itemId: string | number,
  newQuantity: number
): CartItem[] {
  if (newQuantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  return items.map((item) => {
    const currentId = getItemId(item);
    if (currentId === itemId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
}

/**
 * حذف عنصر من السلة
 * Remove item from cart
 */
export function removeCartItem(items: CartItem[], itemId: string | number): CartItem[] {
  return items.filter((item) => {
    const currentId = getItemId(item);
    return currentId !== itemId;
  });
}

/**
 * حذف عناصر محددة من السلة
 * Remove selected items from cart
 */
export function removeSelectedItems(
  items: CartItem[],
  selectedItemIds: Set<string | number>
): CartItem[] {
  return items.filter((item) => {
    const itemId = getItemId(item);
    return !selectedItemIds.has(itemId);
  });
}

/**
 * استخراج بيانات التغليف من الباقة المخصصة
 * Extract packaging data from custom bouquet
 */
function extractPackagingData(customData: {
  packaging?: CustomBouquetData["packaging"];
  style?: CustomBouquetData["style"];
}) {
  let packagingType: "paper" | "vase" = "paper";
  let style = customData.style?.key || "classic";
  let selectedVase = "";

  if (customData.packaging) {
    packagingType = (customData.packaging.type as "paper" | "vase") || "paper";
    if (packagingType === "paper" && customData.packaging.style) {
      style = customData.packaging.style.key || "classic";
    } else if (packagingType === "vase" && customData.packaging.vase) {
      selectedVase = customData.packaging.vase.id || "";
    }
  }

  return { packagingType, style, selectedVase };
}

/**
 * استخراج بيانات التسليم من الباقة المخصصة
 * Extract delivery data from custom bouquet
 */
function extractDeliveryData(deliveryInfo: CustomBouquetData["deliveryInfo"]) {
  return {
    deliveryDate: deliveryInfo?.date || "",
    deliveryTime: deliveryInfo?.time || "",
    city: deliveryInfo?.address?.city || "",
    district: deliveryInfo?.address?.district || "",
    street: deliveryInfo?.address?.street || "",
    landmark: deliveryInfo?.address?.landmark || "",
    phone: deliveryInfo?.phone || "",
    payMethod: deliveryInfo?.paymentMethod || "",
  };
}

/**
 * إنشاء بيانات التعديل للباقة المخصصة
 * Create edit data for custom bouquet
 */
export function createCustomBouquetEditData(item: CartItem) {
  if (!isCustomBouquet(item)) {
    throw new Error("Item is not a custom bouquet");
  }

  const { customData } = item;

  // استخراج بيانات التغليف
  const { packagingType, style, selectedVase } = extractPackagingData(customData);

  // استخراج بيانات التسليم
  const deliveryInfo = customData.deliveryInfo || {};
  const deliveryData = extractDeliveryData(deliveryInfo);

  return {
    flowers:
      customData.flowers?.reduce(
        (acc, f) => {
          acc[f.id] = f.quantity;
          return acc;
        },
        {} as Record<string | number, number>
      ) || {},
    colors: customData.colors || {},
    size: customData.size?.key || "medium",
    style: style,
    packagingType: packagingType,
    selectedVase: selectedVase,
    occasion: customData.occasion?.name || "",
    cardMessage: customData.cardMessage || "",
    includeCard: customData.includeCard || false,
    notes: customData.notes || "",
    ...deliveryData,
    image: item.image,
  };
}

/**
 * تنسيق السعر بالريال السعودي
 * Format price in SAR
 * @throws {Error} إذا كان السعر أقل من 0
 */
export function formatPrice(price: number, currency: string = APP_CONFIG.CURRENCY): string {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  return `${price.toFixed(2)} ${currency}`;
}

/**
 * التحقق من أن السلة فارغة
 * Check if cart is empty
 */
export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0;
}

/**
 * التحقق من أن جميع العناصر محددة
 * Check if all items are selected
 */
export function areAllItemsSelected(
  items: CartItem[],
  selectedItemIds: Set<string | number>
): boolean {
  if (items.length === 0) return false;
  return items.every((item) => {
    const itemId = getItemId(item);
    return selectedItemIds.has(itemId);
  });
}

/**
 * الحصول على عدد العناصر غير المحددة
 * Get count of unselected items
 */
export function getUnselectedCount(
  items: CartItem[],
  selectedItemIds: Set<string | number>
): number {
  return items.reduce((count, item) => {
    const itemId = getItemId(item);
    return selectedItemIds.has(itemId) ? count : count + 1;
  }, 0);
}
