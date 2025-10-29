"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/src/hooks/useCart";
import { generateProductKey, ProductInput } from "@/src/lib/cartUtils";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  itemId: string | number;
  initialQuantity: number;
  className?: string;
  productData?: CartItem | ProductInput;
  maxQuantity?: number;
  onQuantityChange?: (itemId: string | number, quantity: number) => void;
}

export default function QuantitySelector({
  itemId,
  initialQuantity,
  className = "",
  productData,
  maxQuantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const { updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toString());

  useEffect(() => {
    setQuantity(initialQuantity);
    setInputValue(initialQuantity.toString());
  }, [initialQuantity]);

  const getUniqueId = () => {
    if (productData) {
      // استخدام uniqueKey الموجود للباقات المخصصة
      if (
        "uniqueKey" in productData &&
        productData.uniqueKey !== undefined &&
        productData.uniqueKey !== null
      ) {
        return productData.uniqueKey;
      }
      return generateProductKey(productData);
    }
    return itemId;
  };

  const validateQuantity = (value: number): number => {
    let validQuantity = Math.max(1, value);
    if (maxQuantity !== undefined) {
      validQuantity = Math.min(validQuantity, maxQuantity);
    }
    return validQuantity;
  };

  const handleQuantityUpdate = (newQuantity: number) => {
    const validatedQuantity = validateQuantity(newQuantity);
    setQuantity(validatedQuantity);
    setInputValue(validatedQuantity.toString());
    const uniqueId = getUniqueId();
    updateQuantity(uniqueId, validatedQuantity);
    onQuantityChange?.(uniqueId, validatedQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    if (maxQuantity === undefined || newQuantity <= maxQuantity) {
      handleQuantityUpdate(newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleQuantityUpdate(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // السماح بالحقل الفارغ مؤقتاً أثناء الكتابة
    if (value === "") {
      setInputValue("");
      return;
    }

    const numValue = parseInt(value);

    if (!isNaN(numValue) && numValue > 0) {
      const validatedQuantity = validateQuantity(numValue);
      setInputValue(value);
      setQuantity(validatedQuantity);
      const uniqueId = getUniqueId();
      updateQuantity(uniqueId, validatedQuantity);
      onQuantityChange?.(uniqueId, validatedQuantity);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1) {
      handleQuantityUpdate(quantity);
    } else {
      handleQuantityUpdate(numValue);
    }
  };

  const isMaxReached = maxQuantity !== undefined && quantity >= maxQuantity;

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
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min="1"
        max={maxQuantity}
        className="w-16 text-center bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-medium text-[#5A5E4D] focus:outline-none focus:border-[#5A5E4D] focus:ring-1 focus:ring-[#5A5E4D]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="كمية المنتج"
      />
      <button
        onClick={handleIncrease}
        disabled={isMaxReached}
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 rounded-lg border border-gray-200 transition-colors"
        aria-label="زيادة الكمية"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
