import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { Occasion, Config } from "@/types/custom";
import CardSuggestions from "../CardSuggestions";
import { fontStyle } from "@/lib/styles";
import { TIMEOUTS } from "@/constants";

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
      {/* المناسبة */}
      <div>
        <div className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right" style={fontStyle}>
          المناسبة
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            onBlur={() => setTimeout(() => setIsSelectOpen(false), TIMEOUTS.DROPDOWN_CLOSE_DELAY)}
            className="w-full h-[62px] rounded-[10px] border border-[#cfcfcf] bg-white px-3 py-2 text-right text-[20px] text-[#727272] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 cursor-pointer"
            style={{ 
              paddingLeft: "2.5rem",
              fontFamily: "var(--font-almarai)"
            }}
          >
            {occasion || "اختر المناسبة"}
          </button>
          {isSelectOpen ? (
            <ChevronUp className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#9d9d9d] pointer-events-none transition-transform" />
          ) : (
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#9d9d9d] pointer-events-none transition-transform" />
          )}

          {isSelectOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-[#cfcfcf] rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto">
              {occasions.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    onOccasionChange(o.name);
                    setIsSelectOpen(false);
                  }}
                  className={`px-3 py-2 text-[20px] text-right cursor-pointer hover:bg-[#5A5E4D]/10 transition-colors ${
                    occasion === o.name ? "bg-[#5A5E4D]/5 font-semibold" : ""
                  }`}
                  style={fontStyle}
                >
                  {o.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* بطاقة التهنئة */}
      <div>
        <div className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right" style={fontStyle}>
          بطاقة التهنئة
        </div>

        <label className="mb-3 flex items-center gap-2 text-[18px] text-black">
          <input
            type="checkbox"
            checked={includeCard}
            onChange={(e) => onIncludeCardChange(e.target.checked)}
            className="w-[26px] h-[23px] rounded-[2px] border-0 bg-[#5A5E4D] text-[#5A5E4D] focus:ring-[#5A5E4D] cursor-pointer"
            style={{ accentColor: "#5A5E4D" }}
          />
          <span style={fontStyle}>
            إضافة بطاقة تهنئة (+
            <span className="font-bold">{config.cardPrice}</span>
            <span> ر.س</span>)
          </span>
        </label>

        {includeCard && (
          <div className="space-y-3">
            {/* Message textarea */}
            <textarea
              value={cardMessage}
              onChange={(e) => onCardMessageChange(e.target.value.slice(0, 150))}
              placeholder="اكتب رسالتك هنا أو اختر من الاقتراحات أدناه"
              className="w-full h-[148px] resize-none rounded-[10px] border border-[#cfcfcf] bg-white p-3 text-right text-[16px] text-[#727272] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
            />

            {/* Suggestions button */}
            {occasion && (
              <button
                type="button"
                onClick={onShowSuggestionsToggle}
                className="w-[140px] h-[47px] rounded-[10px] border border-[#cfcfcf] bg-[#f6f7f6] text-[18px] text-black hover:bg-[#e8e9e8] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                style={fontStyle}
              >
                <span>اقتراحات</span>
                {showSuggestions ? (
                  <ChevronUp className="w-6 h-6 text-[#9d9d9d]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#9d9d9d]" />
                )}
              </button>
            )}

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

      {/* ملاحظات خاصة */}
      <div>
        <div className="mb-2 text-[18px] font-normal leading-[20px] text-black text-right" style={fontStyle}>
          ملاحظات خاصة
        </div>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="أي متطلبات أو تفاصيل خاصة ترغب بإضافتها ...."
          className="w-full h-[120px] resize-none rounded-[10px] border border-[#cfcfcf] bg-white p-3 text-right text-[16px] text-[#727272] focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
          style={fontStyle}
        />
      </div>
    </div>
  );
}
