// Types for Custom Bouquet Data
export interface CustomFlower {
    id: string | number;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface CustomSize {
    key: string;
    label: string;
    price: number;
}

export interface CustomStyle {
    key: string;
    label: string;
    price: number;
}

export interface CustomOccasion {
    name: string;
    icon?: string;
}

export interface CustomBouquetData {
    flowers?: CustomFlower[];
    colors?: string[];
    size?: CustomSize;
    style?: CustomStyle;
    occasion?: CustomOccasion;
    cardMessage?: string;
    includeCard?: boolean;
    cardPrice?: number;
    notes?: string;
    flowersCount?: number;
    basePrice?: number;
    totalPrice?: number;
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    subtotal?: number;
    vat?: number;
    quantity: number;
    image: string;
    isCustom?: boolean;
    customData?: CustomBouquetData;
    // للباقات الجاهزة القديمة
    size?: string;
    style?: string;
    color?: string;
    total?: number;
    // معرف فريد للمنتج بناءً على خصائصه
    uniqueKey?: string;
    // خصائص إضافية للمنتجات
    addCard?: boolean;
    cardMessage?: string;
    addChocolate?: boolean;
    giftWrap?: boolean;
}

// Type Guards
export function isCustomBouquet(item: CartItem): item is CartItem & { isCustom: true; customData: CustomBouquetData } {
    return item.isCustom === true && item.customData !== undefined;
}

export function hasUniqueKey(item: CartItem): item is CartItem & { uniqueKey: string } {
    return item.uniqueKey !== undefined && item.uniqueKey !== null;
}

// Cart Totals Type
export interface CartTotals {
    subtotal: number;
    vat: number;
    total: number;
    itemsCount: number;
    totalItemsCount: number;
}