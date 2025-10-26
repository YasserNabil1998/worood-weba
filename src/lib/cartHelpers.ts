/**
 * Cart Helper Functions
 * دوال مساعدة لعمليات السلة
 */

import { CartItem, CartTotals, hasUniqueKey, isCustomBouquet } from "@/src/@types/cart/CartItem.type";
import { APP_CONFIG } from "@/src/constants";

/**
 * الحصول على المعرف الفريد للعنصر
 * Get unique identifier for cart item
 */
export function getItemId(item: CartItem): string | number {
    return hasUniqueKey(item) ? item.uniqueKey : item.id;
}

/**
 * حساب سعر العنصر الواحد
 * Calculate single item price
 */
export function getItemPrice(item: CartItem): number {
    if (isCustomBouquet(item)) {
        return item.price || 0;
    }
    return item.total || item.price || 0;
}

/**
 * حساب إجمالي سعر العنصر مع الكمية
 * Calculate total price for item with quantity
 */
export function getItemTotal(item: CartItem): number {
    const price = getItemPrice(item);
    const quantity = item.quantity || 1;
    return price * quantity;
}

/**
 * حساب إجماليات السلة
 * Calculate cart totals
 */
export function calculateCartTotals(
    items: CartItem[],
    selectedItemIds: Set<number>
): CartTotals {
    const selectedItems = items.filter((item) => selectedItemIds.has(item.id));

    const subtotal = selectedItems.reduce((sum, item) => {
        return sum + getItemTotal(item);
    }, 0);

    const totalItemsCount = selectedItems.reduce((sum, item) => {
        return sum + (item.quantity || 1);
    }, 0);

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
 */
export function updateCartItemQuantity(
    items: CartItem[],
    itemId: string | number,
    newQuantity: number
): CartItem[] {
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
export function removeCartItem(
    items: CartItem[],
    itemId: string | number
): CartItem[] {
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
    selectedItemIds: Set<number>
): CartItem[] {
    return items.filter((item) => !selectedItemIds.has(item.id));
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

    return {
        flowers:
            customData.flowers?.reduce((acc, f) => {
                acc[f.id] = f.quantity;
                return acc;
            }, {} as Record<string | number, number>) || {},
        colors: customData.colors || [],
        size: customData.size?.key || "medium",
        style: customData.style?.key || "classic",
        occasion: customData.occasion?.name || "",
        cardMessage: customData.cardMessage || "",
        includeCard: customData.includeCard || false,
        notes: customData.notes || "",
        image: item.image,
    };
}

/**
 * تنسيق السعر بالريال السعودي
 * Format price in SAR
 */
export function formatPrice(price: number, currency: string = APP_CONFIG.CURRENCY): string {
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
    selectedItemIds: Set<number>
): boolean {
    return items.length > 0 && selectedItemIds.size === items.length;
}

/**
 * الحصول على عدد العناصر غير المحددة
 * Get count of unselected items
 */
export function getUnselectedCount(
    items: CartItem[],
    selectedItemIds: Set<number>
): number {
    return items.length - selectedItemIds.size;
}

