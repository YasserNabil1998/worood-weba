"use client";

import { useMemo, useState, memo } from "react";
import ProductCard from "@/src/components/ProductCard";

export type BouquetCardItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  badge?: string;
};

type Props = {
  items: BouquetCardItem[];
};

const SORTS = [
  { key: "popular", label: "الأكثر شهرة" },
  { key: "price-asc", label: "السعر: من الأقل للأعلى" },
  { key: "price-desc", label: "السعر: من الأعلى للأقل" },
  { key: "newest", label: "الأحدث" },
];

function BouquetsGrid({ items }: Props) {
  const [sort, setSort] = useState<string>("popular");

  const sorted = useMemo(() => {
    const arr = [...items];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "newest":
        return arr.sort((a, b) => b.id - a.id);
      default:
        return arr; // popular (as is)
    }
  }, [items, sort]);

  return (
    <div className="space-y-4" dir="rtl">
      {/* toolbar */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600">
          عرض {sorted.length} من أصل {items.length} باقة
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">ترتيب حسب</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {sorted.map((i) => (
          <ProductCard key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
}

export default memo(BouquetsGrid, (prevProps, nextProps) => {
  // Only re-render if items array reference changes or length changes
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.items.every((item, index) => {
      const nextItem = nextProps.items[index];
      return (
        item.id === nextItem.id &&
        item.title === nextItem.title &&
        item.price === nextItem.price &&
        item.image === nextItem.image
      );
    })
  );
});
