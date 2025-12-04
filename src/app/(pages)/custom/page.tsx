"use client";

import { Suspense, lazy, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import cardSuggestionsData from "./card-suggestions.json";

// Hooks
import { useCustomBouquetState } from "@/src/hooks/custom/useCustomBouquetState";
import { usePriceCalculations } from "@/src/hooks/custom/usePriceCalculations";
import { useFlowerManagement } from "@/src/hooks/custom/useFlowerManagement";
import { useHistoryOperations } from "@/src/hooks/custom/useHistoryOperations";
import { useCartOperations } from "@/src/hooks/custom/useCartOperations";
import { useCustomBuilderData } from "@/src/hooks/custom/useCustomBuilderData";
import { useDesignFromUrl } from "@/src/hooks/custom/useDesignFromUrl";

// Components
import NotificationToast from "@/src/components/custom/NotificationToast";
import StepIndicator from "@/src/components/custom/StepIndicator";
import CustomBuilderHeader from "@/src/components/custom/CustomBuilderHeader";
import CustomBuilderNavigation from "@/src/components/custom/CustomBuilderNavigation";
import CustomBuilderSteps from "@/src/components/custom/CustomBuilderSteps";
import DataLoader from "@/src/components/DataLoader";
import AOSWrapper from "@/src/components/common/AOSWrapper";
import { UI_TEXTS } from "@/src/constants";

const BouquetPreview = lazy(() => import("@/src/components/custom/BouquetPreview"));

function CustomBuilderContent() {
  const searchParams = useSearchParams();
  const state = useCustomBouquetState();

  // Load data
  const {
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    colors,
    occasions,
    deliveryTimes,
    paymentMethods,
    config,
    isLoading,
  } = useCustomBuilderData();

  // Set default occasion when data loads
  useEffect(() => {
    if (occasions.length > 0 && !state.occasion) {
      state.setOccasion(occasions[0].name);
    }
  }, [occasions, state]);

  // Load design from URL
  useDesignFromUrl({
    setSelectedFlowers: state.setSelectedFlowers,
    setSelectedColors: state.setSelectedColors,
    setSize: state.setSize,
    setStyle: state.setStyle,
    setOccasion: state.setOccasion,
    setCardMessage: state.setCardMessage,
    setIncludeCard: state.setIncludeCard,
    setNotes: state.setNotes,
    setPackagingType: state.setPackagingType,
    setSelectedVase: state.setSelectedVase,
    setDeliveryDate: state.setDeliveryDate,
    setDeliveryTime: state.setDeliveryTime,
    setCity: state.setCity,
    setDistrict: state.setDistrict,
    setStreet: state.setStreet,
    setLandmark: state.setLandmark,
    setPhone: state.setPhone,
    setPayMethod: state.setPayMethod,
    setBouquetImage: state.setBouquetImage,
  });

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

  const handlePreviousStep = () => {
    if (state.step === 2) state.setStep(1);
    else if (state.step === 3) state.setStep(2);
    else if (state.step === 4) state.setStep(3);
  };

  const handleNextStep = () => {
    if (state.step === 2) {
      flowerManagement.completeFlowersForSize();
      state.setStep(3);
    } else if (state.step === 3) {
      state.setStep(4);
    }
  };

  return (
    <DataLoader isLoading={state.isAddingToCart} loadingText={loadingText}>
      <div className="min-h-screen" dir="rtl">
        <NotificationToast
          message={state.notification.message}
          visible={state.notification.visible}
        />

        <main>
          <AOSWrapper animation="fade-down" delay={0} duration={800}>
            <CustomBuilderHeader />
          </AOSWrapper>

          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="order-2 lg:order-2 lg:col-span-2">
                  <AOSWrapper animation="fade-up" delay={100} duration={800}>
                    <div className="mb-4">
                      <StepIndicator currentStep={state.step} onStepChange={state.setStep} />
                    </div>
                  </AOSWrapper>

                  <AOSWrapper animation="fade-up" delay={150} duration={800}>
                    <CustomBuilderSteps
                      currentStep={state.step}
                      flowers={flowers}
                      selectedFlowers={state.selectedFlowers}
                      totalFlowersCount={prices.totalFlowersCount}
                      searchQuery={state.searchQuery}
                      onSearchChange={state.setSearchQuery}
                      onInc={(flowerId: string | number) => flowerManagement.inc(typeof flowerId === 'string' ? Number(flowerId) : flowerId)}
                      onDec={(flowerId: string | number) => flowerManagement.dec(typeof flowerId === 'string' ? Number(flowerId) : flowerId)}
                      qty={(flowerId: string | number) => flowerManagement.qty(typeof flowerId === 'string' ? Number(flowerId) : flowerId)}
                      onNextStep={() => state.setStep(2)}
                      colors={colors}
                      selectedColors={Object.fromEntries(
                        Object.entries(state.selectedColors).map(([key, value]) => [
                          key,
                          Array.isArray(value) ? value.join(',') : String(value)
                        ])
                      ) as Record<string, string>}
                      expandedFlower={state.expandedFlower}
                      onToggleFlowerExpansion={toggleFlowerExpansion}
                      onSetFlowerColor={(flowerId: string, colorId: string) => flowerManagement.setFlowerColor(flowerId, Number(colorId))}
                      bouquetSizes={bouquetSizes}
                      size={state.size}
                      customFlowerCount={state.customFlowerCount}
                      onCustomFlowerCountChange={state.setCustomFlowerCount}
                      onSizeChange={(newSize: string) => {
                        if (["small", "medium", "large", "custom"].includes(newSize)) {
                          flowerManagement.handleSizeChange(newSize as "small" | "medium" | "large" | "custom");
                        }
                      }}
                      packagingType={state.packagingType}
                      onPackagingTypeChange={(type: string) => {
                        if (["paper", "vase"].includes(type)) {
                          state.setPackagingType(type as "paper" | "vase");
                        }
                      }}
                      bouquetStyles={bouquetStyles}
                      style={state.style}
                      onStyleChange={(style: string) => {
                        if (["classic", "premium", "gift", "eco"].includes(style)) {
                          state.setStyle(style as "classic" | "premium" | "gift" | "eco");
                        }
                      }}
                      vases={vases}
                      selectedVase={state.selectedVase}
                      onVaseChange={state.setSelectedVase}
                      occasions={occasions}
                      occasion={state.occasion}
                      onOccasionChange={state.setOccasion}
                      includeCard={state.includeCard}
                      onIncludeCardChange={state.setIncludeCard}
                      cardMessage={state.cardMessage}
                      onCardMessageChange={state.setCardMessage}
                      showSuggestions={state.showSuggestions}
                      onShowSuggestionsToggle={() => state.setShowSuggestions(!state.showSuggestions)}
                      cardSuggestions={cardSuggestionsData.cardSuggestions}
                      notes={state.notes}
                      onNotesChange={state.setNotes}
                      config={config}
                      deliveryType={state.deliveryType}
                      onDeliveryTypeChange={(type: string) => {
                        if (["today", "scheduled"].includes(type)) {
                          state.setDeliveryType(type as "today" | "scheduled");
                        }
                      }}
                      deliveryTimes={deliveryTimes}
                      deliveryTime={state.deliveryTime}
                      onDeliveryTimeChange={state.setDeliveryTime}
                      deliveryDate={state.deliveryDate}
                      onDeliveryDateChange={state.setDeliveryDate}
                      isAddingToCart={state.isAddingToCart}
                      onAddToCart={cartOps.addToCart}
                    />
                  </AOSWrapper>

                  <AOSWrapper animation="fade-up" delay={200} duration={800}>
                    <CustomBuilderNavigation
                      currentStep={state.step}
                      isAddingToCart={state.isAddingToCart}
                      isEditMode={isEditMode}
                      onPreviousStep={handlePreviousStep}
                      onNextStep={handleNextStep}
                      onAddToCart={cartOps.addToCart}
                    />
                  </AOSWrapper>
                </div>

                <AOSWrapper animation="fade-left" delay={100} duration={800}>
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
                </AOSWrapper>
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
        <div className="min-h-screen flex items-center justify-center">{UI_TEXTS.LOADING}</div>
      }
    >
      <CustomBuilderContent />
    </Suspense>
  );
}
