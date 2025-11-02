import { Flower } from "@/src/@types/custom/index.type";
import SelectedFlowersList from "../SelectedFlowersList";
import { Search, ChevronLeft, SearchX, Plus, Minus } from "lucide-react";

interface FlowerSelectionStepProps {
  flowers: Flower[];
  selectedFlowers: Record<number, number>;
  totalFlowersCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  qty: (id: number) => number;
  onNextStep: () => void;
}

export default function FlowerSelectionStep({
  flowers,
  selectedFlowers,
  totalFlowersCount,
  searchQuery,
  onSearchChange,
  onInc,
  onDec,
  qty,
  onNextStep,
}: FlowerSelectionStepProps) {
  // Filter flowers based on search
  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search field */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن الزهور"
          className="w-full rounded-lg border border-gray-200 bg-white shadow-sm pl-10 pr-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {filteredFlowers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <SearchX className="mx-auto w-12 h-12 mb-3 text-gray-400" />
          <p className="text-sm">لا توجد نتائج للبحث "{searchQuery}"</p>
          <button
            onClick={() => onSearchChange("")}
            className="mt-3 text-[#5A5E4D] text-sm hover:underline cursor-pointer"
          >
            مسح البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {filteredFlowers.map((f) => {
            const currentQty = qty(f.id);
            return (
              <div key={f.id} className="rounded-lg border border-gray-200 p-2 sm:p-3 text-center">
                <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden mb-2 border border-gray-200 bg-gray-50 p-1">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="text-[11px] sm:text-[12px] font-semibold truncate">{f.name}</div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 mb-2">{f.price} ر.س</div>
                {currentQty === 0 ? (
                  <button
                    onClick={() => onInc(f.id)}
                    className="mx-auto inline-block text-[11px] sm:text-[12px] px-2 sm:px-3 py-1 rounded bg-[#5A5E4D] text-white cursor-pointer"
                  >
                    إضافة
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => onInc(f.id)}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded bg-[#5A5E4D] text-white flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <span className="text-xs sm:text-sm font-semibold min-w-[1.5rem] text-center">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => onDec(f.id)}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded bg-gray-300 text-gray-700 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-right">
        <div
          className="mb-2 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          الزهور المختارة
        </div>
        <SelectedFlowersList
          selectedFlowers={selectedFlowers}
          flowers={flowers}
          totalFlowersCount={totalFlowersCount}
        />
      </div>

      <div className="mt-6 flex">
        <button
          onClick={onNextStep}
          className="ml-auto px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
        >
          <span>التالي</span>
          <ChevronLeft className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
    </>
  );
}
