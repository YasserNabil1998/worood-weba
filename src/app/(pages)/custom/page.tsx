"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";

import bouquetsData from "./bouquets.json";
import cardSuggestionsData from "./card-suggestions.json";
import {
  Flower,
  BouquetSize,
  BouquetStyle,
  Color,
  Occasion,
  DeliveryTime,
  PaymentMethod,
  Config,
  Vase,
} from "@/src/@types/custom/index.type";

// Hooks
import { useCustomBouquetState } from "@/src/hooks/custom/useCustomBouquetState";
import { usePriceCalculations } from "@/src/hooks/custom/usePriceCalculations";
import { useFlowerManagement } from "@/src/hooks/custom/useFlowerManagement";
import { useHistoryOperations } from "@/src/hooks/custom/useHistoryOperations";
import { useCartOperations } from "@/src/hooks/custom/useCartOperations";

// Components
import NotificationToast from "@/src/components/custom/NotificationToast";
import StepIndicator from "@/src/components/custom/StepIndicator";
import DataLoader from "@/src/components/DataLoader";
import { fontStyle } from "@/src/lib/styles";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { logError } from "@/src/lib/logger";

const BouquetPreview = lazy(() => import("@/src/components/custom/BouquetPreview"));
const FlowerSelectionStep = lazy(() => import("@/src/components/custom/steps/FlowerSelectionStep"));
const SizeAndPackagingStep = lazy(() => import("@/src/components/custom/steps/SizeAndPackagingStep"));
const CustomizationStep = lazy(() => import("@/src/components/custom/steps/CustomizationStep"));
const DeliveryStep = lazy(() => import("@/src/components/custom/steps/DeliveryStep"));

