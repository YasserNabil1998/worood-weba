import { Sparkles } from "lucide-react";

interface CardSuggestionsProps {
  occasion: string;
  suggestions: Record<string, string[]>;
  onSelectSuggestion: (suggestion: string) => void;
}

export default function CardSuggestions({
  occasion,
  suggestions,
  onSelectSuggestion,
}: CardSuggestionsProps) {
  const occasionSuggestions = suggestions[occasion] || [];

  if (occasionSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="animate-in slide-in-from-top-2 duration-300">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#5A5E4D]" />
          <span className="text-xs font-medium text-[#5A5E4D]">اقتراحات لبطاقة التهنئة:</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#5A5E4D]/30 to-transparent"></div>
      </div>
      <div className="h-32 overflow-y-auto hide-scrollbar relative">
        <div className="space-y-2 pr-1">
          {occasionSuggestions.map((suggestion: string, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onSelectSuggestion(suggestion);
                // Visual effect on click
                const button = document.activeElement as HTMLElement;
                button.style.transform = "scale(0.98)";
                setTimeout(() => {
                  button.style.transform = "scale(1)";
                }, 150);
              }}
              className="group w-full text-right p-3 text-xs bg-gradient-to-r from-[#5A5E4D]/5 via-[#5A5E4D]/10 to-[#5A5E4D]/5 hover:from-[#5A5E4D]/10 hover:via-[#5A5E4D]/15 hover:to-[#5A5E4D]/10 border border-[#5A5E4D]/20 hover:border-[#5A5E4D]/30 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{
                height: "40px",
              }}
            >
              <div className="relative flex items-center justify-between gap-3 h-full">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5A5E4D] group-hover:text-[#4b5244] transition-colors duration-200" />
                </div>
                <span className="flex-1 text-[#5A5E4D] group-hover:text-[#4b5244] leading-tight transition-colors duration-200 text-right overflow-hidden text-ellipsis whitespace-nowrap">
                  {suggestion}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs text-[#5A5E4D]">استخدام</span>
                  <span className="text-[#5A5E4D]">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 text-[10px] text-[#5A5E4D]/60 text-center">
        انقر على أي اقتراح لاستخدامه
        {occasionSuggestions.length > 3
          ? ` • ${occasionSuggestions.length} اقتراح متاح (مرر لرؤية المزيد)`
          : ` • ${occasionSuggestions.length} اقتراح متاح`}
      </div>
    </div>
  );
}
