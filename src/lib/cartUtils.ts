import { CartItem } from "@/src/@types/cart/CartItem.type";

/**
 * نوع المنتج المدخل - يمكن أن يكون CartItem كامل أو كائن جزئي
 */
export type ProductInput = Partial<CartItem> & {
    id: number | string;
    quantity?: number;
};

/**
 * إنشاء معرف فريد للمنتج بناءً على خصائصه
 * @param product - المنتج المراد إنشاء معرف فريد له
 * @returns معرف فريد للمنتج
 */
export function generateProductKey(product: ProductInput): string {
    // التحقق من وجود id
    if (product.id === undefined || product.id === null) {
        throw new Error("المنتج يجب أن يحتوي على id");
    }

    // إنشاء كائن يحتوي على جميع الخصائص المهمة
    const productProps = {
        id: product.id,
        size: product.size || 'default',
        addCard: product.addCard || false,
        cardMessage: product.cardMessage || '',
        addChocolate: product.addChocolate || false,
        giftWrap: product.giftWrap || false,
        style: product.style || 'default',
        color: product.color || 'default',
        // إضافة أي خصائص أخرى قد تكون مهمة
        customData: product.customData ? JSON.stringify(product.customData) : null,
    };

    // تحويل الكائن إلى JSON وإزالة المسافات
    const jsonString = JSON.stringify(productProps, Object.keys(productProps).sort());
    
    // إنشاء hash بسيط من النص (دالة hash محسّنة)
    let hash = 0;
    for (let i = 0; i < jsonString.length; i++) {
        const char = jsonString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash | 0; // تحويل إلى عدد صحيح 32 بت (إصلاح الخطأ السابق)
    }
    
    return `${product.id}_${Math.abs(hash)}`;
}

/**
 * البحث عن منتج في السلة بناءً على المعرف الفريد
 * @param cart - مصفوفة السلة
 * @param product - المنتج المراد البحث عنه
 * @returns فهرس المنتج في السلة أو -1 إذا لم يوجد
 */
export function findProductInCart(cart: CartItem[], product: ProductInput): number {
    if (!Array.isArray(cart)) {
        return -1;
    }

    const productKey = generateProductKey(product);
    return cart.findIndex((item: CartItem) => {
        // استخدام uniqueKey إذا كان موجوداً لتسريع البحث
        if (item.uniqueKey) {
            return item.uniqueKey === productKey;
        }
        // إذا لم يكن موجوداً، إنشاء المفتاح للمقارنة
        const itemKey = generateProductKey(item);
        return itemKey === productKey;
    });
}

/**
 * إضافة منتج للسلة مع التحقق من الخصائص
 * @param cart - مصفوفة السلة الحالية
 * @param product - المنتج المراد إضافته
 * @returns كائن يحتوي على السلة المحدثة وعلامة تشير إلى ما إذا كان المنتج جديداً
 */
export function addProductToCart(
    cart: CartItem[], 
    product: ProductInput
): { cart: CartItem[]; isNew: boolean } {
    // التحقق من صحة البيانات
    if (!Array.isArray(cart)) {
        throw new Error("السلة يجب أن تكون مصفوفة");
    }

    if (product.id === undefined || product.id === null) {
        throw new Error("المنتج يجب أن يحتوي على id");
    }

    // التحقق من أن الكمية رقم صحيح موجب
    const quantity = product.quantity ?? 1;
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("الكمية يجب أن تكون رقماً صحيحاً موجباً");
    }

    // إنشاء نسخة جديدة من السلة (immutable)
    const updatedCart = [...cart];
    const existingIndex = findProductInCart(updatedCart, product);
    
    if (existingIndex >= 0) {
        // المنتج موجود بنفس الخصائص، زيادة الكمية
        updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: updatedCart[existingIndex].quantity + quantity
        };
        return { cart: updatedCart, isNew: false };
    } else {
        // منتج جديد أو بخصائص مختلفة، إضافته كمنتج منفصل
        const newProduct: CartItem = {
            ...product,
            uniqueKey: generateProductKey(product), // حفظ المعرف الفريد للاستخدام المستقبلي
            quantity: quantity
        } as CartItem;
        
        updatedCart.push(newProduct);
        return { cart: updatedCart, isNew: true };
    }
}
