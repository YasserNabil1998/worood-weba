import { Size } from "@/src/@types/product/Product.type";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  currency: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  currency,
}: SizeSelectorProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">اختر الحجم</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onSizeChange(size.value)}
            className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all ${
              selectedSize === size.value
                ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                : "border-gray-300 text-gray-700 hover:border-[#5A5E4D]"
            }`}
          >
            <div className="font-medium text-responsive-xs">{size.label}</div>
            {size.price > 0 && (
              <div className="text-responsive-xs mt-0.5">
                +{size.price} {currency}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
