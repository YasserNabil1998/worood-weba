import { useCallback } from "react";
import type { Flower, DesignHistoryItem } from "@/types/custom";
import type { CustomBouquet } from "@/types/favorites";
import { storage } from "@/lib/utils";

interface UseHistoryOperationsProps {
  selectedFlowers: Record<number, number>;
  selectedColors: { [flowerId: string]: number[] };
  size: "small" | "medium" | "large" | "custom";
  style: "classic" | "premium" | "gift" | "eco";
  occasion: string;
  cardMessage: string;
  includeCard: boolean;
  notes: string;
  total: number;
  bouquetImage: string;
  flowers: Flower[];
  showNotification: (message: string) => void;
}

export function useHistoryOperations({
  selectedFlowers,
  selectedColors,
  size,
  style,
  occasion,
  cardMessage,
  includeCard,
  notes,
  total,
  bouquetImage,
  flowers,
  showNotification,
}: UseHistoryOperationsProps) {
  // Save to history
  const saveToHistory = useCallback(() => {
    if (typeof window === "undefined") return;

    const designData = {
      flowers: selectedFlowers,
      colors: selectedColors,
      size,
      style,
      occasion,
      cardMessage,
      includeCard,
      notes,
      total,
      image: bouquetImage,
      timestamp: Date.now(),
    };

    const history = storage.get<DesignHistoryItem[]>("designHistory", []);
    history.unshift(designData);

    // Keep only last 50 designs
    if (history.length > 50) {
      history.splice(50);
    }

    storage.set("designHistory", history);
  }, [
    selectedFlowers,
    selectedColors,
    size,
    style,
    occasion,
    cardMessage,
    includeCard,
    notes,
    total,
    bouquetImage,
  ]);

  // Save to favorites
  const saveToFavorites = useCallback(() => {
    if (typeof window === "undefined") return;

    const designData = {
      id: Date.now(),
      flowers: Object.entries(selectedFlowers)
        .filter(([_, qty]) => qty > 0)
        .map(([id, quantity]) => {
          const flower = flowers.find((f) => f.id === Number(id));
          return { flower, quantity };
        })
        .filter((item): item is { flower: Flower; quantity: number } => item.flower !== undefined),
      colors: Object.values(selectedColors).flat().map(String),
      size,
      style,
      occasion,
      cardMessage,
      includeCard,
      notes,
      total,
      image: bouquetImage,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const favorites = storage.get<CustomBouquet[]>("bouquetFavorites", []);
    favorites.push(designData);
    storage.set("bouquetFavorites", favorites);

    saveToHistory();
    showNotification("تم حفظ التصميم في المفضلة بنجاح! ❤️");
  }, [
    selectedFlowers,
    selectedColors,
    size,
    style,
    occasion,
    cardMessage,
    includeCard,
    notes,
    total,
    bouquetImage,
    flowers,
    saveToHistory,
    showNotification,
  ]);

  // Share design
  const shareDesign = useCallback(() => {
    if (typeof window === "undefined") return;

    const designData = {
      flowers: selectedFlowers,
      colors: selectedColors,
      size,
      style,
      occasion,
      cardMessage,
      includeCard,
      notes,
      image: bouquetImage,
    };

    const encodedDesign = encodeURIComponent(JSON.stringify(designData));
    const shareUrl = `${window.location.origin}/custom?design=${encodedDesign}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        saveToHistory();
        showNotification("تم نسخ رابط التصميم بنجاح! 🔗");
      })
      .catch(() => {
        showNotification("فشل نسخ الرابط، حاول مرة أخرى");
      });
  }, [
    selectedFlowers,
    selectedColors,
    size,
    style,
    occasion,
    cardMessage,
    includeCard,
    notes,
    bouquetImage,
    saveToHistory,
    showNotification,
  ]);

  return {
    saveToHistory,
    saveToFavorites,
    shareDesign,
  };
}
