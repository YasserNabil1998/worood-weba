import featuredBouquetsJson from "@/data/featured-bouquets.json" assert { type: "json" };
import type { BouquetItem } from "@/types/bouquets";

export const defaultBouquets: BouquetItem[] = featuredBouquetsJson as BouquetItem[];