function CustomBuilderContent() {
  const searchParams = useSearchParams();

  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [bouquetSizes, setBouquetSizes] = useState<BouquetSize[]>([]);
  const [bouquetStyles, setBouquetStyles] = useState<BouquetStyle[]>([]);
  const [vases, setVases] = useState<Vase[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [config, setConfig] = useState<Config>({
    vatRate: 0.15,
    cardPrice: 15,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const state = useCustomBouquetState();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setFlowers(bouquetsData.flowers);
        setBouquetSizes(bouquetsData.bouquetSizes);
        setBouquetStyles(bouquetsData.bouquetStyles);
        setVases(bouquetsData.vases);
        setColors(bouquetsData.colors);
        setOccasions(bouquetsData.occasions);
        setDeliveryTimes(bouquetsData.deliveryTimes);
        setPaymentMethods(bouquetsData.paymentMethods);
        setConfig(bouquetsData.config);

        if (bouquetsData.occasions.length > 0) {
          state.setOccasion(bouquetsData.occasions[0].name);
        }

        setIsLoading(false);
      } catch (error) {
        logError("Error loading bouquet data", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Load shared design from URL
  useEffect(() => {
    const designParam = searchParams.get("design");
    if (designParam) {
      try {
        const design = JSON.parse(decodeURIComponent(designParam));
        state.setSelectedFlowers(design.flowers || {});
        state.setSelectedColors(design.colors || {});
        state.setSize(design.size || "medium");
        state.setStyle(design.style || "classic");
        state.setOccasion(design.occasion || "عيد ميلاد");
        state.setCardMessage(design.cardMessage || "");
        state.setIncludeCard(design.includeCard || false);
        state.setNotes(design.notes || "");

        // Load packaging data
        if (design.packagingType) {
          state.setPackagingType(design.packagingType);
        }
        if (design.selectedVase) {
          state.setSelectedVase(design.selectedVase);
        }

        // Load delivery data
        if (design.deliveryDate) {
          state.setDeliveryDate(design.deliveryDate);
        }
        if (design.deliveryTime) {
          state.setDeliveryTime(design.deliveryTime);
        }
        if (design.city) {
          state.setCity(design.city);
        }
        if (design.district) {
          state.setDistrict(design.district);
        }
        if (design.street) {
          state.setStreet(design.street);
        }
        if (design.landmark) {
          state.setLandmark(design.landmark);
        }
        if (design.phone) {
          state.setPhone(design.phone);
        }
        if (design.payMethod) {
          state.setPayMethod(design.payMethod);
        }

        if (design.image) {
          state.setBouquetImage(design.image);
        }
      } catch (e) {
        logError("Failed to parse design data", e, { designParam });
      }
    }
  }, [searchParams]);

  // Helper functions
  const getStyleLabel = (s: "classic" | "premium" | "gift" | "eco") =>
    bouquetStyles.find((x) => x.key === s)?.label || s;

  const getVaseName = (vaseId: string) => {
    const vase = vases.find((v) => v.id.toString() === vaseId);
    return vase?.name || "مزهرية";
  };

  // Price calculations
  const prices = usePriceCalculations({
    selectedFlowers: state.selectedFlowers,
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    size: state.size,
    style: state.style,
    packagingType: state.packagingType,
    selectedVase: state.selectedVase,
    includeCard: state.includeCard,
    config,
  });

  // Flower management
  const flowerManagement = useFlowerManagement({
    selectedFlowers: state.selectedFlowers,
    setSelectedFlowers: state.setSelectedFlowers,
    selectedColors: state.selectedColors,
    setSelectedColors: state.setSelectedColors,
    size: state.size,
    setSize: state.setSize,
    customFlowerCount: state.customFlowerCount,
    totalFlowersCount: prices.totalFlowersCount,
    isUpdatingFlowersRef: state.isUpdatingFlowersRef,
  });

  // History operations
  const historyOps = useHistoryOperations({
    selectedFlowers: state.selectedFlowers,
    selectedColors: state.selectedColors,
    size: state.size,
    style: state.style,
    occasion: state.occasion,
    cardMessage: state.cardMessage,
    includeCard: state.includeCard,
    notes: state.notes,
    total: prices.total,
    bouquetImage: state.bouquetImage,
    flowers,
    showNotification: state.showNotification,
  });

  // Cart operations
  const cartOps = useCartOperations({
    selectedFlowers: state.selectedFlowers,
    selectedColors: state.selectedColors,
    size: state.size,
    style: state.style,
    packagingType: state.packagingType,
    selectedVase: state.selectedVase,
    occasion: state.occasion,
    cardMessage: state.cardMessage,
    includeCard: state.includeCard,
    notes: state.notes,
    deliveryDate: state.deliveryDate,
    deliveryTime: state.deliveryTime,
    city: state.city,
    district: state.district,
    street: state.street,
    landmark: state.landmark,
    phone: state.phone,
    payMethod: state.payMethod,
    bouquetImage: state.bouquetImage,
    totalFlowersCount: prices.totalFlowersCount,
    subtotal: prices.subtotal,
    vat: prices.vat,
    total: prices.total,
    isAddingToCart: state.isAddingToCart,
    setIsAddingToCart: state.setIsAddingToCart,
    showNotification: state.showNotification,
    saveToHistory: historyOps.saveToHistory,
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    occasions,
    deliveryTimes,
    paymentMethods,
    config,
  });

  // Toggle flower expansion
  const toggleFlowerExpansion = (flowerId: string) => {
    state.setExpandedFlower(state.expandedFlower === flowerId ? null : flowerId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen" dir="rtl">
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A5E4D] mb-4"></div>
                <p className="text-gray-600">جاري تحميل البيانات...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isEditMode = searchParams.get("edit") === "true";
  const loadingText = isEditMode
    ? "جاري تحديث الباقة في السلة..."
    : "جاري إضافة الباقة إلى السلة...";

  return (
    <DataLoader isLoading={state.isAddingToCart} loadingText={loadingText}>
      <div className="min-h-screen" dir="rtl">
        <NotificationToast
          message={state.notification.message}
          visible={state.notification.visible}
        />

        <main>
          <section className="pt-8 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
              <h1 className="text-[32px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                تنسيق باقة خاص
              </h1>
              <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
                صمّم باقتك الخاصة بالزهور التي تفضّلها
              </p>
            </div>
          </section>

          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="order-2 lg:order-2 lg:col-span-2">
                  <div className="mb-4">
                    <StepIndicator currentStep={state.step} onStepChange={state.setStep} />
                  </div>

                  {state.step === 1 && (
                    <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
                      <FlowerSelectionStep
                        flowers={flowers}
                        selectedFlowers={state.selectedFlowers}
                        totalFlowersCount={prices.totalFlowersCount}
                        searchQuery={state.searchQuery}
                        onSearchChange={state.setSearchQuery}
                        onInc={flowerManagement.inc}
                        onDec={flowerManagement.dec}
                        qty={flowerManagement.qty}
                        onNextStep={() => state.setStep(2)}
                      />
                    </Suspense>
                  )}

                  {(state.step === 2 || state.step === 3 || state.step === 4) && (
                    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-5 mb-4">
                      {state.step === 2 && (
                        <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
                          <SizeAndPackagingStep
                          selectedFlowers={state.selectedFlowers}
                          flowers={flowers}
                          colors={colors}
                          selectedColors={state.selectedColors}
                          expandedFlower={state.expandedFlower}
                          onToggleFlowerExpansion={toggleFlowerExpansion}
                          onSetFlowerColor={flowerManagement.setFlowerColor}
                          bouquetSizes={bouquetSizes}
                          size={state.size}
                          totalFlowersCount={prices.totalFlowersCount}
                          customFlowerCount={state.customFlowerCount}
                          onCustomFlowerCountChange={state.setCustomFlowerCount}
                          onSizeChange={flowerManagement.handleSizeChange}
                          packagingType={state.packagingType}
                          onPackagingTypeChange={state.setPackagingType}
                          bouquetStyles={bouquetStyles}
                          style={state.style}
                          onStyleChange={state.setStyle}
                          vases={vases}
                          selectedVase={state.selectedVase}
                          onVaseChange={state.setSelectedVase}
                          onPrevStep={() => {}}
                          onNextStep={() => {}}
                        />
                        </Suspense>
                      )}

                      {state.step === 3 && (
                        <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
                          <CustomizationStep
                            occasions={occasions}
                            occasion={state.occasion}
                            onOccasionChange={state.setOccasion}
                            includeCard={state.includeCard}
                            onIncludeCardChange={state.setIncludeCard}
                            cardMessage={state.cardMessage}
                            onCardMessageChange={state.setCardMessage}
                            showSuggestions={state.showSuggestions}
                            onShowSuggestionsToggle={() =>
                              state.setShowSuggestions(!state.showSuggestions)
                            }
                            cardSuggestions={cardSuggestionsData.cardSuggestions}
                            notes={state.notes}
                            onNotesChange={state.setNotes}
                            config={config}
                            onPrevStep={() => {}}
                            onNextStep={() => {}}
                          />
                        </Suspense>
                      )}

                      {state.step === 4 && (
                        <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
                          <DeliveryStep
                            deliveryType={state.deliveryType}
                            onDeliveryTypeChange={state.setDeliveryType}
                            deliveryTimes={deliveryTimes}
                            deliveryTime={state.deliveryTime}
                            onDeliveryTimeChange={state.setDeliveryTime}
                            deliveryDate={state.deliveryDate}
                            onDeliveryDateChange={state.setDeliveryDate}
                            isAddingToCart={state.isAddingToCart}
                            onPrevStep={() => {}}
                            onAddToCart={cartOps.addToCart}
                          />
                        </Suspense>
                      )}
                    </div>
                  )}

                  {(state.step === 2 || state.step === 3 || state.step === 4) && (
                    <div className="flex flex-row items-center justify-between gap-2 mt-4">
                      <button
                        onClick={() => {
                          if (state.step === 2) state.setStep(1);
                          else if (state.step === 3) state.setStep(2);
                          else if (state.step === 4) state.setStep(3);
                        }}
                        disabled={state.isAddingToCart}
                        className="w-[130px] h-[50px] px-4 rounded-[5px] bg-transparent border border-[#5A5E4D] text-[#5A5E4D] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={fontStyle}
                      >
                        <ChevronRight className="w-5 h-5 shrink-0" />
                        <span className="text-[18px] font-bold flex-1 text-center">السابق</span>
                      </button>
                      {state.step !== 4 ? (
                        <button
                          onClick={() => {
                            if (state.step === 2) {
                              flowerManagement.completeFlowersForSize();
                              state.setStep(3);
                            } else if (state.step === 3) {
                              state.setStep(4);
                            }
                          }}
                          disabled={state.isAddingToCart}
                          className="w-[130px] h-[50px] px-4 rounded-[5px] bg-[#5f664f] text-white hover:bg-[#4b5244] transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          style={fontStyle}
                        >
                          <span className="text-[18px] font-bold flex-1 text-center">التالي</span>
                          <ChevronLeft className="w-5 h-5 shrink-0" />
                        </button>
                      ) : (
                        <button
                          onClick={cartOps.addToCart}
                          disabled={state.isAddingToCart}
                          className="w-[130px] h-[50px] px-4 rounded-[5px] bg-[#5f664f] text-white text-[15px] font-bold hover:bg-[#4b5244] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                          style={fontStyle}
                        >
                          {state.isAddingToCart ? (
                            <span className="flex items-center gap-1 text-right">
                              <Loader2 className="animate-spin h-3 w-3 text-white shrink-0" />
                              {isEditMode ? "جاري التحديث..." : "جاري الإضافة..."}
                            </span>
                          ) : (
                            <span className="text-right whitespace-nowrap">
                              {isEditMode ? "تحديث السلة" : "إضافة إلى السلة"}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <Suspense fallback={<div className="text-center py-8">جاري تحميل المعاينة...</div>}>
                  <BouquetPreview
                    bouquetImage={state.bouquetImage}
                    total={prices.total}
                    totalFlowersCount={prices.totalFlowersCount}
                    packagingType={state.packagingType}
                    style={state.style}
                    selectedVase={state.selectedVase}
                    stylePrice={prices.stylePrice}
                    vasePrice={prices.vasePrice}
                    flowersPrice={prices.flowersPrice}
                    includeCard={state.includeCard}
                    cardPrice={prices.cardPrice}
                    vat={prices.vat}
                    vases={vases}
                    size={state.size}
                    customFlowerCount={state.customFlowerCount}
                    selectedFlowers={state.selectedFlowers}
                    flowers={flowers}
                    selectedColors={state.selectedColors}
                    colors={colors}
                    onSaveToFavorites={historyOps.saveToFavorites}
                    onShareDesign={historyOps.shareDesign}
                    getStyleLabel={getStyleLabel}
                    getVaseName={getVaseName}
                  />
                </Suspense>
              </div>
            </div>
          </section>
        </main>
      </div>
    </DataLoader>
  );
}

export default function CustomBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>
      }
    >
      <CustomBuilderContent />
    </Suspense>
  );
}
