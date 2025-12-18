import { useRef } from "react";
import { useCustomBouquetBuilderStore } from "@/stores";

export function useCustomBouquetState() {
  // Selected flowers and colors
  const selectedFlowers = useCustomBouquetBuilderStore((state) => state.selectedFlowers);
  const setSelectedFlowers = useCustomBouquetBuilderStore((state) => state.setSelectedFlowers);
  const selectedColors = useCustomBouquetBuilderStore((state) => state.selectedColors);
  const setSelectedColors = useCustomBouquetBuilderStore((state) => state.setSelectedColors);
  const expandedFlower = useCustomBouquetBuilderStore((state) => state.expandedFlower);
  const setExpandedFlower = useCustomBouquetBuilderStore((state) => state.setExpandedFlower);

  // Size and packaging
  const customFlowerCount = useCustomBouquetBuilderStore((state) => state.customFlowerCount);
  const setCustomFlowerCount = useCustomBouquetBuilderStore((state) => state.setCustomFlowerCount);
  const packagingType = useCustomBouquetBuilderStore((state) => state.packagingType);
  const setPackagingType = useCustomBouquetBuilderStore((state) => state.setPackagingType);
  const selectedVase = useCustomBouquetBuilderStore((state) => state.selectedVase);
  const setSelectedVase = useCustomBouquetBuilderStore((state) => state.setSelectedVase);
  const size = useCustomBouquetBuilderStore((state) => state.size);
  const setSize = useCustomBouquetBuilderStore((state) => state.setSize);
  const style = useCustomBouquetBuilderStore((state) => state.style);
  const setStyle = useCustomBouquetBuilderStore((state) => state.setStyle);

  // Step and customization
  const step = useCustomBouquetBuilderStore((state) => state.step);
  const setStep = useCustomBouquetBuilderStore((state) => state.setStep);
  const occasion = useCustomBouquetBuilderStore((state) => state.occasion);
  const setOccasion = useCustomBouquetBuilderStore((state) => state.setOccasion);
  const cardMessage = useCustomBouquetBuilderStore((state) => state.cardMessage);
  const setCardMessage = useCustomBouquetBuilderStore((state) => state.setCardMessage);
  const includeCard = useCustomBouquetBuilderStore((state) => state.includeCard);
  const setIncludeCard = useCustomBouquetBuilderStore((state) => state.setIncludeCard);
  const showSuggestions = useCustomBouquetBuilderStore((state) => state.showSuggestions);
  const setShowSuggestions = useCustomBouquetBuilderStore((state) => state.setShowSuggestions);
  const notes = useCustomBouquetBuilderStore((state) => state.notes);
  const setNotes = useCustomBouquetBuilderStore((state) => state.setNotes);

  // Delivery and payment
  const deliveryType = useCustomBouquetBuilderStore((state) => state.deliveryType);
  const setDeliveryType = useCustomBouquetBuilderStore((state) => state.setDeliveryType);
  const deliveryDate = useCustomBouquetBuilderStore((state) => state.deliveryDate);
  const setDeliveryDate = useCustomBouquetBuilderStore((state) => state.setDeliveryDate);
  const deliveryTime = useCustomBouquetBuilderStore((state) => state.deliveryTime);
  const setDeliveryTime = useCustomBouquetBuilderStore((state) => state.setDeliveryTime);
  const city = useCustomBouquetBuilderStore((state) => state.city);
  const setCity = useCustomBouquetBuilderStore((state) => state.setCity);
  const district = useCustomBouquetBuilderStore((state) => state.district);
  const setDistrict = useCustomBouquetBuilderStore((state) => state.setDistrict);
  const street = useCustomBouquetBuilderStore((state) => state.street);
  const setStreet = useCustomBouquetBuilderStore((state) => state.setStreet);
  const landmark = useCustomBouquetBuilderStore((state) => state.landmark);
  const setLandmark = useCustomBouquetBuilderStore((state) => state.setLandmark);
  const phone = useCustomBouquetBuilderStore((state) => state.phone);
  const setPhone = useCustomBouquetBuilderStore((state) => state.setPhone);
  const payMethod = useCustomBouquetBuilderStore((state) => state.payMethod);
  const setPayMethod = useCustomBouquetBuilderStore((state) => state.setPayMethod);

  // UI state
  const bouquetImage = useCustomBouquetBuilderStore((state) => state.bouquetImage);
  const setBouquetImage = useCustomBouquetBuilderStore((state) => state.setBouquetImage);
  const searchQuery = useCustomBouquetBuilderStore((state) => state.searchQuery);
  const setSearchQuery = useCustomBouquetBuilderStore((state) => state.setSearchQuery);
  const isAddingToCart = useCustomBouquetBuilderStore((state) => state.isAddingToCart);
  const setIsAddingToCart = useCustomBouquetBuilderStore((state) => state.setIsAddingToCart);
  const isUpdatingFlowersRef = useRef(false);

  // Notification
  const notification = useCustomBouquetBuilderStore((state) => state.notification);
  const showNotification = useCustomBouquetBuilderStore((state) => state.showNotification);
  const reset = useCustomBouquetBuilderStore((state) => state.reset);

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

    // Delivery and payment
    deliveryType,
    setDeliveryType,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,
    city,
    setCity,
    district,
    setDistrict,
    street,
    setStreet,
    landmark,
    setLandmark,
    phone,
    setPhone,
    payMethod,
    setPayMethod,

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
