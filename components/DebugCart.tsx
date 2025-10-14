"use client";

import { useState, useEffect } from "react";

export default function DebugCart() {
    const [cart, setCart] = useState<any[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCart = () => {
            try {
                const cartData = JSON.parse(
                    localStorage.getItem("cart") || "[]"
                );
                const safeCart = Array.isArray(cartData) ? cartData : [];
                setCart(safeCart);
                setCount(
                    safeCart.reduce(
                        (sum: number, item: any) => sum + (item.quantity || 1),
                        0
                    )
                );
                console.log("Cart updated:", safeCart);
            } catch (error) {
                console.error("Error reading cart:", error);
                localStorage.setItem("cart", "[]");
                setCart([]);
                setCount(0);
            }
        };

        updateCart();

        window.addEventListener("cartUpdated", updateCart);
        window.addEventListener("storage", updateCart);

        return () => {
            window.removeEventListener("cartUpdated", updateCart);
            window.removeEventListener("storage", updateCart);
        };
    }, []);

    return (
        <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
            <h3 className="font-bold mb-2">Debug Cart</h3>
            <p>Items: {count}</p>
            <p>Cart length: {cart.length}</p>
            <div className="text-xs mt-2">
                {cart.map((item, index) => (
                    <div key={index} className="border-b py-1">
                        {item.title} - Qty: {item.quantity}
                    </div>
                ))}
            </div>
        </div>
    );
}
