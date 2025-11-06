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
  if (product.id === undefined || product.id === null) {
    throw new Error("المنتج يجب أن يحتوي على id");
  }

  const productProps = {
    id: product.id,
    size: product.size || "default",
    addCard: product.addCard || false,
    cardMessage: product.cardMessage || "",
    addChocolate: product.addChocolate || false,
    giftWrap: product.giftWrap || false,
    style: product.style || "default",
    color: product.color || "default",
    customData: product.customData ? JSON.stringify(product.customData) : null,
  };

  const jsonString = JSON.stringify(productProps, Object.keys(productProps).sort());

  let hash = 0;
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
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
    if (item.uniqueKey) {
      return item.uniqueKey === productKey;
    }
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
  if (!Array.isArray(cart)) {
    throw new Error("السلة يجب أن تكون مصفوفة");
  }

  if (product.id === undefined || product.id === null) {
    throw new Error("المنتج يجب أن يحتوي على id");
  }

  const quantity = product.quantity ?? 1;
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("الكمية يجب أن تكون رقماً صحيحاً موجباً");
  }

  const updatedCart = [...cart];
  const existingIndex = findProductInCart(updatedCart, product);

  if (existingIndex >= 0) {
    updatedCart[existingIndex] = {
      ...updatedCart[existingIndex],
      quantity: updatedCart[existingIndex].quantity + quantity,
    };
    return { cart: updatedCart, isNew: false };
  } else {
    const newId = product.id === 0 ? Date.now() : product.id;
    
    const newProduct: CartItem = {
      ...product,
      id: newId,
      uniqueKey: generateProductKey(product),
      quantity: quantity,
    } as CartItem;

    updatedCart.push(newProduct);
    return { cart: updatedCart, isNew: true };
  }
}
