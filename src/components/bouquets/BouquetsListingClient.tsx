"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { BouquetItem } from "@/types/bouquets";
import { PRICE_RANGES } from "@/constants/bouquets";
import ToggleButton from "@/components/shared/ToggleButton";
import Sidebar from "@/components/layout/Sidebar";
import { fontStyle } from "@/lib/styles";
import { TIMEOUTS } from "@/constants";
import AOSWrapper from "@/components/common/AOSWrapper";

// FilterSection was removed as it was unused

function useBouquetListing(
  items: BouquetItem[],
  options: {
    priceRange: string;
    occasion: string;
    color: string;
    type: string;
    sort: string;
    page: number;
    pageSize: number;
  }
) {
  const { priceRange, occasion, color, type, sort, page, pageSize } = options;

  const filtered = useMemo(() => {
    let filteredItems = items;

    // Filter by type (bouquets vs vases)
    if (type !== "all") {
      if (type === "vases") {
        // Filter items that contain "مزهرية" in the title
        filteredItems = filteredItems.filter((item) => item.title.includes("مزهرية"));
      } else if (type === "bouquets") {
        // Filter items that don't contain "مزهرية" in the title
        filteredItems = filteredItems.filter((item) => !item.title.includes("مزهرية"));
      }
    }

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
  }, [items, priceRange, occasion, color, type]);

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
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<string>("all");
  const [occasion, setOccasion] = useState<string>("all");
  const [color, setColor] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  const [shouldOpenOccasionFilter, setShouldOpenOccasionFilter] = useState<boolean>(false);
  const [shouldOpenTypeFilter, setShouldOpenTypeFilter] = useState<boolean>(false);

  // Read query parameters from URL and apply filters
  useEffect(() => {
    const occasionParam = searchParams.get("occasion");
    const typeParam = searchParams.get("type");
    const openFilterParam = searchParams.get("openFilter");

    if (occasionParam) {
      setOccasion(occasionParam);
      setPage(1);
    }

    if (typeParam) {
      setType(typeParam);
      setPage(1);
    }

    // Open filters panel and occasion section if openFilter=occasion
    if (openFilterParam === "occasion") {
      setIsFiltersOpen(true);
      setShouldOpenOccasionFilter(true);
    }

    // Open filters panel and type section if openFilter=type
    if (openFilterParam === "type") {
      setIsFiltersOpen(true);
      setShouldOpenTypeFilter(true);
    }
  }, [searchParams]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  // Removed outside click-to-close behavior; panel toggles only via header button or close icon

  const { sorted, current, totalPages } = useBouquetListing(items, {
    priceRange,
    occasion,
    color,
    type,
    sort,
    page,
    pageSize,
  });

  const reset = () => {
    setPriceRange("all");
    setOccasion("all");
    setColor("all");
    setType("all");
    setPage(1);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <ToggleButton isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:items-start" style={{ transform: 'none' }}>
        <Sidebar
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          occasion={occasion}
          setOccasion={setOccasion}
          color={color}
          setColor={setColor}
          type={type}
          setType={setType}
          setPage={setPage}
          reset={reset}
          openOccasionFilter={shouldOpenOccasionFilter}
          openTypeFilter={shouldOpenTypeFilter}
        />
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span
                className="text-[18px] font-medium text-[#4d4d4d] whitespace-nowrap"
                style={fontStyle}
              >
                الترتيب حسب
              </span>
              <div className="relative w-full sm:w-[195px]">
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  onBlur={() =>
                    setTimeout(() => setIsSortDropdownOpen(false), TIMEOUTS.DROPDOWN_CLOSE_DELAY)
                  }
                  className="w-full h-[45px] rounded-[10px] border border-[#c6c5c5] bg-white px-4 py-2.5 text-right text-[18px] text-[#4d4d4d] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 cursor-pointer flex items-center justify-between"
                  style={{
                    paddingLeft: "2.5rem",
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  <span>
                    {sort === "popular" && "الأكثر طلبا"}
                    {sort === "price-asc" && "السعر: من الأقل للأعلى"}
                    {sort === "price-desc" && "السعر: من الأعلى للأقل"}
                    {sort === "newest" && "الأحدث"}
                  </span>
                  {isSortDropdownOpen ? (
                    <ChevronUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9d9d9d] pointer-events-none transition-transform" />
                  ) : (
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9d9d9d] pointer-events-none transition-transform" />
                  )}
                </button>

                {isSortDropdownOpen && (
                  <div
                    className="absolute z-50 w-full mt-1 bg-white border border-[#c6c5c5] rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto"
                    style={{ direction: "ltr" }}
                  >
                    {[
                      { value: "popular", label: "الأكثر طلبا" },
                      { value: "price-asc", label: "السعر: من الأقل للأعلى" },
                      { value: "price-desc", label: "السعر: من الأعلى للأقل" },
                      { value: "newest", label: "الأحدث" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSort(option.value);
                          setPage(1);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 text-[16px] text-right cursor-pointer hover:bg-[#5A5E4D]/10 transition-colors ${
                          sort === option.value ? "bg-[#5A5E4D]/5 font-semibold" : ""
                        }`}
                        style={fontStyle}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
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
              {current.map((i, index) => {
                // أنيميشن متدرج جميل: fade-up مع تأخير متدرج سلس
                // كل كاردة تظهر بعد الأخرى بشكل متدرج
                const delay = Math.min(index * 60, 300); // تأخير أقصاه 300ms

                return (
                  <AOSWrapper
                    key={i.id}
                    animation="fade-up"
                    delay={delay}
                    duration={600}
                    offset={80}
                  >
                    <div className="h-full">
                      <ProductCard item={i} />
                    </div>
                  </AOSWrapper>
                );
              })}
            </div>
          )}
          {sorted.length > 0 && (
            <div className="text-sm text-gray-600 mt-4" style={fontStyle}>
              {`عرض ${current.length} من أصل ${sorted.length} باقة`}
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
        className="w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border border-[#dedcdc] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
              className={`w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border transition-all text-[18px] ${
                page === n
                  ? "bg-[#5A5E4D] text-white border-[#5A5E4D] font-normal"
                  : "bg-white border-[#dedcdc] text-black hover:bg-gray-50"
              }`}
              style={fontStyle}
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
                  className="w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border bg-white border-[#dedcdc] text-black hover:bg-gray-50 text-[18px]"
                  style={fontStyle}
                >
                  1
                </button>
                {page > 3 && (
                  <span className="w-[35px] h-[33px] flex items-center justify-center text-gray-500">
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
                  className={`w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border transition-all text-[18px] ${
                    page === n
                      ? "bg-[#5A5E4D] text-white border-[#5A5E4D] font-normal"
                      : "bg-white border-[#dedcdc] text-black hover:bg-gray-50"
                  }`}
                  style={fontStyle}
                >
                  {n}
                </button>
              ))}

            {page < totalPages - 1 && (
              <>
                {page < totalPages - 2 && (
                  <span className="w-[35px] h-[33px] flex items-center justify-center text-gray-500">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border bg-white border-[#dedcdc] text-black hover:bg-gray-50 text-[18px]"
                  style={fontStyle}
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
        className="w-[35px] h-[33px] flex items-center justify-center rounded-[2px] border border-[#dedcdc] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

