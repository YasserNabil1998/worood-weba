"use client";

import { Suspense, lazy } from "react";
import { UI_TEXTS } from "@/constants";
import {
  Flower,
  BouquetSize,
  BouquetStyle,
  Color,
  Occasion,
  DeliveryTime,
  Config,
  Vase,
  PackagingType,
} from "@/@types/custom/index.type";

const FlowerSelectionStep = lazy(() => import("@/components/custom/steps/FlowerSelectionStep"));
const SizeAndPackagingStep = lazy(() => import("@/components/custom/steps/SizeAndPackagingStep"));
const CustomizationStep = lazy(() => import("@/components/custom/steps/CustomizationStep"));
const DeliveryStep = lazy(() => import("@/components/custom/steps/DeliveryStep"));

interface CustomBuilderStepsProps {
  currentStep: number;
  flowers: Flower[];
  selectedFlowers: Record<string, number>;
  totalFlowersCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInc: (flowerId: string | number) => void;
  onDec: (flowerId: string | number) => void;
  qty: (flowerId: string | number) => number;
  onNextStep: () => void;
  colors: Color[];
  selectedColors: Record<string, string>;
  expandedFlower: string | null;
  onToggleFlowerExpansion: (flowerId: string) => void;
  onSetFlowerColor: (flowerId: string, colorId: string) => void;
  bouquetSizes: BouquetSize[];
  size: string;
  customFlowerCount: number;
  onCustomFlowerCountChange: (count: number) => void;
  onSizeChange: (newSize: string) => void;
  packagingType: string;
  onPackagingTypeChange: (type: string) => void;
  bouquetStyles: BouquetStyle[];
  style: string;
  onStyleChange: (style: string) => void;
  vases: Vase[];
  selectedVase: string;
  onVaseChange: (vaseId: string) => void;
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
  deliveryType: string;
  onDeliveryTypeChange: (type: string) => void;
  deliveryTimes: DeliveryTime[];
  deliveryTime: string;
  onDeliveryTimeChange: (time: string) => void;
  deliveryDate: string;
  onDeliveryDateChange: (date: string) => void;
  isAddingToCart: boolean;
  onAddToCart: () => void;
}

export default function CustomBuilderSteps({
  currentStep,
  flowers,
  selectedFlowers,
  totalFlowersCount,
  searchQuery,
  onSearchChange,
  onInc,
  onDec,
  qty,
  onNextStep,
  colors,
  selectedColors,
  expandedFlower,
  onToggleFlowerExpansion,
  onSetFlowerColor,
  bouquetSizes,
  size,
  customFlowerCount,
  onCustomFlowerCountChange,
  onSizeChange,
  packagingType,
  onPackagingTypeChange,
  bouquetStyles,
  style,
  onStyleChange,
  vases,
  selectedVase,
  onVaseChange,
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
  deliveryType,
  onDeliveryTypeChange,
  deliveryTimes,
  deliveryTime,
  onDeliveryTimeChange,
  deliveryDate,
  onDeliveryDateChange,
  isAddingToCart,
  onAddToCart,
}: CustomBuilderStepsProps) {
  if (currentStep === 1) {
    return (
      <Suspense fallback={<div className="text-center py-8">{UI_TEXTS.LOADING}</div>}>
        <FlowerSelectionStep
          flowers={flowers}
          selectedFlowers={selectedFlowers}
          totalFlowersCount={totalFlowersCount}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onInc={onInc}
          onDec={onDec}
          qty={qty}
          onNextStep={onNextStep}
        />
      </Suspense>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-5 mb-4">
      {currentStep === 2 && (
        <Suspense fallback={<div className="text-center py-8">{UI_TEXTS.LOADING}</div>}>
          <SizeAndPackagingStep
            selectedFlowers={selectedFlowers}
            flowers={flowers}
            colors={colors}
            selectedColors={Object.fromEntries(
              Object.entries(selectedColors).map(([key, value]) => [
                key,
                typeof value === 'string' ? value.split(',').map(Number) : (Array.isArray(value) ? value : [Number(value)])
              ])
            ) as { [flowerId: string]: number[] }}
            expandedFlower={expandedFlower}
            onToggleFlowerExpansion={onToggleFlowerExpansion}
            onSetFlowerColor={(flowerId: string, colorId: number) => onSetFlowerColor(flowerId, String(colorId))}
            bouquetSizes={bouquetSizes}
            size={size as "small" | "medium" | "large" | "custom"}
            totalFlowersCount={totalFlowersCount}
            customFlowerCount={customFlowerCount}
            onCustomFlowerCountChange={onCustomFlowerCountChange}
            onSizeChange={onSizeChange}
            packagingType={packagingType as PackagingType}
            onPackagingTypeChange={onPackagingTypeChange}
            bouquetStyles={bouquetStyles}
            style={style as "classic" | "premium" | "gift" | "eco"}
            onStyleChange={onStyleChange}
            vases={vases}
            selectedVase={selectedVase}
            onVaseChange={onVaseChange}
            onPrevStep={() => {}}
            onNextStep={() => {}}
          />
        </Suspense>
      )}

      {currentStep === 3 && (
        <Suspense fallback={<div className="text-center py-8">{UI_TEXTS.LOADING}</div>}>
          <CustomizationStep
            occasions={occasions}
            occasion={occasion}
            onOccasionChange={onOccasionChange}
            includeCard={includeCard}
            onIncludeCardChange={onIncludeCardChange}
            cardMessage={cardMessage}
            onCardMessageChange={onCardMessageChange}
            showSuggestions={showSuggestions}
            onShowSuggestionsToggle={onShowSuggestionsToggle}
            cardSuggestions={cardSuggestions}
            notes={notes}
            onNotesChange={onNotesChange}
            config={config}
            onPrevStep={() => {}}
            onNextStep={() => {}}
          />
        </Suspense>
      )}

      {currentStep === 4 && (
        <Suspense fallback={<div className="text-center py-8">{UI_TEXTS.LOADING}</div>}>
          <DeliveryStep
            deliveryType={deliveryType as "today" | "scheduled"}
            onDeliveryTypeChange={onDeliveryTypeChange}
            deliveryTimes={deliveryTimes}
            deliveryTime={deliveryTime}
            onDeliveryTimeChange={onDeliveryTimeChange}
            deliveryDate={deliveryDate}
            onDeliveryDateChange={onDeliveryDateChange}
            isAddingToCart={isAddingToCart}
            onPrevStep={() => {}}
            onAddToCart={onAddToCart}
          />
        </Suspense>
      )}
    </div>
  );
}

