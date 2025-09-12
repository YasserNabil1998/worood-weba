"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type CartItem = { id: number; title: string; size: string; style: string; color: string; total: number };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(cart);
    }
  }, []);

  const removeItem = (id: number) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(next));
      // إرسال إشعار لتحديث عداد السلة
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  };

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const vat = Math.round(subtotal * 0.15);
  const grand = subtotal + vat;

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6" style={{fontFamily:'var(--font-almarai)'}}>سلة المشتريات</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              {items.length === 0 ? (
                <p className="text-gray-600">سلتك فارغة.</p>
              ) : (
                <ul className="divide-y">
                  {items.map((it) => (
                    <li key={it.id} className="py-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{it.title}</div>
                        <div className="text-sm text-gray-600">الحجم: {it.size === 'small' ? 'صغير' : it.size === 'medium' ? 'متوسط' : 'كبير'} • التغليف: {it.style} • اللون: <span className="inline-block h-3 w-3 rounded-full align-middle" style={{backgroundColor: it.color}}></span></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">ريال {it.total}</div>
                        <button onClick={()=> removeItem(it.id)} className="text-red-600 text-sm">حذف</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Summary */}
            <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 h-fit">
              <h2 className="text-lg font-semibold mb-3" style={{fontFamily:'var(--font-almarai)'}}>ملخص الطلب</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">الإجمالي الفرعي</span><span>ريال {subtotal}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">ضريبة القيمة المضافة 15%</span><span>ريال {vat}</span></div>
                <div className="flex justify-between font-bold border-t pt-2"><span>المجموع</span><span>ريال {grand}</span></div>
              </div>
              <button onClick={()=> (window.location.href = '/checkout')} className="mt-4 w-full rounded-md bg-[#5A5E4D] text-white py-2">متابعة الدفع</button>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
