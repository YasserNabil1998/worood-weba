'use client';

import Link from 'next/link';

export type ProductItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
};

export default function ProductCard({ item }: { item: ProductItem }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all" dir="rtl">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>
          </button>
        </div>
        {item.badge && (
          <span className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur text-[11px] px-2 py-1 shadow text-gray-700">{item.badge}</span>
        )}
        {item.isPopular && (
          <span className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur text-[11px] px-2 py-1 shadow text-gray-700">الأكثر شهرة</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1" style={{fontFamily:'var(--font-almarai)'}}>{item.title}</h3>
        <p className="text-[12px] text-gray-600 mb-2">وصف مختصر للباقة يوضح نوع الورود والألوان المناسبة.</p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <Link href={`/product/${item.id}`} className="hover:underline">عرض التفاصيل</Link>
          <div className="font-bold text-gray-800">{item.price} ريال</div>
        </div>
        <button className="w-full py-2 rounded-md text-white font-semibold" style={{backgroundColor:'#5A5E4D'}}>أضف إلى السلة</button>
      </div>
    </div>
  );
}


