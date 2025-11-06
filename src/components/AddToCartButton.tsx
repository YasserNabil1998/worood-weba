"use client";

import type { JSX } from "react";

import { useNotification } from "../providers/notification-provider";
import { useCartStore } from "@/src/stores/cartStore";
import { findProductInCart } from "@/src/lib/cartUtils";
import type { CartItem } from "@/src/@types/cart/CartItem.type";

interface AddToCartButtonProps {
  productId: number | string;
  productName: string;
  productPrice: number;
  productImage: string;
}

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
}: AddToCartButtonProps): JSX.Element {
  const { showNotification } = useNotification();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const handleAddToCart = () => {
    try {
      const normalizedProductId = typeof productId === "number" ? productId : Number(productId);

      if (Number.isNaN(normalizedProductId)) {
        showNotification("تعذر إضافة المنتج بسبب معرف غير صالح", "error");
        return;
      }

      const productToAdd: CartItem = {
        id: normalizedProductId,
        title: productName,
        price: productPrice,
        quantity: 1,
        image: productImage,
        // خصائص افتراضية للمنتجات البسيطة
        size: "default",
        addCard: false,
        addChocolate: false,
        giftWrap: false,
      };

      // التحقق من وجود المنتج لتحديد الرسالة
      const existingIndex = findProductInCart(items, productToAdd);
      const isNew = existingIndex === -1;

      // إضافة المنتج باستخدام store
      addItem(productToAdd);

      const message = isNew ? "تم إضافة المنتج إلى السلة" : "تم زيادة كمية المنتج في السلة";
      showNotification(message, "success");
    } catch (error) {
      showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-[#5A5E4D] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#4A4E3D] transition-colors"
      style={{ fontFamily: "var(--font-almarai)" }}
    >
      أضف إلى السلة
    </button>
  );
}
