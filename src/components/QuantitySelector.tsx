"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/src/hooks/useCart";
import { generateProductKey } from "@/src/lib/cartUtils";

interface QuantitySelectorProps {
    itemId: string | number;
    initialQuantity: number;
    className?: string;
    productData?: any; // بيانات المنتج الكاملة لتوليد uniqueKey
}

export default function QuantitySelector({
    itemId,
    initialQuantity,
    className = "",
    productData,
}: QuantitySelectorProps) {
    const { updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(initialQuantity);

    // تحديد المعرف الفريد للمنتج
    const getUniqueId = () => {
        if (productData) {
            return generateProductKey(productData);
        }
        return itemId;
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(getUniqueId(), newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(getUniqueId(), newQuantity);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
            updateQuantity(getUniqueId(), value);
        }
    };

    return (
        <div
            className={`inline-flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm ${className}`}
        >
            {/* زر تقليل الكمية */}
            <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-11 h-11 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 disabled:from-gray-25 disabled:to-gray-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-500 hover:text-red-500 disabled:text-gray-300 transition-all duration-300 hover:scale-110 disabled:hover:scale-100 group relative overflow-hidden"
                aria-label="تقليل الكمية"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg
                    className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M20 12H4"
                    />
                </svg>
            </button>

            {/* خط فاصل */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            {/* حقل الكمية */}
            <div className="px-4 py-2 min-w-[4rem] bg-gradient-to-r from-gray-50/50 to-white">
                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full text-center bg-transparent focus:outline-none text-xl font-bold text-[#5A5E4D] transition-all duration-200 placeholder-gray-300"
                    aria-label="كمية المنتج"
                />
            </div>

            {/* خط فاصل */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            {/* زر زيادة الكمية */}
            <button
                onClick={handleIncrease}
                className="w-11 h-11 bg-gradient-to-br from-[#5A5E4D] to-[#4A4E3D] hover:from-green-600 hover:to-green-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group relative overflow-hidden"
                aria-label="زيادة الكمية"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg
                    className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </button>
        </div>
    );
}
