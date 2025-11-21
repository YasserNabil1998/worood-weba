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
    <div className="space-y-6">
      {/* Delivery type */}
      <div>
        <div className="mb-2 text-[20px] font-bold text-black text-right" style={{ fontFamily: "var(--font-almarai)" }}>
          التوصيل
        </div>
        <div className="mb-2 text-[20px] font-normal text-[#605f5f] text-right" style={{ fontFamily: "var(--font-almarai)" }}>
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

      {/* Delivery time - always shown */}
      <div>
        <div className="mb-2 text-[20px] font-bold text-black text-right" style={{ fontFamily: "var(--font-almarai)" }}>
          وقت التوصيل
        </div>
        <div className="relative">
          <input
            type="text"
            value={deliveryTime || "05 : 30 م"}
            onChange={(e) => onDeliveryTimeChange(e.target.value)}
            placeholder="05 : 30 م"
            className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 text-right text-[16px] sm:text-[18px] lg:text-[20px] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
            style={{ fontFamily: "var(--font-almarai)" }}
          />
        </div>
      </div>

      {/* Delivery date - shown only for scheduled */}
      {deliveryType === "scheduled" && (
        <div>
          <div className="mb-2 text-[20px] font-bold text-black text-right" style={{ fontFamily: "var(--font-almarai)" }}>
            تاريخ التوصيل
          </div>
          <div className="relative">
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => onDeliveryDateChange(e.target.value)}
              className="w-full h-[50px] sm:h-[59px] rounded-[10px] border border-[#e1dada] bg-white px-3 sm:px-4 py-2 text-right text-[16px] sm:text-[18px] lg:text-[20px] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              style={{ fontFamily: "var(--font-almarai)" }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
        <button
          onClick={onPrevStep}
          disabled={isAddingToCart}
          className="w-full sm:w-auto h-[50px] sm:h-[64px] px-4 sm:px-6 rounded-[5px] bg-[#dadada] text-[#434445] text-[18px] sm:text-[22px] lg:text-[25px] font-bold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span>السابق</span>
        </button>
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className="w-full sm:w-auto h-[50px] sm:h-[64px] px-4 sm:px-6 rounded-[5px] bg-[#58614c] text-white text-[18px] sm:text-[22px] lg:text-[25px] font-bold hover:bg-[#4b5244] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" />
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
