import { useState, useMemo, useEffect } from "react";
import { Flower } from "@/src/@types/custom/index.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const FLOWERS_PER_PAGE = 6;

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
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(flowers.length / FLOWERS_PER_PAGE);
  const startIndex = (currentPage - 1) * FLOWERS_PER_PAGE;
  const endIndex = startIndex + FLOWERS_PER_PAGE;
  const currentPageFlowers = flowers.slice(startIndex, endIndex);

  // Scroll to top when page changes
  useEffect(() => {
    // Scroll to top of the page smoothly when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Generate pagination dots
  const paginationDots = useMemo(() => {
    const dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(i);
    }
    return dots;
  }, [totalPages]);

  // Navigation handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* Flowers grid - matching Figma design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {currentPageFlowers.map((f) => {
          const currentQty = qty(f.id);
          return (
            <div
              key={f.id}
              className="relative h-[300px] sm:h-[340px] rounded-[20px] border border-[#eae9e9] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              {/* Image */}
              <div className="h-[180px] sm:h-[222px] w-full rounded-t-[20px] overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e0dede] rounded-b-[20px] h-[120px] sm:h-[131px] px-3 sm:px-4 py-2 sm:py-3 flex flex-col justify-between">
                <div>
                  <div className="text-[16px] sm:text-[18px] font-bold text-gray-800 mb-1 text-right" style={{ fontFamily: "var(--font-almarai)" }}>
                    {f.name}
                  </div>
                  <div className="text-[14px] sm:text-[16px] font-bold text-[#5a5e4d] text-right" style={{ fontFamily: "var(--font-almarai)" }}>
                    {f.price} ر.س
                  </div>
                </div>
                {currentQty === 0 ? (
                  <button
                    onClick={() => onInc(f.id)}
                    className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[4px] bg-[#5f664f] flex items-center justify-center cursor-pointer hover:bg-[#4b5244] transition-colors self-end"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 self-end">
                    <button
                      onClick={() => onDec(f.id)}
                      className="w-8 h-8 rounded bg-gray-300 text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold min-w-[2rem] text-center">{currentQty}</span>
                    <button
                      onClick={() => onInc(f.id)}
                      className="w-8 h-8 rounded bg-[#5A5E4D] text-white flex items-center justify-center cursor-pointer hover:bg-[#4b5244]"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination with arrows */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
          {/* Previous arrow */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all ${
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-40"
                : "border-gray-300 text-gray-500 hover:border-[#5a5e4d] hover:text-[#5a5e4d] hover:bg-gray-50 cursor-pointer"
            }`}
            aria-label="الصفحة السابقة"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {paginationDots.map((pageNum, index) => {
              const isActive = pageNum === currentPage;
              // Active dot: 23px, inactive dots alternate between 14px and 7px
              let width = 23; // Default for active
              if (!isActive) {
                // Alternate pattern: 14px, 7px, 14px, 7px...
                width = index % 2 === 0 ? 14 : 7;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-[6px] rounded-[10px] transition-all ${
                    isActive ? "bg-[#5a5e4d]" : "bg-[#d9d9d9] hover:bg-[#5a5e4d]/50"
                  }`}
                  style={{ width: `${width}px` }}
                  aria-label={`الصفحة ${pageNum}`}
                />
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-40"
                : "border-gray-300 text-gray-500 hover:border-[#5a5e4d] hover:text-[#5a5e4d] hover:bg-gray-50 cursor-pointer"
            }`}
            aria-label="الصفحة التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Next button */}
      <div className="mt-6 flex">
        <button
          onClick={onNextStep}
          className="ml-auto w-full sm:w-auto h-[50px] sm:h-[64px] px-4 sm:px-6 rounded-[5px] bg-[#5f664f] text-white text-[18px] sm:text-[25px] font-bold hover:bg-[#4b5244] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          <span>التالي</span>
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        </button>
      </div>
    </>
  );
}
