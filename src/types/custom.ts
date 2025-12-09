/**
 * أنواع الباقات المخصصة
 * Custom bouquet types
 */

export interface CustomFlower {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CustomSize {
  key: string;
  label: string;
  price: number;
}

export interface CustomStyle {
  key: string;
  label: string;
  price: number;
}

export interface CustomOccasion {
  name: string;
  icon?: string;
}

export interface CustomBouquetData {
  flowers?: CustomFlower[];
  colors?: string[] | { [flowerId: string]: number[] };
  size?: CustomSize;
  style?: CustomStyle;
  packaging?: {
    type?: string;
    style?: CustomStyle;
    vase?: {
      id: string;
      name: string;
      price: number;
    };
  };
  occasion?: CustomOccasion;
  cardMessage?: string;
  includeCard?: boolean;
  cardPrice?: number;
  notes?: string;
  flowersCount?: number;
  basePrice?: number;
  totalPrice?: number;
  deliveryInfo?: {
    date?: string;
    time?: string;
    timeLabel?: string;
    address?: {
      city?: string;
      district?: string;
      street?: string;
      landmark?: string;
    };
    phone?: string;
    paymentMethod?: string;
    paymentMethodLabel?: string;
  };
}

/**
 * أنواع الباقات المخصصة
 * Custom bouquet types
 */

export interface CustomFlower {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CustomSize {
  key: string;
  label: string;
  price: number;
}

export interface CustomStyle {
  key: string;
  label: string;
  price: number;
}

export interface CustomOccasion {
  name: string;
  icon?: string;
}

export interface CustomBouquetData {
  flowers?: CustomFlower[];
  colors?: string[] | { [flowerId: string]: number[] };
  size?: CustomSize;
  style?: CustomStyle;
  packaging?: {
    type?: string;
    style?: CustomStyle;
    vase?: {
      id: string;
      name: string;
      price: number;
    };
  };
  occasion?: CustomOccasion;
  cardMessage?: string;
  includeCard?: boolean;
  cardPrice?: number;
  notes?: string;
  flowersCount?: number;
  basePrice?: number;
  totalPrice?: number;
  deliveryInfo?: {
    date?: string;
    time?: string;
    timeLabel?: string;
    address?: {
      city?: string;
      district?: string;
      street?: string;
      landmark?: string;
    };
    phone?: string;
    paymentMethod?: string;
    paymentMethodLabel?: string;
  };
}

export interface Flower {
  id: number;
  name: string;
  price: number;
  image: string;
  availableColors?: number[];
}

export interface BouquetSize {
  key: string;
  label: string;
  price: number;
  stems: string;
  icon?: string;
}

export interface BouquetStyle {
  key: string;
  label: string;
  price: number;
  image: string;
}

export interface Vase {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Color {
  id: number;
  color: string;
  name: string;
}

export interface Occasion {
  id: number;
  name: string;
  message: string;
}

export interface DeliveryTime {
  id: number;
  label: string;
  value: string;
}

export interface CustomPaymentMethod {
  key: string;
  label: string;
  icon: string;
}

export interface Config {
  vatRate: number;
  cardPrice: number;
}

export type PackagingType = "paper" | "vase";

// Flower with quantity for custom bouquets
export interface FlowerWithQuantity {
  flower: Flower;
  quantity: number;
}

// Design history item for saving custom bouquet designs
export interface DesignHistoryItem {
  flowers: Record<number, number>;
  colors: { [flowerId: string]: number[] };
  size: "small" | "medium" | "large" | "custom";
  style: "classic" | "premium" | "gift" | "eco";
  occasion: string;
  cardMessage: string;
  includeCard: boolean;
  notes: string;
  total: number;
  image: string;
  timestamp: number;
}
