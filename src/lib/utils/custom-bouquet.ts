/**
 * دوال مساعدة للباقات المخصصة
 * Custom bouquet utility functions
 */

import type {
  Flower,
  BouquetSize,
  BouquetStyle,
  Vase,
  Occasion,
  DeliveryTime,
  CustomPaymentMethod,
  Config,
} from "@/types/custom";
import type { CustomBouquetData } from "@/types/custom";

export interface BouquetDetails {
  size: BouquetSize | undefined;
  style: BouquetStyle | undefined;
  occasion: Occasion | undefined;
  vase: Vase | undefined;
}

export interface CustomBouquetInput {
  selectedFlowers: Record<number, number>;
  selectedColors: { [flowerId: string]: number[] };
  size: "small" | "medium" | "large" | "custom";
  style: "classic" | "premium" | "gift" | "eco";
  packagingType: "paper" | "vase";
  selectedVase: string;
  occasion: string;
  cardMessage: string;
  includeCard: boolean;
  notes: string;
  deliveryDate: string;
  deliveryTime: string;
  city: string;
  district: string;
  street: string;
  landmark: string;
  phone: string;
  payMethod: string;
  bouquetImage: string;
  totalFlowersCount: number;
  subtotal: number;
  vat: number;
  total: number;
}

export interface BouquetDataSources {
  flowers: Flower[];
  bouquetSizes: BouquetSize[];
  bouquetStyles: BouquetStyle[];
  vases: Vase[];
  occasions: Occasion[];
  deliveryTimes: DeliveryTime[];
  paymentMethods: CustomPaymentMethod[];
  config: Config;
}

export function buildFlowersDetails(
  selectedFlowers: Record<number, number>,
  flowers: Flower[]
): Array<{ id: number; name: string; price: number; quantity: number; total: number }> {
  return Object.entries(selectedFlowers)
    .filter(([_, qty]) => qty > 0)
    .map(([id, quantity]) => {
      const flower = flowers.find((f) => f.id === Number(id));
      return {
        id: Number(id),
        name: flower?.name || "",
        price: flower?.price || 0,
        quantity,
        total: (flower?.price || 0) * quantity,
      };
    });
}

export function buildSizeDetails(
  size: "small" | "medium" | "large" | "custom",
  bouquetSizes: BouquetSize[]
): BouquetSize | undefined {
  return bouquetSizes.find((s) => s.key === size);
}

export function buildStyleDetails(
  style: "classic" | "premium" | "gift" | "eco",
  bouquetStyles: BouquetStyle[]
): BouquetStyle | undefined {
  return bouquetStyles.find((s) => s.key === style);
}

export function buildOccasionDetails(
  occasion: string,
  occasions: Occasion[]
): Occasion | undefined {
  return occasions.find((o) => o.name === occasion);
}

export function buildVaseDetails(selectedVase: string, vases: Vase[]): Vase | undefined {
  return vases.find((v) => v.id.toString() === selectedVase);
}

export function buildPackagingData(
  packagingType: "paper" | "vase",
  style: "classic" | "premium" | "gift" | "eco",
  selectedVase: string,
  styleDetails: BouquetStyle | undefined,
  vaseDetails: Vase | undefined
): CustomBouquetData["packaging"] {
  const packaging: CustomBouquetData["packaging"] = {
    type: packagingType,
  };

  if (packagingType === "paper" && styleDetails) {
    packaging.style = {
      key: style,
      label: styleDetails.label,
      price: styleDetails.price,
    };
  }

  if (packagingType === "vase" && selectedVase && vaseDetails) {
    packaging.vase = {
      id: selectedVase,
      name: vaseDetails.name,
      price: vaseDetails.price,
    };
  }

  return packaging;
}

export function buildDeliveryInfo(
  deliveryDate: string,
  deliveryTime: string,
  city: string,
  district: string,
  street: string,
  landmark: string,
  phone: string,
  payMethod: string,
  deliveryTimes: DeliveryTime[],
  paymentMethods: CustomPaymentMethod[]
): CustomBouquetData["deliveryInfo"] {
  return {
    date: deliveryDate,
    time: deliveryTime,
    timeLabel: deliveryTimes.find((t) => t.value === deliveryTime)?.label || "",
    address: {
      city,
      district,
      street,
      landmark,
    },
    phone,
    paymentMethod: payMethod,
    paymentMethodLabel: paymentMethods.find((p) => p.key === payMethod)?.label || "",
  };
}

export function validateAndNormalizePrices(
  subtotal: number,
  vat: number,
  total: number
): { subtotal: number; vat: number; total: number } {
  return {
    subtotal: isNaN(subtotal) || subtotal === 0 ? 0 : Number(subtotal.toFixed(2)),
    vat: isNaN(vat) || vat === 0 ? 0 : Number(vat.toFixed(2)),
    total: isNaN(total) || total === 0 ? 0 : Number(total.toFixed(2)),
  };
}

export function buildCustomData(
  input: CustomBouquetInput,
  sources: BouquetDataSources
): CustomBouquetData {
  const flowersDetails = buildFlowersDetails(input.selectedFlowers, sources.flowers);

  const sizeDetails = buildSizeDetails(input.size, sources.bouquetSizes);
  const styleDetails = buildStyleDetails(input.style, sources.bouquetStyles);
  const occasionDetails = buildOccasionDetails(input.occasion, sources.occasions);
  const vaseDetails = buildVaseDetails(input.selectedVase, sources.vases);

  const packaging = buildPackagingData(
    input.packagingType,
    input.style,
    input.selectedVase,
    styleDetails,
    vaseDetails
  );

  const deliveryInfo = buildDeliveryInfo(
    input.deliveryDate,
    input.deliveryTime,
    input.city,
    input.district,
    input.street,
    input.landmark,
    input.phone,
    input.payMethod,
    sources.deliveryTimes,
    sources.paymentMethods
  );

  return {
    flowers: flowersDetails,
    flowersCount: input.totalFlowersCount,
    colors: input.selectedColors,
    size: {
      key: input.size,
      label: sizeDetails?.label || "",
      price: sizeDetails?.price || 0,
    },
    packaging,
    occasion: {
      name: input.occasion,
    },
    cardMessage: input.cardMessage,
    includeCard: input.includeCard,
    cardPrice: input.includeCard ? sources.config.cardPrice : 0,
    notes: input.notes,
    deliveryInfo,
  };
}
