'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export default function QuantitySelector({ 
  initialQuantity = 1, 
  onQuantityChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button 
        onClick={handleDecrease}
        className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
        {quantity}
      </span>
      <button 
        onClick={handleIncrease}
        className="px-3 py-2 text-gray-600 hover:bg-gray-50"
      >
        +
      </button>
    </div>
  );
}
