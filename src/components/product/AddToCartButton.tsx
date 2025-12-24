"use client";

import type { JSX } from "react";

import { useNotification } from "@/providers/notification-provider";
import { UI_TEXTS } from "@/constants";
import type { CartItem } from "@/types/cart";
import { logError } from "@/lib/logger";
import { useCartStore } from "@/stores";

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

  const handleAddToCart = () => {
    try {
      const normalizedProductId = typeof productId === "number" ? productId : Number(productId);

      if (Number.isNaN(normalizedProductId)) {
        logError("معرف المنتج غير صالح", new Error("Invalid product ID"), { productId });
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

      addItem(productToAdd);

      showNotification("تم إضافة المنتج إلى السلة", "success");
    } catch (error) {
      logError("خطأ في إضافة المنتج للسلة", error, { productId, productName, productPrice });
      showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-[#5A5E4D] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#4A4E3D] transition-colors"
    >
      {UI_TEXTS.ADD_TO_CART}
    </button>
  );
}
