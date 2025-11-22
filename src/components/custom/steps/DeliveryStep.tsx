import { useSearchParams } from "next/navigation";
import { DeliveryTime } from "@/src/@types/custom/index.type";
import { Loader2, ChevronRight, ChevronLeft, Calendar, ChevronDown } from "lucide-react";
import { formatDateToArabic } from "@/src/lib/utils";
import { ARABIC_MONTHS } from "@/src/constants";
import { useRef, useState, useEffect } from "react";

interface DeliveryStepProps {
  deliveryType: "today" | "scheduled";
  onDeliveryTypeChange: (type: "today" | "scheduled") => void;
  deliveryTimes: DeliveryTime[];
  deliveryTime: string;
  onDeliveryTimeChange: (time: string) => void;
  deliveryDate: string;
  onDeliveryDateChange: (date: string) => void;
  isAddingToCart: boolean;
  onPrevStep: () => void;
  onAddToCart: () => void;
}

export default function DeliveryStep({
  deliveryType,
  onDeliveryTypeChange,
  deliveryTimes,
  deliveryTime,
  onDeliveryTimeChange,
  deliveryDate,
  onDeliveryDateChange,
  isAddingToCart,
  onPrevStep,
  onAddToCart,
}: DeliveryStepProps) {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // إنشاء قائمة الأوقات المتاحة (كل 30 دقيقة من 8 صباحاً إلى 10 مساءً)
  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? "ص" : "م";
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const timeString = `${displayHour.toString().padStart(2, "0")} : ${minute.toString().padStart(2, "0")} ${period}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // إغلاق التقويم عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setIsTimePickerOpen(false);
      }
    };

    if (isDatePickerOpen || isTimePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen, isTimePickerOpen]);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const toggleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const handleTimeSelect = (time: string) => {
    onDeliveryTimeChange(time);
    setIsTimePickerOpen(false);
  };

  // الحصول على أيام الشهر
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // الحصول على اليوم الأول من الشهر (0 = الأحد، 6 = السبت)
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    // تحويل إلى RTL (الأحد = 0، السبت = 6)
    return (firstDay + 1) % 7; // تحويل ليكون السبت = 0
  };

  // اختيار التاريخ
  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const isoDate = selectedDate.toISOString().split("T")[0];
    onDeliveryDateChange(isoDate);
    setIsDatePickerOpen(false);
  };

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

  // التحقق من أن التاريخ في الماضي
  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // التحقق من أن التاريخ هو التاريخ المحدد
  const isDateSelected = (day: number) => {
    if (!deliveryDate) return false;
    const selectedDate = new Date(deliveryDate);
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  // الحصول على أيام الأسبوع بالعربية
  const weekDays = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Delivery type */}
      <div>
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          التوصيل
        </div>
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-[#605f5f] text-right"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          نوع التوصيل
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onDeliveryTypeChange("today")}
            className={`h-[45px] sm:h-[51px] rounded-[10px] border transition-colors ${
              deliveryType === "today"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-[#e1dada] bg-[#f2f2f2] text-[#303030] hover:bg-gray-100"
            }`}
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span className="text-[16px] sm:text-[18px] lg:text-[20px]">توصيل اليوم</span>
          </button>
          <button
            type="button"
            onClick={() => onDeliveryTypeChange("scheduled")}
            className={`h-[45px] sm:h-[51px] rounded-[10px] border transition-colors ${
              deliveryType === "scheduled"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-[#e1dada] bg-[#f2f2f2] text-[#303030] hover:bg-gray-100"
            }`}
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span className="text-[16px] sm:text-[18px] lg:text-[20px]">حجز مسبق</span>
          </button>
        </div>
      </div>

      {/* Delivery time and date */}
      {deliveryType === "scheduled" ? (
        /* For scheduled delivery: show time and date in the same row */
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* وقت التوصيل */}
            <div className="relative" ref={timePickerRef}>
              <div
                className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                وقت التوصيل
              </div>
              <div className="relative">
                <div
                  onClick={toggleTimePicker}
                  className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  <span className={deliveryTime ? "text-black" : "text-gray-400"}>
                    {deliveryTime || "اختر الوقت"}
                  </span>
                </div>
                <ChevronDown
                  className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#605f5f] pointer-events-none transition-transform ${isTimePickerOpen ? "rotate-180" : ""}`}
                />

                {/* قائمة الأوقات */}
                {isTimePickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                    <div className="p-2">
                      {timeOptions.map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTimeSelect(time)}
                          className={`w-full text-right px-4 py-2 rounded-[8px] transition-colors ${
                            deliveryTime === time
                              ? "bg-[#5A5E4D] text-white"
                              : "text-black hover:bg-gray-100"
                          }`}
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* تاريخ التوصيل */}
            <div className="relative" ref={calendarRef}>
              <div
                className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                تاريخ التوصيل
              </div>
              <div className="relative">
                <div
                  onClick={toggleDatePicker}
                  className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  <span className={deliveryDate ? "text-black" : "text-gray-400"}>
                    {deliveryDate ? formatDateToArabic(deliveryDate) : "اختر التاريخ"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDatePicker();
                  }}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#605f5f] hover:text-[#5A5E4D] cursor-pointer flex items-center justify-center transition-colors z-10"
                  aria-label="فتح/إغلاق التقويم"
                >
                  <Calendar
                    className={`w-5 h-5 transition-transform ${isDatePickerOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* التقويم المخصص */}
                {isDatePickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 p-4">
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
                        style={{ fontFamily: "var(--font-almarai)" }}
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
                          style={{ fontFamily: "var(--font-almarai)" }}
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
                        const disabled = isDateDisabled(day);
                        const selected = isDateSelected(day);
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
                            style={{ fontFamily: "var(--font-almarai)" }}
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
          </div>
        </div>
      ) : (
        /* For today delivery: show only time */
        <div>
          <div
            className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            وقت التوصيل
          </div>
          <div className="relative" ref={timePickerRef}>
            <div
              onClick={toggleTimePicker}
              className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              <span className={deliveryTime ? "text-black" : "text-gray-400"}>
                {deliveryTime || "اختر الوقت"}
              </span>
            </div>
            <ChevronDown
              className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#605f5f] pointer-events-none transition-transform ${isTimePickerOpen ? "rotate-180" : ""}`}
            />

            {/* قائمة الأوقات */}
            {isTimePickerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                <div className="p-2">
                  {timeOptions.map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={`w-full text-right px-4 py-2 rounded-[8px] transition-colors ${
                        deliveryTime === time
                          ? "bg-[#5A5E4D] text-white"
                          : "text-black hover:bg-gray-100"
                      }`}
                      style={{ fontFamily: "var(--font-almarai)" }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-between gap-2 mt-6">
        <button
          onClick={onPrevStep}
          disabled={isAddingToCart}
          className="w-[130px] h-[50px] px-4 rounded-[5px] bg-[#dadada] text-[#434445] text-[18px] font-bold hover:bg-gray-300 transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          <ChevronRight className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-center">السابق</span>
        </button>
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className="w-[130px] h-[50px] px-4 rounded-[5px] bg-[#5f664f] text-white text-[15px] font-bold hover:bg-[#4b5244] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {isAddingToCart ? (
            <span className="flex items-center gap-1 text-right">
              <Loader2 className="animate-spin h-3 w-3 text-white flex-shrink-0" />
              {isEditMode ? "جاري التحديث..." : "جاري الإضافة..."}
            </span>
          ) : (
            <span className="text-right whitespace-nowrap">
              {isEditMode ? "تحديث السلة" : "إضافة إلى السلة"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
