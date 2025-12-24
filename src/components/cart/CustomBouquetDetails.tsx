/**
 * CustomBouquetDetails Component
 * مكون عرض تفاصيل الباقة المخصصة
 */

import { Heart } from "lucide-react";
import { CustomBouquetData } from "@/types/custom";
import { CART_LABELS } from "@/constants/cart";
import bouquetsData from "@/data/custom-bouquets.json";
import { formatTimeToArabic, formatDateEnglish } from "@/lib/utils";
import { fontStyle } from "@/lib/styles";

interface CustomBouquetDetailsProps {
  customData: CustomBouquetData;
  isExpanded: boolean;
}

export default function CustomBouquetDetails({
  customData,
  isExpanded,
}: CustomBouquetDetailsProps) {
  if (!isExpanded) {
    // ملخص سريع
    return (
      <div className="text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded-full text-xs">
            {customData.size?.label || "متوسط"}
          </span>
          <span className="text-gray-400">•</span>
          <span className="font-medium">
            {customData.flowersCount || 0} {CART_LABELS.FLOWERS_COUNT}
          </span>
          {customData.occasion?.name && (
            <>
              <span className="text-gray-400">•</span>
              <span className="font-medium text-[#5A5E4D]">{customData.occasion.name}</span>
            </>
          )}
        </div>
      </div>
    );
  }

  // تفاصيل كاملة
  return (
    <div className="text-xs sm:text-sm text-gray-600 space-y-3 sm:space-y-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
      {/* الحجم والتغليف */}
      <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5A5E4D] text-xs sm:text-sm">{CART_LABELS.SIZE}:</span>
            <span className="bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded-full text-xs font-semibold">
              {customData.size?.label || "غير محدد"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5A5E4D] text-xs sm:text-sm">
              {CART_LABELS.WRAPPING}:
            </span>
            <span className="bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded-full text-xs font-semibold">
              {customData.packaging?.type === "vase" && customData.packaging?.vase?.name
                ? customData.packaging.vase.name
                : customData.packaging?.style?.label || customData.style?.label || "غير محدد"}
            </span>
          </div>
        </div>
      </div>

      {/* الزهور */}
      {customData.flowers && customData.flowers.length > 0 && (
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <span className="font-bold text-[#5A5E4D] text-base mb-2 block">
            {CART_LABELS.FLOWERS}:
          </span>
          <div className="space-y-2">
            {customData.flowers.map((f, idx) => {
              // Get color IDs for this flower
              const colorsObj =
                customData.colors &&
                typeof customData.colors === "object" &&
                !Array.isArray(customData.colors)
                  ? customData.colors
                  : {};
              const colorIds = colorsObj[String(f.id)] || [];

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{f.name}</span>
                      {/* Display colors next to flower name */}
                      {colorIds.length > 0 && (
                        <div className="flex gap-1">
                          {colorIds.map((colorId: number) => {
                            const color = bouquetsData.colors.find((c) => c.id === colorId);
                            return color ? (
                              <span
                                key={colorId}
                                className="inline-block h-5 w-5 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: color.color }}
                                title={color.name}
                              />
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded-full">
                      × {f.quantity}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#5A5E4D]">= {f.total}</span>
                      <span className="text-xs text-[#5A5E4D]">ر.س</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* المناسبة */}
      {customData.occasion?.name && (
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5A5E4D]">{CART_LABELS.OCCASION}:</span>
            <span className="bg-[#5A5E4D]/10 text-[#5A5E4D] px-3 py-1 rounded-full text-sm font-semibold">
              {customData.occasion.name}
            </span>
          </div>
        </div>
      )}

      {/* بطاقة التهنئة */}
      {customData.includeCard && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" fill="currentColor" />
            <span className="font-bold text-[#5A5E4D] text-xs sm:text-sm">
              {CART_LABELS.GREETING_CARD} (
              <span className="text-sm font-bold text-[#5A5E4D]">{customData.cardPrice}</span>
              <span className="text-xs text-[#5A5E4D]"> ر.س</span>)
            </span>
          </div>
          <div className="bg-white rounded-lg p-2 sm:p-3 border border-pink-200">
            <div className="text-xs sm:text-sm italic text-gray-700">
              {customData.cardMessage || CART_LABELS.NO_MESSAGE}
            </div>
          </div>
        </div>
      )}

      {/* الملاحظات */}
      {customData.notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="text-xs sm:text-sm font-bold text-blue-800 mb-1">ملاحظات الطلب</div>
          <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{customData.notes}</div>
        </div>
      )}

      {/* معلومات التوصيل */}
      {customData.deliveryInfo && (customData.deliveryInfo.date || customData.deliveryInfo.time) && (
        <div className="bg-[#E8F5E9] rounded-[10px] p-3 sm:p-4 shadow-sm">
          <div className="text-right">
            <div className="text-[14px] sm:text-[16px] font-semibold text-[#2E7D32] mb-2" style={fontStyle}>
              موعد التوصيل
            </div>
            <div className="text-[13px] sm:text-[15px] text-[#303030]" style={fontStyle}>
              {customData.deliveryInfo.date && (
                <span>{formatDateEnglish(customData.deliveryInfo.date)}</span>
              )}
              {customData.deliveryInfo.date && customData.deliveryInfo.time && <span className="mx-2">•</span>}
              {customData.deliveryInfo.time && (
                <span>
                  {formatTimeToArabic(customData.deliveryInfo.timeLabel || customData.deliveryInfo.time) || 
                   customData.deliveryInfo.timeLabel || 
                   customData.deliveryInfo.time}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
