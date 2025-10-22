"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/src/hooks/useCart";
import { generateProductKey } from "@/src/lib/cartUtils";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
    itemId: string | number;
    initialQuantity: number;
    className?: string;
    productData?: any; // بيانات المنتج الكاملة لتوليد uniqueKey
    onQuantityChange?: (itemId: string | number, quantity: number) => void;
}

export default function QuantitySelector({
    itemId,
    initialQuantity,
    className = "",
    productData,
    onQuantityChange,
}: QuantitySelectorProps) {
    const { updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(initialQuantity);

    // تحديث الكمية المحلية عند تغيير initialQuantity
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

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
        const uniqueId = getUniqueId();
        updateQuantity(uniqueId, newQuantity);
        onQuantityChange?.(uniqueId, newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            const uniqueId = getUniqueId();
            updateQuantity(uniqueId, newQuantity);
            onQuantityChange?.(uniqueId, newQuantity);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
            const uniqueId = getUniqueId();
            updateQuantity(uniqueId, value);
            onQuantityChange?.(uniqueId, value);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 rounded-lg border border-gray-200 transition-colors"
                aria-label="تقليل الكمية"
            >
                <Minus className="w-4 h-4" />
            </button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                className="w-16 text-center bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-medium text-[#5A5E4D] focus:outline-none focus:border-[#5A5E4D] focus:ring-1 focus:ring-[#5A5E4D]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="كمية المنتج"
            />
            <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg border border-gray-200 transition-colors"
                aria-label="زيادة الكمية"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
