"use client";

import { useNotification } from "../providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import type { CartItem } from "@/types";
import { addProductToCart } from "@/src/lib/cartUtils";

interface AddToCartButtonProps {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
}

export default function AddToCartButton({
    productId,
    productName,
    productPrice,
    productImage,
}: AddToCartButtonProps) {
    const { showNotification } = useNotification();

    const handleAddToCart = () => {
        try {
            const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);

            const productToAdd = {
                id: productId,
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

            const { cart: updatedCart, isNew } = addProductToCart(
                cart,
                productToAdd
            );

            storage.set(STORAGE_KEYS.CART, updatedCart);
            window.dispatchEvent(new CustomEvent("cartUpdated"));

            const message = isNew
                ? "تم إضافة المنتج إلى السلة"
                : "تم زيادة كمية المنتج في السلة";
            showNotification(message, "success");
        } catch (error) {
            console.error("خطأ في إضافة المنتج للسلة:", error);
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
