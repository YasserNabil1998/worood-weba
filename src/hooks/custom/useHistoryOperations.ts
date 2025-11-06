import { useCallback } from "react";
import { Flower } from "@/src/@types/custom/index.type";
import { storage } from "@/src/lib/utils";

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

    const history = storage.get<any[]>("designHistory", []);
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
        }),
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

    const favorites = storage.get<any[]>("bouquetFavorites", []);
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

    // دالة مساعدة للنسخ مع دعم الطرق البديلة
    const copyToClipboard = async (text: string): Promise<boolean> => {
      // الطريقة 1: Clipboard API (الأفضل - يتطلب HTTPS أو localhost)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (err) {
          // إذا فشلت، جرب الطريقة البديلة
        }
      }

      // الطريقة 2: execCommand (البديل - يعمل في معظم المتصفحات)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          return true;
        }
      } catch (err) {
        // فشلت الطريقة البديلة أيضاً
      }

      return false;
    };

    copyToClipboard(shareUrl)
      .then((success) => {
        if (success) {
          saveToHistory();
          showNotification("تم نسخ رابط التصميم بنجاح! 🔗");
        } else {
          showNotification("فشل نسخ الرابط، حاول مرة أخرى");
        }
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
