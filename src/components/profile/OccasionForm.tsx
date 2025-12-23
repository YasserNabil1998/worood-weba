"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDateToArabic } from "@/lib/utils";
import { getOccasionIcon, parseArabicDateToISO } from "@/lib/utils/occasions";
import { useProfileStore } from "@/stores";
import { useNotification } from "@/providers/notification-provider";
import DatePicker from "@/components/shared/DatePicker";
import { fontStyle } from "@/lib/styles";

interface OccasionFormProps {
  /** ID of the occasion being edited (null for new occasion) */
  editingOccasionId: string | null;
  /** Initial values for editing (optional) */
  initialValues?: {
    type: string;
    name: string;
    date: string; // Arabic date format
    reminder?: boolean;
  };
  /** Callback when form is saved successfully */
  onSave: (occasion: {
    id: string;
    name: string;
    date: string; // Arabic date format
    type: string;
    icon: string;
    reminder?: boolean;
  }) => void;
  /** Callback when form is cancelled */
  onCancel: () => void;
}

/**
 * Form component for adding/editing occasions
 */
export default function OccasionForm({
  editingOccasionId,
  initialValues,
  onSave,
  onCancel,
}: OccasionFormProps) {
  const [occasionType, setOccasionType] = useState(initialValues?.type || "");
  const [occasionOwner, setOccasionOwner] = useState(initialValues?.name || "");
  const [occasionDate, setOccasionDate] = useState(
    initialValues?.date ? parseArabicDateToISO(initialValues.date) : ""
  );
  const [reminder, setReminder] = useState(initialValues?.reminder || false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get occasion types from store
  const occasionTypes = useProfileStore((state) => state.occasionTypes);
  const addOccasion = useProfileStore((state) => state.addOccasion);
  const editOccasion = useProfileStore((state) => state.editOccasion);

  // Notification
  const { showNotification } = useNotification();

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
          // Call onSave with updated occasion data
          onSave({
            id: editingOccasionId,
            name: occasionOwner,
            date: formatDateToArabic(occasionDate),
            type: occasionType,
            icon: getOccasionIcon(occasionType),
            reminder: reminder,
          });
          showNotification("تم تعديل المناسبة بنجاح", "success");
        }
      } else {
        // Create new occasion via store
        const result = await addOccasion(occasionData);
        if (result.success) {
          // Call onSave with new occasion data
          const newOccasion = {
            id: Date.now().toString(),
            name: occasionOwner,
            date: formatDateToArabic(occasionDate),
            type: occasionType,
            icon: getOccasionIcon(occasionType),
            reminder: reminder,
          };
          onSave(newOccasion);
          showNotification("تم إضافة المناسبة بنجاح", "success");
        }
      }
    } catch (error) {
      showNotification("حدث خطأ أثناء حفظ المناسبة", "error");
    }
  };

  return (
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
        <div onClick={(e) => e.stopPropagation()}>
          <DatePicker
            selectedDate={occasionDate || null}
            onDateSelect={(date) => {
              setOccasionDate(date);
            }}
            label="ما تاريخ المناسبة ؟"
            placeholder="اختر التاريخ"
          />
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
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-[#5f664f] text-white px-6 py-2 rounded-[5px] text-[14px] sm:text-[15px] hover:bg-[#4f5440] transition-colors cursor-pointer w-full sm:w-auto"
            style={fontStyle}
          >
            {editingOccasionId ? "تعديل" : "حفظ"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-[5px] text-[14px] sm:text-[15px] hover:bg-gray-400 transition-colors cursor-pointer w-full sm:w-auto"
            style={fontStyle}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

