import { Flower, Color } from "@/src/@types/custom/index.type";

interface FlowerColorSelectorProps {
  selectedFlowers: Record<number, number>;
  flowers: Flower[];
  colors: Color[];
  selectedColors: { [flowerId: string]: number[] };
  expandedFlower: string | null;
  onToggleFlowerExpansion: (flowerId: string) => void;
  onSetFlowerColor: (flowerId: string, colorId: number) => void;
}

export default function FlowerColorSelector({
  selectedFlowers,
  flowers,
  colors,
  selectedColors,
  expandedFlower,
  onToggleFlowerExpansion,
  onSetFlowerColor,
}: FlowerColorSelectorProps) {
  const selectedFlowerEntries = Object.entries(selectedFlowers).filter(([_, qty]) => qty > 0);

  if (selectedFlowerEntries.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        className="mb-3 text-sm font-semibold text-gray-800"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        اختر لون كل زهرة
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-start">
        {selectedFlowerEntries.map(([flowerId, quantity]) => {
          const flower = flowers.find((f) => f.id === Number(flowerId));
          const selectedColorIds = selectedColors[flowerId] || [];
          const availableColors = flower?.availableColors || [];
          const isExpanded = expandedFlower === flowerId;

          return (
            <div
              key={flowerId}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-sm"
            >
              {/* Header - Clickable */}
              <button
                onClick={() => onToggleFlowerExpansion(flowerId)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={flower?.image}
                  alt={flower?.name}
                  className="w-8 h-8 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 text-right">
                  <h4 className="font-medium text-gray-900 text-sm">{flower?.name}</h4>
                  <p className="text-xs text-gray-500">{quantity} زهرة</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedColorIds.length > 0 && (
                    <div className="flex gap-1">
                      {selectedColorIds.map((colorId) => (
                        <div
                          key={colorId}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: colors.find((c) => c.id === colorId)?.color,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Colors Section - Collapsible */}
              {availableColors.length > 0 && (
                <div
                  className={`transition-all duration-200 overflow-hidden ${
                    isExpanded ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-3 pb-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap pt-2">
                      {availableColors.map((colorId) => {
                        const color = colors.find((c) => c.id === colorId);
                        if (!color) return null;

                        return (
                          <button
                            key={colorId}
                            onClick={() => onSetFlowerColor(flowerId, colorId)}
                            className={`relative w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                              selectedColorIds.includes(colorId)
                                ? "border-[#5A5E4D] ring-1 ring-[#5A5E4D]"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{
                              backgroundColor: color.color,
                            }}
                            title={color.name}
                          >
                            {selectedColorIds.includes(colorId) && (
                              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedColorIds.length > 0 && (
                      <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                        <span>✓</span>
                        تم اختيار
                        {selectedColorIds.length > 1 ? " الألوان" : " اللون"}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
