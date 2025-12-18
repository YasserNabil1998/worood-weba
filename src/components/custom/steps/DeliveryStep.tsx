import { useSearchParams } from "next/navigation";
import { DeliveryTime } from "@/types/custom";
import { Loader2, ChevronRight, ChevronLeft, Calendar, Clock } from "lucide-react";
import { formatDateToArabic, formatTimeToArabic, formatTimeToHTML } from "@/lib/utils";
import { ARABIC_MONTHS } from "@/constants";
import { useRef, useState, useEffect } from "react";
import { fontStyle } from "@/lib/styles";

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
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // تحليل الوقت الحالي
  const parseCurrentTime = () => {
    if (!deliveryTime) return { hour: 8, minute: 0, period: "ص" };

    let hour = 8;
    let minute = 0;
    let period = "ص";

    if (deliveryTime.includes("ص") || deliveryTime.includes("م")) {
      const match = deliveryTime.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);
      if (match) {
        hour = parseInt(match[1], 10);
        minute = parseInt(match[2], 10);
        period = match[3];
      }
    } else {
      const htmlTime = formatTimeToHTML(deliveryTime);
      if (htmlTime) {
        const [h, m] = htmlTime.split(":");
        const hNum = parseInt(h, 10);
        hour = hNum > 12 ? hNum - 12 : hNum === 0 ? 12 : hNum;
        minute = parseInt(m, 10);
        period = hNum < 12 ? "ص" : "م";
      }
    }

    return { hour, minute, period };
  };

  const currentTime = parseCurrentTime();
  const [selectedHour, setSelectedHour] = useState(currentTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(currentTime.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<"ص" | "م">(currentTime.period as "ص" | "م");

  // تحديث الوقت عند تغيير deliveryTime
  useEffect(() => {
    const time = parseCurrentTime();
    setSelectedHour(time.hour);
    setSelectedMinute(time.minute);
    setSelectedPeriod(time.period as "ص" | "م");
  }, [deliveryTime]);

  // توليد قوائم الساعات والدقائق
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods: ("ص" | "م")[] = ["ص", "م"];

  // تنسيق الوقت للعرض مع عكس ترتيب الساعات والدقائق
  const getDisplayTime = (): string => {
    if (!deliveryTime) return "";

    let timeStr = deliveryTime;

    // إذا كان الوقت بتنسيق HTML، نحوله أولاً إلى عربي
    if (!timeStr.includes("ص") && !timeStr.includes("م")) {
      timeStr = formatTimeToArabic(timeStr);
    }

    // إذا كان الوقت بتنسيق عربي، نعكس ترتيب الساعات والدقائق
    if (timeStr.includes("ص") || timeStr.includes("م")) {
      const match = timeStr.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);
      if (match) {
        const hour = match[1];
        const minute = match[2];
        const period = match[3];
        // عكس الترتيب: دقائق:ساعات
        return `${minute} : ${hour} ${period}`;
      }
    }

    return timeStr;
  };

  const displayTime = getDisplayTime();

  // تحديث الوقت عند تغيير الاختيار
  useEffect(() => {
    if (isTimePickerOpen) {
      const hour24 =
        selectedPeriod === "م"
          ? selectedHour === 12
            ? 12
            : selectedHour + 12
          : selectedHour === 12
            ? 0
            : selectedHour;
      const timeString = `${hour24.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
      const arabicTime = formatTimeToArabic(timeString);
      onDeliveryTimeChange(arabicTime);
    }
  }, [selectedHour, selectedMinute, selectedPeriod, isTimePickerOpen, onDeliveryTimeChange]);

  // التمرير إلى العنصر المحدد عند فتح المنتقي
  useEffect(() => {
    if (isTimePickerOpen) {
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
  }, [isTimePickerOpen, selectedHour, selectedMinute, selectedPeriod]);

  // إغلاق التقويم ومنتقي الوقت عند النقر خارجه
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
          style={fontStyle}
        >
          التوصيل
        </div>
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-[#605f5f] text-right"
          style={fontStyle}
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
            style={fontStyle}
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
            style={fontStyle}
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
                style={fontStyle}
              >
                وقت التوصيل
              </div>
              <div className="relative">
                {/* واجهة العرض */}
                <div
                  onClick={toggleTimePicker}
                  className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
                  style={fontStyle}
                >
                  <span className={displayTime ? "text-black" : "text-gray-400"}>
                    {displayTime || "اختر الوقت"}
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
                    className={`w-5 h-5 transition-transform ${isTimePickerOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* منتقي الوقت المخصص بتصميم ثلاثة أعمدة */}
                {isTimePickerOpen && (
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
            {/* تاريخ التوصيل */}
            <div className="relative" ref={calendarRef}>
              <div
                className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
                style={fontStyle}
              >
                تاريخ التوصيل
              </div>
              <div className="relative">
                <div
                  onClick={toggleDatePicker}
                  className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
                  style={fontStyle}
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
          </div>
        </div>
      ) : (
        /* For today delivery: show only time */
        <div>
          <div
            className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
            style={fontStyle}
          >
            وقت التوصيل
          </div>
          <div className="relative" ref={timePickerRef}>
            {/* واجهة العرض */}
            <div
              onClick={toggleTimePicker}
              className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 pr-10 text-right text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
              style={fontStyle}
            >
              <span className={displayTime ? "text-black" : "text-gray-400"}>
                {displayTime || "اختر الوقت"}
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
                className={`w-5 h-5 transition-transform ${isTimePickerOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* منتقي الوقت المخصص بتصميم ثلاثة أعمدة */}
            {isTimePickerOpen && (
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
      )}
    </div>
  );
}
