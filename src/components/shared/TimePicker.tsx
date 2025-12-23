"use client";

import { useRef, useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { formatTimeToArabic } from "@/lib/utils";
import { parseCurrentTime, getDisplayTime, convertTo24Hour } from "@/lib/utils/delivery";
import { fontStyle } from "@/lib/styles";

interface TimePickerProps {
  /** الوقت المحدد (بتنسيق عربي أو HTML) */
  selectedTime: string;
  /** دالة استدعاء عند تغيير الوقت */
  onTimeChange: (time: string) => void;
  /** نص التسمية */
  label?: string;
  /** نص placeholder */
  placeholder?: string;
  /** فئة CSS إضافية */
  className?: string;
}

/**
 * مكون منتقي الوقت (ساعة/دقيقة/فترة)
 * Time Picker Component (Hour/Minute/Period)
 */
export default function TimePicker({
  selectedTime,
  onTimeChange,
  label = "وقت التوصيل",
  placeholder = "اختر الوقت",
  className = "",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  // تحليل الوقت الحالي
  const currentTime = parseCurrentTime(selectedTime);
  const [selectedHour, setSelectedHour] = useState(currentTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(currentTime.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<"ص" | "م">(currentTime.period);

  // تحديث الوقت عند تغيير selectedTime
  useEffect(() => {
    const time = parseCurrentTime(selectedTime);
    setSelectedHour(time.hour);
    setSelectedMinute(time.minute);
    setSelectedPeriod(time.period);
  }, [selectedTime]);

  // توليد قوائم الساعات والدقائق
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods: ("ص" | "م")[] = ["ص", "م"];

  // تنسيق الوقت للعرض
  const displayTime = getDisplayTime(selectedTime);

  // تحديث الوقت عند تغيير الاختيار
  useEffect(() => {
    if (isOpen) {
      const timeString = convertTo24Hour(selectedHour, selectedMinute, selectedPeriod);
      const arabicTime = formatTimeToArabic(timeString);
      onTimeChange(arabicTime);
    }
  }, [selectedHour, selectedMinute, selectedPeriod, isOpen, onTimeChange]);

  // التمرير إلى العنصر المحدد عند فتح المنتقي
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
          if (ref.current) {
            const item = ref.current.children[index] as HTMLElement;
            if (item) {
              item.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        };
        scrollToSelected(hoursRef, selectedHour - 1);
        scrollToSelected(minutesRef, selectedMinute);
        scrollToSelected(periodRef, selectedPeriod === "ص" ? 0 : 1);
      }, 100);
    }
  }, [isOpen, selectedHour, selectedMinute, selectedPeriod]);

  // إغلاق منتقي الوقت عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
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

  const toggleTimePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={timePickerRef}>
      {label && (
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
          style={fontStyle}
        >
          {label}
        </div>
      )}
      <div className="relative">
        {/* واجهة العرض */}
        <div
          onClick={toggleTimePicker}
          className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
          style={fontStyle}
        >
          <span className={displayTime ? "text-black" : "text-gray-400"}>
            {displayTime || placeholder}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleTimePicker();
          }}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#605f5f] hover:text-[#5A5E4D] cursor-pointer flex items-center justify-center transition-colors z-10"
          aria-label="فتح منتقي الوقت"
        >
          <Clock
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* منتقي الوقت المخصص بتصميم ثلاثة أعمدة */}
        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 overflow-hidden">
            {/* رأس المنتقي */}
            <div className="p-4 border-b border-gray-200">
              <div
                className="text-[16px] font-semibold text-black text-center"
                style={fontStyle}
              >
                اختر الوقت
              </div>
            </div>

            {/* الأعمدة الثلاثة */}
            <div className="flex h-[280px]">
              {/* عمود الدقائق */}
              <div
                className="flex-1 border-l border-gray-200 overflow-y-auto hide-scrollbar"
                ref={minutesRef}
              >
                <div className="py-[120px]">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      onClick={() => setSelectedMinute(minute)}
                      className={`w-full py-3 text-center text-[16px] transition-colors ${
                        selectedMinute === minute
                          ? "bg-gray-100 text-[#5A5E4D] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={fontStyle}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* عمود الساعات */}
              <div
                className="flex-1 border-l border-gray-200 overflow-y-auto hide-scrollbar"
                ref={hoursRef}
              >
                <div className="py-[120px]">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setSelectedHour(hour)}
                      className={`w-full py-3 text-center text-[16px] transition-colors ${
                        selectedHour === hour
                          ? "bg-gray-100 text-[#5A5E4D] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={fontStyle}
                    >
                      {hour.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* عمود الفترة (ص/م) */}
              <div
                className="flex-1 border-l border-gray-200 overflow-y-auto hide-scrollbar"
                ref={periodRef}
              >
                <div className="py-[120px]">
                  {periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelectedPeriod(period)}
                      className={`w-full py-3 text-center text-[16px] transition-colors ${
                        selectedPeriod === period
                          ? "bg-gray-100 text-[#5A5E4D] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={fontStyle}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

