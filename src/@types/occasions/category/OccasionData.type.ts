export interface OccasionProduct {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    rating?: number;
    reviewsCount?: number;
    description?: string;
    flowersCount?: number;
    isAvailable?: boolean;
    isBestseller?: boolean;
    badge?: string;
    isPopular?: boolean;
}

export interface OccasionData {
    id: number;
    title: string;
    category: string;
    description: string;
    productsCount: number;
    image: string;
    icon: string;
    products?: OccasionProduct[];
}