import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { logError } from "@/src/lib/logger";
import { PackagingType } from "@/src/@types/custom/index.type";

interface UseDesignFromUrlProps {
  setSelectedFlowers: (flowers: Record<string, number>) => void;
  setSelectedColors: (colors: { [flowerId: string]: number[] }) => void;
  setSize: (size: "small" | "medium" | "large" | "custom") => void;
  setStyle: (style: "classic" | "premium" | "gift" | "eco") => void;
  setOccasion: (occasion: string) => void;
  setCardMessage: (message: string) => void;
  setIncludeCard: (include: boolean) => void;
  setNotes: (notes: string) => void;
  setPackagingType: (type: PackagingType) => void;
  setSelectedVase: (vase: string) => void;
  setDeliveryDate: (date: string) => void;
  setDeliveryTime: (time: string) => void;
  setCity: (city: string) => void;
  setDistrict: (district: string) => void;
  setStreet: (street: string) => void;
  setLandmark: (landmark: string) => void;
  setPhone: (phone: string) => void;
  setPayMethod: (method: string) => void;
  setBouquetImage: (image: string) => void;
}

export function useDesignFromUrl({
  setSelectedFlowers,
  setSelectedColors,
  setSize,
  setStyle,
  setOccasion,
  setCardMessage,
  setIncludeCard,
  setNotes,
  setPackagingType,
  setSelectedVase,
  setDeliveryDate,
  setDeliveryTime,
  setCity,
  setDistrict,
  setStreet,
  setLandmark,
  setPhone,
  setPayMethod,
  setBouquetImage,
}: UseDesignFromUrlProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const designParam = searchParams.get("design");
    if (designParam) {
      try {
        const design = JSON.parse(decodeURIComponent(designParam));
        setSelectedFlowers(design.flowers || {});
        // Convert colors from Record<string, string> to { [flowerId: string]: number[] }
        const colors = design.colors || {};
        const convertedColors: { [flowerId: string]: number[] } = {};
        Object.keys(colors).forEach((flowerId) => {
          const colorValue = colors[flowerId];
          // If colorValue is a string, convert to number array, otherwise use as is
          if (typeof colorValue === 'string') {
            convertedColors[flowerId] = [parseInt(colorValue, 10) || 0];
          } else if (Array.isArray(colorValue)) {
            convertedColors[flowerId] = colorValue.map((c: any) => typeof c === 'string' ? parseInt(c, 10) || 0 : c);
          } else {
            convertedColors[flowerId] = [colorValue || 0];
          }
        });
        setSelectedColors(convertedColors);
        const sizeValue = design.size || "medium";
        if (["small", "medium", "large", "custom"].includes(sizeValue)) {
          setSize(sizeValue as "small" | "medium" | "large" | "custom");
        } else {
          setSize("medium");
        }
        const styleValue = design.style || "classic";
        if (["classic", "premium", "gift", "eco"].includes(styleValue)) {
          setStyle(styleValue as "classic" | "premium" | "gift" | "eco");
        } else {
          setStyle("classic");
        }
        setOccasion(design.occasion || "عيد ميلاد");
        setCardMessage(design.cardMessage || "");
        setIncludeCard(design.includeCard || false);
        setNotes(design.notes || "");

        if (design.packagingType) {
          const packagingValue = design.packagingType;
          if (["paper", "box", "basket"].includes(packagingValue)) {
            setPackagingType(packagingValue as PackagingType);
          }
        }
        if (design.selectedVase) {
          setSelectedVase(design.selectedVase);
        }

        if (design.deliveryDate) {
          setDeliveryDate(design.deliveryDate);
        }
        if (design.deliveryTime) {
          setDeliveryTime(design.deliveryTime);
        }
        if (design.city) {
          setCity(design.city);
        }
        if (design.district) {
          setDistrict(design.district);
        }
        if (design.street) {
          setStreet(design.street);
        }
        if (design.landmark) {
          setLandmark(design.landmark);
        }
        if (design.phone) {
          setPhone(design.phone);
        }
        if (design.payMethod) {
          setPayMethod(design.payMethod);
        }

        if (design.image) {
          setBouquetImage(design.image);
        }
      } catch (e) {
        logError("Failed to parse design data", e, { designParam });
      }
    }
  }, [
    searchParams,
    setSelectedFlowers,
    setSelectedColors,
    setSize,
    setStyle,
    setOccasion,
    setCardMessage,
    setIncludeCard,
    setNotes,
    setPackagingType,
    setSelectedVase,
    setDeliveryDate,
    setDeliveryTime,
    setCity,
    setDistrict,
    setStreet,
    setLandmark,
    setPhone,
    setPayMethod,
    setBouquetImage,
  ]);
}

