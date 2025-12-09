import type { ColorOption } from "@/@types/product/Product.type";

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  if (!colors.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">اختر اللون</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;
          return (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                  : "border-gray-300 text-gray-700 hover:border-[#5A5E4D]"
              }`}
            >
              <span
                className="inline-block h-4 w-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{color.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

