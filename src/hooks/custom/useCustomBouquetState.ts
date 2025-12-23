import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCustomBouquetBuilderStore } from "@/stores";

export function useCustomBouquetState() {
  const isUpdatingFlowersRef = useRef(false);

  // Using single selector with useShallow to avoid multiple subscriptions and unnecessary re-renders
  const {
    // Flowers and colors
    selectedFlowers,
    setSelectedFlowers,
    selectedColors,
    setSelectedColors,
    expandedFlower,
    setExpandedFlower,

    // Size and packaging
    customFlowerCount,
    setCustomFlowerCount,
    packagingType,
    setPackagingType,
    selectedVase,
    setSelectedVase,
    size,
    setSize,
    style,
    setStyle,

    // Step and customization
    step,
    setStep,
    occasion,
    setOccasion,
    cardMessage,
    setCardMessage,
    includeCard,
    setIncludeCard,
    showSuggestions,
    setShowSuggestions,
    notes,
    setNotes,

    // Delivery
    deliveryType,
    setDeliveryType,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,

    // UI state
    bouquetImage,
    setBouquetImage,
    searchQuery,
    setSearchQuery,
    isAddingToCart,
    setIsAddingToCart,

    // Notification
    notification,
    showNotification,
    reset,
  } = useCustomBouquetBuilderStore(
    useShallow((state) => ({
      // Flowers and colors
      selectedFlowers: state.selectedFlowers,
      setSelectedFlowers: state.setSelectedFlowers,
      selectedColors: state.selectedColors,
      setSelectedColors: state.setSelectedColors,
      expandedFlower: state.expandedFlower,
      setExpandedFlower: state.setExpandedFlower,

      // Size and packaging
      customFlowerCount: state.customFlowerCount,
      setCustomFlowerCount: state.setCustomFlowerCount,
      packagingType: state.packagingType,
      setPackagingType: state.setPackagingType,
      selectedVase: state.selectedVase,
      setSelectedVase: state.setSelectedVase,
      size: state.size,
      setSize: state.setSize,
      style: state.style,
      setStyle: state.setStyle,

      // Step and customization
      step: state.step,
      setStep: state.setStep,
      occasion: state.occasion,
      setOccasion: state.setOccasion,
      cardMessage: state.cardMessage,
      setCardMessage: state.setCardMessage,
      includeCard: state.includeCard,
      setIncludeCard: state.setIncludeCard,
      showSuggestions: state.showSuggestions,
      setShowSuggestions: state.setShowSuggestions,
      notes: state.notes,
      setNotes: state.setNotes,

      // Delivery
      deliveryType: state.deliveryType,
      setDeliveryType: state.setDeliveryType,
      deliveryDate: state.deliveryDate,
      setDeliveryDate: state.setDeliveryDate,
      deliveryTime: state.deliveryTime,
      setDeliveryTime: state.setDeliveryTime,

      // UI state
      bouquetImage: state.bouquetImage,
      setBouquetImage: state.setBouquetImage,
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
      isAddingToCart: state.isAddingToCart,
      setIsAddingToCart: state.setIsAddingToCart,

      // Notification
      notification: state.notification,
      showNotification: state.showNotification,
      reset: state.reset,
    }))
  );

  return {
    // Flowers and colors
    selectedFlowers,
    setSelectedFlowers,
    selectedColors,
    setSelectedColors,
    expandedFlower,
    setExpandedFlower,

    // Size and packaging
    customFlowerCount,
    setCustomFlowerCount,
    packagingType,
    setPackagingType,
    selectedVase,
    setSelectedVase,
    size,
    setSize,
    style,
    setStyle,

    // Step and customization
    step,
    setStep,
    occasion,
    setOccasion,
    cardMessage,
    setCardMessage,
    includeCard,
    setIncludeCard,
    showSuggestions,
    setShowSuggestions,
    notes,
    setNotes,

    // Delivery
    deliveryType,
    setDeliveryType,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,

    // UI state
    bouquetImage,
    setBouquetImage,
    searchQuery,
    setSearchQuery,
    isAddingToCart,
    setIsAddingToCart,
    isUpdatingFlowersRef,

    // Notification
    notification,
    showNotification,
    reset,
  };
}
