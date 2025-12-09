import { Vase, PackagingType } from "@/@types/custom/index.type";
import { APP_CONFIG } from "@/constants";

interface PriceBreakdownProps {
  totalFlowersCount: number;
  packagingType: PackagingType;
  style: "classic" | "premium" | "gift" | "eco";
  selectedVase: string;
  stylePrice: number;
  vasePrice: number;
  flowersPrice: number;
  includeCard: boolean;
  cardPrice: number;
  vat: number;
  vases: Vase[];
  getStyleLabel: (style: "classic" | "premium" | "gift" | "eco") => string;
}

export default function PriceBreakdown({
  totalFlowersCount,
  packagingType,
  style,
  selectedVase,
  stylePrice,
  vasePrice,
  flowersPrice,
  includeCard,
  cardPrice,
  vat,
  vases,
  getStyleLabel,
}: PriceBreakdownProps) {
  if (totalFlowersCount === 0) {
    return (
      <div className="mb-4 text-center py-4">
        <div className="text-3xl mb-2">🌸</div>
        <p className="text-xs text-gray-600">ابدأ باختيار الزهور لإنشاء باقتك</p>
      </div>
    );
  }

  return (
    <div className="mb-3 sm:mb-4 space-y-2 text-sm">
      <div className="text-[11px] sm:text-xs text-gray-500 mb-1 font-semibold">تفاصيل السعر</div>
      <div className="space-y-1 text-[11px] sm:text-xs bg-gray-50 rounded-md p-2">
        {packagingType === "paper" && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">التغليف الورقي ({getStyleLabel(style)})</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">{stylePrice.toFixed(0)}</span>
              <span className="text-xs text-[#5A5E4D]">ر.س</span>
            </div>
          </div>
        )}
        {packagingType === "vase" && selectedVase && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              المزهرية ({vases.find((v) => v.id.toString() === selectedVase)?.name})
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">{vasePrice.toFixed(0)}</span>
              <span className="text-xs text-[#5A5E4D]">ر.س</span>
            </div>
          </div>
        )}
        {flowersPrice > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">الزهور ({totalFlowersCount})</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">{flowersPrice.toFixed(0)}</span>
              <span className="text-xs text-[#5A5E4D]">ر.س</span>
            </div>
          </div>
        )}
        {includeCard && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">بطاقة تهنئة</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">{cardPrice.toFixed(0)}</span>
              <span className="text-xs text-[#5A5E4D]">ر.س</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-[10px] text-gray-500 italic mt-1">
        * ستُضاف ضريبة القيمة المضافة ({(APP_CONFIG.VAT_RATE * 100).toFixed(0)}
        %) عند الدفع
      </div>
    </div>
  );
}
