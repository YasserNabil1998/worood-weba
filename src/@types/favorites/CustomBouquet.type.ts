import { FlowerWithQuantity } from "@/src/@types/custom/index.type";

export interface CustomBouquet {
  id: number;
  flowers: FlowerWithQuantity[];
  colors: string[];
  size: string;
  style: string;
  occasion: string;
  cardMessage: string;
  notes: string;
  total: number;
  image: string;
  createdAt: string;
}
