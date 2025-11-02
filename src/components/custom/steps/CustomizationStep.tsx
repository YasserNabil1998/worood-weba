import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { Occasion, Config } from "@/src/@types/custom/index.type";
import CardSuggestions from "../CardSuggestions";

interface CustomizationStepProps {
  occasions: Occasion[];
  occasion: string;
  onOccasionChange: (occasion: string) => void;
  includeCard: boolean;
  onIncludeCardChange: (include: boolean) => void;
  cardMessage: string;
  onCardMessageChange: (message: string) => void;
  showSuggestions: boolean;
  onShowSuggestionsToggle: () => void;
  cardSuggestions: Record<string, string[]>;
  notes: string;
  onNotesChange: (notes: string) => void;
  config: Config;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function CustomizationStep({
  occasions,
  occasion,
  onOccasionChange,
  includeCard,
  onIncludeCardChange,
  cardMessage,
  onCardMessageChange,
  showSuggestions,
  onShowSuggestionsToggle,
  cardSuggestions,
  notes,
  onNotesChange,
  config,
  onPrevStep,
  onNextStep,
}: CustomizationStepProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <div
          className="mb-2 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          المناسبة
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            onBlur={() => setTimeout(() => setIsSelectOpen(false), 200)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 cursor-pointer"
            style={{ paddingLeft: "2.5rem" }}
          >
            {occasion}
          </button>
          {isSelectOpen ? (
            <ChevronUp className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none transition-transform" />
          ) : (
            <ChevronDown className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none transition-transform" />
          )}

          {isSelectOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
              {occasions.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    onOccasionChange(o.name);
                    setIsSelectOpen(false);
                  }}
                  className={`px-3 py-2 text-xs sm:text-sm text-right cursor-pointer hover:bg-[#5A5E4D]/10 transition-colors ${
                    occasion === o.name ? "bg-[#5A5E4D]/5 font-semibold" : ""
                  }`}
                >
                  {o.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <div
          className="mb-2 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          بطاقة التهنئة
        </div>

        <label className="mb-3 flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            checked={includeCard}
            onChange={(e) => onIncludeCardChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#5A5E4D] focus:ring-[#5A5E4D]"
          />
          <span>إضافة بطاقة تهنئة (+{config.cardPrice} ر.س)</span>
        </label>

        {includeCard && (
          <div className="space-y-3">
            {/* Message input field */}
            <div className="rounded-lg bg-white p-3">
              <div className="flex items-center gap-3 mb-3">
                <textarea
                  value={cardMessage}
                  onChange={(e) => onCardMessageChange(e.target.value.slice(0, 150))}
                  placeholder="اكتب رسالتك هنا أو اختر من الاقتراحات أدناه..."
                  className="flex-1 h-28 resize-none rounded-md border border-gray-200 p-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                />
                {/* Show suggestions button */}
                {occasion && (
                  <button
                    type="button"
                    onClick={onShowSuggestionsToggle}
                    className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg border border-[#5A5E4D]/30 bg-[#5A5E4D]/5 text-[#5A5E4D] hover:bg-[#5A5E4D]/10 transition-all duration-200 min-h-[112px]"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-medium">اقتراحات</span>
                    {showSuggestions ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              <div className="flex items-center justify-end text-[11px] text-gray-500">
                <span>{cardMessage.length}/150 حرف</span>
              </div>
            </div>

            {/* Card suggestions */}
            {occasion && showSuggestions && (
              <CardSuggestions
                occasion={occasion}
                suggestions={cardSuggestions}
                onSelectSuggestion={onCardMessageChange}
              />
            )}
          </div>
        )}
      </div>

      <div>
        <div
          className="mb-2 text-sm font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          ملاحظات خاصة
        </div>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="أي متطلبات أو تفاصيل خاصة ترغب بإضافتها..."
          className="w-full h-20 resize-none rounded-lg border border-gray-200 p-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
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
