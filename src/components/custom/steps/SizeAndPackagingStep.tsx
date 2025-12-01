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
  const packagingBaseClasses =
    "h-[45px] w-full sm:w-[160px] rounded-[12px] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#5a5e4d]/30 cursor-pointer";

  const getPackagingButtonClasses = (type: PackagingType) => {
    const isActive = packagingType === type;
    return `${packagingBaseClasses} ${
      isActive
        ? "bg-[#5a5e4d] text-white border-[#5a5e4d] shadow-[0_10px_25px_rgba(90,94,77,0.25)] scale-[1.02]"
        : "bg-[#fcfcfc] text-black border-[#d7d6d6] hover:bg-gray-50 hover:border-[#b4b4b4]"
    }`;
  };

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
          className="mb-4 text-responsive-lg font-normal leading-[20px] text-black text-right"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          اختر الحجم والتغليف
        </div>
        {totalFlowersCount > 0 && (
          <div
            className="mb-3 bg-[#5A5E4D]/10 border border-[#d0d2c7]/30 rounded-md p-2 text-responsive-sm leading-[18px] text-[#5A5E4D] flex items-center gap-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <Lightbulb className="w-4 h-4 shrink-0" />
            <span>تم اختيار الحجم تلقائياً. يمكنك تغييره وسيتم تعديل عدد الزهور بنفس النسبة</span>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[...bouquetSizes]
            .sort((a, b) => {
              const order = { small: 1, medium: 2, large: 3, custom: 4 };
              return (
                (order[a.key as keyof typeof order] || 99) -
                (order[b.key as keyof typeof order] || 99)
              );
            })
            .map((opt) => {
              const isSelected = size === opt.key;

              return (
                <button
                  key={opt.key}
                  onClick={() => onSizeChange(opt.key as "small" | "medium" | "large" | "custom")}
                  disabled={totalFlowersCount === 0 && opt.key !== "custom"}
                  className={`flex flex-col rounded-[20px] border transition-all h-[110px] px-3 sm:px-4 py-4 ${
                    isSelected
                      ? "border-[#6d6d6d] bg-white"
                      : totalFlowersCount === 0 && opt.key !== "custom"
                        ? "border-[#d7d6d6] bg-white opacity-50 cursor-not-allowed"
                        : "border-[#d7d6d6] bg-white hover:border-[#6d6d6d] hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  {/* العنوان في الأعلى - موضع ثابت */}
                  <div
                    className="font-normal text-[14px] sm:text-[16px] leading-[20px] text-black text-center"
                    style={{ fontFamily: "var(--font-almarai)" }}
                  >
                    {opt.label}
                  </div>

                  {/* الوصف في المنتصف - موضع ثابت */}
                  <div className="flex-1 flex items-center justify-center">
                    {opt.key !== "custom" && opt.stems && (
                      <div
                        className="text-[14px] sm:text-[16px] leading-[20px] text-gray-600 text-center"
                        style={{ fontFamily: "var(--font-almarai)" }}
                      >
                        {opt.stems}
                      </div>
                    )}
                    {opt.key === "custom" && (
                      <div className="flex items-center justify-center gap-2 w-full flex-wrap sm:flex-nowrap">
                        <input
                          type="number"
                          min="5"
                          max="1000"
                          value={customFlowerCount}
                          onChange={(e) => onCustomFlowerCountChange(Number(e.target.value))}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="50"
                          className="w-full sm:w-[100px] h-[26px] px-2 text-[14px] sm:text-[16px] leading-[20px] text-center border-[0.5px] border-[#b7b7b7] rounded-[5px] bg-white text-gray-800 placeholder:text-[#b9b6b6] focus:outline-none focus:ring-1 focus:ring-[#5A5E4D]/30"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        />
                        <div
                          className="text-[14px] sm:text-[16px] leading-[20px] text-gray-600 whitespace-nowrap"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          زهرة
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
        </div>

        {totalFlowersCount === 0 && (
          <p
            className="mt-3 text-[13px] leading-[18px] text-gray-500 text-center bg-gray-50 rounded-md p-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            ⚠️ يرجى اختيار الزهور أولاً من الخطوة السابقة
          </p>
        )}
      </div>

      {/* Packaging type */}
      <div>
        <div
          className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          أنواع التغليف
        </div>

        {/* Packaging type options */}
        <div className="grid grid-cols-2 sm:flex sm:items-start sm:justify-start gap-3 sm:gap-4 mb-6">
          <button
            onClick={() => onPackagingTypeChange("paper")}
            className={getPackagingButtonClasses("paper")}
            aria-pressed={packagingType === "paper"}
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span className="text-[16px] leading-[20px]">تغليف ورقي</span>
          </button>
          <button
            onClick={() => onPackagingTypeChange("vase")}
            className={getPackagingButtonClasses("vase")}
            aria-pressed={packagingType === "vase"}
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span className="text-[16px] leading-[20px]">مزهرية</span>
          </button>
        </div>

        {/* Show options based on type */}
        {packagingType === "paper" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-center">
              {bouquetStyles.map((styleOption) => {
                // Map style keys to match design labels
                const styleLabelMap: Record<string, string> = {
                  classic: "كلاسيكي",
                  premium: "فاخر",
                  gift: "هدية بسيط",
                  eco: "بوكيه نايلون",
                };

                // Descriptions based on style
                const descriptionMap: Record<
                  string,
                  { text: string; color: string; align: string }
                > = {
                  eco: { text: "تنسيق لطيف", color: "text-[#5a5e4d]", align: "text-center" },
                  gift: { text: "اختيار لطيف", color: "text-[#5a5e4d]", align: "text-center" },
                  premium: { text: "تصميم راق", color: "text-[#5a5e4d]", align: "text-center" },
                  classic: { text: "تنسيق تقليدي", color: "text-[#5c5a57]", align: "text-right" },
                };

                const description = descriptionMap[styleOption.key] || {
                  text: "",
                  color: "",
                  align: "",
                };

                const isActiveStyle = style === styleOption.key;
                const styleCardBaseClasses =
                  "text-center bg-white border border-[#d7d6d6] rounded-[20px] transition-all h-[155px] w-full max-w-full sm:max-w-[160px] overflow-hidden mx-auto flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5a5e4d]/30";

                return (
                  <button
                    key={styleOption.key}
                    onClick={() =>
                      onStyleChange(styleOption.key as "classic" | "premium" | "gift" | "eco")
                    }
                    className={`${styleCardBaseClasses} ${
                      isActiveStyle
                        ? "border-[#5a5e4d] shadow-[0_14px_30px_rgba(90,94,77,0.2)] scale-[1.02]"
                        : "hover:border-gray-400 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="h-[100px] w-full overflow-hidden">
                      <img
                        src={styleOption.image}
                        alt={styleOption.label}
                        className="w-full h-full object-cover rounded-tl-[20px] rounded-tr-[20px]"
                      />
                    </div>
                    <div className="h-[50px] p-2 flex flex-col justify-center">
                      {/* Name and Price on same line - fixed height */}
                      <div className="flex items-center justify-between h-[20px]">
                        <div
                          className="text-[13px] font-bold leading-[18px] text-gray-800 text-right"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          {styleLabelMap[styleOption.key] || styleOption.label}
                        </div>
                        <div
                          className="text-[13px] font-bold leading-[18px] text-[#5a5e4d] text-right"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          {styleOption.price} ر.س
                        </div>
                      </div>
                      {/* Description below - fixed height */}
                      <div className="h-[20px] mb-1">
                        {description.text ? (
                          <div
                            className={`${description.color} text-right text-[13px]`}
                            style={{ fontFamily: "var(--font-almarai)" }}
                          >
                            {description.text}
                          </div>
                        ) : (
                          <div className="h-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {packagingType === "vase" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-center">
              {vases.map((vase) => {
                // Descriptions based on vase
                const vaseDescriptionMap: Record<number, { text: string; color: string }> = {
                  1: { text: "تصميم كلاسيكي", color: "text-[#5c5a57]" },
                  2: { text: "أناقة راقية", color: "text-[#5a5e4d]" },
                  3: { text: "فخامة مميزة", color: "text-[#5a5e4d]" },
                  4: { text: "عصرية وجذابة", color: "text-[#5a5e4d]" },
                };

                const description = vaseDescriptionMap[vase.id] || {
                  text: "اختيار مميز",
                  color: "text-[#5a5e4d]",
                };

                const isActiveVase = selectedVase === vase.id.toString();
                const vaseCardBaseClasses =
                  "text-center bg-white border border-[#d7d6d6] rounded-[20px] transition-all h-[155px] w-full max-w-full sm:max-w-[160px] overflow-hidden mx-auto flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5a5e4d]/30";

                return (
                  <button
                    key={vase.id}
                    onClick={() => onVaseChange(vase.id.toString())}
                    className={`${vaseCardBaseClasses} ${
                      isActiveVase
                        ? "border-[#5a5e4d] shadow-[0_14px_30px_rgba(90,94,77,0.2)] scale-[1.02]"
                        : "hover:border-gray-400 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="h-[100px] w-full overflow-hidden">
                      <img
                        src={vase.image}
                        alt={vase.name}
                        className="w-full h-full object-cover rounded-tl-[20px] rounded-tr-[20px]"
                      />
                    </div>
                    <div className="h-[50px] p-2 flex flex-col justify-center">
                      {/* Name and Price on same line - fixed height */}
                      <div className="flex items-center justify-between mb-0.5 h-[20px]">
                        <div
                          className="text-[13px] font-bold leading-[18px] text-gray-800 text-right"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          {vase.name}
                        </div>
                        <div
                          className="text-[13px] font-bold leading-[18px] text-[#5a5e4d] text-right"
                          style={{ fontFamily: "var(--font-almarai)" }}
                        >
                          {vase.price} ر.س
                        </div>
                      </div>
                      {/* Description below - fixed height */}
                      <div className="h-[20px] mb-1">
                        {description.text ? (
                          <div
                            className={`${description.color} text-right text-[13px]`}
                            style={{ fontFamily: "var(--font-almarai)" }}
                          >
                            {description.text}
                          </div>
                        ) : (
                          <div className="h-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
