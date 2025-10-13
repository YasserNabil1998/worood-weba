"use client";

import { useNotification } from "./NotificationSystem";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/lib/constants";
import type { CartItem } from "@/types";

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
            const existingItem = cart.find(
                (item: any) => item.id === productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    title: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage,
                });
            }

            storage.set(STORAGE_KEYS.CART, cart);
            window.dispatchEvent(new CustomEvent("cartUpdated"));

            showNotification("تم إضافة المنتج إلى السلة", "success");
        } catch (error) {
            console.error("خطأ في إضافة المنتج للسلة:", error);
            showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
        }

        return (
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#5A5E4D] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#4A4E3D] transition-colors"
                style={{ fontFamily: "var(--font-almarai)" }}
            >
                أضف إلى السلة
            </button>
        );
    };
}
