"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { generateProductKey, ProductInput } from "@/lib/cartUtils";
import { CartItem } from "@/types/cart";
import { Minus, Plus } from "lucide-react";
import { fontStyle } from "@/lib/styles";

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
        className="min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center bg-white border border-[gainsboro] rounded-[5px] disabled:opacity-50 transition-opacity"
        aria-label="تقليل الكمية"
      >
        <div className="w-[14px] h-[2px] bg-[#5a5e4d]"></div>
      </button>
      <span className="text-responsive-xl font-bold text-black mx-2 min-w-[20px] text-center" style={fontStyle}>
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={isMaxReached}
        className="min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center bg-white border border-[gainsboro] rounded-[5px] disabled:opacity-50 transition-opacity relative"
        aria-label="زيادة الكمية"
      >
        <div className="w-[14px] h-[2px] bg-[#5a5e4d]"></div>
        <div className="absolute w-[2px] h-[13px] bg-[#5a5e4d]"></div>
      </button>
    </div>
  );
}
