import { BouquetItem } from "@/src/@types/bouquets/index.type";
import {
  BOUQUET_CONSTANTS,
  OCCASIONS,
  BADGES,
  BOUQUET_IMAGES,
  COLORS,
} from "@/src/constants/bouquets";

// External API response type
interface ExternalProduct {
  id: number;
  title: string;
  price: number;
}

interface ExternalApiResponse {
  products: ExternalProduct[];
}

// Fallback data in case API fails
const FALLBACK_BOUQUETS: BouquetItem[] = [
  {
    id: 1,
    title: "باقة الورود الحمراء الكلاسيكية",
    image: BOUQUET_IMAGES[0],
    price: 150,
    badge: BADGES[0],
    isPopular: true,
    color: COLORS[1].key,
    occasion: OCCASIONS[1].key,
  },
  {
    id: 2,
    title: "باقة الورود البيضاء الأنيقة",
    image: BOUQUET_IMAGES[1],
    price: 200,
    badge: BADGES[1],
    isPopular: false,
    color: COLORS[0].key,
    occasion: OCCASIONS[2].key,
  },
  {
    id: 3,
    title: "باقة الورود المختلطة الملونة",
    image: BOUQUET_IMAGES[2],
    price: 180,
    badge: BADGES[2],
    isPopular: true,
    color: COLORS[3].key,
    occasion: OCCASIONS[3].key,
  },
  {
    id: 4,
    title: "باقة الورود الوردية الرومانسية",
    image: BOUQUET_IMAGES[3],
    price: 220,
    badge: BADGES[0],
    isPopular: false,
    color: COLORS[2].key,
    occasion: OCCASIONS[4].key,
  },
];

/**
 * Fetches bouquet products from external API with fallback data
 * @returns Promise<BouquetItem[]> - Array of bouquet items
 */
export async function fetchBouquets(): Promise<BouquetItem[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${BOUQUET_CONSTANTS.API_LIMIT}`,
      {
        next: { revalidate: BOUQUET_CONSTANTS.REVALIDATE_TIME },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExternalApiResponse = await response.json();
    const products = data.products || [];

    // Transform external API data to our BouquetItem format
    return products.map((product: ExternalProduct, index: number) => ({
      id: product.id,
      title: product.title,
      image: BOUQUET_IMAGES[index % BOUQUET_IMAGES.length],
      price: Math.round(product.price),
      badge: BADGES[index % BADGES.length],
      isPopular: index % 3 === 0, // Every third product is popular
      color: COLORS[(index % (COLORS.length - 1)) + 1].key, // Skip "all" option
      occasion: OCCASIONS[(index % (OCCASIONS.length - 1)) + 1].key, // Skip "all" option
    }));
  } catch (error) {
    // Return fallback data in case of API failure
    return FALLBACK_BOUQUETS;
  }
}

/**
 * Fetches a single bouquet by ID
 * @param id - Bouquet ID
 * @returns Promise<BouquetItem | null> - Bouquet item or null if not found
 */
export async function fetchBouquetById(id: number): Promise<BouquetItem | null> {
  try {
    const bouquets = await fetchBouquets();
    return bouquets.find((bouquet) => bouquet.id === id) || null;
  } catch (error) {
    return null;
  }
}
