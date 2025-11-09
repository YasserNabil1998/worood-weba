import { useSearchParams } from "next/navigation";
import { DeliveryTime } from "@/src/@types/custom/index.type";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";

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

  return (
    <div className="space-y-5">
      {/* Delivery type */}
      <div>
        <div className="mb-3 text-sm text-gray-700">نوع التوصيل</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onDeliveryTypeChange("today")}
            className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
              deliveryType === "today"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            توصيل اليوم
          </button>
          <button
            type="button"
            onClick={() => onDeliveryTypeChange("scheduled")}
            className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
              deliveryType === "scheduled"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            حجز مسبق
          </button>
        </div>
      </div>

      {/* Delivery time - always shown */}
      <div>
        <div className="mb-1 text-sm text-gray-700">وقت التوصيل</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
          {deliveryTimes.map((time) => (
            <button
              key={time.id}
              type="button"
              onClick={() => onDeliveryTimeChange(time.value)}
              className={`rounded-md border px-2 sm:px-3 py-2 transition-colors ${
                deliveryTime === time.value
                  ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                  : "border-[#5A5E4D] bg-white text-[#5A5E4D] hover:bg-[#5A5E4D]/5"
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery date - shown only for scheduled */}
      {deliveryType === "scheduled" && (
        <div>
          <div className="mb-1 text-sm text-gray-700">تاريخ التوصيل</div>
          <div className="relative">
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => onDeliveryDateChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onPrevStep}
          disabled={isAddingToCart}
          className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 flex-shrink-0" />
          <span>السابق</span>
        </button>
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 text-white" />
              <span>{isEditMode ? "جاري التحديث..." : "جاري الإضافة..."}</span>
            </>
          ) : isEditMode ? (
            "تحديث السلة"
          ) : (
            "إضافة إلى السلة"
          )}
        </button>
      </div>
    </div>
  );
}
