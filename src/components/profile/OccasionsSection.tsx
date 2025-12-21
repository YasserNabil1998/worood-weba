"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Edit, Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import { formatDateToArabic } from "@/lib/utils";
import { ARABIC_MONTHS } from "@/constants";
import { useProfileStore } from "@/stores";
import { useNotification } from "@/providers/notification-provider";

interface Occasion {
  id: string;
  name: string;
  date: string;
  type: string;
  icon: string;
  reminder?: boolean;
}

interface OccasionsSectionProps {
  occasions: Occasion[];
  onAddOccasion?: () => void;
  onEditOccasion?: (id: string) => void;
}

// occasionTypes will be fetched from store

// Map occasion types to emoji icons
const getOccasionIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    "عيد ميلاد": "🎂",
    "ذكرى سنوية": "💑",
    زواج: "💒",
    خطوبة: "💍",
    "نجاح وتخرج": "🎓",
    "مولود جديد": "👶",
    "شفاء عاجل": "🌹",
    "شكر وتقدير": "💐",
  };
  return iconMap[type] || "🎉";
};

export default function OccasionsSection({
  occasions: initialOccasions,
  onAddOccasion,
  onEditOccasion,
}: OccasionsSectionProps) {
  const [occasions, setOccasions] = useState<Occasion[]>(initialOccasions);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOccasionId, setEditingOccasionId] = useState<string | null>(null);
  const [occasionType, setOccasionType] = useState("");
  const [occasionOwner, setOccasionOwner] = useState("");
  const [occasionDate, setOccasionDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef<HTMLDivElement>(null);
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  // Get occasion types from store
  const occasionTypes = useProfileStore((state) => state.occasionTypes);
  const fetchOccasionTypes = useProfileStore((state) => state.fetchOccasionTypes);
  const addOccasion = useProfileStore((state) => state.addOccasion);
  const editOccasion = useProfileStore((state) => state.editOccasion);

  // Notification
  const { showNotification } = useNotification();

  // Fetch occasion types on mount
  useEffect(() => {
    fetchOccasionTypes();
  }, [fetchOccasionTypes]);

  // Helper function to parse Arabic date to ISO
  const parseArabicDateToISO = (arabicDate: string): string => {
    if (!arabicDate) return "";

    // Try to parse date like "15 نوفمبر 2024"
    const ARABIC_MONTHS = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const parts = arabicDate.trim().split(/\s+/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0]);
      const monthName = parts[1];
      const year = parseInt(parts[2]);
      const monthIndex = ARABIC_MONTHS.indexOf(monthName);

      if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
        const date = new Date(year, monthIndex, day);
        return date.toISOString().split("T")[0];
      }
    }

    return "";
  };

  // Update occasions when initialOccasions changes
  // Use useRef to track previous value and compare deeply to avoid infinite loops
  const prevInitialOccasionsRef = useRef<string>("");

  useEffect(() => {
    const currentStr = JSON.stringify(initialOccasions);

    // Only update if the data actually changed
    if (prevInitialOccasionsRef.current !== currentStr) {
      prevInitialOccasionsRef.current = currentStr;
      setOccasions(initialOccasions);
    }
  }, [initialOccasions]);

  // إغلاق التقويم عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  // الحصول على أيام الشهر
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // الحصول على اليوم الأول من الشهر
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay + 1) % 7; // تحويل ليكون السبت = 0
  };

  // اختيار التاريخ
  const handleDateSelect = (day: number) => {
    // Format date as YYYY-MM-DD directly to avoid timezone issues
    const month = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const isoDate = `${currentYear}-${month}-${dayStr}`;
    setOccasionDate(isoDate);
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
    if (!occasionDate) return false;
    // Parse ISO date (YYYY-MM-DD) directly
    const [year, month, dayFromDate] = occasionDate.split("-").map(Number);
    return (
      dayFromDate === day &&
      month - 1 === currentMonth && // month is 1-based in ISO, but currentMonth is 0-based
      year === currentYear
    );
  };

  // الحصول على أيام الأسبوع بالعربية
  const weekDays = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOccasionId(null);
    setOccasionType("");
    setOccasionOwner("");
    setOccasionDate("");
    setReminder(false);
    setShowAddForm(true);
  };

  const handleEditClick = (e: React.MouseEvent, occasionId: string) => {
    e.stopPropagation();
    const occasion = occasions.find((occ) => occ.id === occasionId);
    if (occasion) {
      setEditingOccasionId(occasionId);
      setOccasionType(occasion.type);
      setOccasionOwner(occasion.name);
      // Parse Arabic date to ISO for the date picker
      const isoDate = parseArabicDateToISO(occasion.date);
      setOccasionDate(isoDate);
      // Set calendar to the occasion's date
      if (isoDate) {
        const date = new Date(isoDate);
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
      }
      setReminder(occasion.reminder || false);
      setShowAddForm(true);
    }
    onEditOccasion?.(occasionId);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Validate form
    if (!occasionType || !occasionOwner || !occasionDate) {
      showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
      return;
    }

    try {
      const occasionData = {
        name: occasionOwner,
        type: occasionType,
        date: occasionDate, // ISO format
        reminder: reminder,
      };

      if (editingOccasionId) {
        // Update existing occasion via store
        const result = await editOccasion(editingOccasionId, occasionData);
        if (result.success) {
          // Update local state
          setOccasions(
            occasions.map((occ) =>
              occ.id === editingOccasionId
                ? {
                    ...occ,
                    name: occasionOwner,
                    date: formatDateToArabic(occasionDate),
                    type: occasionType,
                    icon: getOccasionIcon(occasionType),
                    reminder: reminder,
                  }
                : occ
            )
          );
        }
      } else {
        // Create new occasion via store
        const result = await addOccasion(occasionData);
        if (result.success) {
          // Add to local state
          const newOccasion: Occasion = {
            id: Date.now().toString(),
            name: occasionOwner,
            date: formatDateToArabic(occasionDate),
            type: occasionType,
            icon: getOccasionIcon(occasionType),
            reminder: reminder,
          };
          setOccasions([...occasions, newOccasion]);
        }
      }

      // Reset form
      setShowAddForm(false);
      setEditingOccasionId(null);
      setOccasionType("");
      setOccasionOwner("");
      setOccasionDate("");
      setReminder(false);
      setIsDropdownOpen(false);

      // Call parent callback
      onAddOccasion?.();
      showNotification(
        editingOccasionId ? "تم تعديل المناسبة بنجاح" : "تم إضافة المناسبة بنجاح",
        "success"
      );
    } catch (error) {
      showNotification("حدث خطأ أثناء حفظ المناسبة", "error");
    }
  };

  return (
    <div
      className="bg-white rounded-[25px] p-4 sm:p-6 mb-4 cursor-pointer"
      style={fontStyle}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-1">
          <h2 className="text-[20px] font-bold text-black" style={fontStyle}>
            مناسباتي
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#383737]" style={fontStyle}>
            (سيتم إرسال تذكير لك على إيميلك لتذكيرك قبل بأسبوع)
          </p>
        </div>
        <div className="flex items-center justify-center flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
          ) : (
            <div className="rotate-180">
              <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
            </div>
          )}
        </div>
      </div>

      {/* Occasions List */}
      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                className="bg-[#fbfbfb] border border-[#e0e0e0] rounded-[15px] p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-[24px] sm:text-[28px] flex-shrink-0">{occasion.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[16px] sm:text-[18px] font-bold text-black mb-1 truncate"
                      style={fontStyle}
                    >
                      {occasion.name}
                    </h3>
                    <p className="text-[14px] sm:text-[16px] text-[#727272]" style={fontStyle}>
                      {occasion.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleEditClick(e, occasion.id)}
                  className="bg-[gainsboro] w-[40px] h-[36px] rounded-[5px] flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer flex-shrink-0"
                >
                  <Edit className="w-[20px] h-[20px] text-gray-700" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Occasion Form */}
          {showAddForm ? (
            <div className="bg-[#fbfbfb] border border-[#e0e0e0] rounded-[15px] p-4 sm:p-6 mt-4 w-full sm:w-1/2 sm:ml-auto">
              <div className="space-y-4">
                {/* Row 1: ما المناسبة؟ و من صاحب المناسبة */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* ما المناسبة؟ */}
                  <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                    <label className="text-[14px] sm:text-[16px] text-black" style={fontStyle}>
                      ما المناسبة ؟
                    </label>
                    <div className="relative">
                      <div
                        className="border border-[#d2d2d2] rounded-[5px] h-[41px] px-3 flex items-center justify-between cursor-pointer bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                      >
                        <span className="text-[14px] text-[#727272] truncate" style={fontStyle}>
                          {occasionType || "اختر المناسبة"}
                        </span>
                        {isDropdownOpen ? (
                          <ChevronUp className="w-[24px] h-[24px] text-[#585858] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-[24px] h-[24px] text-[#585858] flex-shrink-0" />
                        )}
                      </div>
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-[#d2d2d2] rounded-[5px] shadow-lg max-h-[200px] overflow-y-auto">
                          {occasionTypes.map((type) => (
                            <div
                              key={type.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setOccasionType(type.name);
                                setIsDropdownOpen(false);
                              }}
                              className="px-3 py-2 text-[14px] text-right cursor-pointer hover:bg-gray-100 transition-colors"
                              style={fontStyle}
                            >
                              {type.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* من صاحب المناسبة */}
                  <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                    <label className="text-[14px] sm:text-[16px] text-black" style={fontStyle}>
                      من صاحب المناسبة
                    </label>
                    <input
                      type="text"
                      value={occasionOwner}
                      onChange={(e) => {
                        e.stopPropagation();
                        setOccasionOwner(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="border border-[#d2d2d2] rounded-[5px] h-[41px] px-3 text-[14px] text-[#727272] bg-white w-full"
                      style={fontStyle}
                      placeholder="أدخل اسم صاحب المناسبة"
                    />
                  </div>
                </div>

                {/* Row 2: ما تاريخ المناسبة؟ */}
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] sm:text-[16px] text-black" style={fontStyle}>
                    ما تاريخ المناسبة ؟
                  </label>
                  <div className="relative" ref={calendarRef}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDatePicker();
                      }}
                      className="w-full h-[41px] rounded-[5px] border border-[#d2d2d2] bg-white px-3 pr-10 text-right text-[14px] cursor-pointer flex items-center hover:border-[#5A5E4D]/50 transition-colors"
                      style={fontStyle}
                    >
                      <span className={`truncate ${occasionDate ? "text-black" : "text-gray-400"}`}>
                        {occasionDate ? formatDateToArabic(occasionDate) : "اختر التاريخ"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDatePicker();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#605f5f] hover:text-[#5A5E4D] cursor-pointer flex items-center justify-center transition-colors z-10"
                      aria-label="فتح/إغلاق التقويم"
                    >
                      <Calendar
                        className={`w-[17px] h-[17px] transition-transform ${isDatePickerOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* التقويم المخصص */}
                    {isDatePickerOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e1dada] rounded-[10px] shadow-lg z-50 p-2 max-h-[280px] w-full sm:w-auto min-w-[280px]">
                        {/* رأس التقويم */}
                        <div className="flex items-center justify-between mb-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateMonth("prev");
                            }}
                            className="p-0.5 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            aria-label="الشهر السابق"
                          >
                            <ChevronRight className="w-3 h-3 text-[#605f5f]" />
                          </button>
                          <div
                            className="text-[12px] sm:text-[13px] font-semibold text-black"
                            style={fontStyle}
                          >
                            {ARABIC_MONTHS[currentMonth]} {currentYear}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateMonth("next");
                            }}
                            className="p-0.5 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            aria-label="الشهر التالي"
                          >
                            <ChevronLeft className="w-3 h-3 text-[#605f5f]" />
                          </button>
                        </div>

                        {/* أيام الأسبوع */}
                        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
                          {weekDays.map((day, index) => (
                            <div
                              key={index}
                              className="text-center text-[13px] font-semibold text-[#605f5f] py-0.5"
                              style={fontStyle}
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* الأيام */}
                        <div className="grid grid-cols-7 gap-0.5">
                          {/* أيام فارغة قبل اليوم الأول */}
                          {Array.from({ length: firstDay }).map((_, index) => (
                            <div key={`empty-${index}`} className="min-h-[28px]" />
                          ))}
                          {/* أيام الشهر */}
                          {days.map((day) => {
                            const disabled = isDateDisabled(day);
                            const selected = isDateSelected(day);
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!disabled) handleDateSelect(day);
                                }}
                                disabled={disabled}
                                className={`min-h-[28px] rounded-[4px] text-[13px] transition-colors ${
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

                {/* Reminder Checkbox */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={reminder}
                    onChange={(e) => {
                      e.stopPropagation();
                      setReminder(e.target.checked);
                    }}
                    className="w-4 h-4 text-[#5f664f] border-gray-300 rounded focus:ring-[#5f664f] cursor-pointer"
                  />
                  <label
                    htmlFor="reminder"
                    className="text-[14px] sm:text-[16px] text-black cursor-pointer"
                    style={fontStyle}
                  >
                    تفعيل التذكير (سيتم إرسال تذكير قبل أسبوع من المناسبة)
                  </label>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-[#5f664f] text-white px-6 py-2 rounded-[5px] text-[14px] sm:text-[15px] hover:bg-[#4f5440] transition-colors cursor-pointer w-full sm:w-auto"
                    style={fontStyle}
                  >
                    {editingOccasionId ? "تعديل" : "حفظ"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Add New Occasion Button */
            <div className="flex items-center justify-start mt-4">
              <button
                onClick={handleAddClick}
                className="flex items-center gap-2 text-[16px] text-black hover:text-[#5f664f] transition-colors cursor-pointer"
                style={fontStyle}
              >
                <div className="relative w-[29px] h-[27px]">
                  <div className="w-[29px] h-[27px] bg-[#ededed] rounded-[2px]"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[19px] h-[3px] bg-[#5c5a57]"></div>
                    <div className="w-[3px] h-[20px] bg-[#5c5a57] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <span>إضافة مناسبة جديدة</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
