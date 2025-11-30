import { BouquetItem } from "@/src/@types/bouquets/index.type";
import {
  BOUQUET_CONSTANTS,
  OCCASIONS,
  BADGES,
  BEST_SELLER_BADGE,
  BOUQUET_IMAGES,
  COLORS,
} from "@/src/constants/bouquets";
import { defaultBouquets } from "@/src/content/featured-bouquets";

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
const OTHER_BADGES = BADGES.filter((badge) => badge !== BEST_SELLER_BADGE);

const fallbackFeaturedBouquets: BouquetItem[] = defaultBouquets.map((bouquet, idx) => ({
  ...bouquet,
  id: typeof bouquet.id === "number" ? bouquet.id + 1000 + idx : Number(bouquet.id) + 1000 + idx,
}));

// Vases from "Happiness in a Vase" section
const VASES: BouquetItem[] = [
  {
    id: 2001,
    title: "مزهرية زهور فاخرة",
    image: "/assets/home/happiness-in-vase/Luxury-flower-vase.png",
    price: 350,
    currency: "ر.س",
    badge: undefined,
    category: undefined,
    isPopular: false,
    color: COLORS[1].key,
    occasion: OCCASIONS[1].key,
  },
  {
    id: 2002,
    title: "مزهرية الورود الهادئة",
    image: "/assets/home/happiness-in-vase/vase-of-beauty.png",
    price: 350,
    currency: "ر.س",
    badge: undefined,
    category: undefined,
    isPopular: false,
    color: COLORS[2].key,
    occasion: OCCASIONS[2].key,
  },
  {
    id: 2003,
    title: "مزهرية الجمال",
    image: "/assets/home/happiness-in-vase/Vase-of-Life.png",
    price: 350,
    currency: "ر.س",
    badge: undefined,
    category: undefined,
    isPopular: false,
    color: COLORS[3].key,
    occasion: OCCASIONS[3].key,
  },
  {
    id: 2004,
    title: "مزهرية الحياة",
    image: "/assets/home/happiness-in-vase/calm-floral-pattern.png",
    price: 350,
    currency: "ر.س",
    badge: undefined,
    category: undefined,
    isPopular: false,
    color: COLORS[4].key,
    occasion: OCCASIONS[4].key,
  },
];

const FALLBACK_BOUQUETS: BouquetItem[] = [
  {
    id: 1,
    title: "باقة الورد الأصفر الفاخر",
    image: BOUQUET_IMAGES[0],
    price: 350,
    badge: BEST_SELLER_BADGE,
    category: BEST_SELLER_BADGE,
    isPopular: true,
    color: COLORS[1].key,
    occasion: OCCASIONS[1].key,
  },
  {
    id: 2,
    title: "باقة البنفسج الراقية",
    image: BOUQUET_IMAGES[1],
    price: 350,
    badge: OTHER_BADGES[0],
    category: undefined,
    isPopular: false,
    color: COLORS[0].key,
    occasion: OCCASIONS[2].key,
  },
  {
    id: 3,
    title: "باقة التوليب البرتقالي",
    image: BOUQUET_IMAGES[2],
    price: 350,
    badge: OTHER_BADGES[1],
    category: undefined,
    isPopular: true,
    color: COLORS[3].key,
    occasion: OCCASIONS[3].key,
  },
  {
    id: 4,
    title: "باقة الخوخ الزهري",
    image: BOUQUET_IMAGES[3],
    price: 350,
    badge: OTHER_BADGES[2 % OTHER_BADGES.length],
    category: undefined,
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
    const bouquetsFromApi = products.map((product: ExternalProduct, index: number) => {
      const isBestSeller = index % 4 === 0;
      const badge = isBestSeller ? BEST_SELLER_BADGE : OTHER_BADGES[index % OTHER_BADGES.length];

      return {
        id: product.id,
        title: product.title,
        image: BOUQUET_IMAGES[index % BOUQUET_IMAGES.length],
        price: Math.round(product.price),
        badge,
        category: isBestSeller ? BEST_SELLER_BADGE : undefined,
        isPopular: isBestSeller || index % 3 === 0, // Best sellers are always popular
        color: COLORS[(index % (COLORS.length - 1)) + 1].key, // Skip "all" option
        occasion: OCCASIONS[(index % (OCCASIONS.length - 1)) + 1].key, // Skip "all" option
      };
    });

    return [...bouquetsFromApi, ...fallbackFeaturedBouquets, ...VASES];
  } catch (error) {
    console.error("Failed to fetch bouquets from API:", error);

    // Return fallback data in case of API failure
    return [...FALLBACK_BOUQUETS, ...fallbackFeaturedBouquets, ...VASES];
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
    console.error(`Failed to fetch bouquet with ID ${id}:`, error);
    return null;
  }
}
