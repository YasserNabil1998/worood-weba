/**
 * CustomBouquetDetails Component
 * مكون عرض تفاصيل الباقة المخصصة
 */

import { CustomBouquetData } from "@/src/@types/cart/CartItem.type";
import { CART_LABELS, CART_ICONS } from "@/src/constants/cart";

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
      <div className="text-sm text-gray-600">
        <span className="font-medium">{customData.size?.label || "متوسط"}</span>
        <span className="mx-2">•</span>
        <span>
          {customData.flowersCount || 0} {CART_LABELS.FLOWERS_COUNT}
        </span>
        {customData.occasion?.name && (
          <>
            <span className="mx-2">•</span>
            <span>{customData.occasion.name}</span>
          </>
        )}
      </div>
    );
  }

  // تفاصيل كاملة
  return (
    <div className="text-sm text-gray-600 space-y-1">
      {/* الحجم والتغليف */}
      <div>
        <span className="font-medium">{CART_LABELS.SIZE}:</span>{" "}
        {customData.size?.label || "غير محدد"}
        <span className="mx-2">•</span>
        <span className="font-medium">{CART_LABELS.WRAPPING}:</span>{" "}
        {customData.style?.label || "غير محدد"}
      </div>

      {/* الزهور */}
      {customData.flowers && customData.flowers.length > 0 && (
        <div>
          <span className="font-medium">{CART_LABELS.FLOWERS}:</span>
          <div className="mr-4 mt-1">
            {customData.flowers.map((f, idx) => (
              <div key={idx} className="text-xs">
                • {f.name} × {f.quantity} = {f.total} ريال
              </div>
            ))}
          </div>
        </div>
      )}

      {/* الألوان */}
      {customData.colors && customData.colors.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="font-medium">{CART_LABELS.COLORS}:</span>
          <div className="flex gap-1">
            {customData.colors.map((color, idx) => (
              <span
                key={idx}
                className="inline-block h-4 w-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* المناسبة */}
      {customData.occasion?.name && (
        <div>
          <span className="font-medium">{CART_LABELS.OCCASION}:</span>{" "}
          {customData.occasion.name}
        </div>
      )}

      {/* بطاقة التهنئة */}
      {customData.includeCard && (
        <div className="bg-gray-50 p-2 rounded mt-2">
          <div className="font-medium text-xs">
            {CART_ICONS.GREETING_CARD} {CART_LABELS.GREETING_CARD} (
            {customData.cardPrice} ريال):
          </div>
          <div className="text-xs italic mt-1">
            {customData.cardMessage || CART_LABELS.NO_MESSAGE}
          </div>
        </div>
      )}
    </div>
  );
}
