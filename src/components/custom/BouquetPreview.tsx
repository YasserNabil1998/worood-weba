import { Flower, Color, Vase, PackagingType } from "@/types/custom";
import PriceBreakdown from "./PriceBreakdown";
import { Heart, ExternalLink } from "lucide-react";
import { formatTimeToArabic, formatDateEnglish } from "@/lib/utils";

interface BouquetPreviewProps {
  bouquetImage: string;
  total: number;
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
  size: "small" | "medium" | "large" | "custom";
  customFlowerCount: number;
  selectedFlowers: Record<number, number>;
  flowers: Flower[];
  selectedColors: { [flowerId: string]: number[] };
  colors: Color[];
  cardMessage?: string;
  notes?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  onSaveToFavorites: () => void;
  onShareDesign: () => void;
  getStyleLabel: (style: "classic" | "premium" | "gift" | "eco") => string;
  getVaseName: (vaseId: string) => string;
}

export default function BouquetPreview({
  bouquetImage,
  total,
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
  size,
  customFlowerCount,
  selectedFlowers,
  flowers,
  selectedColors,
  colors,
  cardMessage,
  notes,
  deliveryDate,
  deliveryTime,
  onSaveToFavorites,
  onShareDesign,
  getStyleLabel,
  getVaseName,
}: BouquetPreviewProps) {
  // Check if user has selected any flowers and basic design elements
  const hasSelectedFlowers = Object.values(selectedFlowers).some((qty) => qty > 0);
  const isDesignComplete = hasSelectedFlowers && totalFlowersCount > 0;
  
  return (
    <div className="order-1 lg:order-1 w-full lg:max-w-[445px] lg:justify-self-start">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Title - في بداية السيكشن */}
        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
          <div className="text-[18px] font-bold leading-[20px] text-black text-right mb-4">
            معاينة الباقة
          </div>
        </div>

        {/* Bouquet Image - using the image from assets */}
        <div className="px-3 sm:px-4 flex flex-col items-center relative">
          <div className="relative h-[200px] w-[170px] sm:h-[250px] sm:w-[220px] lg:h-[318px] lg:w-[270px] mb-3 sm:mb-4">
            <div className="absolute inset-0 rounded-full overflow-hidden bg-white">
              <img
                src="/assets/custom-bouquet/معاينة الباقة.png"
                alt="preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback to dynamic bouquetImage if the asset doesn't exist
                  e.currentTarget.src = bouquetImage;
                }}
              />
            </div>
          </div>
          {/* Elegant curved underline - subtle reflective shadow */}
          <svg
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[200px] sm:w-[250px] lg:w-[350px] h-[60px] pointer-events-none"
            viewBox="0 0 220 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5A5E4D" stopOpacity="0" />
                <stop offset="20%" stopColor="#5A5E4D" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#5A5E4D" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#5A5E4D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5A5E4D" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M10 20 Q110 90, 210 30"
              stroke="url(#shadowGradient)"
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          {/* Total */}
          <div className="flex flex-col mb-2">
            {/* First row - الإجمالي and السعر */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-responsive-base font-bold text-black">
                الإجمالي
              </span>
              <span className="text-responsive-base font-normal text-black">
                {total.toFixed(0)} ريال
              </span>
            </div>
            {/* Second row - غير شامل الضريبة */}
            <div className="text-[14px] font-normal text-black text-right">
              غير شامل الضريبة
            </div>
          </div>

          {/* Divider line */}
          <div className="h-px bg-gray-300 my-3 sm:my-4 mx-auto w-full max-w-[354px]" />

          {/* Price Breakdown */}
          <PriceBreakdown
            totalFlowersCount={totalFlowersCount}
            packagingType={packagingType}
            style={style}
            selectedVase={selectedVase}
            stylePrice={stylePrice}
            vasePrice={vasePrice}
            flowersPrice={flowersPrice}
            includeCard={includeCard}
            cardPrice={cardPrice}
            vat={vat}
            vases={vases}
            getStyleLabel={getStyleLabel}
          />

          {/* Bouquet Details */}
          <div className="text-xs sm:text-[13px] font-semibold text-gray-800 mb-2">
            تفاصيل الباقة
          </div>
          <div className="text-xs sm:text-sm rounded-lg overflow-hidden mb-3 sm:mb-4">
            <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
              <span className="text-gray-600">الحجم</span>
              <span>
                {size === "small"
                  ? "صغير"
                  : size === "medium"
                    ? "متوسط"
                    : size === "large"
                      ? "كبير"
                      : "مخصص"}
              </span>
            </div>
            <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
              <span className="text-gray-600">عدد الزهور</span>
              <span>{size === "custom" ? customFlowerCount : totalFlowersCount} زهرة</span>
            </div>

            {/* Selected flowers */}
            {Object.entries(selectedFlowers).filter(([_, qty]) => qty > 0).length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">الزهور المختارة</div>
                {Object.entries(selectedFlowers)
                  .filter(([_, qty]) => qty > 0)
                  .map(([flowerId, qty]) => {
                    const flower = flowers.find((f) => f.id === Number(flowerId));
                    const colorIds = selectedColors[flowerId] || [];

                    return (
                      <div
                        key={flowerId}
                        className="flex items-center justify-between py-2 px-2 bg-gray-50 rounded-md mb-2"
                      >
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-800">{flower?.name}</div>
                          <div className="text-xs text-gray-500">{qty} زهرة</div>
                        </div>
                        {colorIds.length > 0 && (
                          <div className="flex gap-1">
                            {colorIds.map((colorId) => {
                              const color = colors.find((c) => c.id === colorId);
                              return color ? (
                                <span
                                  key={colorId}
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{
                                    backgroundColor: color.color,
                                  }}
                                  title={color.name}
                                />
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
              <span className="text-gray-600">التغليف</span>
              <span>
                {packagingType === "paper"
                  ? getStyleLabel(style)
                  : packagingType === "vase" && selectedVase
                    ? getVaseName(selectedVase)
                    : "غير محدد"}
              </span>
            </div>
          </div>

          {/* بطاقة التهنئة / الملاحظات / موعد التوصيل */}
          {(includeCard && cardMessage) || notes || deliveryTime || deliveryDate ? (
            <div className="space-y-2 mb-3 sm:mb-4">
              {includeCard && cardMessage && (
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-pink-700 mb-1">محتوى بطاقة التهنئة</div>
                  <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{cardMessage}</p>
                </div>
              )}

              {notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-blue-700 mb-1">ملاحظات الطلب</div>
                  <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{notes}</p>
                </div>
              )}

              {(deliveryTime || deliveryDate) && (
                <div className="bg-[#E8F5E9] rounded-[10px] p-3 sm:p-4 shadow-sm">
                  <div className="text-right">
                    <div className="text-[14px] sm:text-[16px] font-semibold text-[#2E7D32] mb-2">
                      موعد التوصيل
                    </div>
                    <div className="text-[13px] sm:text-[15px] text-[#303030]">
                      {deliveryDate && (
                        <span>{formatDateEnglish(deliveryDate)}</span>
                      )}
                      {deliveryDate && deliveryTime && <span className="mx-2">•</span>}
                      {deliveryTime && (
                        <span>{formatTimeToArabic(deliveryTime) || deliveryTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            <button
              onClick={onSaveToFavorites}
              disabled={!isDesignComplete}
              className={`w-full rounded-md px-3 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isDesignComplete
                  ? "bg-[#5A5E4D] text-white hover:bg-[#4b5244] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              }`}
              title={!isDesignComplete ? "اختر الزهور أولاً لحفظ التصميم" : "حفظ التصميم"}
            >
              <span>حفظ التصميم</span>
              <Heart className="w-4 h-4 flex-shrink-0" />
            </button>
            <button
              onClick={onShareDesign}
              disabled={!isDesignComplete}
              className={`w-full rounded-md px-3 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isDesignComplete
                  ? "bg-white border border-[#5A5E4D] text-[#5A5E4D] hover:bg-gray-50 cursor-pointer"
                  : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
              }`}
              title={!isDesignComplete ? "اختر الزهور أولاً لمشاركة التصميم" : "مشاركة التصميم"}
            >
              <span>مشاركة التصميم</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
