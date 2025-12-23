"use client";

import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { fontStyle } from "@/lib/styles";
import { UI_TEXTS } from "@/constants";
import { getButtonStyles, getButtonInlineStyles } from "@/lib/buttonStyles";

interface CustomBuilderNavigationProps {
  currentStep: number;
  isAddingToCart: boolean;
  isEditMode: boolean;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onAddToCart: () => void;
}

export default function CustomBuilderNavigation({
  currentStep,
  isAddingToCart,
  isEditMode,
  onPreviousStep,
  onNextStep,
  onAddToCart,
}: CustomBuilderNavigationProps) {
  if (currentStep === 1) return null;

  return (
    <div className="flex flex-row items-center justify-between gap-2 mt-4">
      <button
        onClick={onPreviousStep}
        disabled={isAddingToCart}
        className={getButtonStyles.secondary().replace("transition-colors", "")}
        style={{ ...fontStyle, ...getButtonInlineStyles.secondary() }}
      >
        <ChevronRight className="w-5 h-5 shrink-0" />
        <span className="text-[18px] font-bold flex-1 text-center">السابق</span>
      </button>
      {currentStep !== 4 ? (
        <button
          onClick={onNextStep}
          disabled={isAddingToCart}
          className={getButtonStyles.primary().replace("transition-colors", "")}
          style={{ ...fontStyle, ...getButtonInlineStyles.primary() }}
        >
          <span className="text-[18px] font-bold flex-1 text-center">التالي</span>
          <ChevronLeft className="w-5 h-5 shrink-0" />
        </button>
      ) : (
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className={`${getButtonStyles.primary().replace("transition-colors", "")} text-[15px] font-bold`}
          style={{ ...fontStyle, ...getButtonInlineStyles.primary() }}
        >
          {isAddingToCart ? (
            <span className="flex items-center gap-1 text-right">
              <Loader2 className="animate-spin h-3 w-3 text-white shrink-0" />
              {isEditMode ? "جاري التحديث..." : "جاري الإضافة..."}
            </span>
          ) : (
            <span className="text-right whitespace-nowrap">
              {isEditMode ? "تحديث السلة" : UI_TEXTS.ADD_TO_CART_ALT}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

