"use client";

import { useId, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { PRICE_RANGES, OCCASIONS, COLORS } from "@/src/constants/bouquets";

type SidebarProps = {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  priceRange: string;
  setPriceRange: (v: string) => void;
  occasion: string;
  setOccasion: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  setPage: (n: number) => void;
  reset: () => void;
};

function FilterSection({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  const sectionId = useId();
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <div className="mb-5">
      <button
        type="button"
        aria-controls={sectionId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between py-2 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 rounded-lg px-2"
      >
        <span
          className="text-[20px] font-bold text-black"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {title}
        </span>
        <div className="flex items-center justify-center">
          <ChevronDown
            className={`w-6 h-6 text-[#5a5e4d] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {open && (
        <div id={sectionId} className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  isFiltersOpen,
  setIsFiltersOpen,
  priceRange,
  setPriceRange,
  occasion,
  setOccasion,
  color,
  setColor,
  setPage,
  reset,
}: SidebarProps) {
  return (
    <aside
      className={`lg:col-span-1 transition-all duration-300 ${
        isFiltersOpen ? "block lg:block" : "hidden lg:block"
      } lg:sticky lg:top-28 lg:self-start`}
    >
      <div
        className={`bg-white border border-[#e6e6e6] rounded-[20px] p-6 transition-all duration-300 ${
          isFiltersOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0"
        } lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-[25px] font-extrabold text-black text-center"
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
        <FilterSection title="نطاق السعر" defaultOpen={true}>
          <ul className="space-y-3 text-[15px] mt-4">
            {PRICE_RANGES.map((range) => (
              <li key={range.key} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === range.key}
                  onChange={() => {
                    setPriceRange(range.key);
                    setPage(1);
                  }}
                  className="w-[15px] h-[15px] text-[#5a5e4d] focus:ring-[#5a5e4d] focus:ring-2"
                />
                <span
                  className={priceRange === range.key ? "text-[#5a5e4d]" : "text-[#5a5e4d]"}
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  {range.label}
                </span>
              </li>
            ))}
          </ul>
        </FilterSection>

        <FilterSection title="المناسبة" defaultOpen={false}>
          <ul className="space-y-3 text-[15px] mt-4">
            {OCCASIONS.map((occ) => (
              <li key={occ.key} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="occ"
                  checked={occasion === occ.key}
                  onChange={() => {
                    setOccasion(occ.key);
                    setPage(1);
                  }}
                  className="w-[15px] h-[15px] text-[#5a5e4d] focus:ring-[#5a5e4d] focus:ring-2"
                />
                <span
                  className={occasion === occ.key ? "text-[#5a5e4d]" : "text-[#5a5e4d]"}
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  {occ.label}
                </span>
              </li>
            ))}
          </ul>
        </FilterSection>

        <FilterSection title="اللون" defaultOpen={false}>
          <div className="flex items-center gap-2 mt-4">
            {COLORS.filter((col) => col.key !== "all").map((col) => (
              <button
                key={col.key}
                aria-label={col.label}
                onClick={() => {
                  setColor(col.key);
                  setPage(1);
                }}
                className={`h-5 w-5 rounded-full border ${
                  color === col.key ? "ring-2 ring-offset-2 ring-[#5A5E4D]" : ""
                }`}
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>
        </FilterSection>

        <button
          onClick={reset}
          className="mt-6 w-full rounded-[5px] py-3 bg-[#5a5e4d] text-white text-[17px] font-normal hover:bg-[#4a4e3d] transition-colors duration-200"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          إعادة ضبط الفلاتر
        </button>
      </div>
    </aside>
  );
}
