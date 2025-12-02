"use client";

import { useId, useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { PRICE_RANGES, OCCASIONS, COLORS, TYPES } from "@/src/constants/bouquets";
import { fontStyle } from "@/src/lib/styles";

type SidebarProps = {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  priceRange: string;
  setPriceRange: (v: string) => void;
  occasion: string;
  setOccasion: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  setPage: (n: number) => void;
  reset: () => void;
  openOccasionFilter?: boolean;
  openTypeFilter?: boolean;
};

function FilterSection({
  title,
  children,
  sectionId,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  sectionId: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="mb-5">
      <button
        type="button"
        aria-controls={sectionId}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between py-2 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 rounded-lg px-2"
      >
        <span className="text-[20px] font-bold text-black" style={fontStyle}>
          {title}
        </span>
        <div className="flex items-center justify-center">
          <ChevronDown
            className={`w-6 h-6 text-[#5a5e4d] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
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
  type,
  setType,
  setPage,
  reset,
  openOccasionFilter = false,
  openTypeFilter = false,
}: SidebarProps) {
  const [openSection, setOpenSection] = useState<string | null>("type");

  // Open occasion filter section when openOccasionFilter is true
  useEffect(() => {
    if (openOccasionFilter) {
      setOpenSection("occasion");
    }
  }, [openOccasionFilter]);

  // Open type filter section when openTypeFilter is true
  useEffect(() => {
    if (openTypeFilter) {
      setOpenSection("type");
    }
  }, [openTypeFilter]);

  const handleToggle = (sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const typeSectionId = useId();
  const priceSectionId = useId();
  const occasionSectionId = useId();
  const colorSectionId = useId();

  return (
    <aside
      className={`lg:col-span-1 transition-all duration-300 ${
        isFiltersOpen ? "block lg:block" : "hidden lg:block"
      } lg:sticky lg:top-28 lg:self-start`}
    >
      <div
        className={`bg-white border border-[#e6e6e6] rounded-[20px] transition-all duration-300 ${
          isFiltersOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0"
        } lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto`}
        style={{ direction: "ltr" }}
      >
        <div className="px-6 py-3" style={{ direction: "rtl" }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[25px] font-extrabold text-black text-center" style={fontStyle}>
              تصفية النتائج
            </h3>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <FilterSection
            title="النوع"
            sectionId={typeSectionId}
            isOpen={openSection === "type"}
            onToggle={() => handleToggle("type")}
          >
            <ul className="space-y-3 text-[15px] mt-4">
              {TYPES.map((typeOption) => {
                const inputId = `type-${typeOption.key}`;
                return (
                  <li key={typeOption.key} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={inputId}
                      name="type"
                      checked={type === typeOption.key}
                      onChange={() => {
                        setType(typeOption.key);
                        setPage(1);
                      }}
                      className="w-[15px] h-[15px] text-[#5a5e4d] focus:outline-none cursor-pointer"
                    />
                    <label
                      htmlFor={inputId}
                      className={`cursor-pointer ${type === typeOption.key ? "text-[#5a5e4d]" : "text-[#5a5e4d]"}`}
                      style={fontStyle}
                    >
                      {typeOption.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          <FilterSection
            title="نطاق السعر"
            sectionId={priceSectionId}
            isOpen={openSection === "price"}
            onToggle={() => handleToggle("price")}
          >
            <ul className="space-y-3 text-[15px] mt-4">
              {PRICE_RANGES.map((range) => {
                const inputId = `price-${range.key}`;
                return (
                  <li key={range.key} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={inputId}
                      name="priceRange"
                      checked={priceRange === range.key}
                      onChange={() => {
                        setPriceRange(range.key);
                        setPage(1);
                      }}
                      className="w-[15px] h-[15px] text-[#5a5e4d] focus:outline-none cursor-pointer"
                    />
                    <label
                      htmlFor={inputId}
                      className={`cursor-pointer ${priceRange === range.key ? "text-[#5a5e4d]" : "text-[#5a5e4d]"}`}
                      style={fontStyle}
                    >
                      {range.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          <FilterSection
            title="المناسبة"
            sectionId={occasionSectionId}
            isOpen={openSection === "occasion"}
            onToggle={() => handleToggle("occasion")}
          >
            <ul className="space-y-3 text-[15px] mt-4">
              {OCCASIONS.map((occ) => {
                const inputId = `occasion-${occ.key}`;
                return (
                  <li key={occ.key} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={inputId}
                      name="occ"
                      checked={occasion === occ.key}
                      onChange={() => {
                        setOccasion(occ.key);
                        setPage(1);
                      }}
                      className="w-[15px] h-[15px] text-[#5a5e4d] focus:outline-none cursor-pointer"
                    />
                    <label
                      htmlFor={inputId}
                      className={`cursor-pointer ${occasion === occ.key ? "text-[#5a5e4d]" : "text-[#5a5e4d]"}`}
                      style={fontStyle}
                    >
                      {occ.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          <FilterSection
            title="اللون"
            sectionId={colorSectionId}
            isOpen={openSection === "color"}
            onToggle={() => handleToggle("color")}
          >
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
            className="mt-3 w-full rounded-[5px] py-2 bg-[#5a5e4d] text-white text-[17px] font-normal hover:bg-[#4a4e3d] transition-colors duration-200"
            style={fontStyle}
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      </div>
    </aside>
  );
}
