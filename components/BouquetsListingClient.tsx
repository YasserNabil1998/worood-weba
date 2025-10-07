"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import ProductCard, { ProductItem } from "@/components/ProductCard";

type ListingItem = ProductItem & {
    color?: string;
    occasion?: string;
    isPopular?: boolean;
};

export default function BouquetsListingClient({
    items,
}: {
    items: ListingItem[];
}) {
    const [price, setPrice] = useState<number>(1000);
    const [occasion, setOccasion] = useState<string>("all");
    const [color, setColor] = useState<string>("all");
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("popular");
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
    const filtersRef = useRef<HTMLDivElement>(null);
    const pageSize = 9;

    // Close filters when clicking outside
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

    const filtered = useMemo(() => {
        const arr = items.filter((i) => i.price <= price);
        const occ =
            occasion === "all"
                ? arr
                : arr.filter((i) => i.occasion === occasion);
        const col =
            color === "all" ? occ : occ.filter((i) => i.color === color);
        return col;
    }, [items, price, occasion, color]);

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
                return arr; // popular
        }
    }, [filtered, sort]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const current = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page]);

    const reset = () => {
        setPrice(1000);
        setOccasion("all");
        setColor("all");
        setPage(1);
    };

    return (
        <div className="space-y-4" dir="rtl">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden" ref={filtersRef}>
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full flex items-center justify-between bg-white rounded-xl shadow p-4 text-right hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex items-center gap-2">
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                isFiltersOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <span className="text-sm text-gray-600">
                            تصفية النتائج
                        </span>
                    </div>
                    <h3
                        className="font-bold text-gray-800"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        تصفية النتائج
                    </h3>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
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
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm text-gray-700 mb-2">
                                نطاق السعر
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={1000}
                                value={price}
                                onChange={(e) => {
                                    setPrice(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="w-full"
                            />
                            <div className="flex justify-between text-[12px] text-gray-500 mt-1">
                                <span>0 ريال</span>
                                <span>{price} ريال</span>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm text-gray-700 mb-2">
                                المناسبة
                            </label>
                            <ul className="space-y-2 text-sm">
                                {[
                                    ["all", "جميع المناسبات"],
                                    ["wedding", "زفاف"],
                                    ["anniversary", "ذكرى سنوية"],
                                    ["graduation", "تخرج"],
                                    ["engagement", "خطوبة"],
                                    ["newborn", "مواليد جديد"],
                                    ["getwell", "شفاء عاجل"],
                                    ["thanks", "شكر وتقدير"],
                                ].map(([key, label]) => (
                                    <li
                                        key={key}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="occ"
                                            checked={occasion === key}
                                            onChange={() => {
                                                setOccasion(key);
                                                setPage(1);
                                            }}
                                        />
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-2">
                                اللون
                            </label>
                            <div className="flex items-center gap-2">
                                {[
                                    ["all", "#e5e7eb"],
                                    ["green", "#16a34a"],
                                    ["red", "#f43f5e"],
                                    ["orange", "#f97316"],
                                    ["cyan", "#06b6d4"],
                                    ["violet", "#8b5cf6"],
                                    ["amber", "#f59e0b"],
                                ].map(([key, c]) => (
                                    <button
                                        key={key}
                                        aria-label={key as string}
                                        onClick={() => {
                                            setColor(key as string);
                                            setPage(1);
                                        }}
                                        className={`h-5 w-5 rounded-full border ${
                                            color === key
                                                ? "ring-2 ring-offset-2 ring-[#5A5E4D]"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: c as string }}
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

                {/* Grid + toolbar + pager */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
                        <div className="text-gray-600">
                            عرض {current.length} من أصل {sorted.length} باقة
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                            <span className="text-gray-600 whitespace-nowrap">
                                ترتيب حسب
                            </span>
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
                                    <option value="price-asc">
                                        السعر: من الأقل للأعلى
                                    </option>
                                    <option value="price-desc">
                                        السعر: من الأعلى للأقل
                                    </option>
                                    <option value="newest">الأحدث</option>
                                </select>
                                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                                    ▾
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {current.map((i) => (
                            <ProductCard key={i.id} item={i} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {/* Previous Button */}
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Pagination Numbers */}
                        <div className="flex gap-2">
                            {totalPages <= 5 ? (
                                // Show all pages if 5 or less
                                Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                ).map((n) => (
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
                                ))
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
                                                onClick={() =>
                                                    setPage(totalPages)
                                                }
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
                            onClick={() =>
                                setPage(Math.min(totalPages, page + 1))
                            }
                            disabled={page === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Next"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
