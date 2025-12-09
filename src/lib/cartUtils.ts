import type { CartItem } from "@/types/cart";

export type ProductInput = Partial<CartItem> & {
  id: number | string;
  quantity?: number;
};

export function generateProductKey(product: ProductInput): string {
  if (product.id === undefined || product.id === null) {
    throw new Error("المنتج يجب أن يحتوي على id");
  }

  const colorValue =
    "colorValue" in product && product.colorValue ? product.colorValue : product.color || "default";

  const productProps = {
    id: product.id,
    size: product.size || "default",
    addCard: product.addCard || false,
    cardMessage: product.cardMessage || "",
    addChocolate: product.addChocolate || false,
    giftWrap: product.giftWrap || false,
    style: product.style || "default",
    color: colorValue,
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
    const newProduct: CartItem = {
      ...product,
      uniqueKey: generateProductKey(product),
      quantity: quantity,
    } as CartItem;

    updatedCart.push(newProduct);
    return { cart: updatedCart, isNew: true };
  }
}
