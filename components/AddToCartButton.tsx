"use client";

import { useState } from "react";
import { useNotification } from "./NotificationSystem";

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
        if (typeof window !== "undefined") {
            try {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
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

                localStorage.setItem("cart", JSON.stringify(cart));
                window.dispatchEvent(new CustomEvent("cartUpdated"));

                // إشعار موحد
                showNotification("تم إضافة المنتج إلى السلة", "success");
            } catch (error) {
                console.error("خطأ في إضافة المنتج للسلة:", error);
                showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
            }
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
