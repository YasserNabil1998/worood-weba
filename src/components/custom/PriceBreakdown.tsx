import { Vase, PackagingType } from "@/src/@types/custom/index.type";

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
                <p className="text-xs text-gray-600">
                    ابدأ باختيار الزهور لإنشاء باقتك
                </p>
            </div>
        );
    }

    return (
        <div className="mb-3 sm:mb-4 space-y-2 text-sm">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-1 font-semibold">
                تفاصيل السعر
            </div>
            <div className="space-y-1 text-[11px] sm:text-xs bg-gray-50 rounded-md p-2">
                {packagingType === "paper" && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            التغليف الورقي ({getStyleLabel(style)})
                        </span>
                        <span className="font-semibold text-gray-800">
                            {stylePrice.toFixed(0)} ر.س
                        </span>
                    </div>
                )}
                {packagingType === "vase" && selectedVase && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            المزهرية (
                            {
                                vases.find(
                                    (v) => v.id.toString() === selectedVase
                                )?.name
                            }
                            )
                        </span>
                        <span className="font-semibold text-gray-800">
                            {vasePrice.toFixed(0)} ر.س
                        </span>
                    </div>
                )}
                {flowersPrice > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            الزهور ({totalFlowersCount})
                        </span>
                        <span className="font-semibold text-gray-800">
                            {flowersPrice.toFixed(0)} ر.س
                        </span>
                    </div>
                )}
                {includeCard && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">بطاقة تهنئة</span>
                        <span className="font-semibold text-gray-800">
                            {cardPrice.toFixed(0)} ر.س
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                    <span className="text-gray-600">الضريبة (15%)</span>
                    <span className="font-semibold text-gray-800">
                        {vat.toFixed(0)} ر.س
                    </span>
                </div>
            </div>
        </div>
    );
}
