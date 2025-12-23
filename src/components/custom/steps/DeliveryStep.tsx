import DatePicker from "@/components/shared/DatePicker";
import TimePicker from "@/components/shared/TimePicker";
import { fontStyle } from "@/lib/styles";
import type { DeliveryTime } from "@/types/custom";

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
            className={`h-[45px] sm:h-[51px] rounded-[10px] border ${
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
            className={`h-[45px] sm:h-[51px] rounded-[10px] border ${
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
            <TimePicker
              selectedTime={deliveryTime}
              onTimeChange={onDeliveryTimeChange}
              label="وقت التوصيل"
              placeholder="اختر الوقت"
            />
            {/* تاريخ التوصيل */}
            <DatePicker
              selectedDate={deliveryDate}
              onDateSelect={onDeliveryDateChange}
              label="تاريخ التوصيل"
              placeholder="اختر التاريخ"
            />
          </div>
        </div>
      ) : (
        /* For today delivery: show only time */
        <TimePicker
          selectedTime={deliveryTime}
          onTimeChange={onDeliveryTimeChange}
          label="وقت التوصيل"
          placeholder="اختر الوقت"
        />
      )}
    </div>
  );
}
