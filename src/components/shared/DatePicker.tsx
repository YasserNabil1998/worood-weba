"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { formatDateToArabic } from "@/lib/utils";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isDateDisabled,
  isDateSelected,
} from "@/lib/utils/delivery";
import { ARABIC_MONTHS } from "@/constants";
import { fontStyle } from "@/lib/styles";

interface DatePickerProps {
  /** التاريخ المحدد (ISO string: YYYY-MM-DD) */
  selectedDate: string | null;
  /** دالة استدعاء عند اختيار تاريخ */
  onDateSelect: (date: string) => void;
  /** نص التسمية */
  label?: string;
  /** نص placeholder */
  placeholder?: string;
  /** فئة CSS إضافية */
  className?: string;
}

/**
 * مكون منتقي التاريخ (تقويم)
 * Date Picker Component (Calendar)
 */
export default function DatePicker({
  selectedDate,
  onDateSelect,
  label = "تاريخ التوصيل",
  placeholder = "اختر التاريخ",
  className = "",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);

  // Initialize current month and year on client side
  useEffect(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  // إغلاق التقويم عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // التنقل بين الشهور
  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // اختيار التاريخ
  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const isoDate = selectedDate.toISOString().split("T")[0];
    onDateSelect(isoDate);
    setIsOpen(false);
  };

  // الحصول على أيام الأسبوع بالعربية
  const weekDays = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      {label && (
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
          style={fontStyle}
        >
          {label}
        </div>
      )}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
          style={fontStyle}
        >
          <span className={selectedDate ? "text-black" : "text-gray-400"}>
            {selectedDate ? formatDateToArabic(selectedDate) : placeholder}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#605f5f] hover:text-[#5A5E4D] cursor-pointer flex items-center justify-center transition-colors z-10"
          aria-label="فتح/إغلاق التقويم"
        >
          <Calendar
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* التقويم المخصص */}
        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 p-4">
            {/* رأس التقويم */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="الشهر السابق"
              >
                <ChevronRight className="w-5 h-5 text-[#605f5f]" />
              </button>
              <div
                className="text-[18px] font-semibold text-black"
                style={fontStyle}
              >
                {ARABIC_MONTHS[currentMonth]} {currentYear}
              </div>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="الشهر التالي"
              >
                <ChevronLeft className="w-5 h-5 text-[#605f5f]" />
              </button>
            </div>

            {/* أيام الأسبوع */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-[14px] font-semibold text-[#605f5f] py-2"
                  style={fontStyle}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* الأيام */}
            <div className="grid grid-cols-7 gap-1">
              {/* أيام فارغة قبل اليوم الأول */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}
              {/* أيام الشهر */}
              {days.map((day) => {
                const disabled = isDateDisabled(day, currentMonth, currentYear);
                const selected = isDateSelected(day, currentMonth, currentYear, selectedDate);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !disabled && handleDateSelect(day)}
                    disabled={disabled}
                    className={`aspect-square rounded-[8px] text-[14px] transition-colors ${
                      disabled
                        ? "text-gray-300 cursor-not-allowed"
                        : selected
                          ? "bg-[#5A5E4D] text-white font-semibold"
                          : "text-black hover:bg-gray-100 cursor-pointer"
                    }`}
                    style={fontStyle}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

