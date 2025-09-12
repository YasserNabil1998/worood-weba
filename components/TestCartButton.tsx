'use client';

import { useState } from 'react';

export default function TestCartButton() {
  const [message, setMessage] = useState('');

  const testCart = () => {
    try {
      // اختبار localStorage
      const testItem = {
        id: 'test-1',
        title: 'منتج تجريبي',
        price: 100,
        quantity: 1,
        image: '/images/test.jpg'
      };
      
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(testItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // إرسال event
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      setMessage('تم إضافة منتج تجريبي إلى السلة!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('خطأ: ' + error);
    }
  };

  const clearCart = () => {
    try {
      localStorage.setItem('cart', '[]');
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      setMessage('تم مسح السلة!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('خطأ: ' + error);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <div className="space-y-2">
        <button 
          onClick={testCart}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
        >
          اختبار إضافة للسلة
        </button>
        <button 
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          مسح السلة
        </button>
        {message && (
          <p className="text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
