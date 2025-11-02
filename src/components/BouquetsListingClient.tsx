"use client";

import { useMemo, useState, useId } from "react";
import ProductCard from "@/src/components/ProductCard";
import { Heart, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { PRICE_RANGES } from "@/src/constants/bouquets";
import ToggleButton from "@/src/components/ToggleButton";
import Sidebar from "@/src/components/Sidebar";

// FilterSection was removed as it was unused

function useBouquetListing(
  items: BouquetItem[],
  options: {
    priceRange: string;
    occasion: string;
    color: string;
    sort: string;
    page: number;
    pageSize: number;
  }
) {
  const { priceRange, occasion, color, sort, page, pageSize } = options;

  const filtered = useMemo(() => {
    let filteredItems = items;

    if (priceRange !== "all") {
      const selectedRange = PRICE_RANGES.find((range) => range.key === priceRange);
      if (selectedRange) {
        filteredItems = filteredItems.filter(
          (item) => item.price >= selectedRange.min && item.price <= selectedRange.max
        );
      }
    }

    if (occasion !== "all") {
      filteredItems = filteredItems.filter((item) => item.occasion === occasion);
    }

    if (color !== "all") {
      filteredItems = filteredItems.filter((item) => item.color === color);
    }

    return filteredItems;
  }, [items, priceRange, occasion, color]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "newest":
        return arr.sort((a, b) => b.id - a.id);
      default:
        return arr;
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  return { filtered, sorted, current, totalPages };
}

export default function BouquetsListingClient({
  items,
  pageSize = 9,
}: {
  items: BouquetItem[];
  pageSize?: number;
}) {
  const [priceRange, setPriceRange] = useState<string>("all");
  const [occasion, setOccasion] = useState<string>("all");
  const [color, setColor] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  // Removed outside click-to-close behavior; panel toggles only via header button or close icon

  const { sorted, current, totalPages } = useBouquetListing(items, {
    priceRange,
    occasion,
    color,
    sort,
    page,
    pageSize,
  });

  const reset = () => {
    setPriceRange("all");
    setOccasion("all");
    setColor("all");
    setPage(1);
  };

  return (
    <div className="space-y-4" dir="rtl">
      <ToggleButton isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          occasion={occasion}
          setOccasion={setOccasion}
          color={color}
          setColor={setColor}
          setPage={setPage}
          reset={reset}
        />
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
            <div className="text-gray-600">
              {sorted.length === 0
                ? "لم نجد نتائج تطابق البحث"
                : `عرض ${current.length} من أصل ${sorted.length} باقة`}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <span className="text-gray-600 whitespace-nowrap">ترتيب حسب</span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 w-full sm:w-auto"
                >
                  <option value="popular">الأكثر شهرة</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="newest">الأحدث</option>
                </select>
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                  ▾
                </span>
              </div>
            </div>
          </div>
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#F5F1E8] to-[#E8E2D5] rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-[#5A5E4D]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-[var(--font-almarai)]">
                  لم نجد باقات تطابق بحثك
                </h3>
                <p className="text-gray-600 mb-6 max-w-md font-[var(--font-almarai)]">
                  جرب تعديل الفلاتر أو البحث عن مناسبة أخرى
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-[#5A5E4D] text-white rounded-lg font-medium hover:bg-[#4A4E3D] transition-colors duration-200 font-[var(--font-almarai)]"
                >
                  إعادة ضبط الفلاتر
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-3 border border-[#5A5E4D] text-[#5A5E4D] rounded-lg font-medium hover:bg-[#5A5E4D] hover:text-white transition-colors duration-200 font-[var(--font-almarai)]"
                >
                  عرض جميع الباقات
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <span>أو تصفح حسب المناسبة:</span>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[
                    ["wedding", "زفاف"],
                    ["anniversary", "ذكرى سنوية"],
                    ["graduation", "تخرج"],
                    ["engagement", "خطوبة"],
                    ["newborn", "مواليد جديد"],
                    ["getwell", "شفاء عاجل"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setOccasion(key);
                        setPriceRange("all");
                        setColor("all");
                        setPage(1);
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#5A5E4D] hover:text-white rounded-full transition-colors duration-200 font-[var(--font-almarai)]"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {current.map((i) => (
                <ProductCard key={i.id} item={i} />
              ))}
            </div>
          )}
          {sorted.length > 0 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex gap-2">
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                page === n
                  ? "bg-[#5A5E4D] text-white border-[#5A5E4D] font-semibold"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))
        ) : (
          <>
            {page > 2 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                {page > 3 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                    ...
                  </span>
                )}
              </>
            )}

            {[page - 1, page, page + 1]
              .filter((n) => n > 0 && n <= totalPages)
              .map((n) => (
                <button
                  key={n}
                  onClick={() => onPageChange(n)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                    page === n
                      ? "bg-[#5A5E4D] text-white border-[#5A5E4D] font-semibold"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}

            {page < totalPages - 1 && (
              <>
                {page < totalPages - 2 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
