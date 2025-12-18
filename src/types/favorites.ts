/**
 * أنواع المفضلة
 * Favorites types
 */

import type { FlowerWithQuantity } from "./custom";

export interface CustomBouquet {
  id: number;
  flowers: FlowerWithQuantity[];
  colors: string[];
  size: string;
  style: string;
  occasion: string;
  cardMessage: string;
  notes: string;
  deliveryDate?: string;
  deliveryTime?: string;
  total: number;
  image: string;
  createdAt: string;
}
