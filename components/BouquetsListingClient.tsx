'use client';

import { useMemo, useState } from 'react';
import ProductCard, { ProductItem } from '@/components/ProductCard';

type ListingItem = ProductItem & { color?: string; occasion?: string };

export default function BouquetsListingClient({ items }: { items: ListingItem[] }) {
  const [price, setPrice] = useState<number>(1000);
  const [occasion, setOccasion] = useState<string>('all');
  const [color, setColor] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('popular');
  const pageSize = 6;

  const filtered = useMemo(() => {
    const arr = items.filter((i) => i.price <= price);
    const occ = occasion === 'all' ? arr : arr.filter((i) => i.occasion === occasion);
    const col = color === 'all' ? occ : occ.filter((i) => i.color === color);
    return col;
  }, [items, price, occasion, color]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'newest':
        return arr.sort((a, b) => b.id - a.id);
      default:
        return arr; // popular
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  const reset = () => { setPrice(1000); setOccasion('all'); setColor('all'); setPage(1); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" dir="rtl">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-bold text-gray-800 mb-4" style={{fontFamily:'var(--font-almarai)'}}>تصفية النتائج</h3>
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">نطاق السعر</label>
            <input type="range" min={0} max={1000} value={price} onChange={(e)=>{ setPrice(Number(e.target.value)); setPage(1); }} className="w-full" />
            <div className="flex justify-between text-[12px] text-gray-500 mt-1"><span>0 ريال</span><span>{price} ريال</span></div>
          </div>
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">المناسبة</label>
            <ul className="space-y-2 text-sm">
              {[
                ['all','جميع المناسبات'],
                ['wedding','زفاف'],
                ['anniversary','ذكرى سنوية'],
                ['graduation','تخرج'],
                ['engagement','خطوبة'],
                ['newborn','مواليد جديد'],
                ['getwell','شفاء عاجل'],
                ['thanks','شكر وتقدير']
              ].map(([key,label]) => (
                <li key={key} className="flex items-center gap-2">
                  <input type="radio" name="occ" checked={occasion===key} onChange={()=>{ setOccasion(key); setPage(1); }} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">اللون</label>
            <div className="flex items-center gap-2">
              {[
                ['all','#e5e7eb'],
                ['green','#16a34a'],
                ['red','#f43f5e'],
                ['orange','#f97316'],
                ['cyan','#06b6d4'],
                ['violet','#8b5cf6'],
                ['amber','#f59e0b']
              ].map(([key,c])=> (
                <button key={key} aria-label={key as string} onClick={()=>{ setColor(key as string); setPage(1); }} className={`h-5 w-5 rounded-full border ${color===key ? 'ring-2 ring-offset-2 ring-[#5A5E4D]' : ''}`} style={{backgroundColor:c as string}} />
              ))}
            </div>
          </div>
          <button onClick={reset} className="mt-4 w-full rounded-md py-2 border text-sm" style={{borderColor:'#cbd5e1'}}>إعادة ضبط الفلاتر</button>
        </div>
      </aside>

      {/* Grid + toolbar + pager */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">عرض {current.length} من أصل {sorted.length} باقة</div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">ترتيب حسب</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e)=> { setSort(e.target.value); setPage(1); }}
                className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              >
                <option value="popular">الأكثر شهرة</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="newest">الأحدث</option>
              </select>
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {current.map((i)=> (
            <ProductCard key={i.id} item={i} />
          ))}
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({length: totalPages}, (_,i)=> i+1).map((n) => (
            <button key={n} onClick={()=> setPage(n)} className={`px-3 py-1 rounded border ${page===n ? 'bg-gray-100 font-bold' : ''}`}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}


