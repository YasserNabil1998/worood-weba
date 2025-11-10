import featuredBouquetsJson from "@/src/data/featured-bouquets.json" assert { type: "json" };
import { BouquetItem } from "@/src/@types/bouquets/index.type";

export const defaultBouquets: BouquetItem[] = featuredBouquetsJson as BouquetItem[];
