"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import ProductCard, { ProductItem } from "@/src/components/ProductCard";
import { Heart, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { PRICE_RANGES, OCCASIONS, COLORS } from "@/src/constants/bouquets";

export default function BouquetsListingClient({
  items,
}: {
  items: BouquetItem[];
}) {
  // State for filters - using more natural variable names
  const [priceRange, setPriceRange] = useState<string>("all"); // changed from price slider
  const [occasion, setOccasion] = useState<string>("all");
  const [color, setColor] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const pageSize = 9; // items per page

  // Handle clicking outside to close mobile filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };

    if (isFiltersOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFiltersOpen]);

  // Filter items based on selected criteria
  const filtered = useMemo(() => {
    let filteredItems = items;

    // Filter by price range
    if (priceRange !== "all") {
      const selectedRange = PRICE_RANGES.find(
        (range) => range.key === priceRange
      );
      if (selectedRange) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.price >= selectedRange.min && item.price <= selectedRange.max
        );
      }
    }

    // Filter by occasion
    if (occasion !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.occasion === occasion
      );
    }

    // Filter by color
    if (color !== "all") {
      filteredItems = filteredItems.filter((item) => item.color === color);
    }

    return filteredItems;
  }, [items, priceRange, occasion, color]);

  // Sort the filtered items
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
        return arr; // popular - keep original order
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  // Get current page items
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  // Reset all filters to default values
  const reset = () => {
    setPriceRange("all");
    setOccasion("all");
    setColor("all");
    setPage(1);
  };

  // Mobile filter toggle button
  const ToggleButton = () => {
    return (
      <div className="lg:hidden" ref={filtersRef}>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow p-4 text-right hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-2">
            <Filter
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isFiltersOpen ? "rotate-180" : ""
              }`}
            />
            <span className="text-sm text-gray-600">تصفية النتائج</span>
          </div>
          <h3
            className="font-bold text-gray-800"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            تصفية النتائج
          </h3>
        </button>
      </div>
    );
  };

  // Filter sidebar component
  const Sidebar = () => {
    return (
      <aside
        className={`lg:col-span-1 transition-all duration-300 ${
          isFiltersOpen ? "block lg:block" : "hidden lg:block"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow p-4 transition-all duration-300 ${
            isFiltersOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-bold text-gray-800 hidden lg:block"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              تصفية النتائج
            </h3>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">
              نطاق السعر
            </label>
            <ul className="space-y-2 text-sm">
              {PRICE_RANGES.map((range) => (
                <li key={range.key} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === range.key}
                    onChange={() => {
                      setPriceRange(range.key);
                      setPage(1);
                    }}
                  />
                  <span>{range.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">المناسبة</label>
            <ul className="space-y-2 text-sm">
              {OCCASIONS.map((occ) => (
                <li key={occ.key} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="occ"
                    checked={occasion === occ.key}
                    onChange={() => {
                      setOccasion(occ.key);
                      setPage(1);
                    }}
                  />
                  <span>{occ.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">اللون</label>
            <div className="flex items-center gap-2">
              {COLORS.map((col) => (
                <button
                  key={col.key}
                  aria-label={col.label}
                  onClick={() => {
                    setColor(col.key);
                    setPage(1);
                  }}
                  className={`h-5 w-5 rounded-full border ${
                    color === col.key
                      ? "ring-2 ring-offset-2 ring-[#5A5E4D]"
                      : ""
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={reset}
            className="mt-4 w-full rounded-md py-2 border text-sm"
            style={{ borderColor: "#cbd5e1" }}
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      </aside>
    );
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Mobile Filter Toggle Button */}
      <ToggleButton />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Grid + toolbar + pager */}
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
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#F5F1E8] to-[#E8E2D5] rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-[#5A5E4D]" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-800 mb-2"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  لم نجد باقات تطابق بحثك
                </h3>
                <p
                  className="text-gray-600 mb-6 max-w-md"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  جرب تعديل الفلاتر أو البحث عن مناسبة أخرى
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-[#5A5E4D] text-white rounded-lg font-medium hover:bg-[#4A4E3D] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  إعادة ضبط الفلاتر
                </button>
                <button
                  onClick={() => {
                    setPriceRange("all");
                    setOccasion("all");
                    setColor("all");
                    setPage(1);
                  }}
                  className="px-6 py-3 border border-[#5A5E4D] text-[#5A5E4D] rounded-lg font-medium hover:bg-[#5A5E4D] hover:text-white transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
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
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#5A5E4D] hover:text-white rounded-full transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
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
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Previous Button */}

              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Pagination Numbers */}
              <div className="flex gap-2">
                {totalPages <= 5 ? (
                  // Show all pages if 5 or less
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                          page === n
                            ? "bg-[#5A5E4D] text-white border-[#5A5E4D] font-semibold"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )
                ) : (
                  // Show pagination with ellipsis
                  <>
                    {page > 2 && (
                      <>
                        <button
                          onClick={() => setPage(1)}
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
                          onClick={() => setPage(n)}
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
                          onClick={() => setPage(totalPages)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
