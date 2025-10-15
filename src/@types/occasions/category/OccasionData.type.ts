export interface OccasionData {
    id: number;
    title: string;
    category: string;
    description: string;
    productsCount: number;
    image: string;
    subcategories: {
        id: number;
        name: string;
        image: string;
    }[];
}