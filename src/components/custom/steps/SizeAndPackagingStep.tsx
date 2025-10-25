import {
  Flower,
  BouquetSize,
  BouquetStyle,
  Vase,
  Color,
  PackagingType,
} from "@/src/@types/custom/index.type";
import FlowerColorSelector from "../FlowerColorSelector";
import { Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";

interface SizeAndPackagingStepProps {
  selectedFlowers: Record<number, number>;
  flowers: Flower[];
  colors: Color[];
  selectedColors: { [flowerId: string]: number[] };
  expandedFlower: string | null;
  onToggleFlowerExpansion: (flowerId: string) => void;
  onSetFlowerColor: (flowerId: string, colorId: number) => void;
  bouquetSizes: BouquetSize[];
  size: "small" | "medium" | "large" | "custom";
  totalFlowersCount: number;
  customFlowerCount: number;
  onCustomFlowerCountChange: (count: number) => void;
  onSizeChange: (size: "small" | "medium" | "large" | "custom") => void;
  packagingType: PackagingType;
  onPackagingTypeChange: (type: PackagingType) => void;
  bouquetStyles: BouquetStyle[];
  style: "classic" | "premium" | "gift" | "eco";
  onStyleChange: (style: "classic" | "premium" | "gift" | "eco") => void;
  vases: Vase[];
  selectedVase: string;
  onVaseChange: (vaseId: string) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function SizeAndPackagingStep({
  selectedFlowers,
  flowers,
  colors,
  selectedColors,
  expandedFlower,
  onToggleFlowerExpansion,
  onSetFlowerColor,
  bouquetSizes,
  size,
  totalFlowersCount,
  customFlowerCount,
  onCustomFlowerCountChange,
  onSizeChange,
  packagingType,
  onPackagingTypeChange,
  bouquetStyles,
  style,
  onStyleChange,
  vases,
  selectedVase,
  onVaseChange,
  onPrevStep,
  onNextStep,
}: SizeAndPackagingStepProps) {
  return (
    <div className="space-y-6">
      {/* Flower color selector */}
      <FlowerColorSelector
        selectedFlowers={selectedFlowers}
        flowers={flowers}
        colors={colors}
        selectedColors={selectedColors}
        expandedFlower={expandedFlower}
        onToggleFlowerExpansion={onToggleFlowerExpansion}
        onSetFlowerColor={onSetFlowerColor}
      />

      {/* Bouquet size */}
      <div>
        <div
          className="mb-3 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          حجم الباقة
        </div>
        {totalFlowersCount > 0 && (
          <div className="mb-3 bg-[#5A5E4D]/10 border border-[#d0d2c7]/30 rounded-md p-2 text-xs text-[#5A5E4D] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            <span>
              تم اختيار الحجم تلقائياً. يمكنك تغييره وسيتم تعديل عدد الزهور بنفس
              النسبة
            </span>
          </div>
        )}
        <div className="flex gap-2 pb-2">
          {bouquetSizes.map((opt) => {
            return (
              <button
                key={opt.key}
                onClick={() => onSizeChange(opt.key as any)}
                disabled={totalFlowersCount === 0}
                className={`text-center rounded-lg border px-3 py-2 transition-all flex-1 ${
                  size === opt.key
                    ? "border-[#d0d2c7] bg-[#5A5E4D]/5"
                    : totalFlowersCount === 0
                    ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                    : "border-gray-200 bg-white hover:border-[#b5bf95]/30 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <div className="mx-auto mb-1 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {opt.icon ? (
                    opt.icon.startsWith("/") || opt.icon.startsWith("http") ? (
                      <img
                        src={opt.icon}
                        alt={opt.label}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-lg">{opt.icon}</span>
                    )
                  ) : (
                    <span className="text-lg">🌺</span>
                  )}
                </div>
                <div className="font-semibold text-gray-800 text-xs mb-1">
                  {opt.label}
                </div>
                <div className="text-[10px] text-gray-500">{opt.stems}</div>
                {size === opt.key &&
                  (opt.key === "custom"
                    ? customFlowerCount > 0
                    : totalFlowersCount > 0) && (
                    <div className="mt-2 text-xs text-[#5A5E4D] font-semibold bg-[#5A5E4D]/10 rounded px-2 py-1">
                      ✓{" "}
                      {opt.key === "custom"
                        ? customFlowerCount
                        : totalFlowersCount}{" "}
                      زهرة
                    </div>
                  )}
              </button>
            );
          })}
        </div>

        {/* Custom flower count input */}
        {size === "custom" && (
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium text-gray-700">
              عدد الزهور المطلوب
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="5"
                max="1000"
                value={customFlowerCount}
                onChange={(e) =>
                  onCustomFlowerCountChange(Number(e.target.value))
                }
                className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              />
              <span className="text-sm text-gray-600">زهرة</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              يمكنك اختيار من 5 إلى 1000 زهرة
            </p>
          </div>
        )}

        {totalFlowersCount === 0 && (
          <p className="mt-3 text-xs text-gray-500 text-center bg-gray-50 rounded-md p-2">
            ⚠️ يرجى اختيار الزهور أولاً من الخطوة السابقة
          </p>
        )}
      </div>

      {/* Packaging type */}
      <div>
        <div
          className="mb-3 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          نوع التغليف
        </div>

        {/* Packaging type options */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => onPackagingTypeChange("paper")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              packagingType === "paper"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            تغليف ورقي
          </button>
          <button
            onClick={() => onPackagingTypeChange("vase")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              packagingType === "vase"
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            مزهرية
          </button>
        </div>

        {/* Show options based on type */}
        {packagingType === "paper" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {bouquetStyles.map((styleOption) => (
                <button
                  key={styleOption.key}
                  onClick={() => onStyleChange(styleOption.key as any)}
                  className={`text-center rounded-lg border p-3 transition-all ${
                    style === styleOption.key
                      ? "border-[#5A5E4D] bg-[#5A5E4D]/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={styleOption.image}
                    alt={styleOption.label}
                    className="w-12 h-12 object-cover rounded-md mx-auto mb-2"
                  />
                  <div className="text-xs font-medium text-gray-900">
                    {styleOption.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    +{styleOption.price} ر.س
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {packagingType === "vase" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vases.map((vase) => (
                <button
                  key={vase.id}
                  onClick={() => onVaseChange(vase.id.toString())}
                  className={`text-center rounded-lg border p-3 transition-all ${
                    selectedVase === vase.id.toString()
                      ? "border-[#5A5E4D] bg-[#5A5E4D]/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={vase.image}
                    alt={vase.name}
                    className="w-12 h-12 object-cover rounded-md mx-auto mb-2"
                  />
                  <div className="text-xs font-medium text-gray-900">
                    {vase.name}
                  </div>
                  <div className="text-xs text-gray-500">+{vase.price} ر.س</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <button
          onClick={onPrevStep}
          className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 flex-shrink-0" />
          <span>السابق</span>
        </button>
        <button
          onClick={onNextStep}
          className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
        >
          <span>التالي</span>
          <ChevronLeft className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
