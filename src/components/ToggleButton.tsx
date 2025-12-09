"use client";

import { Filter } from "lucide-react";
import { fontStyle } from "@/lib/styles";

type ToggleButtonProps = {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
};

export default function ToggleButton({ isFiltersOpen, setIsFiltersOpen }: ToggleButtonProps) {
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="w-full flex items-center justify-between bg-white rounded-xl shadow p-4 text-right hover:shadow-md transition-shadow duration-200"
        aria-label={isFiltersOpen ? "إغلاق التصفية" : "فتح التصفية"}
        aria-expanded={isFiltersOpen}
      >
        <div className="flex items-center gap-2">
          <Filter
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              isFiltersOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-sm text-gray-600">تصفية النتائج</span>
        </div>
        <h3 className="font-bold text-gray-800" style={fontStyle}>
          تصفية النتائج
        </h3>
      </button>
    </div>
  );
}
