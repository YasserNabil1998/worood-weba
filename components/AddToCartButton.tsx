'use client';

import { useState } from 'react';

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
  productImage 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (typeof window !== 'undefined') {
      try {
        setIsAdding(true);
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((item: any) => item.id === productId);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: productId,
            title: productName,
            price: productPrice,
            quantity: 1,
            image: productImage
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        // إشعار بسيط
        const notification = document.createElement('div');
        notification.textContent = 'تم إضافة المنتج إلى السلة';
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
        notification.style.fontFamily = 'var(--font-almarai)';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        
        setTimeout(() => setIsAdding(false), 1000);
      } catch (error) {
        console.error('خطأ في إضافة المنتج للسلة:', error);
        setIsAdding(false);
      }
    }
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex-1 bg-[#5A5E4D] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#4A4E3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
      style={{fontFamily:'var(--font-almarai)'}}
    >
      {isAdding ? 'جاري الإضافة...' : 'أضف إلى السلة'}
    </button>
  );
}
